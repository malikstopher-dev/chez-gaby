'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BookingButton } from '@/components/ui/BookingButton';

export function PrivateDining() {
  const { t } = useLanguage();

  return (
    <section id="private" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 via-black to-black" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 md:order-1"
          >
            <div className="glass rounded-3xl overflow-hidden luxury-shadow aspect-[4/3]">
              <img
                src="/images/private-dining.jpg"
                alt={t.privateDining.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-center p-8">
                          <span class="text-6xl">🕯️</span>
                          <p class="text-white/30 text-sm mt-4 italic">${t.privateDining.fallbackTitle}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </motion.div>

          <div className="order-1 md:order-2">
            <SectionTitle title={t.privateDining.title} subtitle={t.privateDining.subtitle} align="left" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              {t.privateDining.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BookingButton href="#reservations" variant="outline">
                {t.privateDining.contact}
              </BookingButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
