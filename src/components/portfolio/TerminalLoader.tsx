"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "AECM SYSTEM v2.0.25", delay: 0 },
  { text: "Initializing kernel...", delay: 280 },
  { text: "Loading modules: [react] [three.js] [framer-motion]", delay: 550 },
  { text: "cat /dev/urandom → initializing cat mode 🐱", delay: 850 },
  { text: ">> brewing coffee... ☕ done", delay: 1100 },
  { text: "Mounting 3D renderer... OK", delay: 1400 },
  { text: "Compiling portfolio assets... OK", delay: 1650 },
  { text: "Establishing GitHub connection... OK", delay: 1900 },
  { text: "Portfolio ready. Fuel: coffee ☕ | Spirit: cat 🐱", delay: 2300 },
];

interface TerminalLoaderProps {
  onComplete: () => void;
  onBootSound?: () => void;
}

export default function TerminalLoader({ onComplete, onBootSound }: TerminalLoaderProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    bootLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, bootLines[i].delay)
      );
    });

    // Start fade out after all lines shown
    timers.push(
      setTimeout(() => {
        setFadeOut(true);
        // Play boot sound when fade starts
        if (onBootSound) onBootSound();
      }, 3100)
    );

    // Complete after fade
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 3700)
    );

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onComplete, onBootSound]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="w-full max-w-2xl px-6 sm:px-8">
            {/* Terminal window chrome */}
            <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/80 backdrop-blur">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[11px] text-gray-500 ml-2">
                  aecm@portfolio:~
                </span>
                {/* Cat + Coffee icons in title bar */}
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="text-[10px]">🐱</span>
                  <span className="text-[10px]">☕</span>
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-4 sm:p-5 font-mono text-sm space-y-1.5 min-h-[260px]">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-orange-500/60 select-none">$</span>
                    <span
                      className={
                        i === 0
                          ? "text-orange-400 font-semibold"
                          : i === bootLines.length - 1
                          ? "text-green-400"
                          : line.text.includes("🐱") || line.text.includes("☕")
                          ? "text-orange-300"
                          : "text-gray-400"
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}

                {/* Cursor */}
                {visibleLines < bootLines.length && (
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500/60 select-none">$</span>
                    <span className="text-gray-400">
                      {showCursor ? "▊" : " "}
                    </span>
                  </div>
                )}

                {/* Progress bar */}
                {visibleLines > 1 && visibleLines < bootLines.length && (
                  <div className="mt-3">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden max-w-xs">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${(visibleLines / bootLines.length) * 100}%`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
