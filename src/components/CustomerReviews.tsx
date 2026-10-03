import React from 'react';
import { Star, ShieldCheck, ThumbsUp, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS, BUSINESS_INFO } from '../data/businessData';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#09060E] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300">
            <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Real Local Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            100% Recommended in Panama City
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read what drivers across Panama City, Panama City Beach, Callaway, and Crestview say about their showroom transformations.
          </p>

          {/* Social Proof Metric Lockup */}
          <div className="pt-2 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-white text-base font-display">5.0 / 5.0</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="text-slate-300 font-medium">
              <span className="text-purple-300 font-bold">100%</span> Recommendation Rate
            </div>
            <span className="text-slate-600">·</span>
            <div className="text-slate-400">
              Verified Facebook Reviews
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid with Card Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="rounded-3xl bg-[#120A21] border border-purple-900/30 hover:border-purple-500/50 p-6 sm:p-7 shadow-lg flex flex-col justify-between text-left transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800/40">
                    {rev.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-purple-900/30 text-xs">
                <div>
                  <h4 className="font-bold text-white">{rev.author}</h4>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Service</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facebook Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-[#150B28] border border-purple-800/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl"
        >
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-bold text-white font-display">
              Connect With T &amp; P Detailing on Social Media
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Follow our daily detailing reels, stories, and before/after transformation videos on Facebook &amp; Instagram.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-950 transition-colors"
            >
              <span>View Facebook Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>@{BUSINESS_INFO.instagram}</span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
