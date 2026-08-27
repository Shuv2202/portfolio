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
    id: "emojis",
    title: "50 Free Emojis",
    label: "3D Asset Pack",
    year: "2026",
    description: "A custom crafted set of 3D food and object emoji icons for modern interfaces.",
    story: "Designed in Blender and Figma, this pack offers 50 high-resolution transparent 3D emojis for mobile apps and web graphics.",
    tags: ["Figma", "3D", "Icons"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202",
    cursorText: "View 3D Emojis",
    rotation: "rotate(-3deg)",
  },
  {
    id: "serveme",
    title: "ServeMe Operating System",
    label: "Restaurant ordering UX",
    year: "2026",
    description: "Mobile-first QR ordering system connecting guests, kitchens, and restaurant teams.",
    story: "ServeMe turns a table QR into a complete ordering journey: browse the menu, place an order, follow kitchen progress, confirm payment, and leave feedback.",
    tags: ["React", "TypeScript", "PostgreSQL"],
    image: "/assets/serveme.svg",
    github: "https://github.com/Shuv2202",
    cursorText: "View ServeMe",
    rotation: "rotate(2.5deg)",
  },
  {
    id: "posters",
    title: "Abstract Posters & Wallpapers",
    label: "Visual Art Collection",
    year: "2026",
    description: "Experimental gradient wallpapers and typography posters for desktop & web.",
    story: "Explorations in mesh gradients, noise textures, and expressive typography designed for creative web projects.",
    tags: ["Design", "Gradients", "Art"],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202",
    cursorText: "View Wallpapers",
    rotation: "rotate(4deg)",
  },
  {
    id: "vibe-app",
    title: "Dark Mode Music Player",
    label: "UI Component Architecture",
    year: "2026",
    description: "Sleek web audio dashboard with visualizer, playlists, and dark mode controls.",
    story: "A responsive React music player interface featuring web audio API integration, real-time waveform visualization, and track queue management.",
    tags: ["React", "WebAudio", "UI/UX"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202",
    cursorText: "View Music App",
    rotation: "rotate(-1.5deg)",
  },
  {
    id: "mobile-flow",
    title: "Food Delivery App Flow",
    label: "Mobile UX Design",
    year: "2026",
    description: "Clean mobile UI checkout flow with map tracking and instant notifications.",
    story: "Designed to minimize checkout friction: quick search, one-tap reordering, real-time courier map tracking, and smooth screen transitions.",
    tags: ["Mobile", "Figma", "UX"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202",
    cursorText: "View Mobile App",
    rotation: "rotate(3deg)",
  },
  {
    id: "house-3d",
    title: "Isometric Low-Poly House",
    label: "3D Environment Prototype",
    year: "2026",
    description: "Interactive 3D low-poly house scene rendered with Three.js web engine.",
    story: "Built as an interactive 3D web experience allowing users to rotate, change lighting conditions, and inspect architecture details directly in browser.",
    tags: ["Three.js", "3D", "WebGL"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    github: "https://github.com/Shuv2202",
    cursorText: "View 3D Scene",
    rotation: "rotate(-3.5deg)",
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
