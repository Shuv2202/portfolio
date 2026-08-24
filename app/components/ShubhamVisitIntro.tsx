"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type IntroProps = {
  onComplete?: () => void;
};

const scatter = [
  { x: "-25vw", y: "-18vh", rotate: -30 },
  { x: "18vw", y: "-22vh", rotate: 25 },
  { x: "-20vw", y: "18vh", rotate: 18 },
  { x: "26vw", y: "12vh", rotate: -25 },
  { x: "-12vw", y: "-25vh", rotate: 30 },
  { x: "30vw", y: "-8vh", rotate: -20 },
  { x: "-28vw", y: "8vh", rotate: 25 },
  { x: "16vw", y: "24vh", rotate: -30 },
  { x: "-18vw", y: "-20vh", rotate: 22 },
  { x: "25vw", y: "18vh", rotate: -24 },
  { x: "-24vw", y: "22vh", rotate: 28 },
  { x: "20vw", y: "-24vh", rotate: -20 },
];

const heroDirections = [
  { x: -100, y: -80 },
  { x: 0, y: -100 },
  { x: 100, y: -70 },
  { x: 0, y: 60 },
  { x: -100, y: 80 },
  { x: -40, y: 110 },
  { x: 100, y: 90 },
  { x: 100, y: 0 },
];

export default function ShubhamVisitIntro({
  onComplete,
}: IntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);
  const hasRunRef = useRef(false);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const intro = introRef.current;

    if (!intro) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      intro.style.display = "none";
      completeRef.current?.();
      return;
    }

    const context = gsap.context(() => {
      const seed = intro.querySelector<HTMLElement>(
        ".visit-intro__seed",
      );

      const name = intro.querySelector<HTMLElement>(
        ".visit-intro__name",
      );

      const letters = gsap.utils.toArray<HTMLElement>(
        ".visit-intro__letter",
      );

      const surnameLetters =
        gsap.utils.toArray<HTMLElement>(
          ".visit-intro__surname",
        );

      const spark = intro.querySelector<HTMLElement>(
        ".visit-intro__spark",
      );

      const subtitle = intro.querySelector<HTMLElement>(
        ".visit-intro__subtitle",
      );

      /*
       * Existing hero objects.
       */
      const heroObjects =
        gsap.utils.toArray<HTMLElement>(
          ".hero-reveal",
        );

      gsap.set(intro, {
        clipPath: "circle(150vmax at 50% 50%)",
      });

      gsap.set(letters, {
        autoAlpha: 0,

        x: (index) => scatter[index].x,
        y: (index) => scatter[index].y,

        rotation: (index) =>
          scatter[index].rotate,

        scale: 0.55,
      });

      gsap.set(seed, {
        autoAlpha: 0,
        scale: 0.3,
      });

      gsap.set(spark, {
        autoAlpha: 0,
      });

      gsap.set(subtitle, {
        autoAlpha: 0,
        y: 10,
      });

      /*
       * Hide homepage objects until the circle reveal.
       */
      gsap.set(heroObjects, {
        autoAlpha: 0,

        x: (index) =>
          heroDirections[index]?.x ?? 0,

        y: (index) =>
          heroDirections[index]?.y ?? 70,

        scale: 0.82,
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          completeRef.current?.();
        },
      });

      timeline

        /*
         * STEP 1:
         * First S appears in the center.
         */
        .to(seed, {
          autoAlpha: 1,
          scale: 1.35,

          duration: 0.75,
          ease: "power4.out",
        })

        .to(seed, {
          scale: 0.9,

          duration: 0.45,
          ease: "power2.inOut",
        })

        /*
         * STEP 2:
         * Hide the large initial S completely before scattered letters assemble.
         */
        .to(seed, {
          autoAlpha: 0,
          scale: 0.4,

          duration: 0.25,
          ease: "power2.in",
        })

        /*
         * Scattered letters assemble into "Shubham Kumar".
         */
        .to(
          letters,
          {
            autoAlpha: 1,

            x: 0,
            y: 0,

            rotation: 0,
            scale: 1,

            duration: 1.25,

            stagger: {
              each: 0.07,
              from: "random",
            },

            ease: "back.out(1.8)",
          },
          "+=0.05",
        )

        /*
         * Show subtitle.
         */
        .to(
          subtitle,
          {
            autoAlpha: 1,
            y: 0,

            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        )

        /*
         * Italic Kumar effect.
         */
        .to(surnameLetters, {
          fontStyle: "italic",
          skewX: -7,

          duration: 0.4,
          ease: "power2.out",
        })

        /*
         * STEP 3:
         * Glowing dot travels over the name.
         */
        .fromTo(
          spark,
          {
            autoAlpha: 0,
            left: "-5%",
            top: "-30%",
            scale: 0.4,
          },
          {
            autoAlpha: 1,
            left: "100%",
            top: "-5%",
            scale: 1.3,

            duration: 0.9,
            ease: "power2.inOut",
          },
        )

        .to(spark, {
          autoAlpha: 0,
          scale: 0,

          duration: 0.18,
        })

        /*
         * Hold the completed name briefly.
         */
        .to(name, {
          scale: 1.035,

          duration: 0.3,
          repeat: 1,
          yoyo: true,

          ease: "power2.inOut",
        })

        .to({}, { duration: 0.45 })

        /*
         * STEP 4:
         * Dark circle shrinks and reveals the website.
         */
        .to(intro, {
          clipPath: "circle(0px at 50% 50%)",

          duration: 1.35,
          ease: "power4.inOut",
        })

        /*
         * STEP 5:
         * Portfolio objects enter after reveal.
         */
        .to(
          heroObjects,
          {
            autoAlpha: 1,

            x: 0,
            y: 0,

            scale: 1,

            duration: 0.9,

            stagger: {
              each: 0.11,
              from: "start",
            },

            ease: "back.out(1.35)",

            clearProps:
              "transform,opacity,visibility",
          },
          "-=1.05",
        )

        .set(intro, {
          display: "none",
        });
    }, intro);

    return () => context.revert();
  }, []);

  const firstName = "Shubham";
  const lastName = "Kumar";

  return (
    <div
      ref={introRef}
      className="visit-intro"
      aria-hidden="true"
    >
      <div className="visit-intro__noise" />

      <span className="visit-intro__star visit-intro__star--one" />
      <span className="visit-intro__star visit-intro__star--two" />
      <span className="visit-intro__star visit-intro__star--three" />

      <span className="visit-intro__seed">
        S
      </span>

      <div className="visit-intro__content">
        <div className="visit-intro__name">
          {firstName
            .split("")
            .map((letter, index) => (
              <span
                className="visit-intro__letter"
                key={`first-${index}`}
              >
                {letter}
              </span>
            ))}

          <span className="visit-intro__gap" />

          {lastName
            .split("")
            .map((letter, index) => (
              <span
                className="
                  visit-intro__letter
                  visit-intro__surname
                "
                key={`last-${index}`}
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
