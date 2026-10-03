import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Star, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
    <>
      {/* FLOATING MENU BAR (Island design, centered, floating above content) */}
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-5xl pointer-events-auto"
      >
        <div
          className={`flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 border ${
            scrolled
              ? 'bg-[#0A0515]/92 backdrop-blur-xl border-purple-500/40 shadow-2xl shadow-purple-950/70 py-2 sm:py-2.5'
              : 'bg-[#0D071C]/80 backdrop-blur-lg border-purple-500/25 shadow-xl shadow-black/50'
          }`}
        >
          {/* Zone 1: Brand Wordmark & Logo */}
          <a
            href="#"
            className="flex items-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full group"
            aria-label="T & P Detailing Home"
          >
            <BrandLogo size="sm" showText={true} />
          </a>

          {/* Zone 2: Navigation Links (Clean text with hover pill highlight) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            {[
              { href: '#transformations', label: 'Before & After' },
              { href: '#packages', label: 'Packages & Rates' },
              { href: '#booking', label: 'Schedule Appointment' },
              { href: '#reviews', label: 'Reviews' },
              { href: '#areas', label: 'Areas' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-950/70 hover:border hover:border-purple-800/40 transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Phone + Book Online) */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-200 bg-purple-950/70 border border-purple-800/40 rounded-full hover:bg-purple-900/60 hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-full shadow-md shadow-purple-900/50 hover:shadow-purple-700/70 cursor-pointer whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-200" />
                <span>Book Online</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
            </motion.button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-purple-950/60 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE FLOATING MENU MODAL (Smooth Intro & Outro) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden bg-[#0F081D]/95 border border-purple-500/40 rounded-3xl p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 text-xs text-purple-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                100% Recommended in Panama City, FL
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-200">
              {[
                { href: '#transformations', label: 'Before & After Gallery' },
                { href: '#packages', label: 'Detailing Packages & Rates' },
                { href: '#booking', label: 'Book Appointment' },
                { href: '#reviews', label: 'Customer Reviews' },
                { href: '#areas', label: 'Service Areas' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-purple-950/60 hover:text-purple-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-purple-900/40 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-950/80 border border-purple-800 text-xs font-semibold text-purple-200"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href="https://wa.me/18507409769?text=Hi%20T%26P%20Detailing!%20I'm%20interested%20in%20booking%20a%20detail."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium text-emerald-300 hover:text-emerald-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
