import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

const CATEGORIES = [
  { slug: 'entrees-froides', name_fr: 'Entrées Froides', name_en: 'Cold Starters', name_pt: 'Entradas Frias', sort_order: 1 },
  { slug: 'entrees-chaudes', name_fr: 'Entrées Chaudes', name_en: 'Hot Starters', name_pt: 'Entradas Quentes', sort_order: 2 },
  { slug: 'poissons', name_fr: 'Poissons', name_en: 'Fish', name_pt: 'Peixes', sort_order: 3 },
  { slug: 'viandes', name_fr: 'Viandes', name_en: 'Meat', name_pt: 'Carnes', sort_order: 4 },
  { slug: 'volailles', name_fr: 'Volailles', name_en: 'Poultry', name_pt: 'Aves', sort_order: 5 },
  { slug: 'fruits-de-mer', name_fr: 'Fruits de Mer', name_en: 'Seafood', name_pt: 'Frutos do Mar', sort_order: 6 },
  { slug: 'autres', name_fr: 'Autres', name_en: 'Others', name_pt: 'Outros', sort_order: 7 },
  { slug: 'desserts', name_fr: 'Desserts', name_en: 'Desserts', name_pt: 'Sobremesas', sort_order: 8 },
];

// Inline seed data — same as menuData.ts but structured for DB insert
const ITEMS: Record<string, { name: string; description_fr: string; description_en: string; description_pt: string; price: string; chef_pick?: boolean; image?: string; sort_order: number }[]> = {
  'entrees-froides': [
    { name: 'Roulade de Jambon', description_fr: 'Roulade de jambon maison', description_en: 'Homemade ham roulade', description_pt: 'Roulade de presunto artesanal', price: '$$', sort_order: 1, image: '/images/roulade-de-jambon.jpg' },
    { name: 'Tartare au Saumon', description_fr: 'Tartare de saumon frais, accras', description_en: 'Fresh salmon tartare', description_pt: 'Tartare de salmão fresco, acras', price: '$$', sort_order: 2, image: '/images/tartare-au-saumo.jpg' },
    { name: 'Saumon Fumé', description_fr: 'Saumon fumé maison, garniture traditionnelle', description_en: 'House-smoked salmon, traditional garnish', description_pt: 'Salmão defumado artesanal, acompanhamento tradicional', price: '$$', sort_order: 3, image: '/images/saumon-fume.jpg' },
    { name: 'Foie Gras de Canard', description_fr: 'Foie gras de canard, confiture de fruits', description_en: 'Duck foie gras, fruit jam', description_pt: 'Foie gras de pato, geleia de frutas', price: '$$$', sort_order: 4, chef_pick: true, image: '/images/foie-gras-de-canard.jpg' },
    { name: 'Tomate Mozzarella', description_fr: 'Tomates fraîches, mozzarella, basilic, huile d\'olive', description_en: 'Fresh tomatoes, mozzarella, basil, olive oil', description_pt: 'Tomates frescas, muçarela, manjericão, azeite de oliva', price: '$', sort_order: 5, image: '/images/tomate-mozzarella.jpg' },
    { name: 'Salade de Pieuvre', description_fr: 'Salade de pieuvre grillée, vinaigrette agrumes', description_en: 'Grilled octopus salad, citrus vinaigrette', description_pt: 'Salada de polvo grelhado, vinagrete de citros', price: '$$', sort_order: 6, image: '/images/salade-de-pieuvre.jpg' },
    { name: 'Cocktail de Cossas', description_fr: 'Cocktail de cossas frais, sauce maison', description_en: 'Fresh cossas cocktail, homemade sauce', description_pt: 'Coquetel de cossas frescos, molho caseiro', price: '$$', sort_order: 7, image: '/images/cocktail-de-cossas.jpg' },
    { name: 'Tomates aux Cossas', description_fr: 'Tomates garnies de cossas, sauce cocktail', description_en: 'Tomatoes stuffed with cossas, cocktail sauce', description_pt: 'Tomates recheadas com cossas, molho cocktail', price: '$$', sort_order: 8, image: '/images/tomates-aux-cossas.jpg' },
    { name: 'Oeufs à la Russe', description_fr: 'Oeufs à la russe, mayonnaise maison', description_en: 'Russian eggs, homemade mayonnaise', description_pt: 'Ovos à russa, maionese caseira', price: '$', sort_order: 9, image: '/images/oeufs-a-la-russe.jpg' },
    { name: 'Salade Niçoise', description_fr: 'Salade niçoise traditionnelle, thon, olives, œufs', description_en: 'Traditional Niçoise salad, tuna, olives, eggs', description_pt: 'Salada nicoise tradicional, atum, azeitonas, ovos', price: '$$', sort_order: 10, image: '/images/salade-nicoise.jpg' },
    { name: 'Salade Verte', description_fr: 'Salade verte fraîche, vinaigrette', description_en: 'Fresh green salad, vinaigrette', description_pt: 'Salada verde fresca, vinagrete', price: '$', sort_order: 11, image: '/images/salade-verte.jpg' },
    { name: 'Salade Mixte', description_fr: 'Salade mixte de légumes frais', description_en: 'Mixed fresh vegetable salad', description_pt: 'Salada mista de legumes frescos', price: '$', sort_order: 12, image: '/images/salade-mixte.jpg' },
    { name: 'Cossa/Gambas Croquant', description_fr: 'Cossas et gambas croustillants, sauce aïl pili', description_en: 'Crispy cossas and prawns, garlic pili sauce', description_pt: 'Cossas e gambas crocantes, molho de alho e pili', price: '$$', sort_order: 13, chef_pick: true, image: '/images/cossa-gambas-croquant.jpg' },
    { name: 'Crème de Cossa', description_fr: 'Crème onctueuse de cossa, touché d\'épices', description_en: 'Smooth cossa cream, touch of spices', description_pt: 'Creme aveludado de cossa, toque de especiarias', price: '$$', sort_order: 14, chef_pick: true, image: '/images/creme-de-cossa.jpg' },
    { name: 'Noix de Saint Jacques au Porc Ibérico', description_fr: 'Saint-jacques poêlées, porc ibérico finement tranché', description_en: 'Pan-seared scallops, finely sliced Iberico pork', description_pt: 'Vieiras na chapa, presunto ibérico finamente fatiado', price: '$$$', sort_order: 15 },
    { name: 'Salade Grecque à la Feta', description_fr: 'Salade grecque traditionnelle, feta crémeuse, olives kalamata', description_en: 'Traditional Greek salad, creamy feta, Kalamata olives', description_pt: 'Salada grega tradicional, feta cremosa, azeitonas kalamata', price: '$', sort_order: 16, image: '/images/salade-grecque-a-la-feta.jpg' },
    { name: 'Caviar', description_fr: 'Caviar d\'exception, service traditionnel, blinis et crème fraîche', description_en: 'Exceptional caviar, traditional service, blinis and crème fraîche', description_pt: 'Caviar de exceção, serviço tradicional, blinis e creme fraîche', price: '$$$$', sort_order: 17, chef_pick: true, image: '/images/caviar.jpg' },
  ],
  'entrees-chaudes': [
    { name: '6 Escargots de Bourgogne', description_fr: '6 escargots de Bourgogne, beurre à l\'ail et persil', description_en: '6 Burgundy escargots, garlic and parsley butter', description_pt: '6 caracóis da Borgonha, manteiga de alho e salsinha', price: '$$', sort_order: 1, image: '/images/6-escargots-de-bourgogne.jpg' },
    { name: 'Chouriço Grillé Portugal', description_fr: 'Chouriço portugais grillé, flambé à la table', description_en: 'Grilled Portuguese chouriço, tableside flambé', description_pt: 'Chouriço português grelhado, flambeado na mesa', price: '$$', sort_order: 2, chef_pick: true, image: '/images/chourico-grille-portugal.jpg' },
    { name: 'Croquettes de Morue ou Crevette', description_fr: 'Croquettes de morue ou de crevettes, sauce maison', description_en: 'Cod or shrimp croquettes, homemade sauce', description_pt: 'Croquetas de bacalhau ou camarão, molho caseiro', price: '$$', sort_order: 3, image: '/images/croquettes-de-morue-ou-crevette.jpg' },
    { name: 'Coquille de Poisson', description_fr: 'Coquille de poisson farcie, gratinée', description_en: 'Stuffed fish scallop, gratiné', description_pt: 'Concha de peixe recheada, gratinada', price: '$$', sort_order: 4, image: '/images/coquille-de-poisson.jpg' },
    { name: 'Beignets de Cossas', description_fr: 'Beignets de cossas croustillants, sauce cocktail', description_en: 'Crispy cossas fritters, cocktail sauce', description_pt: 'Beignets de cossas crocantes, molho cocktail', price: '$$', sort_order: 5, image: '/images/beignets-de-cossas.jpg' },
    { name: 'Cossas Special "Chez Gaby"', description_fr: 'Cossas façon Chez Gaby, sauce secrète', description_en: 'Cossas Chez Gaby style, secret sauce', description_pt: 'Cossas ao estilo Chez Gaby, molho secreto', price: '$$$', sort_order: 6, chef_pick: true, image: '/images/cossas-special-chez-gaby.jpg' },
    { name: 'Cuisses de Grenouilles', description_fr: 'Cuisses de grenouilles poêlées, beurre à l\'ail', description_en: 'Pan-fried frog legs, garlic butter', description_pt: 'Coxinhas de rã na chapa, manteiga de alho', price: '$$$', sort_order: 7, image: '/images/cuisses-de-grenouilles.jpg' },
    { name: 'Croque Madame/Monsieur', description_fr: 'Croque madame ou monsieur, frites maison', description_en: 'Croque madame or monsieur, homemade fries', description_pt: 'Croque madame ou monsieur, batatas fritas caseiras', price: '$$', sort_order: 8, image: '/images/croque-madame-monsieur.jpg' },
    { name: 'Les Toastes aux Champignons', description_fr: 'Toasts garnis de champignons sautés, fromage fondu', description_en: 'Toasts with sautéed mushrooms, melted cheese', description_pt: 'Tostas com cogumelos salteados, queijo derretido', price: '$$', sort_order: 9, image: '/images/les-toastes-aux-champignons.jpg' },
    { name: 'Aubergines Farcies', description_fr: 'Aubergines farcies de viande, gratinées', description_en: 'Stuffed aubergines with meat, gratiné', description_pt: 'Berinjelas recheadas com carne, gratinadas', price: '$$', sort_order: 10, image: '/images/aubergines-farcies.jpg' },
  ],
  'poissons': [
    { name: 'Capitaine', description_fr: 'Capitaine braisé, riz parfumé', description_en: 'Braised Nile perch, fragrant rice', description_pt: 'Capitão braseado, arroz perfumado', price: '$$$', sort_order: 1, image: '/images/capitaine.jpg' },
    { name: 'Capitaine Grillé', description_fr: 'Capitaine grillé, légumes de saison', description_en: 'Grilled Nile perch, seasonal vegetables', description_pt: 'Capitão grelhado, legumes da estação', price: '$$$', sort_order: 2, image: '/images/capitaine-grille.jpg' },
    { name: 'Brochette de Capitaine', description_fr: 'Brochette de capitaine mariné, sauce teriyaki, riz', description_en: 'Marinated Nile perch brochette, teriyaki sauce, rice', description_pt: 'Brocheto de capitão marinado, molho teriyaki, arroz', price: '$$$', sort_order: 3, image: '/images/brochette-de-capitaine.jpg' },
    { name: 'Filet de Capitaine', description_fr: 'Filet de capitaine grillé, beurre citronné, légumes', description_en: 'Grilled Nile perch fillet, lemon butter, vegetables', description_pt: 'Filé de capitão grelhado, manteiga de limão, legumes', price: '$$$', sort_order: 4, image: '/images/filet-de-capitaine.jpg' },
    { name: 'Les Coquilles de Saint Jacques au Beurre Blanc', description_fr: 'Saint-jacques poêlées, sauce beurre blanc', description_en: 'Pan-seared scallops, white butter sauce', description_pt: 'Vieiras na chapa, molho beurre blanc', price: '$$$$', sort_order: 5, chef_pick: true, image: '/images/les-coquilles-de-saint-jacques-au-beurre-blanc.jpg' },
    { name: 'Filet de King Klip', description_fr: 'Filet de king klip grillé, sauce au choix', description_en: 'Grilled king klip fillet, choice of sauce', description_pt: 'Filé de king klip grelhado, molho à escolha', price: '$$$', sort_order: 6, image: '/images/filet-de-king-klip.jpg' },
    { name: 'Riz aux Fruits de Mer', description_fr: 'Riz parfumé aux fruits de mer frais', description_en: 'Fragrant rice with fresh seafood', description_pt: 'Arroz perfumado com frutos do mar frescos', price: '$$$', sort_order: 7, image: '/images/riz-aux-fruits-de-mer.jpg' },
    { name: 'Riz de Pieuvre', description_fr: 'Riz à la pieuvre grillée, sauce tomate', description_en: 'Rice with grilled octopus, tomato sauce', description_pt: 'Arroz com polvo grelhado, molho de tomate', price: '$$$', sort_order: 8, image: '/images/riz-de-pieuvre.jpg' },
    { name: 'Morue Grillée ou Bouillie avec Légumes', description_fr: 'Morue grillée ou bouillie, légumes de saison', description_en: 'Grilled or boiled cod, seasonal vegetables', description_pt: 'Bacalhau grelhado ou cozido, legumes da estação', price: '$$$', sort_order: 9, image: '/images/morue-grillee-ou-bouillie-avec-legumes.jpg' },
    { name: 'Morue à Braz', description_fr: 'Morue à la mode de Braz, riz parfumé', description_en: 'Braz-style cod, fragrant rice', description_pt: 'Bacalhau ao estilo Braz, arroz perfumado', price: '$$$', sort_order: 10, image: '/images/morue-a-braz.jpg' },
    { name: 'Calderade de Morue', description_fr: 'Calderade de morue traditionnelle', description_en: 'Traditional cod calderade', description_pt: 'Calderada de bacalhau tradicional', price: '$$$', sort_order: 11, image: '/images/calderade-de-morue.jpg' },
    { name: 'Cossas Gaby Plat', description_fr: 'Cossas façon Gaby, riz parfumé', description_en: 'Cossas Gaby style, fragrant rice', description_pt: 'Cossas ao estilo Gaby, arroz perfumado', price: '$$$', sort_order: 12, chef_pick: true, image: '/images/cossas-gaby-plat.jpg' },
    { name: 'Cossas Zélia', description_fr: 'Cossas à la Zélia, sauce crémeuse', description_en: 'Cossas Zélia style, creamy sauce', description_pt: 'Cossas ao estilo Zélia, molho cremoso', price: '$$$', sort_order: 13, image: '/images/cossas-zelia.jpg' },
    { name: 'Cossas Moyenne Plat', description_fr: 'Cossas moyenne, riz et légumes', description_en: 'Medium cossas, rice and vegetables', description_pt: 'Cossas médio, arroz e legumes', price: '$$$', sort_order: 14, image: '/images/cossas-moyenne-plat.jpg' },
    { name: 'Cossas Royal', description_fr: 'Cossas royal, sauce champagne', description_en: 'Royal cossas, champagne sauce', description_pt: 'Cossas royal, molho champagne', price: '$$$$', sort_order: 15, chef_pick: true, image: '/images/cossas-royal.jpg' },
    { name: 'Langouste au Beurre Blanc ou Nature', description_fr: 'Langouste grillée, beurre blanc ou nature', description_en: 'Grilled lobster, white butter sauce or natural', description_pt: 'Lagosta grelhada, molho beurre blanc ou natural', price: '$$$$', sort_order: 16, image: '/images/langouste-au-beurre-blanc-ou-nature.jpg' },
    { name: 'Sole Meunière', description_fr: 'Sole meunière, beurre de citron, pommes de terre sautées', description_en: 'Sole meunière, lemon butter, sautéed potatoes', description_pt: 'Solha meunière, manteiga de limão, batatas salteadas', price: '$$$$', sort_order: 17, chef_pick: true, image: '/images/sole-meuniere.jpg' },
    { name: 'Le Bar', description_fr: 'Bar de ligne, cuisson au choix', description_en: 'Line-caught sea bass, choice of cooking', description_pt: 'Robalo da linha, ponto de cozimento à escolha', price: '$$$', sort_order: 18, image: '/images/le-bar.jpg' },
    { name: 'Filet de Sole Panne', description_fr: 'Filet de sole poêlé, beurre noisette', description_en: 'Pan-seared sole fillet, brown butter', description_pt: 'Filé de solha na chapa, manteiga avellã', price: '$$$', sort_order: 19, image: '/images/filet-de-sole-panne.jpg' },
    { name: 'Poissons au Four', description_fr: 'Poisson entier au four, herbes aromatiques', description_en: 'Whole baked fish, aromatic herbs', description_pt: 'Peixe inteiro assado, ervas aromáticas', price: '$$$', sort_order: 20, image: '/images/poissons-au-four.jpg' },
    { name: 'Calamars Sévillhana', description_fr: 'Calamars à la sévillana, riz safran', description_en: 'Squid Sévillana style, saffron rice', description_pt: 'Lulas à moda sevilhana, arroz com açafrão', price: '$$$', sort_order: 21, image: '/images/calamars-sevillhana.jpg' },
    { name: 'Calamars Grillé', description_fr: 'Calamars grillés, citron et huile d\'olive', description_en: 'Grilled squid, lemon and olive oil', description_pt: 'Lulas grelhadas, limão e azeite de oliva', price: '$$$', sort_order: 22, image: '/images/calamars-grille.jpg' },
    { name: 'Dorade Braisée', description_fr: 'Dorade royale braisée, légumes de saison, jus d\'herbes', description_en: 'Braised royal sea bream, seasonal vegetables, herb jus', description_pt: 'Dourada real braseada, legumes da estação, caldo de ervas', price: '$$$', sort_order: 23, image: '/images/dorade-braisee.jpg' },
    { name: 'Bar Braisé', description_fr: 'Bar braisé, sauce beurre blanc, purée de pommes de terre', description_en: 'Braised sea bass, white butter sauce, potato purée', description_pt: 'Robalo braseado, molho beurre blanc, purê de batatas', price: '$$$', sort_order: 24, image: '/images/bar-braise.jpg' },
    { name: "Sole d'Ostende", description_fr: "Sole meunière, beurre de citron, pommes de terre sautées", description_en: 'Sole meunière, lemon butter, sautéed potatoes', description_pt: 'Solha de Ostenda, manteiga de limão, batatas salteadas', price: '$$$$', sort_order: 25, chef_pick: true, image: '/images/sole-dostende.jpg' },
    { name: 'Jeûne Capitaine', description_fr: 'Capitaine braisé, riz parfumé, sauce aux épices', description_en: 'Braised Nile perch, fragrant rice, spiced sauce', description_pt: 'Capitão braseado, arroz perfumado, molho apimentado', price: '$$$', sort_order: 26, image: '/images/jeune-capitaine.jpg' },
  ],
  'viandes': [
    { name: 'Filet', description_fr: 'Filet de bœuf grillé, sauce au choix', description_en: 'Grilled beef filet, choice of sauce', description_pt: 'Filé de carne grelhado, molho à escolha', price: '$$$', sort_order: 1, image: '/images/filet.jpg' },
    { name: 'Filet à la Bière', description_fr: 'Filet de bœuf, sauce à la bière artisanale', description_en: 'Beef filet, craft beer sauce', description_pt: 'Filé de carne, molho de cerveja artesanal', price: '$$$', sort_order: 2, image: '/images/filet-a-la-biere.jpg' },
    { name: 'Filet Américain', description_fr: 'Filet de bœuf américain, frites maison', description_en: 'American-style beef filet, homemade fries', description_pt: 'Filé de carne à americana, batatas fritas caseiras', price: '$$$', sort_order: 3, image: '/images/filet-americain.jpg' },
    { name: 'Filet Gaby', description_fr: 'Filet signature Gaby, sauce secrète', description_en: 'Gaby signature filet, secret sauce', description_pt: 'Filé assinatura Gaby, molho secreto', price: '$$$', sort_order: 4, chef_pick: true, image: '/images/filet-gaby.jpg' },
    { name: 'Filet Forestier', description_fr: 'Filet de bœuf, sauce forestière aux champignons', description_en: 'Beef filet, mushroom forestière sauce', description_pt: 'Filé de carne, molho floresta com cogumelos', price: '$$$', sort_order: 5, image: '/images/filet-forestier.jpg' },
    { name: 'Brochettes Viande', description_fr: 'Brochettes de viande marinées, riz parfumé', description_en: 'Marinated meat skewers, fragrant rice', description_pt: 'Espetinhos de carne marinados, arroz perfumado', price: '$$', sort_order: 6, image: '/images/brochettes-viande.jpg' },
    { name: 'Entrecôte', description_fr: 'Entrecôte grillée, sauce au choix, frites maison', description_en: 'Grilled rib steak, choice of sauce, homemade fries', description_pt: 'Bife de costela grelhado, molho à escolha, batatas fritas caseiras', price: '$$$', sort_order: 7, image: '/images/entrecote.jpg' },
    { name: 'Bitoque Special', description_fr: 'Bitoque spécial, œuf au plat, frites', description_en: 'Special bitoque, fried egg, fries', description_pt: 'Bitoque especial, ovo frito, batatas fritas', price: '$$', sort_order: 8, image: '/images/bitoque-special.jpg' },
    { name: 'Côtes de Porc', description_fr: 'Côtes de porc grillées, sauce au choix', description_en: 'Grilled pork cutlets, choice of sauce', description_pt: 'Costeletas de porco grelhadas, molho à escolha', price: '$$', sort_order: 9, image: '/images/cotes-de-porc.jpg' },
    { name: 'Cochon de Lait', description_fr: 'Cochon de lait rôti, légumes rôtis', description_en: 'Roasted suckling pig, roasted vegetables', description_pt: 'Leitão assado, legumes assados', price: '$$$', sort_order: 10, image: '/images/cochon-de-lait.jpg' },
    { name: 'Escalope Cordon Bleu', description_fr: 'Escalope cordon-bleu, frites maison', description_en: 'Cordon bleu escalope, homemade fries', description_pt: 'Escalope cordon-bleu, batatas fritas caseiras', price: '$$', sort_order: 11, image: '/images/escalope-cordon-bleu.jpg' },
    { name: 'Escalope Gratinnée aux Champignons', description_fr: 'Escalope gratinée, sauce champignons', description_en: 'Gratiné escalope, mushroom sauce', description_pt: 'Escalope gratinada, molho de cogumelos', price: '$$', sort_order: 12, image: '/images/escalope-gratinnee-aux-champignons.jpg' },
    { name: 'Escalope Milanaise', description_fr: 'Escalope milanaise, riz ou frites', description_en: 'Milanese escalope, rice or fries', description_pt: 'Escalope milanesa, arroz ou batatas fritas', price: '$$', sort_order: 13, image: '/images/escalope-milanaise.jpg' },
    { name: 'Escalope de Veau', description_fr: 'Escalope de veau poêlée, beurre noisette', description_en: 'Pan-seared veal escalope, brown butter', description_pt: 'Escalope de vitela na chapa, manteiga avellã', price: '$$$', sort_order: 14, image: '/images/escalope-de-veau.jpg' },
    { name: 'Côtes de Veau', description_fr: 'Côtes de veau grillées, sauce au choix', description_en: 'Grilled veal cutlets, choice of sauce', description_pt: 'Costeletas de vitela grelhadas, molho à escolha', price: '$$$', sort_order: 15, image: '/images/cotes-de-veau.jpg' },
    { name: 'Osso Buco', description_fr: 'Osso buco mijoté, polenta crémeuse', description_en: 'Braised osso buco, creamy polenta', description_pt: 'Osso buco braseado, polenta cremosa', price: '$$$', sort_order: 16, chef_pick: true, image: '/images/osso-buco.jpg' },
    { name: "Côtelette d'Agneau Marco Polo", description_fr: "Côtelette d'agneau, sauce Marco Polo aux herbes", description_en: 'Lamb chop, Marco Polo herb sauce', description_pt: 'Costeleta de cordeiro, molho Marco Polo de ervas', price: '$$$', sort_order: 17, image: '/images/cotelette-dagneau-marco-polo.jpg' },
    { name: "Carré d'Agneau", description_fr: "Carré d'agneau rôti, flageolets, sauce persillade", description_en: 'Roasted rack of lamb, flageolet beans, persillade sauce', description_pt: 'Cordeiro assado no espeto, feijão flageolet, molho persillade', price: '$$$', sort_order: 18, image: '/images/carre-dagneau.jpg' },
    { name: 'Jambonneau de Porc', description_fr: 'Jambonneau de porc confit, purée de pommes de terre', description_en: 'Confit pork knuckle, potato purée', description_pt: 'Joelho de porco confitado, purê de batatas', price: '$$', sort_order: 19, image: '/images/jambonneau-de-porc.jpg' },
    { name: 'Entrecôte de Belgique', description_fr: 'Entrecôte belge grillée, sauce au choix, frites maison', description_en: 'Grilled Belgian ribeye, choice of sauce, homemade fries', description_pt: 'Bife de costela belga grelhado, molho à escolha, batatas fritas caseiras', price: '$$$', sort_order: 20, image: '/images/entrecote-de-belgique.jpg' },
    { name: 'Tomahawk de Porc', description_fr: 'Tomahawk de porc confit, miel et épices, légumes rôtis', description_en: 'Pork tomahawk confit, honey and spices, roasted vegetables', description_pt: 'Tomahawk de porco confitado, mel e especiarias, legumes assados', price: '$$$', sort_order: 21, image: '/images/tomahawk-de-porc.jpg' },
    { name: 'Tomahawk de Bœuf', description_fr: 'Tomahawk de bœuf grillé, sauce poivre noir, frites', description_en: 'Grilled beef tomahawk, black pepper sauce, fries', description_pt: 'Tomahawk de carne grelhado, molho de pimenta do reino, batatas fritas', price: '$$$$', sort_order: 22, chef_pick: true, image: '/images/tomahawk-de-boeuf.jpg' },
    { name: 'Wagyu-o, 200g', description_fr: 'Wagyu A5, 200g, sauce truffée, légumes de saison', description_en: 'Wagyu A5, 200g, truffle sauce, seasonal vegetables', description_pt: 'Wagyu A5, 200g, molho de trufas, legumes da estação', price: '$$$$', sort_order: 23, chef_pick: true, image: '/images/wagyu-o-200g.jpg' },
    { name: "Souris d'Agneau", description_fr: "Souris d'agneau confite, miel et romarin, purée de patate douce", description_en: 'Lamb shank confit, honey and rosemary, sweet potato purée', description_pt: 'Pernil de cordeiro confitado, mel e alecrim, purê de batata-doce', price: '$$$', sort_order: 24, image: '/images/souris-dagneau.jpg' },
    { name: "Gigot d'Agneau", description_fr: "Gigot d'agneau rôti, flageolets, sauce persillade", description_en: 'Roasted leg of lamb, flageolet beans, persillade sauce', description_pt: 'Pernil de cordeiro assado, feijão flageolet, molho persillade', price: '$$$', sort_order: 25, image: '/images/gigot-dagneau.jpg' },
    { name: "Côte à l'Os", description_fr: "Côte de bœuf maturée, sauce béarnaise, frites", description_en: 'Aged bone-in ribeye, béarnaise sauce, fries', description_pt: 'Costela de carne maturada, molho bernard, batatas fritas', price: '$$$$', sort_order: 26, chef_pick: true, image: '/images/cote-a-los.jpg' },
    { name: "T'Bone", description_fr: 'T\'Bone grillé, légumes grillés, sauce au choix', description_en: 'Grilled T-bone steak, grilled vegetables, choice of sauce', description_pt: 'Bife T-Bone grelhado, legumes grelhados, molho à escolha', price: '$$$$', sort_order: 27, chef_pick: true, image: '/images/t-bone.jpg' },
    { name: 'Le Filet Rossini', description_fr: 'Filet de bœuf Rossini, escalope de foie gras, sauce truffée', description_en: 'Beef filet Rossini, foie gras escalope, truffle sauce', description_pt: 'Filé Rossini de carne, escalope de foie gras, molho de trufas', price: '$$$$', sort_order: 28, chef_pick: true, image: '/images/le-filet-rossini.jpg' },
    { name: "Le Filet Crème d'Épinard", description_fr: 'Filet de bœuf, crème d\'épinard, pommes de terre', description_en: 'Beef filet, spinach cream, potatoes', description_pt: 'Filé de carne, creme de espinafre, batatas', price: '$$$', sort_order: 29, image: '/images/le-filet-creme-depinard.jpg' },
    { name: 'Le Filet Sauce Gorgonzola ou Roquefort', description_fr: 'Filet de bœuf, sauce gorgonzola ou roquefort', description_en: 'Beef filet, Gorgonzola or Roquefort sauce', description_pt: 'Filé de carne, molho gorgonzola ou roquefort', price: '$$$', sort_order: 30, image: '/images/le-filet-sauce-gorgonzola-ou-roquefort.jpg' },
    { name: 'Le Tournedos Mexicaine', description_fr: 'Tournedos de bœuf, style mexicaine, épices douces', description_en: 'Beef tournedos, Mexican style, mild spices', description_pt: 'Tournedos de carne, à mexicana, especiarias suaves', price: '$$$', sort_order: 31, image: '/images/le-tournedos-mexicaine.jpg' },
    { name: 'Le Filet Parmegiani', description_fr: 'Filet de bœuf parmesan, gratiné', description_en: 'Parmesan beef filet, gratiné', description_pt: 'Filé de carne à parmegiana, gratinado', price: '$$$', sort_order: 32, image: '/images/le-filet-parmegiani.jpg' },
    { name: 'Le Filet aux Échalotes', description_fr: 'Filet de bœuf, sauce aux échalotes', description_en: 'Beef filet, shallot sauce', description_pt: 'Filé de carne, molho de cebolinha', price: '$$$', sort_order: 33, image: '/images/le-filet-aux-echalotes.jpg' },
  ],
  'volailles': [
    { name: 'Magret de Canard', description_fr: 'Magret de canard rôti, sauce aux fruits rouges, légumes glacés', description_en: 'Roasted duck breast, red berry sauce, glazed vegetables', description_pt: 'Peito de pato assado, molho de frutas vermelhas, legumes caramelizados', price: '$$$', sort_order: 1, image: '/images/magret-de-canard.jpg' },
    { name: 'Poussin Braisé', description_fr: 'Poussin fermier braisé, herbes aromatiques, jus réduit', description_en: 'Braised farm chicken, aromatic herbs, reduced jus', description_pt: 'Frango caipira braseado, ervas aromáticas, caldo reduzido', price: '$$', sort_order: 2, image: '/images/poussin-braise.jpg' },
  ],
  'fruits-de-mer': [
    { name: 'Plateau de Fruits de Mer', description_fr: 'Plateau royal de fruits de mer frais, citron et sauce maison', description_en: 'Royal platter of fresh seafood, lemon and homemade sauce', description_pt: 'Tabua real de frutos do mar frescos, limão e molho caseiro', price: '$$$$', sort_order: 1, chef_pick: true, image: '/images/plateau-de-fruits-de-mer.jpg' },
    { name: 'Riz aux Gambas NATKAZ', description_fr: 'Riz parfumé aux gambas, sauce NATKAZ signature', description_en: 'Fragrant rice with prawns, NATKAZ signature sauce', description_pt: 'Arroz perfumado com gambas, molho assinatura NATKAZ', price: '$$$', sort_order: 2, image: '/images/riz-aux-gambas-natkaz.jpg' },
    { name: "Pieuvre à la LORENA à l'ail ou pili", description_fr: 'Pieuvre grillée, sauce LORENA, à l\'ail ou au pili', description_en: 'Grilled octopus, LORENA sauce, garlic or pili pepper', description_pt: 'Polvo grelhado, molho LORENA, com alho ou pili', price: '$$$', sort_order: 3, image: '/images/pieuvre-a-la-lorena-a-lail-ou-pili.jpg' },
    { name: 'Homard', description_fr: 'Homard grillé, beurre à l\'ail, légumes sautés', description_en: 'Grilled lobster, garlic butter, sautéed vegetables', description_pt: 'Lagosta grelhada, manteiga de alho, legumes salteados', price: '$$$$', sort_order: 4, image: '/images/homard.jpg' },
    { name: 'Pince Royale de Crabe', description_fr: 'Pinces de crabe royal, mayonnaise maison, citron', description_en: 'King crab legs, homemade mayonnaise, lemon', description_pt: 'Talheres de caranguejo real, maionese caseira, limão', price: '$$$$', sort_order: 5, image: '/images/pince-royale-de-crabe.jpg' },
    { name: "Saint Jacques façon NATHALIE à l'ail ou pili", description_fr: "Saint-jacques poêlées, sauce crémeuse NATHALIE, à l'ail ou au pili", description_en: 'Pan-seared scallops, creamy NATHALIE sauce, garlic or pili pepper', description_pt: 'Vieiras na chapa, molho cremoso NATHALIE, com alho ou pili', price: '$$$', sort_order: 6, image: '/images/saint-jacques-facon-nathalie-a-lail-ou-pili.jpg' },
    { name: 'Spaghetti LÉONCY à la Truffe', description_fr: 'Spaghetti à la truffe noire, façon LÉONCY, parmesan frais', description_en: 'Black truffle spaghetti, LÉONCY style, fresh parmesan', description_pt: 'Espaguete à trufa negra, ao estilo LÉONCY, parmesão fresco', price: '$$$$', sort_order: 7, chef_pick: true, image: '/images/spaghetti-leoncy-a-la-truffe.jpg' },
    { name: 'Tagliatelle PITCHOU à la Crème de Cossa', description_fr: 'Tagliatelles fraîches, crème de cossa, façon PITCHOU', description_en: 'Fresh tagliatelle, cossa cream, PITCHOU style', description_pt: 'Tagliatelles frescas, creme de cossas, ao estilo PITCHOU', price: '$$$', sort_order: 8, image: '/images/tagliatelle-pitchou-a-la-creme-de-cossa.jpg' },
    { name: 'Gambas Tiger', description_fr: 'Gambas tiger grillées, riz parfumé', description_en: 'Grilled tiger prawns, fragrant rice', description_pt: 'Gambas tiger grelhadas, arroz perfumado', price: '$$$', sort_order: 9, image: '/images/gambas-tiger.jpg' },
  ],
  'autres': [
    { name: 'Pregos Normal ou Special', description_fr: 'Pregos portugais, normal ou special', description_en: 'Portuguese pregos, normal or special', description_pt: 'Pregos portugueses, normal ou especial', price: '$$', sort_order: 1, image: '/images/pregos-normal-ou-special.jpg' },
    { name: 'Pregos Assiette', description_fr: 'Pregos en assiette, frites maison', description_en: 'Pregos on a plate, homemade fries', description_pt: 'Pregos no prato, batatas fritas caseiras', price: '$$', sort_order: 2, image: '/images/pregos-assiette.jpg' },
    { name: 'Pregos Assiette Champignon', description_fr: 'Pregos assiette, sauce champignons', description_en: 'Pregos plate, mushroom sauce', description_pt: 'Pregos no prato, molho de cogumelos', price: '$$', sort_order: 3, image: '/images/pregos-assiette-champignon.jpg' },
    { name: 'Cailles Grillées', description_fr: 'Cailles grillées, herbes aromatiques', description_en: 'Grilled quail, aromatic herbs', description_pt: 'Codornizes grelhadas, ervas aromáticas', price: '$$', sort_order: 4, image: '/images/cailles-grillees.jpg' },
    { name: '½ Poulet Grillé', description_fr: 'Demi-poulet grillé, frites ou riz', description_en: 'Half roasted chicken, fries or rice', description_pt: 'Meio frango grelhado, batatas fritas ou arroz', price: '$$', sort_order: 5, image: '/images/poulet-grille.jpg' },
    { name: 'Spaghetti Bolognaise', description_fr: 'Spaghetti à la bolognaise maison', description_en: 'Spaghetti with homemade bolognaise', description_pt: 'Espaguete à bolonhesa caseira', price: '$$', sort_order: 6, image: '/images/spaghetti-bolognaise.jpg' },
    { name: 'Lasagne Maison Viande ou Légumes', description_fr: 'Lasagne maison au choix : viande ou légumes', description_en: 'House lasagne, choice of meat or vegetables', description_pt: 'Lasanha caseira à escolha: carne ou legumes', price: '$$', sort_order: 7, image: '/images/lasagne-maison-viande-ou-legumes.jpg' },
    { name: 'Feijoada Cassoulet', description_fr: 'Feijoada cassoulet traditionnelle', description_en: 'Traditional feijoada cassoulet', description_pt: 'Feijoada cassoulet tradicional', price: '$$', sort_order: 8, image: '/images/feijoada-cassoulet.jpg' },
    { name: 'Demi Plat', description_fr: 'Demi-portion de plat au choix', description_en: 'Half portion of any dish', description_pt: 'Meia porção de prato à escolha', price: '$', sort_order: 9, image: '/images/demi-plat.jpg' },
  ],
  'desserts': [
    { name: 'Mousse au Chocolat', description_fr: 'Mousse au chocolat noir, chantilly maison', description_en: 'Dark chocolate mousse, homemade whipped cream', description_pt: 'Mousse de chocolate amargo, chantilly caseiro', price: '$$', sort_order: 1, image: '/images/mousse-au-chocolat.jpg' },
    { name: 'Crêpes au Sucre', description_fr: 'Crêpes traditionnelles au sucre', description_en: 'Traditional sugar crepes', description_pt: 'Crepes tradicionais com açúcar', price: '$', sort_order: 2, image: '/images/crepes-au-sucre.jpg' },
    { name: 'Crêpes Comédie Flambée', description_fr: 'Crêpes flambées au Grand Marnier', description_en: 'Crepes flambéed with Grand Marnier', description_pt: 'Crepes flambeadas com Grand Marnier', price: '$$', sort_order: 3, chef_pick: true, image: '/images/crepes-comedie-flambee.jpg' },
    { name: 'Coupe de Glace', description_fr: 'Coupe de glaces au choix, chantilly', description_en: 'Ice cream cup, choice of flavors, whipped cream', description_pt: 'Copo de sorvetes à escolha, chantilly', price: '$$', sort_order: 4, image: '/images/coupe-de-glace.jpg' },
    { name: 'Dame Blanche', description_fr: 'Dame blanche traditionnelle, glace vanille, crème Chantilly', description_en: 'Traditional Dame Blanche, vanilla ice cream, Chantilly cream', description_pt: 'Dame Blanche tradicional, sorvete de baunilha, creme Chantilly', price: '$$', sort_order: 5, image: '/images/dame-blanche.jpg' },
    { name: 'Gâteau Maison', description_fr: 'Gâteau fait maison du jour', description_en: 'Homemade cake of the day', description_pt: 'Bolo caseiro do dia', price: '$$', sort_order: 6, image: '/images/gateau-maison.jpg' },
    { name: 'Cappuccino', description_fr: 'Cappuccino italien', description_en: 'Italian cappuccino', description_pt: 'Cappuccino italiano', price: '$', sort_order: 7, image: '/images/cappuccino.jpg' },
    { name: 'Irish Coffee', description_fr: 'Irish coffee au whisky irlandais', description_en: 'Irish coffee with Irish whiskey', description_pt: 'Irish coffee com whisky irlandês', price: '$$', sort_order: 8, image: '/images/irish-coffee.jpg' },
    { name: 'Thé', description_fr: 'Thé au choix', description_en: 'Tea of your choice', description_pt: 'Chá à escolha', price: '$', sort_order: 9, image: '/images/the.jpg' },
    { name: 'Bica (Café Expresso)', description_fr: 'Bica — café expresso portugais', description_en: 'Bica — Portuguese espresso coffee', description_pt: 'Bica — café expresso português', price: '$', sort_order: 10, image: '/images/bica-cafe-expresso.jpg' },
  ],
};

export async function POST() {
  try {
    const supabase = createServiceClient();

    // Check if categories already exist
    const { data: existing } = await supabase.from('menu_categories').select('id').limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: true, message: 'Data already seeded' });
    }

    // Insert categories
    for (const cat of CATEGORIES) {
      const { data: catData, error: catErr } = await supabase
        .from('menu_categories')
        .insert(cat)
        .select('id')
        .single();

      if (catErr) {
        return NextResponse.json({ error: `Category "${cat.name_fr}": ${catErr.message}` }, { status: 500 });
      }

      // Insert items for this category
      const items = ITEMS[cat.slug] || [];
      if (items.length > 0) {
        const { error: itemsErr } = await supabase
          .from('menu_items')
          .insert(items.map(item => ({ ...item, category_id: catData.id })));

        if (itemsErr) {
          return NextResponse.json({ error: `Items for "${cat.name_fr}": ${itemsErr.message}` }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Menu seeded successfully' });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Seed failed' }, { status: 500 });
  }
}
