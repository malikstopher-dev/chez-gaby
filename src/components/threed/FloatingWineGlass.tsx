'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  position: [number, number, number];
}

export function FloatingWineGlass({ position }: Props) {
  const ref = useRef<Mesh>(null);
  const reduced = useReducedMotion();
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const float = reduced ? 0 : Math.sin(t * 0.6) * 0.05;
    const rotY = reduced ? 0 : Math.sin(t * 0.3) * 0.1;
    const mouseRotX = (mouse.normalY - 0.5) * 0.1;
    const mouseRotY = (mouse.normalX - 0.5) * 0.15;
    ref.current.position.y = position[1] + float;
    ref.current.rotation.y = rotY + mouseRotY;
    ref.current.rotation.x = mouseRotX;
  });

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshPhysicalMaterial
          color="#f0ead6"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1}
        />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshPhysicalMaterial color="#f0ead6" transparent opacity={0.4} roughness={0.1} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.15, 0.1, 0.1]} />
        <meshPhysicalMaterial color="#f0ead6" transparent opacity={0.4} roughness={0.1} metalness={0.05} />
      </mesh>
    </group>
  );
}
