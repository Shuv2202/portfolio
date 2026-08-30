"use client";

import { useState } from "react";

type FolderCategory = {
  id: string;
  name: string;
  color: string; // css background gradient or color
  borderColor: string;
  iconSvg: React.ReactNode;
  tag: string;
  count: number;
};

const folderCategories: FolderCategory[] = [
  {
    id: "work",
    name: "Projects at Work",
    color: "#6b93c0",
    borderColor: "#5075a3",
    tag: "Work",
    count: 3,
    iconSvg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: "ai",
    name: "Designing with AI",
    color: "#d8a855",
    borderColor: "#be8f3c",
    tag: "AI",
    count: 2,
    iconSvg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
      </svg>
    ),
  },
  {
    id: "community",
    name: "Community Impact",
    color: "#5b9e84",
    borderColor: "#428269",
    tag: "Impact",
    count: 4,
    iconSvg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "lens",
    name: "Through My Lens",
    color: "#d67474",
    borderColor: "#ba5656",
    tag: "Photo",
    count: 8,
    iconSvg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: "sketch",
    name: "From Sketch to Merch",
    color: "#9777bc",
    borderColor: "#7a5c9e",
    tag: "Craft",
    count: 5,
    iconSvg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

type FolderFileItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  icon: string;
};

const folderContents: Record<string, { title: string; subtitle: string; color: string; items: FolderFileItem[] }> = {
  work: {
    title: "Projects at Work",
    subtitle: "Production web applications & full-stack software shipped for real users.",
    color: "#6b93c0",
    items: [
      {
        id: "serveme",
        title: "ServeMe Operating System",
        type: "Full-Stack Web System",
        description: "Mobile-first QR ordering flow connecting guests, kitchens, and management teams in real time.",
        tags: ["React", "TypeScript", "PostgreSQL", "Vercel"],
        githubUrl: "https://github.com/Shuv2202/finnal-website",
        demoUrl: "https://finnal-website.vercel.app",
        icon: "🍽️",
      },
      {
        id: "kds",
        title: "Kitchen Display System (KDS)",
        type: "Real-Time Dashboard",
        description: "Real-time kitchen order dispatch system tracking table timers and dish readiness.",
        tags: ["CSS3", "JavaScript", "Real-Time"],
        githubUrl: "https://github.com/Shuv2202/KDS",
        icon: "🍳",
      },
      {
        id: "vendor",
        title: "Vendor Management App",
        type: "Inventory Dashboard",
        description: "Multi-vendor inventory tracking dashboard and catalog management console.",
        tags: ["TypeScript", "React", "State Management"],
        githubUrl: "https://github.com/Shuv2202/vendor",
        icon: "🏪",
      },
    ],
  },
  ai: {
    title: "Designing with AI",
    subtitle: "AI-native prototypes, medical report analyzers, and prompt-to-UI experiments.",
    color: "#d8a855",
    items: [
      {
        id: "mediscan",
        title: "MediScan AI Healthcare App",
        type: "AI Medical Reader",
        description: "AI-powered medical report analyzer providing instant summary insights and health metric breakdowns.",
        tags: ["TypeScript", "AI", "Healthcare", "React"],
        githubUrl: "https://github.com/Shuv2202/MediScan",
        demoUrl: "https://medi-scan-rho.vercel.app",
        icon: "🏥",
      },
      {
        id: "vibe-challenge",
        title: "Claude Vibe-Coding Canvas",
        type: "Agentic UI System",
        description: "Tactile web workspace translating physical desk objects into living browser interface components.",
        tags: ["Agentic AI", "Tactile Design", "WebAudio"],
        icon: "🧠",
      },
      {
        id: "code-assistant",
        title: "AI Prompt Engineering Tools",
        type: "Developer Tools",
        description: "Custom agentic workflows and tool schemas designed to accelerate full-stack coding tasks.",
        tags: ["Prompting", "Automation", "Workflow"],
        icon: "⚡",
      },
    ],
  },
  community: {
    title: "Community Impact",
    subtitle: "Open source contributions, student developer mentorship, and public utilities.",
    color: "#5b9e84",
    items: [
      {
        id: "weather",
        title: "Weather Forecast Web App",
        type: "Public Web Utility",
        description: "Interactive web application to fetch, search, and visualize real-time global weather forecasts.",
        tags: ["JavaScript", "HTML5", "REST API"],
        githubUrl: "https://github.com/Shuv2202/Weather-Forecast",
        demoUrl: "https://shuv2202.github.io/Weather-Forecast/",
        icon: "🌤️",
      },
      {
        id: "mentorship",
        title: "College CSE Tech Workshops",
        type: "Developer Community",
        description: "Hands-on student mentorship sessions covering modern web development, React, and Git fundamentals.",
        tags: ["Mentorship", "Community", "CSE"],
        icon: "👥",
      },
      {
        id: "open-source",
        title: "Open Source Codebases",
        type: "Open Source",
        description: "Active maintenance and UI accessibility enhancements across public repositories.",
        tags: ["Git", "GitHub", "Documentation"],
        icon: "🚀",
      },
    ],
  },
  lens: {
    title: "Through My Lens",
    subtitle: "Visual photography, architectural snapshots, and creative inspiration gallery.",
    color: "#d67474",
    items: [
      {
        id: "urban",
        title: "Urban Architecture Series",
        type: "Photography",
        description: "Minimalist geometry, shadow play, and high-contrast urban structural photography.",
        tags: ["Photography", "Architecture", "Minimal"],
        icon: "📷",
      },
      {
        id: "botanical",
        title: "Botanical Textures & Light",
        type: "Visual Art",
        description: "Golden hour light reflections, organic leaf macro shots, and warm natural textures.",
        tags: ["Visuals", "Nature", "Texture"],
        icon: "🌿",
      },
      {
        id: "workspace",
        title: "Tactile Workspace Aesthetics",
        type: "Curated Aesthetic",
        description: "Mechanical keycaps, grid paper journals, iced coffee setups, and analog desktop inspiration.",
        tags: ["Workspace", "Design", "Aesthetic"],
        icon: "☕",
      },
    ],
  },
  sketch: {
    title: "From Sketch to Merch",
    subtitle: "UI design systems, tactile components, vector merch graphics, and product UI builds.",
    color: "#9777bc",
    items: [
      {
        id: "nexus-landing",
        title: "Nexus Product Landing Page",
        type: "Frontend Product UX",
        description: "Responsive product landing page focused on visual hierarchy, conversion flow, and clean layouts.",
        tags: ["HTML5", "CSS3", "JavaScript"],
        githubUrl: "https://github.com/Shuv2202/OIBSIP-WEB-DEVELOPMENT-DESIGNING---Level-1-Task-1---Landing-Page-",
        demoUrl: "https://oibsip-web-development-designing-le.vercel.app",
        icon: "🎨",
      },
      {
        id: "design-system",
        title: "Tactile Grid Design System",
        type: "UI Component Library",
        description: "Custom CSS component architecture with cream graph paper grids, Post-It cards, and ticket badges.",
        tags: ["CSS Architecture", "Design System"],
        icon: "💻",
      },
      {
        id: "vector-merch",
        title: "Brand Sticker & Merch Art",
        type: "Graphic Design",
        description: "Vector sticker artwork, embroidered patch badges, and custom merch graphics.",
        tags: ["Vector", "Figma", "Branding"],
        icon: "🏷️",
      },
    ],
  },
};

export default function FinderProjectsSection({ onSelectCategory }: { onSelectCategory?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const handleFolderClick = (id: string) => {
    setActiveFolder(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const handleSidebarTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setActiveFolder(null); // Reset open folder when switching sidebar tabs
  };

  const getWindowTitle = () => {
    if (activeTab === "Projects" && activeFolder && folderContents[activeFolder]) {
      return `~ /shubham/project/${activeFolder}`;
    }
    switch (activeTab) {
      case "Snapshot":
        return "~ /shubham/snapshot";
      case "Achievements":
        return "~ /shubham/achievements";
      case "Garden":
        return "~ /shubham/garden";
      default:
        return "~ /shubham/project";
    }
  };

  return (
    <section id="work" className="finder-section section-shell">
      <div className="finder-window reveal-on-scroll">
        {/* Finder Header Bar */}
        <div className="finder-window__header">
          <div className="finder-window__traffic-lights">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="finder-window__title">{getWindowTitle()}</span>
          <div className="finder-window__actions">
            <span />
          </div>
        </div>

        {/* Finder Window Body */}
        <div className="finder-window__body">
          {/* Left Sidebar */}
          <aside className="finder-sidebar">
            <span className="finder-sidebar__label">Favorites</span>
            <nav className="finder-sidebar__nav">
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Projects" && !activeFolder ? "is-active" : ""}`}
                onClick={() => handleSidebarTabClick("Projects")}
              >
                <span className="sidebar-icon">🏠</span>
                <span>Projects</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Snapshot" ? "is-active" : ""}`}
                onClick={() => handleSidebarTabClick("Snapshot")}
              >
                <span className="sidebar-icon">🖥️</span>
                <span>Snapshot</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Achievements" ? "is-active" : ""}`}
                onClick={() => handleSidebarTabClick("Achievements")}
              >
                <span className="sidebar-icon">⭐</span>
                <span>Achievements</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Garden" ? "is-active" : ""}`}
                onClick={() => handleSidebarTabClick("Garden")}
              >
                <span className="sidebar-icon">🌱</span>
                <span>Garden</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="finder-content">
            {activeTab === "Snapshot" ? (
              <SnapshotView />
            ) : activeTab === "Achievements" ? (
              <div style={{ padding: "40px", textAlign: "center", fontFamily: "var(--mono)", color: "#787265" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }}>⭐</span>
                <h3>Achievements &amp; Milestones</h3>
                <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>Shipped 5+ Full-Stack Web Apps · AI Vibe-Coding Enthusiast · Open Source Contributor</p>
              </div>
            ) : activeTab === "Garden" ? (
              <div style={{ padding: "40px", textAlign: "center", fontFamily: "var(--mono)", color: "#787265" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }}>🌱</span>
                <h3>Digital Garden</h3>
                <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>Cultivating notes on AI Agents, Next.js, WebAudio &amp; Tactile Design Systems</p>
              </div>
            ) : activeFolder && folderContents[activeFolder] ? (
              <FolderDetailView
                folderKey={activeFolder}
                folderData={folderContents[activeFolder]}
                onBack={() => setActiveFolder(null)}
              />
            ) : (
              <div className="finder-folder-grid">
                {folderCategories.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    className={`mac-folder ${activeFolder === folder.id ? "is-active" : ""}`}
                    onClick={() => handleFolderClick(folder.id)}
                  >
                    <div
                      className="mac-folder__icon"
                      style={{
                        backgroundColor: folder.color,
                        borderColor: folder.borderColor,
                      }}
                    >
                      <div className="mac-folder__tab" style={{ backgroundColor: folder.color, borderColor: folder.borderColor }} />
                      <div className="mac-folder__symbol">{folder.iconSvg}</div>
                    </div>
                    <span className="mac-folder__name">{folder.name}</span>
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function FolderDetailView({
  folderKey,
  folderData,
  onBack,
}: {
  folderKey: string;
  folderData: { title: string; subtitle: string; color: string; items: FolderFileItem[] };
  onBack: () => void;
}) {
  return (
    <div className="folder-detail-view">
      <div className="folder-detail-header">
        <button type="button" className="folder-back-btn" onClick={onBack}>
          ← Back to /shubham/project
        </button>
        <div className="folder-detail-title">
          <span className="folder-detail-badge" style={{ backgroundColor: folderData.color }}>
            {folderKey.toUpperCase()}
          </span>
          <h3>{folderData.title}</h3>
        </div>
      </div>
      <p className="folder-detail-desc">{folderData.subtitle}</p>

      <div className="folder-file-grid">
        {folderData.items.map((file) => (
          <div key={file.id} className="folder-file-card">
            <div className="folder-file-card__header">
              <span className="folder-file-card__icon">{file.icon}</span>
              <div className="folder-file-card__meta">
                <h4>{file.title}</h4>
                <span className="folder-file-card__type">{file.type}</span>
              </div>
            </div>
            <p className="folder-file-card__desc">{file.description}</p>

            <div className="folder-file-card__footer">
              <div className="folder-file-tags">
                {file.tags.map((tag) => (
                  <span key={tag} className="folder-file-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="folder-file-links">
                {file.githubUrl && (
                  <a href={file.githubUrl} target="_blank" rel="noreferrer" className="folder-file-link">
                    GitHub ↗
                  </a>
                )}
                {file.demoUrl && (
                  <a href={file.demoUrl} target="_blank" rel="noreferrer" className="folder-file-link">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SnapshotView() {
  const journeyList = [
    { num: "01", text: "Studied Computer Science", tag: "CSE" },
    { num: "02", text: "Full-Stack Web Dev", tag: "WEB" },
    { num: "03", text: "Built ServeMe QR System", tag: "PRODUCT" },
    { num: "04", text: "Built MediScan AI", tag: "HEALTH" },
    { num: "05", text: "Building with AI & React", tag: "TECH" },
    { num: "06", text: "Shipped 5+ Web Apps", tag: "SHIP" },
    { num: "07", text: "Exploring UI/UX & Craft", tag: "DESIGN" },
    { num: "08", text: "Full-Stack AI Developer", tag: "NOW", isActive: true },
  ];

  return (
    <div className="snapshot-layout">
      {/* Top 3 Widgets */}
      <div className="snapshot-grid-top">
        {/* DESIGN NOTES */}
        <div className="snapshot-card spiral-card">
          <div className="spiral-binder">
            <span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <span className="snapshot-card__eyebrow">DESIGN NOTES</span>
          <div className="tag-cloud">
            <span className="tag-pill tag-pill--green">Think deeply</span>
            <span className="tag-pill tag-pill--blue">Data-driven</span>
            <span className="tag-pill tag-pill--purple">Detail-focused</span>
            <span className="tag-pill tag-pill--gold">Stay curious</span>
            <span className="tag-pill tag-pill--pink">Exploring often</span>
            <span className="tag-pill tag-pill--teal">Learn by building</span>
          </div>
        </div>

        {/* ENERGY LEVEL */}
        <div className="snapshot-card energy-card">
          <span className="snapshot-card__eyebrow">ENERGY LEVEL</span>
          <div className="energy-gauge">
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e4ded2"
                strokeWidth="3.2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#47926b"
                strokeWidth="3.2"
                strokeDasharray="95, 100"
                strokeLinecap="round"
              />
            </svg>
            <span className="energy-gauge__val">95%</span>
          </div>
          <span className="energy-card__status">Feeling great</span>
        </div>

        {/* FUEL MIX Radar Chart */}
        <div className="snapshot-card fuel-card">
          <span className="snapshot-card__eyebrow">FUEL MIX</span>
          <div className="radar-chart">
            <svg viewBox="0 0 200 180">
              <polygon points="100,20 160,50 160,110 100,140 40,110 40,50" fill="none" stroke="#e6e0d3" strokeWidth="1" />
              <polygon points="100,40 140,60 140,100 100,120 60,100 60,60" fill="none" stroke="#ede7db" strokeWidth="1" />
              <polygon points="100,60 120,70 120,90 100,100 80,90 80,70" fill="none" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="100" y2="20" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="160" y2="50" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="160" y2="110" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="100" y2="140" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="40" y2="110" stroke="#ede7db" strokeWidth="1" />
              <line x1="100" y1="80" x2="40" y2="50" stroke="#ede7db" strokeWidth="1" />
              <polygon points="100,30 152,55 148,105 100,128 52,100 55,58" fill="rgba(87, 147, 186, 0.22)" stroke="#5793ba" strokeWidth="1.8" />
              <circle cx="100" cy="30" r="3" fill="#5793ba" />
              <circle cx="152" cy="55" r="3" fill="#5793ba" />
              <circle cx="148" cy="105" r="3" fill="#5793ba" />
              <circle cx="100" cy="128" r="3" fill="#5793ba" />
              <circle cx="52" cy="100" r="3" fill="#5793ba" />
              <circle cx="55" cy="58" r="3" fill="#5793ba" />
              <text x="100" y="12" textAnchor="middle" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Coffee</text>
              <text x="172" y="52" textAnchor="start" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Tea</text>
              <text x="172" y="114" textAnchor="start" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Music</text>
              <text x="100" y="154" textAnchor="middle" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Sunlight</text>
              <text x="28" y="114" textAnchor="end" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Curiosity</text>
              <text x="28" y="52" textAnchor="end" fill="#6d675b" fontSize="10" fontFamily="sans-serif">Ideas</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom 2 Widgets */}
      <div className="snapshot-grid-bottom">
        {/* MY JOURNEY */}
        <div className="snapshot-card">
          <span className="snapshot-card__eyebrow">MY JOURNEY</span>
          <div className="journey-list">
            {journeyList.map((item) => (
              <div key={item.num} className={`journey-item ${item.isActive ? "is-active" : ""}`}>
                <div className="journey-item__left">
                  <span className="journey-item__num">{item.num}</span>
                  <span className="journey-item__dot" />
                  <span>{item.text}</span>
                </div>
                <span className="journey-item__tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FUN FACTS / STICKER STACK */}
        <div className="snapshot-card fun-facts-card">
          <span className="snapshot-card__eyebrow" style={{ position: "absolute", top: "18px", left: "18px" }}>FUN FACTS</span>
          <div className="fun-sticker-stack">
            <div className="sticker-card sticker-card--back">
              <span style={{ fontSize: "2rem" }}>🎨</span>
            </div>
            <div className="sticker-card sticker-card--front">
              <span style={{ fontSize: "3rem", marginBottom: "8px" }}>🧋</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "#595449", textAlign: "center" }}>Fueled by Boba &amp; Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
