"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Globe,
  ChevronDown,
  ChevronRight,
  Shield,
  Code2,
  BarChart3,
  Languages,
  Coffee,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import CSSAccent3D from "./CSSAccent3D";

const FloatingOrbs = dynamic(() => import("./Accents3D").then(m => m.FloatingOrbs), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const experience = [
  {
    company: "Netcom",
    role: "Supervisor de Operaciones & Automatización",
    period: "2024 – Actualidad",
    tasks: [
      "Diseño de flujos automatizados con Power Automate y Power Apps bajo normativa SICOP",
      "Creación de aplicaciones internas con stack Microsoft y React",
      "Gestión de SLAs y KPIs en entornos críticos bancarios",
    ],
  },
  {
    company: "UNED",
    role: "Desarrollador Full Stack – SISREI",
    period: "2025",
    tasks: [
      "Desarrollo del Sistema de Registro de Estudiantes con .NET",
      "Renovación UI/UX con React, AJAX y Bootstrap",
      "Desarrollo ágil bajo metodología Scrum",
    ],
  },
  {
    company: "Importadora Alemi S.A.",
    role: "Manager – Admin. y Desarrollo de Negocios",
    period: "2019 – 2023",
    tasks: [
      "Administración de BD Oracle y MySQL con dashboards Power BI",
      "Migración de procesos administrativos a plataformas digitales",
    ],
  },
];

const education = [
  { degree: "Lic. Ing. Informática y Sistemas de Calidad", status: "En curso" },
  { degree: "Lic. Ing. Informática y Admin. de Proyectos", status: "En curso" },
  { degree: "Bachillerato en Ingeniería en Informática", status: "2025" },
  { degree: "Diplomado en Ingeniería en Informática", status: "2023" },
];

/* ── Categorized certifications ── */
const certificationCategories = [
  {
    title: "Gestión, Calidad y Metodologías Ágiles",
    icon: Shield,
    accent: "pentagon" as const,
    certs: [
      { name: "SCRUM Foundation Professional Certificate", issuer: "CertiProf" },
      { name: "Auditor Líder ISO 19011", issuer: "Alison" },
      { name: "ISO 9001:2015 – Sistemas de Gestión de Calidad", issuer: "Alison" },
      { name: "Lean Six Sigma White Belt Certification", issuer: "Educate 360" },
      { name: "Six Sigma White Belt in Call Centers", issuer: "Educate 360" },
      { name: "Six Sigma White Belt Certification", issuer: "Educate 360" },
    ],
  },
  {
    title: "Desarrollo de Software y Programación",
    icon: Code2,
    accent: "diamond" as const,
    certs: [
      { name: "Máster Completo en Java de cero a experto 2023 (+127 hrs)", issuer: "Udemy" },
      { name: "Java Avanzado", issuer: "Open Bootcamp" },
      { name: "Java Básico", issuer: "Open Bootcamp" },
      { name: "Go (Basic)", issuer: "HackerRank" },
      { name: "SQL", issuer: "Open Bootcamp" },
      { name: "Formación en Programación -ONE-", issuer: "Alura Latam" },
      { name: ".NET 7: ASP.NET Core esencial", issuer: "LinkedIn Learning" },
      { name: "React avanzado 1", issuer: "LinkedIn Learning" },
      { name: "PHP esencial", issuer: "LinkedIn Learning" },
    ],
  },
  {
    title: "Ingeniería de Datos, Nube y Análisis",
    icon: BarChart3,
    accent: "hexagon" as const,
    certs: [
      { name: "Microsoft Certified: Azure Data Fundamentals", issuer: "Microsoft" },
      { name: "Fundamentos profesionales del análisis de datos", issuer: "Microsoft y LinkedIn" },
      { name: "Fundamentos de la ingeniería de datos", issuer: "LinkedIn Learning" },
      { name: "Introducción a habilidades profesionales en análisis de datos", issuer: "LinkedIn Learning" },
      { name: "Gestión de datos con Microsoft 365", issuer: "LinkedIn Learning" },
      { name: "Revit y Power BI: Análisis de datos", issuer: "LinkedIn Learning" },
    ],
  },
  {
    title: "Idiomas",
    icon: Languages,
    accent: "ring" as const,
    certs: [
      { name: "EF SET English Certificate – Nivel B2 Upper Intermediate", issuer: "EF SET" },
    ],
  },
];

/* ── Collapsible cert category ── */
function CertCategory({
  category,
  index,
  isInView,
}: {
  category: typeof certificationCategories[0];
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
      className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-500/15 transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left group"
      >
        <div className="w-7 h-7 bg-orange-500/10 border border-orange-500/20 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
          <Icon className="w-3.5 h-3.5 text-orange-500" />
        </div>
        <span className="text-xs text-gray-300 font-mono flex-1 group-hover:text-orange-400 transition-colors">
          {category.title}
        </span>
        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded flex-shrink-0">
          {category.certs.length}
        </span>
        <CSSAccent3D shape={category.accent} color="#f97316" speed={0.3} className="w-6 h-6 flex-shrink-0" size={16} />
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-1.5">
              {category.certs.map((cert, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ci * 0.04 }}
                  className="flex items-start gap-2 text-[11px] group/cert"
                >
                  <span className="text-orange-500/50 mt-0.5 flex-shrink-0">▸</span>
                  <span className="text-gray-400 leading-snug flex-1">
                    {cert.name}
                  </span>
                  <span className="text-gray-600 font-mono flex-shrink-0 hidden sm:inline">
                    {cert.issuer}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Floating orbs background */}
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} ABOUT_ME
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Sobre <span className="text-orange-500">Mí</span>
            </h2>
            <CSSAccent3D shape="diamond" color="#f97316" speed={0.4} className="flex-shrink-0" />
          </div>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Layout: Avatar + Bio card on left, details on right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left — Avatar + Bio + Experience */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 sm:p-6 mb-6 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start gap-5 sm:gap-6 relative z-10">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-orange-500/30 shadow-lg shadow-orange-500/10">
                    <Image
                      src="/avatar-new.png"
                      alt="Alvaro Enrique Cascante profile"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>

                {/* Bio info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                    Alvaro Enrique Cascante Moraga
                  </h3>
                  <p className="text-sm text-orange-500/80 font-mono mb-3">
                    Full Stack Software Engineer · .NET Specialist · QA Automation & SDET
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Ingeniero en Informática incorporado al CPIC, especializado en desarrollo de
                    aplicaciones y automatización de procesos bajo el ecosistema Microsoft.
                    Experiencia sólida traduciendo necesidades complejas en soluciones tecnológicas
                    mediante .NET Core, SQL Server y Power Platform, con enfoque en seguridad
                    de la información.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-orange-500/70" />
                      San José, Costa Rica
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Globe className="w-3.5 h-3.5 text-orange-500/70" />
                      Español (Nativo) · Inglés B2
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Coffee className="w-3.5 h-3.5 text-orange-500/70" />
                      Coffee-driven dev
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  <span className="text-orange-500">{">"}</span> <span className="text-green-400/70">cat</span> <span className="text-gray-400">experiencia.log</span> <span className="text-orange-500">|</span> <span className="text-white">Experiencia</span>
                </h3>
                <CSSAccent3D shape="cross" color="#fb923c" speed={0.5} className="w-8 h-8" size={24} />
              </div>
              <div className="space-y-3">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 hover:border-orange-500/20 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-orange-500/3 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/5 transition-colors" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-white text-sm group-hover:text-orange-400 transition-colors">
                          {exp.company}
                        </span>
                        <span className="font-mono text-[11px] text-orange-500/70 bg-orange-500/5 px-2 py-0.5 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs mb-2 font-mono">{exp.role}</div>
                      <ul className="space-y-1">
                        {exp.tasks.map((task, j) => (
                          <li key={j} className="text-gray-500 text-xs flex items-start gap-2">
                            <span className="text-orange-500/70 mt-0.5 flex-shrink-0">▸</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Education + Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[380px] flex-shrink-0 space-y-6 lg:sticky lg:top-24"
          >
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  <span className="text-orange-500">{">"}</span> <span className="text-green-400/70">ls</span> <span className="text-gray-400">~/educación</span> <span className="text-orange-500">|</span> <span className="text-white">Educación</span>
                </h3>
                <CSSAccent3D shape="hexagon" color="#ea580c" speed={0.3} className="w-8 h-8" size={24} />
              </div>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-900/40 border border-gray-800 rounded-lg px-4 py-3 hover:border-orange-500/15 transition-colors"
                  >
                    <span className="text-gray-300 text-xs leading-snug">{edu.degree}</span>
                    <span className="font-mono text-[10px] text-orange-500/70 flex-shrink-0 ml-2 bg-orange-500/5 px-2 py-0.5 rounded">
                      {edu.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-gray-600 font-mono px-1">
                Universidad Estatal a Distancia — UNED
              </div>
            </div>

            {/* Certifications — Categorized */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  <span className="text-orange-500">{">"}</span> <span className="text-green-400/70">grep</span> <span className="text-gray-400">certs/*.json</span> <span className="text-orange-500">|</span> <span className="text-white">Certificaciones</span>
                </h3>
                <CSSAccent3D shape="pentagon" color="#fb923c" speed={0.35} className="w-8 h-8" size={24} />
              </div>
              <div className="space-y-2">
                {certificationCategories.map((cat, i) => (
                  <CertCategory key={cat.title} category={cat} index={i} isInView={isInView} />
                ))}
              </div>
              <div className="mt-3 text-[10px] text-gray-600 font-mono px-1">
                {certificationCategories.reduce((acc, c) => acc + c.certs.length, 0)} certificaciones verificadas
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
