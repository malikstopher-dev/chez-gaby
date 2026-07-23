'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const STEAKS = ['Wagyu A5', 'Tomahawk', 'T-Bone', "Côte à l'Os", "Entrecôte de Belgique"];

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
              key={steak}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center luxury-shadow hover:border-gold/30 hover:bg-glass-hover transition-all duration-500 group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full gold-gradient-solid/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-xl">🥩</span>
              </div>
              <h3 className="text-white font-serif text-sm md:text-base group-hover:text-gold transition-colors">{steak}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
