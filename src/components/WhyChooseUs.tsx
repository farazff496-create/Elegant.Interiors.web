import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Ruler, Clock, Coins, CheckCircle2, PhoneCall } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { settings, setIsQuoteModalOpen } = useSite();

  const reasons = [
    {
      icon: Ruler,
      title: "Architectural Precision & 3D Engineering",
      description: "Every blueprint and spatial layout is developed using advanced BIM and photorealistic 3D rendering before groundbreaking, eliminating on-site guesswork."
    },
    {
      icon: Clock,
      title: "Guaranteed Turnkey Timeline",
      description: "From structural excavation to final custom woodwork polishing, our milestone-based project governance guarantees on-schedule key handover."
    },
    {
      icon: Coins,
      title: "Transparent BOQ & Value Engineering",
      description: "No ambiguous estimates. Every bag of cement, foot of steel, and marble slab is accounted for in an itemized bill of quantities with locked rates."
    },
    {
      icon: ShieldCheck,
      title: "Certified Materials & Craftsmanship",
      description: "Direct procurement of seismic-certified steel, grade-A porcelain tiles, seasoned hardwoods, and high-performance waterproofing systems."
    },
    {
      icon: CheckCircle2,
      title: "Local Garden Town Lahore Presence",
      description: "Strategically located at Barkat Market, 61 BB Central Plaza, our on-site supervisors inspect progress daily across Lahore's premier sectors."
    }
  ];

  return (
    <section className="py-24 bg-[#0a0b0e] relative border-b border-[#1c1e27] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and High-Impact Pitch */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161820] border border-[#c5a880]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
              <span>Our Structural Advantage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6">
              Why Discerning Clients Entrust Their Projects to Us
            </h2>
            <p className="text-sm sm:text-base text-[#a7a296] leading-relaxed mb-8 font-light">
              Building or renovating a luxury property is an enduring life milestone. We eliminate the friction, contractor disputes, and cost inflation common in conventional construction by maintaining single-point turnkey responsibility.
            </p>

            <div className="p-6 rounded-2xl bg-[#12141a] border border-[#232632] space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-[#21242e] pb-3">
                <span className="text-xs text-[#a0a5b2] uppercase tracking-wider">Turnkey Delivery Rate</span>
                <span className="font-serif text-xl font-bold text-[#c5a880]">100% On-Target</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#21242e] pb-3">
                <span className="text-xs text-[#a0a5b2] uppercase tracking-wider">Customer Satisfaction</span>
                <span className="font-serif text-xl font-bold text-white">4.7 / 5.0 Google Rating</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a0a5b2] uppercase tracking-wider">Quality Audits</span>
                <span className="font-serif text-xl font-bold text-[#c5a880]">Weekly Certified Reports</span>
              </div>
            </div>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-black bg-gradient-to-r from-[#d9be9b] to-[#c5a880] hover:brightness-110 shadow-lg shadow-[#c5a880]/10 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Discuss Your Architectural Plan</span>
            </button>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#12141c] border border-[#20232e] hover:border-[#c5a880]/50 transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2c303f] text-[#c5a880] group-hover:scale-105 group-hover:border-[#c5a880]/60 transition-all shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-[#c5a880] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9f9a8e] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
