"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import Image from "next/image";

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
    role: "Manager – Admón. y Desarrollo de Negocios",
    period: "2019 – 2023",
    tasks: [
      "Administración de BD Oracle y MySQL con dashboards Power BI",
      "Migración de procesos administrativos a plataformas digitales",
    ],
  },
];

const education = [
  { degree: "Lic. Ing. Informática y Sistemas de Calidad", status: "En curso" },
  { degree: "Lic. Ing. Informática y Admón. de Proyectos", status: "En curso" },
  { degree: "Bachillerato en Ingeniería en Informática", status: "2025" },
  { degree: "Diplomado en Ingeniería en Informática", status: "2023" },
];

const personalInfo = [
  { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", value: "alvaro.cascante@uned.cr" },
  { icon: <Phone className="w-3.5 h-3.5" />, label: "Teléfono", value: "(+506) 6420-9961" },
  { icon: <MapPin className="w-3.5 h-3.5" />, label: "Ubicación", value: "San José, Costa Rica" },
  { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn", value: "enrique-cascante" },
  { icon: <Github className="w-3.5 h-3.5" />, label: "GitHub", value: "enrique-cascante" },
  { icon: <Globe className="w-3.5 h-3.5" />, label: "Idioma", value: "Español · Inglés B2" },
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
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} ABOUT_ME
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sobre <span className="text-orange-500">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Layout: Info left, framed pixel art right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left — all the info */}
          <div className="flex-1 min-w-0">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 sm:p-6 mb-5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Alvaro Enrique Cascante Moraga</h3>
                  <p className="text-xs text-orange-500/80 font-mono">Full Stack Software Engineer · .NET Specialist</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Ingeniero en Informática incorporado al CPIC, especializado en desarrollo de
                aplicaciones y automatización de procesos bajo el ecosistema Microsoft.
                Experiencia sólida traduciendo necesidades complejas en soluciones tecnológicas
                mediante .NET Core, SQL Server y Power Platform, con enfoque en seguridad
                de la información.
              </p>
            </motion.div>

            {/* Personal info grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5"
            >
              {personalInfo.map((info, i) => (
                <div
                  key={info.label}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/40 border border-gray-800 rounded-lg"
                >
                  <span className="text-orange-500/70 flex-shrink-0">{info.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-gray-500 font-mono">{info.label}</div>
                    <div className="text-xs text-gray-300 truncate">{info.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white">Experiencia</h3>
              </div>
              <div className="space-y-2.5">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 hover:border-orange-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white text-xs">{exp.company}</span>
                      <span className="font-mono text-[10px] text-orange-500/70">{exp.period}</span>
                    </div>
                    <div className="text-gray-400 text-[11px] mb-1.5">{exp.role}</div>
                    <ul className="space-y-0.5">
                      {exp.tasks.map((task, j) => (
                        <li key={j} className="text-gray-500 text-[11px] flex items-start gap-1.5">
                          <span className="text-orange-500/70 mt-0.5">▸</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white">Educación — UNED</h3>
              </div>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-900/40 border border-gray-800 rounded-lg px-3 py-2">
                    <span className="text-gray-300 text-xs">{edu.degree}</span>
                    <span className="font-mono text-[10px] text-orange-500/70 flex-shrink-0 ml-2">{edu.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm text-white">Certificaciones</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
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
                    className="text-[10px] font-mono px-2 py-1 bg-orange-500/5 border border-orange-500/15 text-orange-400/80 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Framed pixel art showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center gap-5 w-52 flex-shrink-0 sticky top-24"
          >
            {/* Framed café scene */}
            <div className="pixel-frame relative p-2">
              <Image
                src="/pixel-cafe-alt.png"
                alt="Pixel art cozy café"
                width={180}
                height={100}
                className="pixel-render rounded"
              />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-mono text-[9px] text-orange-500/60 bg-black/60 px-2 py-0.5 rounded">
                  ☕ workspace
                </span>
              </div>
            </div>

            {/* Framed pixel character */}
            <div className="pixel-frame relative p-3 animate-float">
              <Image
                src="/pixel-character.png"
                alt="Pixel art developer character"
                width={80}
                height={112}
                className="pixel-render"
              />
            </div>

            {/* Framed pixel desk */}
            <div className="pixel-frame relative p-2">
              <Image
                src="/pixel-desk.png"
                alt="Pixel art developer desk"
                width={160}
                height={110}
                className="pixel-render rounded"
              />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-mono text-[9px] text-orange-500/60 bg-black/60 px-2 py-0.5 rounded">
                  ⌨️ SOFTWARE DEV
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
