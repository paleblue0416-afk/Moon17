import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Search, 
  BookOpen, 
  ListOrdered, 
  CheckCircle2, 
  BarChart3, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { PRD_RAW_MARKDOWN, SPEC_TABLE_ROWS, TARGET_PERSONAS } from '../data/prdData';

export const PrdViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(PRD_RAW_MARKDOWN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy PRD markdown:', err);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([PRD_RAW_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'StyleSpace_PRD_Atelier_Duo.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const tocItems = [
    { id: 'sec-1', label: '1. 제품 개요 및 기획 배경' },
    { id: 'sec-2', label: '2. 타겟 페르소나 및 문제 정의' },
    { id: 'sec-3', label: '3. 핵심 기능 요구사항 명세' },
    { id: 'sec-4', label: '4. 정보 구조 (IA) & 사용자 여정' },
    { id: 'sec-5', label: '5. 기술 스택 및 아키텍처' },
    { id: 'sec-6', label: '6. 성공 지표 (KPIs)' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSpecRows = SPEC_TABLE_ROWS.filter(row => 
    !searchQuery || 
    row.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.inputSpecs.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.outputSpecs.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.aiTech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Action Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Product Requirement Document (PRD) 전문 뷰어</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            StyleSpace (아틀리에 듀오) 기획 명세서
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            공간(인테리어)과 의상(패션)의 톤앤매너 싱크라이프를 정의한 프로덕트 요구사항 전문입니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Full PRD Markdown Button */}
          <button
            id="prd-copy-markdown-btn"
            onClick={handleCopyMarkdown}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? '전체 마크다운 복사 완료!' : '전체 PRD 마크다운 복사'}</span>
          </button>

          {/* Download Markdown File */}
          <button
            id="prd-download-markdown-btn"
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>.md 파일 다운로드</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Table of Contents + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sticky Table of Contents & Search */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="sticky top-20 bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            {/* Search Filter Box */}
            <div>
              <label htmlFor="prd-search-input" className="block text-xs font-semibold text-stone-700 mb-1.5">
                기획서 내용 검색
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="prd-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="모듈, TPO, 60:30:10, KPI..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Quick Section Jump */}
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <ListOrdered className="w-3.5 h-3.5" />
                <span>목차 바로가기</span>
              </div>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                      activeSection === item.id
                        ? 'bg-amber-50 text-amber-900 font-semibold border-l-2 border-amber-600'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Overview Summary */}
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
              <div>• 제품명: 스타일스페이스 (StyleSpace)</div>
              <div>• 부제: Atelier Duo (공간과 옷장)</div>
              <div>• 핵심 엔진: Gemini 3.8 Flash</div>
              <div>• 아키텍처: Express Secure Proxy</div>
            </div>
          </div>
        </aside>

        {/* Right PRD Sections */}
        <div className="lg:col-span-3 space-y-8">
          {/* Section 1: Overview */}
          <section id="sec-1" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 1</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">제품 개요 및 기획 배경 (Overview & Background)</h2>
            </div>

            <div className="space-y-3 text-sm text-stone-700 leading-relaxed">
              <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200/60">
                <div className="text-xs font-bold text-amber-900 uppercase">한 줄 정의 (Value Proposition)</div>
                <div className="text-sm font-medium text-stone-900 mt-1">
                  나의 방(인테리어)과 나의 스타일(의상)의 톤앤매너를 일치시켜 조화로운 라이프스타일을 완성하는 멀티모달 AI 스타일링 자문 웹 서비스
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">1.1 문제의식 (Pain Points)</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  기존 시장은 <strong className="text-stone-800">‘인테리어 플랫폼(오늘의집 등)’</strong>과{' '}
                  <strong className="text-stone-800">‘패션 코디 플랫폼(무신사 등)’</strong>으로 분절되어 있어, 
                  공간의 분위기와 개인의 패션 아이덴티티가 따로 노는 경향이 있습니다. 
                  많은 사용자가 “가구를 사도 내 방 분위기와 어울리지 않음”, “아침마다 TPO와 날씨에 맞는 옷을 고르기 어려움”, 
                  “방 안에서 화상회의나 손님 초대 시 공간과 어울리는 룩북에 대한 감각 부재”를 겪습니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">1.2 목적 (Objectives)</h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 list-disc list-inside">
                  <li>공간과 개인의 스타일링 고민을 한 곳에서 해결하는 원스톱 솔루션 제공.</li>
                  <li>스마트폰 사진 한 장으로 현재 공간의 주조색·보조색 팔레트(60:30:10 법칙) 및 개선 포인트를 즉각 진단.</li>
                  <li>실시간 날씨, TPO(출근, 데이트, 하객룩, 홈파티 등), 퍼스널 컬러에 기반한 3-Way 착장 가이드 제공.</li>
                  <li>공간의 무드를 의상 스타일로 치환하거나, 좋아하는 룩북을 방 인테리어로 확장하는 '크로스 무드 싱크' 차별화 기능 구축.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Personas */}
          <section id="sec-2" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 2</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">타겟 페르소나 및 문제 정의 (Target Personas)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100/80 text-stone-700 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="p-3 w-28">구분</th>
                    <th className="p-3">페르소나 A (20대 후반 직장인)</th>
                    <th className="p-3">페르소나 B (30대 초반 재택/크리에이터)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-3 font-semibold bg-stone-50/50 text-stone-700">이름 / 직업</td>
                    <td className="p-3 font-medium text-stone-900">{TARGET_PERSONAS[0].name} (28세, 마케터)</td>
                    <td className="p-3 font-medium text-stone-900">{TARGET_PERSONAS[1].name} (33세, 프리랜서 UX 디자이너)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-stone-50/50 text-stone-700">주거 환경</td>
                    <td className="p-3 text-stone-600">{TARGET_PERSONAS[0].housing}</td>
                    <td className="p-3 text-stone-600">{TARGET_PERSONAS[1].housing}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-stone-50/50 text-stone-700">주요 고민</td>
                    <td className="p-3 text-stone-600 space-y-1">
                      {TARGET_PERSONAS[0].problems.map((p, i) => (
                        <div key={i}>• {p}</div>
                      ))}
                    </td>
                    <td className="p-3 text-stone-600 space-y-1">
                      {TARGET_PERSONAS[1].problems.map((p, i) => (
                        <div key={i}>• {p}</div>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-stone-50/50 text-stone-700">핵심 니즈</td>
                    <td className="p-3 text-stone-700 font-medium">
                      큰 시공 없이 패브릭/조명만으로 방 분위기 개선 + 계절별 캡슐 옷장 추천
                    </td>
                    <td className="p-3 text-stone-700 font-medium">
                      감각적인 홈오피스 데스크테리어 + 단정한 스마트 캐주얼 워크웨어 가이드
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Core Features Specification Table */}
          <section id="sec-3" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 3</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">핵심 기능 요구사항 명세 (Core Features)</h2>
            </div>

            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                  <thead className="bg-stone-100/80 text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3 w-40">모듈 구분</th>
                      <th className="p-3">입력 명세 (Inputs)</th>
                      <th className="p-3">출력 및 결과 명세 (Outputs)</th>
                      <th className="p-3 w-32">AI 및 기술 사양</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredSpecRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50">
                        <td className="p-3 font-semibold text-amber-900 bg-amber-50/30">{row.module}</td>
                        <td className="p-3 text-stone-600">{row.inputSpecs}</td>
                        <td className="p-3 text-stone-700">{row.outputSpecs}</td>
                        <td className="p-3 text-stone-500 font-mono text-[11px]">{row.aiTech}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Information Architecture */}
          <section id="sec-4" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 4</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">정보 구조 (IA) 및 사용자 여정 (User Flow)</h2>
            </div>

            <div className="bg-stone-900 text-amber-300 font-mono text-xs p-5 rounded-lg overflow-x-auto leading-relaxed border border-stone-800">
              <pre className="whitespace-pre">
{`[홈 대시보드]
   │
   ├── ① 기획서(PRD) 전문 뷰어 (목차 검색, 스펙 테이블, 마크다운 복사)
   ├── ② 인테리어 진단 체험 (공간·스타일·예산 설정 ➔ 맞춤 처방전 생성)
   ├── ③ 의상 코디 진단 체험 (TPO·기온·퍼스널컬러 설정 ➔ 3-Way 룩북 산출)
   ├── ④ 공간 x 패션 융합 체험 (상호 무드 변환 & 홈파티/화상미팅 팁)
   └── ⑤ 시스템 아키텍처 (보안 프록시 및 Gemini 3.8 Flash 파이프라인)`}
              </pre>
            </div>
          </section>

          {/* Section 5: Technical Specs */}
          <section id="sec-5" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 5</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">기술 스택 및 아키텍처 (Technical Specs)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-700" />
                  <span>프런트엔드 & UI</span>
                </div>
                <p className="text-stone-600">
                  React 19, TypeScript, Tailwind CSS v4, Motion (부드러운 카드 전환 및 탭 인터랙션)
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-700" />
                  <span>백엔드 보안 프록시</span>
                </div>
                <p className="text-stone-600">
                  Node.js + Express (서버 사이드 Gemini API 호출 프록시, API 키 클라이언트 완전 은닉)
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-700" />
                  <span>AI 인텔리전스 엔진</span>
                </div>
                <p className="text-stone-600">
                  Google Gemini 3.8 Flash (비전 멀티모달 이미지 분석 및 고속 스타일링 텍스트 큐레이션)
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-700" />
                  <span>데이터 지속성</span>
                </div>
                <p className="text-stone-600">
                  브라우저 LocalStorage (초기 세션 저장 및 북마크 보관함)
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: KPIs */}
          <section id="sec-6" className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono text-amber-700 font-bold">SECTION 6</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">성공 지표 (KPIs)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs text-stone-500 font-medium">진단 완료율 (Completion Rate)</div>
                <div className="text-2xl font-bold text-amber-700">80% 이상</div>
                <p className="text-[11px] text-stone-500">입력 폼 진입 유저 대비 결과 리포트 확인율</p>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs text-stone-500 font-medium">조언 유용성 만족도 (CSAT)</div>
                <div className="text-2xl font-bold text-amber-700">4.6 / 5.0</div>
                <p className="text-[11px] text-stone-500">인테리어 및 착장 큐레이션 추천 만족도</p>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs text-stone-500 font-medium">크로스 무드 교차 이용률</div>
                <div className="text-2xl font-bold text-amber-700">35% 이상</div>
                <p className="text-[11px] text-stone-500">인테리어 진단 후 의상 코디 추가 확인 전환율</p>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
