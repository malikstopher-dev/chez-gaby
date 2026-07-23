export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Chez Gaby",
  description: "Restaurant de luxe franco-portugais au cœur de Kinshasa",
  servesCuisine: ["French", "Portuguese", "Seafood", "Steakhouse"],
  image: "https://chezgaby.squarespace.com/logo-image.jpg",
  url: "https://chezgaby.com",
  telephone: "+243819976959",
  email: "restogabygabriel@gmail.com",
  acceptsReservations: true,
  hasMenu: "https://chezgaby.com/menu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "26 Avenue Roi Baudouin",
    addressLocality: "Gombe",
    addressRegion: "Kinshasa",
    addressCountry: "CD",
    postalCode: "",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -4.305127,
    longitude: 15.29067,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
  priceRange: "$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.3",
    bestRating: "5",
    ratingCount: "121",
  },
  founder: {
    "@type": "Person",
    name: "Gabriel Sousa Rosa",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  name: "Chez Gaby",
  image: "https://chezgaby.com/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "26 Avenue Roi Baudouin",
    addressLocality: "Gombe",
    addressRegion: "Kinshasa",
    addressCountry: "CD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -4.305127,
    longitude: 15.29067,
  },
  url: "https://chezgaby.com",
  telephone: "+243819976959",
};

export function getMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menu de Chez Gaby",
    description: "Carte raffinée franco-portugaise",
    hasMenuItem: [
      { "@type": "MenuItem", name: "Crème de Cossa", description: "Crème onctueuse de cossa, touché d'épices" },
      { "@type": "MenuItem", name: "Caviar", description: "Caviar d'exception, blinis et crème fraîche" },
      { "@type": "MenuItem", name: "Sole d'Ostende", description: "Sole meunière, beurre de citron" },
      { "@type": "MenuItem", name: "Wagyu", description: "Wagyu A5, sauce truffée" },
      { "@type": "MenuItem", name: "Steak Gaby", description: "Steak signature, sauce vin rouge et ail, œuf au plat" },
      { "@type": "MenuItem", name: "Homard", description: "Homard grillé, beurre à l'ail" },
      { "@type": "MenuItem", name: "Plateau de Fruits de Mer", description: "Plateau royal de fruits de mer frais" },
      { "@type": "MenuItem", name: "Spaghetti LÉONCY à la Truffe", description: "Spaghetti à la truffe noire, façon LÉONCY" },
      { "@type": "MenuItem", name: "Flan Maison", description: "Flan traditionnel, crème vanillée, caramel" },
    ],
  };
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels sont les horaires d'ouverture de Chez Gaby ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chez Gaby est ouvert du lundi au samedi, de 12h à 23h.",
      },
    },
    {
      "@type": "Question",
      name: "Chez Gaby accepte-t-il les réservations ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous acceptons les réservations par téléphone, email, WhatsApp ou via notre formulaire en ligne.",
      },
    },
    {
      "@type": "Question",
      name: "Quel type de cuisine sert Chez Gaby ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chez Gaby sert une cuisine franco-portugaise, spécialisée dans les viandes grillées et les fruits de mer frais.",
      },
    },
  ],
};
