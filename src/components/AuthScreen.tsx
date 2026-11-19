import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
} from 'lucide-react';
import { mapFirebaseAuthError, useAuth } from '../contexts/AuthContext';
import { AGENCY_IMAGES } from '../data/socialSparkData';
import { SocialSparkLogo } from './SocialSparkLogo';

type AuthMode = 'login' | 'signup' | 'forgot';

export const AuthScreen: React.FC = () => {
  const { login, signup, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign-Up state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot password state
  const [resetEmail, setResetEmail] = useState('');

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setErrorMsg(null);
    setSuccessMsg(null);
    setFieldErrors({});
    if (next === 'forgot' && loginEmail.trim() && !resetEmail) {
      setResetEmail(loginEmail.trim());
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const nextErrors: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim())) {
      nextErrors.loginEmail = 'Enter a valid email address.';
    }
    if (loginPassword.length < 6) {
      nextErrors.loginPassword = 'Password must be at least 6 characters.';
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await login(loginEmail, loginPassword, rememberMe);
      setSuccessMsg('Signed in! Opening SocialSpark...');
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const nextErrors: Record<string, string> = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = signupEmail.trim();
    const trimmedPhone = phoneNumber.trim();
    const phoneDigits = trimmedPhone.replace(/[^\d]/g, '');

    if (trimmedName.length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    } else if (trimmedName.length > 100) {
      nextErrors.fullName = 'Full name must be 100 characters or fewer.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.signupEmail = 'Enter a valid email address.';
    }

    if (
      phoneDigits.length < 10 ||
      phoneDigits.length > 13 ||
      !/^[0-9+\-\s()]{7,20}$/.test(trimmedPhone)
    ) {
      nextErrors.phoneNumber = 'Enter a valid 10-digit phone number.';
    }

    if (signupPassword.length < 6) {
      nextErrors.signupPassword = 'Password must be at least 6 characters.';
    }

    if (confirmPassword !== signupPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await signup({
        fullName: trimmedName,
        email: trimmedEmail,
        phoneNumber: trimmedPhone,
        password: signupPassword,
      });
      setSuccessMsg('Account created! Redirecting to SocialSpark...');
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const nextErrors: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail.trim())) {
      nextErrors.resetEmail = 'Enter the email address registered with your account.';
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await resetPassword(resetEmail);
      setSuccessMsg(
        `Password reset instructions sent to ${resetEmail.trim()}. Check your inbox and spam folder, then return to log in.`
      );
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FA] flex flex-col lg:grid lg:grid-cols-12">
      {/* Left Brand Showcase Column (Desktop Split + Mobile Compact Header) */}
      <aside className="lg:col-span-5 bg-[#15152B] text-white px-6 py-8 sm:px-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle ambient gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#7B2FF7]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#FF7A30]/15 blur-3xl"
        />

        <div className="relative z-10">
          <SocialSparkLogo variant="dark" size="lg" />
          <p className="mt-4 text-xs font-mono text-[#FF7A30]">
            Dehradun, Uttarakhand · Creative Studio Portal
          </p>
          <h1
            className="font-display font-bold text-white tracking-tight leading-[1.08] mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', textWrap: 'balance' }}
          >
            Creative Minds. Strategic Content. Real Business Growth.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
            Sign in or create your SocialSpark account to explore our creative portfolio, monthly
            retainer scope, and studio enquiry workspace.
          </p>
        </div>

        {/* Desktop Editorial Preview Card */}
        <div className="relative z-10 hidden lg:block mt-8">
          <div className="rounded-2xl overflow-hidden border border-white/12 bg-[#1D1D3B] shadow-2xl max-w-sm">
            <div className="relative aspect-[16/10] bg-[#15152B] overflow-hidden">
              {!imgError ? (
                <img
                  src={AGENCY_IMAGES.agencyShoot}
                  alt="SocialSpark creative producer filming café short-form video"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full spark-gradient-bg flex items-center justify-center p-6 text-center">
                  <p className="font-display font-bold text-lg text-white">
                    We Create. We Connect. We Grow.
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#15152B]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="font-mono text-[11px] text-[#FF7A30]">We Create. We Connect. We Grow.</p>
                <p className="text-xs text-white/90 mt-0.5">
                  Reels · Strategy · Monthly Social Media Retainers
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-white/50">
            Protected access · Authenticated via Firebase Authentication
          </p>
        </div>
      </aside>

      {/* Right Authentication Card Column */}
      <main className="lg:col-span-7 flex items-center justify-center px-4 py-8 sm:px-8 lg:p-12 flex-1">
        <div className="w-full max-w-md rounded-3xl bg-white border border-[#15152B]/10 shadow-sm p-6 sm:p-9">
          {/* Mode Tabs (Hidden on Forgot Password subview) */}
          {mode !== 'forgot' ? (
            <div
              role="tablist"
              aria-label="Authentication mode"
              className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F7F7FA] border border-[#15152B]/8 mb-7"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => switchMode('login')}
                className={`min-h-[42px] rounded-lg text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${
                  mode === 'login'
                    ? 'bg-[#15152B] text-white shadow-sm'
                    : 'text-[#15152B]/70 hover:text-[#15152B]'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                onClick={() => switchMode('signup')}
                className={`min-h-[42px] rounded-lg text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] ${
                  mode === 'signup'
                    ? 'bg-[#15152B] text-white shadow-sm'
                    : 'text-[#15152B]/70 hover:text-[#15152B]'
                }`}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B2FF7] hover:text-[#15152B] mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Log In</span>
            </button>
          )}

          {/* Heading */}
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#15152B] tracking-tight">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h2>
            <p className="mt-1.5 text-sm text-[#15152B]/65 leading-relaxed">
              {mode === 'login' &&
                'Log in with your email and password to access SocialSpark.'}
              {mode === 'signup' &&
                'Register with your details to explore SocialSpark services and portfolio concepts.'}
              {mode === 'forgot' &&
                'Enter your registered email address and we will send a Firebase password reset link.'}
            </p>
          </div>

          {/* Global Status Feedback Banners */}
          {errorMsg && (
            <div
              role="alert"
              className="mb-5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-xs sm:text-sm text-red-900 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              role="status"
              className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5"
            >
              <CheckCircle2
                className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (fieldErrors.loginEmail)
                        setFieldErrors((p) => ({ ...p, loginEmail: '' }));
                    }}
                    placeholder="you@brand.com"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.loginEmail ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                </div>
                {fieldErrors.loginEmail && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.loginEmail}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (fieldErrors.loginPassword)
                        setFieldErrors((p) => ({ ...p, loginPassword: '' }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-11 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.loginPassword ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((s) => !s)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#15152B]/55 hover:text-[#15152B] cursor-pointer"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.loginPassword && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.loginPassword}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#15152B]/80 cursor-pointer select-none min-h-[36px]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#15152B]/25 text-[#7B2FF7] focus:ring-[#7B2FF7]"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs sm:text-sm font-semibold text-[#7B2FF7] hover:text-[#15152B] transition-colors cursor-pointer min-h-[36px]"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-[#7B2FF7]/20 hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Log In to SocialSpark</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGN-UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="signup-fullname"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="signup-fullname"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fieldErrors.fullName) setFieldErrors((p) => ({ ...p, fullName: '' }));
                    }}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.fullName ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (fieldErrors.signupEmail)
                        setFieldErrors((p) => ({ ...p, signupEmail: '' }));
                    }}
                    placeholder="you@brand.com"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.signupEmail ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                </div>
                {fieldErrors.signupEmail && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.signupEmail}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="signup-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (fieldErrors.phoneNumber)
                        setFieldErrors((p) => ({ ...p, phoneNumber: '' }));
                    }}
                    placeholder="e.g. +91 9876543210"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.phoneNumber ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                </div>
                {fieldErrors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      if (fieldErrors.signupPassword)
                        setFieldErrors((p) => ({ ...p, signupPassword: '' }));
                    }}
                    placeholder="Minimum 6 characters"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-11 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.signupPassword ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((s) => !s)}
                    aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#15152B]/55 hover:text-[#15152B] cursor-pointer"
                  >
                    {showSignupPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.signupPassword && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.signupPassword}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-confirm"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="signup-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword)
                        setFieldErrors((p) => ({ ...p, confirmPassword: '' }));
                    }}
                    placeholder="Re-enter your password"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-11 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.confirmPassword ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#15152B]/55 hover:text-[#15152B] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-[#7B2FF7]/20 hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create SocialSpark Account</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-semibold text-[#15152B] mb-1.5"
                >
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#15152B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      if (fieldErrors.resetEmail)
                        setFieldErrors((p) => ({ ...p, resetEmail: '' }));
                    }}
                    placeholder="you@brand.com"
                    className={`w-full min-h-[44px] rounded-xl bg-[#F7F7FA] border pl-10 pr-3.5 py-2.5 text-sm text-[#15152B] placeholder:text-[#15152B]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2FF7] ${
                      fieldErrors.resetEmail ? 'border-red-500' : 'border-[#15152B]/12'
                    }`}
                  />
                </div>
                {fieldErrors.resetEmail && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.resetEmail}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl spark-gradient-bg px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-[#7B2FF7]/20 hover:opacity-95 disabled:opacity-60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
