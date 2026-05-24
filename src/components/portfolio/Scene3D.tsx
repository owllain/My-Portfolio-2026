"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
      rotation={[0, 0, 0]}
    />
  );
}

function FloatingShape({
  position,
  geometry,
  speed,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "octahedron" | "torus" | "icosahedron" | "box" | "dodecahedron" | "torusKnot" | "tetrahedron" | "cone" | "sphere";
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
    meshRef.current.position.y =
      position[1] + Math.sin(t + position[0]) * 0.5;
  });

  const geo = useMemo(() => {
    const s = scale;
    switch (geometry) {
      case "octahedron": return new THREE.OctahedronGeometry(0.6 * s, 0);
      case "torus": return new THREE.TorusGeometry(0.4 * s, 0.15 * s, 8, 16);
      case "icosahedron": return new THREE.IcosahedronGeometry(0.5 * s, 0);
      case "box": return new THREE.BoxGeometry(0.5 * s, 0.5 * s, 0.5 * s);
      case "dodecahedron": return new THREE.DodecahedronGeometry(0.45 * s, 0);
      case "torusKnot": return new THREE.TorusKnotGeometry(0.3 * s, 0.08 * s, 32, 8);
      case "tetrahedron": return new THREE.TetrahedronGeometry(0.5 * s, 0);
      case "cone": return new THREE.ConeGeometry(0.35 * s, 0.7 * s, 6);
      case "sphere": return new THREE.SphereGeometry(0.4 * s, 12, 12);
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
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

function ParticlesField() {
  const count = 180;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.03}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

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

        {/* Main shapes - spread across the scene */}
        <FloatingShape position={[-3, 1, -2]} geometry="octahedron" speed={0.4} color="#f97316" />
        <FloatingShape position={[3.5, 0.5, -3]} geometry="torus" speed={0.3} color="#fb923c" />
        <FloatingShape position={[-2, -1, -4]} geometry="icosahedron" speed={0.25} color="#ea580c" />
        <FloatingShape position={[2, 2, -5]} geometry="box" speed={0.35} color="#f97316" />

        {/* Additional shapes - more volume */}
        <FloatingShape position={[5, 1.5, -4]} geometry="dodecahedron" speed={0.2} color="#fb923c" scale={0.8} />
        <FloatingShape position={[-4.5, -0.5, -3]} geometry="torusKnot" speed={0.3} color="#f97316" scale={0.7} />
        <FloatingShape position={[0.5, -2, -2]} geometry="tetrahedron" speed={0.45} color="#ea580c" scale={0.6} />
        <FloatingShape position={[-1.5, 2.5, -6]} geometry="cone" speed={0.25} color="#fb923c" scale={0.8} />
        <FloatingShape position={[4, -1.5, -5]} geometry="sphere" speed={0.35} color="#f97316" scale={0.7} />
        <FloatingShape position={[-5.5, 2, -6]} geometry="octahedron" speed={0.15} color="#ea580c" scale={0.5} />
        <FloatingShape position={[1, 3, -7]} geometry="dodecahedron" speed={0.2} color="#f97316" scale={0.4} />
        <FloatingShape position={[-3, -2.5, -3]} geometry="torus" speed={0.4} color="#fb923c" scale={0.5} />
        <FloatingShape position={[6, 0, -6]} geometry="icosahedron" speed={0.18} color="#ea580c" scale={0.6} />
      </Canvas>
    </div>
  );
}
