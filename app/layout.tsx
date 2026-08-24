import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shubham-creative-portfolio.mk1632003.chatgpt.site"),
  title: "Shubham Kumar — Web Developer & Creative Builder",
  description: "Portfolio of Shubham Kumar, a B.Tech CSE student building responsive web applications, useful products, and interactive digital experiences.",
  keywords: ["Shubham Kumar", "web developer", "React developer", "B.Tech CSE", "portfolio", "ServeMe"],
  authors: [{ name: "Shubham Kumar" }],
  openGraph: {
    title: "Shubham Kumar — I Think, Then I Build",
    description: "Selected web projects, experiments, and the creative process behind them.",
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
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
