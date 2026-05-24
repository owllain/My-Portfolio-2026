"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Pixel art café background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pixel-cafe.png"
          alt=""
          fill
          className="object-cover opacity-15 pixel-render"
          priority
        />
      </div>

      {/* Pixel grid overlay */}
      <div className="absolute inset-0 z-[1] pixel-grid" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black z-[2]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 z-[3] scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Pixel character as small accent to the left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute -left-2 sm:left-2 top-8 hidden sm:block"
        >
          <div className="animate-float">
            <Image
              src="/pixel-character-cafe.png"
              alt="Pixel art developer"
              width={50}
              height={70}
              className="pixel-render opacity-40 hover:opacity-70 transition-opacity"
            />
          </div>
        </motion.div>

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

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          <span className="text-white">Alvaro </span>
          <span className="text-orange-500 text-glow-orange">Cascante</span>
        </motion.h1>

        {/* Terminal subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <div className="inline-block font-mono text-sm sm:text-base text-gray-400 bg-gray-900/80 px-6 py-3 rounded-lg border border-gray-700/50">
            <span className="text-orange-500">{">"}</span> Full Stack Developer{" "}
            <span className="text-orange-500">|</span> Automation Engineer{" "}
            <span className="text-orange-500">|</span> Problem Solver
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
            href="https://linkedin.com/in/enrique-cascante"
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
