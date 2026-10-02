import React from 'react';
import logoImg from '../assets/images/tp_detailing_logo_1790916954708.jpg';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group shrink-0">
        {/* Ambient neon purple backglow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-600 rounded-full blur-xs opacity-70 group-hover:opacity-100 transition duration-300" />
        <div className={`relative ${sizeMap[size]} rounded-full overflow-hidden border-2 border-purple-400/50 bg-[#120A21] flex items-center justify-center shadow-lg shadow-purple-950/50`}>
          <img
            src={logoImg}
            alt="T & P Premium Detailing Logo"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful SVG badge fallback if image load fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-950 to-black text-white text-[10px] font-bold tracking-tight">
                    <span class="text-purple-300 font-extrabold text-xs">T&P</span>
                  </div>
                `;
              }
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold tracking-tight text-white text-lg sm:text-xl">
              T &amp; P
            </span>
            <span className="font-display font-light tracking-widest text-purple-400 text-xs sm:text-sm uppercase">
              Detailing
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium -mt-0.5">
            Panama City, FL
          </span>
        </div>
      )}
    </div>
  );
};
