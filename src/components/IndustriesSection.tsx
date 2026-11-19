import React, { useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { DEHRADUN_HUBS, INDUSTRY_SECTORS } from '../data/socialSparkData';

interface IndustriesSectionProps {
  onEnquireIndustry: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onEnquireIndustry,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<string>(DEHRADUN_HUBS[0].id);

  const activeHub =
    DEHRADUN_HUBS.find((h) => h.id === selectedHubId) ?? DEHRADUN_HUBS[0];

  return (
    <section id="industries" className="bg-[#F7F7FA] py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-[#7B2FF7] mb-3">Industries &amp; Local Focus</p>
            <h2
              className="font-display font-bold text-[#15152B] tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
            >
              Built for Dehradun&apos;s cafés, hospitality spots, and rising local brands.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#15152B]/75 leading-relaxed">
              While our storytelling framework serves diverse consumer businesses, we begin with a
              sharp focus where visual atmosphere and short-form video drive daily footfall.
            </p>
          </div>
        </div>

        {/* Beachhead Spotlight + Interactive Dehradun Commercial Hubs */}
        <div className="rounded-3xl bg-white border border-[#15152B]/10 p-6 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono text-[#FF7A30] mb-2">Initial Beachhead Focus</p>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#15152B] leading-tight">
                Independent Cafés &amp; Casual Restaurants
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#15152B]/75 leading-relaxed">
                Specifically tailored for Dehradun dining spots with{' '}
                <span className="font-semibold text-[#15152B]">1–3 outlets</span>, an active but
                inconsistent Instagram presence, and no dedicated in-house social media marketing
                team.
              </p>

              <div className="mt-6 space-y-2.5 text-sm text-[#15152B]/80">
                <p>
                  <span className="font-semibold text-[#15152B]">Typical cadence gap:</span>{' '}
                  Occasional mobile posts during busy rushes instead of planned weekly Reels.
                </p>
                <p>
                  <span className="font-semibold text-[#15152B]">Our role:</span> On-site menu &amp;
                  ambience filming, cohesive feed curation, and seasonal table-promo campaigns.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onEnquireIndustry('Café / Restaurant')}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7B2FF7] hover:text-[#15152B] transition-colors cursor-pointer"
              >
                <span>Plan content for your café or restaurant</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Interactive Dehradun Neighbourhood Selector */}
            <div className="lg:col-span-7 rounded-2xl bg-[#F7F7FA] border border-[#15152B]/8 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#15152B]/65 mb-4">
                <MapPin className="w-4 h-4 text-[#FF7A30]" aria-hidden="true" />
                <span>Explore Dehradun Commercial Clusters</span>
              </div>

              {/* Functional Segmented Location Tabs */}
              <div
                role="tablist"
                aria-label="Dehradun commercial corridors"
                className="flex flex-wrap gap-2 mb-6"
              >
                {DEHRADUN_HUBS.map((hub) => {
                  const isActive = hub.id === activeHub.id;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${
                        isActive
                          ? 'bg-[#15152B] text-white shadow-sm'
                          : 'bg-white text-[#15152B]/75 border border-[#15152B]/10 hover:text-[#15152B] hover:border-[#7B2FF7]/35'
                      }`}
                    >
                      {hub.name}
                    </button>
                  );
                })}
              </div>

              {/* Active Corridor Strategy Brief */}
              <div className="rounded-xl bg-white border border-[#15152B]/10 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display font-bold text-lg text-[#15152B]">
                    {activeHub.name}
                  </h4>
                  <span className="text-xs font-mono text-[#7B2FF7]">{activeHub.corridorType}</span>
                </div>

                <p className="text-sm text-[#15152B]/75 leading-relaxed">
                  <span className="font-semibold text-[#15152B]">Local Audience: </span>
                  {activeHub.audienceMix}
                </p>

                <p className="text-sm text-[#15152B]/75 leading-relaxed">
                  <span className="font-semibold text-[#15152B]">Creative Angle: </span>
                  {activeHub.contentAngle}
                </p>

                <div className="pt-2 border-t border-[#15152B]/8 text-xs text-[#15152B]/65">
                  <span className="font-semibold text-[#15152B]">Recommended Format: </span>
                  {activeHub.recommendedFormat}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 7 Target Industries Editorial Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRY_SECTORS.filter((s) => !s.isBeachhead).map((sector, idx) => (
            <div
              key={sector.id}
              className="rounded-2xl bg-white border border-[#15152B]/10 p-6 flex flex-col justify-between hover:border-[#7B2FF7]/30 transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-[#7B2FF7] tabular-nums">
                  0{idx + 2}
                </span>
                <h3 className="font-display font-semibold text-lg text-[#15152B] mt-1.5">
                  {sector.name}
                </h3>
                <p className="mt-2 text-sm text-[#15152B]/70 leading-relaxed">
                  {sector.focusNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
