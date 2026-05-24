"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient modern-grid"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 z-[2] scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* System status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 inline-block"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-orange-500/70 bg-orange-500/5 px-4 py-2 rounded border border-orange-500/20">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            SYSTEM.ONLINE — PORTFOLIO.V2
          </div>
        </motion.div>

        {/* Name + framed pixel character */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-white">Alvaro </span>
            <span className="text-orange-500 text-glow-orange">Cascante</span>
          </h1>
          {/* Framed pixel character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            className="hidden sm:block"
          >
            <div className="pixel-frame relative p-1 animate-float">
              <Image
                src="/pixel-character-cafe.png"
                alt="Pixel art developer"
                width={60}
                height={82}
                className="pixel-render"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <div className="inline-block font-mono text-sm sm:text-base text-gray-400 bg-gray-900/80 px-6 py-3 rounded-lg border border-gray-700/50">
            <span className="text-orange-500">{">"}</span> Full Stack Software Engineer{" "}
            <span className="text-orange-500">|</span> .NET Specialist{" "}
            <span className="text-orange-500">|</span> QA Automation & SDET
            <span className="cursor-blink" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Ingeniero en Informática especializado en desarrollo de aplicaciones y automatización
          de procesos. Transformando ideas en soluciones con{" "}
          <span className="text-orange-400">.NET</span>,{" "}
          <span className="text-orange-400">React</span> y{" "}
          <span className="text-orange-400">Power Platform</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 font-mono text-sm rounded-lg transition-all"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:alvaro.cascante@uned.cr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 font-mono text-sm rounded-lg transition-all"
          >
            <Mail className="w-4 h-4" />
            Email
          </motion.a>
        </motion.div>

        {/* Pixel art decoration line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-1"
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
