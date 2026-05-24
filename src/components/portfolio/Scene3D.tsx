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
}: {
  position: [number, number, number];
  geometry: "octahedron" | "torus" | "icosahedron" | "box";
  speed: number;
  color: string;
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
    switch (geometry) {
      case "octahedron":
        return new THREE.OctahedronGeometry(0.6, 0);
      case "torus":
        return new THREE.TorusGeometry(0.4, 0.15, 8, 16);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(0.5, 0);
      case "box":
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function ParticlesField() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f97316"
        size={0.03}
        transparent
        opacity={0.5}
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

        <FloatingGrid />
        <ParticlesField />

        <FloatingShape
          position={[-3, 1, -2]}
          geometry="octahedron"
          speed={0.4}
          color="#f97316"
        />
        <FloatingShape
          position={[3.5, 0.5, -3]}
          geometry="torus"
          speed={0.3}
          color="#fb923c"
        />
        <FloatingShape
          position={[-2, -1, -4]}
          geometry="icosahedron"
          speed={0.25}
          color="#ea580c"
        />
        <FloatingShape
          position={[2, 2, -5]}
          geometry="box"
          speed={0.35}
          color="#f97316"
        />
      </Canvas>
    </div>
  );
}
