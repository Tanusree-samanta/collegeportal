import React from 'react';
import logoImage from '../assets/images/neotia_university_logo.png';

interface TnuLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'compact';
}

export const TnuLogo: React.FC<TnuLogoProps> = ({ className = 'h-8 sm:h-9 md:h-10' }) => {
  return (
    <img
      src={logoImage}
      alt="The Neotia University - Ambuja Neotia"
      className={`${className} w-auto object-contain shrink-0`}
      loading="eager"
    />
  );
};
