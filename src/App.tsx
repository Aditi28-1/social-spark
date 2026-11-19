import React, { useEffect, useState } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { ContactPrefill, ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FounderModelModal } from './components/FounderModelModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SocialSparkLogo } from './components/SocialSparkLogo';

const ProtectedSocialSparkSite: React.FC = () => {
  const { user, authReady } = useAuth();
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [founderModalOpen, setFounderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 560);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <SocialSparkLogo variant="light" size="lg" />
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#15152B]/70">
          <Loader2 className="w-4 h-4 animate-spin text-[#7B2FF7]" aria-hidden="true" />
          <span>Verifying your SocialSpark session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToContactWithPrefill = (partial: Omit<ContactPrefill, 'timestamp'>) => {
    setContactPrefill({ ...partial, timestamp: Date.now() });
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15152B]">
      <Navbar />

      <main className="flex-1">
        <HeroSection
          onExploreWork={() => scrollToSection('portfolio')}
          onStartProject={() => scrollToSection('contact')}
        />

        <AboutSection />

        <ServicesSection
          onSelectServiceForEnquiry={(serviceTitle) =>
            navigateToContactWithPrefill({
              service: serviceTitle,
              messageNote: `Hi SocialSpark, we are interested in ${serviceTitle} for our business in Dehradun.`,
            })
          }
        />

        <IndustriesSection
          onEnquireIndustry={(industryName) =>
            navigateToContactWithPrefill({
              category: industryName,
              messageNote: `Hi SocialSpark, we run a ${industryName} in Dehradun and would like to discuss monthly content management.`,
            })
          }
        />

        <PortfolioSection
          onRequestSimilarConcept={(conceptTitle) =>
            navigateToContactWithPrefill({
              messageNote: `Hi SocialSpark, we liked the "${conceptTitle}" concept and want something tailored for our brand.`,
            })
          }
        />

        <ProcessSection />

        <PricingSection
          onSelectGrowthPackage={() =>
            navigateToContactWithPrefill({
              budget: '₹12,000 / month — SocialSpark Growth Package',
              messageNote:
                'Hi SocialSpark, we would like to get started with the SocialSpark Growth Package (₹12,000/month).',
            })
          }
          onSelectCustomPackage={() =>
            navigateToContactWithPrefill({
              budget: 'Custom Scope — Let’s Discuss',
              messageNote:
                'Hi SocialSpark, we would like to discuss a customized social media package tailored to our business goals.',
            })
          }
        />

        <ContactSection prefill={contactPrefill} />
      </main>

      <Footer onOpenFounderModel={() => setFounderModalOpen(true)} />

      <FounderModelModal
        open={founderModalOpen}
        onClose={() => setFounderModalOpen(false)}
      />

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#15152B] text-white border border-white/15 shadow-lg hover:bg-[#7B2FF7] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7]"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProtectedSocialSparkSite />
      </AuthProvider>
    </ErrorBoundary>
  );
}
