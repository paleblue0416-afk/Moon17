import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  Monitor, 
  Sparkles, 
  Database, 
  Terminal, 
  RefreshCw,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import { checkBackendHealth } from '../services/apiClient';

export const ArchitectureView: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [testingHealth, setTestingHealth] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const testHealthEndpoint = async () => {
    setTestingHealth(true);
    const start = performance.now();
    try {
      const res = await checkBackendHealth();
      setLatency(Math.round(performance.now() - start));
      setHealthStatus(res);
    } catch (e) {
      setHealthStatus({ status: 'error', error: String(e) });
    } finally {
      setTestingHealth(false);
    }
  };

  useEffect(() => {
    testHealthEndpoint();
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <Cpu className="w-3.5 h-3.5 text-amber-700" />
          <span>모듈 ⑤ : 시스템 아키텍처 및 보안 파이프라인 (System Architecture)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Express 보안 프록시 및 Gemini 3.8 Flash 파이프라인
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Google AI Studio의 안전한 아키텍처 원칙에 따라 Gemini API Key를 브라우저에 일절 노출하지 않고 
          서버 사이드 Express 엔드포인트를 통해 중계하며, 완벽한 폴백 엔진을 구비한 무중단 아키텍처입니다.
        </p>
      </div>

      {/* Interactive System Pipeline Flow Diagram */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 sm:p-8 text-stone-100 shadow-md">
        <div className="text-xs font-mono text-amber-400 mb-6 flex items-center justify-between">
          <span>END-TO-END MULTIMODAL PIPELINE</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>실시간 엔드포인트 활성화됨</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1: Client Layer */}
          <div className="bg-stone-850 rounded-xl p-5 border border-stone-700/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-stone-400 uppercase">Layer 01: Client</div>
              <h3 className="font-bold text-stone-100 text-base mt-0.5">React 19 + Tailwind v4</h3>
            </div>
            <ul className="text-xs text-stone-300 space-y-1.5 font-light">
              <li>• TypeScript 엄격한 DTO 타입 안전성</li>
              <li>• 사진 업로드 & 60:30:10 시각화 인터랙션</li>
              <li>• 3-Way 착장 및 크로스 싱크 UI</li>
              <li>• LocalStorage 보관함 & 복사 기능</li>
            </ul>
            <div className="text-[10px] font-mono text-amber-300/80 pt-2 border-t border-stone-800">
              API 키 클라이언트 비노출 원칙 준수
            </div>
          </div>

          {/* Step 2: Server Proxy Layer */}
          <div className="bg-stone-850 rounded-xl p-5 border border-stone-700/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-stone-400 uppercase">Layer 02: Backend Proxy</div>
              <h3 className="font-bold text-stone-100 text-base mt-0.5">Express Server (Port 3000)</h3>
            </div>
            <ul className="text-xs text-stone-300 space-y-1.5 font-light">
              <li>• <code className="text-amber-300">/api/interior</code> : 공간 진단</li>
              <li>• <code className="text-amber-300">/api/fashion</code> : 3-Way 코디</li>
              <li>• <code className="text-amber-300">/api/cross-mood</code> : 무드 싱크</li>
              <li>• <code className="text-amber-300">/api/health</code> : 헬스체크</li>
            </ul>
            <div className="text-[10px] font-mono text-emerald-400 pt-2 border-t border-stone-800 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>process.env.GEMINI_API_KEY 격리</span>
            </div>
          </div>

          {/* Step 3: AI Intelligence Engine */}
          <div className="bg-stone-850 rounded-xl p-5 border border-stone-700/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-stone-400 uppercase">Layer 03: AI Engine</div>
              <h3 className="font-bold text-stone-100 text-base mt-0.5">Gemini 3.8 Flash</h3>
            </div>
            <ul className="text-xs text-stone-300 space-y-1.5 font-light">
              <li>• 비전 멀티모달 이미지 분석</li>
              <li>• responseMimeType: 'application/json'</li>
              <li>• 색채학(Color Theory) 배색 매핑</li>
              <li>• 큐레이티드 폴백 엔진 자동 가동</li>
            </ul>
            <div className="text-[10px] font-mono text-amber-300/80 pt-2 border-t border-stone-800 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>고속 저지연 추론 모델</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Health Check & Latency Console */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-amber-700">API HEALTH CONSOLE</span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              백엔드 프록시 및 API 상태 진단
            </h3>
          </div>
          <button
            onClick={testHealthEndpoint}
            disabled={testingHealth}
            className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingHealth ? 'animate-spin' : ''}`} />
            <span>상태 새로고침</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">서버 구동 상태:</span>
            <div className="text-base font-bold text-emerald-600 flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{healthStatus?.status === 'ok' ? '정상 작동 중 (ONLINE)' : '연결 확인 중'}</span>
            </div>
            <p className="text-[11px] text-stone-400">Node.js Express @ Port 3000</p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">Gemini 3.8 Flash 엔진:</span>
            <div className="text-base font-bold text-amber-700 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-4 h-4" />
              <span>{healthStatus?.hasApiKey ? 'API 키 로드 완료' : '전용 큐레이션 엔진'}</span>
            </div>
            <p className="text-[11px] text-stone-400">폴백 보호 시스템 상시 준비</p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">네트워크 왕복 지연 (RTT):</span>
            <div className="text-base font-bold text-stone-900 font-mono mt-0.5">
              {latency !== null ? `${latency} ms` : '측정 대기'}
            </div>
            <p className="text-[11px] text-stone-400">내부 리버스 프록시 통신</p>
          </div>
        </div>

        {/* Live Raw JSON Response Snippet */}
        <div className="mt-2 bg-stone-900 text-amber-300 font-mono text-[11px] p-4 rounded-lg overflow-x-auto border border-stone-800">
          <div className="text-stone-400 mb-1 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>GET /api/health Response:</span>
          </div>
          <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
        </div>
      </div>

      {/* Security & Architectural Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>보안 원칙: 클라이언트 키 비노출 (Zero Client Key)</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            구글 AI 스튜디오 규정에 따라, 브라우저 환경에 <code className="font-mono text-amber-800 bg-amber-50 px-1 py-0.5 rounded">VITE_</code> 접두사가 붙은 시크릿 키를 절대 배치하지 않습니다. 모든 외부 AI 호출은 서버 사이드 컨트롤러를 경유하여 악의적인 탈취를 원천 차단합니다.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>무중단 원칙: 듀얼 폴백 엔진 (Graceful Fallback)</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            네트워크 장애나 외부 AI API 레이트 리밋 발생 시에도 사용자가 빈 화면이나 에러를 보지 않도록, 검증된 색채학 및 인테리어 가구 배치 전문가 로직을 담은 Fallback Engine이 100% 매끄럽게 응답을 대체합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
