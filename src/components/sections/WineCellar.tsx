'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const WINE_REGIONS = [
  { name: 'Bordeaux', descKey: 'bordeauxDesc' as const, image: '/images/bordeaux.jpg' },
  { name: 'Bourgogne', descKey: 'burgundyDesc' as const, image: '/images/bourgogne.jpg' },
  { name: 'Portugal', descKey: 'portugalDesc' as const, image: '/images/portugal.jpg' },
];

export function WineCellar() {
  const { t } = useLanguage();

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
              className="glass rounded-2xl overflow-hidden luxury-shadow hover:border-gold/20 transition-all duration-500 group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-white font-serif text-xl mb-3">{region.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {t.wine[region.descKey]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
