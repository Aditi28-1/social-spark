import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, LogOut } from 'lucide-react';
import { SocialSparkLogo } from './SocialSparkLogo';
import { useAuth } from '../contexts/AuthContext';

interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Industries', href: '#industries', id: 'industries' },
  { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { label: 'Pricing', href: '#pricing', id: 'pricing' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      const scrollPos = window.scrollY + 140;
      for (let i = NAV_LINKS.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(NAV_LINKS[i].id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
      setMobileOpen(false);
    }
  };

  const displayName = profile?.fullName || user?.displayName || user?.email || 'Member';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#15152B]/10'
          : 'bg-white border-b border-[#15152B]/8'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] rounded-lg"
          aria-label="SocialSpark Home"
        >
          <SocialSparkLogo variant="light" size="md" />
        </a>

        {/* Zone 2: Clean single-line typography links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] rounded ${
                  isActive
                    ? 'text-[#15152B] font-semibold'
                    : 'text-[#15152B]/70 hover:text-[#15152B]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full spark-gradient-bg transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Session Logout + Mobile Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg spark-gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7] focus-visible:ring-offset-2"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title={`Signed in as ${displayName}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#15152B]/15 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-[#15152B] hover:border-[#7B2FF7]/40 hover:bg-[#F7F7FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7]"
            >
              <LogOut className="w-3.5 h-3.5 text-[#7B2FF7]" aria-hidden="true" />
              <span>{loggingOut ? 'Signing Out...' : 'Logout'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#15152B]/12 text-[#15152B] hover:bg-[#F7F7FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2FF7]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-[#15152B]/10 bg-white px-4 pb-6 pt-3 shadow-lg"
        >
          {user && (
            <div className="mb-3 px-3 py-2.5 rounded-xl bg-[#F7F7FA] border border-[#15152B]/8 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#15152B] truncate">{displayName}</p>
                {user.email && (
                  <p className="text-[11px] text-[#15152B]/60 truncate">{user.email}</p>
                )}
              </div>
            </div>
          )}

          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between min-h-[44px] px-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F2EEFF] text-[#7B2FF7] font-semibold'
                      : 'text-[#15152B]/80 hover:bg-[#F7F7FA] hover:text-[#15152B]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs font-mono text-[#7B2FF7]">Active</span>}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#15152B]/10 space-y-2">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-center gap-2 min-h-[44px] w-full rounded-lg spark-gradient-bg px-4 py-2.5 text-sm font-semibold text-white"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center justify-center gap-2 min-h-[44px] w-full rounded-lg border border-[#15152B]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#15152B] hover:bg-[#F7F7FA] cursor-pointer disabled:opacity-60"
                >
                  <LogOut className="w-4 h-4 text-[#7B2FF7]" aria-hidden="true" />
                  <span>{loggingOut ? 'Signing Out...' : 'Logout'}</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
