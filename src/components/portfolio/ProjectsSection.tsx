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
  Heart,
  Flame,
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

/* ── Featured projects (user's favorites) ── */
const FEATURED_REPOS = new Set(["VetFiles", "BancaNet"]);

/* ── Project type tags based on description/repo ── */
function getProjectTag(name: string): { label: string; icon: typeof Coffee } | null {
  switch (name) {
    case "VetFiles":
      return { label: "Full Stack", icon: Flame };
    case "BancaNet":
      return { label: "Fintech", icon: Coffee };
    case "Reporte_Telegestion":
      return { label: "Serverless", icon: Flame };
    case "SYSAlert":
      return { label: "Real-time", icon: Flame };
    case "AddContent":
      return { label: "CMS", icon: Flame };
    case "auto-scheduler":
      return { label: "Automation", icon: Flame };
    case "tool-expediente-asesores":
      return { label: "Offline-first", icon: Flame };
    case "roadmap-2026":
      return { label: "Creative", icon: Coffee };
    default:
      return null;
  }
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

  /* ── Separate featured from regular ── */
  const featuredRepos = repos.filter(r => FEATURED_REPOS.has(r.name));
  const otherRepos = repos.filter(r => !FEATURED_REPOS.has(r.name));

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
          <div className="space-y-8">
            {/* Featured skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={`feat-${i}`}
                  className="bg-gray-900/60 border border-orange-500/20 rounded-lg p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-800 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-800 rounded w-5/6 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-3 bg-gray-800 rounded w-16" />
                    <div className="h-3 bg-gray-800 rounded w-12" />
                  </div>
                </div>
              ))}
            </div>
            {/* Regular skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`reg-${i}`}
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

        {/* Projects display */}
        {!loading && !error && (
          <div className="space-y-8">
            {/* ── Featured Projects ── */}
            {featuredRepos.length > 0 && (
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="font-mono text-sm text-orange-400">
                    <span className="text-green-400/70">head</span> -n2 <span className="text-gray-400">~/favorites.repo</span>
                  </span>
                  <span className="font-mono text-[10px] text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">
                    ⭐ Favoritos
                  </span>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredRepos.map((repo, i) => {
                    const tag = getProjectTag(repo.name);
                    return (
                      <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="group relative bg-gray-900/70 border border-orange-500/30 hover:border-orange-500/60 rounded-lg p-6 transition-all cursor-pointer backdrop-blur-sm overflow-hidden"
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-orange-500/3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-2xl" />

                        <div className="relative z-10">
                          {/* Header row */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-orange-500/15 border border-orange-500/25 rounded-lg flex items-center justify-center group-hover:bg-orange-500/25 transition-colors">
                                <Github className="w-4 h-4 text-orange-500" />
                              </div>
                              <div>
                                <span className="font-mono text-base text-orange-300 group-hover:text-orange-200 font-semibold block leading-tight">
                                  {repo.name}
                                </span>
                                {tag && (
                                  <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                    {tag.label}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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

                          {/* Featured badge */}
                          <div className="absolute top-3 right-10">
                            <span className="font-mono text-[9px] text-orange-400/80 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5 fill-orange-400" />
                              Fav
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── All Other Projects ── */}
            {otherRepos.length > 0 && (
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <FolderGit2 className="w-4 h-4 text-orange-500/70" />
                  <span className="font-mono text-sm text-gray-400">
                    <span className="text-green-400/70">ls</span> ~/projects/all
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    ({otherRepos.length} repositorios)
                  </span>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto pr-2 scroll-area">
                  {otherRepos.map((repo, i) => {
                    const tag = getProjectTag(repo.name);
                    return (
                      <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.35 + i * 0.05 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group bg-gray-900/60 border border-gray-800 hover:border-orange-500/40 rounded-lg p-5 transition-all cursor-pointer backdrop-blur-sm relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Github className="w-4 h-4 text-orange-500/70" />
                              <span className="font-mono text-sm text-orange-400 group-hover:text-orange-300 truncate max-w-[180px]">
                                {repo.name}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                          </div>
                          <p className="text-gray-400 text-xs mb-3 line-clamp-3 min-h-[2.5rem] leading-relaxed">
                            {repo.description || "Sin descripción"}
                          </p>
                          {/* Tag */}
                          {tag && (
                            <div className="mb-3">
                              <span className="font-mono text-[9px] text-orange-500/50 bg-orange-500/5 border border-orange-500/10 px-1.5 py-0.5 rounded">
                                {tag.label}
                              </span>
                            </div>
                          )}
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
        )}
      </div>
    </section>
  );
}
