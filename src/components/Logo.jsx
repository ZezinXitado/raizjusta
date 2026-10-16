import React from "react";

export default function Logo({ size = 40, withText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* raiz / mão que sustenta a folha */}
        <path
          d="M24 44c-7 0-13-4.5-13-11 0-4 2.2-7 5.5-9 .3 2.2 1.4 3.8 2.8 4.8-1.4-3.2-1-7 1.2-10 1.2-1.6 2.8-2.6 4.5-3 .2 2.4 1 4.2 2.2 5.6C29 19 29.6 16 31.5 14c1.6 2.2 2 5 1.2 7.8 1.4-.6 2.4-1.8 2.8-3.4C39 21 41 25 41 29c0 8-7 15-17 15z"
          fill="url(#terra)"
        />
        {/* folha */}
        <path
          d="M30 6c-5 0-9 3.5-10 8.5-.4 2 .8 3.8 2.6 4.2 3 .7 6-.6 7.8-3.2 1.4-2 1.6-4.4.6-6.5C30.6 7.4 30.3 6.6 30 6z"
          fill="url(#verde)"
        />
        <path d="M22 16c1 3 3 5 6 6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <defs>
          <linearGradient id="verde" x1="20" y1="6" x2="33" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4CAF7B" />
            <stop offset="1" stopColor="#2E7D52" />
          </linearGradient>
          <linearGradient id="terra" x1="11" y1="20" x2="41" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A9703E" />
            <stop offset="1" stopColor="#6E4421" />
          </linearGradient>
        </defs>
      </svg>
      {withText && (
        <div className="leading-none">
          <span className="font-display text-xl font-extrabold tracking-tight text-emerald-800">RAIZ</span>
          <span className="font-display text-xl font-extrabold tracking-tight text-amber-600">JUSTA</span>
        </div>
      )}
    </div>
  );
}