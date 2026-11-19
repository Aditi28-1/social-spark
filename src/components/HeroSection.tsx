import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Pause,
  Play,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AGENCY_IMAGES } from '../data/socialSparkData';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

const REEL_BEATS = [
  { label: '01 · Hook', text: 'Morning light hits Rajpur Road' },
  { label: '02 · Craft', text: 'Single-origin espresso pour' },
  { label: '03 · Action', text: 'Save spot for weekend coffee' },
];

const CAROUSEL_SLIDES = [
  {
    title: 'Weekend Brunch Table',
    caption: 'Artisan sourdough & iced matcha edit',
    tone: 'photo' as const,
  },
  {
    title: 'Storytelling Hook',
    caption: 'Menu pairing engineered for saves & shares',
    tone: 'purple' as const,
  },
  {
    title: 'Local Discovery CTA',
    caption: 'Geo-tagged weekend visit prompt',
    tone: 'orange' as const,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onStartProject,
}) => {
  const [reelPlaying, setReelPlaying] = useState(true);
  const [reelBeatIndex, setReelBeatIndex] = useState(0);
  const [reelLiked, setReelLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [imgErrorReel, setImgErrorReel] = useState(false);
  const [imgErrorPost, setImgErrorPost] = useState(false);

  useEffect(() => {
    if (!reelPlaying) return;
    const timer = window.setInterval(() => {
      setReelBeatIndex((prev) => (prev + 1) % REEL_BEATS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reelPlaying]);

  const currentSlide = CAROUSEL_SLIDES[slideIndex];

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-10 pb-14 lg:pt-16 lg:pb-20">
      {/* Subtle geometric studio accent backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[460px] w-[460px] rounded-full bg-[#F2EEFF] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 h-[320px] w-[320px] rounded-full bg-[#FF7A30]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-2"
          >
            <p className="text-xs sm:text-sm font-medium text-[#15152B]/65 tracking-normal mb-4">
              Dehradun, Uttarakhand <span aria-hidden="true">·</span> Subscription Social Media Studio
            </p>

            <h1
              className="font-display font-bold tracking-tight text-[#15152B] leading-[1.06] mb-6"
              style={{ fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)', textWrap: 'balance' }}
            >
              Make Your Brand{' '}
              <span className="spark-gradient-text">Impossible</span> to Scroll Past.
            </h1>

            <p className="text-base sm:text-lg text-[#15152B]/75 leading-relaxed max-w-xl mb-8">
              We create scroll-stopping content and smart social media strategies that help growing
              businesses connect with their audience and turn attention into action.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-[#7B2FF7]/20 hover:opacity-95 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                <span>Let&apos;s Grow Your Brand</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#15152B]/15 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-[#15152B] hover:border-[#7B2FF7]/40 hover:bg-[#F2EEFF]/50 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            <div className="mt-10 pt-6 border-t border-[#15152B]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#15152B]/70">
              <div>
                <p className="font-semibold text-[#15152B]">Built for Local Storytellers</p>
                <p className="mt-0.5 text-xs sm:text-sm leading-relaxed">
                  Focused initially on independent cafés, restaurants, salons, and boutiques across Dehradun.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#15152B]">Creative Minds. Strategic Content.</p>
                <p className="mt-0.5 text-xs sm:text-sm leading-relaxed">
                  Short-form Reels, cohesive grid curation, and monthly analytics under one predictable retainer.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Creative Studio Composition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[540px] rounded-3xl bg-[#F7F7FA] border border-[#15152B]/10 p-5 sm:p-7">
              {/* Subtle Geometric Spark Backdrop Accent */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="pointer-events-none absolute -top-5 -right-5 w-24 h-24 text-[#7B2FF7]/15"
              >
                <path
                  d="M60 8C62.5 38 82 57.5 112 60C82 62.5 62.5 82 60 112C57.5 82 38 62.5 8 60C38 57.5 57.5 38 60 8Z"
                  fill="currentColor"
                />
              </svg>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                {/* Interactive Instagram Reel Preview Frame */}
                <div className="sm:col-span-7 relative rounded-2xl overflow-hidden bg-[#15152B] aspect-[9/14] sm:aspect-[9/15] shadow-xl">
                  {!imgErrorReel ? (
                    <img
                      src={AGENCY_IMAGES.reelCafePour}
                      alt="Sample café Instagram Reel preview showing barista latte pour"
                      referrerPolicy="no-referrer"
                      onError={() => setImgErrorReel(true)}
                      className="h-full w-full object-cover transition-transform duration-700"
                      style={{
                        transform: reelPlaying ? 'scale(1.03)' : 'scale(1)',
                      }}
                    />
                  ) : (
                    <div className="h-full w-full spark-gradient-bg flex flex-col items-center justify-center p-6 text-center text-white">
                      <p className="font-display font-bold text-lg">Sample Café Reel</p>
                      <p className="text-xs text-white/80 mt-1">9:16 Vertical Production Concept</p>
                    </div>
                  )}

                  {/* Measured Contrast Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#15152B]/90 via-[#15152B]/20 to-[#15152B]/40"
                  />

                  {/* Top Reel Storyboard Progress & Control */}
                  <div className="absolute top-3 inset-x-3 flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {REEL_BEATS.map((beat, idx) => (
                        <button
                          key={beat.label}
                          type="button"
                          onClick={() => setReelBeatIndex(idx)}
                          aria-label={`Jump to storyboard beat ${beat.label}`}
                          className="h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                        >
                          <span
                            className={`block h-full rounded-full transition-all duration-300 ${
                              idx <= reelBeatIndex ? 'w-full bg-white' : 'w-0 bg-transparent'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/90">
                      <span className="font-medium tracking-tight">Reels · Concept Preview</span>
                      <button
                        type="button"
                        onClick={() => setReelPlaying((p) => !p)}
                        aria-label={reelPlaying ? 'Pause Reel storyboard preview' : 'Play Reel storyboard preview'}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm text-white hover:bg-black/55 transition-colors cursor-pointer"
                      >
                        {reelPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Reel Overlay Content */}
                  <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2 text-white">
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-[#FF7A30]">
                        {REEL_BEATS[reelBeatIndex].label}
                      </p>
                      <p className="text-sm font-semibold leading-snug mt-0.5">
                        {REEL_BEATS[reelBeatIndex].text}
                      </p>
                      <p className="text-[11px] text-white/75 mt-1 truncate">
                        @cedarroast.demo · Rajpur Road Concept
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setReelLiked((v) => !v)}
                        aria-label={reelLiked ? 'Remove heart reaction' : 'Heart sample Reel'}
                        className="inline-flex flex-col items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            reelLiked ? 'fill-[#FF7A30] text-[#FF7A30]' : 'text-white'
                          }`}
                        />
                      </button>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm">
                        <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Stacked Carousel Post + Campaign Note */}
                <div className="sm:col-span-5 flex flex-col justify-between gap-4">
                  {/* Interactive Instagram Carousel Post Card */}
                  <div className="rounded-2xl bg-white border border-[#15152B]/10 p-3 shadow-sm flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] text-[#15152B]/65 mb-2">
                      <span className="font-semibold text-[#15152B]">@courtyardtable.demo</span>
                      <span className="font-mono tabular-nums">
                        {slideIndex + 1}/{CAROUSEL_SLIDES.length}
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-[4/4] bg-[#F2EEFF]">
                      {currentSlide.tone === 'photo' && !imgErrorPost ? (
                        <img
                          src={AGENCY_IMAGES.reelBrunchTable}
                          alt="Sample Instagram carousel post featuring cafe brunch spread"
                          referrerPolicy="no-referrer"
                          onError={() => setImgErrorPost(true)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className={`h-full w-full p-4 flex flex-col justify-end ${
                            currentSlide.tone === 'orange'
                              ? 'bg-[#FF7A30] text-white'
                              : 'bg-[#7B2FF7] text-white'
                          }`}
                        >
                          <p className="text-[11px] uppercase tracking-wider text-white/80">
                            Carousel Slide
                          </p>
                          <p className="font-display font-bold text-base leading-tight mt-1">
                            {currentSlide.title}
                          </p>
                          <p className="text-xs text-white/90 mt-1">{currentSlide.caption}</p>
                        </div>
                      )}

                      {/* Slide Controls */}
                      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIndex(
                              (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
                            )
                          }
                          aria-label="Previous carousel slide"
                          className="w-7 h-7 rounded-full bg-white/90 text-[#15152B] flex items-center justify-center shadow hover:bg-white cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
                          aria-label="Next carousel slide"
                          className="w-7 h-7 rounded-full bg-white/90 text-[#15152B] flex items-center justify-center shadow hover:bg-white cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#15152B]/70">
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="text-xs font-medium truncate">{currentSlide.title}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPostSaved((s) => !s)}
                        aria-label={postSaved ? 'Unsave sample carousel post' : 'Save sample carousel post'}
                        className="p-1 text-[#15152B] hover:text-[#7B2FF7] transition-colors cursor-pointer"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${postSaved ? 'fill-[#7B2FF7] text-[#7B2FF7]' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Campaign Strategy Snippet */}
                  <div className="rounded-2xl bg-[#15152B] p-4 text-white">
                    <p className="text-[11px] font-mono text-[#FF7A30]">Monthly Production Slate</p>
                    <p className="font-display font-semibold text-sm leading-snug mt-1">
                      8–10 Custom Reels + Grid Curation + Local Campaigns
                    </p>
                    <p className="text-xs text-white/70 mt-1.5">
                      Demonstration mockups · Crafted for Dehradun cafés &amp; growing brands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Brand Promise & Studio Pillars Bar Below Hero Split */}
        <div className="mt-12 rounded-2xl bg-[#F7F7FA] border border-[#15152B]/10 px-6 py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <p className="font-display font-bold text-lg sm:text-xl text-[#15152B] tracking-tight">
              We Create. We Connect. We Grow.
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t md:border-t-0 md:border-l border-[#15152B]/10 pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="font-mono text-xs text-[#7B2FF7] tabular-nums">01 · Video First</p>
              <p className="text-sm font-semibold text-[#15152B] mt-0.5">8–10 Reels / Mo</p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#7B2FF7] tabular-nums">02 · Strategy</p>
              <p className="text-sm font-semibold text-[#15152B] mt-0.5">30-Day Calendars</p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#7B2FF7] tabular-nums">03 · Local Focus</p>
              <p className="text-sm font-semibold text-[#15152B] mt-0.5">Dehradun Clusters</p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#7B2FF7] tabular-nums">04 · Reporting</p>
              <p className="text-sm font-semibold text-[#15152B] mt-0.5">Monthly Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
