"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Coffee, Cat } from "lucide-react";
import { useTerminalSound } from "@/hooks/use-terminal-sound";

const navItems = [
  { id: "hero", label: "Inicio", icon: "▓" },
  { id: "about", label: "Sobre Mí", icon: "░" },
  { id: "projects", label: "Proyectos", icon: "▒" },
  { id: "skills", label: "Skills", icon: "◈" },
  { id: "contact", label: "Contacto", icon: "◆" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { playClick } = useTerminalSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string, index: number) => {
    playClick(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, [playClick]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-orange-500/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo — cat + coffee personality */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("hero", 0)}
            >
              <div className="relative">
                <Terminal className="w-5 h-5 text-orange-500" />
                {/* Tiny cat ears on the terminal icon */}
                <div className="absolute -top-1 -left-0.5 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[3px] border-l-transparent border-r-transparent border-b-orange-500/60" />
                <div className="absolute -top-1 right-0 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[3px] border-l-transparent border-r-transparent border-b-orange-500/60" />
              </div>
              <span className="font-mono text-sm text-orange-500 hidden sm:inline">
                {"<"}AECM{">"}
              </span>
              <Coffee className="w-3.5 h-3.5 text-orange-500/40 hidden sm:block group-hover:text-orange-400 transition-colors" />
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id, index)}
                  className={`relative px-4 py-2 font-mono text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-400"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.97 }}
                >
                  <span className="mr-1 text-xs opacity-50">{item.icon}</span>
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile toggle */}
            <motion.button
              className="md:hidden p-2 text-orange-500"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playClick(2);
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(item.id, i)}
                  className={`font-mono text-2xl transition-colors ${
                    activeSection === item.id
                      ? "text-orange-500 text-glow-orange"
                      : "text-gray-400 hover:text-orange-400"
                  }`}
                >
                  <span className="mr-2 text-lg opacity-50">{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}

              {/* Cat + Coffee easter egg in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 mt-8 text-gray-600"
              >
                <Cat className="w-5 h-5 text-orange-500/30" />
                <Coffee className="w-4 h-4 text-orange-500/30" />
                <span className="font-mono text-[10px] text-gray-700">cat & coffee powered</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
