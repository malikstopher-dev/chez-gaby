'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SLIDESHOW_IMAGES = [
  '/images/chezgaby1.jpg',
  '/images/chezgaby2.jpg',
  '/images/chezgaby3.jpg',
  '/images/chezgaby4.jpg',
  '/images/chezgaby5.jpg',
  '/images/chezgaby6.jpg',
];

export function Hero() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[700px] overflow-hidden walnut-bg"
      role="banner"
      aria-label="Chez Gaby hero section"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={SLIDESHOW_IMAGES[currentSlide]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20 z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 candlelight z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" aria-hidden="true" />

      {/* Mobile Layout: Logo top, title center */}
      <div className="relative z-10 h-full flex flex-col sm:hidden">
        {/* Logo + Subtitle at top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-20 pb-4 text-center px-6"
        >
          <img
            src="/images/logo.jpg"
            alt="Chez Gaby"
            className="h-20 mx-auto object-contain mb-4"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold/60 font-sans">
            {t.hero.subtitle}
          </span>
        </motion.div>

        {/* Title centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl font-serif text-white mb-6 tracking-[0.03em] leading-[1.1] text-shadow-gold"
          >
            {t.hero.title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.4, ease: 'easeInOut' }}
            className="w-16 h-[1.5px] mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-sm text-white/45 max-w-lg mx-auto leading-relaxed font-light tracking-wide"
          >
            {t.hero.description}
          </motion.p>
        </div>
      </div>

      {/* Desktop Layout: Everything centered */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <img
            src="/images/logo.jpg"
            alt="Chez Gaby"
            className="h-20 mx-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm tracking-[0.35em] uppercase text-gold/60 block mb-8 font-sans"
        >
          {t.hero.subtitle}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-8xl lg:text-9xl font-serif text-white mb-6 tracking-[0.03em] leading-[1.1] text-shadow-gold"
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
          className="text-base lg:text-lg text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex flex-row items-center justify-center gap-4"
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
            <span className="relative z-10 font-medium">{t.hero.orderNow}</span>
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
          className="flex mt-16 items-center justify-center gap-8 text-[10px] tracking-[0.2em] uppercase text-white/20"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            {t.hero.cuisineType}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            {t.hero.seafood}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            {t.hero.premiumMeats}
          </span>
        </motion.div>
      </div>

      <ScrollIndicator />

      {/* Mobile Sticky Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around py-2 px-2">
          <a href="#reservations" className="flex flex-col items-center gap-0.5 text-white/60 hover:text-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            <span className="text-[9px] tracking-wider uppercase">{t.hero.booking.split(' ').slice(-1)}</span>
          </a>
          <a href="/menu" className="flex flex-col items-center gap-0.5 text-gold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <span className="text-[9px] tracking-wider uppercase font-medium">{t.nav.menu}</span>
          </a>
          <a href="#story" className="flex flex-col items-center gap-0.5 text-white/60 hover:text-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <span className="text-[9px] tracking-wider uppercase">{t.nav.story.split(' ').slice(-1)}</span>
          </a>
          <a href="tel:+243819976959" className="flex flex-col items-center gap-0.5 text-white/60 hover:text-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            <span className="text-[9px] tracking-wider uppercase">{t.nav.call}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
