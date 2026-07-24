# Chez Gaby — Project Status

## Overview
World-class Michelin-starred luxury restaurant website for **Chez Gaby** (Kinshasa, DRC).
Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Three.js/R3F + Framer Motion.

## Live Site
- **GitHub repo:** https://github.com/malikstopher-dev/chez-gaby.git (branch: `master`)
- **Vercel:** https://chez-gaby.vercel.app

## Business Info
- 26 Avenue Roi Baudouin, Gombe, Kinshasa
- +243 819 976 959 / restogabygabriel@gmail.com
- Owner/Chef: Gabriel Sousa Rosa
- Cuisine: Franco-Portuguese (steak, seafood, French classics)
- Hours: Mon-Sat 12:00–23:00, Sunday closed
- TripAdvisor: 4.5/5 (121 reviews), #10 of 156 restaurants
- WhatsApp order number: +243819976959

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Three.js / React Three Fiber (3D hero scene)
- Framer Motion (animations)
- Zustand (state management: language, cart)
- 3 languages: FR, EN, PT (Brazilian Portuguese)

## Completed Features

### Pages
- **Homepage** (`/`) — Full luxury experience with all sections
- **Menu page** (`/menu`) — 116 items, 8 categories, cart, WhatsApp ordering

### Homepage Sections
- **Hero** — Background slideshow (chezgaby1-6.jpg, 3s interval), logo, CTAs, 3D scene
- **Story** — Restaurant ambiance image + text
- **Chef** — Gabriel Sousa Rosa portrait + bio
- **Menu preview** — Interactive 8-category tabs
- **Wine Cellar** — 3 regions with images (Bordeaux, Bourgogne, Portugal)
- **Seafood** — 4 signature dishes with images
- **Steak** — 5 premium cuts with images
- **Gallery** — 6 images with lightbox
- **Private Dining** — Image + description
- **Reservations** — WhatsApp/phone/email booking
- **Testimonials** — TripAdvisor reviews
- **Location** — Google Maps embed + contact info
- **Footer** — Hours, contact, social links

### Menu Page Features
- 116 items across 8 categories (Entrées Froides 17, Entrées Chaudes 10, Poissons 27, Viandes 34, Volailles 2, Fruits de Mer 9, Autres 9, Desserts 10)
- Category tabs with item counts
- Dish images on each item card
- Add to cart / quantity controls
- Floating cart bar
- Cart drawer (slide-in panel)
- WhatsApp order (preloaded message)
- 3-language support (FR/EN/PT)

### Components
- Glass-morphism Header with language switcher (dropdown, 2 non-active langs)
- Mobile hamburger nav with /menu link
- Sticky bottom nav on mobile (Reservations, Menu, Story, Call)
- Loading intro (gold particles, animated CG logo, progress bar)
- Scroll indicator
- Section titles with gold accents
- Booking button
- Parallax image component

### Images (130+ in public/images/)
- Hero slideshow: chezgaby1-6.jpg
- Logo: logo.jpg, logo2.jpg
- Chef: chef-gabriel.jpg
- Story: story-restaurant.jpg
- Private dining: private-dining.jpg
- Gallery: gallery-1 through gallery-8.jpg
- Wine: bordeaux.jpg, bourgogne.jpg, portugal.jpg
- Seafood: homard.jpg, plateau-royal.jpg, pieuvre-grillee.jpg, saint-jacques.jpg
- Steak: wagyu-a5.jpg, tomahawk.jpg, t-bone.jpg, cote-a-los.jpg, entrecote-de-belgique.jpg
- 100+ menu dish images (all lowercase, hyphens, no accents)

### SEO
- JSON-LD (Restaurant + LocalBusiness + Menu + FAQ)
- OpenGraph, Twitter Card
- sitemap.xml, robots.txt

### Accessibility
- Semantic HTML, ARIA labels
- `prefers-reduced-motion` support
- Keyboard navigation

### Mobile Optimizations
- Hero: CTAs hidden, sticky bottom nav instead
- Section padding reduced (py-32 → py-12 on mobile)
- Body bottom padding for sticky nav
- Trust indicators hidden on mobile

## Files Structure
```
src/
├── app/
│   ├── globals.css          # Luxury theme, mobile overrides
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Homepage
│   ├── menu/page.tsx        # Menu page with cart
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Glass nav, language switcher
│   │   ├── Footer.tsx       # Hours, contact, social
│   │   ├── LanguageSwitcher.tsx  # 3-lang dropdown
│   │   └── LoadingScreen.tsx     # Intro animation
│   ├── sections/
│   │   ├── Hero.tsx         # Slideshow + 3D scene + CTAs
│   │   ├── Story.tsx        # Restaurant story
│   │   ├── Chef.tsx         # Chef portrait
│   │   ├── Menu.tsx         # Homepage menu preview
│   │   ├── WineCellar.tsx   # Wine regions
│   │   ├── Seafood.tsx      # Seafood dishes
│   │   ├── Steak.tsx        # Premium steaks
│   │   ├── Gallery.tsx      # Photo gallery + lightbox
│   │   ├── PrivateDining.tsx # Private dining
│   │   ├── Reservations.tsx # Booking options
│   │   ├── Testimonials.tsx # TripAdvisor reviews
│   │   └── Location.tsx     # Map + contact
│   ├── threed/
│   │   ├── LuxuryScene.tsx  # R3F canvas
│   │   ├── FloatingWineGlass.tsx
│   │   ├── FloatingPlate.tsx
│   │   ├── Candle.tsx
│   │   └── WineBottle.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── SectionTitle.tsx
│       ├── BookingButton.tsx
│       ├── ScrollIndicator.tsx
│       └── ParallaxImage.tsx
├── hooks/
│   ├── useReducedMotion.ts
│   └── useMousePosition.ts
├── i18n/
│   ├── fr.ts               # French translations
│   ├── en.ts               # English translations
│   └── pt.ts               # Brazilian Portuguese
├── lib/
│   ├── menuData.ts         # 116 items, 8 categories, images
│   ├── schema.ts           # JSON-LD structured data
│   └── utils.ts            # cn(), phone, whatsappUrl
└── store/
    ├── language.ts          # FR/EN/PT switcher (Zustand)
    └── cart.ts              # Cart store + WhatsApp message builder
```

## CMS Plan (Next Phase — Supabase + Vercel)

### Database Schema
| Table | Purpose |
|---|---|
| `menu_categories` | id, name (fr/en/pt), sort_order |
| `menu_items` | name, descriptions (fr/en/pt), price_tier, image, category_id, chef_pick, sort_order |
| `hero_images` | image_url, sort_order, active |
| `gallery_images` | image_url, caption, sort_order |
| `page_content` | key-value for all UI text (fr/en/pt) |
| `restaurant_settings` | hours, address, phone, email, social_links |

### Admin Routes
- `/admin` — Dashboard overview
- `/admin/login` — Supabase Auth login
- `/admin/menu` — Menu CRUD
- `/admin/hero` — Hero slideshow manager
- `/admin/content` — Text/translations editor
- `/admin/gallery` — Gallery manager
- `/admin/settings` — Restaurant settings

### Status: Waiting for Supabase project credentials
- Project URL
- Anon key
- Service role key
