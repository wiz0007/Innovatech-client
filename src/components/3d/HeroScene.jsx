import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./HeroScene.module.scss";

const particleCount = 1600;
const waveParticleCount = 1200;

// Dynamic Deep Space Particle Nebula
const SpaceField = () => {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const values = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.0 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const index = i * 3;

      values[index] = radius * Math.sin(phi) * Math.cos(theta);
      values[index + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      values[index + 2] = radius * Math.cos(phi) - 1.2;
    }

    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.03 + pointer.x * 0.12;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.06 - pointer.y * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#8ff7ff"
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Flowing Cybernetic Wave Grid (positioned below & deep in background)
const CyberWave = () => {
  const waveRef = useRef();
  
  const { positions, originalY } = useMemo(() => {
    const pos = new Float32Array(waveParticleCount * 3);
    const origY = new Float32Array(waveParticleCount);
    const cols = 40;
    const rows = 30;

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 0.28;
        const z = (r - rows / 2) * 0.25 - 1.5;
        const y = -1.8 + Math.sin(c * 0.3) * 0.2;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
        origY[idx] = y;
        idx++;
      }
    }

    return { positions: pos, originalY: origY };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!waveRef.current) return;
    const elapsed = clock.getElapsedTime();
    const positionAttr = waveRef.current.geometry.attributes.position;
    const array = positionAttr.array;

    for (let i = 0; i < waveParticleCount; i++) {
      const i3 = i * 3;
      const x = array[i3];
      const z = array[i3 + 2];
      array[i3 + 1] = originalY[i] + Math.sin(elapsed * 1.5 + x * 1.2 + z * 0.8) * 0.35 + pointer.y * 0.15;
    }

    positionAttr.needsUpdate = true;
    waveRef.current.rotation.y = Math.sin(elapsed * 0.1) * 0.05 + pointer.x * 0.08;
  });

  return (
    <points ref={waveRef} position={[0, -0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={waveParticleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.034}
        color="#62f2ff"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Subtle Ambient Edge Orbits (pushed far to back so they never cover text)
const AmbientOrbits = () => {
  const groupRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.z = elapsed * 0.08;
    groupRef.current.rotation.y = pointer.x * 0.12 + elapsed * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.5]}>
      {/* Deep Background Subtle Rings */}
      <mesh>
        <torusGeometry args={[3.2, 0.008, 16, 160]} />
        <meshBasicMaterial color="#62f2ff" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[3.8, 0.006, 16, 160]} />
        <meshBasicMaterial color="#ff5adf" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const SceneContent = () => (
  <>
    <ambientLight intensity={0.7} />
    <pointLight position={[4, 4, 3]} color="#62f2ff" intensity={3.5} />
    <pointLight position={[-4, -3, 2]} color="#ff5adf" intensity={2.8} />
    <SpaceField />
    <CyberWave />
    <AmbientOrbits />
  </>
);

const HeroScene = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.sceneContainer} aria-hidden="true">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default HeroScene;
