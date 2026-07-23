'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const REVIEWS = [
  { text: "One of the finest restaurants in Kinshasa. The steaks were delicious and the fresh seafood was tasty.", author: "Robert D.", rating: 5 },
  { text: "A stylish establishment attracting quality clientele. The quality of the food and the levels of service are probably some of the best in Kinshasa.", author: "NaughtyBeagle", rating: 4 },
  { text: "Chez Gaby has an elegant setting and a blend of international and Congolese cuisine. The seafood and steaks were delicious.", author: "Alana K.", rating: 5 },
  { text: "If you are looking for a beautiful and cozy place to have dinner, you can't go wrong with Chez Gaby. It's a very chic place.", author: "Ney K.", rating: 5 },
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 via-black to-charcoal/5" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 luxury-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <span key={s} className="text-gold text-sm">★</span>
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
              <p className="text-gold/60 text-xs tracking-[0.1em] uppercase">{review.author}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <span className="text-xs text-white/30">
            Basé sur 121 avis TripAdvisor • 4.3/5
          </span>
        </motion.div>
      </div>
    </section>
  );
}
