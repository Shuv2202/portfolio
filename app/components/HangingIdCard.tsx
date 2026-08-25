"use client";

import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type PhysicsState = {
  angle: number;
  target: number;
  velocity: number;
  dragging: boolean;
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

  const physics = useRef<PhysicsState>({
    angle: -2.4,
    target: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    lastTime: 0,
    pointerVelocity: 0,
  });

  useEffect(() => {
    const pendulum = pendulumRef.current;

    if (!pendulum) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      pendulum.style.transform = "rotate(-2deg)";
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const state = physics.current;
      const elapsed = (now - startedAt) / 1000;

      /*
       * A small automatic movement makes the card
       * feel like it is naturally hanging.
       */
      const idleMovement = state.dragging
        ? 0
        : Math.sin(elapsed * 0.78) * 0.42;

      const restingTarget =
        state.target + idleMovement;

      const stiffness = state.dragging
        ? 0.18
        : 0.028;

      const damping = state.dragging
        ? 0.72
        : 0.955;

      state.velocity +=
        (restingTarget - state.angle) *
        stiffness;

      state.velocity *= damping;

      state.angle = clamp(
        state.angle + state.velocity,
        -24,
        24,
      );

      const verticalLift =
        Math.abs(state.angle) * 0.055;

      pendulum.style.transform = `
        rotate(${state.angle.toFixed(3)}deg)
        translateY(${verticalLift.toFixed(2)}px)
      `;

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const calculateAngle = (
    clientX: number,
    clientY: number,
  ) => {
    const container = containerRef.current;

    if (!container) return 0;

    const bounds =
      container.getBoundingClientRect();

    const pivotX =
      bounds.left + bounds.width / 2;

    const pivotY = bounds.top;

    const distanceY = Math.max(
      clientY - pivotY,
      80,
    );

    const angle =
      Math.atan2(
        clientX - pivotX,
        distanceY,
      ) *
      (180 / Math.PI);

    return clamp(angle, -22, 22);
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    const state = physics.current;

    state.dragging = true;

    state.target = calculateAngle(
      event.clientX,
      event.clientY,
    );

    state.lastX = event.clientX;
    state.lastTime = performance.now();
    state.pointerVelocity = 0;

    containerRef.current?.classList.add(
      "is-dragging",
    );
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const state = physics.current;

    if (!state.dragging) {
      const container =
        containerRef.current;

      if (!container) return;

      const bounds =
        container.getBoundingClientRect();

      const relativeX =
        (event.clientX - bounds.left) /
        bounds.width;

      state.target = clamp(
        (relativeX - 0.5) * 5.5,
        -3,
        3,
      );

      return;
    }

    const now = performance.now();

    const deltaTime = Math.max(
      now - state.lastTime,
      16,
    );

    state.pointerVelocity =
      (event.clientX - state.lastX) /
      deltaTime;

    state.lastX = event.clientX;
    state.lastTime = now;

    state.target = calculateAngle(
      event.clientX,
      event.clientY,
    );
  };

  const releaseCard = (
    event?: PointerEvent<HTMLDivElement>,
  ) => {
    const state = physics.current;

    if (!state.dragging) return;

    state.dragging = false;

    /*
     * Maintain a little momentum after release.
     */
    state.velocity += clamp(
      state.pointerVelocity * 2.1,
      -2.8,
      2.8,
    );

    state.target = 0;
    state.pointerVelocity = 0;

    if (
      event &&
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    containerRef.current?.classList.remove(
      "is-dragging",
    );
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    ) {
      return;
    }

    event.preventDefault();

    physics.current.velocity +=
      event.key === "ArrowLeft"
        ? -1.6
        : 1.6;

    physics.current.target = 0;
  };

  return (
    <div
      ref={containerRef}
      className="
        desk-object
        hanging-id
        hero-reveal
      "
      data-cursor-text="Drag my ID"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releaseCard}
      onPointerCancel={releaseCard}
      onPointerLeave={() => {
        if (!physics.current.dragging) {
          physics.current.target = 0;
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="
        Interactive hanging identity card.
        Drag it or use the arrow keys.
      "
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
            SHUBHAM · CREATIVE DEVELOPER
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
            <span>SK · 001</span>
          </div>

          <div className="hanging-id__description">
            <strong>Shubham Kumar</strong>

            <p>
              Building useful interfaces with
              code, curiosity, and visual craft.
            </p>
          </div>

          <div className="hanging-id__photo">
            <img
              src="/assets/profile.svg"
              alt="Portrait of Shubham Kumar"
            />

            <span className="hanging-id__status">
              <i />
              Available
            </span>
          </div>

          <div className="hanging-id__footer">
            <span>B.TECH CSE</span>
            <span>WEB DEVELOPER</span>
          </div>
        </article>
      </div>
    </div>
  );
}
