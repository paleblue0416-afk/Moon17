import { 
  InteriorInput, 
  InteriorReport, 
  FashionInput, 
  FashionReport, 
  CrossMoodReport,
  SynergyDirection 
} from '../types';
import { 
  generateCuratedInteriorReport, 
  generateCuratedFashionReport, 
  generateCuratedCrossMoodReport 
} from '../data/presetData';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  source: 'gemini-3.8-flash' | 'curated-engine';
  latencyMs: number;
  modelNote?: string;
}

export async function checkServerHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API health check error:', err);
  }
  return { status: 'client-mode', hasApiKey: false };
}

export const checkBackendHealth = checkServerHealth;

export async function requestInteriorDiagnosis(input: InteriorInput): Promise<ApiResponse<InteriorReport>> {
  const startTime = performance.now();
  try {
    const res = await fetch('/api/interior/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return {
          success: true,
          data: json.data,
          source: json.source || 'gemini-3.8-flash',
          latencyMs: Math.round(performance.now() - startTime),
          modelNote: json.modelNote
        };
      }
    }
  } catch (err) {
    console.warn('Backend API request failed, switching to curated styling engine:', err);
  }

  // Graceful high-quality curated fallback
  const fallbackData = generateCuratedInteriorReport(input);
  return {
    success: true,
    data: fallbackData,
    source: 'curated-engine',
    latencyMs: Math.round(performance.now() - startTime),
    modelNote: 'Gemini 3.8 Flash 프롬프트 룰셋 기반의 고정밀 로컬 스타일링 엔진으로 산출되었습니다.'
  };
}

export async function requestFashionRecommendation(input: FashionInput): Promise<ApiResponse<FashionReport>> {
  const startTime = performance.now();
  try {
    const res = await fetch('/api/fashion/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return {
          success: true,
          data: json.data,
          source: json.source || 'gemini-3.8-flash',
          latencyMs: Math.round(performance.now() - startTime),
          modelNote: json.modelNote
        };
      }
    }
  } catch (err) {
    console.warn('Backend fashion API failed, using curated outfit engine:', err);
  }

  const fallbackData = generateCuratedFashionReport(input);
  return {
    success: true,
    data: fallbackData,
    source: 'curated-engine',
    latencyMs: Math.round(performance.now() - startTime),
    modelNote: 'TPO 및 기온 공식에 따른 전문가 3-Way 코디네이션 엔진으로 산출되었습니다.'
  };
}

export async function requestCrossMoodAnalysis(
  direction: SynergyDirection,
  sourceConcept: string
): Promise<ApiResponse<CrossMoodReport>> {
  const startTime = performance.now();
  try {
    const res = await fetch('/api/cross-mood/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction, sourceConcept })
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return {
          success: true,
          data: json.data,
          source: json.source || 'gemini-3.8-flash',
          latencyMs: Math.round(performance.now() - startTime),
          modelNote: json.modelNote
        };
      }
    }
  } catch (err) {
    console.warn('Cross mood API failed, fallback to synergy engine:', err);
  }

  const fallbackData = generateCuratedCrossMoodReport(direction, sourceConcept);
  return {
    success: true,
    data: fallbackData,
    source: 'curated-engine',
    latencyMs: Math.round(performance.now() - startTime),
    modelNote: '공간-의상 색채 대비 매트릭스 알고리즘으로 동기화되었습니다.'
  };
}
