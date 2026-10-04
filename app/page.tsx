"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import ShubhamVisitIntro from "./components/ShubhamVisitIntro";
import CustomCursor from "./components/CustomCursor";
import HangingIdCard from "./components/HangingIdCard";
import PolaroidScrapbookCard from "./components/PolaroidScrapbookCard";
import ManifestoSection from "./components/ManifestoSection";
import FinderProjectsSection from "./components/FinderProjectsSection";
import { toggleLofiAudio } from "./utils/lofiAudio";

type Project = {
  id: string;
  title: string;
  label: string;
  year: string;
  description: string;
  story: string;
  tags: string[];
  image: string;
  className: string;
  category: "product" | "frontend" | "creative";
  github: string;
  cursorText: string;
};

const projects: Project[] = [
  {
    id: "serveme",
    title: "ServeMe",
    label: "Restaurant Operating System",
    year: "2026",
    description:
      "A mobile-first QR ordering flow connecting guests, kitchens, and restaurant teams in real time.",
    story:
      "ServeMe turns a table QR into a complete ordering journey: browse the menu, place an order, follow kitchen progress, confirm payment, and leave feedback. The wider system includes vendor and kitchen workspaces built around one shared backend.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/assets/serveme.svg",
    className: "project-card--yellow",
    category: "product",
    github: "https://github.com/Shuv2202/finnal-website",
    cursorText: "View ServeMe case study",
  },
  {
    id: "mediscan",
    title: "MediScan AI",
    label: "AI Medical Reader",
    year: "2026",
    description:
      "AI-powered medical report analyzer providing instant summary insights and health metric breakdowns.",
    story:
      "MediScan helps users read complex medical lab reports by generating plain-language summaries, flag alerts, and visual health indicators.",
    tags: ["TypeScript", "AI", "Healthcare", "React"],
    image: "/assets/mediscan.svg",
    className: "project-card--ink",
    category: "product",
    github: "https://github.com/Shuv2202/MediScan",
    cursorText: "View MediScan project",
  },
  {
    id: "nexus",
    title: "Nexus Landing",
    label: "Responsive Product UX",
    year: "2026",
    description:
      "A polished product landing page focused on visual hierarchy, conversion flow, and responsive behavior.",
    story:
      "Built as a focused frontend exercise, Nexus combines a compact navigation system, strong headline hierarchy, feature storytelling, and touch-friendly layouts.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    image: "/assets/landing-page.svg",
    className: "project-card--blue",
    category: "frontend",
    github: "https://github.com/Shuv2202/OIBSIP-WEB-DEVELOPMENT-DESIGNING---Level-1-Task-1---Landing-Page-",
    cursorText: "View Nexus landing",
  },
];

const terminalCommands: Record<string, string> = {
  whoami: "Shubham Kumar — Full-Stack Developer & B.Tech CSE student.",
  skills: "React  TypeScript  Node.js  PostgreSQL  Python  REST APIs  Tailwind",
  projects: "serveme/  mediscan/  nexus-landing/",
  status: "Open to internships, freelance projects, and useful product ideas.",
  contact: "shuvm2000@gmail.com",
  help: "Try: whoami, skills, projects, status, contact, clear",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header className="site-nav">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Shubham Kumar, back to home">
        <span>SHUBHAM KUMAR</span>
      </a>

      <button
        className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>

      <nav id="primary-navigation" className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Primary navigation">
        <a href="#work" onClick={() => setMenuOpen(false)}>WORK</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
        <a href="#manifesto" onClick={() => setMenuOpen(false)}>PLAYGROUND</a>
        <a href="mailto:shuvm2000@gmail.com" target="_blank" rel="noreferrer" className="nav-resume-btn" data-cursor-text="RESUME">RESUME ↗</a>
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [focusMode, setFocusMode] = useState(false);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current?.style.setProperty("--pointer-x", x.toFixed(3));
    heroRef.current?.style.setProperty("--pointer-y", y.toFixed(3));
  };

  return (
    <section id="home" ref={heroRef} className="hero" onMouseMove={handlePointerMove}>
      <div className="hero__canvas">
        {/* Top Left: Hanging ID Card */}
        <HangingIdCard />

        {/* Top Right: Boarding Pass Ticket */}
        <div className="boarding-pass hero-reveal hero-reveal--3">
          <div className="boarding-pass__title">
            <strong>FULL-STACK ×<br />DEVELOPER</strong>
            <span>2026</span>
          </div>
          <div className="boarding-pass__meta">
            <span><small>LOCATION</small>INDIA</span>
            <span><small>STATUS</small>OPEN TO WORK</span>
          </div>
          <div className="boarding-pass__edge" aria-hidden="true">SK&nbsp;&nbsp;2026&nbsp;&nbsp;DEV</div>
        </div>

        {/* Hero Headline & Actions */}
        <div className="hero-title hero-reveal hero-reveal--4">
          <h1>I BUILD DIGITAL PRODUCTS.</h1>
          <span className="tagline-badge">“I THINK, THEN I BUILD.”</span>
          <p className="hero-subhead">
            Full-stack developer creating useful web applications, AI-powered experiences and interfaces that feel good to use.
          </p>
          <div className="hero-actions">
            <a href="#work" className="hero-btn hero-btn--primary" data-cursor-text="VIEW">VIEW MY WORK</a>
            <a href="mailto:shuvm2000@gmail.com" target="_blank" rel="noreferrer" className="hero-btn hero-btn--secondary" data-cursor-text="RESUME">RESUME ↗</a>
          </div>
          <div className="hero-status">
            <span className="status-dot" />
            <span>OPEN TO INTERNSHIPS / FREELANCE</span>
          </div>
        </div>

        {/* Center Right: Vinyl Record Playlist Card */}
        <button
          className="vinyl-card hero-reveal hero-reveal--5"
          type="button"
          onClick={() => {
            const active = toggleLofiAudio();
            setFocusMode(active);
          }}
          aria-pressed={focusMode}
          data-cursor-text={focusMode ? "Pause music" : "Play focus music"}
        >
          <span className={`vinyl ${focusMode ? "vinyl--playing" : ""}`} aria-hidden="true">
            <i className="vinyl__center-dot" />
          </span>
          <span className="vinyl-card__text">
            <small>PLAYLIST</small>
            <strong>{focusMode ? "Playing Vibe Beats ♫" : "Vibe coding playlist"}</strong>
            <em>{focusMode ? "Click to pause music" : "Click to play chill beats"}</em>
          </span>
        </button>

        {/* Center Right (below vinyl): Yellow macOS Folder Icon */}
        <button
          className="folder-card hero-reveal hero-reveal--6"
          type="button"
          onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
          data-cursor-text="Open projects"
        >
          <span className="folder-card__tab" aria-hidden="true" />
          <span className="folder-card__icon" aria-hidden="true">↳</span>
          <span><strong>projects/</strong><small>featured builds</small></span>
        </button>

        {/* Bottom Center: Signature Mini Terminal */}
        <div className="mini-terminal hero-reveal hero-reveal--7">
          <div className="window-bar">
            <span className="window-dots"><i /><i /><i /></span>
            <span>shubham@portfolio ~</span>
          </div>
          <div className="mini-terminal__body">
            <p><b>$</b> whoami</p>
            <span>full-stack developer</span>
            <p><b>$</b> ls interests/</p>
            <span>web/ ai/ design/ products/</span>
            <p className="mini-terminal__cursor"><b>$</b> <i className="blinking-cursor" /></p>
          </div>
        </div>

        {/* Bottom Right: Polaroid Scrapbook Card */}
        <PolaroidScrapbookCard />

        <a className="hero-scroll" href="#work"><span>Scroll to explore</span><i aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function ServeMeCaseStudyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="modal case-study-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__panel case-study-panel">
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close Case Study"><CloseIcon /></button>
        <header className="case-study__header">
          <span className="case-study__tag">FEATURED CASE STUDY</span>
          <h2>SERVEME</h2>
          <p className="case-study__sub">Restaurant ordering, reimagined. A QR-based ecosystem connecting customers, kitchen staff, and vendors.</p>
        </header>

        <section className="case-study__section">
          <h3>01 / THE PROBLEM</h3>
          <p>Traditional restaurant ordering creates unnecessary friction between customers, waitstaff, and kitchen dispatch—causing delayed orders, menu miscommunications, and slow billing during peak hours.</p>
        </section>

        <section className="case-study__section">
          <h3>02 / THE SOLUTION FLOW</h3>
          <div className="flow-diagram">
            <span>CUSTOMER</span> <i>→</i> <span>SCAN QR</span> <i>→</i> <span>MENU</span> <i>→</i> <span>ORDER</span> <i>→</i> <span>KITCHEN</span> <i>→</i> <span>VENDOR</span>
          </div>
        </section>

        <section className="case-study__section">
          <h3>03 / SYSTEM WORKSPACES</h3>
          <div className="workspace-preview-grid">
            <div className="workspace-card">
              <img src="/assets/serveme.svg" alt="ServeMe Guest Ordering UI" />
              <h4>01. Guest Mobile Ordering</h4>
              <p>Touch-friendly menu browsing, real-time cart, and instant order tracking directly from table QR code.</p>
            </div>
            <div className="workspace-card">
              <img src="/assets/landing-page.svg" alt="Kitchen Display System" />
              <h4>02. Kitchen Display System (KDS)</h4>
              <p>Real-time order ticket dispatch board tracking cooking timers and dish preparation status.</p>
            </div>
            <div className="workspace-card">
              <img src="/assets/portfolio.svg" alt="Vendor Management Console" />
              <h4>03. Vendor Admin Console</h4>
              <p>Centralized inventory management, menu pricing updates, and sales analytics console.</p>
            </div>
          </div>
        </section>

        <section className="case-study__section">
          <h3>04 / TECH ARCHITECTURE</h3>
          <div className="tech-matrix">
            <div><strong>FRONTEND</strong><span>React · TypeScript · CSS3</span></div>
            <div><strong>BACKEND</strong><span>Node.js · Express · REST APIs</span></div>
            <div><strong>DATABASE</strong><span>PostgreSQL · Supabase</span></div>
            <div><strong>DEPLOYMENT</strong><span>Vercel · Railway</span></div>
          </div>
        </section>

        <section className="case-study__section">
          <h3>05 / WHAT I LEARNED</h3>
          <ul className="takeaways-list">
            <li>Designing multi-user synchronized workflows across customers, kitchen, and vendor admin.</li>
            <li>Real-time order status updates and low-latency database queries.</li>
            <li>Mobile-first, high-accessibility UI patterns optimized for busy environments.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Work({ onOpenServeMe, onOpenProject }: { onOpenServeMe: () => void; onOpenProject: (project: Project) => void }) {
  return (
    <section id="work" className="work">
      <div className="section-shell">
        <div className="section-kicker section-kicker--dark reveal-on-scroll"><span>SELECTED WORK</span><p>FEATURED &amp; RECENT BUILDS</p></div>

        {/* HUGE FEATURED PROJECT 01 — SERVEME */}
        <div className="featured-project-card reveal-on-scroll">
          <span className="featured-card__badge">FEATURED PROJECT / FULL-STACK</span>
          <div className="featured-card__grid">
            <div className="featured-card__info">
              <span className="featured-card__num">01 — FEATURED</span>
              <h2>SERVEME</h2>
              <p className="featured-card__subtitle">Restaurant Operating System</p>
              <p className="featured-card__desc">
                A mobile-first QR ordering ecosystem connecting customers, kitchens, and restaurant management teams in real time.
              </p>

              <div className="featured-card__features">
                <span>QR MENU</span>
                <span>ORDER MANAGEMENT</span>
                <span>KITCHEN DASHBOARD</span>
                <span>VENDOR PORTAL</span>
              </div>

              <div className="chip-list">
                <span>React</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
              </div>

              <div className="featured-card__actions">
                <button type="button" className="btn-case-study" onClick={onOpenServeMe} data-cursor-text="CASE STUDY">
                  VIEW CASE STUDY ↗
                </button>
                <a href="https://github.com/Shuv2202/finnal-website" target="_blank" rel="noreferrer" className="btn-github">
                  GitHub <ArrowIcon />
                </a>
              </div>
            </div>

            <div className="featured-card__preview" onClick={onOpenServeMe} data-cursor-text="VIEW CASE STUDY">
              <img src="/assets/serveme.svg" alt="ServeMe Restaurant System UI" />
              <div className="preview-overlay">
                <span>EXPLORE SERVEME WORKFLOW ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER SELECTED PROJECTS GRID */}
        <div className="other-projects-grid reveal-on-scroll">
          {/* 02 - MEDISCAN */}
          <article className="project-card project-card--medium project-card--ink project-card--tilted-left">
            <button className="project-card__image" type="button" onClick={() => onOpenProject(projects[1])} data-cursor-text="VIEW">
              <img src="/assets/mediscan.svg" alt="MediScan AI Healthcare App" />
              <span>Open details <ArrowIcon /></span>
            </button>
            <div className="project-card__content">
              <div className="project-card__meta"><span>02 — AI / HEALTHCARE</span><span>2026</span></div>
              <h3>MediScan AI</h3>
              <p>AI-powered medical report analyzer providing instant summary insights and health metric breakdowns.</p>
              <div className="chip-list"><span>TypeScript</span><span>AI</span><span>React</span></div>
            </div>
          </article>

          {/* 03 - NEXUS */}
          <article className="project-card project-card--medium project-card--blue project-card--tilted-right">
            <button className="project-card__image" type="button" onClick={() => onOpenProject(projects[2])} data-cursor-text="VIEW">
              <img src="/assets/landing-page.svg" alt="Nexus Landing Page" />
              <span>Open details <ArrowIcon /></span>
            </button>
            <div className="project-card__content">
              <div className="project-card__meta"><span>03 — FRONTEND / PRODUCT</span><span>2026</span></div>
              <h3>Nexus Landing</h3>
              <p>Polished product landing page focused on visual hierarchy, conversion flow, and responsive touch layout.</p>
              <div className="chip-list"><span>HTML5</span><span>CSS3</span><span>JavaScript</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-shell">
      <div className="section-kicker reveal-on-scroll"><span>ABOUT</span><p>PERSONAL &amp; FOCUS</p></div>

      <div className="about__grid">
        <div className="about__copy reveal-on-scroll">
          <p className="script">A little about me</p>
          <h2>I turn ideas into <span>things people can actually use.</span></h2>
          <p>
            I&apos;m a full-stack developer who works across frontend, backend, and AI—building clean interfaces, practical products, and web experiences that don&apos;t feel boring.
          </p>
          <p>
            Currently exploring full-stack architecture, AI-powered products, and better ways to combine technology with design.
          </p>
        </div>

        <div className="about__meta-card reveal-on-scroll" style={{ padding: "28px", border: "1px solid var(--line)", background: "#fffdf7", borderRadius: "12px" }}>
          <div className="meta-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}><strong>BASED IN</strong><span>India</span></div>
          <div className="meta-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}><strong>FOCUS</strong><span>Full-Stack &amp; AI</span></div>
          <div className="meta-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}><strong>CURRENTLY</strong><span>Building ServeMe</span></div>
          <div className="meta-row" style={{ display: "flex", justifyContent: "space-between" }}><strong>STATUS</strong><span>Open to opportunities</span></div>
        </div>
      </div>

      {/* CURRENTLY SECTION */}
      <div className="currently-section reveal-on-scroll">
        <h3 className="currently-title">CURRENTLY</h3>
        <div className="currently-grid">
          <div className="currently-card">
            <span className="currently-num">01</span>
            <h4>BUILDING</h4>
            <p>ServeMe Restaurant Operating System</p>
          </div>
          <div className="currently-card">
            <span className="currently-num">02</span>
            <h4>LEARNING</h4>
            <p>Full-stack architecture &amp; backend systems</p>
          </div>
          <div className="currently-card">
            <span className="currently-num">03</span>
            <h4>EXPLORING</h4>
            <p>AI × Product Design</p>
          </div>
          <div className="currently-card">
            <span className="currently-num">04</span>
            <h4>LOOKING FOR</h4>
            <p>Internships / Freelance projects</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toolbox() {
  const skillProof = [
    { skill: "React", copy: "Used in → ServeMe & MediScan" },
    { skill: "TypeScript", copy: "Used in → ServeMe & Portfolio" },
    { skill: "Node.js / Express", copy: "Used in → ServeMe backend" },
    { skill: "PostgreSQL", copy: "Used in → ServeMe database" },
    { skill: "Python", copy: "Used in → AI & automation scripts" },
    { skill: "HTML / CSS", copy: "Used in → Nexus & Responsive UI" },
  ];

  return (
    <section className="toolbox section-shell">
      <div className="section-kicker reveal-on-scroll"><span>TOOLBOX</span><p>SKILLS → PROOF</p></div>
      <div className="section-heading reveal-on-scroll">
        <p className="script">What I work with</p>
        <h2>Practical tech stack backed by real code.</h2>
      </div>

      <div className="proof-grid">
        {skillProof.map((item) => (
          <div className="proof-card reveal-on-scroll" key={item.skill}>
            <h3>{item.skill}</h3>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shuvm2000@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:shuvm2000@gmail.com";
    }
  };

  return (
    <footer id="contact" className="contact">
      <div className="section-shell">
        <div className="contact__layout">
          <div className="contact__headline reveal-on-scroll">
            <p className="script">Have an idea?</p>
            <h2>HAVE AN IDEA?<br />LET&apos;S BUILD <span>SOMETHING USEFUL.</span></h2>
          </div>
          <div className="contact__card reveal-on-scroll">
            <span className="contact__status"><i /> Available for opportunities</span>
            <p>Tell me what you&apos;re working on, what is not working yet, or the idea you want to bring to life.</p>
            <a className="contact__email" href="mailto:shuvm2000@gmail.com" data-cursor-text="EMAIL">
              shuvm2000@gmail.com <ArrowIcon />
            </a>
            <button type="button" onClick={copyEmail} data-cursor-text="COPY">{copied ? "Copied ✓" : "Copy email"}</button>
          </div>
        </div>
        <div className="contact__footer">
          <div><strong>SHUBHAM KUMAR</strong><span>Full-Stack Developer · India</span></div>
          <nav aria-label="Social links">
            <a href="mailto:shuvm2000@gmail.com" data-cursor-text="EMAIL">Email ↗</a>
            <a href="https://github.com/Shuv2202" target="_blank" rel="noreferrer" data-cursor-text="GITHUB">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/shubham-kumar-17313a236" target="_blank" rel="noreferrer" data-cursor-text="LINKEDIN">LinkedIn ↗</a>
            <a href="https://www.instagram.com/thatsosubh/" target="_blank" rel="noreferrer" data-cursor-text="INSTAGRAM">Instagram ↗</a>
          </nav>
          <a href="#home">Back to top ↑</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="modal__panel">
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close project details"><CloseIcon /></button>
        <div className="modal__image"><img src={project.image} alt={`${project.title} project preview`} /></div>
        <div className="modal__content">
          <p className="modal__eyebrow">{project.label} / {project.year}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p>{project.story}</p>
          <div className="chip-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a href={project.github} target="_blank" rel="noreferrer">Explore code on GitHub <ArrowIcon /></a>
        </div>
      </article>
    </div>
  );
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serveMeModalOpen, setServeMeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const updateProgress = () => {
      const progressBar = document.querySelector<HTMLElement>(".scroll-progress");
      if (progressBar) {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? window.scrollY / available : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      }
    };

    lenis.on("scroll", updateProgress);
    updateProgress();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const isLocked = !introComplete || Boolean(selectedProject) || serveMeModalOpen;
    document.body.classList.toggle("is-locked", isLocked);
    if (isLocked) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
    return () => document.body.classList.remove("is-locked");
  }, [introComplete, selectedProject, serveMeModalOpen]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setServeMeModalOpen(false);
        setMenuOpen(false);
      }
    };
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1) {
          const elem = document.querySelector(href);
          if (elem) {
            e.preventDefault();
            if (lenisRef.current) {
              lenisRef.current.scrollTo(elem, { offset: -20 });
            } else {
              elem.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#about">Skip to content</a>
      <ShubhamVisitIntro onComplete={() => setIntroComplete(true)} />
      <div className="scroll-progress" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Work onOpenServeMe={() => setServeMeModalOpen(true)} onOpenProject={(proj) => setSelectedProject(proj)} />
        <About />
        <Toolbox />
        <ManifestoSection />
      </main>
      <Contact />
      <ServeMeCaseStudyModal isOpen={serveMeModalOpen} onClose={() => setServeMeModalOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
