"use client";

type ProjectItem = {
  id: string;
  title: string;
  label: string;
  year: string;
  description: string;
  story: string;
  tags: string[];
  image: string;
  github: string;
  cursorText: string;
  rotation: string;
  top?: string;
  left?: string;
};

const moodboardCards: ProjectItem[] = [
  {
    id: "serveme",
    title: "ServeMe Operating System",
    label: "Restaurant ordering UX",
    year: "2026",
    description: "Mobile-first QR ordering flow connecting guests, kitchens, and restaurant teams in real time.",
    story: "ServeMe turns a table QR into a complete ordering journey: browse the menu, place an order, follow kitchen progress, confirm payment, and leave feedback.",
    tags: ["React", "TypeScript", "PostgreSQL", "Vercel"],
    image: "/assets/serveme.svg",
    github: "https://github.com/Shuv2202/finnal-website",
    cursorText: "View ServeMe Project",
    rotation: "rotate(-2.5deg)",
  },
  {
    id: "mediscan",
    title: "MediScan Healthcare App",
    label: "AI Medical Scanner",
    year: "2026",
    description: "AI-powered medical report analysis and intelligent health scanning platform.",
    story: "MediScan allows users to upload medical documents and scans to receive instant AI-driven summaries, key health metrics, and actionable medical insights.",
    tags: ["TypeScript", "React", "AI", "Healthcare"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202/MediScan",
    cursorText: "View MediScan Code",
    rotation: "rotate(2.8deg)",
  },
  {
    id: "kds",
    title: "Kitchen Display System (KDS)",
    label: "Restaurant Operations",
    year: "2026",
    description: "Real-time order management dashboard designed for kitchen teams, chefs, and order dispatchers.",
    story: "KDS streamlines kitchen workflows by displaying incoming table orders in real-time, tracking preparation timers, and managing dish readiness.",
    tags: ["CSS3", "JavaScript", "Real-Time", "Dashboard"],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202/KDS",
    cursorText: "View KDS Code",
    rotation: "rotate(-1.8deg)",
  },
  {
    id: "weather",
    title: "Weather Forecast Web App",
    label: "Web Application",
    year: "2026",
    description: "Interactive web application to fetch, search, and visualize real-time global weather forecasts.",
    story: "Provides up-to-the-minute weather metrics, 5-day forecasts, temperature trends, and interactive weather maps using live REST weather APIs.",
    tags: ["JavaScript", "HTML5", "REST API", "Weather"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202/Weather-Forecast",
    cursorText: "View Weather App",
    rotation: "rotate(3.2deg)",
  },
  {
    id: "nexus-landing",
    title: "Nexus Product Landing Page",
    label: "Frontend & Product UX",
    year: "2026",
    description: "Polished responsive landing page focused on visual hierarchy, conversion flow, and touch-friendly layouts.",
    story: "Built as a focused frontend build combining a compact navigation system, strong headline hierarchy, feature storytelling, and responsive design.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    image: "/assets/landing-page.svg",
    github: "https://github.com/Shuv2202/OIBSIP-WEB-DEVELOPMENT-DESIGNING---Level-1-Task-1---Landing-Page-",
    cursorText: "View Landing Page",
    rotation: "rotate(-3deg)",
  },
  {
    id: "portfolio",
    title: "Creative Portfolio Workspace",
    label: "Interactive Web Experience",
    year: "2026",
    description: "Personal interactive portfolio treating the browser as a tactile living workspace with customizable components.",
    story: "This portfolio translates physical objects into useful interface patterns—paper, tickets, folders, vinyl records, and terminal windows.",
    tags: ["Next.js", "React", "TypeScript", "Motion"],
    image: "/assets/portfolio.svg",
    github: "https://github.com/Shuv2202/portfolio",
    cursorText: "View Portfolio Code",
    rotation: "rotate(2.2deg)",
  },
];

export default function MoodboardSection({ onOpenProject }: { onOpenProject: (item: ProjectItem) => void }) {
  return (
    <section className="moodboard-section section-shell">
      {/* Pinboard Canvas Panel */}
      <div className="pinboard-canvas reveal-on-scroll">
        <div className="pinboard-canvas__frame">
          <div className="pinboard-grid">
            {moodboardCards.map((card) => (
              <article
                key={card.id}
                className="pinboard-card"
                style={{ transform: card.rotation }}
                onClick={() => onOpenProject(card)}
                data-cursor-text={card.cursorText}
                role="button"
                tabIndex={0}
              >
                <div className="pinboard-card__tape" />
                <div className="pinboard-card__image">
                  <img src={card.image} alt={card.title} />
                </div>
                <div className="pinboard-card__meta">
                  <span>{card.label}</span>
                  <h4>{card.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
