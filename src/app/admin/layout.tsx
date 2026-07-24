'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

const navSections = [
  {
    label: 'Gestion',
    items: [
      { href: '/admin/settings', label: 'Paramètres', icon: '⚙' },
      { href: '/admin/menu', label: 'Menu', icon: '☰' },
      { href: '/admin/gallery', label: 'Galerie Photos', icon: '🖼' },
    ],
  },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-charcoal/80 backdrop-blur-xl border-r border-white/5 z-50 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <span className="text-2xl font-serif gold-gradient">CG</span>
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">Chez Gaby</p>
            </div>
          </Link>
        </div>
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100%-80px)]">
          <Link href="/admin" onClick={onClose} className={`block text-sm py-2 px-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-gold/10 text-gold' : 'text-white/50 hover:text-white'}`}>
            Tableau de bord
          </Link>
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 px-3 mb-2">{section.label}</p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 text-sm py-2 px-3 rounded-xl transition-colors ${pathname === item.href ? 'bg-gold/10 text-gold' : 'text-white/50 hover:text-white'}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-4 border-t border-white/5">
            <a href="/" target="_blank" className="block text-sm py-2 px-3 text-white/30 hover:text-gold transition-colors">
              Voir le site ↗
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}

function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <header className="h-14 bg-charcoal/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <button onClick={onMenuToggle} className="lg:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <div className="hidden lg:block" />
      <button onClick={handleLogout} className="text-white/30 hover:text-red-400 text-xs uppercase tracking-[0.15em] transition-colors">
        Déconnexion
      </button>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 lg:p-8 max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
