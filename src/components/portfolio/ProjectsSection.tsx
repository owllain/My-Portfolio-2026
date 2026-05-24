"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ExternalLink,
  GitFork,
  Star,
  Eye,
  Github,
  RefreshCw,
  FolderGit2,
  Coffee,
  Flame,
  Gamepad2,
  TreePine,
} from "lucide-react";
import dynamic from "next/dynamic";
import CSSAccent3D from "./CSSAccent3D";

const FloatingOrbs = dynamic(() => import("./Accents3D").then(m => m.FloatingOrbs), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  PHP: "#4F5D95",
  Shell: "#89e051",
  PowerShell: "#012456",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
};

/* ── Project type tags ── */
function getProjectTag(name: string): { label: string; color: string } | null {
  switch (name) {
    case "GoZombie-Game-Maker-Lang":
      return { label: "Game Engine", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" };
    case "My-Portfolio-2026":
      return { label: "Portfolio", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" };
    case "AddContent":
      return { label: "CMS", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    case "SYSAlert":
      return { label: "Real-time", color: "text-red-400 bg-red-500/10 border-red-500/20" };
    case "Reporte_Telegestion":
      return { label: "Serverless", color: "text-green-400 bg-green-500/10 border-green-500/20" };
    case "auto-scheduler":
      return { label: "Automation", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" };
    case "tool-expediente-asesores":
      return { label: "Offline-first", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" };
    case "roadmap-2026":
      return { label: "Creative ☕", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" };
    case "thedarkdawn-java-game":
      return { label: "RPG Game", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" };
    case "graficador-de-arboles":
      return { label: "Data Viz", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    default:
      return null;
  }
}

/* ── Project icon by type ── */
function getProjectIcon(name: string) {
  if (name.includes("Game") || name.includes("game") || name.includes("Zombie") || name.includes("darkdawn"))
    return <Gamepad2 className="w-4 h-4 text-orange-500" />;
  if (name.includes("arbol") || name.includes("tree"))
    return <TreePine className="w-4 h-4 text-orange-500" />;
  if (name.includes("roadmap") || name.includes("Portfolio"))
    return <Coffee className="w-4 h-4 text-orange-500" />;
  return <Github className="w-4 h-4 text-orange-500" />;
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error("Failed to fetch repos");
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setError("No se pudieron cargar los repositorios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950/50"
    >
      {/* 3D Floating orbs */}
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} MY_PROJECTS
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Proyectos en <span className="text-orange-500">GitHub</span>
            </h2>
            <CSSAccent3D shape="triangle" color="#f97316" speed={0.4} className="flex-shrink-0" />
            <FolderGit2 className="w-6 h-6 text-orange-500/50" />
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={fetchRepos}
              className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
              title="Refrescar"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900/60 border border-gray-800 rounded-lg p-5 animate-pulse"
              >
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-800 rounded w-full mb-2" />
                <div className="h-3 bg-gray-800 rounded w-2/3 mb-4" />
                <div className="flex gap-3">
                  <div className="h-3 bg-gray-800 rounded w-12" />
                  <div className="h-3 bg-gray-800 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Github className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 mb-2 font-mono text-sm">{error}</p>
            <button
              onClick={fetchRepos}
              className="text-orange-500 font-mono text-sm hover:text-orange-400 transition-colors"
            >
              Reintentar →
            </button>
          </motion.div>
        )}

        {/* Projects grid */}
        {!loading && !error && (
          <div>
            {/* Sub-header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-mono text-sm text-gray-400">
                <span className="text-green-400/70">git</span> log --oneline --all
              </span>
              <span className="font-mono text-[10px] text-gray-600">
                ({repos.length} repositorios)
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, i) => {
                const tag = getProjectTag(repo.name);
                return (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group relative bg-gray-900/60 border border-gray-800 hover:border-orange-500/40 rounded-lg p-5 transition-all cursor-pointer backdrop-blur-sm overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                            {getProjectIcon(repo.name)}
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-sm text-orange-400 group-hover:text-orange-300 font-semibold block truncate max-w-[220px]">
                              {repo.name}
                            </span>
                            {tag && (
                              <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded mt-0.5 inline-block border ${tag.color}`}>
                                {tag.label}
                              </span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-xs mb-4 line-clamp-3 min-h-[2.5rem] leading-relaxed">
                        {repo.description || "Sin descripción"}
                      </p>

                      {/* Footer stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: languageColors[repo.language] || "#8b8b8b" }}
                            />
                            <span className="font-mono">{repo.language}</span>
                          </div>
                        )}
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {repo.watchers_count}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
