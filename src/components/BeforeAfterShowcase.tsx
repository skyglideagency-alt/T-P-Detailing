import React, { useState } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight, Eye, Shield, Sliders, SplitSquareVertical, Columns, X } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/businessData';
import { TransformationItem } from '../types';

// High-fidelity image assets generated directly from user uploads
import ramMatDirty from '../assets/images/ram_mat_dirty_1790918764834.jpg';
import ramMatClean from '../assets/images/ram_mat_clean_1790918778703.jpg';
import seatStainDirty from '../assets/images/seat_stain_dirty_1790918793779.jpg';
import seatStainClean from '../assets/images/seat_stain_clean_1790918806515.jpg';
import redHondaHood from '../assets/images/red_honda_hood_1790918817616.jpg';
import interiorCockpit from '../assets/images/interior_luxury_cockpit_1790916926060.jpg';
import ceramicGleam from '../assets/images/ceramic_coating_gleam_1790916914392.jpg';
import foamWash from '../assets/images/foam_cannon_wash_1790916939067.jpg';

interface BeforeAfterShowcaseProps {
  onSelectForBooking: (packageId: string) => void;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onSelectForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [lightboxItem, setLightboxItem] = useState<TransformationItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Real Work' },
    { id: 'interior', label: 'Fabric & Interior Extraction' },
    { id: 'mats-pethair', label: 'Rubber Mats & Footwells' },
    { id: 'exterior', label: 'Paint Gloss & Exterior' },
  ];

  const filteredItems = TRANSFORMATIONS.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'interior') return item.category.includes('Interior') || item.category.includes('Extraction');
    if (activeCategory === 'mats-pethair') return item.category.includes('Pet') || item.category.includes('Floor') || item.category.includes('Renovation');
    if (activeCategory === 'exterior') return item.category.includes('Exterior') || item.category.includes('Gloss');
    return true;
  });

  const featured = filteredItems[activeItemIndex % (filteredItems.length || 1)] || TRANSFORMATIONS[0];

  // Map case studies to authentic detailing image assets
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
    if (id === 'titan-footwell') {
      return isAfter ? interiorCockpit : ramMatDirty;
    }
    if (id === 'console-deep-clean') {
      return isAfter ? interiorCockpit : seatStainDirty;
    }
    if (id === 'pet-hair-trunk') {
      return isAfter ? seatStainClean : ramMatDirty;
    }
    return isAfter ? ceramicGleam : foamWash;
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offset / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="transformations" className="py-20 bg-[#09060E] relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-900/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Documented Client Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Before &amp; After{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              Gallery
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real jobs completed by T &amp; P Detailing in Panama City &amp; Bay County. Slide or compare the extreme difference high-temp extraction and paint correction makes.
          </p>

          {/* Controls Bar: Category Filters + View Mode Toggle */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#120A21] border border-purple-900/40 rounded-2xl">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveItemIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Split Slider vs Side-by-Side */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#120A21] border border-purple-900/40 rounded-xl text-xs font-medium">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'slider' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 rotate-90" />
                <span>Split Slider</span>
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'side-by-side' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side by Side</span>
              </button>
            </div>

          </div>
        </div>

        {/* Featured Case Study Visual Frame */}
        {featured && (
          <div className="bg-[#120A21] border border-purple-500/30 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-purple-950/60 mb-12">
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
                      Drag slider to compare before vs after
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
                    <p className="text-xs font-bold uppercase text-red-300 mb-1">Before State:</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{featured.problem}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#170E2A] border border-purple-900/40">
                    <p className="text-xs font-bold uppercase text-emerald-300 mb-1">T &amp; P Treatment:</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{featured.solution}</p>
                  </div>
                </div>

                {/* Case navigation and booking CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectForBooking('signature-deep-detail')}
                    className="flex-1 min-h-[48px] py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/40 transition-all text-center cursor-pointer"
                  >
                    Book Similar Detailing Service
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveItemIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                      className="p-3 rounded-xl bg-[#190F2E] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
                      aria-label="Previous transformation"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveItemIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
                      className="p-3 rounded-xl bg-[#190F2E] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
                      aria-label="Next transformation"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Gallery Thumbnails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveItemIndex(idx);
                window.scrollTo({ top: (document.getElementById('transformations')?.offsetTop || 0) + 120, behavior: 'smooth' });
              }}
              className="group relative rounded-2xl bg-[#120B20] border border-purple-900/30 hover:border-purple-500/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/50 cursor-pointer text-left"
            >
              {/* Split Thumbnail Preview */}
              <div className="relative h-52 rounded-xl overflow-hidden mb-3 bg-black flex">
                <div className="w-1/2 h-full relative overflow-hidden border-r border-white/20">
                  <img
                    src={getImageForCase(item.id, false)}
                    alt={`${item.title} Before`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-bold text-slate-300">
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

              <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {item.problem}
              </p>

              <div className="mt-3 pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs text-purple-400 font-semibold">
                <span>Load in Interactive Slider</span>
                <Eye className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
