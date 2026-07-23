'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
        {title}
      </h2>
      <div className={`w-16 h-[1px] gold-gradient-solid mt-4 ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
