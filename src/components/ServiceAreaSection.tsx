import React, { useState } from 'react';
import { MapPin, Navigation, HelpCircle, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, FAQS } from '../data/businessData';

interface ServiceAreaSectionProps {
  onOpenBooking: () => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const areas = [
    { name: "Panama City, FL", desc: "Full mobile coverage in 32404, 32401, 32405 & surrounding.", primary: true },
    { name: "Panama City Beach (PCB)", desc: "From Front Beach Rd to Thomas Dr, beach condo and residential details.", primary: true },
    { name: "Callaway, FL", desc: "Express and full overhaul mobile appointments.", primary: false },
    { name: "Crestview, FL", desc: "Scheduled route days for multi-vehicle & platinum packages.", primary: false }
  ];

  return (
    <section id="areas" className="py-24 bg-[#0C0716] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>Bay County &amp; Emerald Coast Mobile Unit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Service Areas &amp; Mobile Coverage
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            We bring professional mobile auto detailing straight to your home driveway or company office.
          </p>
        </motion.div>

        {/* Coverage Grid with Card Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {areas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-5 rounded-3xl border text-left transition-all ${
                area.primary
                  ? 'bg-[#150B28] border-purple-500/50 shadow-lg shadow-purple-950/40'
                  : 'bg-[#120A21] border-purple-900/30'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-3">
                <Navigation className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-bold text-base text-white">{area.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{area.desc}</p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Mobile Dispatch Available</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Accordion with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-[#120A21] border border-purple-900/40 rounded-3xl p-6 sm:p-8 text-left"
        >
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white font-display">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="divide-y divide-purple-900/30">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-slate-100 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 animate-in fade-in-50 duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Ready to Book Banner with Card Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-950/80 to-purple-950/60 border border-purple-500/40 p-8 sm:p-10 text-center space-y-4 shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
            Ready to Give Your Car the Showroom Shine?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Spots fill up quickly in Panama City &amp; Panama City Beach. Pick your package or contact us directly via call or WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="min-h-[50px] px-7 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-lg shadow-purple-900/50 transition-all cursor-pointer"
            >
              Book Your Appointment Now
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/18507409769"
              target="_blank"
              rel="noreferrer"
              className="min-h-[50px] inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 font-semibold text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
