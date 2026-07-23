'use client';

import { motion } from 'framer-motion';

interface BookingButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export function BookingButton({ href, children, variant = 'primary', className = '', onClick }: BookingButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-500';

  const variants = {
    primary: 'bg-gold text-black hover:bg-gold-light luxury-shadow',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-gold/30',
    outline: 'bg-transparent text-gold border border-gold/30 hover:bg-gold/10',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
