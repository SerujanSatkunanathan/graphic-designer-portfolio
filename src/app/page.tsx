"use client";
import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkflowSection from "@/components/WorkflowSection";
import PortfolioSection from "@/components/PortfolioSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Lenis smooth scrolling
  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      let animId: number;
      function raf(time: number) {
        lenis?.raf(time);
        animId = requestAnimationFrame(raf);
      }
      animId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animId);
        lenis?.destroy();
      };
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Global overlays */}
      <div className="scanline-overlay" />
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Particle background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkflowSection />
      <PortfolioSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
