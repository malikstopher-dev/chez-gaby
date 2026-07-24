'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import type { MenuItem } from '@/lib/menuData';

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart?: (name: string, category?: string) => void;
  cartQuantity?: number;
  onUpdateQuantity?: (name: string, qty: number) => void;
  activeCategory?: string;
}

export function MenuModal({ item, onClose, onAddToCart, cartQuantity = 0, onUpdateQuantity, activeCategory }: MenuModalProps) {
  const { t, lang } = useLanguage();

  if (!item) return null;

  const description = lang === 'fr' ? item.description : lang === 'pt' ? item.descriptionPt : item.descriptionEn;

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            {item.image && (
              <div className="w-full h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {item.chefPick && (
                  <span className="text-[10px] tracking-[0.12em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    ★ {t.menu.chefPick}
                  </span>
                )}
                {item.winePairing && (
                  <span className="text-[10px] tracking-[0.12em] uppercase text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    🍷 {item.winePairing}
                  </span>
                )}
              </div>

              {/* Name + Price */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="font-serif text-2xl text-white">{item.name}</h2>
                <span className="text-gold text-xl font-medium shrink-0">{item.price}</span>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>

              {/* Add to Cart / Quantity */}
              {onAddToCart ? (
                <div className="flex items-center justify-between">
                  {cartQuantity > 0 && onUpdateQuantity ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.name, cartQuantity - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-gold hover:border-gold/30 transition-colors text-lg"
                      >
                        −
                      </button>
                      <span className="text-white text-lg font-medium w-6 text-center">{cartQuantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.name, cartQuantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-gold hover:border-gold/30 transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={() => {
                      onAddToCart(item.name, activeCategory);
                      onClose();
                    }}
                    className="px-8 py-3 bg-gold text-black font-medium rounded-full hover:bg-gold/90 transition-colors text-sm tracking-wide"
                  >
                    {cartQuantity > 0 ? t.menu.addMore : t.menu.addToCartFull}
                  </button>
                </div>
              ) : (
                /* Homepage: Add to cart navigates to /menu */
                <a
                  href="/menu"
                  className="block w-full py-3 bg-gold text-black font-medium rounded-full hover:bg-gold/90 transition-colors text-sm tracking-wide text-center"
                >
                  {t.menu.viewFullMenu}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
