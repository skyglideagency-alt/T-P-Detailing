import React, { useState } from 'react';
import { Sparkles, Sliders, Columns, ChevronLeft, ChevronRight, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSFORMATIONS } from '../data/businessData';
import { TransformationItem } from '../types';

// Real detailing image assets from user upload cases
import ramMatDirty from '../assets/images/ram_mat_dirty_1790918764834.jpg';
import ramMatClean from '../assets/images/ram_mat_clean_1790918778703.jpg';
import seatStainDirty from '../assets/images/seat_stain_dirty_1790918793779.jpg';
import seatStainClean from '../assets/images/seat_stain_clean_1790918806515.jpg';
import redHondaHood from '../assets/images/red_honda_hood_1790918817616.jpg';
import foamWash from '../assets/images/foam_cannon_wash_1790916939067.jpg';

interface BeforeAfterShowcaseProps {
  onSelectForBooking: (packageId: string) => void;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onSelectForBooking }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  // Strictly 3 top transformations as requested
  const items = TRANSFORMATIONS.slice(0, 3);
  const featured = items[activeItemIndex % items.length] || items[0];

  const getImageForCase = (id: string, isAfter: boolean) => {
    if (id === 'cloth-seats-stain') {
      return isAfter ? seatStainClean : seatStainDirty;
    }
    if (id === 'ram-rubber-mats') {
      return isAfter ? ramMatClean : ramMatDirty;
    }
    if (id === 'honda-exterior-gloss') {
      return isAfter ? redHondaHood : foamWash;
    }
    return isAfter ? seatStainClean : seatStainDirty;
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offset / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="transformations" className="py-24 bg-[#09060E] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-36 w-96 h-96 bg-purple-900/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-900/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Documented Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Before &amp; After{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              Transformations
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real jobs completed by T &amp; P Detailing in Panama City &amp; Bay County. Slide horizontally to inspect the showroom results.
          </p>

          {/* View Mode Toggle */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 bg-[#120A21] border border-purple-900/40 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 rotate-90" />
                <span>Split Slider</span>
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'side-by-side'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side by Side</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Case Study Visual Frame with Card & Scroll Animation */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#120A21] border border-purple-500/35 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-purple-950/60 mb-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Container (Slider or Side-by-Side) */}
              <div className="lg:col-span-7">
                {viewMode === 'slider' ? (
                  /* SPLIT SLIDER VIEW */
                  <div
                    className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-purple-500/40 shadow-inner group"
                    onMouseMove={handleSliderMove}
                    onTouchMove={handleSliderMove}
                  >
                    {/* AFTER IMAGE (Bottom Layer - Right Side) */}
                    <img
                      src={getImageForCase(featured.id, true)}
                      alt={`${featured.title} After Detailing`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full bg-purple-950/90 backdrop-blur-md border border-purple-400/50 text-xs font-bold text-purple-200 shadow-md">
                      AFTER (SHOWROOM READY)
                    </div>

                    {/* BEFORE IMAGE (Top Layer - Left Side, Clipped by Slider) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={getImageForCase(featured.id, false)}
                        alt={`${featured.title} Before Detailing`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-95"
                        style={{ width: '100%', minWidth: '100%' }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-slate-700 text-xs font-bold text-slate-200 shadow-md">
                        BEFORE (DIRTY / SOILED)
                      </div>
                    </div>

                    {/* SLIDER DIVIDER LINE & HANDLE */}
                    <div
                      className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-purple-400 via-white to-purple-400 cursor-ew-resize"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
                        <Sliders className="w-4 h-4 rotate-90" />
                      </div>
                    </div>

                    {/* Bottom helper cue */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-medium text-slate-200 pointer-events-none border border-white/10 shadow-sm">
                      Drag slider horizontally to compare
                    </div>
                  </div>
                ) : (
                  /* SIDE BY SIDE VIEW */
                  <div className="grid grid-cols-2 gap-3 h-[340px] sm:h-[440px]">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black">
                      <img
                        src={getImageForCase(featured.id, false)}
                        alt="Before condition"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/85 text-[11px] font-bold text-slate-200 border border-slate-700">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 bg-black">
                      <img
                        src={getImageForCase(featured.id, true)}
                        alt="After condition"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-purple-950/90 text-[11px] font-bold text-purple-300 border border-purple-500/50">
                        AFTER
                      </div>
                    </div>
                  </div>
                )}

                {/* Slider Quick Percentage Presets */}
                {viewMode === 'slider' && (
                  <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                    <button
                      onClick={() => setSliderPosition(20)}
                      className="hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      Reveal After (80%)
                    </button>
                    <span className="font-mono-tabular text-purple-300 font-semibold">{Math.round(sliderPosition)}% View Split</span>
                    <button
                      onClick={() => setSliderPosition(80)}
                      className="hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      Reveal Before (80%)
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Case Details & Next/Prev Controls */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-purple-400">
                      {featured.category}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                      {featured.highlightStat}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {featured.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vehicle Model: <span className="text-purple-300 font-semibold">{featured.vehicle}</span>
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="p-4 rounded-2xl bg-[#170E2A] border border-purple-900/40">
                    <p className="text-xs font-bold uppercase text-red-300 mb-1">Before Condition:</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{featured.problem}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#170E2A] border border-purple-900/40">
                    <p className="text-xs font-bold uppercase text-emerald-300 mb-1">T &amp; P Treatment:</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{featured.solution}</p>
                  </div>
                </div>

                {/* Case navigation and booking CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectForBooking('signature-deep-detail')}
                    className="flex-1 min-h-[50px] py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/40 transition-all text-center cursor-pointer"
                  >
                    Book Similar Detailing
                  </motion.button>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveItemIndex(prev => (prev > 0 ? prev - 1 : items.length - 1))}
                      className="p-3 rounded-2xl bg-[#190F2E] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
                      aria-label="Previous transformation"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveItemIndex(prev => (prev < items.length - 1 ? prev + 1 : 0))}
                      className="p-3 rounded-2xl bg-[#190F2E] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
                      aria-label="Next transformation"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* The 3 Cards Grid with Card Animations (Exactly 3 Photos/Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isCurrent = activeItemIndex === idx;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => {
                  setActiveItemIndex(idx);
                  window.scrollTo({
                    top: (document.getElementById('transformations')?.offsetTop || 0) + 80,
                    behavior: 'smooth'
                  });
                }}
                className={`group relative rounded-3xl bg-[#120B20] p-4 transition-all duration-300 cursor-pointer text-left border ${
                  isCurrent
                    ? 'border-purple-500 shadow-xl shadow-purple-950/70'
                    : 'border-purple-900/30 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/50'
                }`}
              >
                {/* Active Selection Badge */}
                {isCurrent && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm z-20">
                    Active in Slider
                  </div>
                )}

                {/* Split Thumbnail Preview */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-3.5 bg-black flex">
                  <div className="w-1/2 h-full relative overflow-hidden border-r border-white/20">
                    <img
                      src={getImageForCase(item.id, false)}
                      alt={`${item.title} Before`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-xs text-[10px] font-bold text-slate-300">
                      BEFORE
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative overflow-hidden">
                    <img
                      src={getImageForCase(item.id, true)}
                      alt={`${item.title} After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-purple-950/90 backdrop-blur-xs text-[10px] font-bold text-purple-300 border border-purple-500/30">
                      AFTER
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-emerald-950/90 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                    {item.highlightStat}
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.problem}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs text-purple-400 font-semibold px-1">
                  <span>Open in Slider</span>
                  <Eye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
