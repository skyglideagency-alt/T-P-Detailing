import React, { useState } from 'react';
import { Check, Sparkles, Clock, ShieldCheck, Car, Truck, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PACKAGES, ADD_ONS } from '../data/businessData';
import { VehicleSize } from '../types';

interface PricingPackagesProps {
  onSelectPackage: (packageId: string, vehicleSize: VehicleSize) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPackage }) => {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>('sedan');

  const vehicleOptions: { id: VehicleSize; label: string; icon: any; example: string }[] = [
    { id: 'sedan', label: 'Coupe / Sedan', icon: Car, example: 'Civic, Accord, Camry, Model 3' },
    { id: 'truck', label: 'Truck / Mid SUV', icon: Truck, example: 'F-150, Ram 1500, RAV4, CR-V' },
    { id: 'suv', label: 'Large SUV / Van', icon: Users, example: 'Tahoe, Suburban, Odyssey, 3-Row' }
  ];

  return (
    <section id="packages" className="py-24 bg-[#0C0716] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Honest &amp; Transparent Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Detailing Packages &amp; Pricing
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            No hidden charges or surprise fees. Select your vehicle size below to preview transparent package pricing.
          </p>

          {/* Vehicle Size Selector Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#140C24] border border-purple-800/40 shadow-lg">
              {vehicleOptions.map((opt) => {
                const Icon = opt.icon;
                const active = vehicleSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setVehicleSize(opt.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Currently viewing rates for: <span className="text-purple-300 font-medium">{vehicleOptions.find(o => o.id === vehicleSize)?.example}</span>
          </p>
        </motion.div>

        {/* Pricing Cards Grid with Card Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PACKAGES.map((pkg, idx) => {
            const price = pkg.prices[vehicleSize];
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 text-left ${
                  isPopular
                    ? 'bg-[#150B28] border-2 border-purple-500 shadow-2xl shadow-purple-950/80'
                    : 'bg-[#120A21] border border-purple-900/30 hover:border-purple-600/40 shadow-xl'
                }`}
              >
                {/* Popular / Best Value Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    ★ Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                      {pkg.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 min-h-[36px] mb-4">
                    {pkg.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1 py-3 border-y border-purple-900/40 my-3">
                    <span className="text-sm font-semibold text-purple-400">$</span>
                    <span className="text-4xl font-extrabold text-white font-mono-tabular">
                      {price}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ one-time service</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-purple-300 mb-5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Estimated time: {pkg.duration}</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                      What's Included:
                    </p>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Block */}
                <div className="pt-4 border-t border-purple-900/30 space-y-3">
                  <div className="text-[11px] text-slate-400 italic">
                    Best for: {pkg.recommendedFor}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectPackage(pkg.id, vehicleSize)}
                    className={`w-full min-h-[50px] py-3 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/50'
                        : 'bg-purple-950/80 hover:bg-purple-900 border border-purple-800/60 text-purple-200 hover:text-white'
                    }`}
                  >
                    <span>Book {pkg.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
