import React from 'react';
import { 
  Sparkles, 
  Shirt, 
  Layers, 
  FileText, 
  ArrowRight, 
  Palette, 
  Sliders, 
  Compass, 
  CheckCircle, 
  Briefcase, 
  UserCheck 
} from 'lucide-react';
import { NavTab } from './Header';
import { TARGET_PERSONAS } from '../data/prdData';
import { Persona } from '../types';

interface DashboardOverviewProps {
  onNavigate: (tab: NavTab) => void;
  onApplyPersona: (persona: Persona, targetTab: 'interior' | 'fashion') => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onApplyPersona,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 border border-stone-800 text-stone-100 p-8 sm:p-12 shadow-md">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>멀티모달 AI 라이프스타일 듀오 플랫폼</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            공간과 옷장이 하나 되는 <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-stone-200 font-serif italic">
              톤앤매너 스타일링
            </span>{' '}
            자문 서비스
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            기존에 따로 놀던 <strong className="text-stone-100 font-medium">인테리어(내 방)</strong>와{' '}
            <strong className="text-stone-100 font-medium">패션(내 옷)</strong>을 Gemini 3.8 Flash AI로 유기적으로 결합합니다. 
            스마트폰 사진 한 장으로 방의 <span className="text-amber-200 font-medium">60:30:10 컬러 팔레트</span>를 진단하고, 
            TPO와 날씨에 맞춘 <span className="text-amber-200 font-medium">3-Way 착장</span>과{' '}
            <span className="text-amber-200 font-medium">크로스 무드 싱크</span>를 경험해보세요.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-start-interior-btn"
              onClick={() => onNavigate('interior')}
              className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>내 방 인테리어 진단하기</span>
            </button>
            <button
              id="hero-start-fashion-btn"
              onClick={() => onNavigate('fashion')}
              className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-200 font-medium text-sm transition-all flex items-center gap-2"
            >
              <Shirt className="w-4 h-4" />
              <span>오늘의 데일리 코디 가이드</span>
            </button>
            <button
              id="hero-start-cross-btn"
              onClick={() => onNavigate('cross')}
              className="px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 font-medium text-sm transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>공간 ↔ 패션 크로스 싱크</span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Summary Badges */}
        <div className="relative z-10 mt-10 pt-8 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-stone-200">60 : 30 : 10 컬러 황금비율</div>
              <div className="text-stone-400 text-[11px]">주조색 60%, 보조색 30%, 포인트색 10%</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-stone-200">3-Way 목적별 아웃핏</div>
              <div className="text-stone-400 text-[11px]">정석 밸런스 / 트렌드 포인트 / 편안한 릴렉스드</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-stone-200">크로스 무드 조화도 점수</div>
              <div className="text-stone-400 text-[11px]">화상회의 웹캠 대비도 & 홈파티 호스트 조화 지수</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Personas Interactive Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-700" />
              <span>타겟 페르소나별 원클릭 체험 시뮬레이터</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              기획서(PRD)에 정의된 2대 핵심 사용자의 실제 주거 환경과 스타일링 고민을 바로 적용해볼 수 있습니다.
            </p>
          </div>
          <button
            onClick={() => onNavigate('prd')}
            className="text-xs text-amber-800 hover:text-amber-900 font-medium flex items-center gap-1"
          >
            <span>PRD 상세 비교표 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TARGET_PERSONAS.map((persona) => {
            const isPersonaA = persona.id === 'personaA';
            return (
              <div
                key={persona.id}
                className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-sm hover:border-amber-300/80 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/70 font-semibold">
                        {isPersonaA ? '페르소나 A (사회초년생/마케터)' : '페르소나 B (재택 크리에이터)'}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 mt-1">
                        {persona.name} <span className="text-sm font-normal text-stone-500">({persona.age}세, {persona.job})</span>
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-stone-400" />
                        <span>주거 환경: <strong>{persona.housing}</strong></span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 my-4 pt-3 border-t border-stone-100 text-xs">
                    <div>
                      <div className="font-semibold text-stone-700 mb-1">주요 고민 (Pain Points):</div>
                      <ul className="space-y-1 text-stone-600">
                        {persona.problems.map((prob, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-stone-700 mb-1">핵심 니즈 (Needs):</div>
                      <ul className="space-y-1 text-stone-600">
                        {persona.needs.map((need, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    id={`persona-${persona.id}-interior-btn`}
                    onClick={() => onApplyPersona(persona, 'interior')}
                    className="flex-1 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{persona.name}의 방 인테리어 진단</span>
                  </button>
                  <button
                    id={`persona-${persona.id}-fashion-btn`}
                    onClick={() => onApplyPersona(persona, 'fashion')}
                    className="flex-1 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Shirt className="w-3.5 h-3.5 text-stone-600" />
                    <span>{persona.name}의 착장 코디 보기</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Core Features Module Navigator */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          서비스 핵심 모듈 바로가기
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1: PRD */}
          <div 
            onClick={() => onNavigate('prd')}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-800 flex items-center justify-center transition-colors mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-amber-700">모듈 ① 기획서 뷰어</div>
              <h3 className="font-bold text-stone-900 text-base mt-0.5 group-hover:text-amber-900 transition-colors">
                PRD 전문 & 스펙 테이블
              </h3>
              <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                목차 검색 필터, 기능 명세서 테이블, 성공지표(KPI), 전체 PRD 마크다운 복사 및 다운로드
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-amber-800">
              <span>기획서 살펴보기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Interior */}
          <div 
            onClick={() => onNavigate('interior')}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-800 flex items-center justify-center transition-colors mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-amber-700">모듈 ② 공간 인테리어</div>
              <h3 className="font-bold text-stone-900 text-base mt-0.5 group-hover:text-amber-900 transition-colors">
                AI 공간 처방실
              </h3>
              <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                60:30:10 컬러 팔레트 추출, 개방감 가구 재배치 평면도, 조명(K값)/러그 쇼핑리스트, 닥터 소견
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-amber-800">
              <span>공간 진단하기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Fashion */}
          <div 
            onClick={() => onNavigate('fashion')}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-800 flex items-center justify-center transition-colors mb-3">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-amber-700">모듈 ③ 패션 코디네이션</div>
              <h3 className="font-bold text-stone-900 text-base mt-0.5 group-hover:text-amber-900 transition-colors">
                3-Way 오케이션 룩북
              </h3>
              <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                정석 밸런스 / 트렌드 실루엣 / 세련된 원마일 착장 제안, Head-to-Toe 핏/소재 분해, 디테일 롤업 팁
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-amber-800">
              <span>코디북 추천받기</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Cross-Mood */}
          <div 
            onClick={() => onNavigate('cross')}
            className="group cursor-pointer bg-white rounded-xl border border-amber-300/80 bg-amber-50/20 p-5 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center transition-colors mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                <span>모듈 ④ 핵심 차별점</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mt-0.5 group-hover:text-amber-950 transition-colors">
                크로스 무드 싱크
              </h3>
              <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                방 ➡️ 옷차림 치환 or 옷차림 ➡️ 방 확장, 화상회의 웹캠 인물 대비도 & 홈파티 호스트 조화 점수
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-medium text-amber-900">
              <span>양방향 무드 변환</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
