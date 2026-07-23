'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart, buildWhatsAppMessage } from '@/store/cart';
import { menuCategories } from '@/lib/menuData';
import { whatsappUrl } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

const PHONE = '+243819976959';

export default function MenuPage() {
  const { t, lang } = useLanguage();
  const { items: cartItems, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [showCart, setShowCart] = useState(false);

  const activeData = menuCategories.find((c) => c.id === activeCategory);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    const msg = buildWhatsAppMessage(cartItems, lang);
    window.open(whatsappUrl(PHONE, msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="font-serif text-lg text-gold">CG</span>
            <span className="text-xs tracking-[0.15em] uppercase text-white/40 hidden sm:inline">
              {lang === 'fr' ? 'Retour' : lang === 'en' ? 'Home' : 'Início'}
            </span>
          </a>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">{t.menu.title}</h1>
          <p className="text-white/40 text-lg">{t.menu.subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs tracking-[0.12em] uppercase rounded-full transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold text-black'
                  : 'border border-white/10 text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              {lang === 'fr' ? cat.name : lang === 'pt' ? cat.namePt : cat.nameEn}
              <span className="ml-1.5 text-[10px] opacity-50">({cat.items.length})</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto"
          >
            {activeData?.items.map((item) => {
              const inCart = cartItems.find((i) => i.name === item.name);
              return (
                <div
                  key={item.name}
                  className="group border border-white/5 rounded-xl p-4 hover:border-gold/20 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-white text-base group-hover:text-gold transition-colors truncate">
                          {item.name}
                        </h3>
                        {item.chefPick && (
                          <span className="shrink-0 text-[9px] tracking-wider uppercase text-gold/80 bg-gold/10 px-2 py-0.5 rounded-full">
                            ★ Chef
                          </span>
                        )}
                      </div>
                      <p className="text-white/30 text-xs leading-relaxed line-clamp-2">
                        {lang === 'fr' ? item.description : lang === 'pt' ? item.descriptionPt : item.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {inCart ? (
                        <div className="flex items-center gap-1.5 bg-white/5 rounded-full border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.name, inCart.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                          >
                            −
                          </button>
                          <span className="text-xs text-white w-4 text-center font-medium">{inCart.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, inCart.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(item.name, activeCategory)}
                          className="px-3 py-1.5 text-[10px] tracking-wider uppercase rounded-full border border-gold/30 text-gold/70 hover:bg-gold hover:text-black transition-all duration-300"
                        >
                          + {t.menu.addToCart}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="bg-charcoal/95 backdrop-blur-xl border-t border-gold/20 px-4 py-3">
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.872l1.836-8.028A1.125 1.125 0 0018.054 3H4.897m2.603 0L7.5 14.25M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  </div>
                  <span className="text-sm">
                    {totalItems} {t.menu.cartItems}
                  </span>
                </button>

                <button
                  onClick={handleOrder}
                  className="px-6 py-2.5 bg-gold text-black text-sm font-medium rounded-full hover:bg-gold/90 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.menu.orderWhatsApp}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-charcoal border-l border-white/10 z-[60] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="font-serif text-xl text-gold">{t.menu.cart}</h2>
                <button onClick={() => setShowCart(false)} className="text-white/40 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cartItems.length === 0 ? (
                  <p className="text-white/30 text-center py-12">{t.menu.cartEmpty}</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{item.name}</p>
                          <p className="text-white/30 text-xs">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-gold hover:border-gold/30 transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm text-white w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-gold hover:border-gold/30 transition-colors text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.name)}
                            className="ml-2 text-white/20 hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t.menu.cartTotal}</span>
                    <span className="text-gold font-medium">{totalItems} {t.menu.cartItems}</span>
                  </div>
                  <button
                    onClick={handleOrder}
                    className="w-full py-3 bg-gold text-black font-medium rounded-full hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.menu.orderWhatsApp}
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-white/30 text-xs hover:text-red-400 transition-colors"
                  >
                    {t.menu.clearCart}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
