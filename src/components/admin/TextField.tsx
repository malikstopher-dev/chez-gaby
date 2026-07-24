'use client';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  type?: string;
  lang?: string;
}

export default function TextField({ label, value, onChange, multiline, rows = 4, placeholder, type = 'text', lang }: TextFieldProps) {
  const baseClass = 'w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors';

  return (
    <div>
      <label className="block text-xs tracking-[0.12em] uppercase text-white/40 mb-2 flex items-center gap-2">
        {label}
        {lang && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{lang}</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClass} resize-y min-h-[80px]`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
