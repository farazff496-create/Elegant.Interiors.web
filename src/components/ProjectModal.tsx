import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, MapPin, Calendar, Compass, SplitSquareVertical, ArrowRight } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setIsQuoteModalOpen, setQuotePrefillService } = useSite();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  if (!selectedProject) return null;

  const images = selectedProject.gallery && selectedProject.gallery.length > 0
    ? selectedProject.gallery
    : [selectedProject.image];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const offsetX = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offsetX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleRequestQuote = () => {
    setQuotePrefillService(selectedProject.scope || 'Turnkey Projects');
    setSelectedProject(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#11131a] rounded-3xl border border-[#262a38] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#202432] flex items-center justify-between bg-[#151822]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
              {selectedProject.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {selectedProject.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl bg-[#202432] text-[#9fa5b5] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual: Before/After Slider or Gallery Viewer */}
          {selectedProject.hasBeforeAfter && selectedProject.beforeImage && selectedProject.afterImage ? (
            <div className="space-y-2">
              <div
                className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden cursor-ew-resize select-none bg-black border border-[#2b2f3e]"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                <img
                  src={selectedProject.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={selectedProject.beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center text-xs text-white">
                    &#x21D4;
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded bg-black/80 text-xs text-white z-20">
                  Before Renovation
                </div>
                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-[#c5a880] text-xs text-black font-bold z-20">
                  Completed Masterpiece
                </div>
              </div>
              <div className="text-center text-[11px] text-[#8e94a5] flex items-center justify-center gap-1.5">
                <SplitSquareVertical className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Drag slider horizontally to inspect Before vs After execution</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#262a38] bg-black">
                <img
                  src={images[activeImageIndex] || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#c5a880] ring-2 ring-[#c5a880]/30 scale-105'
                          : 'border-[#262936] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#161822] border border-[#222533] text-xs">
            <div>
              <span className="text-[#7d8394] block uppercase tracking-wider text-[10px]">Location</span>
              <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                {selectedProject.location}
              </span>
            </div>
            <div>
              <span className="text-[#7d8394] block uppercase tracking-wider text-[10px]">Area</span>
              <span className="font-semibold text-white block mt-0.5">{selectedProject.area}</span>
            </div>
            <div>
              <span className="text-[#7d8394] block uppercase tracking-wider text-[10px]">Completion</span>
              <span className="font-semibold text-white block mt-0.5">{selectedProject.year}</span>
            </div>
            <div>
              <span className="text-[#7d8394] block uppercase tracking-wider text-[10px]">Scope</span>
              <span className="font-semibold text-[#c5a880] block mt-0.5 truncate">{selectedProject.scope}</span>
            </div>
          </div>

          {/* Narrative */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-2">Project Overview & Brief</h4>
            <p className="text-sm text-[#cfcac0] leading-relaxed font-light">
              {selectedProject.description}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#202432] bg-[#151822] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8c92a2]">
            Want a similar design for your residence or office in Lahore?
          </div>
          <button
            onClick={handleRequestQuote}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d9be9b] to-[#c5a880] text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Inquire About This Project Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
