import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MapPin, Menu, X, Shield, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, activeView, setActiveView, scrollToSection, setIsQuoteModalOpen } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', type: 'view' },
    { name: 'Services', id: 'services', type: 'scroll' },
    { name: 'Projects', id: 'projects', type: 'scroll' },
    { name: 'About Us', id: 'about', type: 'view' },
    { name: 'Reviews', id: 'reviews', type: 'scroll' },
    { name: 'Contact', id: 'contact', type: 'scroll' },
  ];

  const handleNavClick = (link: { name: string; id: string; type: string }) => {
    setMobileMenuOpen(false);
    if (link.type === 'view') {
      setActiveView(link.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(link.id);
    }
  };

  const businessPhone = settings?.phone || "0331 3404441";
  const whatsappUrl = `https://wa.me/${(settings?.whatsapp || '923313404441').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Elegant Interiors & Construction, I would like to inquire about architectural and interior design services.')}`;

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#08080a] border-b border-[#1f222a] text-xs text-[#a0a5b2] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-[#c5a880]">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
              Barkat Market, Garden Town, Lahore
            </span>
            <span className="hidden md:inline-block text-[#3d424e]">|</span>
            <span className="hidden md:flex items-center gap-1 text-[#d8d4cc]">
              <Sparkles className="w-3 h-3 text-[#c5a880]" />
              Official Website: <a href="https://elegantinteriors.com.pk" className="hover:text-[#c5a880] transition-colors underline decoration-[#c5a880]/40">elegantinteriors.com.pk</a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${businessPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#c5a880] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="font-medium tracking-wider">{businessPhone}</span>
            </a>
            <button
              onClick={() => setActiveView('admin')}
              className="flex items-center gap-1 text-[#8b919e] hover:text-[#c5a880] transition-colors px-2 py-0.5 rounded border border-[#252830] hover:border-[#c5a880]/50"
              title="Admin Management Portal"
            >
              <Shield className="w-3 h-3 text-[#c5a880]" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0c0d10]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-[#22252e]'
            : 'bg-[#0c0d10]/80 backdrop-blur-sm border-b border-[#1b1d24]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2a241e] via-[#1a1713] to-[#0c0d10] border border-[#c5a880]/50 flex items-center justify-center shadow-lg shadow-black/60 group-hover:border-[#c5a880] transition-colors">
              <span className="font-serif text-lg font-bold tracking-widest text-[#f5e4c3] group-hover:scale-105 transition-transform">
                EIC
              </span>
            </div>
            <div>
              <span className="font-serif block text-lg sm:text-xl font-bold tracking-wider text-white uppercase group-hover:text-[#c5a880] transition-colors">
                {settings?.businessName || "Elegant Interiors & Construction"}
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#a59e92]">
                Architectural Studio &bull; Lahore
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 text-[#d8d4cb] hover:text-[#c5a880] ${
                  activeView === link.id ? 'text-[#c5a880] font-semibold' : ''
                }`}
              >
                {link.name}
                {activeView === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[#2b2e38] text-[#a0a6b5] hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0c0d10] bg-gradient-to-r from-[#d9be9b] via-[#c5a880] to-[#b38e5d] hover:brightness-110 shadow-lg shadow-[#c5a880]/10 transition-all flex items-center gap-2"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg border border-[#2a2c35] text-[#d8d4cb] hover:text-white hover:border-[#c5a880]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e1014] border-b border-[#252833] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`text-left text-base font-medium py-2 border-b border-[#1b1d24] text-[#d8d4cb] hover:text-[#c5a880] ${
                    activeView === link.id ? 'text-[#c5a880] font-semibold' : ''
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('admin');
                }}
                className="text-left text-base font-medium py-2 text-[#c5a880] flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </button>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#d9be9b] to-[#c5a880] text-center"
              >
                Get Free Consultation
              </button>
              <a
                href={`tel:${businessPhone.replace(/\s+/g, '')}`}
                className="w-full block py-3 rounded-lg border border-[#343845] text-center text-xs font-semibold uppercase tracking-wider text-[#d8d4cb]"
              >
                Call: {businessPhone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
