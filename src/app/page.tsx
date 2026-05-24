"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import PixelParticles from "@/components/portfolio/PixelParticles";
import TerminalLoader from "@/components/portfolio/TerminalLoader";
import AmbientSound from "@/components/portfolio/AmbientSound";
import { useTerminalSound } from "@/hooks/use-terminal-sound";

const HeroSection = dynamic(() => import("@/components/portfolio/HeroSection"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/portfolio/AboutSection"), {
  ssr: false,
});
const ProjectsSection = dynamic(() => import("@/components/portfolio/ProjectsSection"), {
  ssr: false,
});
const SkillsSection = dynamic(() => import("@/components/portfolio/SkillsSection"), {
  ssr: false,
});
const ContactSection = dynamic(() => import("@/components/portfolio/ContactSection"), {
  ssr: false,
});

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
      <div className="min-h-screen flex flex-col bg-black animated-gradient modern-grid">
        <PixelParticles />
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
