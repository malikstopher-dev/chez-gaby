'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface Category {
  id: string;
  name_fr: string;
  name_en: string;
  name_pt: string;
  slug: string;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description_fr: string;
  description_en: string;
  description_pt: string;
  price: string;
  image: string;
  chef_pick: boolean;
  sort_order: number;
}

export default function AdminMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    const [catsRes, itemsRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ]);
    if (catsRes.data) setCategories(catsRes.data);
    if (itemsRes.data) setItems(itemsRes.data);
  };

  const filteredItems = activeCat
    ? items.filter((i) => i.category_id === activeCat)
    : items;

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-6">Gestion du Menu</h1>

      {categories.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/40 text-lg mb-2">Aucune donnée trouvée</p>
          <p className="text-white/20 text-sm">
            Exécutez le script SQL dans Supabase pour créer les tables, puis importez les données.
          </p>
        </div>
      ) : (
        <>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCat(null)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                !activeCat ? 'bg-gold text-black' : 'glass text-white/50 hover:text-white'
              }`}
            >
              Tous ({items.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                  activeCat === cat.id ? 'bg-gold text-black' : 'glass text-white/50 hover:text-white'
                }`}
              >
                {cat.name_fr} ({items.filter((i) => i.category_id === cat.id).length})
              </button>
            ))}
          </div>

          {/* Items list */}
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-white/30 text-xs truncate">{item.description_fr}</p>
                </div>
                <span className="text-gold/60 text-xs shrink-0">{item.price}</span>
                {item.chef_pick && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-gold/10 text-gold shrink-0">Chef</span>
                )}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-white/30 text-center py-12">Aucun plat dans cette catégorie</p>
          )}
        </>
      )}
    </div>
  );
}