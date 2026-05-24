"use client";

import { Github, Linkedin, Mail, Terminal, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-orange-500/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span className="font-mono text-xs text-gray-500">
              {"<"}AECM{" />"}
            </span>
          </div>

          {/* Center text */}
          <div className="flex items-center gap-1 font-mono text-xs text-gray-600">
            <span>© {year} Built with</span>
            <Heart className="w-3 h-3 text-orange-500 inline" />
            <span>by Alvaro Cascante</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/enrique-cascante"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/enrique-cascante/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:alvaro.cascante@uned.cr"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Pixel decoration */}
        <div className="mt-6 flex items-center gap-1 justify-center">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-sm ${
                i === 20
                  ? "bg-orange-500/60"
                  : i % 4 === 0
                  ? "bg-orange-500/25"
                  : "bg-gray-800/50"
              }`}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
