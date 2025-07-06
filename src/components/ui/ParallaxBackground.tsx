import React from 'react';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children?: React.ReactNode;
  className?: string;
  parallaxFactor?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  children,
  className = '',
  parallaxFactor = 0.5,
  overlay = true,
  overlayOpacity = 0.4
}) => {
  const offset = useParallax(parallaxFactor);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offset}px)`,
          backgroundAttachment: 'fixed'
        }}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground; 