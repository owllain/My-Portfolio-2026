"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { Html, Environment, ContactShadows, useProgress } from "@react-three/drei";

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = false }: {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}) {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={modelRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-orange-500 font-mono text-xs">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

interface Scene3DProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
  className?: string;
  ambientIntensity?: number;
  showShadows?: boolean;
}

export default function Scene3D({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  cameraPosition = [0, 2, 5],
  className = "",
  ambientIntensity = 0.5,
  showShadows = true,
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f97316" />
        <pointLight position={[5, 2, 0]} intensity={0.3} color="#fb923c" />
        <Suspense fallback={<Loader />}>
          <Model url={url} scale={scale} position={position} rotation={rotation} autoRotate={autoRotate} />
          <Environment preset="city" />
        </Suspense>
        {showShadows && <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />}
      </Canvas>
    </div>
  );
}
