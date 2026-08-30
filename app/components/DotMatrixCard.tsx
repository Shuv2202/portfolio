"use client";

import { useState } from "react";

export default function DotMatrixCard() {
  const [activePattern, setActivePattern] = useState(0);

  // 7x7 matrix grid representations
  // 0: Figma "P" style logo
  // 1: "S" for Shubham
  // 2: Diamond / Sparkle
  const patterns = [
    // 0: "P" / Figma dot logo pattern (7x7)
    [
      [1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
    ],
    // 1: "S" pattern
    [
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    // 2: Sparkle / Diamond
    [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ],
  ];

  const togglePattern = () => {
    setActivePattern((prev) => (prev + 1) % patterns.length);
  };

  const grid = patterns[activePattern];

  return (
    <div
      className="dot-matrix-card desk-object hero-reveal hero-reveal--4"
      onClick={togglePattern}
      data-cursor-text="Click pattern"
      title="Click to toggle LED pattern"
      role="button"
      tabIndex={0}
    >
      <div className="dot-matrix-display">
        {grid.map((row, rIdx) => (
          <div key={`row-${rIdx}`} className="dot-matrix-row">
            {row.map((val, cIdx) => (
              <span
                key={`dot-${rIdx}-${cIdx}`}
                className={`dot-matrix-led ${val ? "dot-matrix-led--on" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
