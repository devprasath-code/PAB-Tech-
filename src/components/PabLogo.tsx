import React from 'react';

interface PabLogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export default function PabLogo({ className = '', width = 160, height = 80, showText = true }: PabLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exquisitely drafted high-fidelity exact SVG representation of PAB Tech logo */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 540 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full"
      >
        <defs>
          {/* Chip Blue Border Gradient */}
          <linearGradient id="chipBorderGrad" x1="200" y1="80" x2="340" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B9BD5" />
            <stop offset="100%" stopColor="#2F5597" />
          </linearGradient>

          {/* PCB Track shadow */}
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* GREEN PCB TRACES (LEFT SIDE) */}
        {/* ======================================================== */}
        <g stroke="#76C043" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Top-most Left Traces */}
          <path d="M 190,110 L 155,110 L 125,75 L 80,75" />
          <path d="M 125,75 L 110,50 L 90,50" />
          
          {/* Upper Middle Left Traces */}
          <path d="M 190,132 L 165,132 L 140,105 L 105,105" />
          <path d="M 190,154 L 145,154 L 120,135 L 75,135" />

          {/* Lower Middle Left Traces */}
          <path d="M 190,176 L 150,176 L 125,200 L 95,200" />
          
          {/* Bottom-most Left Traces */}
          <path d="M 190,198 L 160,198 L 130,230 L 80,230" />
          <path d="M 130,230 L 115,255 L 95,255" />
        </g>

        {/* Nodes / Dots on Left Side Traces (Outer green open circles) */}
        <g stroke="#76C043" strokeWidth="3" fill="#171717">
          <circle cx="80" cy="75" r="6" />
          <circle cx="90" cy="50" r="6" />
          <circle cx="105" cy="105" r="6" />
          <circle cx="75" cy="135" r="6" />
          <circle cx="95" cy="200" r="6" />
          <circle cx="80" cy="230" r="6" />
          <circle cx="95" cy="255" r="6" />
        </g>

        {/* ======================================================== */}
        {/* GREEN PCB TRACES (RIGHT SIDE) - SYMMETRICAL MIRROR */}
        {/* ======================================================== */}
        <g stroke="#76C043" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Top-most Right Traces */}
          <path d="M 350,110 L 385,110 L 415,75 L 460,75" />
          <path d="M 415,75 L 430,50 L 450,50" />
          
          {/* Upper Middle Right Traces */}
          <path d="M 350,132 L 375,132 L 400,105 L 435,105" />
          <path d="M 350,154 L 395,154 L 420,135 L 465,135" />

          {/* Lower Middle Right Traces */}
          <path d="M 350,176 L 390,176 L 415,200 L 445,200" />
          
          {/* Bottom-most Right Traces */}
          <path d="M 350,198 L 380,198 L 410,230 L 460,230" />
          <path d="M 410,230 L 425,255 L 445,255" />
        </g>

        {/* Nodes / Dots on Right Side Traces (Outer green open circles) */}
        <g stroke="#76C043" strokeWidth="3" fill="#171717">
          <circle cx="460" cy="75" r="6" />
          <circle cx="450" cy="50" r="6" />
          <circle cx="435" cy="105" r="6" />
          <circle cx="465" cy="135" r="6" />
          <circle cx="445" cy="200" r="6" />
          <circle cx="460" cy="230" r="6" />
          <circle cx="445" cy="255" r="6" />
        </g>

        {/* ======================================================== */}
        {/* GREY CHIP PINS */}
        {/* ======================================================== */}
        <g fill="#A3A3A3">
          {/* Left Side Pins */}
          <rect x="180" y="105" width="10" height="10" rx="1.5" />
          <rect x="180" y="127" width="10" height="10" rx="1.5" />
          <rect x="180" y="149" width="10" height="10" rx="1.5" />
          <rect x="180" y="171" width="10" height="10" rx="1.5" />
          <rect x="180" y="193" width="10" height="10" rx="1.5" />

          {/* Right Side Pins */}
          <rect x="350" y="105" width="10" height="10" rx="1.5" />
          <rect x="350" y="127" width="10" height="10" rx="1.5" />
          <rect x="350" y="149" width="10" height="10" rx="1.5" />
          <rect x="350" y="171" width="10" height="10" rx="1.5" />
          <rect x="350" y="193" width="10" height="10" rx="1.5" />

          {/* Top Side Pins */}
          <rect x="202" y="80" width="10" height="10" rx="1.5" />
          <rect x="224" y="80" width="10" height="10" rx="1.5" />
          <rect x="306" y="80" width="10" height="10" rx="1.5" />
          <rect x="328" y="80" width="10" height="10" rx="1.5" />

          {/* Bottom Side Pins */}
          <rect x="202" y="210" width="10" height="10" rx="1.5" />
          <rect x="224" y="210" width="10" height="10" rx="1.5" />
          <rect x="265" y="210" width="10" height="10" rx="1.5" />
          <rect x="306" y="210" width="10" height="10" rx="1.5" />
          <rect x="328" y="210" width="10" height="10" rx="1.5" />
        </g>

        {/* ======================================================== */}
        {/* BLUE GRADIENT CHIP BODY */}
        {/* ======================================================== */}
        <rect
          x="190"
          y="90"
          width="160"
          height="120"
          rx="18"
          fill="white"
          stroke="url(#chipBorderGrad)"
          strokeWidth="10"
        />

        {/* PAB Label inside chip */}
        <text
          x="270"
          y="166"
          fill="#0F3E68"
          fontSize="48"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="1px"
        >
          PAB
        </text>

        {/* ======================================================== */}
        {/* GREEN UP ARROW WITH "AI" */}
        {/* ======================================================== */}
        <g fill="#76C043">
          {/* Arrow stem */}
          <rect x="250" y="55" width="40" height="36" transform="translate(-20, 0)" />
          {/* Arrow pointer */}
          <polygon points="270,36 230,58 310,58" />
        </g>
        {/* "AI" Text inside Arrow */}
        <text
          x="270"
          y="74"
          fill="white"
          fontSize="17"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          AI
        </text>

        {/* ======================================================== */}
        {/* GREEN GRADUATION CAP */}
        {/* ======================================================== */}
        <g fill="#76C043">
          {/* Diamond Plate (Rhombus) */}
          <polygon points="270,4 195,25 270,46 345,25" />
          
          {/* Skull Cap / Band below plate */}
          <path d="M 226,31 C 226,31 226,45 270,45 C 314,45 314,31 314,31 C 314,31 306,39 270,39 C 234,39 226,31 226,31 Z" />
          
          {/* Tassel on the right side */}
          <path d="M 270,25 L 333,25 L 333,48" stroke="#76C043" strokeWidth="3.5" strokeLinecap="round" />
          {/* Tassel bulb/fringe */}
          <polygon points="333,48 327,58 339,58" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-display font-black text-xl tracking-wider text-white leading-none">
            PAB <span className="text-brand-cyan">TECH</span>
          </span>
          <span className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5">
            Embedded Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
