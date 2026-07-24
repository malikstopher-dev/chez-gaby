'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import TextField from '@/components/admin/TextField';

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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showNewItem, setShowNewItem] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '', description_fr: '', description_en: '', description_pt: '',
    price: '', image: '', chef_pick: false, category_id: '',
  });
  const [catForm, setCatForm] = useState({ name_fr: '', name_en: '', name_pt: '', slug: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/admin/menu');
    const data = await res.json();
    setCategories(data.categories || []);
    setItems(data.items || []);
  };

  const filteredItems = activeCat ? items.filter(i => i.category_id === activeCat) : items;

  const openNewItem = () => {
    setForm({ name: '', description_fr: '', description_en: '', description_pt: '', price: '', image: '', chef_pick: false, category_id: activeCat || categories[0]?.id || '' });
    setShowNewItem(true);
  };

  const openEditItem = (item: MenuItem) => {
    setForm({ name: item.name, description_fr: item.description_fr || '', description_en: item.description_en || '', description_pt: item.description_pt || '', price: item.price || '', image: item.image || '', chef_pick: item.chef_pick || false, category_id: item.category_id });
    setEditingItem(item);
  };

  const saveItem = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        const res = await fetch('/api/admin/menu', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'item', data: { id: editingItem.id, ...form } }),
        });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
        setToast({ message: 'Plat modifié !', type: 'success' });
      } else {
        const res = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'item', data: { ...form, sort_order: items.length } }),
        });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
        setToast({ message: 'Plat ajouté !', type: 'success' });
      }
      setEditingItem(null);
      setShowNewItem(false);
      await loadData();
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Erreur', type: 'error' });
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer ce plat ?')) return;
    const res = await fetch(`/api/admin/menu?type=item&id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setToast({ message: 'Plat supprimé', type: 'success' });
      await loadData();
    } else {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' });
    }
  };

  const saveCategory = async () => {
    setSaving(true);
    try {
      if (editingCategory) {
        const res = await fetch('/api/admin/menu', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'category', data: { id: editingCategory.id, ...catForm } }),
        });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
        setToast({ message: 'Catégorie modifiée !', type: 'success' });
      } else {
        const res = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'category', data: { ...catForm, sort_order: categories.length } }),
        });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
        setToast({ message: 'Catégorie ajoutée !', type: 'success' });
      }
      setEditingCategory(null);
      setShowNewCategory(false);
      setCatForm({ name_fr: '', name_en: '', name_pt: '', slug: '' });
      await loadData();
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Erreur', type: 'error' });
    }
    setSaving(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie et tous ses plats ?')) return;
    const res = await fetch(`/api/admin/menu?type=category&id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setToast({ message: 'Catégorie supprimée', type: 'success' });
      setActiveCat(null);
      await loadData();
    } else {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' });
    }
  };

  const ItemModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setEditingItem(null); setShowNewItem(false); }}>
      <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-serif text-white mb-6">{editingItem ? 'Modifier le plat' : 'Ajouter un plat'}</h2>
        <div className="space-y-4">
          <TextField label="Nom" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <div className="grid grid-cols-3 gap-3">
            <TextField label="Description FR" value={form.description_fr} onChange={v => setForm({ ...form, description_fr: v })} multiline rows={2} />
            <TextField label="Description EN" value={form.description_en} onChange={v => setForm({ ...form, description_en: v })} multiline rows={2} />
            <TextField label="Description PT" value={form.description_pt} onChange={v => setForm({ ...form, description_pt: v })} multiline rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Prix" value={form.price} onChange={v => setForm({ ...form, price: v })} placeholder="$$" />
            <div>
              <label className="block text-xs tracking-[0.12em] uppercase text-white/40 mb-2">Catégorie</label>
              <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_fr}</option>)}
              </select>
            </div>
          </div>
          <TextField label="URL Image" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="/images/exemple.jpg" />
          <ImageUploader onUpload={url => setForm({ ...form, image: url })} />
          <label className="flex items-center gap-3 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" checked={form.chef_pick} onChange={e => setForm({ ...form, chef_pick: e.target.checked })} className="accent-gold" />
            Sélection du Chef
          </label>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => { setEditingItem(null); setShowNewItem(false); }} className="px-4 py-2 text-white/40 text-sm hover:text-white transition-colors">Annuler</button>
          <button onClick={saveItem} disabled={saving || !form.name} className="bg-gold text-black px-6 py-2 text-xs uppercase tracking-wider font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50">
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );

  const CategoryModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setEditingCategory(null); setShowNewCategory(false); }}>
      <div className="glass rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-serif text-white mb-6">{editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</h2>
        <div className="space-y-4">
          <TextField label="Nom FR" value={catForm.name_fr} onChange={v => setCatForm({ ...catForm, name_fr: v })} />
          <TextField label="Nom EN" value={catForm.name_en} onChange={v => setCatForm({ ...catForm, name_en: v })} />
          <TextField label="Nom PT" value={catForm.name_pt} onChange={v => setCatForm({ ...catForm, name_pt: v })} />
          <TextField label="Slug" value={catForm.slug} onChange={v => setCatForm({ ...catForm, slug: v })} placeholder="mon-categorie" />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => { setEditingCategory(null); setShowNewCategory(false); }} className="px-4 py-2 text-white/40 text-sm hover:text-white transition-colors">Annuler</button>
          <button onClick={saveCategory} disabled={saving || !catForm.name_fr || !catForm.slug} className="bg-gold text-black px-6 py-2 text-xs uppercase tracking-wider font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50">
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {(editingItem || showNewItem) && <ItemModal />}
      {(editingCategory || showNewCategory) && <CategoryModal />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white mb-1">Gestion du Menu</h1>
          <p className="text-white/40 text-sm">{items.length} plats · {categories.length} catégories</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setCatForm({ name_fr: '', name_en: '', name_pt: '', slug: '' }); setShowNewCategory(true); }} className="px-4 py-2 text-xs tracking-wider uppercase rounded-full glass text-white/50 hover:text-white transition-colors">
            + Catégorie
          </button>
          <button onClick={openNewItem} className="bg-gold text-black px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full hover:bg-gold/90 transition-colors">
            + Ajouter un plat
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/40 text-lg mb-2">Aucune donnée trouvée</p>
          <p className="text-white/20 text-sm mb-4">Retournez au tableau de bord pour importer le menu, ou ajoutez des catégories manuellement.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setActiveCat(null)} className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${!activeCat ? 'bg-gold text-black' : 'glass text-white/50 hover:text-white'}`}>
              Tous ({items.length})
            </button>
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center">
                <button onClick={() => setActiveCat(cat.id)} className={`px-4 py-2 text-xs tracking-wider uppercase rounded-l-full transition-all ${activeCat === cat.id ? 'bg-gold text-black' : 'glass text-white/50 hover:text-white'}`}>
                  {cat.name_fr} ({items.filter(i => i.category_id === cat.id).length})
                </button>
                <button onClick={() => { setEditingCategory(cat); setCatForm({ name_fr: cat.name_fr, name_en: cat.name_en, name_pt: cat.name_pt, slug: cat.slug }); }} className="px-2 py-2 glass text-white/30 hover:text-gold text-xs rounded-r-full transition-colors">✎</button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {filteredItems.map(item => (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-gold/20 border border-transparent transition-colors">
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
                <button onClick={() => openEditItem(item)} className="text-white/20 hover:text-gold text-sm transition-colors shrink-0">✎</button>
                <button onClick={() => deleteItem(item.id)} className="text-white/20 hover:text-red-400 text-sm transition-colors shrink-0">✕</button>
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
