"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!dot || !follower || !label) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    let mouseX = -100;
    let mouseY = -100;

    let followerX = -100;
    let followerY = -100;

    let animationFrame = 0;

    const updateCursorTarget = (event: PointerEvent) => {
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

      const element = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]"
      );

      if (element) {
        const text = element.dataset.cursorText ?? "VIEW";
        const mode = element.dataset.cursorMode ?? "action";

        label.textContent = text;
        follower.dataset.mode = mode;
        follower.classList.add("is-active");
      } else {
        label.textContent = "";
        follower.dataset.mode = "default";
        follower.classList.remove("is-active");
      }
    };

    const animateCursor = () => {
      const smoothing = 0.13;

      followerX += (mouseX - followerX) * smoothing;
      followerY += (mouseY - followerY) * smoothing;

      follower.style.transform = `
        translate3d(
          ${followerX}px,
          ${followerY}px,
          0
        )
        translate(-50%, -50%)
      `;

      animationFrame = requestAnimationFrame(animateCursor);
    };

    const handlePointerDown = () => {
      dot.classList.add("is-pressed");
      follower.classList.add("is-pressed");
    };

    const handlePointerUp = () => {
      dot.classList.remove("is-pressed");
      follower.classList.remove("is-pressed");
    };

    const handlePointerLeave = () => {
      dot.classList.remove("is-visible");
      follower.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", updateCursorTarget);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handlePointerLeave);

    animateCursor();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", updateCursorTarget);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
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
