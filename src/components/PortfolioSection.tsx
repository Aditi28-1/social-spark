import React, { useState } from 'react';
import { ArrowUpRight, Layers, Play } from 'lucide-react';
import {
  PORTFOLIO_CONCEPTS,
  PortfolioCategory,
  PortfolioConcept,
} from '../data/socialSparkData';
import { PortfolioModal } from './PortfolioModal';

const CATEGORIES: PortfolioCategory[] = [
  'All',
  'Reels',
  'Social Media Posts',
  'Campaigns',
  'Branding',
  'Promotional Content',
];

interface PortfolioSectionProps {
  onRequestSimilarConcept: (conceptTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onRequestSimilarConcept,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All');
  const [activeConcept, setActiveConcept] = useState<PortfolioConcept | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleConcepts =
    selectedCategory === 'All'
      ? PORTFOLIO_CONCEPTS
      : PORTFOLIO_CONCEPTS.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="bg-white py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Honest Concept Disclosure */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#7B2FF7] mb-3">Creative Portfolio</p>
            <h2
              className="font-display font-bold text-[#15152B] tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
            >
              Scroll-first concepts crafted for cafés, restaurants, and local brands.
            </h2>
          </div>

          <div className="max-w-md rounded-2xl bg-[#F2EEFF]/70 border border-[#7B2FF7]/20 px-4 py-3 text-xs sm:text-sm text-[#15152B]/80 leading-relaxed">
            <span className="font-semibold text-[#15152B]">Sample Demonstration Concepts: </span>
            The Reels, carousels, and campaigns below are creative mockups illustrating
            SocialSpark&apos;s direction—not verified past client campaigns or metrics.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter creative portfolio concepts"
          className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#15152B]/10"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${
                  isActive
                    ? 'bg-[#15152B] text-white shadow-sm'
                    : 'bg-[#F7F7FA] text-[#15152B]/75 hover:text-[#15152B] hover:bg-[#F2EEFF]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Creative Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {visibleConcepts.map((item, idx) => {
            const spanClass =
              selectedCategory === 'All' && (idx === 0 || idx === 3 || idx === 5)
                ? 'lg:col-span-6'
                : selectedCategory === 'All'
                ? 'lg:col-span-3'
                : 'lg:col-span-4';

            const imgFailed = Boolean(failedImages[item.id]);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveConcept(item)}
                className={`group text-left rounded-2xl bg-[#F7F7FA] border border-[#15152B]/10 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#7B2FF7]/35 hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${spanClass}`}
              >
                <div className="relative w-full aspect-[4/3] bg-[#15152B] overflow-hidden">
                  {!imgFailed ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full spark-gradient-bg flex flex-col items-center justify-center p-6 text-center text-white">
                      <p className="font-display font-bold text-lg">{item.title}</p>
                      <p className="text-xs text-white/80 mt-1">{item.formatLabel}</p>
                    </div>
                  )}

                  {/* Measured Contrast Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#15152B]/85 via-[#15152B]/15 to-transparent"
                  />

                  {/* Top Format Affordance */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[11px] bg-[#15152B]/65 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      Sample Concept
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-[#15152B] group-hover:bg-[#FF7A30] group-hover:text-white transition-colors">
                      {item.category === 'Reels' || item.reelBeats ? (
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : item.slides ? (
                        <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </div>

                  {/* Bottom Hook Line */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <p className="text-xs text-white/75">
                      {item.category} <span aria-hidden="true">·</span> {item.sector}
                    </p>
                    <p className="font-display font-bold text-lg sm:text-xl leading-snug mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-sm text-[#15152B]/75 leading-relaxed line-clamp-2">
                    {item.hookLine}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#15152B]/8 flex items-center justify-between text-xs text-[#15152B]/60">
                    <span>{item.formatLabel}</span>
                    <span className="font-semibold text-[#7B2FF7] group-hover:translate-x-0.5 transition-transform">
                      Inspect Concept &rarr;
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <PortfolioModal
        concept={activeConcept}
        onClose={() => setActiveConcept(null)}
        onRequestSimilar={onRequestSimilarConcept}
      />
    </section>
  );
};
