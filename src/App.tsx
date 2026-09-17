import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { PrdViewer } from './components/PrdViewer';
import { InteriorAdvisor } from './components/InteriorAdvisor';
import { FashionCloset } from './components/FashionCloset';
import { CrossMoodSynergy } from './components/CrossMoodSynergy';
import { ArchitectureView } from './components/ArchitectureView';
import { WishlistModal } from './components/WishlistModal';
import { SavedReportItem, Persona, InteriorInput, FashionInput } from './types';
import { checkBackendHealth } from './services/apiClient';

const LOCAL_STORAGE_KEY = 'stylespace_saved_reports_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [savedReports, setSavedReports] = useState<SavedReportItem[]>([]);
  const [apiStatus, setApiStatus] = useState<{ status: string; hasApiKey: boolean }>({
    status: 'checking',
    hasApiKey: false
  });

  // Pre-fill states for inter-module navigation
  const [interiorPresetInput, setInteriorPresetInput] = useState<Partial<InteriorInput> | undefined>(undefined);
  const [fashionPresetInput, setFashionPresetInput] = useState<Partial<FashionInput> | undefined>(undefined);
  const [crossMoodInitialText, setCrossMoodInitialText] = useState<string | undefined>(undefined);
  const [crossMoodDirection, setCrossMoodDirection] = useState<'roomToFashion' | 'fashionToRoom'>('roomToFashion');

  // Load saved bookmarks from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load saved reports from localStorage:', e);
    }
  }, []);

  // Sync to LocalStorage
  const saveReportsToStorage = (items: SavedReportItem[]) => {
    setSavedReports(items);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save reports to localStorage:', e);
    }
  };

  // Check backend health
  useEffect(() => {
    checkBackendHealth()
      .then((res) => {
        setApiStatus({
          status: res.status,
          hasApiKey: res.hasApiKey
        });
      })
      .catch(() => {
        setApiStatus({
          status: 'offline',
          hasApiKey: false
        });
      });
  }, []);

  // Save Bookmark Handler
  const handleSaveBookmark = (title: string, subtitle: string, payload: any) => {
    const newItem: SavedReportItem = {
      id: 'saved-' + Date.now(),
      title,
      subtitle,
      type: currentTab === 'interior' ? 'interior' : currentTab === 'fashion' ? 'fashion' : 'cross_mood',
      timestamp: Date.now(),
      payload
    };
    saveReportsToStorage([newItem, ...savedReports]);
  };

  const handleDeleteSavedItem = (id: string) => {
    saveReportsToStorage(savedReports.filter(item => item.id !== id));
  };

  const handleClearAllSaved = () => {
    saveReportsToStorage([]);
  };

  const handleSelectSavedReport = (item: SavedReportItem) => {
    if (item.type === 'interior') {
      setCurrentTab('interior');
    } else if (item.type === 'fashion') {
      setCurrentTab('fashion');
    } else {
      setCurrentTab('cross');
    }
  };

  // Persona quick application
  const handleApplyPersona = (persona: Persona, targetTab: 'interior' | 'fashion') => {
    if (targetTab === 'interior') {
      setInteriorPresetInput({
        roomType: persona.presetInterior.roomType,
        areaPyung: persona.presetInterior.areaPyung,
        budget: persona.presetInterior.budget,
        mood: persona.presetInterior.mood
      });
      setCurrentTab('interior');
    } else {
      setFashionPresetInput({
        tpo: persona.presetFashion.tpo,
        personalColor: persona.presetFashion.personalColor,
        temperature: persona.presetFashion.temperature || 20,
        weather: persona.presetFashion.weather,
        keyItem: persona.presetFashion.keyItem
      });
      setCurrentTab('fashion');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Cross-Mood with Interior context
  const handleNavigateToCrossMoodWithInterior = (moodDescription: string) => {
    setCrossMoodInitialText(moodDescription);
    setCrossMoodDirection('roomToFashion');
    setCurrentTab('cross');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Cross-Mood with Fashion context
  const handleNavigateToCrossMoodWithFashion = (fashionDescription: string) => {
    setCrossMoodInitialText(fashionDescription);
    setCrossMoodDirection('fashionToRoom');
    setCurrentTab('cross');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarkCount={savedReports.length}
        onOpenBookmarks={() => setIsWishlistOpen(true)}
        apiStatus={apiStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'dashboard' && (
          <DashboardOverview
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyPersona={handleApplyPersona}
          />
        )}

        {currentTab === 'prd' && <PrdViewer />}

        {currentTab === 'interior' && (
          <InteriorAdvisor
            initialInput={interiorPresetInput}
            onSaveBookmark={handleSaveBookmark}
            onNavigateToCrossMoodWithInterior={handleNavigateToCrossMoodWithInterior}
          />
        )}

        {currentTab === 'fashion' && (
          <FashionCloset
            initialInput={fashionPresetInput}
            onSaveBookmark={handleSaveBookmark}
            onNavigateToCrossMoodWithFashion={handleNavigateToCrossMoodWithFashion}
          />
        )}

        {currentTab === 'cross' && (
          <CrossMoodSynergy
            initialSourceText={crossMoodInitialText}
            initialDirection={crossMoodDirection}
            onSaveBookmark={handleSaveBookmark}
          />
        )}

        {currentTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Saved Bookmarks Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedItems={savedReports}
        onDeleteItem={handleDeleteSavedItem}
        onClearAll={handleClearAllSaved}
        onSelectSavedReport={handleSelectSavedReport}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-xs">
              D
            </div>
            <div>
              <span className="font-semibold text-stone-900">스타일스페이스 (StyleSpace)</span>
              <span className="text-stone-400 ml-1.5">| 아틀리에 듀오 (Atelier Duo)</span>
            </div>
          </div>

          <div className="text-stone-500 text-center sm:text-right">
            <span>공간(인테리어 60:30:10)과 옷장(3-Way 스타일링)의 톤앤매너 싱크라이프</span>
            <div className="text-[11px] text-stone-400 mt-0.5">
              Powered by Google Gemini 3.8 Flash & Express Secure Proxy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
