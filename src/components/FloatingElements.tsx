import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, Sparkles, X, ChevronUp, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FloatingElementsProps {
  onOpenBooking: () => void;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ onOpenBooking }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Subtle Floating Background Particles (Compositor-only CSS Animations) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[18%] left-[8%] w-3 h-3 rounded-full bg-purple-500/30 blur-xs animate-float-slow" />
        <div className="absolute top-[42%] right-[10%] w-4 h-4 rounded-full bg-violet-400/25 blur-xs animate-float-delayed" />
        <div className="absolute top-[68%] left-[12%] w-2.5 h-2.5 rounded-full bg-fuchsia-400/20 blur-xs animate-float-reverse" />
        <div className="absolute top-[85%] right-[15%] w-3 h-3 rounded-full bg-purple-400/25 blur-xs animate-float-slow" />
      </div>

      {/* 2. Floating Live Activity Badge (Bottom Left, Desktop) */}
      {showNotificationBadge && (
        <div className="fixed bottom-24 sm:bottom-28 left-6 z-30 hidden md:flex items-center gap-3 p-3 rounded-2xl bg-[#140C24]/90 backdrop-blur-md border border-purple-500/40 shadow-xl shadow-purple-950/70 animate-float-slow">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

          <div className="text-left pr-2">
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              Mobile Detailing Unit
              <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-purple-950 text-purple-300 border border-purple-800">Active</span>
            </p>
            <p className="text-[11px] text-slate-300">
              Servicing Panama City &amp; PCB
            </p>
          </div>

          <button
            onClick={() => setShowNotificationBadge(false)}
            className="p-1 text-slate-400 hover:text-white rounded-md cursor-pointer transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Floating Quick Booking / WhatsApp Action Bar (Bottom Right - Moved higher to avoid covering AI chat) */}
      <div className="fixed bottom-24 sm:bottom-28 right-6 z-30 flex flex-col items-end gap-2.5">
        
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#180E2B]/90 backdrop-blur-md border border-purple-700/50 text-purple-300 hover:text-white hover:bg-purple-900/60 shadow-lg shadow-purple-950/50 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* WhatsApp Direct Chat Trigger */}
        <a
          href="https://wa.me/18507409769?text=Hi%20T%26P%20Detailing!%20I'm%20looking%20to%20get%20a%20quote%20or%20book%20a%20detail."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#140C24]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 text-white shadow-xl shadow-black/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 group-hover:text-white">
            WhatsApp Us
          </span>
        </a>
      </div>

      {/* 4. Mobile Bottom Sticky Bar (Under 15% Viewport height constraint from design constitution) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E081A]/95 backdrop-blur-lg border-t border-purple-900/50 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 py-2 rounded-xl bg-[#190F2E] border border-purple-800/50 text-xs font-bold text-purple-200 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-purple-400" />
          <span>Call Now</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/40"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Detail</span>
        </button>
      </div>
    </>
  );
};
