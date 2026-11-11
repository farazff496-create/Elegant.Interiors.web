import React from 'react';
import { useSite } from '../context/SiteContext';
import { Star, ArrowRight, ShieldCheck, Award, Compass, PhoneCall, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, scrollToSection, setIsQuoteModalOpen } = useSite();

  const headline = settings?.heroHeadline || "Transforming Spaces Into Timeless Experiences";
  const subtitle = settings?.heroSubtitle || "Architectural Design | Construction | Interior Design | Turnkey Projects";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a0b0e]">
      {/* Background Architectural Imagery with Multi-Layer Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
          alt="Luxury Architectural Residence in Lahore"
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-fade-in filter brightness-[0.42] contrast-[1.12]"
        />
        {/* Subtle vignette and luxury dark tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/60 to-[#0c0d10]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.08)_0,transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Google Reviews & Verified Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#181a22]/85 border border-[#c5a880]/30 backdrop-blur-md shadow-xl mb-8 transition-transform hover:scale-105">
          <div className="flex items-center text-[#eab308]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-white tracking-wide">
            {settings?.googleRating || 4.7} / 5.0
          </span>
          <span className="text-[11px] text-[#c5a880] tracking-wide border-l border-[#2e3340] pl-2.5">
            26 Google Reviews &bull; Verified Business
          </span>
        </div>

        {/* Studio Emblem Monogram */}
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-b from-[#2a241e] to-[#121110] border border-[#c5a880]/60 shadow-2xl shadow-black/80">
          <span className="font-serif text-2xl font-bold tracking-widest text-[#f3e3c6]">
            EIC
          </span>
        </div>

        {/* Small Brand Pill */}
        <div className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#c5a880] mb-3">
          {settings?.businessName || "Elegant Interiors & Construction"}
        </div>

        {/* Main Architectural Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
          <span className="block">{headline}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl font-light text-[#cfcac2] tracking-wider max-w-3xl mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          {/* CTA 1: Explore Our Projects */}
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0c0d10] bg-gradient-to-r from-[#d9be9b] via-[#c5a880] to-[#b38e5d] hover:brightness-110 shadow-xl shadow-[#c5a880]/20 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{settings?.heroCta1 || "Explore Our Projects"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* CTA 2: Get a Free Consultation */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest text-white bg-[#15171e]/90 hover:bg-[#1f222b] border border-[#c5a880]/50 hover:border-[#c5a880] backdrop-blur-md transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#c5a880]" />
            <span>{settings?.heroCta2 || "Get a Free Consultation"}</span>
          </button>

          {/* CTA 3: Contact Us */}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#b8b3a8] hover:text-white border border-[#262933] hover:border-[#3d4252] transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{settings?.heroCta3 || "Contact Us"}</span>
          </button>
        </div>

        {/* Metric Trust Indicators Strip */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#22252f]/80 text-center">
          <div className="p-3">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">4.7 / 5.0</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9f9a8e] mt-0.5">26 Google Reviews</div>
          </div>
          <div className="p-3 border-l border-[#22252f]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">150+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9f9a8e] mt-0.5">Projects Delivered</div>
          </div>
          <div className="p-3 border-l border-[#22252f]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-white">13</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9f9a8e] mt-0.5">Specialized Services</div>
          </div>
          <div className="p-3 border-l border-[#22252f]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#c5a880]">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9f9a8e] mt-0.5">Turnkey Execution</div>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={() => scrollToSection('intro')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#8b8577] hover:text-[#c5a880] transition-colors z-20 flex flex-col items-center gap-1 group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-widest uppercase opacity-75">Discover</span>
        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
      </button>
    </section>
  );
};
