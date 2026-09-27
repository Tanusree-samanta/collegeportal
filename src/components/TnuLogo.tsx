import React, { useState } from 'react';

interface TnuLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'compact';
}

export const TnuLogo: React.FC<TnuLogoProps> = ({ className = 'h-11 sm:h-12 md:h-13' }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = '/neotia_university_logo.png';

  if (!imgError) {
    return (
      <img
        src={logoUrl}
        alt="The Neotia University - Ambuja Neotia"
        className={`${className} w-auto object-contain shrink-0 select-none`}
        loading="eager"
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback inline SVG matching the Ambuja Neotia - The Neotia University mark
  return (
    <div className={`${className} flex items-center shrink-0`}>
      <svg viewBox="0 0 250 136" className="h-full w-auto">
        <text x="76" y="24" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="800" fontSize="17">
          <tspan fill="#164E87">Ambuja</tspan>
          <tspan fill="#EB780A">Neotia</tspan>
        </text>
        <rect x="10" y="38" width="28" height="9" rx="0.5" fill="#C1272D" />
        <path
          d="M 11 86 L 36 49 L 36 68 C 36 82.5 54 82.5 54 68 L 54 49"
          fill="none"
          stroke="#1D1B1B"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="74" y="58" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="700" fontSize="19" fill="#201E1E" letterSpacing="0.5">
          THE NEOTIA
        </text>
        <text x="74" y="80" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="700" fontSize="19" fill="#201E1E" letterSpacing="0.5">
          UNIVERSITY
        </text>
        <text x="10" y="100" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="10.5" fill="#4A4A4A" fontWeight="600">
          ज्ञानम् आत्म प्रदीपाय
        </text>
        <line x1="10" y1="107" x2="242" y2="107" stroke="#8C8C8C" strokeWidth="1.2" />
        <text x="10" y="123" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="10.5" fill="#2B2B2B" fontWeight="600" letterSpacing="0.2">
          Approved Under Sec. 2(f) of UGC Act 1956
        </text>
      </svg>
    </div>
  );
};
