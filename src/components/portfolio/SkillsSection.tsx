"use client";
import CSSAccent3D from "./CSSAccent3D";
import { motion } from "framer-motion";
import { Workflow, Code2, Database, BrainCircuit, PanelsTopLeft, ShieldCheck } from "lucide-react";

const categories = [
  { title: "Power Platform y automatización", icon: Workflow, context: "Aplicaciones y flujos para simplificar procesos empresariales.", skills: ["Power Apps", "Power Automate", "Power BI", "SharePoint", "Microsoft 365"] },
  { title: "Desarrollo de aplicaciones", icon: Code2, context: "Análisis, desarrollo, mantenimiento e integración de sistemas.", skills: ["C#", ".NET / ASP.NET Core", "APIs REST", "Integración de sistemas"] },
  { title: "Datos y análisis", icon: Database, context: "Información útil para dar seguimiento y apoyar decisiones.", skills: ["SQL Server / T-SQL", "Oracle", "MySQL", "Power BI", "Procesamiento de Excel y PDF"] },
  { title: "Interfaces web", icon: PanelsTopLeft, context: "Experiencias claras para aplicaciones y herramientas internas.", skills: ["React", "TypeScript", "JavaScript", "HTML / CSS", "Tailwind CSS"] },
  { title: "Inteligencia artificial", icon: BrainCircuit, context: "AI Foundations · Comisión de IA del CPIC. Uso responsable de IA en software y automatización.", skills: ["Fundamentos de IA", "Modelos de lenguaje (LLM)", "IA aplicada a procesos", "Buenas prácticas y ética de IA"] },
  { title: "Calidad y trabajo en equipo", icon: ShieldCheck, context: "Mejora continua, trazabilidad y continuidad de los servicios.", skills: ["Git / GitHub", "Scrum", "ISO 9001:2015", "Auditoría ISO 19011", "Lean Six Sigma"] },
];

export default function SkillsSection() {
  return <section id="skills" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16"><div className="relative z-10 max-w-6xl mx-auto">
    <p className="font-mono text-xs text-orange-500/70 mb-3">{"// TOOLKIT"}</p>
    <h2 className="text-3xl sm:text-4xl font-bold text-white">Habilidades y <span className="text-orange-500">Tecnologías</span></h2>
    <p className="mt-4 mb-10 text-gray-400 text-sm max-w-2xl">Mi enfoque: desarrollo de aplicaciones y automatización de procesos en Popular Valores, combinando el ecosistema Microsoft, datos e inteligencia artificial.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{categories.map(category => <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35 }} key={category.title} className="bg-gray-950 border border-gray-800 hover:border-orange-500/30 transition-colors rounded-xl p-6">
      <div className="flex items-center justify-between mb-5"><category.icon size={22} className="text-orange-400" aria-hidden="true" /><CSSAccent3D shape="diamond" size={24} speed={0.15} className="opacity-60" /></div>
      <h3 className="text-white font-semibold text-sm mb-3">{category.title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed mb-5">{category.context}</p>
      <ul className="flex flex-wrap gap-2">{category.skills.map(skill => <li key={skill} className="text-[11px] text-gray-300 bg-gray-900 border border-gray-800 px-2.5 py-1.5 rounded font-mono">{skill}</li>)}</ul>
    </motion.article>)}</div>
  </div></section>;
}
