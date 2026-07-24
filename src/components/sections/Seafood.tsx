'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const ITEMS = [
  { name: 'Homard', descKey: 'homardDesc' as const, image: '/images/homard.jpg' },
  { name: 'Plateau Royal', descKey: 'plateauDesc' as const, image: '/images/plateau-royal.jpg' },
  { name: 'Pieuvre Grillée', descKey: 'pieuvreDesc' as const, image: '/images/pieuvre-grillee.jpg' },
  { name: 'Saint-Jacques', descKey: 'saintJacquesDesc' as const, image: '/images/saint-jacques.jpg' },
];

export function Seafood() {
  const { t } = useLanguage();

  return (
    <section id="seafood" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/5 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.seafood.title} subtitle={t.seafood.subtitle} />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden luxury-shadow hover:border-gold/20 transition-all duration-500 group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">{item.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {t.seafood[item.descKey]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
