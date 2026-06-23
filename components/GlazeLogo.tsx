// The Glaze brand mark: a gradient tile with a glossy "glaze" sheen and a white
// code window showing purple/pink/blue code bars — the same artwork as the
// favicon (app/icon.svg). Size it with a className (e.g. "h-7 w-7").

export function GlazeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gl-tile" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9b5de5" />
          <stop offset="0.5" stopColor="#f15bb5" />
          <stop offset="1" stopColor="#4361ee" />
        </linearGradient>
        <linearGradient id="gl-gloss" x1="14" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="gl-clip">
          <rect x="3" y="3" width="58" height="58" rx="16" />
        </clipPath>
        <filter id="gl-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#170a2b" floodOpacity="0.38" />
        </filter>
      </defs>

      <rect x="3" y="3" width="58" height="58" rx="16" fill="url(#gl-tile)" />
      <g clipPath="url(#gl-clip)">
        <ellipse cx="20" cy="4" rx="42" ry="28" fill="url(#gl-gloss)" />
      </g>

      <g filter="url(#gl-shadow)">
        <rect x="15" y="18" width="34" height="28" rx="5" fill="#ffffff" />
      </g>
      <circle cx="21" cy="24" r="1.5" fill="#d4d4dd" />
      <circle cx="26" cy="24" r="1.5" fill="#d4d4dd" />
      <circle cx="31" cy="24" r="1.5" fill="#d4d4dd" />
      <rect x="20" y="30" width="18" height="3" rx="1.5" fill="#9b5de5" />
      <rect x="20" y="35.5" width="11" height="3" rx="1.5" fill="#f15bb5" />
      <rect x="20" y="41" width="15" height="3" rx="1.5" fill="#4361ee" />
    </svg>
  );
}
