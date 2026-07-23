'use client';

import { useRef } from 'react';
import { Mesh, PointLight } from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  position: [number, number, number];
}

export function Candle({ position }: Props) {
  const ref = useRef<Mesh>(null);
  const lightRef = useRef<PointLight>(null);
  const reduced = useReducedMotion();

  useFrame(({ clock }) => {
    if (!ref.current || !lightRef.current) return;
    const t = clock.getElapsedTime();
    const flicker = reduced ? 1 : 0.92 + Math.sin(t * 8) * 0.04 + Math.sin(t * 13) * 0.02 + Math.sin(t * 21) * 0.01;
    lightRef.current.intensity = 1.2 * flicker;
    const sway = reduced ? 0 : Math.sin(t * 1.5) * 0.02;
    ref.current.position.x = position[0] + sway;
  });

  return (
    <group position={position}>
      <pointLight ref={lightRef} intensity={1.2} distance={3} color="#FFA500" />
      <mesh ref={ref} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.5]} />
        <meshPhysicalMaterial color="#f5f0e8" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.02]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#FF8C00" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
