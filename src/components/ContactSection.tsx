"use client";
import { useState, useRef, useEffect } from "react";

const LINKS = [
  { l: "Email", v: "serujansatkunanathan@gmail.com", h: "mailto:serujansatkunanathan@gmail.com", c: "var(--c-cyan)", i: "📧" },
  { l: "Phone", v: "+94 755 049 713", h: "tel:+94755049713", c: "var(--c-purple)", i: "📱" },
  { l: "LinkedIn", v: "in/serujansatkunanathan", h: "https://www.linkedin.com/in/serujansatkunanathan/", c: "var(--c-blue)", i: "💼" }
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => {
         if(e.isIntersecting) {
           e.target.querySelectorAll('.reveal').forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*150));
         }
      })
    }, { threshold: 0.1 });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const sub = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoad(false);
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 0", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-purple" style={{ width: 600, height: 600, right: "-10%", bottom: "-10%", opacity: 0.4 }} />
      <div className="container" style={{ position: "relative", zIndex: 5 }}>
         <div className="section-tag reveal">07 / Contact</div>
         <h2 className="heading-lg reveal mb-4" style={{ marginBottom: "1rem" }}>Let&apos;s Connect</h2>
         <p className="reveal" style={{ color: "var(--c-muted)", maxWidth: 600, marginBottom: "4rem" }}>
           Have a project in mind? Let&apos;s collaborate and build something extraordinary utilizing design and AI.
         </p>

         <div className="contact-grid">
            
            {/* Links */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
               {LINKS.map(l => (
                 <a key={l.l} href={l.h} className="card" style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1.5rem", textDecoration: "none" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: `color-mix(in srgb, ${l.c} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${l.c} 30%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                      {l.i}
                    </div>
                    <div>
                      <div className="label" style={{ color: "var(--c-muted)", marginBottom: "0.2rem" }}>{l.l}</div>
                      <div style={{ color: l.c, fontWeight: 500, fontSize: "1.1rem" }}>{l.v}</div>
                    </div>
                 </a>
               ))}
            </div>

            {/* Form */}
            <div className="reveal" style={{ padding: "2.5rem", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
               {sent ? (
                 <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "1.5rem", minHeight: 400 }}>
                    <div style={{ fontSize: "4rem" }}>🚀</div>
                    <h3 className="heading-lg" style={{ color: "var(--c-cyan)" }}>Message Sent</h3>
                    <p style={{ color: "var(--c-muted)" }}>Thanks for reaching out! I will get back to you shortly.</p>
                    <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another</button>
                 </div>
               ) : (
                 <form onSubmit={sub} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>Send a Message</h3>
                    
                    <div>
                      <label className="form-label">Name</label>
                      <input type="text" required className="form-input" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input type="email" required className="form-input" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="form-label">Message</label>
                      <textarea required className="form-input" rows={5} placeholder="Tell me about your project..." style={{ resize: "vertical" }} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", opacity: load ? 0.7 : 1 }} disabled={load}>
                       {load ? "Sending..." : "Submit Message"}
                    </button>
                 </form>
               )}
            </div>

         </div>
      </div>
      <style>{`
         .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; }
         @media (max-width: 768px) {
           .contact-grid { gap: 2rem; }
           #contact { padding: 5rem 0 !important; }
         }
      `}</style>
    </section>
  );
}
