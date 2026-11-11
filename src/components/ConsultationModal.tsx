import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, quotePrefillService, services, submitInquiry } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: quotePrefillService || 'Turnkey Projects',
    budget: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (quotePrefillService) {
      setFormData(prev => ({ ...prev, service: quotePrefillService }));
    }
  }, [quotePrefillService]);

  if (!isQuoteModalOpen) return null;

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
      setErrorMessage('Please provide your Name, Phone Number, and project scope.');
      return;
    }

    setSubmitting(true);
    const res = await submitInquiry(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Turnkey Projects',
        budget: '',
        message: ''
      });
    } else {
      setErrorMessage(res.message);
    }
  };

  const whatsappUrl = `https://wa.me/923313404441?text=${encodeURIComponent(`Hello Elegant Interiors & Construction, I would like to schedule a consultation regarding: ${formData.service || 'Architecture & Interior Design'}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#11131a] rounded-3xl border border-[#262a38] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#202432] flex items-center justify-between bg-[#151822]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
              Architectural Studio Lahore
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Get a Free Consultation
            </h3>
          </div>
          <button
            onClick={() => {
              setIsQuoteModalOpen(false);
              setSubmitted(false);
            }}
            className="p-2 rounded-xl bg-[#202432] text-[#9fa5b5] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">Inquiry Logged</h4>
              <p className="text-xs sm:text-sm text-[#cfcac0] max-w-sm mx-auto leading-relaxed">
                Thank you! Our principal architect has received your inquiry. We typically respond within 2-4 business hours.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsQuoteModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#2b2f3e] text-xs text-[#a0a5b4] hover:text-white"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#2b1616] border border-[#ef4444]/40 text-xs text-[#fca5a5] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#6c7283] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#6c7283] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9fa5b5] mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#6c7283] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-1.5">
                    Desired Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[#12141c]">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9fa5b5] mb-1.5">
                    Budget Bracket
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                  >
                    <option value="" className="bg-[#12141c]">Select Bracket (PKR)</option>
                    {budgetOptions.map((b, idx) => (
                      <option key={idx} value={b} className="bg-[#12141c]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-1.5">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Plot location, Marla/Kanal size, architectural preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#181a24] border border-[#282c3c] focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#6c7283] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d9be9b] to-[#c5a880] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? <span>Logging Inquiry...</span> : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
