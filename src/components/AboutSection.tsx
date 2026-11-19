import React, { useState } from 'react';
import { AGENCY_IMAGES, BUSINESS_CHALLENGES } from '../data/socialSparkData';

export const AboutSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="bg-[#F7F7FA] py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-[#7B2FF7] mb-3">About SocialSpark</p>
            <h2
              className="font-display font-bold text-[#15152B] tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
            >
              Good Content Gets Attention. Great Strategy Creates Growth.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#15152B]/75 leading-relaxed">
              SocialSpark is a specialized social media marketing agency based in Dehradun, built to
              turn social media attention into meaningful engagement, customer enquiries, and
              lasting local presence—at a predictable monthly subscription.
            </p>
          </div>
        </div>

        {/* Visual Editorial Spread + Why We Were Created */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-14">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#15152B] relative min-h-[280px]">
            {!imgError ? (
              <img
                src={AGENCY_IMAGES.agencyShoot}
                alt="Creative marketing producer filming a short-form café Reel on a smartphone gimbal rig"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-8 text-white">
                <p className="font-display font-bold text-xl">On-Location Studio Production</p>
                <p className="text-sm text-white/75 mt-2">
                  Agile short-form filming crafted for independent storefronts in Dehradun.
                </p>
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#15152B]/80 via-transparent to-transparent"
            />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs font-mono text-[#FF7A30]">Our Approach</p>
              <p className="text-sm sm:text-base font-medium leading-snug mt-1 max-w-lg">
                Creative storytelling, short-form video production, customized calendars, and
                transparent monthly reporting—without full-agency bloat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-white border border-[#15152B]/10 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-[#7B2FF7] mb-2">Why SocialSpark Exists</p>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#15152B] leading-snug">
                Closing the gap between great local businesses and how they show up online.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#15152B]/75 leading-relaxed">
                Across Dehradun, independent cafés, restaurants, salons, boutiques, fitness studios,
                and emerging brands rely heavily on Instagram to reach nearby customers. Yet
                maintaining a sharp, regular feed while running daily operations is exhausting.
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#15152B]/75 leading-relaxed">
                Instead of generic Canva templates or expensive traditional retainers, SocialSpark
                delivers customized, data-informed content built specifically around your storefront,
                audience, and seasonal calendar.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#15152B]/10 flex items-center justify-between text-xs text-[#15152B]/65">
              <span>Dehradun, Uttarakhand</span>
              <span aria-hidden="true">·</span>
              <span>Monthly Subscription Agency</span>
            </div>
          </div>
        </div>

        {/* Why Businesses Need SocialSpark — 4 Real Challenges */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono text-[#7B2FF7] mb-1.5">Why Businesses Need SocialSpark</p>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#15152B] tracking-tight">
                Four frictions we take off your plate.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUSINESS_CHALLENGES.map((item) => (
              <article
                key={item.index}
                className="rounded-2xl bg-white border border-[#15152B]/10 p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <span className="font-mono text-xs font-medium text-[#7B2FF7] tabular-nums">
                    {item.index}
                  </span>
                  <h4 className="font-display font-semibold text-lg text-[#15152B] mt-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-2.5 text-sm text-[#15152B]/70 leading-relaxed">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Deep Navy Mission & Vision Monolith */}
        <div className="rounded-3xl bg-[#15152B] text-white p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <p className="text-xs font-mono text-[#FF7A30] mb-3">Our Mission</p>
            <p className="font-display font-semibold text-xl sm:text-2xl leading-relaxed text-white">
              &ldquo;To make professional social media marketing accessible to growing businesses
              through affordable, creative and performance-focused solutions.&rdquo;
            </p>
          </div>
          <div className="lg:border-l lg:border-white/12 lg:pl-12 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/12">
            <p className="text-xs font-mono text-[#B794FF] mb-3">Our Vision</p>
            <p className="font-display font-semibold text-xl sm:text-2xl leading-relaxed text-white">
              &ldquo;To become a trusted creative growth partner for local businesses and emerging
              brands.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
