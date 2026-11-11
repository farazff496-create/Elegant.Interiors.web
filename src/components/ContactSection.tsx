import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MessageSquare, MapPin, Globe, Clock, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, services, submitInquiry, quotePrefillService } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: quotePrefillService || 'Architectural Design',
    budget: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const businessPhone = settings?.phone || "0331 3404441";
  const rawPhone = businessPhone.replace(/[^0-9]/g, '');
  const businessAddress = settings?.address || "Barkat Market, 61 BB Central Plaza, New Commercial Area, Garden Town, Lahore, 54000, Pakistan.";
  const businessWebsite = settings?.officialWebsite || "https://elegantinteriors.com.pk";
  const googleMapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/LP6N3UtNVaLG8v477";
  const whatsappUrl = `https://wa.me/923313404441?text=${encodeURIComponent('Hello Elegant Interiors & Construction, I would like to schedule a consultation at your Barkat Market, Lahore studio.')}`;

  const budgetOptions = [
    'PKR 2 Million - 5 Million',
    'PKR 5 Million - 15 Million',
    'PKR 15 Million - 30 Million',
    'PKR 30 Million - 60 Million',
    'PKR 60 Million+',
    'Consultation / Feasibility Study'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your Name, Phone Number, and a brief description of your project.');
      return;
    }

    setSubmitting(true);
    const result = await submitInquiry(formData);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Architectural Design',
        budget: '',
        message: ''
      });
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0b0e] relative border-b border-[#1c1e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a22] border border-[#c5a880]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-4">
            <span>Direct Studio Access</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-4">
            Initiate Your Architectural Consultation
          </h2>
          <p className="text-sm sm:text-base text-[#a7a296] leading-relaxed font-light">
            Visit our office at Central Plaza Garden Town or connect with our principal architects for immediate project inquiries and BOQ assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Coordinates & Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#12141c] border border-[#232633] space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                {settings?.businessName || "Elegant Interiors & Construction"}
              </h3>
              <p className="text-xs text-[#a0a5b2] -mt-4">
                Interior Architect Office &bull; Construction Company
              </p>

              {/* Phone Coordinate */}
              <div className="flex items-start gap-4 pt-2">
                <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2b2e3c] text-[#c5a880] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a8091] block">Direct Telephone</span>
                  <a
                    href={`tel:${rawPhone}`}
                    className="font-serif text-xl font-bold text-white hover:text-[#c5a880] transition-colors"
                  >
                    {businessPhone}
                  </a>
                  <span className="text-[11px] text-[#22c55e] block mt-0.5">&bull; Available Mon - Sat</span>
                </div>
              </div>

              {/* WhatsApp Coordinate */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2b2e3c] text-[#25D366] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a8091] block">Instant WhatsApp</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                  >
                    <span>+92 331 3404441</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-[#9b9fae] block mt-0.5">Direct chat with lead architect</span>
                </div>
              </div>

              {/* Studio Physical Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2b2e3c] text-[#c5a880] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a8091] block">Studio Address</span>
                  <p className="text-xs sm:text-sm text-[#d4cfc5] leading-relaxed">
                    {businessAddress}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#c5a880] hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Official Website */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2b2e3c] text-[#c5a880] shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a8091] block">Official Domain</span>
                  <a
                    href={businessWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-white hover:text-[#c5a880] transition-colors font-mono"
                  >
                    elegantinteriors.com.pk
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 border-t border-[#1f222e] pt-4">
                <div className="p-3 rounded-xl bg-[#1a1d26] border border-[#2b2e3c] text-[#c5a880] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7a8091] block">Business Hours</span>
                  <p className="text-xs text-[#cfcac0]">
                    {settings?.businessHours || "Monday - Saturday: 10:00 AM - 7:00 PM | Sunday: Closed"}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-[#232633] h-64 shadow-xl relative">
              <iframe
                title="Elegant Interiors & Construction Barkat Market Lahore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.7634479979727!2d74.32924157640243!3d31.503611174221773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919050d2bc4a899%3A0xdba21e7d23d8c199!2sCentral%20Plaza%20Barkat%20Market!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 filter contrast-125 brightness-90 grayscale-[20%]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#0c0d10]/90 backdrop-blur-md border border-[#2b2e3a] text-[11px] text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Barkat Market &bull; Central Plaza</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#12141c] border border-[#232633] shadow-2xl relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Send a Direct Project Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#9f9a8e] mb-8 font-light">
                Fill in your project requirements below. Messages are recorded immediately in our administrative ledger for priority architectural review.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#151c18] border border-[#22c55e]/40 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-[#b2d8be] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Elegant Interiors & Construction. Your project inquiry has been logged into our admin dashboard.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#333948] text-xs text-[#a0a5b2] hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-[#2a1414] border border-[#ef4444]/40 text-xs text-[#fca5a5] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 1. Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#686e80] outline-none transition-colors"
                      />
                    </div>

                    {/* 2. Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#686e80] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 3. Email Address */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#a0a5b2] mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#686e80] outline-none transition-colors"
                      />
                    </div>

                    {/* 4. Service Interested In */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-2">
                        Service Interested In *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.title} className="bg-[#12141c] text-white">
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 5. Project Budget (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#a0a5b2] mb-2">
                      Estimated Project Budget (Optional)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    >
                      <option value="" className="bg-[#12141c]">Select Budget Bracket (PKR)</option>
                      {budgetOptions.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#12141c] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 6. Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-2">
                      Project Details / Spatial Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details such as plot size (e.g. 10 Marla, 1 Kanal), location (e.g. DHA Phase 6, Gulberg), or specific interior styling preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#686e80] outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest text-black bg-gradient-to-r from-[#d9be9b] via-[#c5a880] to-[#b38e5d] hover:brightness-110 shadow-xl shadow-[#c5a880]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Recording Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#7a8091] text-center">
                    Your details are handled in strict privacy. No spam. Direct response from principal architect.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
