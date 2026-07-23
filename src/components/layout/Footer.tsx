'use client';

import { useLanguage } from '@/store/language';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-black border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="text-4xl font-serif gold-gradient tracking-wider">CG</span>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Chez Gaby
              <br />
              {t.location.address}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">{t.footer.hoursTitle}</h4>
            <p className="text-sm text-white/60 leading-relaxed">{t.footer.hours}</p>
            <p className="text-sm text-white/40 mt-2">Dimanche fermé</p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+243819976959" className="text-sm text-white/60 hover:text-gold transition-colors">
                  +243 819 976 959
                </a>
              </li>
              <li>
                <a href="mailto:restogabygabriel@gmail.com" className="text-sm text-white/60 hover:text-gold transition-colors break-all">
                  restogabygabriel@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">{t.footer.follow}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/chezgabykinshasa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all text-sm"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/restochezgabykinshasa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all text-sm"
              >
                ig
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Chez Gaby. {t.footer.rights}
          </p>
          <p className="text-xs text-white/20">
            26 Avenue Roi Baudouin, Gombe, Kinshasa
          </p>
        </div>
      </div>
    </footer>
  );
}
