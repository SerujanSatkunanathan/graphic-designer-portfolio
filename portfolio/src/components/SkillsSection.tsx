"use client";
import { useState, useRef, useEffect } from "react";

const CATS = [
  { id: "design", label: "Design", c: "var(--c-blue)", icon: "🎨", tools: [
    { n: "Photoshop", a: "Ps", u: "Photo compositing & illustration.", l: 92, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#31a8ff" rx="20"/><text x="50" y="66" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#001e36" textAnchor="middle">Ps</text></svg> },
    { n: "CapCut", a: "Cc", u: "Short-form & motion graphics.", l: 88, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><polygon points="35,30 35,70 70,50" fill="#fff" /></svg> }
  ]},
  { id: "video", label: "AI Video", c: "var(--c-cyan)", icon: "🎬", tools: [
    { n: "Veo", a: "Ve", u: "Cinematic AI video generation.", l: 85, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><text x="50" y="68" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#00e5ff" textAnchor="middle">G</text></svg> },
    { n: "Sora", a: "So", u: "High-quality temporal text-to-video.", l: 78, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><circle cx="50" cy="50" r="24" stroke="#00e5ff" strokeWidth="6" fill="none"/></svg> },
    { n: "Higgsfield", a: "Hf", u: "Physics-aware motion video.", l: 77 }
  ]},
  { id: "creative", label: "AI Creative", c: "var(--c-purple)", icon: "🤖", tools: [
    { n: "Dreamina", a: "Dr", u: "Creative art styles & scenes.", l: 90, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><circle cx="40" cy="40" r="16" fill="#a855f7"/><circle cx="60" cy="60" r="16" fill="#a855f7"/></svg> },
    { n: "Google Flow", a: "Gf", u: "Visual workflow automation.", l: 80, svg: <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><rect width="100" height="100" fill="#222" rx="20"/><text x="50" y="68" fontFamily="var(--ff-head)" fontSize="56" fontWeight="bold" fill="#a855f7" textAnchor="middle">G</text></svg> },
    { n: "Reve", a: "Rv", u: "Precise style control AI.", l: 82 },
    { n: "NanoBanana", a: "Nb", u: "Rapid AI visual prototyping.", l: 75 }
  ]}
];

export default function SkillsSection() {
  const [active, setActive] = useState("design");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => {
         if(e.isIntersecting) {
           e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*100));
         }
      })
    }, { threshold: 0.1 });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const cat = CATS.find(c => c.id === active)!;

  return (
    <section id="skills" ref={ref} style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="section-tag reveal">02 / Skills</div>
        <h2 className="heading-lg reveal mb-4" style={{ marginBottom: "1rem" }}>AI Creative Stack</h2>
        <p className="reveal" style={{ color: "var(--c-muted)", maxWidth: 600, marginBottom: "3rem" }}>
          A curated ecosystem of robust design tools and cutting-edge generative AI platforms.
        </p>

        {/* Tabs */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              background: active === c.id ? `color-mix(in srgb, ${c.c} 15%, transparent)` : "rgba(255,255,255,0.03)",
              border: `1px solid ${active === c.id ? c.c : "rgba(255,255,255,0.1)"}`,
              color: active === c.id ? c.c : "var(--c-muted)",
              padding: "0.6rem 1.4rem", borderRadius: 100, display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--ff-body)", fontWeight: 600, cursor: "none", transition: "all 0.3s"
            }}>
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
           {cat.tools.map((t, _i) => (
             <div key={t.n} className="card" style={{ padding: "2rem", borderTop: `2px solid ${cat.c}`, animation: `fade-in 0.4s ease-out forwards`, animationDelay: `${_i * 0.1}s`, opacity: 0 }}>
               <div style={{
                 width: 54, height: 54, borderRadius: 12, background: `color-mix(in srgb, ${cat.c} 12%, transparent)`,
                 border: `1px solid color-mix(in srgb, ${cat.c} 30%, transparent)`,
                 display: "flex", alignItems: "center", justifyContent: "center",
                 fontFamily: "var(--ff-head)", fontWeight: 800, fontSize: "1.2rem", color: cat.c, marginBottom: "1.5rem"
               }}>
                 {t.svg ? <div style={{width: 32, height: 32}}>{t.svg}</div> : t.a}
               </div>
               <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>{t.n}</h3>
               <p style={{ color: "var(--c-muted)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem", minHeight: 45 }}>{t.u}</p>
               <div className="skill-bar-track">
                 <div className="skill-bar-fill" style={{ width: `${t.l}%` }} />
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
