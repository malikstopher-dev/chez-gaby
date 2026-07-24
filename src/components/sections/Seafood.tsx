'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const ITEMS = [
  { name: 'Homard', descFr: 'Homard grillé, beurre à l\'ail', descEn: 'Grilled lobster, garlic butter', image: '/images/homard.jpg' },
  { name: 'Plateau Royal', descFr: 'Plateau de fruits de mer frais', descEn: 'Fresh seafood platter', image: '/images/plateau-royal.jpg' },
  { name: 'Pieuvre Grillée', descFr: 'Pieuvre à la LORENA', descEn: 'Grilled octopus LORENA style', image: '/images/pieuvre-grillee.jpg' },
  { name: 'Saint-Jacques', descFr: 'Saint-Jacques façon NATHALIE', descEn: 'Scallops NATHALIE style', image: '/images/saint-jacques.jpg' },
];

export function Seafood() {
  const { t, lang } = useLanguage();

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
                  {lang === 'fr' ? item.descFr : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
