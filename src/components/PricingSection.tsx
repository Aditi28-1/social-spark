import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { GROWTH_PACKAGE } from '../data/socialSparkData';

interface PricingSectionProps {
  onSelectGrowthPackage: () => void;
  onSelectCustomPackage: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectGrowthPackage,
  onSelectCustomPackage,
}) => {
  return (
    <section id="pricing" className="bg-[#F7F7FA] py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-[#7B2FF7] mb-3">Transparent Pricing</p>
          <h2
            className="font-display font-bold text-[#15152B] tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
          >
            One focused monthly retainer. Zero agency bloat.
          </h2>
          <p className="mt-4 text-base text-[#15152B]/75 leading-relaxed">
            Built to give growing businesses consistent short-form video, curated design, and
            account stewardship at a predictable monthly rate.
          </p>
        </div>

        {/* Single-Package Conversion Monolith */}
        <div className="rounded-3xl bg-white border border-[#15152B]/12 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Package Summary & Price */}
            <div className="lg:col-span-5 bg-[#15152B] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[#FF7A30]">Monthly Retainer</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl mt-2">
                  {GROWTH_PACKAGE.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
                  {GROWTH_PACKAGE.tagline}
                </p>

                <div className="mt-8 pt-6 border-t border-white/12">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl sm:text-5xl tracking-tight tabular-nums">
                      {GROWTH_PACKAGE.price}
                    </span>
                    <span className="text-sm text-white/70">{GROWTH_PACKAGE.cadence}</span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">
                    Subscription model · Transparent monthly creative deliverables
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={onSelectGrowthPackage}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15152B]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Deliverables Checklist & Custom Note */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/60 mb-5">
                  Everything Included Every Month
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {GROWTH_PACKAGE.inclusions.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 py-2 border-b border-[#15152B]/8"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#F2EEFF] text-[#7B2FF7] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm sm:text-base font-medium text-[#15152B]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#F2EEFF]/60 border border-[#7B2FF7]/18 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-[#15152B]/85 leading-relaxed">
                  {GROWTH_PACKAGE.customNote}
                </p>
                <button
                  type="button"
                  onClick={onSelectCustomPackage}
                  className="inline-flex items-center justify-center rounded-xl border border-[#15152B]/20 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#15152B] hover:border-[#7B2FF7] hover:text-[#7B2FF7] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Discuss Custom Scope
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
