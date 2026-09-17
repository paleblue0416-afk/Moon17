import React, { useState } from 'react';
import { 
  Layers, 
  ArrowLeftRight, 
  Sparkles, 
  Video, 
  PartyPopper, 
  Check, 
  Copy, 
  Bookmark, 
  RefreshCw, 
  Gauge, 
  Lightbulb, 
  Camera, 
  Info,
  Palette
} from 'lucide-react';
import { CrossMoodReport, SynergyDirection } from '../types';
import { requestCrossMoodAnalysis } from '../services/apiClient';
import { PrescriptionVisualGallery } from './PrescriptionVisualGallery';
import { getCrossMoodPrescriptionImages } from '../data/prescriptionImages';

interface CrossMoodSynergyProps {
  initialSourceText?: string;
  initialDirection?: SynergyDirection;
  onSaveBookmark: (title: string, subtitle: string, payload: CrossMoodReport) => void;
}

export const CrossMoodSynergy: React.FC<CrossMoodSynergyProps> = ({
  initialSourceText,
  initialDirection = 'roomToFashion',
  onSaveBookmark
}) => {
  const [direction, setDirection] = useState<SynergyDirection>(initialDirection);
  const [sourceDescription, setSourceDescription] = useState<string>(
    initialSourceText || '내추럴 웜 우드 & 아이보리 린넨 침구와 2700K 전구색 조명, 몬스테라 화분이 있는 7평 원룸'
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<CrossMoodReport | null>(null);
  const [engineSource, setEngineSource] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedBookmark, setSavedBookmark] = useState<boolean>(false);

  const handleToggleDirection = () => {
    const newDir: SynergyDirection = direction === 'roomToFashion' ? 'fashionToRoom' : 'roomToFashion';
    setDirection(newDir);
    if (newDir === 'fashionToRoom') {
      setSourceDescription('모던 미니멀 올블랙 블레이저 & 차콜 슬랙스와 실버 메탈 워치, 화이트 레더 스니커즈 착장');
    } else {
      setSourceDescription('내추럴 웜 우드 & 아이보리 린넨 침구와 2700K 전구색 조명, 몬스테라 화분이 있는 7평 원룸');
    }
  };

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setSavedBookmark(false);

    const res = await requestCrossMoodAnalysis(direction, sourceDescription.trim());
    setReport(res.data);
    setEngineSource(res.source === 'gemini-3.8-flash' ? 'Google Gemini 3.8 Flash' : 'Synergy Cross Engine');
    setLatencyMs(res.latencyMs);
    setIsLoading(false);

    setTimeout(() => {
      const el = document.getElementById('cross-mood-report-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCopyReport = async () => {
    if (!report) return;
    const text = `[스타일스페이스] 크로스 무드 싱크 리포트
방향: ${report.direction === 'roomToFashion' ? '내 방(인테리어) ➡️ 옷차림(패션)' : '옷차림(패션) ➡️ 내 방(인테리어)'}
타이틀: ${report.targetTransformation.title}
컨셉: ${report.targetTransformation.concept}
[조화도 지수]
- 화상회의 웹캠 대비 점수: ${report.harmonyIndices.videoCallContrastScore}점 (${report.harmonyIndices.videoCallAdvice})
- 홈파티 호스트 조화도: ${report.harmonyIndices.homePartyHostScore}점 (${report.harmonyIndices.homePartyAdvice})
- 일상 바이브 일치도: ${report.harmonyIndices.dailyVibeCoherenceScore}점
[핵심 구성 요소]
${report.targetTransformation.keyItemsOrElements.map(k => `• ${k}`).join('\n')}
[실천 권고 가이드]
${report.targetTransformation.practicalAdvice.map(p => `- ${p}`).join('\n')}`;

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
      `크로스 무드 싱크: ${report.targetTransformation.title}`,
      `${report.direction === 'roomToFashion' ? '방 ➡️ 의상' : '의상 ➡️ 방'} · 화상대비 ${report.harmonyIndices.videoCallContrastScore}점`,
      report
    );
    setSavedBookmark(true);
    setTimeout(() => setSavedBookmark(false), 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>모듈 C : 핵심 차별점 - 공간 x 패션 융합 기능 (Cross-Mood Synergy)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          내 방의 분위기를 입고, 내 스타일을 방으로 확장하는 양방향 무드 싱크
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          인테리어와 패션의 톤앤매너를 일치시켜 조화로운 라이프스타일을 완성합니다. 
          화상회의(웹캠)에서 인물이 돋보이는 명도 대비 점수와 홈파티에서 호스트와 공간이 어우러지는 조화도 지수를 산출합니다.
        </p>
      </div>

      {/* Input Direction Switcher & Parameters Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Direction Switcher Toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              1. 무드 변환 방향 설정 (Direction)
            </span>
            <button
              onClick={handleToggleDirection}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>방향 맞바꾸기</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              id="dir-room-to-fashion"
              onClick={() => {
                setDirection('roomToFashion');
                setSourceDescription('내추럴 웜 우드 & 아이보리 린넨 침구와 2700K 전구색 조명, 몬스테라 화분이 있는 7평 원룸');
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                direction === 'roomToFashion'
                  ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-500/30'
                  : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <span className="w-6 h-6 rounded-md bg-amber-200/60 text-amber-900 flex items-center justify-center text-xs">🏢</span>
                <span>방(인테리어) ➡️ 옷차림(패션)</span>
              </div>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                “내가 편안함을 느끼는 내 방의 분위기를 의상 코디로 치환해 입고 외출하고 싶어요.”
              </p>
            </button>

            <button
              id="dir-fashion-to-room"
              onClick={() => {
                setDirection('fashionToRoom');
                setSourceDescription('모던 미니멀 올블랙 블레이저 & 차콜 슬랙스와 실버 메탈 워치, 화이트 레더 스니커즈 착장');
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                direction === 'fashionToRoom'
                  ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-500/30'
                  : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <span className="w-6 h-6 rounded-md bg-amber-200/60 text-amber-900 flex items-center justify-center text-xs">👔</span>
                <span>옷차림(패션) ➡️ 방(인테리어)</span>
              </div>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                “내가 가장 즐겨 입는 최애 룩북의 세련된 감성을 내 방 인테리어와 데스크테리어로 확장하고 싶어요.”
              </p>
            </button>
          </div>
        </div>

        {/* Source Description Input */}
        <div>
          <label htmlFor="cross-source-desc" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            2. {direction === 'roomToFashion' ? '변환할 현재 내 방의 특징 / 무드' : '변환할 즐겨 입는 착장 스타일 / 룩'}
          </label>
          <textarea
            id="cross-source-desc"
            rows={3}
            value={sourceDescription}
            onChange={(e) => setSourceDescription(e.target.value)}
            placeholder="공간이나 의상의 색감, 가구/패브릭 소재, 조명 분위기 등을 자유롭게 적어주세요."
            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            id="cross-run-analysis-btn"
            disabled={isLoading}
            onClick={handleRunAnalysis}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-500 text-stone-950 hover:shadow-md'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-600" />
                <span>Gemini 3.8 Flash 크로스 무드 싱크 분석 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>공간 ↔ 패션 융합 분석 및 조화도 지수 측정하기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cross-Mood Report */}
      {report && (
        <section 
          id="cross-mood-report-section" 
          className="space-y-6 pt-6 border-t border-stone-200 animate-fadeIn"
        >
          {/* Report Top Header */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
                <span>크로스 싱크 리포트 #{report.id.slice(-6)}</span>
                <span>•</span>
                <span>엔진: {engineSource}</span>
                {latencyMs > 0 && <span>({latencyMs}ms)</span>}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {report.targetTransformation.title}
              </h2>
              <p className="text-xs text-stone-300 mt-1 font-light">
                {report.direction === 'roomToFashion' ? '방(인테리어) ➡️ 옷차림(패션) 치환' : '옷차림(패션) ➡️ 방(인테리어) 확장'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="cross-copy-btn"
                onClick={handleCopyReport}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? '복사 완료' : '리포트 복사'}</span>
              </button>
              <button
                id="cross-save-bookmark-btn"
                onClick={handleSaveToBookmarks}
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {savedBookmark ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedBookmark ? '보관함 저장됨' : '북마크 보관'}</span>
              </button>
            </div>
          </div>

          {/* 70% Image : 30% Text Multi-Image Cross-Mood Prescription Gallery */}
          <PrescriptionVisualGallery
            title={`${report.targetTransformation.title} AI 크로스 무드 처방전`}
            subtitle={`${report.direction === 'roomToFashion' ? '방(인테리어) ➡️ 옷차림(패션) 치환' : '옷차림(패션) ➡️ 방(인테리어) 확장'} 고해상도 시각 싱크 컬렉션`}
            images={getCrossMoodPrescriptionImages(report.direction)}
            compactTextSummary={
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] space-y-1">
                  <div className="font-bold text-amber-950">무드 싱크 컨셉</div>
                  <p className="text-stone-700 leading-snug">{report.targetTransformation.concept}</p>
                </div>

                <div className="space-y-1.5 pt-1 border-t border-stone-100">
                  <div className="text-[10px] font-bold text-amber-800 uppercase">조화도 측정 지표</div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">화상회의 웹캠 대비:</span>
                    <span className="font-bold text-amber-900 font-mono">{report.harmonyIndices.videoCallContrastScore}점</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">홈파티 호스트 조화도:</span>
                    <span className="font-bold text-amber-900 font-mono">{report.harmonyIndices.homePartyHostScore}점</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">일상 바이브 일치도:</span>
                    <span className="font-bold text-amber-900 font-mono">{report.harmonyIndices.dailyVibeCoherenceScore}점</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                  <div className="font-bold text-stone-900">핵심 실천 팁</div>
                  <p className="text-stone-600 leading-snug">
                    {report.targetTransformation.practicalAdvice[0] || '공간의 주조색과 의류의 베이스 컬러를 1:1로 일치시키세요.'}
                  </p>
                </div>
              </div>
            }
          />

          {/* Transformation Concept Overview */}
          <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-5 text-xs text-amber-950 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block mb-1">변환 컨셉 (Transformation Philosophy):</span>
              <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                {report.targetTransformation.concept}
              </p>
            </div>
          </div>

          {/* Harmony Index Scores - The PRD Signature Requirement */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-xs font-mono font-bold text-amber-700">HARMONY INDICES</div>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                화상회의 웹캠 대비도 & 홈파티 호스트 조화도 지수
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Score 1: Video Call Contrast Score */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-amber-700" />
                      <span>화상회의 웹캠 대비 점수</span>
                    </span>
                    <span className="text-xl font-bold text-amber-800 font-mono">
                      {report.harmonyIndices.videoCallContrastScore}점
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-600"
                      style={{ width: `${report.harmonyIndices.videoCallContrastScore}%` }}
                    />
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {report.harmonyIndices.videoCallAdvice}
                  </p>
                </div>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-200/60">
                  * 배경과 상의 명도 대비 3.0:1 이상 권장
                </div>
              </div>

              {/* Score 2: Home Party Host Harmony Score */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <PartyPopper className="w-4 h-4 text-amber-700" />
                      <span>홈파티 호스트 조화도</span>
                    </span>
                    <span className="text-xl font-bold text-amber-800 font-mono">
                      {report.harmonyIndices.homePartyHostScore}점
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-600"
                      style={{ width: `${report.harmonyIndices.homePartyHostScore}%` }}
                    />
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {report.harmonyIndices.homePartyAdvice}
                  </p>
                </div>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-200/60">
                  * 공간 패브릭과 옷감 텍스처의 온화한 융합
                </div>
              </div>

              {/* Score 3: Daily Vibe Coherence */}
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-amber-700" />
                      <span>일상 무드 싱크 일치도</span>
                    </span>
                    <span className="text-xl font-bold text-amber-800 font-mono">
                      {report.harmonyIndices.dailyVibeCoherenceScore}점
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-600"
                      style={{ width: `${report.harmonyIndices.dailyVibeCoherenceScore}%` }}
                    />
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    방의 인테리어 정체성과 입고 있는 옷의 일상적 라이프스타일 톤앤매너 싱크 완성도입니다.
                  </p>
                </div>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-200/60">
                  * 정체성 불일치(Cognitive Dissonance) 해소
                </div>
              </div>
            </div>
          </div>

          {/* Key Translated Elements / Items */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-xs font-mono font-bold text-amber-700">ELEMENT TRANSLATION</div>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                핵심 구성 아이템 번역 (Key Elements)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {report.targetTransformation.keyItemsOrElements.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs">
                  <div className="w-5 h-5 rounded-full bg-amber-600 text-stone-950 font-bold flex items-center justify-center text-[10px] mb-2">
                    {idx + 1}
                  </div>
                  <p className="text-stone-800 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Translation Matrix */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-xs font-mono font-bold text-amber-700">COLOR TRANSLATION MATRIX</div>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                색상 및 소재 번역 매핑 (Color & Material Mapping)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.targetTransformation.colorTranslation.translatedColors.map((trans, idx) => {
                const source = report.targetTransformation.colorTranslation.sourceColors[idx] || trans;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: source.hex }} 
                        />
                        <span className="text-xs font-bold text-stone-900">{source.name}</span>
                      </div>
                      <span className="text-xs text-amber-700 font-bold">➔</span>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                          style={{ backgroundColor: trans.hex }} 
                        />
                        <span className="text-xs font-bold text-stone-900">{trans.name}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs">
                      <div className="font-semibold text-stone-800 mb-1">적용 대상: {trans.application}</div>
                      <p className="text-stone-500 leading-relaxed text-[11px]">
                        공간의 주조색/보조색 톤을 의류 또는 인테리어 패브릭으로 1:1 대응하여 자연스러운 연속성을 형성합니다.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Advice */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="text-xs font-mono font-bold text-amber-700">PRACTICAL ADVICE</div>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                라이프스타일 실천 권고 (Daily Implementation)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.targetTransformation.practicalAdvice.map((adv, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    <span>실천 솔루션 #{idx + 1}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {adv}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
