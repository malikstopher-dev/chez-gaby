'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Chef } from '@/components/sections/Chef';
import { Menu } from '@/components/sections/Menu';
import { WineCellar } from '@/components/sections/WineCellar';
import { Seafood } from '@/components/sections/Seafood';
import { Steak } from '@/components/sections/Steak';
import { Gallery } from '@/components/sections/Gallery';
import { PrivateDining } from '@/components/sections/PrivateDining';
import { Reservations } from '@/components/sections/Reservations';
import { Testimonials } from '@/components/sections/Testimonials';
import { Location } from '@/components/sections/Location';
import { JsonLd } from '@/components/layout/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Story />
        <Chef />
        <Menu />
        <WineCellar />
        <Seafood />
        <Steak />
        <Gallery />
        <PrivateDining />
        <Reservations />
        <Testimonials />
        <Location />
      </main>
      <Footer />
    </>
  );
}
