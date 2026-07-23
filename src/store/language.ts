'use client';

import { create } from 'zustand';
import { fr } from '@/i18n/fr';
import { en } from '@/i18n/en';

export type Lang = 'fr' | 'en';
type Translations = typeof fr;

interface LanguageStore {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const translations: Record<Lang, Translations> = { fr, en };

export const useLanguage = create<LanguageStore>((set) => ({
  lang: 'fr',
  t: fr,
  setLang: (lang: Lang) => set({ lang, t: translations[lang] }),
}));
