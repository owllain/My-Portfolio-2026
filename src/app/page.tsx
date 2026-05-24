"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import PixelParticles from "@/components/portfolio/PixelParticles";

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

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black modern-grid">
      <PixelParticles />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
