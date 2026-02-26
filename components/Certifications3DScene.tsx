"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

type GroupRef = THREE.Group & {
  rotation: THREE.Euler;
  position: THREE.Vector3;
};

const FloatingOrbits = () => {
  const groupRef = useRef<GroupRef | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    groupRef.current.rotation.y = t * 0.08 + pointerX * 0.6;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + pointerY * 0.4;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.45, 48, 48]} />
        <meshStandardMaterial
          color={new THREE.Color(0.98, 0.93, 0.76)}
          emissive={new THREE.Color(0.95, 0.8, 0.45)}
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Wireframe spheres */}
      {[1, 1.4, 1.8].map((radius, index) => (
        <mesh key={radius} rotation-y={index * 0.8}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={new THREE.Color(0.69, 0.77, 0.95)}
            wireframe
            transparent
            opacity={0.4 - index * 0.08}
          />
        </mesh>
      ))}

      {/* Orbiting data nodes */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 2.1 + (i % 3) * 0.18;

        return (
          <mesh key={i} position={[Math.cos(angle) * radius, (i % 4) * 0.12 - 0.2, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={new THREE.Color(0.5 + (i % 3) * 0.1, 0.85, 0.98)}
              emissive={new THREE.Color(0.26, 0.71, 0.98)}
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const ParticleStream = () => {
  const pointsRef = useRef<THREE.Points | null>(null);
  const count = 1200;

  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    speeds[i] = 0.02 + Math.random() * 0.06;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  useFrame(() => {
    if (!pointsRef.current) return;
    const attribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i += 1) {
      let y = attribute.getY(i);
      y += speeds[i];
      if (y > 5) {
        y = -5;
      }
      attribute.setY(i, y);
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={new THREE.Color(0.75, 0.93, 0.99)}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
};

const CircuitGrid = () => {
  const lines: React.ReactElement[] = [];
  const size = 16;
  const step = 1.6;

  for (let i = -size; i <= size; i += step) {
    lines.push(
      <line key={`h-${i}`}>
        <bufferGeometry
          attach="geometry"
          setFromPoints={[
            new THREE.Vector3(-size, -2.5, i),
            new THREE.Vector3(size, -2.5, i),
          ]}
        />
        <lineBasicMaterial
          attach="material"
          color={new THREE.Color(0.21, 0.29, 0.44)}
          linewidth={1}
        />
      </line>,
    );
    lines.push(
      <line key={`v-${i}`}>
        <bufferGeometry
          attach="geometry"
          setFromPoints={[
            new THREE.Vector3(i, -2.5, -size),
            new THREE.Vector3(i, -2.5, size),
          ]}
        />
        <lineBasicMaterial
          attach="material"
          color={new THREE.Color(0.19, 0.24, 0.39)}
          linewidth={1}
        />
      </line>,
    );
  }

  return <group>{lines}</group>;
};

const Certifications3DScene = () => {
  return (
    <div className="cert-3d-wrapper" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 1.2, 8], fov: 48 }}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 10, 35]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[4, 6, 6]} intensity={1.6} color={new THREE.Color(0.99, 0.88, 0.6)} />
        <pointLight position={[-6, 3, -4]} intensity={1.1} color={new THREE.Color(0.55, 0.78, 1)} />

        <FloatingOrbits />
        <ParticleStream />
        <CircuitGrid />
      </Canvas>
      <div className="cert-3d-gradient-overlay" />
      <div className="cert-3d-noise-overlay" />
    </div>
  );
};

export default Certifications3DScene;

