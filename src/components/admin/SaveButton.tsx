'use client';

interface SaveButtonProps {
  onClick: () => void;
  saving: boolean;
  label?: string;
}

export default function SaveButton({ onClick, saving, label = 'Enregistrer' }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="bg-gold text-black px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50"
    >
      {saving ? 'Enregistrement...' : label}
    </button>
  );
}
