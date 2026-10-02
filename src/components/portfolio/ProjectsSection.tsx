"use client";

import { useEffect, useState, useCallback } from "react";
import { Github, ExternalLink, RefreshCw, ArrowUpRight } from "lucide-react";
import projectCatalog from "@/lib/project-catalog.json";
import ProjectGallery from "./ProjectGallery";

const catalog: Record<string, { title: string; description: string; category: string; tag: string; images: string[] }> = projectCatalog;
interface GitHubRepo { id: number; name: string; description: string | null; html_url: string; language: string | null; extra_languages?: string[]; }
const priority = ["VetFiles", "budgetpulse", "BancaNet", "AddContent", "Vecinos-y-Servicios-Cond-La-Rueda", "longivet", "tool-expediente-asesores", "week_planner"];

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/github", { signal });
      if (!response.ok) throw new Error("GitHub response failed");
      const data: GitHubRepo[] = await response.json();
      if (!signal?.aborted) { setRepos(data.filter(repo => repo.name !== "fichas-personajes")); setError(null); }
    } catch {
      if (!signal?.aborted) setError("No se pudieron cargar los proyectos. Inténtalo de nuevo.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const start = window.setTimeout(() => { void load(controller.signal); }, 0);
    return () => { window.clearTimeout(start); controller.abort(); };
  }, [load]);
  const refresh = () => { setLoading(true); setError(null); void load(); };
  const featured = repos.filter(repo => catalog[repo.name]?.images.length).sort((a, b) => priority.indexOf(a.name) - priority.indexOf(b.name));
  const others = repos.filter(repo => !catalog[repo.name]?.images.length);
  const renderCard = (repo: GitHubRepo) => {
    const project = catalog[repo.name];
    const title = project?.title || repo.name;
    const technologies = [...new Set([repo.language, ...(repo.extra_languages || [])].filter(Boolean))];
    return (
      <article key={repo.name} className="project-card flex flex-col bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/40 transition-colors">
        {project?.images.length ? <ProjectGallery title={title} images={project.images} /> : null}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-orange-400 border border-orange-500/20 rounded px-2 py-1">{project?.tag || "Desarrollo de software"}</span>
            <Github size={16} className="text-gray-500" aria-hidden="true" />
          </div>
          <h3 className="text-lg text-white font-semibold mb-2"><a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 focus-visible:outline focus-visible:outline-orange-500">{title}</a></h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{project?.description || repo.description || "Proyecto de desarrollo de software."}</p>
          <div className="flex flex-wrap gap-2 mt-auto">{technologies.map(tech => <span key={tech} className="font-mono text-[10px] text-gray-400 bg-gray-900 rounded px-2 py-1">{tech}</span>)}</div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-xs font-mono text-orange-400 hover:text-orange-300 mt-5 focus-visible:outline focus-visible:outline-orange-500">Ver repositorio<ArrowUpRight size={14} /></a>
        </div>
      </article>
    );
  };
  return (
    <section id="projects" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50 scroll-mt-16">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end gap-4 mb-10">
          <div><p className="font-mono text-xs text-orange-500/70 mb-3">{"// SELECTED_WORK"}</p><h2 className="text-3xl sm:text-4xl font-bold text-white">Proyectos que <span className="text-orange-500">resuelven</span></h2><p className="text-gray-400 text-sm mt-4 max-w-xl">Aplicaciones, automatización y herramientas para convertir necesidades reales en soluciones.</p></div>
          <button type="button" onClick={refresh} disabled={loading} aria-label="Actualizar proyectos" className="gallery-arrow disabled:opacity-40"><RefreshCw size={16} /></button>
        </div>
        {loading && <div role="status" className="grid md:grid-cols-2 gap-6">{[0,1].map(key => <div key={key} className="h-80 rounded-xl border border-gray-800 bg-gray-900" />)}<span className="sr-only">Cargando proyectos</span></div>}
        {error && <div role="alert" className="text-gray-400 py-8"><p>{error}</p><button type="button" onClick={refresh} className="mt-3 text-orange-400">Reintentar</button></div>}
        {!loading && !error && <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{featured.map(renderCard)}</div>
          {others.length > 0 && <div className="mt-14"><h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><ExternalLink size={16} className="text-orange-500" />Más proyectos</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{others.map(renderCard)}</div></div>}
        </>}
      </div>
    </section>
  );
}
