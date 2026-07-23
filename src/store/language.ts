'use client';

import { create } from 'zustand';
import { fr } from '@/i18n/fr';
import { en } from '@/i18n/en';
import { pt } from '@/i18n/pt';

export type Lang = 'fr' | 'en' | 'pt';
type Translations = typeof fr;

interface LanguageStore {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const translations: Record<Lang, Translations> = { fr, en, pt };

export const useLanguage = create<LanguageStore>((set) => ({
  lang: 'fr',
  t: fr,
  setLang: (lang: Lang) => set({ lang, t: translations[lang] }),
}));
