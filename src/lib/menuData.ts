export interface MenuItem {
  name: string;
  description: string;
  descriptionEn: string;
  price: string;
  chefPick?: boolean;
  winePairing?: string;
  image?: string;
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
      {
        name: 'Cossa / Gambas Croquant',
        description: 'Crevettes croustillantes, sauce aïl pili',
        descriptionEn: 'Crispy shrimp, garlic pili sauce',
        price: '$$',
      },
      {
        name: 'Crème de Cossa',
        description: 'Crème onctueuse de cossa, touché d\'épices',
        descriptionEn: 'Smooth cossa cream, touch of spices',
        price: '$$',
        chefPick: true,
      },
      {
        name: 'Noix de Saint-Jacques au Porc Ibérico',
        description: 'Saint-jacques poêlées, porc ibérico finement tranché',
        descriptionEn: 'Pan-seared scallops, finely sliced Iberico pork',
        price: '$$$',
      },
      {
        name: 'Salade Grecque à la Feta',
        description: 'Salade grecque traditionnelle, feta crémeuse, olives kalamata',
        descriptionEn: 'Traditional Greek salad, creamy feta, Kalamata olives',
        price: '$',
      },
      {
        name: 'Caviar',
        description: 'Caviar d\'exception, service traditionnel, blinis et crème fraîche',
        descriptionEn: 'Exceptional caviar, traditional service, blinis and crème fraîche',
        price: '$$$$',
        chefPick: true,
      },
    ],
  },
  {
    id: 'poissons',
    name: 'Poissons',
    nameEn: 'Fish',
    items: [
      {
        name: 'Dorade Braisée',
        description: 'Dorade royale braisée, légumes de saison, jus d\'herbes',
        descriptionEn: 'Braised royal sea bream, seasonal vegetables, herb jus',
        price: '$$$',
      },
      {
        name: 'Bar Braisé',
        description: 'Bar braisé, sauce beurre blanc, purée de pommes de terre',
        descriptionEn: 'Braised sea bass, white butter sauce, potato purée',
        price: '$$$',
      },
      {
        name: "Sole d'Ostende",
        description: "Sole meunière, beurre de citron, pommes de terre sautées",
        descriptionEn: 'Sole meunière, lemon butter, sautéed potatoes',
        price: '$$$$',
        chefPick: true,
      },
      {
        name: 'Jeûne Capitaine',
        description: 'Capitaine braisé, riz parfumé, sauce aux épices',
        descriptionEn: 'Braised Nile perch, fragrant rice, spiced sauce',
        price: '$$$',
      },
      {
        name: 'Filet de Capitaine',
        description: 'Filet de capitaine grillé, beurre citronné, légumes',
        descriptionEn: 'Grilled Nile perch fillet, lemon butter, vegetables',
        price: '$$$',
      },
      {
        name: 'Brochette de Capitaine',
        description: 'Brochette de capitaine mariné, sauce teriyaki, riz',
        descriptionEn: 'Marinated Nile perch brochette, teriyaki sauce, rice',
        price: '$$$',
      },
    ],
  },
  {
    id: 'volailles',
    name: 'Volailles',
    nameEn: 'Poultry',
    items: [
      {
        name: 'Magret de Canard',
        description: 'Magret de canard rôti, sauce aux fruits rouges, légumes glacés',
        descriptionEn: 'Roasted duck breast, red berry sauce, glazed vegetables',
        price: '$$$',
      },
      {
        name: 'Poussin Braisé',
        description: 'Poussin fermier braisé, herbes aromatiques, jus réduit',
        descriptionEn: 'Braised farm chicken, aromatic herbs, reduced jus',
        price: '$$',
      },
    ],
  },
  {
    id: 'viandes',
    name: 'Viandes',
    nameEn: 'Meat',
    items: [
      {
        name: 'Entrecôte de Belgique',
        description: 'Entrecôte belge grillée, sauce au choix, frites maison',
        descriptionEn: 'Grilled Belgian ribeye, choice of sauce, homemade fries',
        price: '$$$',
      },
      {
        name: 'Steak Gaby',
        description: 'Steak signature, sauce vin rouge et ail, œuf au plat, frites',
        descriptionEn: 'Signature steak, red wine and garlic sauce, fried egg, fries',
        price: '$$$',
        chefPick: true,
      },
      {
        name: 'Tomahawk de Porc',
        description: 'Tomahawk de porc confit, miel et épices, légumes rôtis',
        descriptionEn: 'Pork tomahawk confit, honey and spices, roasted vegetables',
        price: '$$$',
      },
      {
        name: 'Tomahawk de Bœuf',
        description: 'Tomahawk de bœuf grillé, sauce poivre noir, frites',
        descriptionEn: 'Grilled beef tomahawk, black pepper sauce, fries',
        price: '$$$$',
      },
      {
        name: 'Wagyu',
        description: 'Wagyu A5, 200g, sauce truffée, légumes de saison',
        descriptionEn: 'Wagyu A5, 200g, truffle sauce, seasonal vegetables',
        price: '$$$$',
        chefPick: true,
      },
      {
        name: "Souris d'Agneau",
        description: "Souris d'agneau confite, miel et romarin, purée de patate douce",
        descriptionEn: 'Lamb shank confit, honey and rosemary, sweet potato purée',
        price: '$$$',
      },
      {
        name: "Gigot d'Agneau",
        description: "Gigot d'agneau rôti, flageolets, sauce persillade",
        descriptionEn: 'Roasted leg of lamb, flageolet beans, persillade sauce',
        price: '$$$',
      },
      {
        name: "Côte à l'Os",
        description: "Côte de bœuf maturée, sauce béarnaise, frites",
        descriptionEn: 'Aged bone-in ribeye, béarnaise sauce, fries',
        price: '$$$$',
      },
      {
        name: 'T-Bone',
        description: 'T-Bone grillé, légumes grillés, sauce au choix',
        descriptionEn: 'Grilled T-bone steak, grilled vegetables, choice of sauce',
        price: '$$$$',
        chefPick: true,
      },
    ],
  },
  {
    id: 'fruits-de-mer',
    name: 'Fruits de Mer',
    nameEn: 'Seafood',
    items: [
      {
        name: 'Plateau de Fruits de Mer',
        description: 'Plateau royal de fruits de mer frais, citron et sauce maison',
        descriptionEn: 'Royal platter of fresh seafood, lemon and homemade sauce',
        price: '$$$$',
        chefPick: true,
      },
      {
        name: 'Riz aux Gambas NATKAZ',
        description: 'Riz parfumé aux gambas, sauce NATKAZ signature',
        descriptionEn: 'Fragrant rice with prawns, NATKAZ signature sauce',
        price: '$$$',
      },
      {
        name: 'Pieuvre à la LORENA',
        description: 'Pieuvre grillée, sauce LORENA, à l\'ail ou au pili',
        descriptionEn: 'Grilled octopus, LORENA sauce, garlic or pili pepper',
        price: '$$$',
      },
      {
        name: 'Homard',
        description: 'Homard grillé, beurre à l\'ail, légumes sautés',
        descriptionEn: 'Grilled lobster, garlic butter, sautéed vegetables',
        price: '$$$$',
      },
      {
        name: 'Pince Royale de Crabe',
        description: 'Pinces de crabe royal, mayonnaise maison, citron',
        descriptionEn: 'King crab legs, homemade mayonnaise, lemon',
        price: '$$$$',
      },
      {
        name: 'Saint-Jacques façon NATHALIE',
        description: 'Saint-jacques poêlées, sauce crémeuse NATHALIE, à l\'ail ou au pili',
        descriptionEn: 'Pan-seared scallops, creamy NATHALIE sauce, garlic or pili pepper',
        price: '$$$',
      },
      {
        name: 'Spaghetti LÉONCY à la Truffe',
        description: 'Spaghetti à la truffe noire, façon LÉONCY, parmesan frais',
        descriptionEn: 'Black truffle spaghetti, LÉONCY style, fresh parmesan',
        price: '$$$$',
        chefPick: true,
      },
      {
        name: 'Tagliatelle PITCHOU à la Crème de Cossa',
        description: 'Tagliatelles fraîches, crème de cossa, façon PITCHOU',
        descriptionEn: 'Fresh tagliatelle, cossa cream, PITCHOU style',
        price: '$$$',
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    nameEn: 'Desserts',
    items: [
      {
        name: 'Flan Maison',
        description: 'Flan traditionnel, crème vanillée, caramel',
        descriptionEn: 'Traditional flan, vanilla cream, caramel',
        price: '$$',
      },
      {
        name: 'Crème Brûlée',
        description: 'Crème brûlée à la vanille, croquant caramélisé',
        descriptionEn: 'Vanilla crème brûlée, caramelized crunch',
        price: '$$',
      },
      {
        name: 'Mousse au Chocolat',
        description: 'Mousse au chocolat noir, chantilly maison',
        descriptionEn: 'Dark chocolate mousse, homemade whipped cream',
        price: '$$',
      },
      {
        name: 'Sorbet Tropical',
        description: 'Sorbet de fruits tropicaux, mangue et passion',
        descriptionEn: 'Tropical fruit sorbet, mango and passion fruit',
        price: '$$',
      },
      {
        name: 'Pêche Melba',
        description: 'Pêche poêlée, glace vanille, sauce framboise',
        descriptionEn: 'Pan-seared peach, vanilla ice cream, raspberry sauce',
        price: '$$',
      },
    ],
  },
];
