import React from 'react';
import { Droplets, Sparkles, Shield, PawPrint, Wrench, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import ceramicGleam from '../assets/images/ceramic_coating_gleam_1790916914392.jpg';
import foamWash from '../assets/images/foam_cannon_wash_1790916939067.jpg';
import interiorCockpit from '../assets/images/interior_luxury_cockpit_1790916926060.jpg';

interface ServicesOverviewProps {
  onOpenBooking: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onOpenBooking }) => {
  const services = [
    {
      title: "Hot Water Carpet & Seat Extraction",
      desc: "Commercial 210°F heated extraction injects pressurized cleaning solution deep into upholstery fibers, dislodging coffee, juice, grease, and ground-in dirt.",
      icon: Droplets,
      image: interiorCockpit,
      features: ["Stain & spill removal", "Anti-microbial sanitization", "Zero sticky soap residue"]
    },
    {
      title: "Ceramic Coatings & Graphene Shield",
      desc: "Creates a semi-permanent sacrificial barrier over clear coat that repels Florida UV rays, salt air, bird droppings, acid rain, and road chemical fallout.",
      icon: Shield,
      image: ceramicGleam,
      features: ["Extreme water beading", "Year-round UV oxidation defense", "Mirror reflection depth"]
    },
    {
      title: "Stubborn Pet Hair De-Weaving",
      desc: "We utilize specialized pet hair blades, static friction brushes, and high-velocity vortex air to lift stubborn fur embedded into vehicle carpet weave.",
      icon: PawPrint,
      image: foamWash,
      features: ["100% hair strand removal", "Deep vacuum underneath seats", "HEPA cabin air refresh"]
    },
    {
      title: "Contactless Active Foam Bath & Clay Decon",
      desc: "Thick snow foam loosens surface grit before a gentle two-bucket wash, followed by chemical iron fallout remover and synthetic clay treatment for glass-smooth paint.",
      icon: Sparkles,
      image: foamWash,
      features: ["Swirl-free wash technique", "Iron fallout decontamination", "Silky smooth paint prep"]
    }
  ];

  return (
    <section className="py-24 bg-[#0A0612] relative overflow-hidden">
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
            <Wrench className="w-3.5 h-3.5 text-purple-400" />
            <span>Master Craftsman Procedures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Specialized Detailing Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Every step is engineered to protect vehicle value, sanitize interiors, and restore optical clarity to paint.
          </p>
        </motion.div>

        {/* Asymmetric Bento-like grid with Card Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="group rounded-3xl bg-[#120A21] border border-purple-900/30 hover:border-purple-500/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/60 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-400/80 uppercase">
                      0{idx + 1}. Precision Care
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-purple-300 transition-colors mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-900/30">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
