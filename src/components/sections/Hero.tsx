'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { LuxuryScene } from '@/components/threed/LuxuryScene';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden walnut-bg"
      role="banner"
      aria-label="Chez Gaby hero section"
    >
      <div className="absolute inset-0 candlelight" aria-hidden="true" />
      <div className="absolute inset-0 vignette" aria-hidden="true" />
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[1]" aria-hidden="true" />

      <LuxuryScene />

      <div className="absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,165,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <img
            src="/images/logo.jpg"
            alt="Chez Gaby"
            className="h-16 md:h-20 mx-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-gold/60 block mb-8 font-sans"
        >
          {t.hero.subtitle}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 tracking-[0.03em] leading-[1.1] text-shadow-gold"
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeInOut' }}
          className="w-16 h-[1.5px] mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-sm md:text-base lg:text-lg text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#reservations"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 text-sm tracking-[0.2em] uppercase font-sans text-black overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #E8D48B, #C9A84C, #D4AF37)' }} />
            <span className="relative z-10 font-medium">{t.hero.booking}</span>
          </motion.a>

          <motion.a
            href="/menu"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 text-sm tracking-[0.2em] uppercase font-sans text-black overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #E8D48B, #C9A84C, #D4AF37)' }} />
            <span className="relative z-10 font-medium">{lang === 'fr' ? 'Commander' : lang === 'en' ? 'Order Now' : 'Pedir Agora'}</span>
          </motion.a>

          <motion.a
            href="#story"
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-sans text-white/70 hover:text-gold transition-colors duration-500 rounded-full border border-white/10 hover:border-gold/30"
          >
            {t.nav.story}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-[10px] tracking-[0.2em] uppercase text-white/20"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            Cuisine Franco-Portugaise
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            Fruits de Mer
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            Viandes Premium
          </span>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
