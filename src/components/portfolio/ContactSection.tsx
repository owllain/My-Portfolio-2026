"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
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
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "alvaro.cascante@uned.cr",
      href: "mailto:alvaro.cascante@uned.cr",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Teléfono",
      value: "(+506) 6420-9961",
      href: "tel:+50664209961",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Ubicación",
      value: "San José, Costa Rica",
      href: "#",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "enrique-cascante",
      href: "https://linkedin.com/in/enrique-cascante",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "enrique-cascante",
      href: "https://github.com/enrique-cascante",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950/50"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with small pixel accent */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-orange-500/70 mb-2">
            {"//"} CONTACT_ME
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Hablemos de tu <span className="text-orange-500">Proyecto</span>
            </h2>
            {/* Small pixel character accent */}
            <div className="animate-float">
              <Image
                src="/pixel-character-cafe.png"
                alt=""
                width={30}
                height={42}
                className="pixel-render opacity-50"
              />
            </div>
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
                  className="flex items-center gap-3 p-2.5 bg-gray-900/40 border border-gray-800 hover:border-orange-500/30 rounded-lg transition-all group"
                >
                  <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono">{info.label}</div>
                    <div className="text-sm text-gray-300 group-hover:text-orange-400 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Language badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/40 border border-gray-800 rounded-lg"
            >
              <span className="text-xs">🌎</span>
              <span className="font-mono text-[10px] text-gray-400">
                Español (Nativo) · Inglés B2
              </span>
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
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 sm:p-6 backdrop-blur-sm"
            >
              <div className="font-mono text-xs text-orange-500/50 mb-5">
                {"/* Contact form */"}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    nombre:
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors placeholder:text-gray-600"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    email:
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors placeholder:text-gray-600"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">
                    mensaje:
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 font-mono focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors resize-none placeholder:text-gray-600"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm transition-all ${
                    status === "sent"
                      ? "bg-green-600 text-white"
                      : status === "error"
                      ? "bg-red-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-black"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === "idle" && (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensaje
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      ¡Mensaje Enviado!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Error al enviar
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
