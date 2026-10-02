import React from 'react';
import { Calendar, Phone, ArrowRight, Star, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import heroImg from '../assets/images/hero_car_detailing_1790916903452.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden text-center px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroImg}
          alt="T & P Premium Detailing Showroom Finish"
          className="w-full h-full object-cover object-center animate-hero-bg brightness-[0.42] contrast-[1.12]"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered Scrims & Deep Obsidian Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09060E]/80 via-[#09060E]/60 to-[#09060E]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-[#09060E]/90" />
      </div>

      {/* Floating ambient glowing light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-purple-600/25 blur-[140px] rounded-full pointer-events-none animate-pulse-glow z-0" />

      {/* 2. Floating Badges (Subtle, non-intrusive floating elements) */}
      <div className="hidden lg:block absolute top-32 left-10 z-10 animate-float-slow">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#140C24]/85 backdrop-blur-md border border-purple-500/30 text-white shadow-xl shadow-black/50 text-xs">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-bold">100% Recommended</span>
          <span className="text-purple-400">·</span>
          <span className="text-slate-300">Panama City, FL</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-28 right-10 z-10 animate-float-delayed">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#140C24]/85 backdrop-blur-md border border-purple-500/30 text-white shadow-xl shadow-black/50 text-xs">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-emerald-300">Mobile Service Unit</span>
          <span className="text-purple-400">·</span>
          <span className="text-slate-300">We Come to You</span>
        </div>
      </div>

      {/* 3. Clean, Animated Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-16 pb-12">
        
        {/* Animated Intro Kicker */}
        <div className="animate-hero-intro-1 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold shadow-lg shadow-purple-950/60 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="tracking-wide uppercase text-[11px] sm:text-xs">T &amp; P Premium Detailing</span>
            <span className="text-purple-400">·</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              Panama City, FL
            </span>
          </div>
        </div>

        {/* The Main Quote - Bold, Clean & Central */}
        <div className="animate-hero-intro-2 mb-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display text-balance">
            "We are committed to making your vehicle look as close to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 drop-shadow-sm">
              showroom ready
            </span>{' '}
            as possible."
          </h1>
        </div>

        {/* 4. Big, Finger-Friendly Touch Buttons */}
        <div className="animate-hero-intro-3 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
          
          {/* Primary Big Booking Button */}
          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center justify-center gap-3.5 min-h-[60px] sm:min-h-[66px] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-2xl shadow-xl shadow-purple-900/60 hover:shadow-purple-600/70 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer text-center"
          >
            <Calendar className="w-6 h-6 text-purple-200 shrink-0" />
            <span className="tracking-wide">Book Online Now</span>
            <ArrowRight className="w-5 h-5 text-purple-200 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

          {/* Secondary Big Direct Dial Button */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="inline-flex items-center justify-center gap-3 min-h-[60px] sm:min-h-[66px] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-purple-200 bg-[#140C24]/85 hover:bg-purple-950/90 border-2 border-purple-500/50 hover:border-purple-400 rounded-2xl backdrop-blur-md shadow-lg shadow-black/50 hover:text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer text-center"
          >
            <Phone className="w-5 h-5 text-purple-400 shrink-0" />
            <span>Call {BUSINESS_INFO.phoneDisplay}</span>
          </a>

        </div>

        {/* Small subtle scroll invitation */}
        <div className="animate-hero-intro-3 pt-12 text-slate-400 text-xs flex items-center gap-2">
          <span className="w-8 h-px bg-purple-500/30" />
          <span>Scroll to explore packages &amp; transformations</span>
          <span className="w-8 h-px bg-purple-500/30" />
        </div>

      </div>

    </section>
  );
};
