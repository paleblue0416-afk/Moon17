import React from 'react';
import { 
  Home, 
  FileText, 
  Sparkles, 
  Shirt, 
  Layers, 
  Cpu, 
  Bookmark, 
  CheckCircle2
} from 'lucide-react';

export type NavTab = 'dashboard' | 'prd' | 'interior' | 'fashion' | 'cross' | 'architecture';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  apiStatus: { status: string; hasApiKey: boolean };
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  bookmarkCount,
  onOpenBookmarks,
  apiStatus
}) => {
  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'dashboard', label: '대시보드', icon: <Home className="w-4 h-4" /> },
    { id: 'prd', label: '① PRD 기획서', icon: <FileText className="w-4 h-4" /> },
    { id: 'interior', label: '② 인테리어 진단', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'fashion', label: '③ 패션 코디', icon: <Shirt className="w-4 h-4" /> },
    { id: 'cross', label: '④ 크로스 무드 싱크', icon: <Layers className="w-4 h-4" />, badge: '핵심 차별점' },
    { id: 'architecture', label: '⑤ 시스템 아키텍처', icon: <Cpu className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            id="brand-logo-button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-sm ring-1 ring-amber-500/30 group-hover:scale-105 transition-transform">
              <span className="font-serif italic font-bold text-lg leading-none">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight text-base sm:text-lg text-stone-100">
                  스타일스페이스
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Atelier Duo
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light hidden sm:block">
                공간과 옷장의 톤앤매너 싱크라이프
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="메인 내비게이션">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600/20 text-amber-200 ring-1 ring-amber-500/40 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-bold ml-0.5">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Status Badge */}
            <div 
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-[11px] text-stone-300"
              title="Google Gemini 3.8 Flash 모델이 백엔드 프록시를 통해 상시 준비되어 있습니다."
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gemini 3.8 Flash</span>
            </div>

            {/* Bookmarks & Saved Reports Button */}
            <button
              id="header-bookmarks-button"
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-stone-200 text-xs font-medium transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">저장 보관함</span>
              {bookmarkCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-2.5 pt-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'text-stone-300 bg-stone-800/80 hover:bg-stone-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
