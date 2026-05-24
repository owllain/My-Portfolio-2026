"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const skillCategories = [
  {
    title: "Backend",
    icon: "⚙️",
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
    icon: "🎨",
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
    icon: "🗄️",
    skills: [
      { name: "SQL Server (T-SQL)", level: 88 },
      { name: "Oracle Database", level: 80 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    title: "Automation & Cloud",
    icon: "☁️",
    skills: [
      { name: "Power Automate", level: 92 },
      { name: "Power Apps", level: 90 },
      { name: "Azure Fundamentals", level: 75 },
      { name: "SharePoint / M365", level: 88 },
    ],
  },
  {
    title: "Tools & Methods",
    icon: "🛠️",
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
    <section id="skills" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} SKILL_TREE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Habilidades y <span className="text-orange-500">Tecnologías</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Pixel art character decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="animate-float">
            <Image
              src="/pixel-character.png"
              alt="Pixel art developer"
              width={60}
              height={90}
              className="pixel-render drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            />
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
              className="bg-gray-900/60 border border-gray-800 hover:border-orange-500/30 rounded-xl p-5 transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-mono text-sm font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
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
            </motion.div>
          ))}
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
