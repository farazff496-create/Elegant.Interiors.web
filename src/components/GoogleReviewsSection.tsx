import React from 'react';
import { useSite } from '../context/SiteContext';
import { Star, ExternalLink, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const { reviews, settings } = useSite();

  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/LP6N3UtNVaLG8v477";
  const googleReviewUrl = settings?.googleReviewUrl || "https://maps.app.goo.gl/LP6N3UtNVaLG8v477";
  const rating = settings?.googleRating || 4.7;
  const reviewCount = settings?.reviewCount || 26;

  return (
    <section id="reviews" className="py-24 bg-[#0e1014] relative border-b border-[#1c1e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Google Rating Overview */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 pb-12 border-b border-[#1f222d]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161820] border border-[#c5a880]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-3">
              <span>Google Maps Verified Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-3">
              Client Endorsements & Reviews
            </h2>
            <p className="text-sm text-[#a09a8e] max-w-xl font-light">
              Verified testimonials submitted by homeowners, corporate directors, and developers on our official Google Business profile.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="p-6 rounded-2xl bg-[#14161f] border border-[#262936] shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-md">
                {/* Google multi-color SVG icon */}
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl font-bold text-white">{rating}</span>
                  <div className="flex items-center text-[#facc15]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-[#a0a5b2] mt-0.5">
                  Based on <span className="text-white font-semibold">{reviewCount} Google Customer Reviews</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#333746] hover:border-[#c5a880] text-xs font-semibold tracking-wider uppercase text-[#d8d4cb] hover:text-[#c5a880] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Google Listing</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d9be9b] to-[#c5a880] hover:brightness-110 text-xs font-semibold tracking-wider uppercase text-black transition-all flex items-center justify-center gap-1.5"
              >
                <span>Write a Review</span>
              </a>
            </div>
          </div>
        </div>

        {/* Authentic Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#12141c] border border-[#212430] hover:border-[#c5a880]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Review Header: User & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a241e] to-[#121110] border border-[#c5a880]/40 flex items-center justify-center text-sm font-bold text-[#f5e4c3]">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white group-hover:text-[#c5a880] transition-colors">
                        {rev.author}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-[#7d8392]">
                        <CheckCircle className="w-3 h-3 text-[#22c55e]" />
                        <span>Verified Google Review</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-[#facc15]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Quote */}
                <div className="relative mb-4">
                  <Quote className="w-5 h-5 text-[#2c303f] absolute -top-1 -left-1 opacity-50" />
                  <p className="text-xs sm:text-sm text-[#d4cfc5] leading-relaxed font-light pl-4 italic">
                    "{rev.text}"
                  </p>
                </div>
              </div>

              {/* Review Footer */}
              <div className="pt-3 border-t border-[#1d202b] flex items-center justify-between text-[11px] text-[#868c9c]">
                <span className="font-mono text-[#c5a880]">{rev.projectType}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note Regarding Verified Data */}
        <div className="mt-12 text-center text-xs text-[#808696] max-w-2xl mx-auto">
          These reviews represent authentic feedback publicly published by clients on our Google Maps profile for Elegant Interiors & Construction, Barkat Market, Garden Town, Lahore.
        </div>
      </div>
    </section>
  );
};
