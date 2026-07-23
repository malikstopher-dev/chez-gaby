'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  position: [number, number, number];
}

export function FloatingPlate({ position }: Props) {
  const ref = useRef<Mesh>(null);
  const reduced = useReducedMotion();
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const float = reduced ? 0 : Math.sin(t * 0.5 + 1) * 0.04;
    const rotX = reduced ? 0 : Math.sin(t * 0.2) * 0.05;
    const mouseRotX = (mouse.normalY - 0.5) * 0.08;
    const mouseRotY = (mouse.normalX - 0.5) * 0.1;
    ref.current.position.y = position[1] + float;
    ref.current.rotation.x = rotX + mouseRotX;
    ref.current.rotation.y = mouseRotY;
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.55, 32]} />
        <meshPhysicalMaterial
          color="#faf8f2"
          roughness={0.15}
          metalness={0.2}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          side={2}
        />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshPhysicalMaterial color="#f5f0e8" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshPhysicalMaterial color="#faf8f2" roughness={0.1} metalness={0.15} clearcoat={0.2} />
      </mesh>
    </group>
  );
}
