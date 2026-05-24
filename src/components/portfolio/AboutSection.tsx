"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { SectionAccent3D, FloatingOrbs } from "./Accents3D";

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
        {/* Section header with 3D accent */}
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
            <SectionAccent3D shape="diamond" color="#f97316" speed={0.4} className="flex-shrink-0" />
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
              {/* Subtle gradient glow on card */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start gap-5 sm:gap-6 relative z-10">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-orange-500/30 shadow-lg shadow-orange-500/10">
                    <Image
                      src="/avatar-new.png"
                      alt="Alvaro Cascante profile"
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
                      Español (Nativo) · Inglés C1
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
                  {"<"}Experiencia{">"}
                </h3>
                <SectionAccent3D shape="cross" color="#fb923c" speed={0.5} className="w-8 h-8" />
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
            className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-24"
          >
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  {"<"}Educación{">"}
                </h3>
                <SectionAccent3D shape="hexagon" color="#ea580c" speed={0.3} className="w-8 h-8" />
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

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white font-semibold">
                  {"<"}Certificaciones{">"}
                </h3>
                <SectionAccent3D shape="pentagon" color="#fb923c" speed={0.35} className="w-8 h-8" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Azure Data Fundamentals",
                  "SCRUM SFPC™",
                  "Java Master",
                  "React Avanzado",
                  ".NET Core ASP.NET",
                  "Lean Six Sigma",
                  "ISO 9001:2015",
                  "Oracle ONE Frontend",
                ].map((cert) => (
                  <span
                    key={cert}
                    className="text-[10px] font-mono px-2.5 py-1.5 bg-orange-500/5 border border-orange-500/15 text-orange-400/80 rounded-md hover:bg-orange-500/10 hover:border-orange-500/30 transition-colors cursor-default"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
