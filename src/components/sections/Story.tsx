'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function Story() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section id="story" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/20 to-black" />

      <motion.div
        ref={ref}
        style={{ scale }}
        className="relative max-w-6xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle title={t.story.title} subtitle={t.story.subtitle} align="left" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 leading-relaxed mb-8"
            >
              {t.story.content}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] gold-gradient-solid" />
              <span className="text-xs tracking-[0.2em] uppercase text-gold/60">
                Depuis des décennies
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] glass rounded-3xl overflow-hidden luxury-shadow">
              <img
                src="/images/story-restaurant.jpg"
                alt="Chez Gaby - Ambiance du restaurant"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-center p-8">
                          <div class="w-24 h-24 mx-auto mb-6 rounded-full gold-gradient-solid/20 flex items-center justify-center">
                            <span class="text-4xl font-serif gold-gradient">CG</span>
                          </div>
                          <p class="text-white/30 text-sm italic max-w-xs mx-auto">
                            "Une cuisine lusitanienne largement appréciée, un cadre très plaisant, un service incomparable."
                          </p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/10 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
