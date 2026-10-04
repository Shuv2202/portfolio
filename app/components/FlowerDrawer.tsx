"use client";

import { useEffect, useRef, useState } from "react";

type DrawMode = "flowers" | "cartoon" | "anime";

type DrawnItem = {
  id: number;
  mode: DrawMode;
  x: number;
  y: number;
  size: number;
  variantIndex: number;
  color: string;
  centerColor: string;
  rotation: number;
};

type FlowerSize = "S" | "M" | "L";

const SIZE_MAP: Record<FlowerSize, { min: number; max: number; label: string }> = {
  S: { min: 16, max: 24, label: "Small" },
  M: { min: 32, max: 44, label: "Medium" },
  L: { min: 54, max: 74, label: "Large" },
};

const PALETTES = [
  { main: "#ff85a2", accent: "#ffee93" }, // Pink / Yellow
  { main: "#ffd166", accent: "#704010" }, // Sunflower Yellow
  { main: "#b5e2fa", accent: "#edafb8" }, // Soft Sky Blue
  { main: "#ff70a6", accent: "#ff9770" }, // Coral
  { main: "#c77dff", accent: "#e0aaff" }, // Violet
  { main: "#70e4d5", accent: "#38b000" }, // Mint
  { main: "#ffffff", accent: "#ffb703" }, // Classic Daisy White
];

export default function FlowerDrawer() {
  const [isActive, setIsActive] = useState(false);
  const [drawMode, setDrawMode] = useState<DrawMode>("flowers");
  const [selectedSize, setSelectedSize] = useState<FlowerSize>("S");
  const [drawnItems, setDrawnItems] = useState<DrawnItem[]>([]);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const addItem = (clientX: number, clientY: number) => {
    const pageX = clientX + window.scrollX;
    const pageY = clientY + window.scrollY;

    const { min, max } = SIZE_MAP[selectedSize];
    const baseSize = Math.floor(Math.random() * (max - min)) + min;
    const minDistance = baseSize * 0.7;

    const dist = Math.hypot(pageX - lastPos.current.x, pageY - lastPos.current.y);
    if (isDragging.current && dist < minDistance) return;

    lastPos.current = { x: pageX, y: pageY };

    const randomPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const newItem: DrawnItem = {
      id: Date.now() + Math.random(),
      mode: drawMode,
      x: pageX,
      y: pageY,
      size: baseSize,
      variantIndex: Math.floor(Math.random() * 5),
      color: randomPalette.main,
      centerColor: randomPalette.accent,
      rotation: Math.floor(Math.random() * 360),
    };

    setDrawnItems((prev) => [...prev.slice(-120), newItem]);
  };

  useEffect(() => {
    if (!isActive) {
      document.body.classList.remove("is-pencil-active");
      return;
    }

    document.body.classList.add("is-pencil-active");

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(".flower-drawer-controls")) return;

      isDragging.current = true;
      addItem(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      addItem(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.body.classList.remove("is-pencil-active");
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isActive, drawMode, selectedSize]);

  return (
    <>
      {/* Selection Lock & Capture Overlay */}
      {isActive && <div className="pencil-active-overlay" aria-hidden="true" />}

      {/* Drawn Items Layer */}
      <div
        className="flower-canvas-overlay"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 8888,
          overflow: "hidden",
        }}
      >
        {drawnItems.map((item) => (
          <div
            key={item.id}
            className="blooming-flower"
            style={{
              position: "absolute",
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            }}
          >
            {item.mode === "flowers" ? (
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <g fill={item.color} stroke="rgba(0,0,0,0.18)" strokeWidth="3">
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <ellipse
                      key={angle}
                      cx="50"
                      cy="22"
                      rx="14"
                      ry="22"
                      transform={`rotate(${angle} 50 50)`}
                    />
                  ))}
                </g>
                <circle cx="50" cy="50" r="15" fill={item.centerColor} stroke="rgba(0,0,0,0.22)" strokeWidth="3" />
              </svg>
            ) : item.mode === "cartoon" ? (
              <RenderCartoonDoodle item={item} />
            ) : (
              <RenderAnimeDoodle item={item} />
            )}
          </div>
        ))}
      </div>

      {/* Pencil Tool Floating Controls */}
      <div className="flower-drawer-controls">
        {isActive && (
          <div className="flower-drawer-badge">
            {/* Draw Mode Switcher */}
            <div className="flower-mode-selector" aria-label="Select Drawing Mode">
              <button
                type="button"
                className={`mode-btn ${drawMode === "flowers" ? "is-selected" : ""}`}
                onClick={() => setDrawMode("flowers")}
                title="Flowers Mode"
              >
                🌸 Flowers
              </button>
              <button
                type="button"
                className={`mode-btn ${drawMode === "cartoon" ? "is-selected" : ""}`}
                onClick={() => setDrawMode("cartoon")}
                title="Cartoon Mode"
              >
                🎨 Cartoon
              </button>
              <button
                type="button"
                className={`mode-btn ${drawMode === "anime" ? "is-selected" : ""}`}
                onClick={() => setDrawMode("anime")}
                title="Anime Mode"
              >
                ✨ Anime
              </button>
            </div>

            {/* Size Selector */}
            <div className="flower-size-selector" aria-label="Select size">
              {(["S", "M", "L"] as FlowerSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`size-btn ${selectedSize === sz ? "is-selected" : ""}`}
                  onClick={() => setSelectedSize(sz)}
                  title={`Size: ${SIZE_MAP[sz].label}`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Clear Button */}
            {drawnItems.length > 0 && (
              <button
                type="button"
                className="flower-clear-btn"
                onClick={() => setDrawnItems([])}
                title="Clear drawings"
              >
                <span className="clear-icon">🧹</span>
                <span className="clear-label">Clear</span>
                <span className="count-badge">{drawnItems.length}</span>
              </button>
            )}
          </div>
        )}

        {/* Floating Pencil Button */}
        <button
          type="button"
          className={`pencil-toggle-btn pencil-toggle-btn--small ${isActive ? "is-active" : ""}`}
          onClick={() => setIsActive(!isActive)}
          data-cursor-text={isActive ? "Stop drawing" : "Draw canvas"}
          aria-label="Toggle pencil drawing tool"
          title={isActive ? "Stop drawing" : "Draw flowers, cartoon & anime"}
        >
          <span className="pencil-icon">✏️</span>
          <span className="pencil-label">{isActive ? "Close" : "Pencil"}</span>
        </button>
      </div>
    </>
  );
}

function RenderCartoonDoodle({ item }: { item: DrawnItem }) {
  const v = item.variantIndex % 4;
  if (v === 0) {
    // Cute Bear Face
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="28" cy="28" r="14" fill="#d4a373" stroke="#5c3d2e" strokeWidth="3" />
        <circle cx="72" cy="28" r="14" fill="#d4a373" stroke="#5c3d2e" strokeWidth="3" />
        <circle cx="50" cy="56" r="32" fill="#e9edc9" stroke="#5c3d2e" strokeWidth="3.5" />
        <ellipse cx="50" cy="62" rx="14" ry="10" fill="#ffffff" stroke="#5c3d2e" strokeWidth="2.5" />
        <ellipse cx="50" cy="58" rx="6" ry="4" fill="#5c3d2e" />
        <circle cx="38" cy="50" r="3.5" fill="#5c3d2e" />
        <circle cx="62" cy="50" r="3.5" fill="#5c3d2e" />
      </svg>
    );
  }
  if (v === 1) {
    // Cartoon Star with Cute Eyes
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon
          points="50,5 64,36 98,39 72,62 80,95 50,76 20,95 28,62 2,39 36,36"
          fill="#ffe66d"
          stroke="#457b9d"
          strokeWidth="3.5"
        />
        <circle cx="40" cy="46" r="3" fill="#1d3557" />
        <circle cx="60" cy="46" r="3" fill="#1d3557" />
        <path d="M 44 58 Q 50 64 56 58" fill="none" stroke="#1d3557" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (v === 2) {
    // Mushroom
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="36" y="52" width="28" height="38" rx="14" fill="#fefae0" stroke="#283618" strokeWidth="3.5" />
        <path d="M 12 52 C 12 20, 88 20, 88 52 Z" fill="#e63946" stroke="#283618" strokeWidth="3.5" />
        <circle cx="36" cy="38" r="7" fill="#ffffff" />
        <circle cx="64" cy="38" r="7" fill="#ffffff" />
        <circle cx="50" cy="28" r="5" fill="#ffffff" />
      </svg>
    );
  }
  // Cute Fluffy Cloud
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path
        d="M 25 68 A 18 18 0 0 1 25 36 A 22 22 0 0 1 70 32 A 20 20 0 0 1 80 68 Z"
        fill="#a8dede"
        stroke="#1d3557"
        strokeWidth="3.5"
      />
      <circle cx="42" cy="52" r="3" fill="#1d3557" />
      <circle cx="60" cy="52" r="3" fill="#1d3557" />
      <ellipse cx="36" cy="56" rx="4" ry="2.5" fill="#ffb5a7" />
      <ellipse cx="66" cy="56" rx="4" ry="2.5" fill="#ffb5a7" />
    </svg>
  );
}

function RenderAnimeDoodle({ item }: { item: DrawnItem }) {
  const v = item.variantIndex % 4;
  if (v === 0) {
    // Glowing 4-Point Anime Sparkle
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path
          d="M 50 5 Q 50 50 95 50 Q 50 50 50 95 Q 50 50 5 50 Q 50 50 50 5 Z"
          fill="#ffc6ff"
          stroke="#7209b7"
          strokeWidth="3"
        />
        <circle cx="50" cy="50" r="8" fill="#ffffff" />
      </svg>
    );
  }
  if (v === 1) {
    // Dango Skewer
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="50" y1="90" x2="50" y2="10" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="72" r="14" fill="#b5e7a0" stroke="#2d5a27" strokeWidth="3" />
        <circle cx="50" cy="48" r="14" fill="#ffffff" stroke="#555" strokeWidth="3" />
        <circle cx="50" cy="24" r="14" fill="#ffb7b2" stroke="#b23b3b" strokeWidth="3" />
      </svg>
    );
  }
  if (v === 2) {
    // Naruto Spiral Fishcake (Narutomaki)
    return (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <polygon points="50,8 85,28 85,72 50,92 15,72 15,28" fill="#ffffff" stroke="#e63946" strokeWidth="4" />
        <path
          d="M 50 50 m -20 0 a 20 20 0 1 0 40 0 a 14 14 0 1 0 -28 0 a 8 8 0 1 0 16 0"
          fill="none"
          stroke="#ff4d6d"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // Anime Crescent Moon with Stars
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path
        d="M 65 15 A 35 35 0 1 0 85 70 A 28 28 0 1 1 65 15 Z"
        fill="#f8de7e"
        stroke="#4a4e69"
        strokeWidth="3.5"
      />
      <polygon points="25,30 29,38 38,39 31,45 33,54 25,49 17,54 19,45 12,39 21,38" fill="#9a8c98" />
    </svg>
  );
}
