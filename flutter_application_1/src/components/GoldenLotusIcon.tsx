import React from 'react';

interface GoldenLotusIconProps {
  size?: number;
  className?: string;
  hasGlow?: boolean;
}

export const GoldenLotusIcon: React.FC<GoldenLotusIconProps> = ({
  size = 36,
  className = '',
  hasGlow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: hasGlow ? 'drop-shadow(0 2px 8px rgba(203, 163, 88, 0.45))' : undefined,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <defs>
        <linearGradient id="gold-petal-main" x1="32" y1="8" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBF2D5" />
          <stop offset="0.5" stopColor="#E5C171" />
          <stop offset="1" stopColor="#CBA358" />
        </linearGradient>
        <linearGradient id="gold-petal-side" x1="32" y1="18" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF9E6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D9AC59" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Central Tall Petal */}
      <path
        d="M32 9C32 9 39 22 39 35C39 42 36 47 32 49C28 47 25 42 25 35C25 22 32 9 32 9Z"
        fill="url(#gold-petal-main)"
        stroke="#CBA358"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Left Inner Petal */}
      <path
        d="M29 20C29 20 18 26 14 36C11 44 14 49 19 49C25 49 30 42 31 38"
        fill="url(#gold-petal-side)"
        stroke="#CBA358"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Inner Petal */}
      <path
        d="M35 20C35 20 46 26 50 36C53 44 50 49 45 49C39 49 34 42 33 38"
        fill="url(#gold-petal-side)"
        stroke="#CBA358"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Left Outer Petal */}
      <path
        d="M23 35C23 35 11 38 9 46C7 52 12 54 17 54C23 54 29 48 31 45"
        stroke="#CBA358"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Lower Right Outer Petal */}
      <path
        d="M41 35C41 35 53 38 55 46C57 52 52 54 47 54C41 54 35 48 33 45"
        stroke="#CBA358"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Golden Seed / Core Jewel */}
      <circle cx="32" cy="50" r="1.8" fill="#CBA358" />
    </svg>
  );
};
