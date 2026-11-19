import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PROCESS_STAGES } from '../data/socialSparkData';

export const ProcessSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStage = PROCESS_STAGES[activeIndex];

  return (
    <section id="process" className="bg-[#15152B] text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-[#FF7A30] mb-3">Our Process</p>
            <h2
              className="font-display font-bold text-white tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.85rem)', textWrap: 'balance' }}
            >
              Five deliberate stages from initial audit to measurable monthly clarity.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-white/75 leading-relaxed">
              No chaotic last-minute shoots or guesswork. Our monthly workflow keeps creative
              approval light on your calendar while keeping output sharp and on schedule.
            </p>
          </div>
        </div>

        {/* Interactive 5-Stage Timeline Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-3">
            {PROCESS_STAGES.map((stage, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={isSelected}
                  className={`text-left rounded-2xl p-5 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30] ${
                    isSelected
                      ? 'bg-white text-[#15152B] border-white shadow-lg'
                      : 'bg-white/[0.04] text-white border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-sm font-semibold tabular-nums pt-0.5 ${
                        isSelected ? 'text-[#7B2FF7]' : 'text-[#FF7A30]'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-lg sm:text-xl leading-snug">
                        {stage.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          isSelected ? 'text-[#15152B]/75' : 'text-white/70'
                        }`}
                      >
                        {stage.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Stage Breakdown Panel */}
          <div className="lg:col-span-5 rounded-3xl bg-[#1E1E3A] border border-white/12 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <span className="font-mono text-xs text-[#FF7A30] tabular-nums">
                  Stage {currentStage.step} of 05
                </span>
                <div className="flex items-center gap-1.5">
                  {PROCESS_STAGES.map((st, idx) => (
                    <span
                      key={st.step}
                      aria-hidden="true"
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === activeIndex
                          ? 'w-6 spark-gradient-bg'
                          : idx < activeIndex
                          ? 'w-2 bg-white/50'
                          : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-6">
                {currentStage.step} — {currentStage.title}
              </h3>

              <p className="mt-3 text-base text-white/80 leading-relaxed">
                {currentStage.focusDetail}
              </p>

              <div className="mt-7 pt-6 border-t border-white/12">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-3">
                  Key Outputs
                </p>
                <ul className="space-y-2.5">
                  {currentStage.outputs.map((output) => (
                    <li key={output} className="flex items-center gap-2.5 text-sm text-white/90">
                      <CheckCircle2
                        className="w-4 h-4 text-[#FF7A30] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/12 flex items-center justify-between text-xs text-white/60">
              <span>Monthly Repeating Cycle</span>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % PROCESS_STAGES.length)}
                className="font-semibold text-[#FF7A30] hover:text-white transition-colors cursor-pointer"
              >
                Next Stage &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
