import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: 'default' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'default' }) => {
  const dimensions = size === 'large' 
    ? { width: 'w-[250px]', height: 'h-[80px]' }
    : { width: 'w-[150px]', height: 'h-[50px]' };

  return (
    <div className={`relative ${dimensions.width} ${dimensions.height}`}>
      <Image
        src="/pulse-analytics-logo-black-transparent.png"
        alt="Pulse Analytics"
        className="w-full h-auto object-contain"
        sizes="(max-width: 768px) 100px, 150px"
        priority
        fill
      />
    </div>
  );
};

export default Logo;
