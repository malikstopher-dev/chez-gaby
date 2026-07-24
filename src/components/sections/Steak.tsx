'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const STEAKS = [
  { name: 'Wagyu A5', image: '/images/wagyu-a5.jpg' },
  { name: 'Tomahawk', image: '/images/tomahawk.jpg' },
  { name: 'T-Bone', image: '/images/t-bone.jpg' },
  { name: "Côte à l'Os", image: '/images/cote-a-los.jpg' },
  { name: 'Entrecôte de Belgique', image: '/images/entrecote-de-belgique.jpg' },
];

export function Steak() {
  const { t, lang } = useLanguage();

  return (
    <section id="steak" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 via-black to-charcoal/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.steak.title} subtitle={t.steak.subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {STEAKS.map((steak, i) => (
            <motion.div
              key={steak.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden luxury-shadow hover:border-gold/30 transition-all duration-500 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={steak.image}
                  alt={steak.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-white font-serif text-sm md:text-base group-hover:text-gold transition-colors">{steak.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
