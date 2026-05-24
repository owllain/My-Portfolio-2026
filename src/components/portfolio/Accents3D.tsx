"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Generic floating accent shape ── */
function FloatingShape({
  geometry,
  color,
  speed,
  wireframe = true,
  scale = 1,
}: {
  geometry: "octahedron" | "torus" | "icosahedron" | "dodecahedron" | "tetrahedron" | "torusKnot" | "cone" | "cylinder" | "diamond" | "triangle" | "ring" | "pentagon" | "hexagon" | "cross";
  color: string;
  speed: number;
  wireframe?: boolean;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.6;
    meshRef.current.rotation.z = t * 0.2;
  });

  const geo = useMemo(() => {
    const s = scale;
    switch (geometry) {
      case "octahedron": return new THREE.OctahedronGeometry(0.5 * s, 0);
      case "torus": return new THREE.TorusGeometry(0.35 * s, 0.12 * s, 8, 16);
      case "icosahedron": return new THREE.IcosahedronGeometry(0.45 * s, 0);
      case "dodecahedron": return new THREE.DodecahedronGeometry(0.45 * s, 0);
      case "tetrahedron": return new THREE.TetrahedronGeometry(0.5 * s, 0);
      case "torusKnot": return new THREE.TorusKnotGeometry(0.3 * s, 0.08 * s, 32, 8);
      case "cone": return new THREE.ConeGeometry(0.35 * s, 0.7 * s, 6);
      case "cylinder": return new THREE.CylinderGeometry(0.3 * s, 0.3 * s, 0.6 * s, 6);
      case "diamond": {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.5 * s);
        shape.lineTo(0.3 * s, 0);
        shape.lineTo(0, -0.5 * s);
        shape.lineTo(-0.3 * s, 0);
        shape.lineTo(0, 0.5 * s);
        return new THREE.ExtrudeGeometry(shape, { depth: 0.08 * s, bevelEnabled: false });
      }
      case "triangle": {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.5 * s);
        shape.lineTo(-0.45 * s, -0.35 * s);
        shape.lineTo(0.45 * s, -0.35 * s);
        shape.lineTo(0, 0.5 * s);
        return new THREE.ExtrudeGeometry(shape, { depth: 0.06 * s, bevelEnabled: false });
      }
      case "ring": return new THREE.TorusGeometry(0.35 * s, 0.03 * s, 8, 24);
      case "pentagon": return new THREE.CylinderGeometry(0.4 * s, 0.4 * s, 0.1 * s, 5);
      case "hexagon": return new THREE.CylinderGeometry(0.4 * s, 0.4 * s, 0.1 * s, 6);
      case "cross": {
        const shape = new THREE.Shape();
        const w = 0.15 * s, h = 0.5 * s;
        shape.moveTo(-w, h); shape.lineTo(w, h); shape.lineTo(w, w);
        shape.lineTo(h, w); shape.lineTo(h, -w); shape.lineTo(w, -w);
        shape.lineTo(w, -h); shape.lineTo(-w, -h); shape.lineTo(-w, -w);
        shape.lineTo(-h, -w); shape.lineTo(-h, w); shape.lineTo(-w, w);
        shape.lineTo(-w, h);
        return new THREE.ExtrudeGeometry(shape, { depth: 0.05 * s, bevelEnabled: false });
      }
      default: return new THREE.OctahedronGeometry(0.5 * s, 0);
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.6 : 0.8}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Planet / Globe for Contact section ── */
function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.15;
      ringRef.current.rotation.x = Math.PI / 2.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.7} emissive="#f97316" emissiveIntensity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.9} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.025, 8, 48]} />
        <meshStandardMaterial color="#fb923c" wireframe={false} transparent opacity={0.5} emissive="#fb923c" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/* ── Public components ── */

export function SectionAccent3D({
  shape,
  color = "#f97316",
  speed = 0.5,
  className = "",
  wireframe = true,
  scale = 1,
}: {
  shape: "octahedron" | "torus" | "icosahedron" | "dodecahedron" | "tetrahedron" | "torusKnot" | "cone" | "cylinder" | "diamond" | "triangle" | "ring" | "pentagon" | "hexagon" | "cross";
  color?: string;
  speed?: number;
  className?: string;
  wireframe?: boolean;
  scale?: number;
}) {
  return (
    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color={color} />
        <FloatingShape geometry={shape} color={color} speed={speed} wireframe={wireframe} scale={scale} />
      </Canvas>
    </div>
  );
}

export function Planet3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#f97316" />
        <pointLight position={[-2, 1, 2]} intensity={0.4} color="#fb923c" />
        <Planet />
      </Canvas>
    </div>
  );
}

/* ── Section background floating orbs + particles ── */
function Orb({
  position,
  radius,
  color,
  speed,
}: {
  position: [number, number];
  radius: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], 0]}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function SectionParticles() {
  const count = 60;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.2]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 5]} intensity={0.6} color="#f97316" />

        <Orb position={[-4, 1.5]} radius={0.6} color="#f97316" speed={0.3} />
        <Orb position={[4.5, -1]} radius={0.45} color="#fb923c" speed={0.4} />
        <Orb position={[-2, -2]} radius={0.35} color="#ea580c" speed={0.5} />
        <Orb position={[2, 2.5]} radius={0.5} color="#f97316" speed={0.25} />
        <Orb position={[-5, -0.5]} radius={0.25} color="#fb923c" speed={0.6} />
        <Orb position={[5.5, 1]} radius={0.3} color="#ea580c" speed={0.35} />

        {/* Section particles */}
        <SectionParticles />
      </Canvas>
    </div>
  );
}
