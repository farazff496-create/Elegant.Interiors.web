import React from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MapPin, Mail, Globe, ArrowUpRight, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, services, setActiveView, scrollToSection, setPrivacyModalOpen, setTermsModalOpen } = useSite();

  const phone = settings?.phone || "0331 3404441";
  const address = settings?.address || "Barkat Market, 61 BB Central Plaza, New Commercial Area, Garden Town, Lahore, 54000, Pakistan.";
  const email = settings?.email || "info@elegantinteriors.com.pk";
  const website = settings?.officialWebsite || "https://elegantinteriors.com.pk";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/LP6N3UtNVaLG8v477";

  const socialLinks = settings?.socialLinks || {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/923313404441"
  };

  return (
    <footer className="bg-[#07080a] text-[#8e94a5] border-t border-[#181a22] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#181a22]">
          {/* Brand & Narrative (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1a1713] border border-[#c5a880]/50 flex items-center justify-center">
                <span className="font-serif text-base font-bold text-[#f5e4c3]">EIC</span>
              </div>
              <div>
                <span className="font-serif block text-lg font-bold tracking-wider text-white">
                  {settings?.businessName || "Elegant Interiors & Construction"}
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-[#c5a880]">
                  Architectural Studio &bull; Lahore
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a0a5b2] leading-relaxed font-light">
              Transforming spaces into timeless experiences through architectural design, civil construction, turnkey project management, and bespoke luxury interior decor in Lahore, Pakistan.
            </p>

            {/* Social Media Profiles */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#757a8a] block mb-2.5">
                Social Media Channels
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#a0a5b2] hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center text-xs transition-colors"
                    title="Facebook"
                  >
                    Fb
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#a0a5b2] hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center text-xs transition-colors"
                    title="Instagram"
                  >
                    Ig
                  </a>
                )}
                {socialLinks.tiktok && (
                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#a0a5b2] hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center text-xs transition-colors"
                    title="TikTok"
                  >
                    Tk
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#a0a5b2] hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center text-xs transition-colors"
                    title="YouTube"
                  >
                    Yt
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#a0a5b2] hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center text-xs transition-colors"
                    title="LinkedIn"
                  >
                    In
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#12141c] border border-[#232634] text-[#25D366] hover:border-[#25D366]/50 flex items-center justify-center text-xs transition-colors"
                    title="WhatsApp"
                  >
                    Wa
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Core Services (Col 5-8) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Google Maps Registered Services
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {services.slice(0, 12).map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => scrollToSection('services')}
                  className="text-left text-[#9ea3b2] hover:text-[#c5a880] transition-colors truncate"
                >
                  &bull; {srv.title}
                </button>
              ))}
            </div>
          </div>

          {/* Coordinates & Hours (Col 9-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Studio Coordinates
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white font-mono">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">
                  elegantinteriors.com.pk
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#c5a880] hover:underline"
              >
                <span>Navigate on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707686]">
          <div>
            &copy; {new Date().getFullYear()} Elegant Interiors & Construction. All rights reserved. Barkat Market, Lahore.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#c5a880] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#c5a880] transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#c5a880]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
