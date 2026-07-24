'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/admin', label: 'Tableau de bord', icon: '◉', labelEn: 'Dashboard', labelPt: 'Painel' },
  { href: '/admin/settings', label: 'Paramètres', icon: '⚙', labelEn: 'Settings', labelPt: 'Configurações' },
  { href: '/admin/menu', label: 'Menu', icon: '☰', labelEn: 'Menu', labelPt: 'Cardápio' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email || '');
    });
  }, []);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal/50 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-2xl font-serif gold-gradient">CG</span>
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/30 text-[10px]">Chez Gaby</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gold/10 text-gold border border-gold/20'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <p className="text-white/30 text-[11px] truncate">{userEmail}</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 text-xs tracking-wider uppercase text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/[0.03]"
          >
            Déconnexion
          </button>
          <a
            href="/"
            target="_blank"
            className="block w-full py-2 text-xs tracking-wider uppercase text-white/20 hover:text-gold transition-colors rounded-lg hover:bg-white/[0.03] text-center"
          >
            Voir le site →
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}