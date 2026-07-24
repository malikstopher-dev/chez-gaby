'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { menuCategories } from '@/lib/menuData';

export function Menu() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const activeData = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-black to-charcoal/5" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.menu.title} subtitle={t.menu.subtitle} />

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-500 ${
                activeCategory === cat.id
                  ? 'bg-gold text-black'
                  : 'glass text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {lang === 'fr' ? cat.name : cat.nameEn}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {activeData?.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden luxury-shadow transition-all duration-500 hover:bg-glass-hover hover:border-gold/20 group"
              >
                <div className="flex gap-0">
                  {item.image && (
                    <div className="w-20 h-20 md:w-40 md:h-36 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-3 md:p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-serif text-sm md:text-lg group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-gold/60 text-xs md:text-sm ml-3 whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-white/40 text-[11px] md:text-sm leading-relaxed line-clamp-2">
                      {lang === 'fr' ? item.description : lang === 'pt' ? item.descriptionPt : item.descriptionEn}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {item.chefPick && (
                        <span className="text-[9px] tracking-[0.1em] uppercase text-gold/70 bg-gold/5 px-2 py-0.5 rounded-full">
                          {t.menu.chefRecommendation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
