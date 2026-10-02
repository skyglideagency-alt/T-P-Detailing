import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, Car, Check, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PACKAGES, ADD_ONS, BUSINESS_INFO } from '../data/businessData';
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
  initialVehicleSize = 'sedan',
  initialAddOnIds = []
}) => {
  const [step, setStep] = useState<number>(1);
  const [packageId, setPackageId] = useState<string>(initialPackageId);
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>(initialVehicleSize);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(initialAddOnIds);

  // Form Fields
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM - Morning Slot');
  const [serviceType, setServiceType] = useState<'mobile' | 'dropoff'>('mobile');
  const [address, setAddress] = useState<string>('');
  const [vehicleMakeModel, setVehicleMakeModel] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingSubmission | null>(null);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[1];
  const basePrice = currentPkg.prices[vehicleSize];
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const found = ADD_ONS.find(a => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);
  const totalPrice = basePrice + addOnsTotal;

  const handleNextStep = () => {
    if (step === 2 && !date) {
      alert('Please choose a preferred service date.');
      return;
    }
    if (step === 3 && serviceType === 'mobile' && !address.trim()) {
      alert('Please enter your street address in Panama City or surrounding area.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please enter your name and phone number so we can confirm your slot.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const submission: BookingSubmission = {
        id: `TP-${Date.now().toString().slice(-5)}`,
        packageId,
        packageName: currentPkg.name,
        vehicleSize,
        vehicleYearMakeModel: vehicleMakeModel || 'Vehicle details pending',
        addOnIds: selectedAddOns,
        selectedDate: date,
        selectedTime: timeSlot,
        serviceType,
        address: serviceType === 'mobile' ? address : 'Panama City Location Drop-off',
        customerName,
        customerPhone,
        customerEmail,
        notes,
        totalEstimatedPrice: totalPrice,
        createdAt: new Date().toISOString()
      };

      setBookingConfirmed(submission);
      setIsSubmitting(false);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#9333EA', '#7C3AED', '#38BDF8', '#F472B6']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    if (!bookingConfirmed) return '';
    const addOnNames = selectedAddOns
      .map(id => ADD_ONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hi T&P Detailing! I just placed a booking on your site:
• Booking ID: ${bookingConfirmed.id}
• Package: ${bookingConfirmed.packageName} (${bookingConfirmed.vehicleSize.toUpperCase()})
• Vehicle: ${bookingConfirmed.vehicleYearMakeModel}
• Date: ${bookingConfirmed.selectedDate} (${bookingConfirmed.selectedTime})
• Service: ${bookingConfirmed.serviceType === 'mobile' ? `Mobile to ${bookingConfirmed.address}` : 'Drop-off'}
• Add-ons: ${addOnNames || 'None'}
• Total Estimate: $${bookingConfirmed.totalEstimatedPrice}
• Client: ${bookingConfirmed.customerName} (${bookingConfirmed.customerPhone})

Looking forward to getting my vehicle showroom ready!`;

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#120A21] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/80 text-slate-300 hover:text-white hover:bg-purple-900 border border-purple-800/40 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingConfirmed ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick &amp; Easy Online Reservation</span>
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                Book Your T &amp; P Detail
              </h3>
              <p className="text-xs text-slate-300">
                Step {step} of 4 — Serving Panama City, PCB, Callaway &amp; Crestview, FL
              </p>

              {/* Progress bar */}
              <div className="w-full bg-[#1F1436] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Package & Vehicle */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Select Detailing Package
                  </label>
                  <div className="space-y-2">
                    {PACKAGES.map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          packageId === pkg.id
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-sm'
                            : 'bg-[#180E2B] border-purple-900/30 text-slate-300 hover:border-purple-700'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold">{pkg.name}</p>
                          <p className="text-[11px] text-slate-400">{pkg.duration} · {pkg.tagline}</p>
                        </div>
                        <span className="font-mono-tabular font-bold text-sm text-purple-300">
                          ${pkg.prices[vehicleSize]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Vehicle Classification
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sedan', label: 'Coupe / Sedan' },
                      { id: 'truck', label: 'Truck / Mid SUV' },
                      { id: 'suv', label: 'Large SUV / Van' }
                    ].map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleSize(v.id as VehicleSize)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer ${
                          vehicleSize === v.id
                            ? 'bg-purple-600/40 border-purple-400 text-white'
                            : 'bg-[#180E2B] border-purple-900/30 text-slate-400 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-on toggles */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Add-On Upgrades (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ADD_ONS.map(addon => {
                      const isSelected = selectedAddOns.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => {
                            setSelectedAddOns(prev =>
                              prev.includes(addon.id)
                                ? prev.filter(x => x !== addon.id)
                                : [...prev, addon.id]
                            );
                          }}
                          className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-900/40 border-purple-400 text-white'
                              : 'bg-[#180E2B] border-purple-900/20 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <div className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'}`}>
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="font-medium text-[11px]">{addon.name}</span>
                          </div>
                          <span className="font-mono-tabular text-purple-300 font-semibold">+${addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Total & Next */}
                <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Current Estimate:</span>
                    <span className="text-2xl font-bold font-mono-tabular text-white">${totalPrice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Choose Date &amp; Time</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Select Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Operates Monday – Saturday, 8:00 AM – 6:30 PM (Sundays by special appointment)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Preferred Arrival Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '08:30 AM - Early Morning',
                      '11:00 AM - Late Morning',
                      '01:30 PM - Afternoon Slot',
                      '03:45 PM - Late Afternoon'
                    ].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer flex items-center gap-2 ${
                          timeSlot === slot
                            ? 'bg-purple-600/30 border-purple-400 text-white'
                            : 'bg-[#180E2B] border-purple-900/30 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step navigation */}
                <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Location Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Service Type & Location */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Service Delivery Option
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceType('mobile')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer ${
                        serviceType === 'mobile'
                          ? 'bg-purple-600/30 border-purple-400 text-white'
                          : 'bg-[#180E2B] border-purple-900/30 text-slate-400'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-purple-400 mb-1" />
                      <p className="text-sm font-bold">Mobile Detailing</p>
                      <p className="text-[11px] text-slate-400">We bring equipment &amp; power to your driveway</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('dropoff')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer ${
                        serviceType === 'dropoff'
                          ? 'bg-purple-600/30 border-purple-400 text-white'
                          : 'bg-[#180E2B] border-purple-900/30 text-slate-400'
                      }`}
                    >
                      <Car className="w-5 h-5 text-purple-400 mb-1" />
                      <p className="text-sm font-bold">Shop Drop-Off</p>
                      <p className="text-[11px] text-slate-400">Panama City, FL location</p>
                    </button>
                  </div>
                </div>

                {serviceType === 'mobile' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                      Your Service Address / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2415 Front Beach Rd, Panama City Beach, FL 32407"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Serving Panama City, Panama City Beach, Callaway, Crestview, &amp; Bay County.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Vehicle Year, Make &amp; Model (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2021 Dodge Ram 1500 or 2018 Honda Accord"
                    value={vehicleMakeModel}
                    onChange={(e) => setVehicleMakeModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Contact Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact & Confirm */}
            {step === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., John Smith"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g., (850) 555-0199"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                    <input
                      type="email"
                      placeholder="e.g., john@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Special Notes or Areas of Concern
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Pet hair in trunk, milk spill on passenger seat, gated community code..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#180E2B] border border-purple-800/40 text-white focus:outline-hidden focus:border-purple-400 text-sm"
                  />
                </div>

                {/* Summary Box */}
                <div className="p-3.5 rounded-xl bg-[#160D27] border border-purple-800/40 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">{currentPkg.name} ({vehicleSize.toUpperCase()})</span>
                    <span className="font-mono-tabular font-bold text-purple-300">${totalPrice}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Date: {date} · Window: {timeSlot}
                  </p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    No prepayment required. Pay upon inspection when finished.
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-900/50 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Slot...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Booking Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* BOOKING CONFIRMED SUCCESS VIEW */
          <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Booking Request Received!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                You're Scheduled for Showroom Finish
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                Thank you, <span className="text-white font-semibold">{bookingConfirmed.customerName}</span>. We have reserved your appointment on{' '}
                <span className="text-purple-300 font-semibold">{bookingConfirmed.selectedDate}</span> ({bookingConfirmed.selectedTime}).
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#160D27] border border-purple-800/40 rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
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
              <div className="flex justify-between">
                <span className="text-slate-400">Service Location:</span>
                <span className="text-white">{bookingConfirmed.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-purple-900/30 font-bold text-sm">
                <span className="text-white">Estimated Amount:</span>
                <span className="font-mono-tabular text-purple-300">${bookingConfirmed.totalEstimatedPrice}</span>
              </div>
            </div>

            {/* Instant Actions: WhatsApp & Call */}
            <div className="space-y-2 max-w-md mx-auto pt-2">
              <a
                href={`https://wa.me/18507409769?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Booking Details via WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us Direct: {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Done / Return to Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
