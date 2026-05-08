import type { JellyPetState } from '@/lib/types';

export function JellyVisual({
  compact = false,
  activity = 74,
  residual = 41,
  cache = 68,
  pet
}: {
  compact?: boolean;
  activity?: number;
  residual?: number;
  cache?: number;
  pet?: JellyPetState;
}) {
  const size = compact ? 260 : 460;
  const tentacles = pet?.tentacleCount ?? 8;
  const luminosity = pet?.luminosity ?? activity;
  const nodes = [activity, residual, cache, luminosity, 88];

  return (
    <div className="relative mx-auto animate-float" style={{ width: size, height: size }} aria-label="认知水母主视觉">
      <div className="absolute inset-10 rounded-full bg-tide/20 blur-3xl animate-pulseGlow" />
      <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tide/10 bg-[radial-gradient(circle,rgba(113,218,255,.18),transparent_62%)]" />
      <svg viewBox="0 0 460 460" className="relative h-full w-full animate-pulseGlow">
        <defs>
          <radialGradient id="bell" cx="50%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
            <stop offset="36%" stopColor="#83f7ff" stopOpacity="0.68" />
            <stop offset="68%" stopColor="#5668ff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ff9dce" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id="tent" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#83f7ff" stopOpacity="0.84" />
            <stop offset="0.54" stopColor="#6d7cff" stopOpacity="0.36" />
            <stop offset="1" stopColor="#b9ffd8" stopOpacity="0.04" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M82 188 C96 68 352 60 377 188 C331 238 139 240 82 188Z"
          fill="url(#bell)"
          stroke="#b9ffd8"
          strokeOpacity="0.62"
          strokeWidth="2"
          filter="url(#softGlow)"
        />
        <path d="M116 185 C160 144 303 144 348 187" fill="none" stroke="#fff" strokeOpacity="0.42" strokeWidth="2" />
        <path d="M143 123 C169 98 200 105 206 140 C228 104 271 95 294 125 C259 131 245 154 232 184 C209 151 178 135 143 123Z" fill="#b9ffd8" opacity="0.22" />

        {Array.from({ length: tentacles }).map((_, index) => {
          const x = 112 + index * (235 / Math.max(1, tentacles - 1));
          const drift = index % 2 === 0 ? 28 : -24;
          const width = index % 3 === 0 ? 4.8 : 2.8;
          return (
            <path
              key={index}
              className="tentacle"
              d={`M${x} 205 C${x + drift} 252 ${x - drift * 0.8} 314 ${x + drift * 0.4} 418`}
              fill="none"
              stroke="url(#tent)"
              strokeWidth={width}
              strokeLinecap="round"
            />
          );
        })}

        {nodes.map((node, index) => (
          <circle
            key={index}
            cx={70 + index * 78}
            cy={250 + (index % 2) * 70}
            r={4 + node / 20}
            fill={index % 2 ? '#9d7cff' : '#83f7ff'}
            opacity="0.84"
            filter="url(#softGlow)"
          >
            <animate attributeName="r" values={`${4 + node / 24};${8 + node / 18};${4 + node / 24}`} dur={`${3 + index}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
