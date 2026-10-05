import type { Metadata } from "next";
import { Manrope, DM_Mono, Caveat } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

const siteUrl = "https://me.sosubh.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shubham Kumar — Web Developer & Creative Builder",
  description: "Portfolio of Shubham Kumar, a B.Tech CSE student building responsive web applications, useful products, and interactive digital experiences.",
  keywords: [
    "Shubham Kumar",
    "web developer",
    "React developer",
    "Full-Stack Developer",
    "B.Tech CSE",
    "portfolio",
    "ServeMe",
    "MediScan AI",
    "TypeScript",
    "Next.js"
  ],
  authors: [{ name: "Shubham Kumar", url: siteUrl }],
  creator: "Shubham Kumar",
  publisher: "Shubham Kumar",
  category: "technology",
  alternates: {
    canonical: "https://me.sosubh.online/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Shubham Kumar — I Think, Then I Build",
    description: "Selected web projects, experiments, and the creative process behind them.",
    url: "https://me.sosubh.online/",
    siteName: "Shubham Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Shubham Kumar — I Think, Then I Build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Kumar — Web Developer",
    description: "I think, then I build. Explore selected work and experiments.",
    images: ["/og.png"],
    creator: "@ShubhamKumar",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Shubham Kumar",
      "jobTitle": "Full-Stack Web Developer",
      "description": "Full-stack developer building responsive web applications, useful AI products, and interactive digital experiences.",
      "url": siteUrl,
      "image": `${siteUrl}/og.png`,
      "sameAs": [
        "https://github.com/Shuv2202",
        "https://www.linkedin.com/in/shubham-kumar-17313a236",
        "https://www.instagram.com/thatsosubh/"
      ],
      "knowsAbout": [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Web Development",
        "User Interface Design"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Shubham Kumar Portfolio",
      "description": "Portfolio of Shubham Kumar, Full-Stack Web Developer & B.Tech CSE student.",
      "publisher": {
        "@id": `${siteUrl}/#person`
      },
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmMono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('unhandledrejection',function(e){if(e&&e.preventDefault){e.preventDefault();}});`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}


