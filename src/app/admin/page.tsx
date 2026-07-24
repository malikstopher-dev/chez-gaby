'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Toast from '@/components/admin/Toast';

const sections = [
  { href: '/admin/settings', label: 'Paramètres', desc: 'Horaires, adresse, téléphone, réseaux sociaux', icon: '⚙' },
  { href: '/admin/menu', label: 'Menu', desc: 'Gérer les catégories et les plats', icon: '☰' },
  { href: '/admin/gallery', label: 'Galerie Photos', desc: 'Ajouter et organiser les photos', icon: '🖼' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ menuItems: 0, categories: 0, gallery: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/admin/menu')
      .then(r => r.json())
      .then(d => setStats(prev => ({ ...prev, menuItems: d.items?.length || 0, categories: d.categories?.length || 0 })))
      .catch(() => {});
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(d => setStats(prev => ({ ...prev, gallery: d.data?.length || 0 })))
      .catch(() => {});
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setSeeded(true);
        setToast({ message: data.message || 'Données importées !', type: 'success' });
        // Refresh stats
        const menuRes = await fetch('/api/admin/menu');
        const menuData = await menuRes.json();
        setStats(prev => ({
          ...prev,
          menuItems: menuData.items?.length || 0,
          categories: menuData.categories?.length || 0,
        }));
      } else {
        setToast({ message: data.error || 'Erreur lors de l\'import', type: 'error' });
      }
    } catch {
      setToast({ message: 'Erreur réseau', type: 'error' });
    }
    setSeeding(false);
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-10">
        <h1 className="text-3xl font-serif text-white mb-2">Tableau de bord</h1>
        <p className="text-white/40 text-sm">Gérez le contenu du site Chez Gaby</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">{stats.menuItems}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Plats</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">{stats.categories}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Catégories</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-3xl font-serif text-gold mb-1">{stats.gallery}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">Photos</p>
        </div>
      </div>

      {stats.menuItems === 0 && !seeded && (
        <div className="glass rounded-2xl p-6 border border-gold/30 mb-8">
          <p className="text-white text-sm mb-3">Aucune donnée trouvée. Importez le menu du restaurant dans la base de données ?</p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-gold text-black px-6 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {seeding ? 'Importation...' : 'Importer le menu'}
          </button>
        </div>
      )}

      <h2 className="text-white text-sm uppercase tracking-[0.15em] mb-4">Gestion du site</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group border border-white/5"
          >
            <span className="text-3xl mb-3 block">{s.icon}</span>
            <h3 className="text-white font-serif text-lg group-hover:text-gold transition-colors">{s.label}</h3>
            <p className="text-white/40 text-sm mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
