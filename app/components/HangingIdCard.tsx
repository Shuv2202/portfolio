"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type PhysicsState = {
  angle: number;
  target: number;
  velocity: number;
  dragging: boolean;
  startX: number;
  startY: number;
  dragDistance: number;
  lastX: number;
  lastTime: number;
  pointerVelocity: number;
};

const clamp = (
  value: number,
  minimum: number,
  maximum: number,
) => Math.min(maximum, Math.max(minimum, value));

export default function HangingIdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendulumRef = useRef<HTMLDivElement>(null);
  const [isIllustrated, setIsIllustrated] = useState(false);

  const physics = useRef<PhysicsState>({
    angle: -2.4,
    target: 0,
    velocity: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    dragDistance: 0,
    lastX: 0,
    lastTime: 0,
    pointerVelocity: 0,
  });

  useEffect(() => {
    const pendulum = pendulumRef.current;
    if (!pendulum) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      pendulum.style.transform = "rotate(-2.4deg)";
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startedAt) / 1000;

      /* Gentle continuous pendulum swing between -3.5deg and +3.5deg */
      const angle = Math.sin(elapsed * 1.4) * 3.5;
      const verticalLift = Math.abs(angle) * 0.06;

      pendulum.style.transform = `
        rotate(${angle.toFixed(3)}deg)
        translateY(${verticalLift.toFixed(2)}px)
      `;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleClick = () => {
    window.open(
      "https://www.instagram.com/thatsosubh/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div
      ref={containerRef}
      className="
        desk-object
        hanging-id
        hero-reveal
      "
      data-cursor-text="Instagram"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Visit Instagram profile @thatsosubh."
    >
      <div
        ref={pendulumRef}
        className="hanging-id__pendulum"
      >
        <div
          className="hanging-id__anchor"
          aria-hidden="true"
        />

        <div
          className="hanging-id__strap"
          aria-hidden="true"
        >
          <span>
            SHUBHAM · @THATSOSUBH
          </span>
        </div>

        <div
          className="hanging-id__hardware"
          aria-hidden="true"
        >
          <i />
          <span />
        </div>

        <article className="hanging-id__card">
          <div className="hanging-id__header">
            <span>SHUBHAM</span>
            <span>@thatsosubh</span>
          </div>

          <div className="hanging-id__description">
            <strong>Shubham Kumar</strong>

            <p>
              Building useful interfaces with
              code, curiosity, and visual craft.
            </p>
          </div>

          <div
            className="hanging-id__photo"
            onPointerEnter={() => setIsIllustrated(true)}
            onPointerLeave={() => setIsIllustrated(false)}
            onTouchStart={() => setIsIllustrated((prev) => !prev)}
          >
            <img
              src={isIllustrated ? "/assets/shubham-ghibli.png" : "/assets/profile.png"}
              alt="Portrait of Shubham Kumar"
              className={isIllustrated ? "is-illustrated" : ""}
            />

            <span className="hanging-id__status">
              <i />
              Available
            </span>
          </div>

          <div className="hanging-id__footer">
            <span>INSTAGRAM</span>
            <span>@THATSOSUBH</span>
          </div>
        </article>
      </div>
    </div>
  );
}
