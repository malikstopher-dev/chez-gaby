'use client';

import { motion } from 'framer-motion';
import { useLanguage, type Lang } from '@/store/language';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    const next: Lang = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    document.documentElement.lang = next;
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 text-sm text-white/50 hover:text-gold transition-colors tracking-[0.1em] uppercase"
      aria-label="Switch language"
    >
      <motion.span
        key={lang}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {lang === 'fr' ? 'EN' : 'FR'}
      </motion.span>
      <span className="w-px h-3 bg-white/20" />
      <span className="text-[10px]">{lang === 'fr' ? 'English' : 'Français'}</span>
    </button>
  );
}
