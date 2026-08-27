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
          <span className="finder-window__title">~ /shubham/project</span>
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

          {/* Main Grid Area of Folders */}
          <main className="finder-content">
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
          </main>
        </div>
      </div>
    </section>
  );
}
