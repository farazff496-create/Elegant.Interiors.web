import React from 'react';
import { useSite } from '../context/SiteContext';
import { Compass, Eye, Target, Sparkles, Building2, Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, setActiveView, setIsQuoteModalOpen } = useSite();

  return (
    <div className="min-h-screen bg-[#0a0b0e] pt-12 pb-24 text-[#ede8df]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-2 text-xs text-[#808696] mb-8 font-mono">
          <button onClick={() => setActiveView('home')} className="hover:text-[#c5a880]">Home</button>
          <span>/</span>
          <span className="text-[#c5a880]">About Us</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#262936] bg-[#12141c] p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1e29] border border-[#c5a880]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Studio Profile & Principles</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6">
              Architectural Vision Built Upon Precision & Integrity
            </h1>
            <p className="text-sm sm:text-lg text-[#cfcac0] leading-relaxed font-light">
              {settings?.aboutIntro || "Elegant Interiors & Construction is an interior architect office and construction company based in Barkat Market, Garden Town, Lahore. We bridge the gap between creative architectural design and rigorous civil engineering."}
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              alt="Architectural Blueprint Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="p-8 rounded-2xl bg-[#12141c] border border-[#212430] hover:border-[#c5a880]/50 transition-colors shadow-xl">
            <div className="p-3.5 rounded-xl bg-[#1a1d26] border border-[#2c303f] text-[#c5a880] inline-block mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-sm text-[#9f9a8e] leading-relaxed font-light">
              {settings?.aboutVision || "To pioneer timeless architectural environments and luxury living spaces that elevate human experience through precision engineering, bespoke craftsmanship, and sustainable aesthetics."}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-2xl bg-[#12141c] border border-[#212430] hover:border-[#c5a880]/50 transition-colors shadow-xl">
            <div className="p-3.5 rounded-xl bg-[#1a1d26] border border-[#2c303f] text-[#c5a880] inline-block mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm text-[#9f9a8e] leading-relaxed font-light">
              {settings?.aboutMission || "Delivering turnkey architectural and construction excellence across Pakistan, translating client dreams into physical masterpieces with complete transparency and zero compromises."}
            </p>
          </div>
        </div>

        {/* Design Philosophy & Professional Approach */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11131a] border border-[#232633] mb-16 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-2">
              Architectural Ethos
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4">
              Design Philosophy & Professional Approach
            </h2>
            <p className="text-sm sm:text-base text-[#cfcac0] leading-relaxed font-light mb-6">
              {settings?.aboutPhilosophy || "Every line drawn and every brick laid is guided by the philosophy that authentic luxury is the seamless fusion of proportion, functional elegance, and enduring structural integrity."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#161822] border border-[#262a38]">
              <h4 className="font-serif text-lg font-bold text-white mb-2">Spatial Harmony</h4>
              <p className="text-xs text-[#9f9a8e] leading-relaxed">
                Prioritizing natural sunlight, cross-ventilation, and effortless sightlines tailored to modern Pakistani family life.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#161822] border border-[#262a38]">
              <h4 className="font-serif text-lg font-bold text-white mb-2">Material Authenticity</h4>
              <p className="text-xs text-[#9f9a8e] leading-relaxed">
                Honest expression of materials—natural stone, solid hardwoods, brushed metals, and fair-faced architectural concrete.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#161822] border border-[#262a38]">
              <h4 className="font-serif text-lg font-bold text-white mb-2">Climate Resilience</h4>
              <p className="text-xs text-[#9f9a8e] leading-relaxed">
                Engineering thermal mass insulation, double-glazed window systems, and solar shading optimized for Lahore summers.
              </p>
            </div>
          </div>
        </div>

        {/* Construction Expertise, Project Management & Quality Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#12141c] border border-[#212430]">
            <Building2 className="w-6 h-6 text-[#c5a880] mb-3" />
            <h3 className="font-serif text-xl font-bold text-white mb-2">Construction Expertise</h3>
            <p className="text-xs text-[#9f9a8e] leading-relaxed font-light">
              {settings?.constructionExpertise || "With an established presence in Lahore's most prestigious enclaves, our turnkey construction team oversees grey structure, MEP engineering, and high-end finishing with millimeter precision."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12141c] border border-[#212430]">
            <Layers className="w-6 h-6 text-[#c5a880] mb-3" />
            <h3 className="font-serif text-xl font-bold text-white mb-2">Project Management</h3>
            <p className="text-xs text-[#9f9a8e] leading-relaxed font-light">
              {settings?.projectManagement || "Our rigorous project governance provides clients with milestones, bill-of-quantities (BOQ) discipline, weekly on-site QA reports, and meticulous timeline adherence."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12141c] border border-[#212430]">
            <ShieldCheck className="w-6 h-6 text-[#c5a880] mb-3" />
            <h3 className="font-serif text-xl font-bold text-white mb-2">Quality Commitment</h3>
            <p className="text-xs text-[#9f9a8e] leading-relaxed font-light">
              {settings?.qualityCommitment || "We select only certified structural steel, grade-A porcelain, seasoned solid hardwoods, and premium architectural hardware, backed by our comprehensive warranty."}
            </p>
          </div>
        </div>

        {/* Location & Contact CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#171922] via-[#12141b] to-[#0d0e13] border border-[#c5a880]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Visit Our Studio in Barkat Market, Lahore
            </h3>
            <p className="text-xs text-[#a0a5b2]">
              61 BB Central Plaza, New Commercial Area, Garden Town, Lahore, 54000
            </p>
          </div>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d9be9b] to-[#c5a880] text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
