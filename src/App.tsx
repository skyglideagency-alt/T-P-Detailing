/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { ServicesOverview } from './components/ServicesOverview';
import { PricingPackages } from './components/PricingPackages';
import { InteractiveCalculator } from './components/InteractiveCalculator';
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
  const [bookingAddOns, setBookingAddOns] = useState<string[]>([]);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectPackageForBooking = (pkgId: string, size: VehicleSize = 'sedan') => {
    setBookingPackageId(pkgId);
    setBookingVehicleSize(size);
    setIsBookingOpen(true);
  };

  const handleProceedFromCalculator = (pkgId: string, size: VehicleSize, addOns: string[]) => {
    setBookingPackageId(pkgId);
    setBookingVehicleSize(size);
    setBookingAddOns(addOns);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09060E] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Floating Badges & CTA */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Real Before & After Transformation Slider Showcase */}
        <BeforeAfterShowcase onSelectForBooking={handleSelectPackageForBooking} />

        {/* Detailing Craftsmanship & Process Overview */}
        <ServicesOverview onOpenBooking={handleOpenBooking} />

        {/* Packages & Transparent Pricing with Vehicle Size Toggle */}
        <PricingPackages onSelectPackage={handleSelectPackageForBooking} />

        {/* Live Instant Quote & Build Calculator */}
        <InteractiveCalculator onProceedWithConfig={handleProceedFromCalculator} />

        {/* Real Verified Client Reviews & Facebook Integration */}
        <CustomerReviews />

        {/* Mobile Service Areas & FAQ */}
        <ServiceAreaSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Animated Widgets & Sticky Mobile Controls */}
      <FloatingElements onOpenBooking={handleOpenBooking} />

      {/* Interactive Online Booking Flow Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={bookingPackageId}
        initialVehicleSize={bookingVehicleSize}
        initialAddOnIds={bookingAddOns}
      />
    </div>
  );
}
