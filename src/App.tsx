/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { PricingPackages } from './components/PricingPackages';
import { ClassicBookingSection } from './components/ClassicBookingSection';
import { CustomerReviews } from './components/CustomerReviews';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import { BookingModal } from './components/BookingModal';
import { VehicleSize } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPackageId, setBookingPackageId] = useState<string>('signature-deep-detail');
  const [bookingVehicleSize, setBookingVehicleSize] = useState<VehicleSize>('sedan');

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectPackageForBooking = (pkgId: string, size: VehicleSize = 'sedan') => {
    setBookingPackageId(pkgId);
    setBookingVehicleSize(size);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09060E] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Floating Menu Bar */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Clean Hero Section with Signature Quote & Full-Bleed Detailing Background */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3 High-Impact Real Before & After Transformations Slider */}
        <BeforeAfterShowcase onSelectForBooking={handleSelectPackageForBooking} />

        {/* Detailing Packages & Rates with Vehicle Type Switcher */}
        <PricingPackages onSelectPackage={handleSelectPackageForBooking} />

        {/* Classic Clean Booking Form */}
        <ClassicBookingSection
          selectedPackageId={bookingPackageId}
          selectedVehicleSize={bookingVehicleSize}
        />

        {/* 100% Recommended Real Customer Reviews */}
        <CustomerReviews />

        {/* Service Areas & Mobile Unit FAQs */}
        <ServiceAreaSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Floating Quick Action Elements (Elevated above AI chat) */}
      <FloatingElements onOpenBooking={handleOpenBooking} />

      {/* Classic Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={bookingPackageId}
        initialVehicleSize={bookingVehicleSize}
      />
    </div>
  );
}
