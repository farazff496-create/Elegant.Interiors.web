import React from 'react';
import { useSite } from '../context/SiteContext';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export const ServiceModal: React.FC = () => {
  const { selectedService, setSelectedService, setIsQuoteModalOpen, setQuotePrefillService } = useSite();

  if (!selectedService) return null;

  const handleBookService = () => {
    setQuotePrefillService(selectedService.title);
    setSelectedService(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#11131a] rounded-3xl border border-[#262a38] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#202432] flex items-center justify-between bg-[#151822]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
              Registered Service #{selectedService.id.replace('srv-', '')}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {selectedService.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedService(null)}
            className="p-2 rounded-xl bg-[#202432] text-[#9fa5b5] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-[#262a38]">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs text-[#c5a880] font-medium block">Category: {selectedService.category}</span>
              {selectedService.tagline && (
                <span className="font-serif text-lg font-bold text-white block">
                  "{selectedService.tagline}"
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-2">Service Overview</h4>
            <p className="text-sm text-[#cfcac0] leading-relaxed font-light">
              {selectedService.description}
            </p>
          </div>

          {/* Key Deliverables */}
          {selectedService.deliverables && selectedService.deliverables.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#151822] border border-[#222533]">
              <h4 className="font-serif text-base font-bold text-white mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>Scope Deliverables & Engineering Milestones</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#d8d4cc]">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#181b26] border border-[#272b3a] text-xs text-[#a0a5b4]">
            <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0" />
            <span>
              All works supervised by certified civil engineers and architects in accordance with Lahore municipal bylaws and international standards.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#202432] bg-[#151822] flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedService(null)}
            className="px-5 py-2.5 rounded-xl border border-[#2b2f3d] text-xs text-[#9ea3b2] hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handleBookService}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d9be9b] to-[#c5a880] text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span>Request Quote for {selectedService.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
