"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D className="w-full h-full" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-[1]" />
      <div className="absolute inset-0 modern-grid z-[1]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 z-[2] scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* System status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-orange-500/80 bg-orange-500/5 px-4 py-2 rounded border border-orange-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            SYSTEM.ONLINE — PORTFOLIO.V2
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-white">Alvaro </span>
            <span className="text-orange-500 text-glow-orange">Cascante</span>
          </h1>
        </motion.div>

        {/* Terminal subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <div className="inline-block font-mono text-sm sm:text-base text-gray-300 bg-gray-950/80 px-6 py-3 rounded-lg border border-gray-700/50 backdrop-blur-sm">
            <span className="text-orange-500">{">"}</span>{" "}
            Full Stack Software Engineer{" "}
            <span className="text-orange-500">|</span> .NET Specialist{" "}
            <span className="text-orange-500">|</span> QA Automation & SDET
            <span className="cursor-blink" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Ingeniero en Informática especializado en desarrollo de aplicaciones y automatización
          de procesos. Transformando ideas en soluciones con{" "}
          <span className="text-orange-400 font-mono">.NET</span>,{" "}
          <span className="text-orange-400 font-mono">React</span> y{" "}
          <span className="text-orange-400 font-mono">Power Platform</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            href="https://github.com/enrique-cascante"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,115,22,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-mono text-sm rounded-lg transition-all"
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/enrique-cascante/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 font-mono text-sm rounded-lg transition-all backdrop-blur-sm bg-black/20"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:alvaro.cascante@uned.cr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 font-mono text-sm rounded-lg transition-all backdrop-blur-sm bg-black/20"
          >
            <Mail className="w-4 h-4" />
            Email
          </motion.a>
        </motion.div>

        {/* Pixel decoration line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-1"
        >
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 ${
                i === 12
                  ? "bg-orange-500"
                  : i % 3 === 0
                  ? "bg-orange-500/40"
                  : "bg-gray-700/40"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="font-mono text-xs text-gray-500">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
