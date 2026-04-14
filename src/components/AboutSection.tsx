"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const els = e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right');
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 150);
          });
        }
      });
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ position: "relative", padding: "8rem 0", background: "linear-gradient(180deg, var(--c-bg), #060a16, var(--c-bg))" }}>
      <div className="container">
        <div className="section-tag reveal">01 / About</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          
          <div className="reveal-left" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 360, aspectRatio: "3/4" }}>
              <div className="glass-purple" style={{ position: "absolute", inset: "-15px", transform: "rotate(-3deg)", zIndex: 0 }} />
              <div className="glass-cyan" style={{ position: "absolute", inset: 0, zIndex: 1, padding: 6 }}>
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 12, overflow: "hidden" }}>
                   <Image src="/assets/user/profile.png" alt="Designer" fill style={{ objectFit: "cover" }} />
                   <div className="scanlines" />
                   <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,6,15,0.9), transparent)" }} />
                   <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                     <div className="heading-md cyan-text" style={{ fontSize: "1.2rem", marginBottom: 4 }}>AI Creative</div>
                     <div className="label">Graphic Design • Video</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="heading-lg reveal-right" style={{ marginBottom: "1.5rem" }}>
              Design Meets <br /><span className="gradient-text">Artificial Intelligence</span>
            </h2>
            
            <div className="reveal-right" style={{ color: "var(--c-muted)", fontSize: "1.05rem", display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
              <p>I&apos;m a Graphic Designer and AI Creative who bridges the gap between traditional design and modern artificial intelligence. With a background in information technology and a passion for visual storytelling, I craft designs that speak volumes.</p>
              <p>My workflow blends tools like Photoshop and CapCut with cutting-edge AI platforms including Veo, Sora, Dreamina, Google Flow, Reve, and Higgsfield — creating visuals and videos that feel both human and otherworldly.</p>
            </div>

            <div className="reveal-right" style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
               {["Visual Design", "Prompt Engineering", "Video Production", "Brand Identity", "AI Compositing"].map(tag => (
                 <span key={tag} className="tag tag-purple">{tag}</span>
               ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
