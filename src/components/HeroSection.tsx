"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOOLS = [
  { abbr: "Ps", name: "Photoshop", color: "var(--c-blue)", angle: 0, 
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#31a8ff" rx="20"/><text x="50" y="66" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#001e36" textAnchor="middle">Ps</text></svg> },
  { abbr: "Cc", name: "CapCut", color: "var(--c-pink)", angle: 45, 
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><polygon points="35,30 35,70 70,50" fill="#fff" /></svg> },
  { abbr: "Ve", name: "Veo", color: "var(--c-cyan)", angle: 90, 
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><text x="50" y="68" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#00e5ff" textAnchor="middle">G</text></svg> },
  { abbr: "Gf", name: "Google Flow", color: "var(--c-green)", angle: 135,
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><text x="50" y="68" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#10b981" textAnchor="middle">G</text></svg> },
  { abbr: "Rv", name: "Reve", color: "var(--c-purple)", angle: 180,
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><circle cx="50" cy="50" r="24" fill="#a855f7"/></svg> },
  { abbr: "Nb", name: "NanoBanana", color: "var(--c-gold)", angle: 225,
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><path d="M25,75 Q50,95 75,25 Q65,75 25,75" fill="#f59e0b"/></svg> },
  { abbr: "Dr", name: "Dreamina", color: "var(--c-pink)", angle: 270,
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><circle cx="40" cy="40" r="16" fill="#ec4899"/><circle cx="60" cy="60" r="16" fill="#ec4899"/></svg> },
  { abbr: "So", name: "Sora", color: "var(--c-gold)", angle: 315,
    svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><circle cx="50" cy="50" r="24" stroke="#f59e0b" strokeWidth="6" fill="none"/></svg> },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [orbitRot, setOrbitRot] = useState(0);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 50);
    let raf = 0;
    const animate = () => {
      setOrbitRot((r) => (r + 0.15) % 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      // reduced sensitive movement so it's less laggy
      const rx = (e.clientX / window.innerWidth - 0.5) * 8;
      const ry = (e.clientY / window.innerHeight - 0.5) * -8;
      setMouse({ x: rx, y: ry });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px", overflow: "hidden" }}>
      {/* Background */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />
      <div className="orb orb-cyan" style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "glow-pulse 6s ease-in-out infinite" }} />
      
      <div className="container" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Orbit Wrapper */}
        <div className="hero-orbit" style={{
          position: "relative",
          perspective: 1200,
          marginBottom: "2rem",
        }}>
          {/* Tilt container */}
          <div style={{
            width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            transform: mounted ? `rotateX(${mouse.y}deg) rotateY(${mouse.x}deg)` : "none",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            willChange: "transform"
          }}>
            
            {/* Center Profile */}
            <div style={{
              position: "absolute", zIndex: 5,
              width: 170, height: 170,
              borderRadius: "50%",
              background: "var(--c-bg)",
              border: "2px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 40px rgba(0,229,255,0.2), inset 0 0 20px rgba(0,229,255,0.1)",
              overflow: "hidden",
              animation: "float-y 6s ease-in-out infinite"
            }}>
              <div style={{
                position: "absolute", inset: -20,
                background: "conic-gradient(from 0deg, var(--c-cyan), var(--c-purple), var(--c-cyan))",
                animation: "spin-slow 6s linear infinite",
                opacity: 0.15
              }} />
              <div style={{ position: "absolute", inset: 2, borderRadius: "50%", overflow: "hidden", background: "var(--c-bg2)" }}>
                 <Image src="/assets/user/profile.png" alt="Designer" fill style={{ objectFit: "cover", objectPosition: "top" }} priority />
                 <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,229,255,0.1) 100%)" }} />
              </div>
            </div>

            {/* Orbit Rings & Tools */}
            {[260, 360].map((radius, ringIdx) => (
               <div key={ringIdx} style={{
                 position: "absolute",
                 width: radius, height: radius,
                 borderRadius: "50%",
                 border: `1.5px solid ${ringIdx === 0 ? "rgba(0,229,255,0.15)" : "rgba(168,85,247,0.12)"}`,
                 boxShadow: ringIdx === 0 ? "0 0 30px rgba(0,229,255,0.05)" : "none",
                 transformStyle: "preserve-3d",
                 animation: `spin-${ringIdx === 0 ? "slow" : "reverse"} ${30 + ringIdx * 10}s linear infinite`,
               }}>
                 {TOOLS.filter((_, _i) => _i % 2 === ringIdx).map((t) => {
                   const itemAngle = (t.angle + orbitRot) * (Math.PI / 180);
                   const x = Math.cos(itemAngle) * (radius / 2);
                   const y = Math.sin(itemAngle) * (radius / 2);
                   
                   return (
                     <div key={t.abbr} style={{
                       position: "absolute", left: "50%", top: "50%",
                       transform: `translate(-50%,-50%) translate(${x}px, ${y}px) rotateX(${-mouse.y}deg) rotateY(${-mouse.x}deg)`,
                       transformStyle: "preserve-3d",
                     }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: `rgba(4,6,15,0.8)`,
                          border: `1px solid ${t.color}`,
                          boxShadow: `0 0 15px color-mix(in srgb, ${t.color} 33%, transparent)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--ff-head)", fontWeight: 800, fontSize: "0.75rem", color: t.color,
                          backdropFilter: "blur(10px)"
                        }}>
                          {t.svg ? <div style={{width: 24, height: 24}}>{t.svg}</div> : t.abbr}
                          <div style={{
                            position: "absolute", bottom: -24,
                            fontFamily: "var(--ff-body)", fontSize: "0.5rem", color: t.color,
                            letterSpacing: "0.05em", whiteSpace: "nowrap", opacity: 0.9,
                            textShadow: `0 0 4px ${t.color}`
                          }}>
                            {t.name}
                          </div>
                        </div>
                     </div>
                   );
                 })}
               </div>
            ))}
          </div>
        </div>

        {/* Text Details */}
        <div style={{ textAlign: "center", maxWidth: 700, zIndex: 10 }}>
          <div className="tag tag-cyan mb-6" style={{ marginBottom: "1.5rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-cyan)", marginRight: 6, animation: "blink 1.5s infinite" }} />
            Available for Projects
          </div>
          
          <h1 className="heading-xl mb-4" style={{ marginBottom: "1rem" }}>
            <span style={{ color: "var(--c-text)" }}>AI Integrated</span><br />
            <span className="gradient-text">Graphic Designer</span>
          </h1>
          
          <p style={{ color: "var(--c-muted)", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            I craft visuals, videos, and dynamic concepts by merging traditional design expertise with advanced artificial intelligence workflows.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a href="#portfolio" className="btn btn-primary">
              View Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn btn-outline">Let&apos;s Talk</a>
          </div>

          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", opacity: 0.8 }}>
             {[ {n: "9+", l: "AI Tools"}, {n: "50+", l: "Projects"}, {n: "3+", l: "Years Exp"} ].map(s => (
               <div key={s.l}>
                 <div className="heading-md cyan-text">{s.n}</div>
                 <div className="label pt-1" style={{ paddingTop: "0.25rem" }}>{s.l}</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
        <span className="label">Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--c-cyan), transparent)" }} />
      </div>
      <style>{`
        .hero-orbit { width: 380px; height: 380px; }
        @media (max-width: 440px) { .hero-orbit { transform: scale(0.85); } }
        @media (max-width: 360px) { .hero-orbit { transform: scale(0.75); } }
      `}</style>
    </section>
  );
}
