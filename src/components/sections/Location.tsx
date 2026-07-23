'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function Location() {
  const { t } = useLanguage();

  return (
    <section id="location" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/5 to-black" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.location.title} />

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 luxury-shadow">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">Adresse</h4>
              <p className="text-white text-sm leading-relaxed">{t.location.address}</p>
            </div>
            <div className="glass rounded-2xl p-6 luxury-shadow">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">{t.footer.hoursTitle}</h4>
              <p className="text-white text-sm">{t.location.hours}</p>
            </div>
            <div className="glass rounded-2xl p-6 luxury-shadow">
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">Contact</h4>
              <a href="tel:+243819976959" className="block text-white text-sm hover:text-gold transition-colors mb-1">{t.location.phone}</a>
              <a href="mailto:restogabygabriel@gmail.com" className="block text-white text-sm hover:text-gold transition-colors">{t.location.email}</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl overflow-hidden luxury-shadow aspect-[4/3]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5!2d15.29067!3d-4.305127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMTguNSJTIDE1wrAxNycyNi40IkU!5e0!3m2!1sen!2scd!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chez Gaby Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
