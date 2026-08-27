"use client";

export default function TornPaperHeader() {
  return (
    <div className="torn-paper-banner hero-reveal hero-reveal--2" aria-hidden="true">
      {/* Torn paper scrap background */}
      <div className="torn-paper-scrap">
        <svg viewBox="0 0 520 180" className="torn-paper-svg" preserveAspectRatio="none">
          <path
            d="M 10 20 
               Q 60 12, 110 22 
               T 210 16 
               T 310 24 
               T 410 14 
               T 510 22 
               L 505 160 
               Q 450 170, 390 155 
               T 290 168 
               T 190 158 
               T 90 165 
               L 15 150 Z"
            fill="#eae4d6"
            stroke="#d4ccba"
            strokeWidth="1.5"
          />
        </svg>

        {/* Potted monstera houseplant on left */}
        <div className="torn-paper__plant">
          <svg viewBox="0 0 100 130" width="90" height="117">
            {/* White ceramic pot */}
            <ellipse cx="50" cy="115" rx="22" ry="7" fill="#d9d5cb" />
            <path d="M 30 85 L 34 115 Q 50 120 66 115 L 70 85 Z" fill="#f8f6f0" stroke="#d5d0c3" strokeWidth="2" />
            <ellipse cx="50" cy="85" rx="20" ry="5" fill="#e2ded4" />
            {/* Soil */}
            <ellipse cx="50" cy="85" rx="18" ry="4" fill="#4a3e35" />
            {/* Stems & Leaves */}
            <path d="M 50 85 Q 40 60 25 35" stroke="#3d6335" strokeWidth="3" fill="none" />
            <path d="M 50 85 Q 52 55 58 25" stroke="#3d6335" strokeWidth="3" fill="none" />
            <path d="M 50 85 Q 65 65 80 45" stroke="#3d6335" strokeWidth="3" fill="none" />
            {/* Monstera leaves */}
            <path d="M 25 35 C 5 20, 0 45, 20 55 C 30 50, 32 40, 25 35 Z" fill="#466f3d" stroke="#2d4a27" strokeWidth="1" />
            <path d="M 58 25 C 45 5, 75 0, 75 25 C 70 35, 62 32, 58 25 Z" fill="#527d48" stroke="#2d4a27" strokeWidth="1" />
            <path d="M 80 45 C 95 30, 95 60, 75 65 C 68 60, 72 50, 80 45 Z" fill="#3b5e33" stroke="#2d4a27" strokeWidth="1" />
          </svg>
        </div>

        {/* Iced coffee glass with straw */}
        <div className="torn-paper__coffee">
          <svg viewBox="0 0 70 100" width="60" height="85">
            {/* Glass body */}
            <path d="M 15 15 L 20 85 Q 35 92 50 85 L 55 15 Z" fill="rgba(255,255,255,0.7)" stroke="#c2bbb0" strokeWidth="2" />
            {/* Milk and coffee gradient layer */}
            <path d="M 17 30 Q 35 25 53 30 L 49 83 Q 35 89 21 83 Z" fill="#c49e75" opacity="0.9" />
            <path d="M 18 50 Q 35 45 52 50 L 49 83 Q 35 89 21 83 Z" fill="#7a5533" opacity="0.95" />
            {/* Ice cubes */}
            <rect x="25" y="32" width="12" height="12" rx="3" fill="rgba(255,255,255,0.8)" transform="rotate(12 25 32)" />
            <rect x="36" y="42" width="11" height="11" rx="3" fill="rgba(255,255,255,0.75)" transform="rotate(-8 36 42)" />
            {/* Straw */}
            <path d="M 38 5 L 44 90" stroke="#e06353" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Yellow pencil pointing up-right */}
        <div className="torn-paper__pencil">
          <svg viewBox="0 0 20 140" width="16" height="112">
            {/* Eraser */}
            <rect x="4" y="0" width="12" height="14" rx="2" fill="#e88b88" />
            <rect x="4" y="14" width="12" height="6" fill="#b0b0b0" />
            {/* Yellow shaft */}
            <rect x="4" y="20" width="12" height="95" fill="#f0be3d" />
            <line x1="8" y1="20" x2="8" y2="115" stroke="#d6a329" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="12" y2="115" stroke="#d6a329" strokeWidth="1.5" />
            {/* Wood tip */}
            <path d="M 4 115 L 10 135 L 16 115 Z" fill="#e0c29e" />
            {/* Lead tip */}
            <path d="M 8 128 L 10 135 L 12 128 Z" fill="#2b2b2b" />
          </svg>
        </div>

        {/* Kraft tape strips holding paper */}
        <div className="torn-paper__tape torn-paper__tape--left" />
        <div className="torn-paper__tape torn-paper__tape--right" />
      </div>
    </div>
  );
}
