"use client";
import { useEffect, useRef } from "react";

const EXPS = [
  { 
    t: "Graphic Designer & Content Creator", 
    c: "Ocean Biome", 
    y: "2020 – 2023", 
    col: "var(--c-cyan)", 
    i: "🌊",
    rs: [
      "Designed social media visuals and brand assets for digital campaigns.",
      "Created awareness posters for ocean conservation and environmental causes.",
      "Produced short-form video content blending AI generation and CapCut edits."
    ]
  },
  { 
    t: "Freelance AI Creative", 
    c: "Independent", 
    y: "2023 – Present", 
    col: "var(--c-purple)", 
    i: "🤖",
    rs: [
      "Generated AI-assisted posters, video content, and brand materials.",
      "Utilized Veo, Dreamina, and Reve for conceptual and cinematic creative content.",
      "Delivered complex photoshop food photography composites and merchandise."
    ]
  }
];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => {
         if(e.isIntersecting) {
           e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*200));
         }
      })
    }, { threshold: 0.1 });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} style={{ padding: "8rem 0" }}>
      <div className="container">
         <div className="section-tag reveal">05 / Experience</div>
         <h2 className="heading-lg reveal mb-4" style={{ marginBottom: "4rem" }}>Professional Timeline</h2>
         
         <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", maxWidth: 900 }}>
            {/* Timeline Line */}
            <div style={{ position: "absolute", left: 32, top: 20, bottom: 20, width: 2, background: "linear-gradient(to bottom, var(--c-cyan), var(--c-purple))", opacity: 0.4 }} className="show-desktop" />

            {EXPS.map((x, _i) => (
               <div key={x.c} className="reveal" style={{ display: "flex", gap: "2rem", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                  
                  {/* Timeline icon */}
                  <div className="show-desktop" style={{ 
                    width: 64, height: 64, borderRadius: "50%", background: `color-mix(in srgb, ${x.col} 15%, transparent)`,
                    border: `2px solid ${x.col}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0,
                    boxShadow: `0 0 20px color-mix(in srgb, ${x.col} 30%, transparent)`,
                  }}>
                     {x.i}
                  </div>

                  <div className="card" style={{ padding: "2.5rem", flexGrow: 1, borderTop: `2px solid ${x.col}`, borderLeft: `1px solid color-mix(in srgb, ${x.col} 20%, transparent)` }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                        <div>
                          <h3 className="heading-md" style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>{x.t}</h3>
                          <div style={{ color: x.col, fontWeight: 600, fontSize: "1.05rem" }}>{x.c}</div>
                        </div>
                        <div className="label" style={{ padding: "0.4rem 1rem", background: "rgba(255,255,255,0.04)", borderRadius: 100, color: "var(--c-muted)" }}>
                          {x.y}
                        </div>
                     </div>
                     <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none" }}>
                       {x.rs.map((r, ri) => (
                         <li key={ri} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                           <span style={{ width: 6, height: 6, borderRadius: "50%", background: x.col, marginTop: 10, flexShrink: 0, boxShadow: `0 0 10px ${x.col}` }} />
                           <span style={{ color: "var(--c-muted)", lineHeight: 1.6 }}>{r}</span>
                         </li>
                       ))}
                     </ul>
                  </div>
               </div>
            ))}
         </div>
      </div>
      <style>{`
         @media (max-width: 768px) {
            .show-desktop { display: none !important; }
            [style*="gap: 2rem"] { gap: 1rem !important; }
            .card { padding: 1.5rem !important; }
         }
      `}</style>
    </section>
  );
}
