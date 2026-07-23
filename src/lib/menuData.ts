export interface MenuItem {
  name: string;
  description: string;
  descriptionEn: string;
  price: string;
  chefPick?: boolean;
  winePairing?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'entrees',
    name: 'Entrées',
    nameEn: 'Starters',
    items: [
      { name: 'Cossa / Gambas Croquant', description: 'Crevettes croustillantes, sauce aïl pili', descriptionEn: 'Crispy shrimp, garlic pili sauce', price: '$$' },
      { name: 'Crème de Cossa', description: 'Crème onctueuse de cossa', descriptionEn: 'Smooth cossa cream', price: '$$', chefPick: true },
      { name: 'Noix de Saint-Jacques au Porc Ibérico', description: 'Saint-jacques poêlées, porc ibérico', descriptionEn: 'Pan-seared scallops, Iberico pork', price: '$$$' },
      { name: 'Salade Grecque à la Feta', description: 'Salade grecque traditionnelle, feta', descriptionEn: 'Traditional Greek salad, feta', price: '$' },
      { name: 'Caviar', description: "Caviar d'exception, service traditionnel", descriptionEn: 'Exceptional caviar, traditional service', price: '$$$$', chefPick: true },
    ],
  },
  {
    id: 'poissons',
    name: 'Poissons',
    nameEn: 'Fish',
    items: [
      { name: 'Dorade Braisée', description: 'Dorade royale braisée, légumes de saison', descriptionEn: 'Braised royal sea bream, seasonal vegetables', price: '$$$' },
      { name: 'Bar Braisé', description: 'Bar braisé, sauce beurre blanc', descriptionEn: 'Braised sea bass, white butter sauce', price: '$$$' },
      { name: "Sole d'Ostende", description: "Sole meunière, beurre de citron", descriptionEn: 'Sole meunière, lemon butter', price: '$$$$', chefPick: true },
      { name: 'Jeûne Capitaine', description: 'Capitaine braisé, riz parfumé', descriptionEn: 'Braised Nile perch, fragrant rice', price: '$$$' },
    ],
  },
  {
    id: 'volailles',
    name: 'Volailles',
    nameEn: 'Poultry',
    items: [
      { name: 'Magret de Canard', description: 'Magret de canard rôti, sauce aux fruits rouges', descriptionEn: 'Roasted duck breast, red berry sauce', price: '$$$' },
      { name: 'Poussin Braisé', description: 'Poussin fermier braisé, herbes aromatiques', descriptionEn: 'Braised farm chicken, aromatic herbs', price: '$$' },
    ],
  },
  {
    id: 'viandes',
    name: 'Viandes',
    nameEn: 'Meat',
    items: [
      { name: 'Entrecôte de Belgique', description: "Entrecôte belge grillée, sauce au choix", descriptionEn: 'Grilled Belgian ribeye, choice of sauce', price: '$$$' },
      { name: 'Tomahawk de Porc', description: "Tomahawk de porc confit, miel et épices", descriptionEn: 'Pork tomahawk, honey and spices', price: '$$$' },
      { name: "Tomahawk de Bœuf", description: "Tomahawk de bœuf grillé, poivre noir", descriptionEn: 'Grilled beef tomahawk, black pepper', price: '$$$$' },
      { name: 'Wagyu', description: 'Wagyu A5, sauce truffée', descriptionEn: 'Wagyu A5, truffle sauce', price: '$$$$', chefPick: true },
      { name: "Souris d'Agneau", description: "Souris d'agneau confite, miel et romarin", descriptionEn: 'Lamb shank confit, honey and rosemary', price: '$$$' },
      { name: "Gigot d'Agneau", description: "Gigot d'agneau rôti, flageolets", descriptionEn: 'Roasted leg of lamb, flageolet beans', price: '$$$' },
      { name: "Côte à l'Os", description: "Côte de bœuf maturée, sauce béarnaise", descriptionEn: 'Aged bone-in ribeye, béarnaise sauce', price: '$$$$' },
      { name: 'T-Bone', description: 'T-Bone grillé, légumes grillés', descriptionEn: 'Grilled T-bone steak, grilled vegetables', price: '$$$$', chefPick: true },
    ],
  },
  {
    id: 'fruits-de-mer',
    name: 'Fruits de Mer',
    nameEn: 'Seafood',
    items: [
      { name: 'Plateau de Fruits de Mer', description: 'Plateau royal de fruits de mer frais', descriptionEn: 'Royal platter of fresh seafood', price: '$$$$', chefPick: true },
      { name: 'Riz aux Gambas NATKAZ', description: 'Riz parfumé aux gambas, sauce NATKAZ', descriptionEn: 'Fragrant rice with prawns, NATKAZ sauce', price: '$$$' },
      { name: 'Pieuvre à la LORENA', description: 'Pieuvre grillée, sauce LORENA', descriptionEn: 'Grilled octopus, LORENA sauce', price: '$$$' },
      { name: 'Homard', description: 'Homard grillé, beurre à l\'ail', descriptionEn: 'Grilled lobster, garlic butter', price: '$$$$' },
      { name: 'Pince Royale de Crabe', description: 'Pinces de crabe royal, mayonnaise maison', descriptionEn: 'King crab legs, homemade mayonnaise', price: '$$$$' },
      { name: 'Saint-Jacques façon NATHALIE', description: 'Saint-jacques, sauce crémeuse NATHALIE', descriptionEn: 'Scallops, creamy NATHALIE sauce', price: '$$$' },
      { name: 'Spaghetti LÉONCY à la Truffe', description: 'Spaghetti à la truffe noire, façon LÉONCY', descriptionEn: 'Black truffle spaghetti, LÉONCY style', price: '$$$$', chefPick: true },
      { name: 'Tagliatelle PITCHOU à la Crème de Cossa', description: 'Tagliatelles, crème de cossa, façon PITCHOU', descriptionEn: 'Tagliatelle, cossa cream, PITCHOU style', price: '$$$' },
    ],
  },
];
