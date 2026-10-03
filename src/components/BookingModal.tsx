import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, Car, Check, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Truck, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { PACKAGES, BUSINESS_INFO } from '../data/businessData';
import { VehicleSize, BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialVehicleSize?: VehicleSize;
  initialAddOnIds?: string[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId = 'signature-deep-detail',
  initialVehicleSize = 'sedan'
}) => {
  const [packageId, setPackageId] = useState<string>(initialPackageId);
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>(initialVehicleSize);

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
        vehicleYearMakeModel: vehicleMakeModel || 'Vehicle details provided on arrival',
        addOnIds: [],
        selectedDate: date,
        selectedTime: timeSlot,
        serviceType: 'mobile',
        address: address || 'Panama City Area (Mobile Service)',
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
    const text = `Hi T&P Detailing! I'd like to book an appointment:
• Booking ID: ${bookingConfirmed.id}
• Vehicle Type: ${bookingConfirmed.vehicleSize.toUpperCase()} (${bookingConfirmed.vehicleYearMakeModel})
• Package: ${bookingConfirmed.packageName} ($${bookingConfirmed.totalEstimatedPrice})
• Preferred Date: ${bookingConfirmed.selectedDate} (${bookingConfirmed.selectedTime})
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Blur Fade Intro/Outro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container Scale/Slide Intro/Outro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl bg-[#120A21] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 my-6 text-left max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/80 text-slate-300 hover:text-white hover:bg-purple-900 border border-purple-800/40 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              /* CLASSIC, SIMPLE BOOKING FORM */
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Simple &amp; Fast Booking</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-display">
                    Book Your Detail
                  </h3>
                  <p className="text-xs text-slate-300">
                    Mobile service in Panama City, PCB, Callaway &amp; Crestview, FL
                  </p>
                </div>

                {/* STEP 1: SELECT VEHICLE TYPE */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    1. Select Vehicle Type *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {vehicleOptions.map((v) => {
                      const Icon = v.icon;
                      const active = vehicleSize === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVehicleSize(v.id)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50'
                              : 'bg-[#180E2B] border-purple-900/40 text-slate-300 hover:text-white hover:border-purple-700'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1 text-purple-200" />
                          <span className="text-xs font-bold block">{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: SELECT PACKAGE */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    2. Select Detailing Package *
                  </label>
                  <div className="space-y-2">
                    {PACKAGES.map((pkg) => {
                      const active = packageId === pkg.id;
                      const price = pkg.prices[vehicleSize];
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setPackageId(pkg.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                            active
                              ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-950/60'
                              : 'bg-[#180E2B] border-purple-900/40 text-slate-300 hover:border-purple-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${active ? 'border-purple-400 bg-purple-600' : 'border-slate-500'}`}>
                              {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{pkg.name}</span>
                                {pkg.popular && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-600 text-white">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-slate-400 block">{pkg.duration} · {pkg.tagline}</span>
                            </div>
                          </div>
                          <span className="font-mono-tabular font-extrabold text-base text-purple-300 ml-3 shrink-0">
                            ${price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: CUSTOMER & SCHEDULE DETAILS */}
                <div className="space-y-3 pt-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300">
                    3. Your Contact &amp; Schedule
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        placeholder="Street Address or Neighborhood in Panama City / PCB area"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-sm focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Vehicle Year, Make, Model (e.g. 2021 Dodge Ram 1500)"
                      value={vehicleMakeModel}
                      onChange={(e) => setVehicleMakeModel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-xs focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Any specific stains, pet hair, or notes? (Optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#180E2B] border border-purple-800/40 text-white text-xs focus:outline-hidden focus:border-purple-400 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* PRICE SUMMARY & SUBMIT */}
                <div className="pt-2 border-t border-purple-900/40 space-y-4">
                  <div className="flex items-center justify-between bg-[#160D27] p-3.5 rounded-2xl border border-purple-800/40">
                    <div>
                      <span className="text-xs text-slate-300 font-medium block">
                        Estimated Total ({vehicleSize.toUpperCase()}):
                      </span>
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Pay upon completion &amp; inspection
                      </span>
                    </div>
                    <span className="text-3xl font-black text-white font-mono-tabular">
                      ${totalPrice}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[56px] py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Slot...</span>
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
              /* SUCCESS VIEW */
              <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Request Received!
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    You're On The Schedule
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                    Thank you, <span className="text-white font-bold">{bookingConfirmed.customerName}</span>. We've received your booking request for{' '}
                    <span className="text-purple-300 font-semibold">{bookingConfirmed.selectedDate}</span>.
                  </p>
                </div>

                {/* Details Card */}
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

                {/* Instant Actions */}
                <div className="space-y-2.5 max-w-md mx-auto pt-1">
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

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                  >
                    Done / Return to Site
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
