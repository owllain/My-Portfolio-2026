"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase, Award } from "lucide-react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const education = [
  {
    institution: "Universidad Estatal a Distancia (UNED)",
    degree: "Licenciatura en Ingeniería en Informática y Sistemas de Calidad",
    status: "En curso",
  },
  {
    institution: "Universidad Estatal a Distancia (UNED)",
    degree: "Licenciatura en Ingeniería en Informática y Administración de Proyectos",
    status: "En curso",
  },
  {
    institution: "Universidad Estatal a Distancia (UNED)",
    degree: "Bachillerato en Ingeniería en Informática",
    status: "2025",
  },
  {
    institution: "Universidad Estatal a Distancia (UNED)",
    degree: "Diplomado en Ingeniería en Informática",
    status: "2023",
  },
];

const experience = [
  {
    company: "Netcom",
    role: "Supervisor de Operaciones & Automatización de Procesos",
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
    role: "Manager – Administración y Desarrollo de Negocios",
    period: "2019 – 2023",
    tasks: [
      "Administración de bases de datos Oracle y MySQL con dashboards Power BI",
      "Migración de procesos administrativos a plataformas digitales",
    ],
  },
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
      {/* 3D Model */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
        <Scene3D
          url="/models/dev.glb"
          scale={3}
          position={[0, -1, 0]}
          autoRotate
          cameraPosition={[0, 1, 4]}
          ambientIntensity={0.4}
          showShadows={false}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} ABOUT_ME
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sobre <span className="text-orange-500">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-6 sm:p-8 mb-12 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Alvaro Enrique Cascante Moraga
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500/70" />
                San José, Costa Rica
              </div>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Ingeniero en Informática incorporado al Colegio de Profesionales en Informática y
            Computación (CPIC), especializado en el desarrollo de aplicaciones y automatización
            de procesos bajo el ecosistema Microsoft. Cuento con experiencia sólida traduciendo
            necesidades complejas en soluciones tecnológicas mediante .NET Core, SQL Server y
            la suite de Power Platform. Experiencia en optimizar flujos de trabajo operativos y
            modernizar plataformas legacy con un enfoque en seguridad de la información.
          </p>
        </motion.div>

        {/* Experience & Education grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-orange-500" />
              <h3 className="font-mono text-lg text-white">Experiencia</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white text-sm">{exp.company}</span>
                    <span className="font-mono text-xs text-orange-500/70">{exp.period}</span>
                  </div>
                  <div className="text-gray-400 text-xs mb-2">{exp.role}</div>
                  <ul className="space-y-1">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="text-gray-500 text-xs flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">▸</span>
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
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-orange-500" />
              <h3 className="font-mono text-lg text-white">Educación</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{edu.institution}</span>
                    <span className="font-mono text-xs text-orange-500/70">{edu.status}</span>
                  </div>
                  <div className="text-gray-400 text-xs">{edu.degree}</div>
                </motion.div>
              ))}
            </div>

            {/* Certifications preview */}
            <div className="flex items-center gap-2 mb-4 mt-8">
              <Award className="w-5 h-5 text-orange-500" />
              <h3 className="font-mono text-lg text-white">Certificaciones</h3>
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
              ].map((cert, i) => (
                <motion.span
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  className="text-xs font-mono px-3 py-1.5 bg-orange-500/5 border border-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/10 transition-colors"
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
