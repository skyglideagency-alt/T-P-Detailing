import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageSquare, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07040B] border-t border-purple-900/30 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              {BUSINESS_INFO.tagline}. Professional mobile car detailing serving Panama City, Panama City Beach, and surrounding Bay County areas.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/18507409769"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
                aria-label="WhatsApp Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#transformations" className="hover:text-purple-300 transition-colors">
                  Before &amp; After Gallery
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-purple-300 transition-colors">
                  Pricing Packages
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-purple-300 transition-colors">
                  Instant Quote Estimator
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-purple-300 transition-colors">
                  Customer Testimonials
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-purple-300 transition-colors">
                  Mobile Service Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Service Areas
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Panama City, FL (32404 &amp; 32401)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Panama City Beach, FL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Callaway, FL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Crestview, FL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Bay County Mobile Coverage</span>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Contact &amp; Hours
            </h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Panama City, FL, United States, 32404</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Mon – Sat: 8:00 AM – 6:30 PM<br />
                Sunday: By Appointment
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Showroom Ready Automotive Detailing</span>
            <span>·</span>
            <span>Licensed &amp; Insured Mobile Unit</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
