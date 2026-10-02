import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MessageSquare, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09060E]/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand element wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg group"
            aria-label="T & P Detailing Home"
          >
            <BrandLogo size="md" />
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#transformations"
              className="hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Before &amp; After
            </a>
            <a
              href="#packages"
              className="hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Packages &amp; Pricing
            </a>
            <a
              href="#calculator"
              className="hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Quote Calculator
            </a>
            <a
              href="#reviews"
              className="hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Reviews
            </a>
            <a
              href="#areas"
              className="hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              Service Areas
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-purple-200 bg-purple-950/60 border border-purple-800/40 rounded-lg hover:bg-purple-900/60 hover:text-white transition-colors whitespace-nowrap shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-lg shadow-md shadow-purple-900/40 hover:shadow-purple-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Book Online</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-purple-950/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0A1A]/95 border-b border-purple-900/50 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-purple-900/30 text-xs text-purple-300">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              100% Recommended in Panama City, FL
            </span>
          </div>

          <div className="flex flex-col space-y-2 pt-1 text-sm font-medium text-slate-200">
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-purple-950/60 hover:text-purple-300"
            >
              Before &amp; After Showcase
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-purple-950/60 hover:text-purple-300"
            >
              Detailing Packages &amp; Pricing
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-purple-950/60 hover:text-purple-300"
            >
              Estimate Price Calculator
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-purple-950/60 hover:text-purple-300"
            >
              Customer Reviews
            </a>
            <a
              href="#areas"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-purple-950/60 hover:text-purple-300"
            >
              Service Areas
            </a>
          </div>

          <div className="pt-3 border-t border-purple-900/30 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-purple-950/80 border border-purple-800 text-sm font-semibold text-purple-200"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              Call {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/18507409769?text=Hi%20T%26P%20Detailing!%20I'm%20interested%20in%20booking%20a%20detail.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-sm font-semibold text-emerald-300"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
