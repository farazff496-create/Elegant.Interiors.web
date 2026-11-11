import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyIntro } from './components/CompanyIntro';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { ConsultationModal } from './components/ConsultationModal';
import { PolicyModals } from './components/PolicyModals';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activeView, loading } = useSite();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a241e] to-[#121110] border border-[#c5a880]/60 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
          <span className="font-serif text-2xl font-bold tracking-widest text-[#f5e4c3]">EIC</span>
        </div>
        <div className="font-serif text-xl font-bold text-white tracking-wider mb-1">
          Elegant Interiors & Construction
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880]">
          Barkat Market, Garden Town, Lahore
        </div>
      </div>
    );
  }

  // Admin Route View
  if (activeView === 'admin') {
    return (
      <main>
        <AdminDashboard />
      </main>
    );
  }

  // Dedicated About Us Page View
  if (activeView === 'about') {
    return (
      <div className="min-h-screen flex flex-col bg-[#0c0d10]">
        <Navbar />
        <AboutPage />
        <ContactSection />
        <Footer />
        <FloatingWhatsApp />
        <ProjectModal />
        <ServiceModal />
        <ConsultationModal />
        <PolicyModals />
      </div>
    );
  }

  // Full Homepage Presentation
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d10]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CompanyIntro />
        <ServicesSection />
        <FeaturedProjects />
        <WhyChooseUs />
        <GoogleReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      
      {/* Interactive Global Modals */}
      <ProjectModal />
      <ServiceModal />
      <ConsultationModal />
      <PolicyModals />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <MainLayout />
    </SiteProvider>
  );
}
