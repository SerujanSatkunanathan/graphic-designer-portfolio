import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serujan Satkunanathan | Graphic Designer & AI Creative",
  description:
    "Portfolio of Serujan Satkunanathan — blending Photoshop, CapCut, Veo, Sora, Dreamina, Google Flow, Reve & more to craft stunning visuals and videos.",
  keywords: ["Serujan Satkunanathan", "AI graphic designer", "AI creative", "Veo", "Sora", "Dreamina", "portfolio", "visual creator"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
