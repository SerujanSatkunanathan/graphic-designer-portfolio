"use client";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "4rem 0", background: "var(--c-bg2)", position: "relative", zIndex: 10 }}>
       <div className="container" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
               <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, var(--c-cyan), var(--c-purple))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-head)", fontWeight: 900, color: "#030712" }}>S</div>
               <div>
                 <div style={{ fontFamily: "var(--ff-head)", fontWeight: 700, fontSize: "1.1rem" }}>Serujan Satkunanathan</div>
                 <div className="label" style={{ color: "var(--c-muted)" }}>Design • Video • Identity</div>
               </div>
             </div>
             
             <div style={{ display: "flex", gap: "1.5rem" }}>
               <a href="https://www.linkedin.com/in/serujansatkunanathan/" className="card" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", textDecoration: "none" }}>💼</a>
               <a href="https://github.com" className="card" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", textDecoration: "none" }}>🐙</a>
             </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.04)", gap: "1rem" }}>
             <div style={{ color: "var(--c-muted)", fontSize: "0.9rem" }}>
               © {new Date().getFullYear()} Serujan Satkunanathan. All rights reserved.
             </div>
             <div className="label" style={{ color: "var(--c-cyan)" }}>
               Crafted with AI & Code
             </div>
          </div>

       </div>
    </footer>
  );
}
