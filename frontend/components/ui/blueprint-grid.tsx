import React from "react";

export default function BlueprintGrid() {
  return (
    <div className="relative hidden md:block">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        style={{
          opacity: 0.4,
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Main Grid */}
        <pattern id="smallGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path 
            d="M 24 0 L 0 0 0 24" 
            fill="none" 
            stroke="#373737" 
            strokeWidth="0.2"
          />
        </pattern>
        <pattern id="grid" width="240" height="240" patternUnits="userSpaceOnUse">
          <rect width="240" height="240" fill="url(#smallGrid)"/>
          <path 
            d="M 240 0 L 0 0 0 240" 
            fill="none" 
            stroke="#373737" 
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Measurement Lines */}
        <line x1="120" y1="0" x2="120" y2="40" stroke="#373737" strokeWidth="0.5"/>
        <line x1="1320" y1="0" x2="1320" y2="40" stroke="#373737" strokeWidth="0.5"/>
        <line x1="120" y1="20" x2="1320" y2="20" stroke="#373737" strokeWidth="0.5"/>
        <text x="720" y="15" fill="#373737" fontSize="10" textAnchor="middle">1200px</text>

        {/* Corner Decorations */}
        <path d="M 40 40 L 80 40 L 80 80" stroke="#373737" strokeWidth="0.5" fill="none"/>
        <path d="M 1400 40 L 1360 40 L 1360 80" stroke="#373737" strokeWidth="0.5" fill="none"/>
        <path d="M 40 984 L 80 984 L 80 944" stroke="#373737" strokeWidth="0.5" fill="none"/>
        <path d="M 1400 984 L 1360 984 L 1360 944" stroke="#373737" strokeWidth="0.5" fill="none"/>

        {/* Grid Coordinates */}
        <text x="30" y="30" fill="#373737" fontSize="8">0,0</text>
        <text x="1410" y="30" fill="#373737" fontSize="8">1440,0</text>
        <text x="30" y="1014" fill="#373737" fontSize="8">0,1024</text>
        <text x="1410" y="1014" fill="#373737" fontSize="8">1440,1024</text>
      </svg>
    </div>
  );
} 