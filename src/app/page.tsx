"use client";

import { useState, useCallback } from "react";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import TerminalLoader from "@/components/portfolio/TerminalLoader";
import AmbientSound from "@/components/portfolio/AmbientSound";
import { useTerminalSound } from "@/hooks/use-terminal-sound";

import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";

/* ── Cat paw print divider between sections ── */
function PawDivider() {
  const paws = [
    { x: 0, rotate: -15, opacity: 0.15 },
    { x: 20, rotate: 10, opacity: 0.12 },
    { x: 40, rotate: -5, opacity: 0.18 },
    { x: 60, rotate: 15, opacity: 0.10 },
    { x: 80, rotate: -10, opacity: 0.14 },
  ];

  return (
    <div className="relative h-8 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <div className="flex items-center gap-0">
        {paws.map((paw, i) => (
          <span
            key={i}
            className="text-xs"
            style={{
              transform: `translateX(${paw.x}px) rotate(${paw.rotate}deg)`,
              opacity: paw.opacity,
            }}
          >
            🐾
          </span>
        ))}
      </div>
      {/* Faint line connecting paws */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
    </div>
  );
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const { playBoot } = useTerminalSound();

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <TerminalLoader onComplete={handleLoadComplete} onBootSound={playBoot} />}
      <div className="min-h-screen flex flex-col bg-black modern-grid">
        <Navigation />
        <main className="flex-1">
          <HeroSection />
          <PawDivider />
          <AboutSection />
          <PawDivider />
          <ProjectsSection />
          <PawDivider />
          <SkillsSection />
          <PawDivider />
          <ContactSection />
        </main>
        <Footer />
        <AmbientSound />
      </div>
    </>
  );
}
