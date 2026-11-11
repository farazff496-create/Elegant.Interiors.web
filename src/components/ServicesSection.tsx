import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ServiceItem } from '../types';
import { Sparkles, ArrowRight, Check, Search, Filter } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setSelectedService, setIsQuoteModalOpen, setQuotePrefillService } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Design',
    'Building',
    'Interior',
    'Turnkey',
    'Decor',
    'Residential',
    'Commercial & Civil',
    'Engineering'
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory || 
      (selectedCategory === 'Design' && (srv.title.includes('Design') || srv.title.includes('Architecture'))) ||
      (selectedCategory === 'Building' && (srv.title.includes('Construction') || srv.title.includes('Building'))) ||
      (selectedCategory === 'Decor' && (srv.title.includes('Decor') || srv.title.includes('Customise')));
    
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleRequestQuote = (service: ServiceItem) => {
    setQuotePrefillService(service.title);
    setIsQuoteModalOpen(true);
  };

  return (
    <section id="services" className="py-24 bg-[#0a0b0e] relative border-b border-[#1c1e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a22] border border-[#c5a880]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architectural & Construction Capabilities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-5">
            Our Verified Business Services
          </h2>
          <p className="text-sm sm:text-base text-[#a7a296] leading-relaxed font-light">
            Providing all thirteen core architectural, civil construction, and luxury interior disciplines exactly as registered with Google Maps for our Garden Town, Lahore practice.
          </p>

          {/* Search and Category Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#757a87] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#13151b] border border-[#252833] focus:border-[#c5a880] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#757a87] outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              <div className="flex items-center gap-1.5">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#c5a880] text-black font-semibold shadow-md shadow-[#c5a880]/20'
                        : 'bg-[#14161d] text-[#a0a5b2] hover:text-white border border-[#232630]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid (All 13 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id || index}
              className="group bg-[#111319] rounded-2xl overflow-hidden border border-[#222530] hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-[#c5a880]/5"
            >
              {/* Service Image with Category Pill & Index Number */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-transparent opacity-90" />
                
                {/* Index Pill */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#0c0d10]/80 backdrop-blur-md border border-[#2a2d39] text-[11px] font-mono text-[#c5a880]">
                  #{String(index + 1).padStart(2, '0')}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#1b1e27]/90 backdrop-blur-md border border-[#c5a880]/30 text-[10px] uppercase tracking-wider text-[#dcd7ce] font-medium">
                  {service.category || 'Architecture'}
                </div>
              </div>

              {/* Service Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#c5a880] transition-colors">
                    {service.title}
                  </h3>
                  
                  {service.tagline && (
                    <p className="text-xs text-[#c5a880] font-medium mb-3 italic">
                      "{service.tagline}"
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#9f9a8e] leading-relaxed line-clamp-3 mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Deliverables snippet */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-[#1e212b]">
                      {service.deliverables.slice(0, 2).map((del, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#cfcac0]">
                          <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions: Learn More & Request a Quote */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1e212b]">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 px-3 rounded-lg border border-[#2a2d39] hover:border-[#c5a880]/60 text-xs font-semibold uppercase tracking-wider text-[#d8d4cb] hover:text-[#c5a880] transition-colors text-center"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => handleRequestQuote(service)}
                    className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#d9be9b] to-[#c5a880] hover:brightness-110 text-xs font-semibold uppercase tracking-wider text-black transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Services Count Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-[#8c8679]">
            <span>Displaying {filteredServices.length} of {services.length} registered architectural & construction services</span>
            <span>&bull;</span>
            <span className="text-[#c5a880]">Barkat Market, Lahore Studio</span>
          </div>
        </div>
      </div>
    </section>
  );
};
