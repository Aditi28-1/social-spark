import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SocialSparkLogo } from './SocialSparkLogo';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onOpenFounderModel: () => void;
}

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenFounderModel }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#15152B] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-10 border-b border-white/10">
          <div className="md:col-span-5">
            <SocialSparkLogo variant="dark" size="md" />
            <p className="mt-4 font-display font-semibold text-base text-white">
              We Create. We Connect. We Grow.
            </p>
            <p className="mt-2 text-sm text-white/65 max-w-sm leading-relaxed">
              Subscription-based social media marketing &amp; short-form content agency serving
              local businesses and emerging brands in {siteConfig.location}.
            </p>
          </div>

          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Explore
            </p>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-y-2.5 gap-x-6">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/75 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/12 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>
            &copy; {new Date().getFullYear()} SocialSpark · {siteConfig.location}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span>Portfolio items shown are sample creative concepts.</span>
            <button
              type="button"
              onClick={onOpenFounderModel}
              className="text-white/60 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Founder Venture Model
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
