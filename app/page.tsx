"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import ShubhamVisitIntro from "./components/ShubhamVisitIntro";
import CustomCursor from "./components/CustomCursor";
import HangingIdCard from "./components/HangingIdCard";

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
    label: "Restaurant operating system",
    year: "2026",
    description:
      "A mobile-first QR ordering flow connecting guests, kitchens, and restaurant teams in real time.",
    story:
      "ServeMe turns a table QR into a complete ordering journey: browse the menu, place an order, follow kitchen progress, confirm payment, and leave feedback. The wider system includes vendor and kitchen workspaces built around one shared backend.",
    tags: ["React", "TypeScript", "PostgreSQL", "Product UX"],
    image: "/assets/serveme.svg",
    className: "project-card--yellow",
    category: "product",
    github: "https://github.com/Shuv2202",
    cursorText: "View ServeMe project",
  },
  {
    id: "portfolio",
    title: "Creative Workspace",
    label: "Interactive portfolio experience",
    year: "2026",
    description:
      "A personal site that treats the browser like a living desk—part journal, part terminal, part project archive.",
    story:
      "This portfolio is an experiment in translating physical objects into useful interface patterns. Paper, tickets, folders, and terminal windows create personality, while the information hierarchy stays clear and responsive.",
    tags: ["Next.js", "React", "Motion", "Creative Dev"],
    image: "/assets/portfolio.svg",
    className: "project-card--ink",
    category: "creative",
    github: "https://github.com/Shuv2202",
    cursorText: "View creative portfolio",
  },
  {
    id: "landing",
    title: "Nexus Landing Page",
    label: "Responsive frontend build",
    year: "2026",
    description:
      "A polished product landing page focused on visual hierarchy, conversion flow, and responsive behavior.",
    story:
      "Built as a focused frontend exercise, Nexus combines a compact navigation system, strong headline hierarchy, feature storytelling, and touch-friendly layouts across desktop and mobile screens.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    image: "/assets/landing-page.svg",
    className: "project-card--blue",
    category: "frontend",
    github: "https://github.com/Shuv2202",
    cursorText: "View landing page",
  },
];

const terminalCommands: Record<string, string> = {
  whoami: "Shubham Kumar — B.Tech CSE student and web developer.",
  skills: "React  TypeScript  JavaScript  Python  APIs  UI/UX",
  projects: "serveme/  creative-portfolio/  nexus-landing/",
  status: "Open to internships, collaborations, and useful product ideas.",
  contact: "shuvm2000@gmail.com",
  help: "Try: whoami, skills, projects, status, contact, clear",
};

const skillGroups = [
  {
    index: "01",
    title: "Frontend",
    copy: "Interfaces that stay clear, fast, and comfortable on every screen.",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
  },
  {
    index: "02",
    title: "Product building",
    copy: "Turning a rough problem into a sensible user flow and working prototype.",
    items: ["UI/UX", "REST APIs", "Authentication", "PostgreSQL", "Supabase", "Prototyping"],
  },
  {
    index: "03",
    title: "Workflow",
    copy: "A practical toolset for shipping, testing, and improving real projects.",
    items: ["Git", "GitHub", "Vite", "Vercel", "VS Code", "Python"],
  },
];

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
        <span>Shubham Kumar</span>
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
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#lab" onClick={() => setMenuOpen(false)}>Playground</a>
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
        <HangingIdCard />

        <div className="boarding-pass hero-reveal hero-reveal--3">
          <div className="boarding-pass__title"><strong>DESIGN ×<br />TECHNOLOGY</strong><span>2026</span></div>
          <div className="boarding-pass__meta">
            <span><small>DISCIPLINE</small>WEB / PRODUCT</span>
            <span><small>STATUS</small>OPEN TO WORK</span>
          </div>
          <div className="boarding-pass__edge" aria-hidden="true">SK&nbsp;&nbsp;001&nbsp;&nbsp;CSE</div>
        </div>

        <button
          className="vinyl-card hero-reveal hero-reveal--5"
          type="button"
          onClick={() => setFocusMode(!focusMode)}
          aria-pressed={focusMode}
          data-cursor-text="Play focus music"
        >
          <span className={`vinyl ${focusMode ? "vinyl--playing" : ""}`} aria-hidden="true"><i /></span>
          <span className="vinyl-card__text"><small>FOCUS MODE</small><strong>{focusMode ? "Flow activated" : "Vibe coding playlist"}</strong><em>{focusMode ? "Click to pause" : "Click the record"}</em></span>
        </button>

        <div className="digital-card hero-reveal hero-reveal--4" aria-label="Digital card SK 23">
          <span className="digital-card__dots" aria-hidden="true" />
          <span className="digital-card__value">SK</span>
          <small>23</small>
        </div>

        <div className="hero-title hero-reveal hero-reveal--4">
          <p className="script">Shubham Kumar</p>
          <h1>I THINK, THEN I BUILD</h1>
        </div>

        <button
          className="folder-card hero-reveal hero-reveal--6"
          type="button"
          onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
          data-cursor-text="Open my projects"
        >
          <span className="folder-card__tab" aria-hidden="true" />
          <span className="folder-card__icon" aria-hidden="true">↳</span>
          <span><strong>projects/</strong><small>03 selected builds</small></span>
        </button>

        <div className="mini-terminal hero-reveal hero-reveal--7">
          <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>shubham — zsh</span></div>
          <div className="mini-terminal__body">
            <p><b>~ $</b> whoami</p>
            <span>Shubham Kumar · Web Developer</span>
            <p><b>~ $</b> ls interests/</p>
            <span>web/ products/ ai/ design/</span>
            <p className="mini-terminal__cursor"><b>~ $</b> <i /></p>
          </div>
        </div>

        <div className="hero-note hero-reveal hero-reveal--8">
          <span className="tape tape--left" aria-hidden="true" />
          <span className="tape tape--mid" aria-hidden="true" />
          <span className="tape tape--right" aria-hidden="true" />
          <p>
            I care about building useful products, understanding how people use them, and turning complex ideas into simple experiences. I’m always learning, experimenting, and improving.
          </p>
        </div>

        <a className="hero-scroll" href="#about"><span>Scroll to explore</span><i aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-shell">
      <div className="section-kicker reveal-on-scroll"><span>01</span><p>ABOUT / THE SHORT VERSION</p></div>
      <div className="about__headline reveal-on-scroll">
        <p className="script">A little about me</p>
        <h2>I turn rough ideas into <span>interfaces</span> that feel obvious.</h2>
      </div>
      <div className="about__grid">
        <div className="about__note reveal-on-scroll">
          <span className="tape" aria-hidden="true" />
          <p>“Keep the idea ambitious.<br />Keep the experience simple.”</p>
          <small>— my build rule</small>
        </div>
        <div className="about__copy reveal-on-scroll">
          <p>I&apos;m Shubham Kumar, a B.Tech Computer Science &amp; Engineering student who enjoys building modern web experiences and solving practical problems.</p>
          <p>My process is simple: understand the real user flow, prototype quickly, test the edge cases, and keep refining until the product feels clear.</p>
          <a className="text-link" href="#work">Explore selected work <ArrowIcon /></a>
        </div>
      </div>
      <div className="about__facts reveal-on-scroll" aria-label="Quick facts">
        <div><strong>03</strong><span>featured projects</span></div>
        <div><strong>2026</strong><span>building &amp; learning</span></div>
        <div><strong>∞</strong><span>iterations welcome</span></div>
        <div><strong>OPEN</strong><span>to opportunities</span></div>
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className="toolbox section-shell" aria-labelledby="toolbox-title">
      <div className="section-kicker reveal-on-scroll"><span>02</span><p>TOOLBOX / WHAT I USE</p></div>
      <div className="section-heading reveal-on-scroll">
        <p className="script">Built with curiosity</p>
        <h2 id="toolbox-title">A practical toolkit for real ideas.</h2>
      </div>
      <div className="toolbox__grid">
        {skillGroups.map((group) => (
          <article className="tool-card reveal-on-scroll" key={group.title}>
            <span className="tool-card__index">{group.index}</span>
            <div className="tool-card__icon" aria-hidden="true">{group.index === "01" ? "⌘" : group.index === "02" ? "↗" : "✦"}</div>
            <h3>{group.title}</h3>
            <p>{group.copy}</p>
            <div className="chip-list">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
      <div className="marquee" aria-hidden="true"><div><span>REACT</span><i>✦</i><span>TYPESCRIPT</span><i>✦</i><span>PRODUCT THINKING</span><i>✦</i><span>RESPONSIVE UI</span><i>✦</i><span>REACT</span><i>✦</i><span>TYPESCRIPT</span><i>✦</i><span>PRODUCT THINKING</span><i>✦</i><span>RESPONSIVE UI</span></div></div>
    </section>
  );
}

function Work({ onOpen }: { onOpen: (project: Project) => void }) {
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const visibleProjects = useMemo(() => filter === "all" ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <section id="work" className="work">
      <div className="section-shell">
        <div className="section-kicker section-kicker--dark reveal-on-scroll"><span>03</span><p>WORK / SELECTED PROJECTS</p></div>
        <div className="work__intro reveal-on-scroll">
          <div><p className="script">Things I&apos;ve built</p><h2>Selected work,<br />filed properly.</h2></div>
          <p>Projects where I learned by making, testing, breaking, and improving—not just following a tutorial.</p>
        </div>

        <div className="project-window reveal-on-scroll">
          <div className="project-window__bar">
            <span className="window-dots"><i /><i /><i /></span>
            <span>~/shubham/projects</span>
            <span className="project-window__view">GRID VIEW</span>
          </div>
          <div className="project-window__tabs" role="group" aria-label="Filter projects">
            {(["all", "product", "frontend", "creative"] as const).map((item) => (
              <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>
                {item === "all" ? "Favorites" : item}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className={`project-card ${project.className}`} key={project.id}>
                <button
                  className="project-card__image"
                  type="button"
                  onClick={() => onOpen(project)}
                  aria-label={`Open ${project.title} details`}
                  data-cursor-text={project.cursorText}
                >
                  <img src={project.image} alt={`${project.title} project preview`} />
                  <span>Open case study <ArrowIcon /></span>
                </button>
                <div className="project-card__content">
                  <div className="project-card__meta"><span>PROJECT 0{index + 1}</span><span>{project.year}</span></div>
                  <p className="project-card__label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-card__footer">
                    <div className="chip-list">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <button type="button" onClick={() => onOpen(project)} aria-label={`Read about ${project.title}`}><ArrowIcon /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalLab() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: "whoami", output: terminalCommands.whoami },
  ]);

  const runCommand = (commandValue?: string) => {
    const command = (commandValue ?? input).trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    setHistory((current) => [...current, { command, output: terminalCommands[command] ?? `command not found: ${command}. Type “help”.` }]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand();
  };

  return (
    <section id="lab" className="lab section-shell">
      <div className="section-kicker reveal-on-scroll"><span>04</span><p>LAB / TRY SOMETHING</p></div>
      <div className="lab__layout">
        <div className="lab__copy reveal-on-scroll">
          <p className="script">An interactive corner</p>
          <h2>Ask the terminal.</h2>
          <p>A tiny command line for the curious. Use a quick command or type your own.</p>
          <div className="command-chips">
            {["skills", "projects", "status", "contact", "help"].map((command) => (
              <button key={command} type="button" onClick={() => runCommand(command)}>{command}</button>
            ))}
          </div>
        </div>
        <div className="terminal reveal-on-scroll">
          <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>shubham@portfolio — zsh</span><span>⌘ K</span></div>
          <div className="terminal__output" aria-live="polite">
            <p className="terminal__welcome">Welcome to Shubham&apos;s workspace. Type “help” to begin.</p>
            {history.map((line, index) => (
              <div className="terminal__line" key={`${line.command}-${index}`}>
                <p><b>~ $</b> {line.command}</p>
                <span>{line.output}</span>
              </div>
            ))}
          </div>
          <form className="terminal__form" onSubmit={handleSubmit}>
            <label htmlFor="terminal-command">~ $</label>
            <input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck={false} placeholder="type a command…" />
            <button type="submit">Run</button>
          </form>
        </div>
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
        <div className="section-kicker section-kicker--dark reveal-on-scroll"><span>05</span><p>CONTACT / SAY HELLO</p></div>
        <div className="contact__layout">
          <div className="contact__headline reveal-on-scroll">
            <p className="script">Have an idea?</p>
            <h2>LET&apos;S BUILD<br />SOMETHING <span>USEFUL.</span></h2>
          </div>
          <div className="contact__card reveal-on-scroll">
            <span className="contact__status"><i /> Available for new opportunities</span>
            <p>Tell me what you&apos;re working on, what is not working yet, or the idea you want to bring to life.</p>
            <a
              className="contact__email"
              href="mailto:shuvm2000@gmail.com"
              data-cursor
              data-cursor-mode="view"
              data-cursor-text="EMAIL"
            >
              shuvm2000@gmail.com <ArrowIcon />
            </a>
            <button type="button" onClick={copyEmail}>{copied ? "Copied ✓" : "Copy email"}</button>
          </div>
        </div>
        <div className="contact__footer">
          <div><strong>Shubham Kumar</strong><span>B.Tech CSE · Web Developer</span></div>
          <nav aria-label="Social links">
            <a href="https://github.com/Shuv2202" target="_blank" rel="noreferrer">{`{ GitHub }`}</a>
            <a href="https://www.linkedin.com/in/shubham-kumar-17313a236" target="_blank" rel="noreferrer">{`{ LinkedIn }`}</a>
            <a href="https://www.instagram.com/thatsosubh/" target="_blank" rel="noreferrer">{`{ Instagram }`}</a>
            <a href="mailto:shuvm2000@gmail.com">{`{ Email }`}</a>
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
    const isLocked = !introComplete || Boolean(selectedProject);
    document.body.classList.toggle("is-locked", isLocked);
    if (isLocked) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
    return () => document.body.classList.remove("is-locked");
  }, [introComplete, selectedProject]);

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
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        <About />
        <Toolbox />
        <Work onOpen={setSelectedProject} />
        <TerminalLab />
      </main>
      <Contact />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
