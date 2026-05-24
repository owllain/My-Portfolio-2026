"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Howl } from "howler";

export default function AmbientSound() {
  const [muted, setMuted] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    howlRef.current = new Howl({
      src: ["/ambient-terminal.mp3"],
      loop: true,
      volume: 0,
      html5: false,
      preload: true,
    });

    if (howlRef.current && !muted) {
      howlRef.current.play();
      howlRef.current.fade(0, 0.25, 1500);
    }

    return () => {
      howlRef.current?.unload();
    };
  }, []);

  const toggle = () => {
    if (!howlRef.current) return;
    if (muted) {
      howlRef.current.play();
      howlRef.current.fade(0, 0.25, 1500);
    } else {
      howlRef.current.fade(0.25, 0, 800);
      setTimeout(() => {
        howlRef.current?.pause();
      }, 850);
    }
    setMuted(!muted);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-gray-900/80 border border-gray-800 hover:border-orange-500/40 rounded-full text-gray-500 hover:text-orange-500 transition-all backdrop-blur-sm group"
      title={muted ? "Activar sonido ambiente" : "Silenciar"}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
      ) : (
        <Volume2 className="w-4 h-4 text-orange-500 animate-pulse" />
      )}
    </motion.button>
  );
}
