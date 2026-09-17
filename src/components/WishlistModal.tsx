import React from 'react';
import { 
  X, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  Shirt, 
  Layers 
} from 'lucide-react';
import { SavedReportItem } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedReportItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onSelectSavedReport: (item: SavedReportItem) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onDeleteItem,
  onClearAll,
  onSelectSavedReport
}) => {
  const [copiedAll, setCopiedAll] = React.useState(false);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(savedItems, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StyleSpace_Saved_Reports_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = async () => {
    try {
      const text = savedItems.map((item, idx) => 
        `[#${idx + 1}] ${item.title} (${item.subtitle})\n저장일시: ${new Date(item.timestamp).toLocaleString()}\n유형: ${item.type}\n`
      ).join('\n---\n\n');
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'interior':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'fashion':
        return <Shirt className="w-4 h-4 text-stone-700" />;
      case 'cross_mood':
        return <Layers className="w-4 h-4 text-amber-800" />;
      default:
        return <Bookmark className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-stone-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-lg">
                스타일링 리포트 보관함
              </h2>
              <p className="text-xs text-stone-500">
                저장된 인테리어 처방전 및 패션 룩북 목록 ({savedItems.length}개)
              </p>
            </div>
          </div>
          <button
            id="close-wishlist-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {savedItems.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <Bookmark className="w-12 h-12 mx-auto stroke-1 text-stone-300 mb-3" />
              <p className="text-sm font-medium text-stone-600">보관된 리포트가 없습니다.</p>
              <p className="text-xs text-stone-400 mt-1">
                인테리어 진단이나 패션 코디 리포트에서 '북마크 보관'을 클릭해보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-300/80 hover:bg-amber-50/20 transition-all flex items-start justify-between gap-3 group"
                >
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectSavedReport(item);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getIcon(item.type)}
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-stone-100 text-stone-600 uppercase font-semibold">
                        {item.type}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-bold text-stone-900 text-sm group-hover:text-amber-900 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      title="삭제"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        {savedItems.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copiedAll ? '전체 복사됨' : '전체 텍스트 복사'}</span>
              </button>

              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                <span>JSON 내보내기</span>
              </button>
            </div>

            <button
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 text-xs transition-colors"
            >
              전체 비우기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
