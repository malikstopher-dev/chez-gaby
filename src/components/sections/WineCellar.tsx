'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const WINE_REGIONS = [
  { name: 'Bordeaux', emoji: '🍷', descFr: "Une sélection des meilleurs crus de Bordeaux", descEn: "A selection of the finest Bordeaux vintages" },
  { name: 'Bourgogne', emoji: '🍷', descFr: "Les grands vins de Bourgogne soigneusement sélectionnés", descEn: "Great Burgundy wines carefully selected" },
  { name: 'Portugal', emoji: '🍷', descFr: "Les meilleurs crus portugais de notre carte", descEn: "The finest Portuguese vintages on our list" },
];

export function WineCellar() {
  const { t, lang } = useLanguage();

  return (
    <section id="wine" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/5 to-black" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.wine.title} subtitle={t.wine.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-white/50 text-lg leading-relaxed">{t.wine.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {WINE_REGIONS.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-8 text-center luxury-shadow hover:border-gold/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient-solid/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-2xl">{region.emoji}</span>
              </div>
              <h3 className="text-white font-serif text-xl mb-3">{region.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {lang === 'fr' ? region.descFr : region.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
