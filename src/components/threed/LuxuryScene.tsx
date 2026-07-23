'use client';

import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FloatingWineGlass = lazy(() => import('./FloatingWineGlass').then(m => ({ default: m.FloatingWineGlass })));
const FloatingPlate = lazy(() => import('./FloatingPlate').then(m => ({ default: m.FloatingPlate })));
const Candle = lazy(() => import('./Candle').then(m => ({ default: m.Candle })));
const WineBottle = lazy(() => import('./WineBottle').then(m => ({ default: m.WineBottle })));

function SceneContent() {
  const reduced = useReducedMotion();

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#FFD700" />
      <pointLight position={[-2, 1, 1]} intensity={0.6} color="#FF8C00" />
      <pointLight position={[2, 0.5, 0.5]} intensity={0.4} color="#FF6347" />
      <directionalLight position={[0, 5, 0]} intensity={0.3} />

      <FloatingWineGlass position={[-1.8, reduced ? 0 : 0.3, -1]} />
      <FloatingPlate position={[0, reduced ? -0.2 : 0.1, -0.5]} />
      <Candle position={[1.8, reduced ? -0.3 : 0.2, -1]} />
      <WineBottle position={[1.2, reduced ? -0.4 : 0.15, -1.5]} />
    </>
  );
}

function LoadingFallback() {
  return null;
}

export function LuxuryScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
