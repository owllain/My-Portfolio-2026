"use client";

import { motion } from "framer-motion";

/* ── Lightweight CSS-based 3D accent shapes ──
   Replaces SectionAccent3D (which created a full WebGL Canvas per icon)
   with CSS transforms. Eliminates ~11 WebGL contexts while keeping the
   wireframe rotating aesthetic. */

type ShapeType =
  | "diamond"
  | "triangle"
  | "hexagon"
  | "pentagon"
  | "cross"
  | "ring"
  | "octahedron"
  | "torus"
  | "icosahedron"
  | "dodecahedron"
  | "tetrahedron"
  | "torusKnot"
  | "cone"
  | "cylinder";

interface CSSAccent3DProps {
  shape: ShapeType;
  color?: string;
  speed?: number;
  className?: string;
  size?: number;
}

/* ── SVG wireframe shapes ── */
function WireframeSVG({
  shape,
  color,
  size,
}: {
  shape: ShapeType;
  color: string;
  size: number;
}) {
  const s = size;
  const half = s / 2;
  const stroke = color;
  const sw = 1.2;

  switch (shape) {
    case "diamond":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon
            points={`${half},${2} ${s - 2},${half} ${half},${s - 2} ${2},${half}`}
            fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7}
          />
          <polygon
            points={`${half},${6} ${s - 6},${half} ${half},${s - 6} ${6},${half}`}
            fill="none" stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4}
          />
          <line x1={half} y1={2} x2={half} y2={s - 2} stroke={stroke} strokeWidth={sw * 0.4} opacity={0.25} />
          <line x1={2} y1={half} x2={s - 2} y2={half} stroke={stroke} strokeWidth={sw * 0.4} opacity={0.25} />
        </svg>
      );

    case "triangle":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon
            points={`${half},${3} ${s - 3},${s - 3} ${3},${s - 3}`}
            fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7}
          />
          <polygon
            points={`${half},${8} ${s - 7},${s - 7} ${7},${s - 7}`}
            fill="none" stroke={stroke} strokeWidth={sw * 0.6} opacity={0.4}
          />
        </svg>
      );

    case "hexagon":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon
            points={`${half + (half - 2) * Math.cos(Math.PI / 6)},${half - (half - 2) * Math.sin(Math.PI / 6)} ${half + (half - 2) * Math.cos(Math.PI / 3)},${half - (half - 2) * Math.sin(Math.PI / 3)} ${s - 2},${half} ${half + (half - 2) * Math.cos(2 * Math.PI / 3)},${half + (half - 2) * Math.sin(2 * Math.PI / 3)} ${half + (half - 2) * Math.cos(5 * Math.PI / 6)},${half + (half - 2) * Math.sin(5 * Math.PI / 6)} ${2},${half}`}
            fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7}
          />
          <polygon
            points={`${half + (half - 5) * Math.cos(Math.PI / 6)},${half - (half - 5) * Math.sin(Math.PI / 6)} ${half + (half - 5) * Math.cos(Math.PI / 3)},${half - (half - 5) * Math.sin(Math.PI / 3)} ${s - 5},${half} ${half + (half - 5) * Math.cos(2 * Math.PI / 3)},${half + (half - 5) * Math.sin(2 * Math.PI / 3)} ${half + (half - 5) * Math.cos(5 * Math.PI / 6)},${half + (half - 5) * Math.sin(5 * Math.PI / 6)} ${5},${half}`}
            fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.35}
          />
        </svg>
      );

    case "pentagon":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {(() => {
            const pts = Array.from({ length: 5 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
              return `${half + (half - 2) * Math.cos(angle)},${half + (half - 2) * Math.sin(angle)}`;
            });
            const ptsInner = Array.from({ length: 5 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
              return `${half + (half - 5) * Math.cos(angle)},${half + (half - 5) * Math.sin(angle)}`;
            });
            return (
              <>
                <polygon points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
                <polygon points={ptsInner.join(" ")} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.35} />
              </>
            );
          })()}
        </svg>
      );

    case "cross":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path
            d={`M${half - 3},2 L${half + 3},2 L${half + 3},${half - 3} L${s - 2},${half - 3} L${s - 2},${half + 3} L${half + 3},${half + 3} L${half + 3},${s - 2} L${half - 3},${s - 2} L${half - 3},${half + 3} L2,${half + 3} L2,${half - 3} L${half - 3},${half - 3} Z`}
            fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7}
          />
        </svg>
      );

    case "ring":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={half} cy={half} r={half - 3} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <circle cx={half} cy={half} r={half - 6} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.35} />
        </svg>
      );

    case "octahedron":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${half},3 ${s - 3},${half} ${half},${s - 3} ${3},${half}`} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <line x1={3} y1={half} x2={s - 3} y2={half} stroke={stroke} strokeWidth={sw * 0.5} opacity={0.3} />
          <line x1={half} y1={3} x2={half} y2={s - 3} stroke={stroke} strokeWidth={sw * 0.5} opacity={0.3} />
        </svg>
      );

    case "torus":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={half} cy={half} rx={half - 3} ry={half * 0.5} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <ellipse cx={half} cy={half} rx={half * 0.5} ry={half - 3} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.35} />
        </svg>
      );

    case "icosahedron":
    case "dodecahedron":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {(() => {
            const pts = Array.from({ length: 6 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
              return `${half + (half - 3) * Math.cos(angle)},${half + (half - 3) * Math.sin(angle)}`;
            });
            const ptsInner = Array.from({ length: 6 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 6 - Math.PI / 6;
              return `${half + (half * 0.5) * Math.cos(angle)},${half + (half * 0.5) * Math.sin(angle)}`;
            });
            return (
              <>
                <polygon points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.6} />
                <polygon points={ptsInner.join(" ")} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.3} />
                {pts.map((_, i) => (
                  <line key={i} x1={pts[i].split(",")[0]} y1={pts[i].split(",")[1]} x2={ptsInner[i % ptsInner.length].split(",")[0]} y2={ptsInner[i % ptsInner.length].split(",")[1]} stroke={stroke} strokeWidth={sw * 0.3} opacity={0.2} />
                ))}
              </>
            );
          })()}
        </svg>
      );

    case "tetrahedron":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${half},3 ${s - 3},${s - 3} ${3},${s - 3}`} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <line x1={half} y1={3} x2={half} y2={s - 3} stroke={stroke} strokeWidth={sw * 0.4} opacity={0.25} />
        </svg>
      );

    case "torusKnot":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path
            d={`M${half},${3} C${s - 2},${half * 0.5} ${s - 2},${s - 3} ${half},${s - 3} C2,${s - 3} 2,${half * 0.5} ${half},${3}`}
            fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7}
          />
          <path
            d={`M${3},${half} C${half * 0.5},${2} ${s - 2},${2} ${s - 2},${half} C${s - 2},${s - 2} ${half * 0.5},${s - 2} ${3},${half}`}
            fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.4}
          />
        </svg>
      );

    case "cone":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${half},3 ${s - 3},${s - 3} ${3},${s - 3}`} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <ellipse cx={half} cy={s - 3} rx={half - 3} ry={3} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.4} />
        </svg>
      );

    case "cylinder":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={half} cy={5} rx={half - 3} ry={3} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <ellipse cx={half} cy={s - 5} rx={half - 3} ry={3} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.7} />
          <line x1={3} y1={5} x2={3} y2={s - 5} stroke={stroke} strokeWidth={sw * 0.7} opacity={0.5} />
          <line x1={s - 3} y1={5} x2={s - 3} y2={s - 5} stroke={stroke} strokeWidth={sw * 0.7} opacity={0.5} />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={half} cy={half} r={half - 3} fill="none" stroke={stroke} strokeWidth={sw} opacity={0.5} />
        </svg>
      );
  }
}

/* ── Main component: CSS-animated 3D accent ── */
export default function CSSAccent3D({
  shape,
  color = "#f97316",
  speed = 0.5,
  className = "",
  size,
}: CSSAccent3DProps) {
  const defaultSize = className.includes("w-8") ? 28 : className.includes("w-16") ? 56 : 40;
  const s = size || defaultSize;

  // Map speed (0.1–0.6) to animation duration (6s–1.5s)
  const duration = Math.max(1.5, 7 - speed * 10);

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
    >
      <div
        style={{
          width: s,
          height: s,
          animation: `accent3DRotate ${duration}s linear infinite`,
          filter: `drop-shadow(0 0 4px ${color}33)`,
        }}
      >
        <WireframeSVG shape={shape} color={color} size={s} />
      </div>
    </motion.div>
  );
}
