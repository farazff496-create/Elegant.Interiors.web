import React from 'react';
import { useSite } from '../context/SiteContext';
import { Layers, ShieldCheck, CheckCircle2, TrendingUp, Compass, ArrowRight } from 'lucide-react';

export const CompanyIntro: React.FC = () => {
  const { settings, setActiveView, setIsQuoteModalOpen } = useSite();

  return (
    <section id="intro" className="py-24 bg-[#0e1014] relative border-b border-[#1c1e27] overflow-hidden">
      {/* Subtle gold grid background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#c5a880_1px,transparent_1px),linear-gradient(to_bottom,#c5a880_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Imagery Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl shadow-black/80">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                alt="Architectural Interior by Elegant Interiors & Construction Lahore"
                className="w-full h-[460px] object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-80" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#12141a]/90 backdrop-blur-md border border-[#2b2e3a]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
                      Registered Practice
                    </span>
                    <span className="font-serif text-base font-bold text-white">
                      Interior Architect & Construction
                    </span>
                  </div>
                  <span className="text-xs text-[#a0a5b2] font-mono">Lahore &bull; 54000</span>
                </div>
              </div>
            </div>

            {/* Architectural Accent Box */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-[#c5a880]/40 -z-0" />
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-[#c5a880]/40 -z-0" />
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>About Elegant Interiors & Construction</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6">
              Engineering Grandeur Through Architectural Mastery
            </h2>

            <p className="text-sm sm:text-base text-[#cfcac0] leading-relaxed mb-6 font-light">
              {settings?.aboutIntro || "Elegant Interiors & Construction is an esteemed interior architect office and construction company headquartered in Garden Town, Lahore. We harmonize visionary architecture with turnkey engineering, crafting residences, corporate headquarters, and bespoke spaces that withstand the test of time."}
            </p>

            <p className="text-sm sm:text-base text-[#9f9a8e] leading-relaxed mb-8 font-light">
              Rooted in our physical studio at Barkat Market, 61 BB Central Plaza, we undertake discerning projects throughout Lahore's prime developments—including DHA, Gulberg, Model Town, and Garden Town. We replace disjointed subcontractor chaos with unified turnkey responsibility.
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#14161d] border border-[#232630] hover:border-[#c5a880]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#22242f] text-[#c5a880]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-white">Turnkey Precision</h4>
                </div>
                <p className="text-xs text-[#9f9a8e] leading-relaxed">
                  Single-point accountability from architectural blueprints, grey structure, to luxury hand-finished interior delivery.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14161d] border border-[#232630] hover:border-[#c5a880]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#22242f] text-[#c5a880]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-white">Value Engineering</h4>
                </div>
                <p className="text-xs text-[#9f9a8e] leading-relaxed">
                  Technical cost-optimization that enhances durability and thermal efficiency without sacrificing architectural aesthetics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14161d] border border-[#232630] hover:border-[#c5a880]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#22242f] text-[#c5a880]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-white">Certified Quality</h4>
                </div>
                <p className="text-xs text-[#9f9a8e] leading-relaxed">
                  Grade-A structural steel, certified concrete batches, and imported luxury finishes backed by warranties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14161d] border border-[#232630] hover:border-[#c5a880]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#22242f] text-[#c5a880]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-white">Transparent BOQ</h4>
                </div>
                <p className="text-xs text-[#9f9a8e] leading-relaxed">
                  Detailed bill of quantities with locked milestones, weekly photographic audits, and zero hidden costs.
                </p>
              </div>
            </div>

            {/* Read More & Consultation Link */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg border border-[#c5a880]/60 hover:bg-[#c5a880]/10 text-xs font-semibold tracking-wider uppercase text-[#c5a880] transition-colors flex items-center gap-2"
              >
                <span>Read Full About Us & Vision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#d9be9b] to-[#c5a880] hover:brightness-110 transition-all"
              >
                Schedule Studio Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
