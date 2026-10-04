"use client";

import { useEffect, useRef, useState } from "react";

type Flower = {
  id: number;
  x: number;
  y: number;
  size: number;
  petals: number;
  color: string;
  centerColor: string;
  rotation: number;
};

type FlowerSize = "S" | "M" | "L";

const SIZE_MAP: Record<FlowerSize, { min: number; max: number; label: string }> = {
  S: { min: 14, max: 22, label: "Small" },
  M: { min: 30, max: 42, label: "Medium" },
  L: { min: 54, max: 72, label: "Large" },
};

const FLOWER_COLORS = [
  { petal: "#ff85a2", center: "#ffee93" }, // Pink
  { petal: "#ffd166", center: "#704010" }, // Sunflower Yellow
  { petal: "#b5e2fa", center: "#edafb8" }, // Soft Sky Blue
  { petal: "#ff70a6", center: "#ff9770" }, // Vibrant Coral
  { petal: "#c77dff", center: "#e0aaff" }, // Violet
  { petal: "#70e4d5", center: "#38b000" }, // Mint Green
  { petal: "#ffffff", center: "#ffb703" }, // Classic White Daisy
];

export default function FlowerDrawer() {
  const [isActive, setIsActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState<FlowerSize>("S"); // Default to small pencil as requested!
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const addFlower = (clientX: number, clientY: number) => {
    const pageX = clientX + window.scrollX;
    const pageY = clientY + window.scrollY;

    const { min, max } = SIZE_MAP[selectedSize];
    const baseSize = Math.floor(Math.random() * (max - min)) + min;
    const minDistance = baseSize * 0.7;

    const dist = Math.hypot(pageX - lastPos.current.x, pageY - lastPos.current.y);
    if (isDragging.current && dist < minDistance) return;

    lastPos.current = { x: pageX, y: pageY };

    const randomPalette = FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];
    const newFlower: Flower = {
      id: Date.now() + Math.random(),
      x: pageX,
      y: pageY,
      size: baseSize,
      petals: Math.random() > 0.35 ? 6 : 8,
      color: randomPalette.petal,
      centerColor: randomPalette.center,
      rotation: Math.floor(Math.random() * 360),
    };

    setFlowers((prev) => [...prev.slice(-120), newFlower]);
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
      addFlower(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      addFlower(e.clientX, e.clientY);
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
  }, [isActive, selectedSize]);

  return (
    <>
      {/* Active Pencil Overlay prevents accidental text selection & link triggers */}
      {isActive && <div className="pencil-active-overlay" aria-hidden="true" />}

      {/* Flower Overlay Layer */}
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
        {flowers.map((f) => (
          <div
            key={f.id}
            className="blooming-flower"
            style={{
              position: "absolute",
              left: `${f.x}px`,
              top: `${f.y}px`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              transform: `translate(-50%, -50%) rotate(${f.rotation}deg)`,
            }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <g fill={f.color} stroke="rgba(0,0,0,0.18)" strokeWidth="3">
                {Array.from({ length: f.petals }).map((_, i) => {
                  const angle = (360 / f.petals) * i;
                  return (
                    <ellipse
                      key={i}
                      cx="50"
                      cy="22"
                      rx="14"
                      ry="22"
                      transform={`rotate(${angle} 50 50)`}
                    />
                  );
                })}
              </g>
              <circle cx="50" cy="50" r="15" fill={f.centerColor} stroke="rgba(0,0,0,0.22)" strokeWidth="3" />
            </svg>
          </div>
        ))}
      </div>

      {/* Pencil Tool Floating Controls */}
      <div className="flower-drawer-controls">
        {isActive && (
          <div className="flower-drawer-badge">
            <span className="badge-hint">Click/drag to draw 🌸</span>

            {/* Size Selector Buttons */}
            <div className="flower-size-selector" aria-label="Select flower size">
              {(["S", "M", "L"] as FlowerSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`size-btn ${selectedSize === sz ? "is-selected" : ""}`}
                  onClick={() => setSelectedSize(sz)}
                  title={`Flower Size: ${SIZE_MAP[sz].label}`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Clear Button */}
            {flowers.length > 0 && (
              <button
                type="button"
                className="flower-clear-btn"
                onClick={() => setFlowers([])}
                title="Clear flowers"
              >
                <span className="clear-icon">🧹</span>
                <span className="clear-label">Clear</span>
                <span className="count-badge">{flowers.length}</span>
              </button>
            )}
          </div>
        )}

        {/* Small Pencil Button */}
        <button
          type="button"
          className={`pencil-toggle-btn pencil-toggle-btn--small ${isActive ? "is-active" : ""}`}
          onClick={() => setIsActive(!isActive)}
          data-cursor-text={isActive ? "Stop drawing" : "Draw flowers"}
          aria-label="Toggle pencil drawing tool"
          title={isActive ? "Stop drawing flowers" : "Draw flowers with pencil"}
        >
          <span className="pencil-icon">✏️</span>
          <span className="pencil-label">{isActive ? "Close" : "Pencil"}</span>
        </button>
      </div>
    </>
  );
}
