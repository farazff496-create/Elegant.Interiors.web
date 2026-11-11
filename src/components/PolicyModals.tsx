import React from 'react';
import { useSite } from '../context/SiteContext';
import { X, Shield, FileText } from 'lucide-react';

export const PolicyModals: React.FC = () => {
  const { privacyModalOpen, setPrivacyModalOpen, termsModalOpen, setTermsModalOpen, settings } = useSite();

  const businessName = settings?.businessName || "Elegant Interiors & Construction";
  const address = settings?.address || "Barkat Market, 61 BB Central Plaza, New Commercial Area, Garden Town, Lahore, 54000, Pakistan.";

  return (
    <>
      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#11131a] rounded-3xl border border-[#262a38] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-[#202432] flex items-center justify-between bg-[#151822]">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#c5a880]" />
                <h3 className="font-serif text-xl font-bold text-white">Privacy Policy</h3>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-2 rounded-xl bg-[#202432] text-[#9fa5b5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#cfcac0] leading-relaxed font-light">
              <p>
                <strong>{businessName}</strong> respects your personal privacy. This privacy notice explains how we handle inquiries submitted through our website (elegantinteriors.com.pk) or directly to our office located at {address}.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">1. Information We Collect</h4>
              <p>
                When you request a consultation, quote, or submit an architectural inquiry, we collect your name, phone number, email address, preferred architectural or construction service, budget bracket, and project brief.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">2. How We Use Your Information</h4>
              <p>
                Collected details are strictly used to evaluate spatial feasibility, formulate project estimates, coordinate on-site surveys, and respond via telephone or WhatsApp. We never sell, rent, or trade client information to third parties.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">3. Data Security & Storage</h4>
              <p>
                Inquiries are retained securely within our administrative system with restricted authentication. You may request deletion or correction of your contact records at any time by contacting info@elegantinteriors.com.pk.
              </p>
            </div>
            <div className="p-4 border-t border-[#202432] bg-[#151822] text-right">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#c5a880] text-black text-xs font-semibold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#11131a] rounded-3xl border border-[#262a38] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-[#202432] flex items-center justify-between bg-[#151822]">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#c5a880]" />
                <h3 className="font-serif text-xl font-bold text-white">Terms & Conditions</h3>
              </div>
              <button
                onClick={() => setTermsModalOpen(false)}
                className="p-2 rounded-xl bg-[#202432] text-[#9fa5b5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#cfcac0] leading-relaxed font-light">
              <p>
                Welcome to <strong>{businessName}</strong>. By accessing this website or initiating architectural and construction consultations, you agree to the following terms.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">1. Scope of Estimates</h4>
              <p>
                Preliminary online estimates, consultation notes, and budgetary calculators provided on this site are indicative. Final construction commitments are governed by formal contractual agreements, certified Bill of Quantities (BOQ), and municipal structural permits.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">2. Intellectual Property</h4>
              <p>
                All 2D drawings, 3D renderings, elevations, photographs, and architectural designs featured on this website are the proprietary intellectual property of {businessName} and may not be reproduced without prior written consent.
              </p>
              <h4 className="font-serif text-base font-bold text-white pt-2">3. Jurisdiction</h4>
              <p>
                All project agreements and consultations are governed by the applicable laws of the Islamic Republic of Pakistan, subject to the jurisdiction of the courts in Lahore.
              </p>
            </div>
            <div className="p-4 border-t border-[#202432] bg-[#151822] text-right">
              <button
                onClick={() => setTermsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#c5a880] text-black text-xs font-semibold"
              >
                Accept Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
