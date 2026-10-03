import React, { useState } from 'react';
import { Calendar, Phone, MapPin, User, Check, Sparkles, MessageSquare, ShieldCheck, Car, Truck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { PACKAGES, BUSINESS_INFO } from '../data/businessData';
import { VehicleSize, BookingSubmission } from '../types';

interface ClassicBookingSectionProps {
  selectedPackageId?: string;
  selectedVehicleSize?: VehicleSize;
}

export const ClassicBookingSection: React.FC<ClassicBookingSectionProps> = ({
  selectedPackageId = 'signature-deep-detail',
  selectedVehicleSize = 'sedan'
}) => {
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>(selectedVehicleSize);
  const [packageId, setPackageId] = useState<string>(selectedPackageId);

  // Form Fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('Morning (8:30 AM - 11:30 AM)');
  const [vehicleMakeModel, setVehicleMakeModel] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingSubmission | null>(null);

  const currentPkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[1];
  const totalPrice = currentPkg.prices[vehicleSize];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const submission: BookingSubmission = {
        id: `TP-${Date.now().toString().slice(-5)}`,
        packageId,
        packageName: currentPkg.name,
        vehicleSize,
        vehicleYearMakeModel: vehicleMakeModel || 'Details provided on site',
        addOnIds: [],
        selectedDate: date,
        selectedTime: timeSlot,
        serviceType: 'mobile',
        address: address || 'Panama City Area Mobile',
        customerName,
        customerPhone,
        customerEmail: '',
        notes,
        totalEstimatedPrice: totalPrice,
        createdAt: new Date().toISOString()
      };

      setBookingConfirmed(submission);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#9333EA', '#7C3AED', '#38BDF8', '#F472B6']
        });
      } catch (err) {
        // Fallback
      }
    }, 500);
  };

  const generateWhatsAppMessage = () => {
    if (!bookingConfirmed) return '';
    const text = `Hi T&P Detailing! I'd like to book a detailing appointment:
• Vehicle Type: ${bookingConfirmed.vehicleSize.toUpperCase()} (${bookingConfirmed.vehicleYearMakeModel})
• Package: ${bookingConfirmed.packageName} ($${bookingConfirmed.totalEstimatedPrice})
• Date: ${bookingConfirmed.selectedDate} (${bookingConfirmed.selectedTime})
• Location: ${bookingConfirmed.address}
• Name: ${bookingConfirmed.customerName}
• Phone: ${bookingConfirmed.customerPhone}
${bookingConfirmed.notes ? `• Notes: ${bookingConfirmed.notes}` : ''}

Looking forward to hearing from you!`;

    return encodeURIComponent(text);
  };

  const vehicleOptions = [
    { id: 'sedan' as VehicleSize, label: 'Coupe / Sedan', icon: Car },
    { id: 'truck' as VehicleSize, label: 'Truck / Mid SUV', icon: Truck },
    { id: 'suv' as VehicleSize, label: 'Large SUV / Van', icon: Users },
  ];

  return (
    <section id="booking" className="py-24 bg-[#09060E] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-700/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Classic Online Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Schedule Your Detail
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Select your vehicle, choose your package, and pick your preferred time. We bring our full mobile unit to your driveway.
          </p>
        </motion.div>

        {/* The Classic Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#120A21] border border-purple-500/35 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/70 text-left"
        >
          {!bookingConfirmed ? (
            <form onSubmit={handleFinalSubmit} className="space-y-7">
              
              {/* 1. SELECT VEHICLE TYPE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2.5">
                  1. Select Vehicle Type *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {vehicleOptions.map((v) => {
                    const Icon = v.icon;
                    const active = vehicleSize === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleSize(v.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                          active
                            ? 'bg-purple-600 border-purple-400 text-white shadow-xl shadow-purple-900/60'
                            : 'bg-[#180E2B] border-purple-900/40 text-slate-300 hover:text-white hover:border-purple-700'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1.5 text-purple-200" />
                        <span className="text-xs sm:text-sm font-bold block">{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. SELECT PACKAGE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2.5">
                  2. Select Detailing Package *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PACKAGES.map((pkg) => {
                    const active = packageId === pkg.id;
                    const price = pkg.prices[vehicleSize];
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          active
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-950/60'
                            : 'bg-[#180E2B] border-purple-900/40 text-slate-300 hover:border-purple-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="font-bold text-sm text-white">{pkg.name}</h4>
                            {pkg.popular && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-purple-600 text-white">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight mb-3">
                            {pkg.duration} · {pkg.tagline}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-purple-900/40 flex items-baseline justify-between">
                          <span className="text-[10px] text-slate-400 uppercase font-medium">Estimated:</span>
                          <span className="font-mono-tabular font-extrabold text-xl text-purple-300">
                            ${price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. YOUR DETAILS & SCHEDULE */}
              <div className="space-y-4 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300">
                  3. Contact &amp; Location Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Preferred Date:</label>
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Arrival Window:</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400"
                    >
                      <option value="Morning (8:30 AM - 11:30 AM)">Morning (8:30 AM - 11:30 AM)</option>
                      <option value="Midday (11:30 AM - 2:00 PM)">Midday (11:30 AM - 2:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Street Address in Panama City / PCB / Callaway area"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    placeholder="Vehicle Year, Make, Model (e.g. 2021 Dodge Ram)"
                    value={vehicleMakeModel}
                    onChange={(e) => setVehicleMakeModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-xs focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Special requests or stains to target? (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-xs focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* SUMMARY & SUBMIT */}
              <div className="pt-2 border-t border-purple-900/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#160D27] p-4 rounded-2xl border border-purple-800/40">
                  <div>
                    <span className="text-xs text-slate-300 font-medium block">
                      Estimated Total for {currentPkg.name} ({vehicleSize.toUpperCase()}):
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      No deposit required — pay after your vehicle is showroom ready
                    </span>
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono-tabular">
                    ${totalPrice}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[58px] py-4 rounded-2xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/60 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Appointment...</span>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-purple-200" />
                      <span>Confirm &amp; Request Appointment</span>
                    </>
                  )}
                </motion.button>
              </div>

            </form>
          ) : (
            /* CONFIRMED RECEIPT VIEW */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Request Received!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                  You're On The Schedule
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                  Thank you, <span className="text-white font-bold">{bookingConfirmed.customerName}</span>. We've received your booking request for{' '}
                  <span className="text-purple-300 font-semibold">{bookingConfirmed.selectedDate}</span>.
                </p>
              </div>

              <div className="bg-[#160D27] border border-purple-800/40 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-purple-900/30 pb-2">
                  <span className="text-slate-400">Confirmation ID:</span>
                  <span className="font-mono-tabular font-bold text-purple-300">{bookingConfirmed.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Package:</span>
                  <span className="font-semibold text-white">{bookingConfirmed.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white">{bookingConfirmed.vehicleYearMakeModel} ({bookingConfirmed.vehicleSize.toUpperCase()})</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-purple-900/30 font-bold text-sm">
                  <span className="text-white">Estimated Total:</span>
                  <span className="font-mono-tabular text-purple-300">${bookingConfirmed.totalEstimatedPrice}</span>
                </div>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/18507409769?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full min-h-[50px] py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Details to WhatsApp for Instant Confirmation</span>
                </motion.a>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call Us Direct: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
