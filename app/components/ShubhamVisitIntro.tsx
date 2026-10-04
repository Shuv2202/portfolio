"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

type IntroProps = {
  onComplete?: () => void;
};

const firstName = "Shubham";
const lastName = "Kumar";

const scatter = [
  { x: "-25vw", y: "-18vh", rotation: -30 },
  { x: "18vw", y: "-22vh", rotation: 25 },
  { x: "-20vw", y: "18vh", rotation: 18 },
  { x: "26vw", y: "12vh", rotation: -25 },
  { x: "-12vw", y: "-25vh", rotation: 30 },
  { x: "30vw", y: "-8vh", rotation: -20 },
  { x: "-28vw", y: "8vh", rotation: 25 },
  { x: "16vw", y: "24vh", rotation: -30 },
  { x: "-18vw", y: "-20vh", rotation: 22 },
  { x: "25vw", y: "18vh", rotation: -24 },
  { x: "-24vw", y: "22vh", rotation: 28 },
  { x: "20vw", y: "-24vh", rotation: -20 },
];

export default function ShubhamVisitIntro({
  onComplete,
}: IntroProps) {
  const introRef =
    useRef<HTMLDivElement>(null);

  const timelineRef =
    useRef<ReturnType<
      typeof gsap.timeline
    > | null>(null);

  useLayoutEffect(() => {
    const intro = introRef.current;

    if (!intro) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      intro.style.display = "none";
      onComplete?.();
      return;
    }

    const letters =
      gsap.utils.toArray<HTMLElement>(
        ".visit-intro__letter",
      );

    const surname =
      gsap.utils.toArray<HTMLElement>(
        ".visit-intro__surname",
      );

    const heroObjects =
      gsap.utils.toArray<HTMLElement>(
        ".hero-reveal",
      );

    const seed =
      intro.querySelector(
        ".visit-intro__seed",
      );

    const subtitle =
      intro.querySelector(
        ".visit-intro__subtitle",
      );

    const spark =
      intro.querySelector(
        ".visit-intro__spark",
      );

    gsap.set(letters, {
      opacity: 0,

      x: (index) =>
        scatter[index]?.x ?? 0,

      y: (index) =>
        scatter[index]?.y ?? 0,

      rotation: (index) =>
        scatter[index]?.rotation ?? 0,

      scale: 0.55,
    });

    gsap.set(seed, {
      opacity: 0,
      scale: 0.3,
    });

    gsap.set(subtitle, {
      opacity: 0,
      y: 12,
    });

    gsap.set(spark, {
      opacity: 0,
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        intro.style.display = "none";
        onComplete?.();
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(seed, {
        opacity: 1,
        scale: 1.2,
        duration: 0.25,
        ease: "power4.out",
      })
      .to(seed, {
        opacity: 0,
        scale: 0.4,
        duration: 0.1,
      })
      .to(letters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.45,
        stagger: {
          each: 0.02,
          from: "center",
        },
        ease: "power3.out",
      })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
        },
        "-=0.15"
      )
      .to(intro, {
        clipPath: "circle(0px at 50% 50%)",
        duration: 0.35,
        ease: "power4.inOut",
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  const skipIntro = () => {
    timelineRef.current?.kill();

    gsap.set(".hero-reveal", {
      opacity: 1,

      clearProps:
        "transform,opacity,visibility",
    });

    if (introRef.current) {
      introRef.current.style.display =
        "none";
    }

    onComplete?.();
  };

  return (
    <div
      ref={introRef}
      className="visit-intro"
      aria-label="Portfolio introduction"
    >
      <div
        className="visit-intro__noise"
        aria-hidden="true"
      />

      <div
        className="visit-intro__meta"
        aria-hidden="true"
      >
        <span>SHUBHAM / 2026</span>
        <span>CREATIVE DEVELOPER</span>
      </div>

      <button
        type="button"
        className="visit-intro__skip"
        onClick={skipIntro}
      >
        Skip intro
      </button>

      <span className="visit-intro__seed">
        S
      </span>

      <div className="visit-intro__content">
        <div className="visit-intro__name">
          {firstName
            .split("")
            .map((letter, index) => (
              <span
                key={`first-${index}`}
                className="visit-intro__letter"
              >
                {letter}
              </span>
            ))}

          <span className="visit-intro__gap" />

          {lastName
            .split("")
            .map((letter, index) => (
              <span
                key={`last-${index}`}
                className="
                  visit-intro__letter
                  visit-intro__surname
                "
              >
                {letter}
              </span>
            ))}

          <span className="visit-intro__spark" />
        </div>

        <p className="visit-intro__subtitle">
          WEB DEVELOPER · PORTFOLIO 2026
        </p>
      </div>
    </div>
  );
}
