"use client";
import { useEffect, useRef, useState } from "react";

export function useAnimationActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setActive(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) setEntered(true);
      update();
    }, { threshold: 0 });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); preference.removeEventListener("change", update); };
  }, []);
  return { ref, active, entered };
}
