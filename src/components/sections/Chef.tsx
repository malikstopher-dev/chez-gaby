'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function Chef() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-charcoal/10" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-[3/4] glass rounded-3xl overflow-hidden luxury-shadow">
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="w-32 h-32 rounded-full gold-gradient-solid/10 flex items-center justify-center mb-6">
                  <span className="text-5xl font-serif gold-gradient">G</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">{t.chef.subtitle}</h3>
                <p className="text-gold/60 text-xs tracking-[0.2em] uppercase">{t.chef.signature}</p>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold/10 rounded-3xl -z-10" />
          </motion.div>

          <div className="order-1 md:order-2">
            <SectionTitle title={t.chef.title} subtitle={t.chef.subtitle} align="left" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 leading-relaxed mb-8"
            >
              {t.chef.content}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass inline-block rounded-full px-6 py-3">
                <span className="text-gold text-xs tracking-[0.2em] uppercase">{t.chef.signature}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
