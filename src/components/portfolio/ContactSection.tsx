"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle, Globe } from "lucide-react";
import { Planet3D, SectionAccent3D, FloatingOrbs } from "./Accents3D";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "alvaro.cascante@uned.cr", href: "mailto:alvaro.cascante@uned.cr" },
    { icon: <MapPin className="w-5 h-5" />, label: "Ubicación", value: "San José, Costa Rica", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "enrique-cascante", href: "https://www.linkedin.com/in/enrique-cascante/" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "enrique-cascante", href: "https://github.com/enrique-cascante" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950/50"
    >
      {/* 3D Floating orbs */}
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with 3D planet */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} CONTACT_ME
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Hablemos de tu <span className="text-orange-500">Proyecto</span>
            </h2>
            <Planet3D className="flex-shrink-0" />
          </div>
          <div className="w-20 h-1 bg-orange-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              ¿Tienes un proyecto en mente? ¿Necesitas automatizar procesos o desarrollar
              una aplicación? Estoy disponible para conversar sobre cómo puedo ayudarte
              a transformar tus ideas en soluciones tecnológicas.
            </p>

            <div className="space-y-2.5">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 bg-gray-900/40 border border-gray-800 hover:border-orange-500/30 rounded-lg transition-all group relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-orange-500/3 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/8 transition-colors" />
                  <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 transition-colors relative z-10">
                    {info.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{info.label}</div>
                    <div className="text-sm text-gray-300 group-hover:text-orange-400 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/40 border border-gray-800 rounded-lg"
            >
              <Globe className="w-3.5 h-3.5 text-orange-500/70" />
              <span className="font-mono text-[11px] text-gray-400">Español (Nativo) · Inglés C1</span>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 sm:p-6 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Decorative 3D accent */}
              <div className="absolute -top-4 -right-4 opacity-30">
                <SectionAccent3D shape="dodecahedron" color="#f97316" speed={0.2} className="w-16 h-16" />
              </div>

              <div className="font-mono text-xs text-orange-500/50 mb-5 relative z-10">
                {"/* Contact form */"}
              </div>
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    <span className="text-orange-500/50">const</span> nombre{" "}
                    <span className="text-orange-500/50">=</span>
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors placeholder:text-gray-600"
                    placeholder='"Tu nombre"'
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    <span className="text-orange-500/50">const</span> email{" "}
                    <span className="text-orange-500/50">=</span>
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors placeholder:text-gray-600"
                    placeholder='"tu@email.com"'
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    <span className="text-orange-500/50">const</span> mensaje{" "}
                    <span className="text-orange-500/50">=</span>
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors resize-none placeholder:text-gray-600"
                    placeholder="`Cuéntame sobre tu proyecto...`"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm transition-all ${
                    status === "sent" ? "bg-green-600 text-white"
                      : status === "error" ? "bg-red-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-black"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === "idle" && <><Send className="w-4 h-4" />send_message()</>}
                  {status === "sending" && <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />sending...</>}
                  {status === "sent" && <><CheckCircle className="w-4 h-4" />message_sent ✓</>}
                  {status === "error" && <><AlertCircle className="w-4 h-4" />error — retry</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
