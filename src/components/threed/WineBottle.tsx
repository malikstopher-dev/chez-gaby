'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  position: [number, number, number];
}

export function WineBottle({ position }: Props) {
  const ref = useRef<Mesh>(null);
  const reduced = useReducedMotion();
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const float = reduced ? 0 : Math.sin(t * 0.4 + 2) * 0.03;
    const mouseRotX = (mouse.normalY - 0.5) * 0.05;
    const mouseRotY = (mouse.normalX - 0.5) * 0.1;
    ref.current.position.y = position[1] + float;
    ref.current.rotation.y = reduced ? 0 : Math.sin(t * 0.2) * 0.05 + mouseRotY;
    ref.current.rotation.x = mouseRotX;
  });

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.7]} />
        <meshPhysicalMaterial color="#2d4a2d" roughness={0.3} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.15]} />
        <meshPhysicalMaterial color="#1a3a1a" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.1]} />
        <meshPhysicalMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.025, 0.015, 0.04]} />
        <meshPhysicalMaterial color="#d4a574" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.03]} />
        <meshPhysicalMaterial color="#2d4a2d" roughness={0.5} />
      </mesh>
    </group>
  );
}
