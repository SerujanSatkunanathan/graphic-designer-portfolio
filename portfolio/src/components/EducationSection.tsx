"use client";
import { useEffect, useRef } from "react";

const EDU = [
  { d: "BSc (Hons) Information Technology", i: "Horizon Campus", y: "2021 – 2025", c: "var(--c-cyan)", g: "GPA 3.21", icon: "🎓", 
    hs: ["Specialized in digital systems & software", "Merged IT skills with AI-assisted workflows"] },
  { d: "GCE Advanced Level", i: "Secondary Education", y: "2018 – 2020", c: "var(--c-purple)", g: null, icon: "📚",
    hs: ["Strong analytical foundation in sciences", "Early foundation in digital media concepts"] }
];

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => {
         if(e.isIntersecting) {
           e.target.querySelectorAll('.reveal-left, .reveal-right').forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*200));
         }
      })
    }, { threshold: 0.1 });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} style={{ padding: "8rem 0", background: "linear-gradient(180deg, var(--c-bg), #060a16, var(--c-bg))" }}>
      <div className="container">
         <div className="section-tag reveal-left">06 / Education</div>
         <h2 className="heading-lg reveal-left mb-4" style={{ marginBottom: "5rem" }}>Academic Journey</h2>
         
         <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
            <div className="timeline-track" />
            
            {EDU.map((e, i) => {
               const left = i % 2 === 0;
               return (
                 <div key={e.d} style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", position: "relative", marginBottom: "4rem" }}>
                    
                    {/* Center Node */}
                    <div className={`timeline-node ${!left ? "purple" : ""}`} style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 32 }} />

                    <div className={left ? "reveal-left" : "reveal-right"} style={{ width: "45%" }}>
                      <div className="card" style={{ padding: "2rem", border: `1px solid color-mix(in srgb, ${e.c} 20%, transparent)` }}>
                         <div className="label" style={{ display: "inline-block", padding: "0.4rem 1rem", background: `color-mix(in srgb, ${e.c} 15%, transparent)`, color: e.c, borderRadius: 100, marginBottom: "1rem" }}>{e.y}</div>
                         <h3 className="heading-md" style={{ marginBottom: "0.2rem" }}>{e.d}</h3>
                         <div style={{ color: e.c, fontWeight: 500, marginBottom: "1rem" }}>{e.i}</div>
                         
                         {e.g && (
                           <div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center", padding: "0.4rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: "1.2rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                             <span className="label" style={{ color: "var(--c-muted)" }}>GPA</span>
                             <span style={{ fontFamily: "var(--ff-head)", fontWeight: 700, color: e.c }}>{e.g.split(" ")[1]}</span>
                           </div>
                         )}

                         <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none" }}>
                           {e.hs.map(h => (
                              <li key={h} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: e.c, marginTop: 10, flexShrink: 0 }} />
                                <span style={{ color: "var(--c-muted)", fontSize: "0.95rem" }}>{h}</span>
                              </li>
                           ))}
                         </ul>
                      </div>
                    </div>

                 </div>
               );
            })}
         </div>

         <style>{`
           @media (max-width: 768px) {
             .timeline-track { left: 24px; transform: none; }
             .timeline-node { left: -14px !important; transform: none !important; }
             [style*="width: 45%"] { width: 100% !important; padding-left: 3rem; }
             [style*="justify-content: flex-end"] { justify-content: flex-start !important; }
             [style*="justify-content: flex-start"] { justify-content: flex-start !important; }
           }
         `}</style>
      </div>
    </section>
  );
}
