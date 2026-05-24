"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Floating grid floor ── */
function FloatingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = ((state.clock.elapsedTime * 0.15) % 1) * 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#f97316", "#1a1a1a"]}
      position={[0, -3, 0]}
    />
  );
}

/* ── Generic floating shape ── */
function FloatingShape({
  position,
  geometry,
  speed,
  color,
  scale = 1,
  floatAmplitude = 0.5,
}: {
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  speed: number;
  color: string;
  scale?: number;
  floatAmplitude?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.z = t * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * floatAmplitude;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

/* ── Text / Letter shape (3D extruded) ── */
function FloatingLetter({
  position,
  letter,
  speed,
  color,
  scale = 0.3,
}: {
  position: [number, number, number];
  letter: string;
  speed: number;
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shapeGeo = useMemo(() => {
    const s = new THREE.Shape();
    const sz = scale * 0.8;
    switch (letter) {
      case "A":
        s.moveTo(0, sz); s.lineTo(-sz * 0.6, -sz); s.lineTo(-sz * 0.3, -sz);
        s.lineTo(-sz * 0.15, -sz * 0.4); s.lineTo(sz * 0.15, -sz * 0.4);
        s.lineTo(sz * 0.3, -sz); s.lineTo(sz * 0.6, -sz); s.lineTo(0, sz);
        break;
      case "E":
        s.moveTo(-sz * 0.4, sz); s.lineTo(-sz * 0.4, -sz); s.lineTo(sz * 0.4, -sz);
        s.lineTo(sz * 0.4, -sz * 0.65); s.lineTo(-sz * 0.1, -sz * 0.65);
        s.lineTo(-sz * 0.1, -sz * 0.15); s.lineTo(sz * 0.2, -sz * 0.15);
        s.lineTo(sz * 0.2, sz * 0.15); s.lineTo(-sz * 0.1, sz * 0.15);
        s.lineTo(-sz * 0.1, sz * 0.65); s.lineTo(sz * 0.4, sz * 0.65);
        s.lineTo(sz * 0.4, sz); s.lineTo(-sz * 0.4, sz);
        break;
      case "C":
        s.moveTo(sz * 0.4, sz); s.lineTo(-sz * 0.4, sz); s.lineTo(-sz * 0.4, -sz);
        s.lineTo(sz * 0.4, -sz); s.lineTo(sz * 0.4, -sz * 0.65);
        s.lineTo(-sz * 0.1, -sz * 0.65); s.lineTo(-sz * 0.1, sz * 0.65);
        s.lineTo(sz * 0.4, sz * 0.65); s.lineTo(sz * 0.4, sz);
        break;
      case "M":
        s.moveTo(-sz * 0.5, -sz); s.lineTo(-sz * 0.5, sz); s.lineTo(-sz * 0.25, sz);
        s.lineTo(0, sz * 0.2); s.lineTo(sz * 0.25, sz); s.lineTo(sz * 0.5, sz);
        s.lineTo(sz * 0.5, -sz); s.lineTo(sz * 0.25, -sz); s.lineTo(sz * 0.25, sz * 0.5);
        s.lineTo(0, -sz * 0.2); s.lineTo(-sz * 0.25, sz * 0.5); s.lineTo(-sz * 0.25, -sz);
        s.lineTo(-sz * 0.5, -sz);
        break;
      default: // Diamond/rhombus
        s.moveTo(0, sz); s.lineTo(sz * 0.5, 0); s.lineTo(0, -sz); s.lineTo(-sz * 0.5, 0); s.lineTo(0, sz);
    }
    return new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false });
  }, [letter, scale]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={shapeGeo}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Diamond shape ── */
function FloatingDiamond({
  position,
  speed,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5 * scale);
    s.lineTo(0.3 * scale, 0);
    s.lineTo(0, -0.5 * scale);
    s.lineTo(-0.3 * scale, 0);
    s.lineTo(0, 0.5 * scale);
    return new THREE.ExtrudeGeometry(s, { depth: 0.08 * scale, bevelEnabled: false });
  }, [scale]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.6;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Triangle shape ── */
function FloatingTriangle({
  position,
  speed,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5 * scale);
    s.lineTo(-0.45 * scale, -0.35 * scale);
    s.lineTo(0.45 * scale, -0.35 * scale);
    s.lineTo(0, 0.5 * scale);
    return new THREE.ExtrudeGeometry(s, { depth: 0.06 * scale, bevelEnabled: false });
  }, [scale]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.z = t * 0.4;
    meshRef.current.position.y = position[1] + Math.cos(t + position[2]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

/* ── Ring / Circle shape ── */
function FloatingRing({
  position,
  speed,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  speed: number;
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.35;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.35, 0.02, 8, 32]} />
      <meshStandardMaterial
        color={color}
        wireframe={false}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

/* ── Massive particles field ── */
function ParticlesField() {
  const count = 350;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f97316"
        size={0.035}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Scene composition ── */
const shapeConfigs = [
  // Original shapes
  { pos: [-3, 1, -2] as [number, number, number], type: "octahedron", speed: 0.4, color: "#f97316", scale: 1 },
  { pos: [3.5, 0.5, -3] as [number, number, number], type: "torus", speed: 0.3, color: "#fb923c", scale: 1 },
  { pos: [-2, -1, -4] as [number, number, number], type: "icosahedron", speed: 0.25, color: "#ea580c", scale: 1 },
  { pos: [2, 2, -5] as [number, number, number], type: "box", speed: 0.35, color: "#f97316", scale: 1 },
  // More polyhedrons
  { pos: [5, 1.5, -4] as [number, number, number], type: "dodecahedron", speed: 0.2, color: "#fb923c", scale: 0.8 },
  { pos: [-4.5, -0.5, -3] as [number, number, number], type: "torusKnot", speed: 0.3, color: "#f97316", scale: 0.7 },
  { pos: [0.5, -2, -2] as [number, number, number], type: "tetrahedron", speed: 0.45, color: "#ea580c", scale: 0.6 },
  { pos: [-1.5, 2.5, -6] as [number, number, number], type: "cone", speed: 0.25, color: "#fb923c", scale: 0.8 },
  { pos: [4, -1.5, -5] as [number, number, number], type: "sphere", speed: 0.35, color: "#f97316", scale: 0.7 },
  { pos: [-5.5, 2, -6] as [number, number, number], type: "octahedron", speed: 0.15, color: "#ea580c", scale: 0.5 },
  { pos: [1, 3, -7] as [number, number, number], type: "dodecahedron", speed: 0.2, color: "#f97316", scale: 0.4 },
  { pos: [-3, -2.5, -3] as [number, number, number], type: "torus", speed: 0.4, color: "#fb923c", scale: 0.5 },
  { pos: [6, 0, -6] as [number, number, number], type: "icosahedron", speed: 0.18, color: "#ea580c", scale: 0.6 },
];

export default function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#f97316" />
        <pointLight position={[-5, 3, -5]} intensity={0.4} color="#fb923c" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#ea580c" />

        <FloatingGrid />
        <ParticlesField />

        {/* Polyhedron shapes */}
        {shapeConfigs.map((cfg, i) => (
          <FloatingShape
            key={`shape-${i}`}
            position={cfg.pos}
            geometry={
              cfg.type === "octahedron" ? new THREE.OctahedronGeometry(0.6 * cfg.scale, 0) :
              cfg.type === "torus" ? new THREE.TorusGeometry(0.4 * cfg.scale, 0.15 * cfg.scale, 8, 16) :
              cfg.type === "icosahedron" ? new THREE.IcosahedronGeometry(0.5 * cfg.scale, 0) :
              cfg.type === "box" ? new THREE.BoxGeometry(0.5 * cfg.scale, 0.5 * cfg.scale, 0.5 * cfg.scale) :
              cfg.type === "dodecahedron" ? new THREE.DodecahedronGeometry(0.45 * cfg.scale, 0) :
              cfg.type === "torusKnot" ? new THREE.TorusKnotGeometry(0.3 * cfg.scale, 0.08 * cfg.scale, 32, 8) :
              cfg.type === "tetrahedron" ? new THREE.TetrahedronGeometry(0.5 * cfg.scale, 0) :
              cfg.type === "cone" ? new THREE.ConeGeometry(0.35 * cfg.scale, 0.7 * cfg.scale, 6) :
              cfg.type === "sphere" ? new THREE.SphereGeometry(0.4 * cfg.scale, 12, 12) :
              new THREE.OctahedronGeometry(0.5 * cfg.scale, 0)
            }
            speed={cfg.speed}
            color={cfg.color}
            scale={cfg.scale}
          />
        ))}

        {/* Diamonds */}
        <FloatingDiamond position={[-6, 1, -5]} speed={0.2} color="#fb923c" scale={0.7} />
        <FloatingDiamond position={[5.5, -1.5, -4]} speed={0.3} color="#f97316" scale={0.5} />
        <FloatingDiamond position={[-1, 3, -8]} speed={0.15} color="#ea580c" scale={0.4} />
        <FloatingDiamond position={[3, 2.5, -7]} speed={0.25} color="#fb923c" scale={0.6} />

        {/* Triangles */}
        <FloatingTriangle position={[1.5, -2, -3]} speed={0.35} color="#f97316" scale={0.6} />
        <FloatingTriangle position={[-4, 0.5, -5]} speed={0.2} color="#ea580c" scale={0.8} />
        <FloatingTriangle position={[6.5, 2, -6]} speed={0.3} color="#fb923c" scale={0.5} />
        <FloatingTriangle position={[-2.5, -3, -4]} speed={0.25} color="#f97316" scale={0.4} />

        {/* Rings / Circles */}
        <FloatingRing position={[-5, 2.5, -7]} speed={0.2} color="#fb923c" scale={0.8} />
        <FloatingRing position={[4, 3, -5]} speed={0.3} color="#f97316" scale={0.6} />
        <FloatingRing position={[0, -2.5, -3]} speed={0.25} color="#ea580c" scale={0.5} />
        <FloatingRing position={[-3.5, -1.5, -6]} speed={0.35} color="#fb923c" scale={0.7} />

        {/* Letters */}
        <FloatingLetter position={[-6.5, -1, -5]} letter="A" speed={0.15} color="#f97316" scale={0.5} />
        <FloatingLetter position={[6, 1, -7]} letter="E" speed={0.2} color="#fb923c" scale={0.4} />
        <FloatingLetter position={[0, 3.5, -8]} letter="C" speed={0.18} color="#ea580c" scale={0.35} />
        <FloatingLetter position={[-3, 3, -9]} letter="M" speed={0.12} color="#f97316" scale={0.3} />
      </Canvas>
    </div>
  );
}
