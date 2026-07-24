'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupMsg, setSetupMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Identifiants invalides');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async () => {
    if (!email || !password) {
      setError('Entrez un email et un mot de passe, puis cliquez sur Configurer.');
      return;
    }
    setError('');
    setSetupMsg('Création du compte admin...');

    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Échec de la configuration');
        setSetupMsg('');
        return;
      }

      setSetupMsg(data.message || 'Compte prêt ! Vous pouvez vous connecter.');
    } catch {
      setError('La demande de configuration a échoué.');
      setSetupMsg('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-6xl font-serif gold-gradient tracking-wider">CG</span>
          <h1 className="text-white font-serif text-2xl mt-4 mb-2">Admin</h1>
          <p className="text-white/30 text-sm uppercase tracking-[0.2em]">Chez Gaby — CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="admin@chezgaby.com"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-white/40 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {setupMsg && (
            <p className="text-green-400 text-sm">{setupMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className="border-t border-white/5 pt-4">
            <p className="text-white/20 text-[11px] mb-3">Première fois ? Créez votre compte admin :</p>
            <button
              type="button"
              onClick={handleSetup}
              className="w-full border border-white/10 text-white/40 text-xs uppercase tracking-[0.15em] py-3 rounded-full hover:border-gold/50 hover:text-gold transition-colors"
            >
              Configurer le compte admin
            </button>
          </div>
        </form>

        <p className="text-white/10 text-xs text-center mt-8">
          Accès réservé au personnel de Chez Gaby
        </p>
      </div>
    </div>
  );
}
