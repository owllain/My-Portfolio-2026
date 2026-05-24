"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ExternalLink,
  Star,
  Github,
  RefreshCw,
  FolderGit2,
  Flame,
  Gamepad2,
  TreePine,
  PawPrint,
  Landmark,
  AlertTriangle,
  FileSpreadsheet,
  CalendarClock,
  ClipboardCheck,
  Swords,
  GitBranch,
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
  extra_languages?: string[];
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
  React: "#61dafb",
  "Next.js": "#ffffff",
  "Tailwind CSS": "#06b6d4",
  Prisma: "#2d3748",
  Zustand: "#f5a623",
  ExcelJS: "#e34c26",
  Vite: "#646cff",
  "Shadcn/UI": "#ffffff",
  "Framer Motion": "#ff0055",
  JavaFX: "#e76f00",
  ANTLR: "#e8390e",
  OOP: "#9b59b6",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
};

/* ── Project tag + category ── */
type ProjectMeta = { tag: string; tagColor: string; icon: JSX.Element; category: string };

function getProjectMeta(name: string): ProjectMeta {
  switch (name) {
    case "VetFiles":
      return { tag: "Full Stack", tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <PawPrint className="w-4 h-4" />, category: "🚀 Producción" };
    case "BancaNet":
      return { tag: "Fintech", tagColor: "text-orange-400 bg-orange-500/10 border-orange-500/20", icon: <Landmark className="w-4 h-4" />, category: "🚀 Producción" };
    case "GoZombie-Game-Maker-Lang":
      return { tag: "Game Engine", tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: <Gamepad2 className="w-4 h-4" />, category: "🎮 Creative" };
    case "AddContent":
      return { tag: "CMS", tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: <FileSpreadsheet className="w-4 h-4" />, category: "🏢 Enterprise" };
    case "SYSAlert":
      return { tag: "Real-time", tagColor: "text-red-400 bg-red-500/10 border-red-500/20", icon: <AlertTriangle className="w-4 h-4" />, category: "🏢 Enterprise" };
    case "Reporte_Telegestion":
      return { tag: "Serverless", tagColor: "text-green-400 bg-green-500/10 border-green-500/20", icon: <GitBranch className="w-4 h-4" />, category: "🏢 Enterprise" };
    case "auto-scheduler":
      return { tag: "Automation", tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: <CalendarClock className="w-4 h-4" />, category: "🛠️ Herramientas" };
    case "tool-expediente-asesores":
      return { tag: "Offline-first", tagColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: <ClipboardCheck className="w-4 h-4" />, category: "🛠️ Herramientas" };
    case "thedarkdawn-java-game":
      return { tag: "RPG", tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: <Swords className="w-4 h-4" />, category: "🎮 Creative" };
    case "graficador-de-arboles":
      return { tag: "Data Viz", tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <TreePine className="w-4 h-4" />, category: "🛠️ Herramientas" };
    default:
      return { tag: "Project", tagColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: <Github className="w-4 h-4" />, category: "📦 Otros" };
  }
}

/* ── Category order ── */
const CATEGORY_ORDER = ["🚀 Producción", "🏢 Enterprise", "🛠️ Herramientas", "🎮 Creative", "📦 Otros"];

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

  /* ── Group repos by category ── */
  const grouped = CATEGORY_ORDER.map(cat => ({
    category: cat,
    repos: repos.filter(r => getProjectMeta(r.name).category === cat),
  })).filter(g => g.repos.length > 0);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950/50"
    >
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
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-800 rounded w-32 mb-4 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="bg-gray-900/60 border border-gray-800 rounded-lg p-5 animate-pulse">
                      <div className="h-4 bg-gray-800 rounded w-3/4 mb-3" />
                      <div className="h-3 bg-gray-800 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-800 rounded w-5/6 mb-4" />
                      <div className="flex gap-2">
                        <div className="h-3 bg-gray-800 rounded w-14" />
                        <div className="h-3 bg-gray-800 rounded w-14" />
                        <div className="h-3 bg-gray-800 rounded w-14" />
                      </div>
                    </div>
                  ))}
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

        {/* Projects by category */}
        {!loading && !error && (
          <div className="space-y-10">
            {grouped.map((group, gi) => (
              <div key={group.category}>
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-mono text-sm text-white font-semibold">
                    {group.category}
                  </span>
                  <span className="font-mono text-[10px] text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">
                    {group.repos.length} {group.repos.length === 1 ? "proyecto" : "proyectos"}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
                </motion.div>

                {/* Repo cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.repos.map((repo, i) => {
                    const meta = getProjectMeta(repo.name);
                    const allLangs = [repo.language, ...(repo.extra_languages || [])].filter(Boolean) as string[];

                    return (
                      <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 + gi * 0.1 + i * 0.06 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="group relative bg-gray-900/60 border border-gray-800 hover:border-orange-500/40 rounded-lg p-5 transition-all cursor-pointer backdrop-blur-sm overflow-hidden"
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors text-orange-500">
                                {meta.icon}
                              </div>
                              <div className="min-w-0">
                                <span className="font-mono text-sm text-orange-400 group-hover:text-orange-300 font-semibold block truncate max-w-[200px]">
                                  {repo.name}
                                </span>
                                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded mt-0.5 inline-block border ${meta.tagColor}`}>
                                  {meta.tag}
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 text-xs mb-4 line-clamp-3 min-h-[2.5rem] leading-relaxed">
                            {repo.description || "Sin descripción"}
                          </p>

                          {/* Language tags */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {allLangs.map(lang => (
                              <span
                                key={lang}
                                className="inline-flex items-center gap-1 font-mono text-[10px] text-gray-400 bg-gray-800/60 px-1.5 py-0.5 rounded"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: languageColors[lang] || "#8b8b8b" }}
                                />
                                {lang}
                              </span>
                            ))}
                            {repo.stargazers_count > 0 && (
                              <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-yellow-500 ml-1">
                                <Star className="w-2.5 h-2.5 fill-yellow-500" />
                                {repo.stargazers_count}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
