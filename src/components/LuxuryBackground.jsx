import React from 'react';
import bgImage from '../assets/Elegant Espresso Wave Gradient.png';

/**
 * LuxuryBackground
 * Directly displays the exact asset 'assets/Elegant Espresso Wave Gradient.png'
 * as a fixed, full-viewport background with no artificial overlays.
 */
export default function LuxuryBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor: '#291C0E',
      }}
      aria-hidden="true"
    />
  );
}
