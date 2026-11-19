import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from 'lucide-react';
import { buildWhatsappHref, siteConfig } from '../config/siteConfig';
import { SERVICES } from '../data/socialSparkData';

export interface ContactPrefill {
  category?: string;
  service?: string;
  budget?: string;
  messageNote?: string;
  timestamp: number;
}

interface ContactSectionProps {
  prefill: ContactPrefill | null;
}

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessCategory: string;
  instagramProfile: string;
  servicesRequired: string[];
  monthlyBudget: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const BUSINESS_CATEGORIES = [
  'Café / Restaurant',
  'Salon & Beauty Studio',
  'Fashion Boutique',
  'Fitness Studio',
  'Local Retail Business',
  'Student Entrepreneur',
  'Startup / Emerging Brand',
];

const BUDGET_OPTIONS = [
  '₹12,000 / month — SocialSpark Growth Package',
  'Custom Scope — Let’s Discuss',
  'Exploring Options / Audit First',
];

const INITIAL_FORM: FormState = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  businessCategory: 'Café / Restaurant',
  instagramProfile: '',
  servicesRequired: ['Reels & Short-Form Video Production', 'Social Media Management'],
  monthlyBudget: BUDGET_OPTIONS[0],
  message: '',
};

export const ContactSection: React.FC<ContactSectionProps> = ({ prefill }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<
    'idle' | 'backend-delivered' | 'no-backend-ready' | 'backend-error'
  >('idle');
  const [backendErrorDetail, setBackendErrorDetail] = useState('');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [showBackendGuide, setShowBackendGuide] = useState(false);
  const [channelNotice, setChannelNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setForm((prev) => ({
      ...prev,
      businessCategory: prefill.category ?? prev.businessCategory,
      monthlyBudget: prefill.budget ?? prev.monthlyBudget,
      servicesRequired:
        prefill.service && !prev.servicesRequired.includes(prefill.service)
          ? [...prev.servicesRequired, prefill.service]
          : prev.servicesRequired,
      message: prefill.messageNote
        ? prev.message
          ? prev.message
          : prefill.messageNote
        : prev.message,
    }));
  }, [prefill]);

  const validate = (state: FormState): FormErrors => {
    const next: FormErrors = {};
    if (state.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (state.businessName.trim().length < 2) {
      next.businessName = 'Please enter your business or brand name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      next.email = 'Please provide a valid email address.';
    }
    const digitsOnly = state.phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      next.phone = 'Enter a valid 10-digit phone or WhatsApp number.';
    }
    if (!state.businessCategory) {
      next.businessCategory = 'Select a business category.';
    }
    if (state.instagramProfile.trim()) {
      const val = state.instagramProfile.trim();
      const validUrlOrHandle =
        val.startsWith('@') ||
        /^https?:\/\/(www\.)?instagram\.com\/.+/i.test(val) ||
        /^[a-zA-Z0-9._]{2,30}$/.test(val);
      if (!validUrlOrHandle) {
        next.instagramProfile = 'Enter an Instagram URL (https://instagram.com/...) or @handle.';
      }
    }
    if (state.servicesRequired.length === 0) {
      next.servicesRequired = 'Select at least one service you are interested in.';
    }
    if (!state.monthlyBudget) {
      next.monthlyBudget = 'Please select your budget preference.';
    }
    if (state.message.trim().length < 12) {
      next.message = 'Share a short note about your goals (at least 12 characters).';
    }
    return next;
  };

  const toggleService = (title: string) => {
    setForm((prev) => {
      const exists = prev.servicesRequired.includes(title);
      const updated = exists
        ? prev.servicesRequired.filter((s) => s !== title)
        : [...prev.servicesRequired, title];
      return { ...prev, servicesRequired: updated };
    });
    if (errors.servicesRequired) {
      setErrors((prev) => ({ ...prev, servicesRequired: undefined }));
    }
  };

  const formatStructuredBrief = (state: FormState) => {
    return [
      'SocialSpark New Business Enquiry',
      '--------------------------------',
      `Full Name: ${state.fullName.trim()}`,
      `Business Name: ${state.businessName.trim()}`,
      `Email: ${state.email.trim()}`,
      `Phone: ${state.phone.trim()}`,
      `Category: ${state.businessCategory}`,
      `Instagram: ${state.instagramProfile.trim() || 'Not provided'}`,
      `Budget: ${state.monthlyBudget}`,
      `Services Required: ${state.servicesRequired.join(', ')}`,
      `Message: ${state.message.trim()}`,
    ].join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setBackendErrorDetail('');

    if (!siteConfig.isBackendConfigured) {
      // Honest workflow: never show false success when no backend endpoint exists
      window.setTimeout(() => {
        setSubmitting(false);
        setSubmissionMode('no-backend-ready');
      }, 280);
      return;
    }

    try {
      const response = await fetch(siteConfig.enquiryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          source: 'SocialSpark Web Enquiry',
        }),
      });

      if (!response.ok) {
        throw new Error(`Endpoint returned HTTP ${response.status}`);
      }

      setSubmitting(false);
      setSubmissionMode('backend-delivered');
    } catch (err) {
      setSubmitting(false);
      setSubmissionMode('backend-error');
      setBackendErrorDetail(
        err instanceof Error ? err.message : 'Unable to reach configured enquiry endpoint.'
      );
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formatStructuredBrief(form));
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2200);
    } catch {
      setCopiedBrief(false);
    }
  };

  const whatsappHref = buildWhatsappHref(
    form.businessName.trim()
      ? formatStructuredBrief(form)
      : "Hi SocialSpark! I'd like to discuss social media management for my business in Dehradun."
  );

  const mailtoHref = `mailto:${encodeURIComponent(
    siteConfig.email
  )}?subject=${encodeURIComponent(
    `SocialSpark Enquiry — ${form.businessName.trim() || 'New Business'}`
  )}&body=${encodeURIComponent(formatStructuredBrief(form))}`;

  return (
    <section id="contact" className="bg-white py-20 lg:py-28 border-t border-[#15152B]/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Contact Editorial & Direct Channels */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono text-[#7B2FF7] mb-3">Contact Us</p>
            <h2
              className="font-display font-bold text-[#15152B] tracking-tight leading-[1.08]"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', textWrap: 'balance' }}
            >
              Ready to Make Some Noise on Social Media?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#15152B]/75 leading-relaxed">
              Tell us about your business. Let&apos;s create something worth stopping for.
            </p>

            {/* Direct Contact Channels (Explicitly Configurable Placeholders) */}
            <div className="mt-8 rounded-2xl bg-[#F7F7FA] border border-[#15152B]/10 p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#7B2FF7] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55">
                    Studio Location
                  </p>
                  <p className="text-sm sm:text-base font-medium text-[#15152B] mt-0.5">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#15152B]/8">
                <Mail className="w-5 h-5 text-[#7B2FF7] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55">
                    Email Enquiry
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm sm:text-base font-medium text-[#15152B] hover:text-[#7B2FF7] transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                  {!siteConfig.isEmailConfigured && (
                    <p className="text-xs text-[#15152B]/55 mt-0.5">
                      Configurable placeholder via <code className="font-mono">VITE_CONTACT_EMAIL</code>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#15152B]/8">
                <Instagram className="w-5 h-5 text-[#FF7A30] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#15152B]/55">
                    Instagram
                  </p>
                  {siteConfig.isInstagramConfigured ? (
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-medium text-[#15152B] hover:text-[#7B2FF7] transition-colors"
                    >
                      {siteConfig.instagramHandle}
                    </a>
                  ) : (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setChannelNotice(
                            'Instagram profile link is currently a placeholder. Set VITE_INSTAGRAM_URL in your environment config to link your live Instagram handle.'
                          )
                        }
                        className="text-sm sm:text-base font-medium text-[#15152B] hover:text-[#7B2FF7] text-left cursor-pointer"
                      >
                        {siteConfig.instagramHandle}
                      </button>
                      <p className="text-xs text-[#15152B]/55 mt-0.5">
                        Configurable via <code className="font-mono">VITE_INSTAGRAM_URL</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#15152B]/8">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#15152B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#7B2FF7] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Message on WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setChannelNotice(
                        'WhatsApp number is currently unconfigured. Set VITE_WHATSAPP_NUMBER (with country code, e.g. 91XXXXXXXXXX) to enable direct WhatsApp chat.'
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#15152B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#7B2FF7] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp Enquiry (Configure Number)</span>
                  </button>
                )}

                {channelNotice && (
                  <p className="mt-3 rounded-xl bg-[#F2EEFF] border border-[#7B2FF7]/25 px-3.5 py-2.5 text-xs text-[#15152B]/85 leading-relaxed">
                    {channelNotice}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Validated 9-Field Enquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#F7F7FA] border border-[#15152B]/10 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#15152B] mb-1.5">
                    Full Name <span className="text-[#FF7A30]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, fullName: e.target.value }));
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    placeholder="e.g. Aarav Rawat"
                    className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      errors.fullName ? 'border-red-500' : 'border-[#15152B]/15'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* 2. Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-xs font-semibold text-[#15152B] mb-1.5">
                    Business Name <span className="text-[#FF7A30]">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={form.businessName}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, businessName: e.target.value }));
                      if (errors.businessName) setErrors((p) => ({ ...p, businessName: undefined }));
                    }}
                    placeholder="e.g. Cedar Roast Café"
                    className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      errors.businessName ? 'border-red-500' : 'border-[#15152B]/15'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.businessName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 3. Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#15152B] mb-1.5">
                    Email Address <span className="text-[#FF7A30]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, email: e.target.value }));
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="you@yourbusiness.com"
                    className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      errors.email ? 'border-red-500' : 'border-[#15152B]/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* 4. Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#15152B] mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#FF7A30]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, phone: e.target.value }));
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder="e.g. 9876543210"
                    className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      errors.phone ? 'border-red-500' : 'border-[#15152B]/15'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 5. Business Category */}
                <div>
                  <label
                    htmlFor="businessCategory"
                    className="block text-xs font-semibold text-[#15152B] mb-1.5"
                  >
                    Business Category <span className="text-[#FF7A30]">*</span>
                  </label>
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={form.businessCategory}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, businessCategory: e.target.value }))
                    }
                    className="w-full rounded-xl bg-white border border-[#15152B]/15 px-3.5 py-2.5 text-sm text-[#15152B] focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]"
                  >
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Instagram Profile Link */}
                <div>
                  <label
                    htmlFor="instagramProfile"
                    className="block text-xs font-semibold text-[#15152B] mb-1.5"
                  >
                    Instagram Profile Link
                  </label>
                  <input
                    id="instagramProfile"
                    name="instagramProfile"
                    type="text"
                    value={form.instagramProfile}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, instagramProfile: e.target.value }));
                      if (errors.instagramProfile)
                        setErrors((p) => ({ ...p, instagramProfile: undefined }));
                    }}
                    placeholder="https://instagram.com/yourhandle or @handle"
                    className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      errors.instagramProfile ? 'border-red-500' : 'border-[#15152B]/15'
                    }`}
                  />
                  {errors.instagramProfile && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.instagramProfile}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 7. Services Required */}
              <div>
                <span className="block text-xs font-semibold text-[#15152B] mb-2">
                  Services Required <span className="text-[#FF7A30]">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {SERVICES.map((svc) => {
                    const checked = form.servicesRequired.includes(svc.title);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => toggleService(svc.title)}
                        aria-pressed={checked}
                        className={`text-left px-3 py-2 rounded-xl border text-xs font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          checked
                            ? 'bg-[#15152B] text-white border-[#15152B]'
                            : 'bg-white text-[#15152B]/80 border-[#15152B]/12 hover:border-[#7B2FF7]/40'
                        }`}
                      >
                        <span className="truncate">{svc.title}</span>
                        {checked && <Check className="w-3.5 h-3.5 text-[#FF7A30] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.servicesRequired && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.servicesRequired}</span>
                  </p>
                )}
              </div>

              {/* 8. Monthly Marketing Budget */}
              <div>
                <label
                  htmlFor="monthlyBudget"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Monthly Marketing Budget <span className="text-[#FF7A30]">*</span>
                </label>
                <select
                  id="monthlyBudget"
                  name="monthlyBudget"
                  value={form.monthlyBudget}
                  onChange={(e) => setForm((p) => ({ ...p, monthlyBudget: e.target.value }))}
                  className="w-full rounded-xl bg-white border border-[#15152B]/15 px-3.5 py-2.5 text-sm text-[#15152B] focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 9. Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#15152B] mb-1.5">
                  Message &amp; Goals <span className="text-[#FF7A30]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, message: e.target.value }));
                    if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  placeholder="Tell us about your Dehradun location, current Instagram challenges, and what you'd like to promote first..."
                  className={`w-full rounded-xl bg-white border px-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                    errors.message ? 'border-red-500' : 'border-[#15152B]/15'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{submitting ? 'Validating & Preparing Enquiry...' : 'Submit Enquiry'}</span>
              </button>
            </form>

            {/* Honest Submission Outcome Panels */}
            {submissionMode === 'backend-delivered' && (
              <div
                role="status"
                className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-sm text-emerald-950"
              >
                <p className="font-semibold">Enquiry Delivered to Configured Endpoint</p>
                <p className="mt-1 text-emerald-900/85 leading-relaxed">
                  Your structured enquiry for <span className="font-semibold">{form.businessName}</span>{' '}
                  was sent to the configured SocialSpark backend endpoint.
                </p>
              </div>
            )}

            {submissionMode === 'backend-error' && (
              <div
                role="alert"
                className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-sm text-red-950"
              >
                <p className="font-semibold">Backend Delivery Failed</p>
                <p className="mt-1 text-red-900/85">
                  {backendErrorDetail}. You can copy your validated brief below or open it via email.
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-900 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copiedBrief ? 'Copied Brief' : 'Copy Brief'}</span>
                  </button>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#15152B] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open Email Draft</span>
                  </a>
                </div>
              </div>
            )}

            {submissionMode === 'no-backend-ready' && (
              <div
                role="status"
                className="mt-6 rounded-2xl bg-white border border-[#7B2FF7]/30 p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#7B2FF7] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-display font-bold text-base text-[#15152B]">
                      Enquiry Validated — Form Backend Not Connected Yet
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#15152B]/75 leading-relaxed">
                      All fields passed validation, and no automated backend endpoint (
                      <code className="font-mono text-[#7B2FF7]">VITE_ENQUIRY_ENDPOINT</code>) is
                      configured in this preview. Nothing was transmitted silently—choose a direct
                      handoff option below or connect a backend.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#15152B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7B2FF7] transition-colors cursor-pointer"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Brief Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Structured Brief</span>
                      </>
                    )}
                  </button>

                  {siteConfig.isEmailConfigured && (
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#15152B]/20 bg-[#F7F7FA] px-4 py-2 text-xs font-semibold text-[#15152B] hover:border-[#7B2FF7]"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open Email Client</span>
                    </a>
                  )}

                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#15152B]/20 bg-[#F7F7FA] px-4 py-2 text-xs font-semibold text-[#15152B] hover:border-[#7B2FF7]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                  )}
                </div>

                <div className="pt-3 border-t border-[#15152B]/10">
                  <button
                    type="button"
                    onClick={() => setShowBackendGuide((v) => !v)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B2FF7] cursor-pointer"
                  >
                    <span>How to connect a live form backend</span>
                    {showBackendGuide ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showBackendGuide && (
                    <div className="mt-3 rounded-xl bg-[#F7F7FA] p-4 text-xs text-[#15152B]/80 space-y-2 leading-relaxed">
                      <p>
                        1. Set <code className="font-mono font-semibold">VITE_ENQUIRY_ENDPOINT</code>{' '}
                        in your environment (e.g. a Formspree URL, Make/Zapier webhook, or an Express{' '}
                        <code className="font-mono font-semibold">POST /api/enquiries</code> route).
                      </p>
                      <p>
                        2. Set <code className="font-mono font-semibold">VITE_CONTACT_EMAIL</code>,{' '}
                        <code className="font-mono font-semibold">VITE_WHATSAPP_NUMBER</code>, and{' '}
                        <code className="font-mono font-semibold">VITE_INSTAGRAM_URL</code> to replace
                        contact placeholders.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
