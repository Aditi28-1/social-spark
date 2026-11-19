import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { INTERNAL_VENTURE_MODEL } from '../data/socialSparkData';

interface FounderModelModalProps {
  open: boolean;
  onClose: () => void;
}

export const FounderModelModal: React.FC<FounderModelModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="founder-model-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15152B]/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white border border-[#15152B]/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#15152B] text-white">
          <div>
            <p className="font-mono text-xs text-[#FF7A30]">
              Internal Venture Planning Model · Projections &amp; Assumptions
            </p>
            <h3 id="founder-model-title" className="font-display font-bold text-lg mt-0.5">
              SocialSpark Unit Economics Overview
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close internal venture model"
            className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="rounded-xl bg-[#F2EEFF]/70 border border-[#7B2FF7]/20 px-4 py-3 text-xs sm:text-sm text-[#15152B]/80 leading-relaxed">
            These figures represent internal venture projections and operating assumptions for the
            founders—not historical performance or public pricing disclosures.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Revenue Model</p>
              <p className="font-display font-bold text-lg text-[#15152B] mt-1">
                {INTERNAL_VENTURE_MODEL.revenueModel}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Monthly Subscription</p>
              <p className="font-mono font-bold text-lg text-[#15152B] mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.monthlySubscriptionPrice}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Projected Base Clients</p>
              <p className="font-mono font-bold text-lg text-[#15152B] mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.expectedBaseCustomers} retainers
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Projected Monthly Revenue</p>
              <p className="font-mono font-bold text-lg text-[#7B2FF7] mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.expectedMonthlyRevenue}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Variable Cost / Client</p>
              <p className="font-mono font-bold text-lg text-[#15152B] mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.variableCostPerCustomer}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F7FA] p-4 border border-[#15152B]/10">
              <p className="text-xs text-[#15152B]/60">Monthly Fixed Cost</p>
              <p className="font-mono font-bold text-lg text-[#15152B] mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.monthlyFixedCost}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#15152B] text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-[#FF7A30]">
                Projected Operating Surplus (at 6 customers)
              </p>
              <p className="font-mono font-bold text-2xl mt-1 tabular-nums">
                {INTERNAL_VENTURE_MODEL.expectedMonthlyOperatingSurplus} / month
              </p>
            </div>
            <div className="text-xs text-white/75 sm:text-right">
              <p>Contribution / Sale: {INTERNAL_VENTURE_MODEL.contributionPerCustomer}</p>
              <p className="mt-0.5">
                Break-even assumption: {INTERNAL_VENTURE_MODEL.breakEvenCustomers} recurring clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
