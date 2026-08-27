"use client";

export default function PolaroidScrapbookCard() {
  return (
    <div className="polaroid-album hero-reveal hero-reveal--8" aria-label="Capture moments photo collage album">
      <div className="polaroid-album__paper">
        {/* Top left photo */}
        <div className="polaroid-photo polaroid-photo--1">
          <div className="polaroid-photo__tape polaroid-photo__tape--top" />
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
            alt="Ocean waves beach landscape"
          />
        </div>

        {/* Top right photo */}
        <div className="polaroid-photo polaroid-photo--2">
          <div className="polaroid-photo__tape polaroid-photo__tape--top-right" />
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80"
            alt="Mountain scenery landscape"
          />
        </div>

        {/* Center main cat photo */}
        <div className="polaroid-photo polaroid-photo--main">
          <div className="polaroid-photo__tape polaroid-photo__tape--center" />
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
            alt="Cat portrait"
          />
        </div>

        {/* Middle left photo */}
        <div className="polaroid-photo polaroid-photo--3">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
            alt="Koi fish pond"
          />
        </div>

        {/* Sunflower photo bottom right */}
        <div className="polaroid-photo polaroid-photo--4">
          <img
            src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80"
            alt="Bright sunflower"
          />
        </div>

        {/* Bottom left photo */}
        <div className="polaroid-photo polaroid-photo--5">
          <div className="polaroid-photo__tape polaroid-photo__tape--bottom" />
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80"
            alt="Field sunset"
          />
        </div>

        {/* Botanical leaf overlays */}
        <div className="polaroid-leaf polaroid-leaf--left" aria-hidden="true">
          <svg viewBox="0 0 50 80" width="40" height="64" fill="#4b6b3e">
            <path d="M25 0 C40 25, 45 50, 25 80 C5 50, 10 25, 25 0 Z" opacity="0.85" />
            <path d="M25 5 L25 75" stroke="#2d4224" strokeWidth="2" />
          </svg>
        </div>

        <div className="polaroid-leaf polaroid-leaf--right" aria-hidden="true">
          <svg viewBox="0 0 60 90" width="50" height="75" fill="#587e47">
            <path d="M30 0 C50 30, 55 60, 30 90 C5 60, 10 30, 30 0 Z" opacity="0.9" />
            <path d="M30 5 L30 85" stroke="#324928" strokeWidth="2" />
          </svg>
        </div>

        <span className="polaroid-album__caption">capture moments</span>
      </div>
    </div>
  );
}
