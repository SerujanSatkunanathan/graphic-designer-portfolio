"use client";
import { useEffect, useRef } from "react";

const STEPS = [
  { n: "01", l: "Concept",        c: "var(--c-gold)",   t: ["Brief", "Moodboard"], i: "💡" },
  { n: "02", l: "Prompt Design",  c: "var(--c-cyan)",   t: ["ChatGPT", "Txt-to-Img"], i: "✍️" },
  { n: "03", l: "AI Generation",  c: "var(--c-purple)", t: ["Veo", "Dreamina"], i: "🤖" },
  { n: "04", l: "Refinement",     c: "var(--c-pink)",   t: ["Photoshop", "CapCut"], i: "🎨" },
  { n: "05", l: "Final Output",   c: "var(--c-green)",  t: ["Publish", "Brand"], i: "✨" }
];

export default function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => {
         if(e.isIntersecting) {
           e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*150));
         }
      })
    }, { threshold: 0.2 });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="workflow" ref={ref} style={{ padding: "8rem 0", background: "linear-gradient(180deg, var(--c-bg), #060a16, var(--c-bg))" }}>
      <div className="container">
        <div className="section-tag reveal">03 / Workflow</div>
        <h2 className="heading-lg reveal mb-4" style={{ marginBottom: "1rem" }}>AI Design Pipeline</h2>
        <p className="reveal" style={{ color: "var(--c-muted)", maxWidth: 600, marginBottom: "4rem" }}>
          How concept meets code to produce world-class creative output.
        </p>

        {/* Desktop Pipeline Layout */}
        <div className="reveal hidden-mobile" style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          
          <div style={{ position: "absolute", top: 44, left: 50, right: 50, height: 2, background: "linear-gradient(90deg, var(--c-gold), var(--c-cyan), var(--c-purple), var(--c-pink), var(--c-green))", opacity: 0.3 }} />

          {STEPS.map(s => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 140, textAlign: "center", zIndex: 1 }}>
               <div style={{ 
                 width: 88, height: 88, borderRadius: "50%", background: "var(--c-bg)",
                 border: `2px solid ${s.c}`, display: "flex", alignItems: "center", justifyContent: "center",
                 fontSize: "2rem", marginBottom: "1.2rem", boxShadow: `0 0 20px color-mix(in srgb, ${s.c} 20%, transparent)`,
                 position: "relative"
               }}>
                 {s.i}
                 <div style={{ position: "absolute", top: -5, right: -5, background: s.c, color: "var(--c-bg)", width: 26, height: 26, borderRadius: "50%", fontFamily: "var(--ff-head)", fontWeight: 900, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   {s.n}
                 </div>
               </div>
               <h3 className="heading-md" style={{ color: s.c, fontSize: "1rem", marginBottom: "0.8rem" }}>{s.l}</h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", width: "100%" }}>
                 {s.t.map(t => <div key={t} className="glass" style={{ padding: "0.3rem", fontSize: "0.75rem", fontFamily: "var(--ff-mono)", color: "var(--c-text)", opacity: 0.8 }}>{t}</div> )}
               </div>
            </div>
          ))}

        </div>

        {/* Mobile Pipeline Layout */}
        <div className="reveal show-mobile">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 34, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--c-gold), var(--c-cyan), var(--c-purple), var(--c-pink), var(--c-green))", opacity: 0.3 }} />
            
            {STEPS.map(s => (
              <div key={s.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", zIndex: 1 }}>
                 <div style={{ 
                   width: 70, height: 70, flexShrink: 0, borderRadius: "50%", background: "var(--c-bg)",
                   border: `2px solid ${s.c}`, display: "flex", alignItems: "center", justifyContent: "center",
                   fontSize: "1.5rem"
                 }}>{s.i}</div>
                 <div className="glass" style={{ padding: "1.2rem", flexGrow: 1 }}>
                   <div className="label" style={{ color: s.c, marginBottom: "0.5rem" }}>{s.n}.</div>
                   <h3 className="heading-md" style={{ marginBottom: "0.8rem", fontSize: "1.2rem" }}>{s.l}</h3>
                   <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                     {s.t.map(t => <span key={t} className="tag" style={{ border: `1px solid color-mix(in srgb, ${s.c} 30%, transparent)`, color: "var(--c-text)" }}>{t}</span>)}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </section>
  );
}
