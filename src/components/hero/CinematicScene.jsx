import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleCount = 950;

const ParticleField = () => {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const values = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.1 + Math.random() * 4.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const index = i * 3;

      values[index] = radius * Math.sin(phi) * Math.cos(theta);
      values[index + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.58;
      values[index + 2] = radius * Math.cos(phi) - 1.5;
    }

    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.045 + pointer.x * 0.22;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.22) * 0.09 - pointer.y * 0.13;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#8ff7ff"
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const SignalRing = () => {
  const groupRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.z = elapsed * 0.18;
    groupRef.current.rotation.x = pointer.y * 0.12;
    groupRef.current.rotation.y = pointer.x * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.08, 0.012, 16, 150]} />
        <meshBasicMaterial color="#ff5adf" transparent opacity={0.86} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.42, 0.009, 16, 150]} />
        <meshBasicMaterial color="#62f2ff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.6, 0]}>
        <torusGeometry args={[0.78, 0.008, 16, 150]} />
        <meshBasicMaterial color="#ff9f43" transparent opacity={0.64} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color="#100a20" emissive="#6e6bff" emissiveIntensity={1.9} roughness={0.24} metalness={0.72} />
      </mesh>
    </group>
  );
};

const FloatingPanels = () => {
  const groupRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(elapsed * 0.22) * 0.12 + pointer.x * 0.18;
    groupRef.current.position.y = Math.sin(elapsed * 0.45) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0.55, -0.2, -0.7]}>
      {[
        [-1.85, 0.42, -1.2, "#ff5adf"],
        [1.72, 0.88, -1.55, "#62f2ff"],
        [1.25, -1.15, -0.85, "#ff9f43"],
        [-1.15, -0.92, -1.35, "#6e6bff"],
      ].map(([x, y, z, color], index) => (
        <mesh key={color} position={[x, y, z]} rotation={[0.18 * index, -0.35 + index * 0.2, 0.1]}>
          <boxGeometry args={[1.14, 0.72, 0.018]} />
          <meshBasicMaterial color={color} transparent opacity={0.16} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
};

const SceneContent = () => (
  <>
    <color attach="background" args={["#03040b"]} />
    <fog attach="fog" args={["#050610", 4.8, 10]} />
    <ambientLight intensity={0.7} />
    <pointLight position={[2.7, 2.3, 3.2]} color="#62f2ff" intensity={3.2} />
    <pointLight position={[-2.4, -1.8, 2.2]} color="#ff5adf" intensity={2.6} />
    <ParticleField />
    <SignalRing />
    <FloatingPanels />
  </>
);

const CinematicScene = () => (
  <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
    <Canvas camera={{ position: [0, 0, 5.2], fov: 46 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: false }}>
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  </div>
);

export default CinematicScene;
