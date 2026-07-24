'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import TextField from '@/components/admin/TextField';

interface GalleryImage {
  id: string;
  image_url: string;
  sort_order: number;
  caption_fr: string | null;
  caption_en: string | null;
  caption_pt: string | null;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [captionForm, setCaptionForm] = useState({ caption_fr: '', caption_en: '', caption_pt: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadImages(); }, []);

  const loadImages = async () => {
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    setImages(data.data || []);
  };

  const handleUpload = async (url: string) => {
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: url, sort_order: images.length, caption_fr: '', caption_en: '', caption_pt: '' }),
    });
    if (res.ok) {
      setToast({ message: 'Image ajoutée !', type: 'success' });
      await loadImages();
    } else {
      setToast({ message: 'Erreur lors de l\'ajout', type: 'error' });
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Supprimer cette image ?')) return;
    const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setToast({ message: 'Image supprimée', type: 'success' });
      await loadImages();
    } else {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' });
    }
  };

  const saveCaption = async () => {
    if (!editingId) return;
    setSaving(true);
    const res = await fetch('/api/admin/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...captionForm }),
    });
    if (res.ok) {
      setToast({ message: 'Légende enregistrée !', type: 'success' });
      setEditingId(null);
      await loadImages();
    } else {
      setToast({ message: 'Erreur', type: 'error' });
    }
    setSaving(false);
  };

  const moveImage = async (id: string, direction: 'up' | 'down') => {
    const idx = images.findIndex(i => i.id === id);
    if (idx === -1) return;
    const otherIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (otherIdx < 0 || otherIdx >= images.length) return;

    const sorted = [...images];
    [sorted[idx].sort_order, sorted[otherIdx].sort_order] = [sorted[otherIdx].sort_order, sorted[idx].sort_order];
    [sorted[idx], sorted[otherIdx]] = [sorted[otherIdx], sorted[idx]];

    await Promise.all([
      fetch('/api/admin/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: sorted[idx].id, sort_order: sorted[idx].sort_order }) }),
      fetch('/api/admin/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: sorted[otherIdx].id, sort_order: sorted[otherIdx].sort_order }) }),
    ]);
    setImages(sorted);
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-8">
        <h1 className="text-2xl font-serif text-white mb-1">Galerie Photos</h1>
        <p className="text-white/40 text-sm">{images.length} photos · Glissez-déposez ou cliquez pour ajouter</p>
      </div>

      <div className="mb-8">
        <ImageUploader onUpload={handleUpload} />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={img.id} className="glass rounded-xl overflow-hidden group">
              <div className="relative aspect-square">
                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx > 0 && (
                    <button onClick={() => moveImage(img.id, 'up')} className="w-8 h-8 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors">←</button>
                  )}
                  <button onClick={() => { setEditingId(img.id); setCaptionForm({ caption_fr: img.caption_fr || '', caption_en: img.caption_en || '', caption_pt: img.caption_pt || '' }); }} className="w-8 h-8 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors">✎</button>
                  <button onClick={() => deleteImage(img.id)} className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors">✕</button>
                  {idx < images.length - 1 && (
                    <button onClick={() => moveImage(img.id, 'down')} className="w-8 h-8 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors">→</button>
                  )}
                </div>
              </div>
              {(img.caption_fr || img.caption_en || img.caption_pt) && (
                <div className="p-3">
                  <p className="text-white/60 text-xs truncate">{img.caption_fr || img.caption_en || img.caption_pt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingId(null)}>
          <div className="glass rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-serif text-white mb-6">Légende</h2>
            <div className="space-y-4">
              <TextField label="Légende FR" value={captionForm.caption_fr} onChange={v => setCaptionForm({ ...captionForm, caption_fr: v })} />
              <TextField label="Légende EN" value={captionForm.caption_en} onChange={v => setCaptionForm({ ...captionForm, caption_en: v })} />
              <TextField label="Légende PT" value={captionForm.caption_pt} onChange={v => setCaptionForm({ ...captionForm, caption_pt: v })} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-white/40 text-sm hover:text-white transition-colors">Annuler</button>
              <button onClick={saveCaption} disabled={saving} className="bg-gold text-black px-6 py-2 text-xs uppercase tracking-wider font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/30">Aucune photo. Utilisez le formulaire ci-dessus pour ajouter des images.</p>
        </div>
      )}
    </div>
  );
}
