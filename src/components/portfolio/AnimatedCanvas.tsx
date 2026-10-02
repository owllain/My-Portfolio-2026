"use client";
import { useEffect, type ComponentProps } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useAnimationActivity } from "@/hooks/use-animation-activity";

function FrameDriver({ active }: { active: boolean }) {
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (now - previous >= 1000 / 30) { invalidate(); previous = now; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, invalidate]);
  return null;
}

export default function AnimatedCanvas({ children, ...props }: ComponentProps<typeof Canvas>) {
  const { ref, active, entered } = useAnimationActivity();
  return <div ref={ref} className="h-full w-full" aria-hidden="true">
    {entered && <Canvas {...props} frameloop="demand" dpr={1} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
      <FrameDriver active={active} />{children}
    </Canvas>}
  </div>;
}
