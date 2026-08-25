"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia(
      "(pointer: fine)",
    ).matches;

    if (!hasFinePointer) return;

    const cursor = cursorRef.current;
    const textElement = textRef.current;

    if (!cursor || !textElement) return;

    document.documentElement.classList.add(
      "custom-cursor-enabled",
    );

    let mouseX = -100;
    let mouseY = -100;

    let cursorX = -100;
    let cursorY = -100;

    let animationFrame = 0;

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.classList.add("is-visible");

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "[data-cursor-text]",
            )
          : null;

      if (target) {
        const cursorText =
          target.dataset.cursorText || "VIEW";

        textElement.textContent = cursorText;

        /*
         * Calculate pill width from text length.
         */
        const calculatedWidth = Math.min(
          Math.max(
            cursorText.length * 6.2 + 32,
            82,
          ),
          230,
        );

        cursor.style.setProperty(
          "--cursor-label-width",
          `${calculatedWidth}px`,
        );

        cursor.classList.add("is-label");
      } else {
        textElement.textContent = "";

        cursor.classList.remove("is-label");
      }
    };

    const animateCursor = () => {
      /*
       * Lower number = more cursor delay.
       * Increase it for faster movement.
       */
      const smoothing = 0.16;

      cursorX +=
        (mouseX - cursorX) * smoothing;

      cursorY +=
        (mouseY - cursorY) * smoothing;

      cursor.style.transform = `
        translate3d(
          ${cursorX}px,
          ${cursorY}px,
          0
        )
        translate(-50%, -50%)
      `;

      animationFrame =
        requestAnimationFrame(animateCursor);
    };

    const handlePointerDown = () => {
      cursor.classList.add("is-pressed");
    };

    const handlePointerUp = () => {
      cursor.classList.remove("is-pressed");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("is-visible");
    };

    const handleMouseEnter = () => {
      cursor.classList.add("is-visible");
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave,
    );

    document.addEventListener(
      "mouseenter",
      handleMouseEnter,
    );

    animateCursor();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      document.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );

      document.documentElement.classList.remove(
        "custom-cursor-enabled",
      );
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="morph-cursor"
      aria-hidden="true"
    >
      <div className="morph-cursor__surface">
        <i />

        <span ref={textRef} />
      </div>
    </div>
  );
}
