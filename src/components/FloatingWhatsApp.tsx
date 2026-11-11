import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageSquare, Phone, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSite();
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const phone = settings?.phone || "0331 3404441";
  const whatsappUrl = `https://wa.me/923313404441?text=${encodeURIComponent('Hello Elegant Interiors & Construction, I would like to inquire about an architectural design or turnkey construction project in Lahore.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip badge */}
      {tooltipVisible && (
        <div className="pointer-events-auto bg-[#14161f] border border-[#2b2f3d] p-3 rounded-2xl shadow-2xl max-w-xs flex items-start gap-2.5 animate-in slide-in-from-bottom duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping mt-1 shrink-0" />
          <div className="text-left">
            <div className="text-xs font-semibold text-white">Need an Instant Estimate?</div>
            <div className="text-[11px] text-[#9a9fae]">Chat directly with our lead architect on WhatsApp</div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#25D366] font-semibold hover:underline mt-1 inline-block"
            >
              Start Chat &rarr;
            </a>
          </div>
          <button
            onClick={() => setTooltipVisible(false)}
            className="text-[#717686] hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Buttons: WhatsApp & Call */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Quick Call */}
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="w-12 h-12 rounded-full bg-[#181a24] border border-[#303444] text-[#c5a880] hover:text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
          title={`Call ${phone}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
          title="Chat on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-pulse -z-10" />
          <MessageSquare className="w-7 h-7 fill-black text-black group-hover:scale-105 transition-transform" />
        </a>
      </div>
    </div>
  );
};
