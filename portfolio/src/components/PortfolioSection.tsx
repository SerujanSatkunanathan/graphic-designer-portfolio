"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Design {
  src: string;
  title: string;
  cat: string;
  c: string;
  isVideo?: boolean;
}

const WORKS: Design[] = [
  { src: "https://www.instagram.com/p/DW37-qOjJG8/embed", isVideo: true, title: "Creative Video Reel 1", cat: "Video Production", c: "var(--c-gold)" },
  { src: "https://www.instagram.com/p/DWZKriijFHR/embed", isVideo: true, title: "Creative Video Reel 2", cat: "Video Production", c: "var(--c-cyan)" },
  { src: "/assets/designs/13th anniversary treetoo v3.jpg", title: "Anniversary Treetoo", cat: "Brand Event", c: "var(--c-gold)" },
  { src: "/assets/designs/VISITING FRONT final v1@1.25x.png", title: "Visiting Card", cat: "Brand Identity", c: "var(--c-cyan)" },
  { src: "/assets/designs/anniversary liya cafe v8.jpg", title: "Liya Cafe Anniversary", cat: "Social Media", c: "var(--c-pink)" },
  { src: "/assets/designs/food festival v10.jpg", title: "Food Festival", cat: "Event Poster", c: "var(--c-gold)" },
  { src: "/assets/designs/icecream v3.jpg", title: "Ice Cream Visual", cat: "Product Design", c: "var(--c-green)" },
  { src: "/assets/designs/makeup final.jpg", title: "Makeup Brand", cat: "Beauty & Fashion", c: "var(--c-purple)" },
  { src: "/assets/designs/mike walk final-01-04-02-03-01.jpeg", title: "Mike Walk Creative", cat: "Digital Art", c: "var(--c-cyan)" },
  { src: "/assets/designs/pasta shower final.jpg", title: "Pasta Shower Splash", cat: "Food Print", c: "var(--c-gold)" },
  { src: "/assets/designs/kottu shower final.jpg", title: "Kottu Shower Splash", cat: "Food Print", c: "var(--c-pink)" },
  { src: "/assets/designs/world oceans day 2.jpg", title: "World Oceans Day", cat: "Awareness", c: "var(--c-cyan)" },
  { src: "/assets/designs/tshirt.png", title: "T-Shirt Design", cat: "Merchandise", c: "var(--c-purple)" },
  { src: "/assets/designs/tution v6.jpg", title: "Tuition Promotional", cat: "Education", c: "var(--c-green)" },
];

const CATS = ["All", ...Array.from(new Set(WORKS.map((d) => d.cat)))];

export default function PortfolioSection() {
  const [active, setActive] = useState("All");
  const [modal, setModal] = useState<Design | null>(null);
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
    
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => { ob.disconnect(); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { document.body.style.overflow = modal ? "hidden" : ""; }, [modal]);

  const f = active === "All" ? WORKS : WORKS.filter(w => w.cat === active);

  return (
    <section id="portfolio" ref={ref} style={{ padding: "8rem 0" }}>
      <div className="container">
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <div className="section-tag reveal">04 / Portfolio</div>
            <h2 className="heading-lg reveal">Creative Works</h2>
          </div>
          
          <div className="reveal" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", maxWidth: 600 }}>
             {CATS.slice(0, 6).map(c => (
               <button key={c} onClick={() => setActive(c)} style={{
                 background: active === c ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.03)",
                 border: `1px solid ${active === c ? "var(--c-cyan)" : "rgba(255,255,255,0.1)"}`,
                 color: active === c ? "var(--c-cyan)" : "var(--c-muted)",
                 padding: "0.4rem 1rem", borderRadius: 100, fontFamily: "var(--ff-body)", fontSize: "0.85rem",
                 cursor: "none", transition: "all 0.3s"
               }}>{c}</button>
             ))}
          </div>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="reveal" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "1.5rem",
          gridAutoRows: "260px"
        }}>
          {f.map((w, i) => (
             <div key={w.src} className="portfolio-item" onClick={() => setModal(w)} style={{
               gridRow: i % 4 === 0 ? "span 2" : "span 1"
             }}>
                {w.isVideo ? (
                   <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, color-mix(in srgb, ${w.c} 20%, transparent), rgba(4,6,15,0.8))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", border: `1px solid ${w.c}` }}>▶️</div>
                   </div>
                ) : (
                   <Image src={w.src} alt={w.title} fill style={{ objectFit: "cover" }} />
                )}
                <div className="overlay">
                  <div className="label" style={{ color: w.c, marginBottom: "0.3rem" }}>{w.cat}</div>
                  <h3 className="heading-md" style={{ fontSize: "1.2rem", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>{w.title}</h3>
                </div>
                <div className="view-btn">🔍</div>
             </div>
          ))}
        </div>

      </div>

      {modal && (
        <div className="modal-wrap" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "var(--c-muted)", fontSize: "2rem", cursor: "none" }}>×</button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "2rem" }}>
               <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", border: `1px solid color-mix(in srgb, ${modal.c} 30%, transparent)` }}>
                  {modal.isVideo ? (
                    <iframe src={modal.src} width="100%" height="100%" frameBorder="0" scrolling="no" allowTransparency={true} allow="encrypted-media" style={{ border: "none" }} />
                  ) : (
                    <Image src={modal.src} alt={modal.title} fill style={{ objectFit: "contain", background: "#000" }} />
                  )}
               </div>
               <div>
                 <div className="tag" style={{ border: `1px solid ${modal.c}`, color: modal.c, marginBottom: "1.5rem" }}>{modal.cat}</div>
                 <h3 className="heading-xl" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{modal.title}</h3>
                 <p style={{ color: "var(--c-muted)", marginBottom: "2rem" }}>High quality layout and typography combination crafted for digital and print formats. Integrated AI generation where suitable to accelerate asset creation.</p>
                 <div className="label" style={{ color: "var(--c-cyan)", marginBottom: "0.8rem" }}>Creation Flow</div>
                 <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                   {["Concept", "AI Assist", "Composite", "Final Output"].map((s, idx) => (
                      <span key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className="glass" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", color: "var(--c-text)" }}>{s}</span>
                        {idx !== 3 && <span style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}>→</span>}
                      </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
