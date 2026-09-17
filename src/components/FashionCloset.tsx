import React, { useState } from 'react';
import { 
  Shirt, 
  Sparkles, 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Check, 
  Copy, 
  Bookmark, 
  ArrowRight, 
  Layers, 
  Sparkle, 
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { 
  FashionInput, 
  FashionReport, 
  TPOType, 
  WeatherType, 
  PersonalColor, 
  OutfitOption 
} from '../types';
import { 
  TPO_OPTIONS, 
  PERSONAL_COLORS_INFO, 
  SAMPLE_KEY_ITEMS 
} from '../data/presetData';
import { requestFashionRecommendation } from '../services/apiClient';
import { PrescriptionVisualGallery } from './PrescriptionVisualGallery';
import { getFashionPrescriptionImages } from '../data/prescriptionImages';

interface FashionClosetProps {
  initialInput?: Partial<FashionInput>;
  onSaveBookmark: (title: string, subtitle: string, payload: FashionReport) => void;
  onNavigateToCrossMoodWithFashion: (fashionDescription: string) => void;
}

export const FashionCloset: React.FC<FashionClosetProps> = ({
  initialInput,
  onSaveBookmark,
  onNavigateToCrossMoodWithFashion
}) => {
  // Input states
  const [tpo, setTpo] = useState<TPOType>(initialInput?.tpo || 'business');
  const [temperature, setTemperature] = useState<number>(initialInput?.temperature ?? 19);
  const [weather, setWeather] = useState<WeatherType>(initialInput?.weather || 'sunny');
  const [personalColor, setPersonalColor] = useState<PersonalColor>(initialInput?.personalColor || 'fall_warm');
  const [keyItem, setKeyItem] = useState<string>(initialInput?.keyItem || '베이지 트렌치코트');

  // Loading & Output states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<FashionReport | null>(null);
  const [selectedOutfitType, setSelectedOutfitType] = useState<'best' | 'trend' | 'comfort'>('best');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedBookmark, setSavedBookmark] = useState<boolean>(false);
  const [engineSource, setEngineSource] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number>(0);

  const weatherOptions: Array<{ id: WeatherType; label: string; icon: React.ReactNode }> = [
    { id: 'sunny', label: '맑음', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { id: 'cloudy', label: '흐림', icon: <Cloud className="w-4 h-4 text-stone-400" /> },
    { id: 'rainy', label: '비', icon: <CloudRain className="w-4 h-4 text-blue-500" /> },
    { id: 'windy', label: '바람/선선', icon: <Wind className="w-4 h-4 text-teal-500" /> },
    { id: 'chilly', label: '쌀쌀함', icon: <Thermometer className="w-4 h-4 text-indigo-500" /> },
    { id: 'summer', label: '초여름/더움', icon: <Sun className="w-4 h-4 text-rose-500" /> },
  ];

  // Run AI styling
  const handleRunStyling = async () => {
    setIsLoading(true);
    setSavedBookmark(false);

    const inputData: FashionInput = {
      tpo,
      temperature,
      weather,
      personalColor,
      keyItem: keyItem.trim() || '베이지 트렌치코트'
    };

    const res = await requestFashionRecommendation(inputData);
    setReport(res.data);
    setEngineSource(res.source === 'gemini-3.8-flash' ? 'Google Gemini 3.8 Flash' : 'Expert Styling Engine');
    setLatencyMs(res.latencyMs);
    setIsLoading(false);

    // Auto-scroll to results
    setTimeout(() => {
      const el = document.getElementById('fashion-report-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCopyReport = async () => {
    if (!report) return;
    const activeOutfit = report.outfits[selectedOutfitType];
    const text = `[스타일스페이스] ${TPO_OPTIONS[report.input.tpo].label} (${report.input.temperature}℃) 3-Way 스타일링 리포트
착장 타입: ${activeOutfit.typeTitle}
슬로건: ${activeOutfit.tagline}
[헤드투토 큐레이션]
${activeOutfit.headToToe.outer ? `• 아우터: ${activeOutfit.headToToe.outer.item} (${activeOutfit.headToToe.outer.material} / ${activeOutfit.headToToe.outer.fit})` : ''}
• 상의: ${activeOutfit.headToToe.top.item} (${activeOutfit.headToToe.top.material} / ${activeOutfit.headToToe.top.fit})
• 하의: ${activeOutfit.headToToe.bottom.item} (${activeOutfit.headToToe.bottom.material} / ${activeOutfit.headToToe.bottom.fit})
• 슈즈: ${activeOutfit.headToToe.shoes.item} (${activeOutfit.headToToe.shoes.material})
• 액세서리: ${activeOutfit.headToToe.accessories.items.join(', ')}
[디테일 연출 팁]
${activeOutfit.stylingDetailTips.map(t => `- ${t}`).join('\n')}
전문가 조언: ${report.expertSummary}`;

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
      `${TPO_OPTIONS[report.input.tpo].label} (${report.input.temperature}℃)`,
      `${PERSONAL_COLORS_INFO[report.input.personalColor].label} · ${report.outfits[selectedOutfitType].typeTitle}`,
      report
    );
    setSavedBookmark(true);
    setTimeout(() => setSavedBookmark(false), 2500);
  };

  const currentOutfit: OutfitOption | undefined = report?.outfits[selectedOutfitType];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <Shirt className="w-3.5 h-3.5 text-amber-700" />
          <span>모듈 B : AI 데일리 & 오케이션 패션 코디 가이드 (Fashion Closet)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          실시간 기온과 TPO 맞춤 3-Way 착장 가이드
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          어디를 가는지(TPO), 오늘 날씨와 기온은 몇 도인지, 소장하고 있는 옷은 무엇인지 입력하면 
          ‘정석 밸런스’, ‘트렌디 포인트’, ‘편안한 세련됨’ 3가지 맞춤 룩북을 헤드투토로 분해하여 제안합니다.
        </p>
      </div>

      {/* Input Parameter Form Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-7">
        {/* 1. TPO Selection */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
            1. 방문 장소 및 TPO (Occasion)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {(Object.keys(TPO_OPTIONS) as TPOType[]).map((t) => {
              const info = TPO_OPTIONS[t];
              const isSelected = tpo === t;
              return (
                <button
                  key={t}
                  id={`tpo-option-${t}`}
                  onClick={() => setTpo(t)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 ring-1 ring-amber-500/30'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-sm text-stone-900">{info.label}</div>
                  <div className="text-[11px] text-stone-500 font-normal mt-1 leading-tight">{info.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Temperature & Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-stone-100">
          {/* Temperature Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="temp-slider" className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-700" />
                <span>2. 당일 기온 (Temperature)</span>
              </label>
              <span className="text-sm font-bold text-amber-800 font-mono">
                {temperature}℃
              </span>
            </div>
            <input
              id="temp-slider"
              type="range"
              min="-5"
              max="35"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>-5℃ (한겨울)</span>
              <span>12℃ (초봄/가을)</span>
              <span>20℃ (선선/적정)</span>
              <span>30℃+ (한여름)</span>
            </div>
          </div>

          {/* Weather Radio Chips */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              당일 날씨 (Weather Condition)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {weatherOptions.map((w) => {
                const isSelected = weather === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWeather(w.id)}
                    className={`py-2 px-2.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 ring-1 ring-amber-500/30'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {w.icon}
                    <span>{w.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Personal Color */}
        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
            3. 퍼스널 컬러 (Personal Color)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {(Object.keys(PERSONAL_COLORS_INFO) as PersonalColor[]).map((p) => {
              const info = PERSONAL_COLORS_INFO[p];
              const isSelected = personalColor === p;
              return (
                <button
                  key={p}
                  id={`personal-color-${p}`}
                  onClick={() => setPersonalColor(p)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/60 font-semibold text-amber-950 ring-1 ring-amber-500/30'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="flex gap-1 mb-2">
                      {info.palette.map((hex, i) => (
                        <span 
                          key={i} 
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: hex }} 
                        />
                      ))}
                    </div>
                    <div className="font-bold text-stone-900">{info.label}</div>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1 line-clamp-1">{info.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. User Key Item */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <label htmlFor="fashion-key-item" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
            4. 소장 키 아이템 (Key Piece)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="fashion-key-item"
              type="text"
              value={keyItem}
              onChange={(e) => setKeyItem(e.target.value)}
              placeholder="예: 베이지 오버핏 트렌치코트, 차콜 슬랙스, 네이비 블레이저..."
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>
          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-stone-400">자주 쓰는 아이템:</span>
            {SAMPLE_KEY_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setKeyItem(item)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            id="fashion-run-styling-btn"
            disabled={isLoading}
            onClick={handleRunStyling}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-500 text-stone-950 hover:shadow-md'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-600" />
                <span>Gemini 3.8 Flash 스타일링 엔진 분석 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>3-Way 착장 가이드 및 룩북 생성하기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Styling Report Section */}
      {report && (
        <section 
          id="fashion-report-section" 
          className="space-y-6 pt-6 border-t border-stone-200 animate-fadeIn"
        >
          {/* Report Top Header */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                <span>코디북 리포트 #{report.id.slice(-6)}</span>
                <span>•</span>
                <span>엔진: {engineSource}</span>
                {latencyMs > 0 && <span>({latencyMs}ms)</span>}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {TPO_OPTIONS[report.input.tpo].label} 맞춤 3-Way 착장 리포트
              </h2>
              <p className="text-xs text-stone-300 mt-1 font-light">
                {report.input.temperature}℃ {weatherOptions.find(w => w.id === report.input.weather)?.label} 날씨 · {PERSONAL_COLORS_INFO[report.input.personalColor].label}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="fashion-copy-btn"
                onClick={handleCopyReport}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? '복사 완료' : '룩북 복사'}</span>
              </button>
              <button
                id="fashion-save-bookmark-btn"
                onClick={handleSaveToBookmarks}
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {savedBookmark ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedBookmark ? '보관함 저장됨' : '북마크 보관'}</span>
              </button>
            </div>
          </div>

          {/* 3-Way Segment Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'best', label: '① 가장 균형 잡힌 정석 코디', sub: '호불호 없는 안정적 모범 착장', icon: <Check className="w-4 h-4 text-emerald-600" /> },
              { id: 'trend', label: '② 트렌디한 포인트 룩', sub: '감각적인 실루엣과 텍스처 포인트', icon: <Sparkle className="w-4 h-4 text-amber-600" /> },
              { id: 'comfort', label: '③ 편안하고 세련된 디자인', sub: '장시간 착용에도 편안한 원마일 룩', icon: <Layers className="w-4 h-4 text-sky-600" /> }
            ].map((tab) => {
              const isSelected = selectedOutfitType === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`outfit-tab-${tab.id}`}
                  onClick={() => setSelectedOutfitType(tab.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-500/30'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 pl-6">
                    {tab.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Outfit Content */}
          {currentOutfit && (
            <div className="space-y-6">
              {/* 70% Image : 30% Text Multi-Image Lookbook Prescription Gallery */}
              <PrescriptionVisualGallery
                title={`${currentOutfit.typeTitle} AI 룩북 처방전`}
                subtitle={`"${currentOutfit.tagline}" — TPO 및 기온 공식에 따른 고해상도 코디네이션 컬렉션`}
                images={getFashionPrescriptionImages(report.input.tpo, selectedOutfitType)}
                compactTextSummary={
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">
                        착장 팔레트 스와치
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {currentOutfit.paletteSwatches.map((swatch, idx) => (
                          <div key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[10px]">
                            <span 
                              className="w-3 h-3 rounded-full border border-black/10" 
                              style={{ backgroundColor: swatch.hex }} 
                            />
                            <span className="text-stone-700 font-medium">{swatch.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-stone-100">
                      <div className="text-[10px] font-bold text-stone-500 uppercase">피스 구성 (Head-to-Toe)</div>
                      {currentOutfit.headToToe.outer && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 font-medium">아우터:</span>
                          <span className="font-bold text-stone-900 line-clamp-1">{currentOutfit.headToToe.outer.item}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 font-medium">상의:</span>
                        <span className="font-bold text-stone-900 line-clamp-1">{currentOutfit.headToToe.top.item}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 font-medium">하의:</span>
                        <span className="font-bold text-stone-900 line-clamp-1">{currentOutfit.headToToe.bottom.item}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 font-medium">슈즈:</span>
                        <span className="font-bold text-stone-900 line-clamp-1">{currentOutfit.headToToe.shoes.item}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                      <div className="font-bold text-stone-900">스타일링 핵심 팁</div>
                      <p className="text-stone-600 leading-snug">
                        {currentOutfit.stylingDetailTips[0] || '단정한 실루엣과 소재 텍스처의 균형에 집중하세요.'}
                      </p>
                    </div>
                  </div>
                }
              />

              {/* Head-to-Toe Breakdown */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <div className="text-xs font-mono font-bold text-amber-700">HEAD-TO-TOE CURATION</div>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                    {currentOutfit.typeTitle}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 font-medium">
                    "{currentOutfit.tagline}"
                  </p>
                </div>

                {/* Color Swatch Bar for this Outfit */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                  <span className="font-semibold text-stone-700">착장 팔레트:</span>
                  <div className="flex items-center gap-2">
                    {currentOutfit.paletteSwatches.map((swatch, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: swatch.hex }} 
                        />
                        <span className="text-[11px] text-stone-600">{swatch.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Garment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Outer (if any) */}
                  {currentOutfit.headToToe.outer && (
                    <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Outer (아우터)</div>
                      <div className="font-bold text-stone-900 text-sm">{currentOutfit.headToToe.outer.item}</div>
                      <div className="space-y-1 text-xs text-stone-600">
                        <div><strong className="text-stone-700">소재:</strong> {currentOutfit.headToToe.outer.material}</div>
                        <div><strong className="text-stone-700">실루엣:</strong> {currentOutfit.headToToe.outer.fit}</div>
                        <div><strong className="text-stone-700">컬러:</strong> {currentOutfit.headToToe.outer.color}</div>
                      </div>
                    </div>
                  )}

                  {/* Top */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Top (상의)</div>
                    <div className="font-bold text-stone-900 text-sm">{currentOutfit.headToToe.top.item}</div>
                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-700">소재:</strong> {currentOutfit.headToToe.top.material}</div>
                      <div><strong className="text-stone-700">실루엣:</strong> {currentOutfit.headToToe.top.fit}</div>
                      <div><strong className="text-stone-700">컬러:</strong> {currentOutfit.headToToe.top.color}</div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Bottom (하의)</div>
                    <div className="font-bold text-stone-900 text-sm">{currentOutfit.headToToe.bottom.item}</div>
                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-700">소재:</strong> {currentOutfit.headToToe.bottom.material}</div>
                      <div><strong className="text-stone-700">실루엣:</strong> {currentOutfit.headToToe.bottom.fit}</div>
                      <div><strong className="text-stone-700">컬러:</strong> {currentOutfit.headToToe.bottom.color}</div>
                    </div>
                  </div>

                  {/* Shoes */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Shoes (슈즈)</div>
                    <div className="font-bold text-stone-900 text-sm">{currentOutfit.headToToe.shoes.item}</div>
                    <div className="space-y-1 text-xs text-stone-600">
                      <div><strong className="text-stone-700">소재:</strong> {currentOutfit.headToToe.shoes.material}</div>
                      <div><strong className="text-stone-700">실루엣:</strong> {currentOutfit.headToToe.shoes.fit}</div>
                      <div><strong className="text-stone-700">컬러:</strong> {currentOutfit.headToToe.shoes.color}</div>
                    </div>
                  </div>
                </div>

                {/* Accessories Bar */}
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>추천 액세서리 매칭:</span>
                  </div>
                  <div className="text-stone-700 font-medium">
                    {currentOutfit.headToToe.accessories.items.join(' · ')}
                  </div>
                  <p className="text-stone-500 text-[11px]">
                    * {currentOutfit.headToToe.accessories.note}
                  </p>
                </div>
              </div>

              {/* Styling Detail Tips */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <div className="text-xs font-mono font-bold text-amber-700">STYLING DETAIL SECRETS</div>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                    스타일링 디테일 팁 (롤업, 단추, 톤온톤 배색 요령)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentOutfit.stylingDetailTips.map((tip, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-stone-900 text-xs">포인트 #{idx + 1}</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Cross-Mood Action Bar */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-stone-500">
                    현재 룩북 착장을 방 인테리어(패브릭, 식물, 조명)로 확장 투영해보세요.
                  </p>
                  <button
                    onClick={() => onNavigateToCrossMoodWithFashion(
                      `${TPO_OPTIONS[report.input.tpo].label} ${currentOutfit.typeTitle} (${currentOutfit.headToToe.top.item}, ${currentOutfit.headToToe.bottom.item})`
                    )}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>이 착장 무드로 방 인테리어 확장하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
