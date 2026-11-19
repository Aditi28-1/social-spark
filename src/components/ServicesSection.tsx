import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/socialSparkData';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEnquiry,
}) => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);

  const activeService: ServiceItem =
    SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <section id="services" className="bg-white py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-[#7B2FF7] mb-3">Our Services</p>
          <h2
            className="font-display font-bold text-[#15152B] tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
          >
            Nine specialized capabilities designed to keep your brand visible and consistent.
          </h2>
          <p className="mt-4 text-base text-[#15152B]/70 leading-relaxed">
            Select any service below to inspect what it includes, why growing businesses rely on it,
            and the practical value it adds to your monthly workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive 9-Service Index Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  aria-pressed={isSelected}
                  className={`group text-left rounded-2xl p-5 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${
                    isSelected
                      ? 'bg-[#15152B] text-white border-[#15152B] shadow-md'
                      : 'bg-[#F7F7FA] text-[#15152B] border-[#15152B]/10 hover:bg-[#F2EEFF]/60 hover:border-[#7B2FF7]/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isSelected ? 'text-[#FF7A30]' : 'text-[#7B2FF7]'
                      }`}
                    >
                      {service.index}
                    </span>
                    <span
                      className={`text-xs truncate ${
                        isSelected ? 'text-white/70' : 'text-[#15152B]/55'
                      }`}
                    >
                      {service.shortTag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg leading-snug">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-white/75' : 'text-[#15152B]/65'
                    }`}
                  >
                    {service.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Sticky Detailed Service Scope Inspector */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-3xl bg-[#F2EEFF]/55 border border-[#7B2FF7]/18 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#15152B]/10">
              <span className="font-mono text-xs font-medium text-[#7B2FF7] tabular-nums">
                Service {activeService.index} · {activeService.shortTag}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-[#15152B] mt-4 leading-tight">
              {activeService.title}
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#15152B]/75 leading-relaxed">
              {activeService.summary}
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/60 mb-2.5">
                  What This Includes
                </h4>
                <ul className="space-y-2">
                  {activeService.whatItIncludes.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#15152B]/85">
                      <Check
                        className="w-4 h-4 text-[#7B2FF7] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#15152B]/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/60 mb-1.5">
                  Why Businesses Need It
                </h4>
                <p className="text-sm text-[#15152B]/75 leading-relaxed">
                  {activeService.whyBusinessesNeedIt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#15152B]/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/60 mb-1.5">
                  Value Delivered
                </h4>
                <p className="text-sm text-[#15152B]/85 font-medium leading-relaxed">
                  {activeService.valueDelivered}
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#15152B]/10">
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry(activeService.title)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                <span>Enquire About {activeService.title}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
