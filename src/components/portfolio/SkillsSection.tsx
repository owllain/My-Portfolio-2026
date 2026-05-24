"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code2, Database, Cloud, Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import CSSAccent3D from "./CSSAccent3D";

const FloatingOrbs = dynamic(() => import("./Accents3D").then(m => m.FloatingOrbs), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const skillCategories = [
  {
    title: "Backend",
    icon: Cpu,
    accent: "diamond" as const,
    skills: [
      { name: ".NET 2022", level: 90 },
      { name: "C#", level: 88 },
      { name: "ASP.NET Core", level: 85 },
      { name: "PHP", level: 70 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    accent: "triangle" as const,
    skills: [
      { name: "React", level: 85 },
      { name: "JavaScript ES6+", level: 88 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Tailwind", level: 80 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    accent: "hexagon" as const,
    skills: [
      { name: "SQL Server (T-SQL)", level: 88 },
      { name: "Oracle Database", level: 80 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    title: "Automation & Cloud",
    icon: Cloud,
    accent: "pentagon" as const,
    skills: [
      { name: "Power Automate", level: 92 },
      { name: "Power Apps", level: 90 },
      { name: "Azure Fundamentals", level: 75 },
      { name: "SharePoint / M365", level: 88 },
    ],
  },
  {
    title: "Tools & Methods",
    icon: Wrench,
    accent: "cross" as const,
    skills: [
      { name: "Git", level: 85 },
      { name: "Scrum / Kanban", level: 88 },
      { name: "Power BI", level: 78 },
      { name: "Lean Six Sigma", level: 72 },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D Floating orbs — single Canvas for the whole section */}
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} SKILL_TREE
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Habilidades y <span className="text-orange-500">Tecnologías</span>
            </h2>
            <CSSAccent3D shape="ring" color="#fb923c" speed={0.3} className="flex-shrink-0" />
          </div>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
                className="bg-gray-900/60 border border-gray-800 hover:border-orange-500/30 rounded-xl p-5 transition-colors backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono text-sm font-semibold text-white">
                        {category.title}
                      </h3>
                      <span className="font-mono text-[10px] text-gray-600">
                        {category.skills.length} skills
                      </span>
                    </div>
                    <CSSAccent3D
                      shape={category.accent}
                      color="#f97316"
                      speed={0.4 + catIndex * 0.1}
                      className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity"
                      size={24}
                    />
                  </div>

                  <div className="space-y-3.5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-gray-300 font-mono">{skill.name}</span>
                          <span className="text-xs text-orange-500/70 font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: 0.3 + catIndex * 0.1 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            ".NET", "C#", "React", "TS", "JS", "SQL", "Oracle", "Azure",
            "Power Platform", "Git", "Scrum", "Power BI", "Tailwind", "REST",
          ].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1 + i * 0.03 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(249,115,22,0.15)" }}
              className="font-mono text-xs px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-400 hover:text-orange-400 hover:border-orange-500/40 rounded transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
