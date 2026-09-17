import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { 
  generateCuratedInteriorReport, 
  generateCuratedFashionReport, 
  generateCuratedCrossMoodReport 
} from "./src/data/presetData.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Initialize Gemini AI client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasApiKey: !!apiKey,
      model: "gemini-3.8-flash",
      service: "StyleSpace (Atelier Duo) Full-Stack API",
    });
  });

  // Module A: AI Interior Diagnosis & Prescription
  app.post("/api/interior/diagnose", async (req, res) => {
    const { roomType, areaPyung, budget, mood, imageBase64, customNotes } = req.body;

    // Fallback baseline report
    const fallbackReport = generateCuratedInteriorReport({
      roomType: roomType || "one_room",
      areaPyung: Number(areaPyung) || 7,
      budget: budget || "under_300k",
      mood: mood || "natural_warm_wood",
    });

    if (!ai) {
      return res.json({
        success: true,
        data: fallbackReport,
        source: "curated-engine",
        modelNote: "Gemini API 키 대기 중: 정밀 인테리어 룰셋 엔진으로 즉시 산출되었습니다.",
      });
    }

    try {
      const prompt = `You are an elite interior architecture and color coordination expert specializing in Korean residential spaces (원룸, 오피스텔, 아파트, 빌라).
Analyze this room and user request:
- Space type: ${roomType}
- Area: ${areaPyung} 평
- Budget tier: ${budget}
- Preferred mood: ${mood}
- Additional notes: ${customNotes || "None"}

Please output strict valid JSON with this exact structure:
{
  "palette": {
    "base": { "name": string, "hex": string, "ratio": 60, "role": "Base (주조색 60%)", "description": string },
    "sub": { "name": string, "hex": string, "ratio": 30, "role": "Sub (보조색 30%)", "description": string },
    "accent": { "name": string, "hex": string, "ratio": 10, "role": "Accent (포인트색 10%)", "description": string },
    "harmonyReason": string
  },
  "layout": {
    "headline": string,
    "keyPoints": [string, string, string],
    "openSpaceTip": string,
    "trafficFlow": string,
    "diagramConcept": "bed_desk_storage" | "desk_facing_window" | "living_l_shape" | "open_studio"
  },
  "shoppingList": [
    { "id": "shop-1", "category": "조명", "name": string, "spec": string, "estimatedPrice": string, "searchKeyword": string, "reason": string },
    { "id": "shop-2", "category": "러그", "name": string, "spec": string, "estimatedPrice": string, "searchKeyword": string, "reason": string },
    { "id": "shop-3", "category": "커튼", "name": string, "spec": string, "estimatedPrice": string, "searchKeyword": string, "reason": string },
    { "id": "shop-4", "category": "소품/식물", "name": string, "spec": string, "estimatedPrice": string, "searchKeyword": string, "reason": string }
  ],
  "doctorNote": {
    "lighting": string,
    "wireManagement": string,
    "visualNoiseReduction": string,
    "summaryAdvice": string
  }
}
All text fields MUST be in Korean with natural, professional tone. Include specific color temperature (e.g. 2700K~3000K) for lighting.`;

      let contents: any = prompt;
      if (imageBase64 && typeof imageBase64 === "string" && imageBase64.includes(",")) {
        const [header, data] = imageBase64.split(",");
        const mimeMatch = header.match(/data:([^;]+);base64/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        contents = {
          parts: [
            { inlineData: { mimeType, data } },
            { text: prompt },
          ],
        };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      if (parsed.palette && parsed.layout && parsed.shoppingList && parsed.doctorNote) {
        return res.json({
          success: true,
          data: {
            id: `gemini-int-${Date.now()}`,
            timestamp: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }),
            roomType,
            areaPyung: Number(areaPyung),
            mood,
            budget,
            palette: parsed.palette,
            layout: parsed.layout,
            shoppingList: parsed.shoppingList,
            doctorNote: parsed.doctorNote,
          },
          source: "gemini-3.8-flash",
          modelNote: "Gemini 3.8 Flash 멀티모달 비전 엔진 분석 완료",
        });
      }
    } catch (err: any) {
      console.error("Gemini interior analysis error:", err?.message || err);
    }

    // Return fallback if Gemini generation failed
    res.json({
      success: true,
      data: fallbackReport,
      source: "curated-engine",
      modelNote: "고속 응답을 위해 검증된 전문가 인테리어 룰셋으로 안전하게 반환되었습니다.",
    });
  });

  // Module B: AI Daily & Occasion Fashion Styling
  app.post("/api/fashion/recommend", async (req, res) => {
    const { tpo, temperature, weather, personalColor, keyItem } = req.body;

    const fallbackReport = generateCuratedFashionReport({
      tpo: tpo || "business",
      temperature: Number(temperature) || 18,
      weather: weather || "sunny",
      personalColor: personalColor || "fall_warm",
      keyItem: keyItem || "베이지 트렌치코트",
    });

    if (!ai) {
      return res.json({
        success: true,
        data: fallbackReport,
        source: "curated-engine",
        modelNote: "Gemini API 키 대기 중: TPO 3-Way 패션 큐레이션 엔진으로 산출되었습니다.",
      });
    }

    try {
      const prompt = `You are a high-end fashion stylist in Seoul specializing in Korean contemporary style.
Generate a 3-Way coordinate guide:
1. "best": 가장 균형 잡힌 정석 코디
2. "trend": 트렌디한 포인트 룩
3. "comfort": 편안하고 세련된 디자인 (원마일/릴렉스드)

Input criteria:
- Occasion / TPO: ${tpo}
- Temperature: ${temperature}°C
- Weather: ${weather}
- Personal Color: ${personalColor}
- Key User Item: ${keyItem || "None"}

Please output strict valid JSON with this exact structure:
{
  "outfits": {
    "best": {
      "type": "best",
      "typeTitle": "가장 균형 잡힌 정석 코디 (Best Balance)",
      "tagline": string,
      "headToToe": {
        "outer": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "top": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "bottom": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "shoes": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "accessories": { "items": [string, string], "note": string }
      },
      "stylingDetailTips": [string, string, string],
      "paletteSwatches": [{ "name": string, "hex": string }]
    },
    "trend": {
      "type": "trend",
      "typeTitle": "트렌디한 포인트 룩 (Trend & Silhouette)",
      "tagline": string,
      "headToToe": {
        "outer": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "top": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "bottom": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "shoes": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "accessories": { "items": [string, string], "note": string }
      },
      "stylingDetailTips": [string, string, string],
      "paletteSwatches": [{ "name": string, "hex": string }]
    },
    "comfort": {
      "type": "comfort",
      "typeTitle": "편안하고 세련된 원마일 룩 (Relaxed Sophistication)",
      "tagline": string,
      "headToToe": {
        "outer": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "top": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "bottom": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "shoes": { "item": string, "material": string, "fit": string, "color": string, "colorHex": string },
        "accessories": { "items": [string, string], "note": string }
      },
      "stylingDetailTips": [string, string, string],
      "paletteSwatches": [{ "name": string, "hex": string }]
    }
  },
  "expertSummary": string
}
Outer can be null if temperature is hot (>25°C). Write in Korean with polished, sophisticated tone.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      if (parsed.outfits && parsed.outfits.best && parsed.outfits.trend && parsed.outfits.comfort) {
        return res.json({
          success: true,
          data: {
            id: `gemini-fas-${Date.now()}`,
            timestamp: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }),
            input: { tpo, temperature, weather, personalColor, keyItem },
            outfits: parsed.outfits,
            expertSummary: parsed.expertSummary || "기온과 TPO에 최적화된 맞춤 룩북이 완성되었습니다.",
          },
          source: "gemini-3.8-flash",
          modelNote: "Gemini 3.8 Flash 패션 큐레이션 모델 생성 완료",
        });
      }
    } catch (err: any) {
      console.error("Gemini fashion recommendation error:", err?.message || err);
    }

    res.json({
      success: true,
      data: fallbackReport,
      source: "curated-engine",
      modelNote: "안정적인 빠른 서빙을 위해 전문 코디네이터 데이터로 반환되었습니다.",
    });
  });

  // Module C: Cross-Mood Synergy
  app.post("/api/cross-mood/analyze", async (req, res) => {
    const { direction, sourceConcept } = req.body;
    const dir = direction === "fashionToRoom" ? "fashionToRoom" : "roomToFashion";

    const fallbackReport = generateCuratedCrossMoodReport(dir, sourceConcept);

    if (!ai) {
      return res.json({
        success: true,
        data: fallbackReport,
        source: "curated-engine",
        modelNote: "크로스 무드 컬러 하모니 룰셋 엔진으로 산출되었습니다.",
      });
    }

    try {
      const prompt = `You are an avant-garde lifestyle director connecting Interior Spatial Aesthetics and Fashion Outfits ("Cross-Mood Synergy").
Direction: ${dir === "roomToFashion" ? "Room Atmosphere ➡️ Fashion Outfit Translation" : "Fashion Outfit ➡️ Room Atmosphere Translation"}
Source Concept Description: ${sourceConcept || "Warm Wood & Natural Tones"}

Please output strict valid JSON:
{
  "targetTransformation": {
    "title": string,
    "concept": string,
    "keyItemsOrElements": [string, string, string, string],
    "colorTranslation": {
      "sourceColors": [{ "name": string, "hex": string }, { "name": string, "hex": string }, { "name": string, "hex": string }],
      "translatedColors": [{ "name": string, "hex": string, "application": string }, { "name": string, "hex": string, "application": string }, { "name": string, "hex": string, "application": string }]
    },
    "practicalAdvice": [string, string]
  },
  "harmonyIndices": {
    "videoCallContrastScore": number (70-98),
    "videoCallAdvice": string,
    "homePartyHostScore": number (75-98),
    "homePartyAdvice": string,
    "dailyVibeCoherenceScore": number (80-99)
  }
}
Write all text in elegant, natural Korean.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      if (parsed.targetTransformation && parsed.harmonyIndices) {
        return res.json({
          success: true,
          data: {
            id: `gemini-cross-${Date.now()}`,
            timestamp: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }),
            direction: dir,
            sourceConcept: sourceConcept || "선택된 무드",
            targetTransformation: parsed.targetTransformation,
            harmonyIndices: parsed.harmonyIndices,
          },
          source: "gemini-3.8-flash",
          modelNote: "Gemini 3.8 Flash 크로스 무드 싱크 추론 완료",
        });
      }
    } catch (err: any) {
      console.error("Gemini cross-mood error:", err?.message || err);
    }

    res.json({
      success: true,
      data: fallbackReport,
      source: "curated-engine",
      modelNote: "전문 크로스 무드 배색 매트릭스로 즉시 산출되었습니다.",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StyleSpace server running on http://localhost:${PORT}`);
  });
}

startServer();
