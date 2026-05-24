"use client";

import { useCallback, useRef } from "react";

/* ── Terminal click sounds via Web Audio API ──
   Generates short oscillator beeps that sound like mechanical keyboard / terminal keys.
   Each nav item gets a slightly different pitch for variation. */

const frequencies = [880, 932, 988, 1047, 1109]; // A5 to C#6 — pentatonic-ish

export function useTerminalSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback((index: number = 0) => {
    try {
      const ctx = getContext();
      if (ctx.state === "suspended") ctx.resume();

      const freq = frequencies[index % frequencies.length];

      // Main click — short sine beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);

      // Sub click — noise-like transient
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "square";
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);
      gain2.gain.setValueAtTime(0.03, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.03);
    } catch {
      // Silently fail if audio isn't available
    }
  }, [getContext]);

  const playBoot = useCallback(() => {
    try {
      const ctx = getContext();
      if (ctx.state === "suspended") ctx.resume();

      // Two-tone boot beep (like old terminals)
      [660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.15);
      });
    } catch {
      // Silently fail
    }
  }, [getContext]);

  return { playClick, playBoot };
}
