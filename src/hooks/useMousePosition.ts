'use client';

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalX: number;
  normalY: number;
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, normalX: 0.5, normalY: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      setPos({ x: e.clientX, y: e.clientY, normalX: nx, normalY: ny });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
