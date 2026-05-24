"use client";

import { Github, Linkedin, Mail, Terminal, Coffee } from "lucide-react";
import CSSAccent3D from "./CSSAccent3D";

/* ── Cat silhouette SVG ── */
function CatSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C11 2 10 3 10 4V5.5C9.4 5.7 8.9 6.1 8.5 6.5L6 4L5 5L7.3 7.3C6.5 8.5 6 10 6 11.5C6 14 7 16 9 17V20C9 20.6 9.4 21 10 21H11V19C11 18.4 11.4 18 12 18S13 18.4 13 19V21H14C14.6 21 15 20.6 15 20V17C17 16 18 14 18 11.5C18 10 17.5 8.5 16.7 7.3L19 5L18 4L15.5 6.5C15.1 6.1 14.6 5.7 14 5.5V4C14 3 13 2 12 2ZM10 10C10.6 10 11 10.4 11 11S10.6 12 10 12 9 11.6 9 11 9.4 10 10 10ZM14 10C14.6 10 15 10.4 15 11S14.6 12 14 12 13 11.6 13 11 13.4 10 14 10Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-orange-500/10 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo with personality */}
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span className="font-mono text-xs text-gray-500">
              {"<"}AECM{" />"}
            </span>
            <CSSAccent3D shape="octahedron" color="#f97316" speed={0.5} className="w-6 h-6 opacity-50" size={16} />
          </div>

          {/* Center text — cat & coffee powered */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-600">
            <span>© {year}</span>
            <span className="text-gray-700">—</span>
            <span>Built with</span>
            <Coffee className="w-3 h-3 text-orange-500/60" />
            <span>&</span>
            <CatSilhouette className="w-3 h-3 text-orange-500/60" />
            <span>by Alvaro Cascante</span>
          </div>

          {/* Social links — GitHub with cat hover */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/owllain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors group relative"
            >
              <Github className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
              <CatSilhouette className="w-4 h-4 absolute inset-0 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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

        {/* Bottom easter egg line */}
        <div className="mt-4 text-center">
          <span className="font-mono text-[10px] text-gray-800 hover:text-gray-600 transition-colors cursor-default">
            $ cat /dev/urandom | coffee --brew → portfolio.ready ☕🐱
          </span>
        </div>
      </div>
    </footer>
  );
}
