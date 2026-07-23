'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'story', href: '#story' },
  { key: 'menu', href: '#menu' },
  { key: 'wine', href: '#wine' },
  { key: 'gallery', href: '#gallery' },
  { key: 'reservations', href: '#reservations' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="text-2xl font-serif gold-gradient tracking-wider">CG</span>
            <span className="hidden sm:block text-sm text-white/80 tracking-[0.15em]">
              CHEZ GABY
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-white/60 hover:text-gold transition-colors tracking-[0.1em] uppercase"
              >
                {t.nav[item.key as keyof typeof t.nav] as string}
              </a>
            ))}
            <a
              href="/menu"
              className="text-sm text-gold hover:text-gold/80 transition-colors tracking-[0.1em] uppercase font-medium"
            >
              {t.menu.cart}
            </a>
            <LanguageSwitcher />
            <a
              href="#reservations"
              className="px-6 py-2.5 text-sm tracking-[0.1em] uppercase bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all rounded-full"
            >
              {t.nav.reservations}
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block w-6 h-[1px] bg-white/80" />
            <span className="block w-4 h-[1px] bg-white/80" />
            <span className="block w-6 h-[1px] bg-white/80" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl"
                aria-label="Close"
              >
                ✕
              </button>

              <span className="text-5xl font-serif gold-gradient tracking-wider mb-4">CG</span>

              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-white/70 hover:text-gold transition-colors tracking-[0.15em] uppercase font-light"
                >
                  {t.nav[item.key as keyof typeof t.nav] as string}
                </motion.a>
              ))}

              <motion.a
                href="/menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-gold hover:text-gold/80 transition-colors tracking-[0.15em] uppercase font-light"
              >
                {t.menu.cart}
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.a
                href="#reservations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-10 py-3 tracking-[0.15em] uppercase bg-gold/10 border border-gold/30 text-gold rounded-full text-sm"
              >
                {t.nav.reservations}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
