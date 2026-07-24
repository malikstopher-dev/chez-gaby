'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

const DEFAULT_SETTINGS = {
  address: '26 Avenue Roi Baudouin, Gombe, Kinshasa',
  phone: '+243 819 976 959',
  email: 'restogabygabriel@gmail.com',
  hours_fr: 'Lun-Sam : 12h à 23h',
  hours_en: 'Mon-Sat: 12PM to 11PM',
  hours_pt: 'Seg-Sáb: 12h às 23h',
  sunday_fr: 'Dimanche fermé',
  sunday_en: 'Closed on Sundays',
  sunday_pt: 'Fechado aos domingos',
  facebook_url: 'https://www.facebook.com/chezgabykinshasa/',
  instagram_url: 'https://www.instagram.com/restochezgabykinshasa/',
  hero_subtitle_fr: 'Restaurant de Luxe',
  hero_subtitle_en: 'Luxury Restaurant',
  hero_subtitle_pt: 'Restaurante de Luxo',
};

type Settings = typeof DEFAULT_SETTINGS;

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [tableExists, setTableExists] = useState<boolean | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('restaurant_settings').select('*').limit(1).single();
    if (data) {
      setSettings({ ...DEFAULT_SETTINGS, ...data });
      setTableExists(true);
    } else if (error?.code === 'PGRST116') {
      setTableExists(true);
    } else {
      setTableExists(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError('');
    const supabase = getSupabase();
    const { error } = await supabase.from('restaurant_settings').upsert({ id: 1, ...settings });
    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (tableExists === false) {
    return (
      <div>
        <h1 className="text-2xl font-serif text-white mb-4">Paramètres</h1>
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-gold text-4xl mb-4">📋</p>
          <p className="text-white/60 mb-4">La base de données n'est pas encore configurée.</p>
          <ol className="text-white/40 text-sm text-left max-w-md mx-auto space-y-2 mb-6">
            <li>1. Allez sur <span className="text-gold">supabase.com</span> → SQL Editor</li>
            <li>2. Copiez le contenu du fichier <span className="text-gold">src/lib/schema.sql</span></li>
            <li>3. Collez et exécutez la requête SQL</li>
            <li>4. Créez un utilisateur admin dans Authentication → Users</li>
            <li>5. Rechargez cette page</li>
          </ol>
          <button onClick={loadSettings} className="px-6 py-3 bg-gold text-black rounded-full text-sm">Vérifier à nouveau</button>
        </div>
      </div>
    );
  }

  const Field = ({ label, value, onChange, type = 'text', multiline = false, lang }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean; lang?: string;
  }) => (
    <div>
      <label className="block text-xs tracking-[0.12em] uppercase text-white/40 mb-2 flex items-center gap-2">
        {label}
        {lang && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{lang}</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
          rows={2}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white mb-1">Paramètres</h1>
          <p className="text-white/40 text-sm">Informations du restaurant</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gold text-black hover:bg-gold/90'
          }`}
        >
          {saving ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Enregistrer'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 glass rounded-xl border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      <div className="space-y-8">
        {/* Contact */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4 flex items-center gap-2">📞 Contact</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Adresse" value={settings.address} onChange={(v) => setSettings({ ...settings, address: v })} />
            <Field label="Téléphone" value={settings.phone} onChange={(v) => setSettings({ ...settings, phone: v })} />
            <Field label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} type="email" />
          </div>
        </div>

        {/* Hours */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4 flex items-center gap-2">🕐 Horaires</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Jours ouverts" value={settings.hours_fr} onChange={(v) => setSettings({ ...settings, hours_fr: v })} lang="FR" />
            <Field label="Open days" value={settings.hours_en} onChange={(v) => setSettings({ ...settings, hours_en: v })} lang="EN" />
            <Field label="Dias abertos" value={settings.hours_pt} onChange={(v) => setSettings({ ...settings, hours_pt: v })} lang="PT" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Field label="Fermeture" value={settings.sunday_fr} onChange={(v) => setSettings({ ...settings, sunday_fr: v })} lang="FR" />
            <Field label="Closed" value={settings.sunday_en} onChange={(v) => setSettings({ ...settings, sunday_en: v })} lang="EN" />
            <Field label="Fechado" value={settings.sunday_pt} onChange={(v) => setSettings({ ...settings, sunday_pt: v })} lang="PT" />
          </div>
        </div>

        {/* Hero Subtitle */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4 flex items-center gap-2">🏆 Accroche du Hero</h2>
          <p className="text-white/30 text-xs mb-4">Texte affiché sous le logo dans le hero (ex: "Restaurant de Luxe")</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Français" value={settings.hero_subtitle_fr} onChange={(v) => setSettings({ ...settings, hero_subtitle_fr: v })} lang="FR" />
            <Field label="English" value={settings.hero_subtitle_en} onChange={(v) => setSettings({ ...settings, hero_subtitle_en: v })} lang="EN" />
            <Field label="Português" value={settings.hero_subtitle_pt} onChange={(v) => setSettings({ ...settings, hero_subtitle_pt: v })} lang="PT" />
          </div>
        </div>

        {/* Social */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4 flex items-center gap-2">🔗 Réseaux Sociaux</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Facebook URL" value={settings.facebook_url} onChange={(v) => setSettings({ ...settings, facebook_url: v })} />
            <Field label="Instagram URL" value={settings.instagram_url} onChange={(v) => setSettings({ ...settings, instagram_url: v })} />
          </div>
        </div>

        {/* Large save button at bottom too */}
        <div className="text-center pb-8">
          <button
            onClick={save}
            disabled={saving}
            className={`px-10 py-4 rounded-full text-base font-medium transition-all duration-300 ${
              saved
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gold text-black hover:bg-gold/90'
            }`}
          >
            {saving ? 'Enregistrement...' : saved ? '✓ Enregistré !' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>
    </div>
  );
}