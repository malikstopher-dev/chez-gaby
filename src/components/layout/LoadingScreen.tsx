'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 2,
}));

export function LoadingScreen({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + Math.random() * 8 + 2, 100);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#0A0A0A' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {GOLD_PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: '#C9A84C',
                boxShadow: '0 0 6px rgba(201,168,76,0.6)',
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-6"
            >
              <span className="text-6xl md:text-8xl font-serif gold-gradient tracking-wider">
                CG
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif text-white tracking-[0.2em] mb-3"
            >
              CHEZ GABY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm text-gold tracking-[0.3em] uppercase mb-12"
            >
              Kinshasa
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
            />

            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full gold-gradient-solid rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5 }}
              className="text-xs text-white/40 mt-4 tracking-[0.2em]"
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
