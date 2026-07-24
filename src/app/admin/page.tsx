'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import Link from 'next/link';

const CARDS = [
  { href: '/admin/settings', title: 'Paramètres', desc: 'Horaires, adresse, téléphone, réseaux sociaux', icon: '⚙', color: 'border-gold/30' },
  { href: '/admin/menu', title: 'Menu', desc: 'Gérer les catégories et les plats', icon: '☰', color: 'border-blue-400/30' },
];

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [stats, setStats] = useState({ menuItems: 0, categories: 0 });

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email || '');
    });
    Promise.all([
      supabase.from('menu_items').select('*', { count: 'exact', head: true }),
      supabase.from('menu_categories').select('*', { count: 'exact', head: true }),
    ]).then(([items, cats]) => {
      setStats({
        menuItems: items.count || 0,
        categories: cats.count || 0,
      });
    });
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white mb-2">Bon retour 👋</h1>
        <p className="text-white/40 text-sm">{userEmail}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">{stats.menuItems}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Plats</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">{stats.categories}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Catégories</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">3</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Langues</p>
        </div>
      </div>

      <h2 className="text-lg font-serif text-white mb-4">Gestion</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group border ${card.color}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{card.icon}</span>
              <div>
                <h3 className="text-white font-serif text-lg group-hover:text-gold transition-colors mb-1">{card.title}</h3>
                <p className="text-white/40 text-sm">{card.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}