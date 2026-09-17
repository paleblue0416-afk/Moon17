import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Layers, 
  Eye, 
  Check,
  ZoomIn
} from 'lucide-react';
import { PrescriptionImageItem } from '../data/prescriptionImages';

interface PrescriptionVisualGalleryProps {
  title: string;
  subtitle?: string;
  images: PrescriptionImageItem[];
  compactTextSummary?: React.ReactNode;
}

export const PrescriptionVisualGallery: React.FC<PrescriptionVisualGalleryProps> = ({
  title,
  subtitle,
  images,
  compactTextSummary
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[selectedIndex] || images[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSaveImageLink = () => {
    navigator.clipboard.writeText(currentImage.url);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Prescription Header with Ratio Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs font-mono font-bold text-amber-800 tracking-wider">
              MULTIPLE IMAGE PRESCRIPTION GALLERY
            </span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 tracking-tight mt-0.5 font-sans">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* 70% Image : 30% Text Ratio Indicator */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-lg border border-stone-200 self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-amber-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>이미지 70% 비중</span>
          </div>
          <div className="px-2 py-1 text-[11px] font-medium text-stone-600">
            <span>텍스트 30% 요약</span>
          </div>
        </div>
      </div>

      {/* Main 70:30 Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 70% Column: Hero Multi-Image Prescription Viewer */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Hero Prescription Image Card */}
          <div className="relative group bg-stone-900 rounded-2xl overflow-hidden shadow-lg border border-stone-800 transition-all">
            {/* Image Container with 4:3 Aspect Ratio */}
            <div className="relative aspect-[4/3] w-full bg-stone-950 overflow-hidden flex items-center justify-center">
              <img
                src={currentImage.url}
                alt={currentImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top Bar Overlays */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="pointer-events-auto px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide border border-white/10 shadow-sm">
                  {currentImage.tag}
                </span>

                <div className="pointer-events-auto flex items-center gap-1.5">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                    title="전체화면 고해상도 확대보기"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveImageLink}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 shadow-sm"
                    title="이미지 주소 복사"
                  >
                    {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 opacity-80 hover:opacity-100 shadow-md"
                aria-label="이전 처방 이미지"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-110 opacity-80 hover:opacity-100 shadow-md"
                aria-label="다음 처방 이미지"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 pt-12">
                <div className="text-amber-400 font-mono text-[11px] font-semibold mb-0.5">
                  IMAGE #{selectedIndex + 1} OF {images.length}
                </div>
                <h4 className="text-white text-base sm:text-lg font-bold">
                  {currentImage.title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed font-light">
                  {currentImage.caption}
                </p>
              </div>
            </div>

            {/* Spec Chips under Hero Image */}
            {currentImage.specs && currentImage.specs.length > 0 && (
              <div className="bg-stone-900 px-4 py-3 border-t border-stone-800 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  이미지 처방 핵심 스펙:
                </span>
                {currentImage.specs.map((spec, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-stone-200 text-xs border border-stone-700">
                    <span className="text-stone-400 text-[10px]">{spec.label}</span>
                    <span className="font-semibold text-amber-300">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Multiple Image Thumbnails Gallery (Click to switch image) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                처방전 이미지 파일 컬렉션 ({images.length}장)
              </span>
              <span className="text-[11px] text-stone-500">
                원클릭 시 상단 메인 뷰어 전환
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {images.map((img, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative rounded-xl overflow-hidden text-left border transition-all aspect-[4/3] group ${
                      isSelected
                        ? 'border-amber-600 ring-2 ring-amber-500/50 shadow-md'
                        : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-between">
                      <span className="self-start px-1.5 py-0.5 rounded bg-black/60 text-amber-300 text-[10px] font-mono font-bold">
                        0{idx + 1}
                      </span>
                      <span className="text-white text-[11px] font-bold line-clamp-1">
                        {img.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 30% Column: Compact High-Yield Text Prescription Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 sticky top-24">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  30% SUMMARY SPECIFICATION
                </span>
                <h4 className="text-base font-bold text-stone-900 mt-0.5">
                  핵심 처방 요약
                </h4>
              </div>
              <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                Rx
              </span>
            </div>

            {/* Custom Compact Text Summary Content */}
            <div className="text-xs text-stone-700 space-y-3">
              {compactTextSummary ? (
                compactTextSummary
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="font-bold text-stone-900 mb-1">
                      선택 이미지 처방 포인트
                    </div>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      {currentImage.caption}
                    </p>
                  </div>
                  {currentImage.specs && (
                    <div className="space-y-1.5">
                      {currentImage.specs.map((s, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-stone-100 text-[11px]">
                          <span className="text-stone-500">{s.label}</span>
                          <span className="font-bold text-stone-900">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fullscreen Expansion Prompt */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5 text-amber-800" />
              <span>처방전 이미지 전체화면 확대 ({images.length}장 갤러리)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between text-white pb-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold">
                {currentImage.tag} ({selectedIndex + 1}/{images.length})
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-0.5">{currentImage.title}</h3>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image with Navigation */}
          <div 
            className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Info Bar & Thumbnails */}
          <div 
            className="max-w-6xl w-full mx-auto pt-4 border-t border-stone-800 text-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-center mb-4 max-w-2xl mx-auto leading-relaxed">
              {currentImage.caption}
            </p>
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    i === selectedIndex ? 'border-amber-400 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
