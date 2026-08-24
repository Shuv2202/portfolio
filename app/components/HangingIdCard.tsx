"use client";

import { PointerEvent, useEffect, useRef } from "react";

type PhysicsState = {
  angle: number;
  target: number;
  velocity: number;
  dragging: boolean;
};

export default function HangingIdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendulumRef = useRef<HTMLDivElement>(null);

  const physics = useRef<PhysicsState>({
    angle: -3,
    target: 0,
    velocity: 0,
    dragging: false,
  });

  useEffect(() => {
    const pendulum = pendulumRef.current;
    if (!pendulum) return;

    let animationFrame = 0;

    const animate = () => {
      const state = physics.current;

      const stiffness = state.dragging ? 0.15 : 0.035;
      const damping = state.dragging ? 0.76 : 0.935;

      const springForce = (state.target - state.angle) * stiffness;

      state.velocity += springForce;
      state.velocity *= damping;

      state.angle += state.velocity;

      const verticalMovement = Math.abs(state.angle) * 0.12;

      pendulum.style.transform = `
        rotate(${state.angle}deg)
        translateY(${verticalMovement}px)
      `;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const calculateAngle = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return 0;

    const bounds = container.getBoundingClientRect();
    const pivotX = bounds.left + bounds.width / 2;
    const pivotY = bounds.top;

    const differenceX = clientX - pivotX;
    const differenceY = Math.max(clientY - pivotY, 50);

    const angle = Math.atan2(differenceX, differenceY) * (180 / Math.PI);

    return Math.max(-27, Math.min(27, angle));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    physics.current.dragging = true;
    physics.current.target = calculateAngle(event.clientX, event.clientY);

    containerRef.current?.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = physics.current;

    if (state.dragging) {
      const nextAngle = calculateAngle(event.clientX, event.clientY);

      state.velocity += (nextAngle - state.target) * 0.08;
      state.target = nextAngle;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;

    state.target = (relativeX - 0.5) * 8;
  };

  const releaseCard = (event: PointerEvent<HTMLDivElement> | undefined) => {
    const state = physics.current;
    state.dragging = false;
    state.target = 0;

    if (event && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    containerRef.current?.classList.remove("is-dragging");
  };

  return (
    <div
      ref={containerRef}
      className="desk-object hanging-id hero-reveal hero-reveal--1"
      data-cursor
      data-cursor-mode="drag"
      data-cursor-text="DRAG"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releaseCard}
      onPointerCancel={releaseCard}
      onPointerLeave={() => {
        if (!physics.current.dragging) {
          physics.current.target = 0;
        }
      }}
    >
      <div ref={pendulumRef} className="hanging-id__pendulum">
        <div className="hanging-id__anchor">
          <span />
        </div>

        <div className="hanging-id__strap">
          <span>SHUBHAM.DEV</span>
        </div>

        <div className="hanging-id__clip" />

        <article className="hanging-id__card">
          <div className="hanging-id__header">
            <span>SHUBHAM</span>
            <span>001</span>
          </div>

          <div className="hanging-id__description">
            <strong>Shubham Kumar</strong>
            <p>Love exploring, prototyping, storytelling, and visual craft.</p>
          </div>

          <div className="hanging-id__photo">
            <img src="/assets/profile.svg" alt="Shubham Kumar" />
            <span className="hanging-id__status">Available</span>
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
