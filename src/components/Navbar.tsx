"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Workflow",   href: "#workflow" },
  { label: "Portfolio",  href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const l of [...LINKS].reverse()) {
        const el = document.getElementById(l.href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(l.href); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position:   "fixed",
        top: 0, left: 0, right: 0,
        zIndex:     9000,
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(4,6,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #00e5ff, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--ff-head)", fontWeight: 900, fontSize: "1rem", color: "#030712",
            letterSpacing: "0.05em",
          }}>S</div>
          <span style={{ fontFamily: "var(--ff-head)", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.2em", color: "rgba(226,232,240,0.9)" }}>
            SERUJAN
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hide-mobile">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={`nav-link${active === l.href ? " active" : ""}`}>{l.label}</a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="#contact" className="btn btn-primary hide-mobile" style={{ padding: "0.6rem 1.4rem", fontSize: "0.72rem" }}>
            Hire Me
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{
              background: "none", border: "none", cursor: "none",
              display: "flex", flexDirection: "column", gap: "5px", padding: "6px",
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5, borderRadius: 2,
                background: "var(--c-cyan)",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open
                  ? i === 0 ? "rotate(45deg) translate(4.5px,4.5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(4.5px,-4.5px)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "400px" : "0",
        transition: "max-height 0.4s ease",
        background: "rgba(4,6,15,0.97)",
        borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{ padding: "1.2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}
               style={{ fontSize: "1rem" }}>{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)} style={{ textAlign: "center" }}>
            Hire Me
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}
