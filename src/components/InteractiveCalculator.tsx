import React, { useState } from 'react';
import { Calculator, Check, Car, Truck, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PACKAGES, ADD_ONS } from '../data/businessData';
import { VehicleSize } from '../types';

interface InteractiveCalculatorProps {
  onProceedWithConfig: (packageId: string, vehicleSize: VehicleSize, addOnIds: string[]) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  onProceedWithConfig
}) => {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>('sedan');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('signature-deep-detail');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['pet-hair']);

  const currentPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[1];
  const basePrice = currentPackage.prices[vehicleSize];

  const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
    const item = ADD_ONS.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const grandTotal = basePrice + addOnsTotal;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-[#09060E] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-700/10 blur-[130px] rounded-full pointer-events-none" />

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
            <Calculator className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Instant Quote &amp; Custom Build
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Customize your detailing service in real-time. Select your vehicle, package tier, and custom treatments to get an instant transparent quote.
          </p>
        </motion.div>

        {/* Configurator Box with Card Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto bg-[#120A21] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/70"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Configurator Steps */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Step 1: Vehicle Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Step 1: Select Vehicle Size
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'sedan', label: 'Coupe / Sedan', icon: Car },
                    { id: 'truck', label: 'Truck / Mid SUV', icon: Truck },
                    { id: 'suv', label: 'Large SUV / Van', icon: Users }
                  ].map(v => {
                    const Icon = v.icon;
                    const isSelected = vehicleSize === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleSize(v.id as VehicleSize)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-900/40'
                            : 'bg-[#180E2B] border-purple-900/30 text-slate-400 hover:text-white hover:border-purple-800/60'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                        <span className="text-xs font-bold block">{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Package Tier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Step 2: Choose Service Tier
                </label>
                <div className="space-y-2">
                  {PACKAGES.map(pkg => {
                    const isSelected = selectedPackageId === pkg.id;
                    const price = pkg.prices[vehicleSize];
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-400 text-white shadow-sm'
                            : 'bg-[#180E2B] border-purple-900/30 text-slate-300 hover:border-purple-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-purple-400 bg-purple-600' : 'border-slate-500'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="text-sm font-bold block">{pkg.name}</span>
                            <span className="text-xs text-slate-400 block">{pkg.duration} · {pkg.tagline}</span>
                          </div>
                        </div>
                        <span className="font-mono-tabular font-bold text-sm text-purple-300 ml-2">
                          ${price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Optional Add-ons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Step 3: Select Optional Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADD_ONS.map(addon => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? 'bg-purple-900/40 border-purple-400 text-white'
                            : 'bg-[#180E2B] border-purple-900/20 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${isChecked ? 'bg-purple-600 border-purple-400 text-white' : 'border-slate-600'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">{addon.name}</span>
                        </div>
                        <span className="font-mono-tabular text-xs font-semibold text-purple-300">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Live Sticky Summary Card */}
            <div className="lg:col-span-5 bg-[#170E2A] border border-purple-500/40 rounded-3xl p-6 shadow-xl space-y-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-purple-600/20 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Total</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No Hidden Fees
                </span>
              </div>

              {/* Price Callout */}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-purple-400">$</span>
                <span className="text-5xl font-black text-white font-mono-tabular">
                  {grandTotal}
                </span>
                <span className="text-xs text-slate-400 ml-2">Total Estimate</span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-purple-900/40">
                <div className="flex justify-between">
                  <span>Base Package ({currentPackage.name.split(' ')[0]}):</span>
                  <span className="font-mono-tabular font-semibold text-white">${basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Classification:</span>
                  <span className="capitalize font-medium text-purple-300">{vehicleSize}</span>
                </div>
                {selectedAddOns.length > 0 ? (
                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">Add-ons Selected:</span>
                    {selectedAddOns.map(id => {
                      const item = ADD_ONS.find(a => a.id === id);
                      return item ? (
                        <div key={id} className="flex justify-between text-[11px] text-slate-300 pl-2">
                          <span>+ {item.name}</span>
                          <span className="font-mono-tabular">${item.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic">No add-ons selected</div>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Includes mobile service in Panama City area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Pay upon completion &amp; inspection</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onProceedWithConfig(selectedPackageId, vehicleSize, selectedAddOns)}
                className="w-full min-h-[52px] py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-950/70 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book With This Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
