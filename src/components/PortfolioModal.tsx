import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { PortfolioConcept } from '../data/socialSparkData';

interface PortfolioModalProps {
  concept: PortfolioConcept | null;
  onClose: () => void;
  onRequestSimilar: (conceptTitle: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  concept,
  onClose,
  onRequestSimilar,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [beatIdx, setBeatIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSlideIdx(0);
    setBeatIdx(0);
    setPlaying(true);
    setCopiedCaption(false);
    setImgError(false);
  }, [concept]);

  useEffect(() => {
    if (!concept) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [concept, onClose]);

  useEffect(() => {
    if (!concept?.reelBeats || !playing) return;
    const timer = window.setInterval(() => {
      setBeatIdx((prev) => (prev + 1) % concept.reelBeats!.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [concept, playing]);

  if (!concept) return null;

  const hasSlides = Boolean(concept.slides && concept.slides.length > 0);
  const hasReelBeats = Boolean(concept.reelBeats && concept.reelBeats.length > 0);
  const activeSlide = hasSlides ? concept.slides![slideIdx] : null;
  const activeBeat = hasReelBeats ? concept.reelBeats![beatIdx] : null;

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(concept.sampleCaption);
      setCopiedCaption(true);
      window.setTimeout(() => setCopiedCaption(false), 2000);
    } catch {
      setCopiedCaption(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15152B]/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#15152B]/10 bg-[#F7F7FA]">
          <div className="min-w-0">
            <p className="text-xs font-mono text-[#7B2FF7] truncate">
              Sample Concept · {concept.category} · {concept.sector}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close concept preview"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#15152B]/15 text-[#15152B] hover:bg-[#15152B] hover:text-white transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Interactive Mockup Stage */}
          <div className="lg:col-span-6 bg-[#15152B] p-6 sm:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-[360px] rounded-2xl overflow-hidden bg-[#1D1D3B] border border-white/10 shadow-xl">
              {/* Instagram Mockup Header */}
              <div className="flex items-center justify-between px-4 py-3 text-white text-xs border-b border-white/10">
                <span className="font-semibold">{concept.conceptHandle}</span>
                <span className="text-white/60">{concept.formatLabel}</span>
              </div>

              {/* Media Frame */}
              <div className="relative aspect-[4/5] bg-[#15152B] overflow-hidden">
                {activeSlide && !activeSlide.image ? (
                  <div
                    className={`h-full w-full p-7 flex flex-col justify-between ${
                      activeSlide.accentTone === 'orange'
                        ? 'bg-[#FF7A30] text-white'
                        : activeSlide.accentTone === 'purple'
                        ? 'bg-[#7B2FF7] text-white'
                        : 'bg-[#15152B] text-white'
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-wider opacity-80">
                      {activeSlide.label}
                    </p>
                    <div>
                      <h4 className="font-display font-bold text-3xl leading-tight">
                        {activeSlide.headline}
                      </h4>
                      <p className="mt-3 text-sm opacity-90 leading-relaxed">
                        {activeSlide.subline}
                      </p>
                    </div>
                    <p className="text-xs opacity-75">
                      {concept.conceptHandle} · Demonstration Concept
                    </p>
                  </div>
                ) : !imgError ? (
                  <img
                    src={activeSlide?.image || concept.image}
                    alt={concept.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full spark-gradient-bg flex items-center justify-center p-6 text-center text-white">
                    <div>
                      <p className="font-display font-bold text-xl">{concept.title}</p>
                      <p className="text-xs text-white/80 mt-1">{concept.formatLabel}</p>
                    </div>
                  </div>
                )}

                {/* Reel Storyboard Overlay */}
                {hasReelBeats && activeBeat && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#15152B]/90 via-transparent to-[#15152B]/40"
                    />
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                      <div className="flex-1 grid grid-cols-3 gap-1.5">
                        {concept.reelBeats!.map((b, i) => (
                          <button
                            key={b.time}
                            type="button"
                            onClick={() => setBeatIdx(i)}
                            aria-label={`Select Reel beat ${b.time}`}
                            className="h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                          >
                            <span
                              className={`block h-full bg-white transition-all ${
                                i <= beatIdx ? 'w-full' : 'w-0'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? 'Pause Reel preview' : 'Play Reel preview'}
                        className="w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                      >
                        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="absolute bottom-4 inset-x-4 text-white">
                      <p className="font-mono text-[11px] text-[#FF7A30]">
                        {activeBeat.time} · {activeBeat.audioNote}
                      </p>
                      <p className="text-sm font-semibold mt-1 leading-snug">{activeBeat.scene}</p>
                    </div>
                  </>
                )}

                {/* Carousel Controls */}
                {hasSlides && (
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setSlideIdx(
                          (p) => (p - 1 + concept.slides!.length) % concept.slides!.length
                        )
                      }
                      aria-label="Previous slide"
                      className="w-9 h-9 rounded-full bg-white/90 text-[#15152B] flex items-center justify-center shadow hover:bg-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 py-1 rounded-md bg-[#15152B]/80 text-white font-mono text-xs tabular-nums">
                      {slideIdx + 1} / {concept.slides!.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSlideIdx((p) => (p + 1) % concept.slides!.length)
                      }
                      aria-label="Next slide"
                      className="w-9 h-9 rounded-full bg-white/90 text-[#15152B] flex items-center justify-center shadow hover:bg-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Creative Direction Breakdown */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[82vh] overflow-y-auto">
            <div>
              <h3
                id="portfolio-modal-title"
                className="font-display font-bold text-2xl sm:text-3xl text-[#15152B] leading-tight"
              >
                {concept.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#7B2FF7]">
                Opening Hook: &ldquo;{concept.hookLine}&rdquo;
              </p>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55 mb-1">
                    Strategic Objective
                  </h4>
                  <p className="text-[#15152B]/80 leading-relaxed">{concept.objective}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55 mb-1">
                    Creative Direction
                  </h4>
                  <p className="text-[#15152B]/80 leading-relaxed">{concept.creativeDirection}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55">
                      Sample Caption Copy
                    </h4>
                    <button
                      type="button"
                      onClick={handleCopyCaption}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7B2FF7] hover:text-[#15152B] cursor-pointer"
                    >
                      {copiedCaption ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy caption</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="rounded-xl bg-[#F7F7FA] border border-[#15152B]/10 p-3.5 text-[#15152B]/85 leading-relaxed">
                    {concept.sampleCaption}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55 mb-2">
                    Included Deliverables in Concept
                  </h4>
                  <ul className="space-y-1.5">
                    {concept.deliverableBreakdown.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#15152B]/80">
                        <Check className="w-4 h-4 text-[#FF7A30] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#15152B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#15152B]/55">
                Note: Demonstration concept illustrating agency style—not a verified client case study.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestSimilar(concept.title);
                }}
                className="inline-flex items-center justify-center rounded-xl spark-gradient-bg px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer hover:opacity-95"
              >
                Request Similar Concept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
