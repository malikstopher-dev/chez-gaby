'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassCard({ children, className = '', delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : undefined}
      className={`glass rounded-2xl p-6 luxury-shadow transition-all duration-500 ${
        hover ? 'hover:bg-glass-hover hover:border-gold/20' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
