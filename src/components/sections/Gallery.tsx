'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { SectionTitle } from '@/components/ui/SectionTitle';

const GALLERY_IMAGES = [
  { id: 1, label: 'Ambiance', src: 'https://images.squarespace-cdn.com/content/v1/667ede69fd22f21c53cfe7f9/7bae2524-f60b-4364-9dfb-9dfd85fde329/IMG_54755.JPG' },
  { id: 2, label: 'Plat Signature', src: 'https://images.squarespace-cdn.com/content/v1/667ede69fd22f21c53cfe7f9/1719592933691-14HVFEZX26WC048YKXUL/image-asset.jpeg' },
  { id: 3, label: 'Caviar', src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/14/f5/47/caption.jpg' },
  { id: 4, label: 'Gambas', src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b9/ed/31/gambas.jpg' },
  { id: 5, label: 'Interior', src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/da/7a/4c/tres-beau-cadre-top.jpg' },
  { id: 6, label: 'Wine', src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/47/3b/89/top-wines-selection.jpg' },
];

export function Gallery() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/5 to-black" />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(img.id)}
              className="aspect-square glass rounded-2xl overflow-hidden cursor-pointer group relative luxury-shadow"
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-white/0 group-hover:text-white/80 text-sm tracking-[0.2em] uppercase transition-all duration-500">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={GALLERY_IMAGES.find((g) => g.id === selected)?.src}
              alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
