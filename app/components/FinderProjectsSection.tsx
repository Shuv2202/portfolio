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

export default function FinderProjectsSection({ onSelectCategory }: { onSelectCategory?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const handleFolderClick = (id: string) => {
    setActiveFolder(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const getWindowTitle = () => {
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
                className={`finder-sidebar__item ${activeTab === "Projects" ? "is-active" : ""}`}
                onClick={() => setActiveTab("Projects")}
              >
                <span className="sidebar-icon">🏠</span>
                <span>Projects</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Snapshot" ? "is-active" : ""}`}
                onClick={() => setActiveTab("Snapshot")}
              >
                <span className="sidebar-icon">🖥️</span>
                <span>Snapshot</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Achievements" ? "is-active" : ""}`}
                onClick={() => setActiveTab("Achievements")}
              >
                <span className="sidebar-icon">⭐</span>
                <span>Achievements</span>
              </button>
              <button
                type="button"
                className={`finder-sidebar__item ${activeTab === "Garden" ? "is-active" : ""}`}
                onClick={() => setActiveTab("Garden")}
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
