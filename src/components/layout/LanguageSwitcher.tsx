'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage, type Lang } from '@/store/language';

const langLabels: Record<Lang, { code: string; label: string; flag: string }> = {
  fr: { code: 'FR', label: 'Français', flag: '🇫🇷' },
  en: { code: 'EN', label: 'English', flag: '🇬🇧' },
  pt: { code: 'PT', label: 'Português', flag: '🇧🇷' },
};

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const otherLangs = (Object.keys(langLabels) as Lang[]).filter((l) => l !== lang);

  const handleSelect = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-gold transition-colors tracking-[0.1em] uppercase"
        aria-label="Switch language"
      >
        <span>{langLabels[lang].flag}</span>
        <span className="w-px h-3 bg-white/20" />
        <span className="text-[10px]">{langLabels[lang].label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 glass rounded-xl border border-white/10 overflow-hidden min-w-[160px]"
            >
              {otherLangs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleSelect(l)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors"
                >
                  <span>{langLabels[l].flag}</span>
                  <span className="tracking-wider">{langLabels[l].label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
