import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ProjectItem } from '../types';
import { MapPin, Maximize2, SplitSquareVertical, ArrowUpRight, Sparkles } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const { projects, setSelectedProject } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({});

  const categories = [
    'All',
    'Interior Design',
    'Exterior Design',
    'Residential Projects',
    'Commercial Projects',
    'Office Interiors',
    'Construction Projects',
    'Turnkey Projects'
  ];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategory === 'All') return true;
    return proj.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(proj.category.toLowerCase());
  });

  const handleSliderMove = (projectId: string, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
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
    setSliderPositions(prev => ({ ...prev, [projectId]: percentage }));
  };

  return (
    <section id="projects" className="py-24 bg-[#0c0d10] relative border-b border-[#1c1e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a22] border border-[#c5a880]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterworks In Architecture & Interiors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-5">
            Featured Project Portfolio
          </h2>
          <p className="text-sm sm:text-base text-[#a7a296] leading-relaxed font-light">
            Selected residential residences, commercial headquarters, and turnkey remodel developments across DHA Lahore, Gulberg, Model Town, and Garden Town.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-3 scrollbar-none flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-[#c5a880] text-black font-semibold shadow-lg shadow-[#c5a880]/20'
                    : 'bg-[#14161e] text-[#a0a5b2] hover:text-white border border-[#242733]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const sliderPos = sliderPositions[project.id] !== undefined ? sliderPositions[project.id] : 50;

            return (
              <div
                key={project.id}
                className="group bg-[#12141b] rounded-2xl overflow-hidden border border-[#21242f] hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Media Container: Either Before/After Interactive Slider or Regular Image */}
                <div className="relative h-72 w-full overflow-hidden bg-black select-none">
                  {project.hasBeforeAfter && project.beforeImage && project.afterImage ? (
                    <div
                      className="relative w-full h-full cursor-ew-resize overflow-hidden"
                      onMouseMove={(e) => handleSliderMove(project.id, e)}
                      onTouchMove={(e) => handleSliderMove(project.id, e)}
                    >
                      {/* After Image (Full width background) */}
                      <img
                        src={project.afterImage}
                        alt={`${project.title} - After Completion`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />

                      {/* Before Image (Clipped width) */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${sliderPos}%` }}
                      >
                        <img
                          src={project.beforeImage}
                          alt={`${project.title} - Before Renovation`}
                          className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      {/* Divider Line & Handle */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
                        style={{ left: `${sliderPos}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0c0d10] border-2 border-white flex items-center justify-center text-[10px] text-white shadow-xl">
                          &#x21D4;
                        </div>
                      </div>

                      {/* Badges on Before / After */}
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/75 text-[9px] uppercase tracking-wider text-white z-20 pointer-events-none">
                        Before
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#c5a880]/90 text-[9px] uppercase tracking-wider text-black font-bold z-20 pointer-events-none">
                        After
                      </div>

                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded bg-[#0c0d10]/85 border border-[#c5a880]/40 text-[10px] text-[#c5a880] z-20 pointer-events-none">
                        <SplitSquareVertical className="w-3 h-3" />
                        <span>Interactive Slider</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12141b] via-transparent to-transparent opacity-80" />
                      
                      {/* Enlarge Trigger Icon */}
                      <div className="absolute top-4 right-4 p-2 rounded-lg bg-[#0c0d10]/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#12141b]/90 backdrop-blur-md border border-[#c5a880]/30 text-[10px] uppercase tracking-wider text-[#dcd7ce] font-medium z-10">
                    {project.category}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Year */}
                    <div className="flex items-center justify-between text-xs text-[#a0a5b2] mb-2 font-mono">
                      <span className="flex items-center gap-1 text-[#c5a880]">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                        {project.location}
                      </span>
                      <span>{project.year} &bull; {project.area}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 cursor-pointer hover:text-[#c5a880] transition-colors"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#c5a880] font-medium mb-3">
                      Scope: {project.scope}
                    </p>

                    <p className="text-xs sm:text-sm text-[#9f9a8e] leading-relaxed line-clamp-3 mb-6 font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-[#1e222d] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#d8d4cb] hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
                    >
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[11px] text-[#787e8e]">
                      {project.gallery?.length || 1} photographs
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
