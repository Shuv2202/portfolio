"use client";

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="manifesto-section section-shell">
      {/* 4 Corner dashed crosshair targets */}
      <div className="crosshair crosshair--top-left" aria-hidden="true">
        <span>+</span>
      </div>
      <div className="crosshair crosshair--top-right" aria-hidden="true">
        <span>+</span>
      </div>
      <div className="crosshair crosshair--bottom-left" aria-hidden="true">
        <span>+</span>
      </div>
      <div className="crosshair crosshair--bottom-right" aria-hidden="true">
        <span>+</span>
      </div>

      {/* Floating Tilted Yellow Sticky Note */}
      <div className="sticky-note reveal-on-scroll">
        <div className="sticky-note__tape" aria-hidden="true" />
        <div className="sticky-note__pins" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="sticky-note__text">
          I care about clean code, intuitive user flows, and reliable software. Always in “let me build this” mode, curious, coding, and solving problems.
        </p>
      </div>

      {/* Centered Typography & Badges */}
      <div className="manifesto-body reveal-on-scroll">
        <p className="manifesto-line manifesto-line--1">
          I turn ideas <span className="inline-icon inline-icon--brain" aria-label="brain icon">🧠</span> into full-stack web applications and ship responsive user experiences <span className="inline-badge">at speed.</span>
        </p>
        
        <p className="manifesto-line manifesto-line--2">
          <span className="inline-sparkle" aria-hidden="true">✨</span>
          <span className="inline-badge inline-badge--bordered">I build with AI,</span> prototyping modern products and exploring the edge of design &amp; development.
        </p>
      </div>
    </section>
  );
}
