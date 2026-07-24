'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [tableExists, setTableExists] = useState<boolean | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('restaurant_settings').select('*').limit(1).single();
    if (data) {
      const { id: _id, updated_at: _ua, ...rest } = data as Record<string, string>;
      setSettings({ ...DEFAULT_SETTINGS, ...rest });
      setTableExists(true);
    } else if (error?.code === 'PGRST116') {
      setTableExists(true);
    } else {
      setTableExists(false);
    }
  };

  const save = async () => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from('restaurant_settings').upsert({ id: 1, ...settings } as never);
    if (error) {
      setToast({ message: error.message, type: 'error' });
    } else {
      setToast({ message: 'Paramètres enregistrés !', type: 'success' });
    }
    setSaving(false);
  };

  if (tableExists === false) {
    return (
      <div>
        <h1 className="text-2xl font-serif text-white mb-4">Paramètres</h1>
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-gold text-4xl mb-4">📋</p>
          <p className="text-white/60 mb-4">La base de données n&apos;est pas encore configurée.</p>
          <ol className="text-white/40 text-sm text-left max-w-md mx-auto space-y-2 mb-6">
            <li>1. Allez sur <span className="text-gold">supabase.com</span> → SQL Editor</li>
            <li>2. Copiez le contenu de <span className="text-gold">src/lib/schema.sql</span></li>
            <li>3. Collez et exécutez la requête SQL</li>
            <li>4. Rechargez cette page</li>
          </ol>
          <button onClick={loadSettings} className="px-6 py-3 bg-gold text-black rounded-full text-sm font-medium">Vérifier à nouveau</button>
        </div>
      </div>
    );
  }

  const update = (key: keyof Settings, value: string) => setSettings({ ...settings, [key]: value });

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white mb-1">Paramètres</h1>
          <p className="text-white/40 text-sm">Informations du restaurant</p>
        </div>
        <SaveButton onClick={save} saving={saving} />
      </div>

      <div className="space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4">Contact</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <TextField label="Adresse" value={settings.address} onChange={(v) => update('address', v)} />
            <TextField label="Téléphone" value={settings.phone} onChange={(v) => update('phone', v)} />
            <TextField label="Email" value={settings.email} onChange={(v) => update('email', v)} type="email" />
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4">Horaires</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <TextField label="Jours ouverts" value={settings.hours_fr} onChange={(v) => update('hours_fr', v)} lang="FR" />
            <TextField label="Open days" value={settings.hours_en} onChange={(v) => update('hours_en', v)} lang="EN" />
            <TextField label="Dias abertos" value={settings.hours_pt} onChange={(v) => update('hours_pt', v)} lang="PT" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <TextField label="Fermeture" value={settings.sunday_fr} onChange={(v) => update('sunday_fr', v)} lang="FR" />
            <TextField label="Closed" value={settings.sunday_en} onChange={(v) => update('sunday_en', v)} lang="EN" />
            <TextField label="Fechado" value={settings.sunday_pt} onChange={(v) => update('sunday_pt', v)} lang="PT" />
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4">Accroche du Hero</h2>
          <p className="text-white/30 text-xs mb-4">Texte affiché sous le logo dans le hero</p>
          <div className="grid md:grid-cols-3 gap-4">
            <TextField label="Français" value={settings.hero_subtitle_fr} onChange={(v) => update('hero_subtitle_fr', v)} lang="FR" />
            <TextField label="English" value={settings.hero_subtitle_en} onChange={(v) => update('hero_subtitle_en', v)} lang="EN" />
            <TextField label="Português" value={settings.hero_subtitle_pt} onChange={(v) => update('hero_subtitle_pt', v)} lang="PT" />
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-white font-serif text-lg mb-4">Réseaux Sociaux</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Facebook URL" value={settings.facebook_url} onChange={(v) => update('facebook_url', v)} />
            <TextField label="Instagram URL" value={settings.instagram_url} onChange={(v) => update('instagram_url', v)} />
          </div>
        </div>

        <div className="text-center pb-8">
          <SaveButton onClick={save} saving={saving} label="Enregistrer les modifications" />
        </div>
      </div>
    </div>
  );
}
