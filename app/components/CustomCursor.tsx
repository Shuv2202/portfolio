"use client";

import {
  useEffect,
  useRef,
} from "react";

export default function CustomCursor() {
  const dotRef =
    useRef<HTMLDivElement>(null);

  const followerRef =
    useRef<HTMLDivElement>(null);

  const labelRef =
    useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer =
      window.matchMedia(
        "(pointer: fine)",
      ).matches;

    if (!finePointer) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!dot || !follower || !label) {
      return;
    }

    document.documentElement.classList.add(
      "custom-cursor-enabled",
    );

    let mouseX = -100;
    let mouseY = -100;

    let followerX = -100;
    let followerY = -100;

    let animationFrame = 0;

    const handlePointerMove = (
      event: globalThis.PointerEvent,
    ) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform = `
        translate3d(
          ${mouseX}px,
          ${mouseY}px,
          0
        )
        translate(-50%, -50%)
      `;

      dot.classList.add("is-visible");
      follower.classList.add("is-visible");

      const target = (
        event.target as HTMLElement
      ).closest<HTMLElement>(
        "[data-cursor], a, button, input",
      );

      if (target) {
        const text =
          target.dataset.cursorText ?? "";

        const mode =
          target.dataset.cursorMode ??
          "action";

        label.textContent = text;

        follower.dataset.mode = mode;

        follower.classList.add(
          "is-active",
        );

        follower.classList.toggle(
          "has-label",
          Boolean(text),
        );
      } else {
        label.textContent = "";

        follower.dataset.mode =
          "default";

        follower.classList.remove(
          "is-active",
          "has-label",
        );
      }
    };

    const animate = () => {
      const smoothing = 0.13;

      followerX +=
        (mouseX - followerX) *
        smoothing;

      followerY +=
        (mouseY - followerY) *
        smoothing;

      follower.style.transform = `
        translate3d(
          ${followerX}px,
          ${followerY}px,
          0
        )
        translate(-50%, -50%)
      `;

      animationFrame =
        requestAnimationFrame(animate);
    };

    const handlePointerDown = () => {
      dot.classList.add("is-pressed");

      follower.classList.add(
        "is-pressed",
      );
    };

    const handlePointerUp = () => {
      dot.classList.remove("is-pressed");

      follower.classList.remove(
        "is-pressed",
      );
    };

    const handleMouseLeave = () => {
      dot.classList.remove("is-visible");

      follower.classList.remove(
        "is-visible",
      );
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

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );

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

      document.documentElement.classList.remove(
        "custom-cursor-enabled",
      );
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />

      <div
        ref={followerRef}
        className="cursor-follower"
        data-mode="default"
        aria-hidden="true"
      >
        <span ref={labelRef} />
      </div>
    </>
  );
}
