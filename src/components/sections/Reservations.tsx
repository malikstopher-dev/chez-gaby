'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BookingButton } from '@/components/ui/BookingButton';
import { whatsappUrl } from '@/lib/utils';

export function Reservations() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ guests: '2', date: '', time: '19:00', name: '', email: '', phone: '', special: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = `Bonjour Chez Gaby, je souhaite réserver une table pour ${form.guests} personnes le ${form.date} à ${form.time}. ${form.name ? `- ${form.name}` : ''}`;

  return (
    <section id="reservations" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/5 to-black" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.reservations.title} subtitle={t.reservations.subtitle} />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto glass rounded-3xl p-12 text-center luxury-shadow"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient-solid/10 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-serif text-white mb-3">{t.reservations.success}</h3>
            <p className="text-white/50 text-sm">{t.reservations.successMessage}</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.guests}</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n} className="bg-charcoal">{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.date}</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.time}</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.name}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.email}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.phone}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">{t.reservations.special}</label>
                <textarea
                  value={form.special}
                  onChange={(e) => setForm({ ...form, special: e.target.value })}
                  rows={3}
                  className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>

              <BookingButton variant="primary" className="w-full">
                {t.reservations.confirm}
              </BookingButton>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 justify-center"
            >
              <a
                href={whatsappUrl('243819976959', whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookingButton variant="outline" className="w-full">
                  {t.reservations.whatsapp}
                </BookingButton>
              </a>
              <a href="tel:+243819976959">
                <BookingButton variant="outline" className="w-full">
                  {t.reservations.call}
                </BookingButton>
              </a>
              <a href="mailto:restogabygabriel@gmail.com">
                <BookingButton variant="outline" className="w-full">
                  {t.reservations.emailUs}
                </BookingButton>
              </a>

              <div className="mt-6 p-6 glass rounded-2xl">
                <p className="text-white/30 text-xs tracking-[0.15em] uppercase mb-2">Contact</p>
                <p className="text-white/60 text-sm">+243 819 976 959</p>
                <p className="text-white/40 text-xs mt-1">restogabygabriel@gmail.com</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
