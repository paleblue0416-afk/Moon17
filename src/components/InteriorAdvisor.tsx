import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  Bookmark, 
  ArrowRight, 
  ShoppingBag, 
  Lightbulb, 
  Maximize2, 
  Eye, 
  Compass, 
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  InteriorInput, 
  InteriorReport, 
  RoomType, 
  BudgetTier, 
  InteriorMood 
} from '../types';
import { 
  ROOM_PRESETS, 
  ROOM_TYPES_INFO, 
  INTERIOR_MOODS_INFO, 
  BUDGET_OPTIONS, 
  RoomPreset 
} from '../data/presetData';
import { requestInteriorDiagnosis } from '../services/apiClient';
import { PrescriptionVisualGallery } from './PrescriptionVisualGallery';
import { getInteriorPrescriptionImages } from '../data/prescriptionImages';

interface InteriorAdvisorProps {
  initialInput?: Partial<InteriorInput>;
  onSaveBookmark: (title: string, subtitle: string, payload: InteriorReport) => void;
  onNavigateToCrossMoodWithInterior: (moodDescription: string) => void;
}

export const InteriorAdvisor: React.FC<InteriorAdvisorProps> = ({
  initialInput,
  onSaveBookmark,
  onNavigateToCrossMoodWithInterior
}) => {
  // Input states
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-room-1');
  const [roomType, setRoomType] = useState<RoomType>(initialInput?.roomType || 'one_room');
  const [areaPyung, setAreaPyung] = useState<number>(initialInput?.areaPyung || 7);
  const [budget, setBudget] = useState<BudgetTier>(initialInput?.budget || 'under_300k');
  const [mood, setMood] = useState<InteriorMood>(initialInput?.mood || 'natural_warm_wood');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<string>('');

  // Loading & Result states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<InteriorReport | null>(null);
  const [engineSource, setEngineSource] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedBookmark, setSavedBookmark] = useState<boolean>(false);

  // Apply preset room
  const handleSelectPreset = (preset: RoomPreset) => {
    setSelectedPresetId(preset.id);
    setRoomType(preset.roomType);
    setAreaPyung(preset.areaPyung);
    setBudget(preset.budget);
    setMood(preset.mood);
    setCustomImage(preset.imageUrl);
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomImage(reader.result);
        setSelectedPresetId('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  // Run AI diagnosis
  const handleRunDiagnosis = async () => {
    setIsLoading(true);
    setSavedBookmark(false);

    const inputData: InteriorInput = {
      roomType,
      areaPyung,
      budget,
      mood,
      imageBase64: customImage || undefined,
      customNotes: customNotes.trim() || undefined
    };

    const res = await requestInteriorDiagnosis(inputData);
    setReport(res.data);
    setEngineSource(res.source === 'gemini-3.8-flash' ? 'Google Gemini 3.8 Flash' : 'Specialist Styling Engine');
    setLatencyMs(res.latencyMs);
    setIsLoading(false);

    // Auto-scroll to results
    setTimeout(() => {
      const resultEl = document.getElementById('interior-report-section');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Copy report
  const handleCopyReport = async () => {
    if (!report) return;
    const text = `[스타일스페이스] ${report.areaPyung}평 ${ROOM_TYPES_INFO[report.roomType].label} 인테리어 처방전
- 스타일 무드: ${INTERIOR_MOODS_INFO[report.mood].label}
- 60:30:10 컬러 팔레트:
  • 주조색(60%): ${report.palette.base.name} (${report.palette.base.hex})
  • 보조색(30%): ${report.palette.sub.name} (${report.palette.sub.hex})
  • 포인트(10%): ${report.palette.accent.name} (${report.palette.accent.hex})
- 가구 배치 헤드라인: ${report.layout.headline}
- 개방감 팁: ${report.layout.openSpaceTip}
- 조명 추천: ${report.doctorNote.lighting}
- 전선 정리 팁: ${report.doctorNote.wireManagement}
- 시각 노이즈 감축: ${report.doctorNote.visualNoiseReduction}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToBookmarks = () => {
    if (!report) return;
    onSaveBookmark(
      `${report.areaPyung}평 ${ROOM_TYPES_INFO[report.roomType].label}`,
      `${INTERIOR_MOODS_INFO[report.mood].label} · ${BUDGET_OPTIONS[report.budget].label}`,
      report
    );
    setSavedBookmark(true);
    setTimeout(() => setSavedBookmark(false), 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>모듈 A : AI 공간 인테리어 진단 및 처방실 (Interior Advisor)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          공간 사진과 예산으로 완성하는 60:30:10 인테리어 솔루션
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          스마트폰으로 촬영한 방 사진이나 샘플 공간을 선택하면, 시각적 개방감을 극대화하는 황금 분할 컬러칩과 
          가구 재배치 동선, 예산 맞춤형 조명(색온도 K값) 쇼핑리스트를 AI가 즉각 처방합니다.
        </p>
      </div>

      {/* Input Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Room Visual & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-700" />
                <span>1. 공간 사진 / 샘플 프리셋</span>
              </span>
              <label 
                htmlFor="interior-file-upload"
                className="cursor-pointer text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>직접 내 방 사진 올리기</span>
              </label>
              <input
                id="interior-file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Main Preview Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 group">
              {customImage ? (
                <img
                  src={customImage}
                  alt="진단 대상 공간"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-6 text-center">
                  <ImageIcon className="w-10 h-10 mb-2 stroke-1" />
                  <span className="text-xs">아래 프리셋 룸을 선택하거나 사진을 업로드하세요</span>
                </div>
              )}
              {customImage && (
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-stone-900/80 backdrop-blur-sm text-[11px] text-white font-mono">
                  {selectedPresetId === 'custom' ? '사용자 업로드 사진' : '샘플 공간 룸'}
                </div>
              )}
            </div>

            {/* Quick Sample Presets */}
            <div>
              <span className="block text-xs font-semibold text-stone-600 mb-2">
                대표 샘플 공간 선택:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {ROOM_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-500/30'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-amber-800">{preset.personaLabel}</div>
                      <div className="font-bold text-stone-900 truncate mt-0.5">{preset.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{preset.areaPyung}평 · {INTERIOR_MOODS_INFO[preset.mood].label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Room Specs & Mood Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
            {/* 2. Space Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                2. 공간 유형 (Room Type)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(ROOM_TYPES_INFO) as RoomType[]).map((type) => {
                  const info = ROOM_TYPES_INFO[type];
                  const isSelected = roomType === type;
                  return (
                    <button
                      key={type}
                      id={`room-type-${type}`}
                      onClick={() => setRoomType(type)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 ring-1 ring-amber-500/30'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold">{info.label}</div>
                      <div className="text-[11px] text-stone-500 font-normal mt-0.5 line-clamp-1">{info.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Area (Pyung) Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="area-slider" className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  3. 공간 면적 (평수)
                </label>
                <div className="text-sm font-bold text-amber-800 font-mono">
                  {areaPyung}평 <span className="text-xs text-stone-500 font-normal">({(areaPyung * 3.3).toFixed(1)}㎡)</span>
                </div>
              </div>
              <input
                id="area-slider"
                type="range"
                min="4"
                max="35"
                step="1"
                value={areaPyung}
                onChange={(e) => setAreaPyung(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>4평 (초소형)</span>
                <span>7평 (표준 원룸)</span>
                <span>15평 (거실/투룸)</span>
                <span>25평+ (중대형)</span>
              </div>
            </div>

            {/* 4. Target Budget Tier */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                4. 목표 예산 (Budget)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(BUDGET_OPTIONS) as BudgetTier[]).map((tier) => {
                  const b = BUDGET_OPTIONS[tier];
                  const isSelected = budget === tier;
                  return (
                    <button
                      key={tier}
                      id={`budget-tier-${tier}`}
                      onClick={() => setBudget(tier)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 ring-1 ring-amber-500/30'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold">{b.label}</div>
                      <div className="text-[10px] text-stone-500 font-normal mt-0.5">{b.target}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Preferred Mood */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                5. 선호 인테리어 무드 (5대 감성 스타일)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(INTERIOR_MOODS_INFO) as InteriorMood[]).map((m) => {
                  const moodData = INTERIOR_MOODS_INFO[m];
                  const isSelected = mood === m;
                  return (
                    <button
                      key={m}
                      id={`mood-option-${m}`}
                      onClick={() => setMood(m)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-500/30'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex flex-col gap-1 mt-0.5">
                        <div className="flex gap-1">
                          {moodData.hexColors.map((hex, i) => (
                            <span 
                              key={i} 
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs" 
                              style={{ backgroundColor: hex }} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-stone-900">{moodData.label}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{moodData.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Custom Notes */}
            <div>
              <label htmlFor="interior-custom-notes" className="block text-xs font-semibold text-stone-700 mb-1">
                추가 요청 사항 (선택)
              </label>
              <input
                id="interior-custom-notes"
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="예: 침대 옆에 책상을 꼭 두어야 함, 문 열었을 때 옷이 바로 보이지 않게 하고 싶음"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                id="interior-run-diagnosis-btn"
                disabled={isLoading}
                onClick={handleRunDiagnosis}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-500 text-stone-950 hover:shadow-md'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-stone-600" />
                    <span>Gemini 3.8 Flash 비전 멀티모달 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>AI 인테리어 맞춤 처방전 생성하기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Report Section */}
      {report && (
        <section 
          id="interior-report-section" 
          className="space-y-6 pt-6 border-t border-stone-200 animate-fadeIn"
        >
          {/* Report Header */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                <span>진단 리포트 #{report.id.slice(-6)}</span>
                <span>•</span>
                <span>분석 엔진: {engineSource}</span>
                {latencyMs > 0 && <span>({latencyMs}ms)</span>}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {report.areaPyung}평 {ROOM_TYPES_INFO[report.roomType].label} 공간 처방 결과
              </h2>
              <p className="text-xs text-stone-300 mt-1 font-light">
                {INTERIOR_MOODS_INFO[report.mood].label} 스타일 톤앤매너 확립 및 시각적 개방감 극대화
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="interior-copy-btn"
                onClick={handleCopyReport}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? '복사 완료' : '리포트 복사'}</span>
              </button>
              <button
                id="interior-save-bookmark-btn"
                onClick={handleSaveToBookmarks}
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {savedBookmark ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedBookmark ? '보관함 저장됨' : '북마크 보관'}</span>
              </button>
            </div>
          </div>

          {/* 70% Image : 30% Text Multi-Image Prescription Gallery */}
          <PrescriptionVisualGallery
            title={`${report.areaPyung}평 ${ROOM_TYPES_INFO[report.roomType].label} AI 멀티 이미지 처방전`}
            subtitle={`${INTERIOR_MOODS_INFO[report.mood].label} 스타일 톤앤매너 & 가구 동선 고해상도 시각 처방 컬렉션`}
            images={getInteriorPrescriptionImages(report.mood, report.roomType)}
            compactTextSummary={
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">
                    60:30:10 황금 배색 비율
                  </div>
                  <div className="w-full h-5 rounded overflow-hidden flex border border-stone-200">
                    <div style={{ width: '60%', backgroundColor: report.palette.base.hex }} className="h-full" title={`Base 60% ${report.palette.base.name}`} />
                    <div style={{ width: '30%', backgroundColor: report.palette.sub.hex }} className="h-full" title={`Sub 30% ${report.palette.sub.name}`} />
                    <div style={{ width: '10%', backgroundColor: report.palette.accent.hex }} className="h-full" title={`Accent 10% ${report.palette.accent.name}`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                    <span>Base {report.palette.base.hex}</span>
                    <span>Sub {report.palette.sub.hex}</span>
                    <span>Acc {report.palette.accent.hex}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                  <div className="font-bold text-stone-900">가구 배치 개방감 처방</div>
                  <p className="text-stone-600 leading-snug">{report.layout.openSpaceTip}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                  <div className="font-bold text-stone-900">조명 색온도 처방</div>
                  <p className="text-stone-600 leading-snug">{report.doctorNote.lighting}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                  <div className="font-bold text-stone-900">시각적 노이즈 감축</div>
                  <p className="text-stone-600 leading-snug">{report.doctorNote.visualNoiseReduction}</p>
                </div>
              </div>
            }
          />

          {/* 1. 60 : 30 : 10 Space Color Palette */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">OUTPUT 1</span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  60 : 30 : 10 공간 컬러 팔레트 (Golden Color Rule)
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-light hidden sm:inline">
                주조색(Base) 60% : 보조색(Sub) 30% : 포인트색(Accent) 10%
              </span>
            </div>

            {/* Visual Color Ratio Bar */}
            <div className="w-full h-8 rounded-lg overflow-hidden flex border border-stone-200 shadow-xs">
              <div 
                className="h-full flex items-center justify-center text-[10px] font-bold text-stone-800 transition-all"
                style={{ width: '60%', backgroundColor: report.palette.base.hex }}
                title={`주조색 60%: ${report.palette.base.name}`}
              >
                Base 60% ({report.palette.base.hex})
              </div>
              <div 
                className="h-full flex items-center justify-center text-[10px] font-bold text-stone-800 transition-all"
                style={{ width: '30%', backgroundColor: report.palette.sub.hex }}
                title={`보조색 30%: ${report.palette.sub.name}`}
              >
                Sub 30% ({report.palette.sub.hex})
              </div>
              <div 
                className="h-full flex items-center justify-center text-[10px] font-bold text-white transition-all"
                style={{ width: '10%', backgroundColor: report.palette.accent.hex }}
                title={`포인트 10%: ${report.palette.accent.name}`}
              >
                10%
              </div>
            </div>

            {/* 3 Swatch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Base */}
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-6 h-6 rounded-md border border-black/10 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: report.palette.base.hex }}
                    />
                    <div>
                      <div className="text-[11px] font-bold text-amber-800 uppercase">Base (주조색 60%)</div>
                      <div className="font-bold text-stone-900 text-sm">{report.palette.base.name}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-stone-500 mb-2">{report.palette.base.hex}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {report.palette.base.description}
                  </p>
                </div>
              </div>

              {/* Sub */}
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-6 h-6 rounded-md border border-black/10 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: report.palette.sub.hex }}
                    />
                    <div>
                      <div className="text-[11px] font-bold text-amber-800 uppercase">Sub (보조색 30%)</div>
                      <div className="font-bold text-stone-900 text-sm">{report.palette.sub.name}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-stone-500 mb-2">{report.palette.sub.hex}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {report.palette.sub.description}
                  </p>
                </div>
              </div>

              {/* Accent */}
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-6 h-6 rounded-md border border-black/10 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: report.palette.accent.hex }}
                    />
                    <div>
                      <div className="text-[11px] font-bold text-amber-800 uppercase">Accent (포인트색 10%)</div>
                      <div className="font-bold text-stone-900 text-sm">{report.palette.accent.name}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-stone-500 mb-2">{report.palette.accent.hex}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {report.palette.accent.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
              <span>{report.palette.harmonyReason}</span>
            </div>
          </div>

          {/* 2. Furniture Layout & Traffic Flow */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-amber-700">OUTPUT 2</span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                가구 재배치 및 동선 가이드 (Layout & Spatial Flow)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">
                {report.layout.headline}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* 2D Schematic Canvas Diagram */}
              <div className="lg:col-span-5 bg-stone-900 rounded-xl p-5 border border-stone-800 text-stone-200">
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-3">
                  <span>2D 평면 모식도 ({report.areaPyung}평 개방형)</span>
                  <span className="text-amber-400">시선 트임 최적화</span>
                </div>

                <div className="relative aspect-square w-full rounded-lg bg-stone-850 border border-stone-700 p-4 flex flex-col justify-between">
                  {/* Window Zone */}
                  <div className="w-full h-5 border-b-2 border-dashed border-sky-400/80 flex items-center justify-center text-[10px] text-sky-300 font-mono">
                    [ 창 가 - 자연 채광 유입 ]
                  </div>

                  {/* Room Interior Objects Layout */}
                  <div className="grid grid-cols-2 gap-3 my-auto py-2">
                    {/* Bed */}
                    <div className="p-2 rounded bg-amber-900/40 border border-amber-600/50 text-[11px] flex flex-col items-center justify-center text-center">
                      <div className="w-3 h-1 bg-amber-400/80 rounded mb-1" />
                      <span className="font-bold text-amber-200">침대 (수면존)</span>
                      <span className="text-[9px] text-amber-300/80">코너 대각선 배치</span>
                    </div>

                    {/* Desk */}
                    <div className="p-2 rounded bg-stone-800 border border-stone-600 text-[11px] flex flex-col items-center justify-center text-center">
                      <span className="font-bold text-stone-200">작업 데스크</span>
                      <span className="text-[9px] text-stone-400">벽면 정렬 / 개방감</span>
                    </div>
                  </div>

                  {/* Traffic Arrow & Door */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-700 text-[10px]">
                    <div className="flex items-center gap-1 text-emerald-400 font-mono">
                      <span>➔ 75cm+ 통로 동선</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-stone-800 border border-stone-600 text-stone-300">
                      방문 (입구)
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 mt-3 text-center">
                  * 가구 높이를 방문에서 안쪽으로 점진적으로 낮추어 개방감을 형성합니다.
                </p>
              </div>

              {/* Layout Advice Points */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    가구 배치 3대 처방전:
                  </div>
                  {report.layout.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>시각적 개방감(Open-Space) 극대화 팁:</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {report.layout.openSpaceTip}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>무간섭 동선 (Traffic Flow):</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {report.layout.trafficFlow}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Budget-Tailored Shopping List */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">OUTPUT 3</span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  예산 맞춤형 쇼핑 리스트 (Curated Shopping List)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200/60">
                예산 구간: {BUDGET_OPTIONS[report.budget].label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {report.shoppingList.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-400/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-amber-800 font-mono">
                        {item.estimatedPrice}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm mt-1">{item.name}</h4>
                    <p className="text-xs text-amber-900/80 font-medium mt-1 bg-amber-50/60 p-1.5 rounded">
                      스펙: {item.spec}
                    </p>
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                      {item.reason}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <a
                      href={`https://search.shopping.naver.com/search/all?query=${encodeURIComponent(item.searchKeyword)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-2 rounded-lg bg-stone-50 hover:bg-amber-50 hover:text-amber-900 border border-stone-200 text-stone-700 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>쇼핑 키워드 검색</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Expert Doctor's Note */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-amber-700">OUTPUT 4</span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                전문가 닥터 소견 (Interior Doctor's Note)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>조명 톤 & 색온도(K값)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {report.doctorNote.lighting}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>전선 가림 & 클린 하우징</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {report.doctorNote.wireManagement}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-600" />
                  <span>시각적 노이즈(Visual Noise) 감축</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {report.doctorNote.visualNoiseReduction}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-900 text-stone-200 text-xs flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">총평 처방전:</span>
                <span>{report.doctorNote.summaryAdvice}</span>
              </div>
              <button
                onClick={() => onNavigateToCrossMoodWithInterior(
                  `내 방의 ${INTERIOR_MOODS_INFO[report.mood].label} & ${report.palette.base.name}, ${report.palette.sub.name}, ${report.palette.accent.name} 무드`
                )}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>이 방 무드를 패션 착장으로 입어보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
