// ─────────────────────────────────────────────
//  JAYDEV GROUP - Master Content Library
// ─────────────────────────────────────────────

import { SITE_URL, SALES_EMAIL, EXPORT_EMAIL, MARKETING_EMAIL, PROCUREMENT_EMAIL, PHONE_EXPORT, PHONE_RAJKOT, PHONE_PROCUREMENT } from './site';

export const COMPANY = {
  name: 'Jaydev Multicomm Pvt. Ltd.',
  address: 'B-408 Ratnakar Nine Square, opp ITC Narmada, near Keshavbaug Cross Road, Vastrapur, Ahmedabad, Gujarat - 380015',
  email: SALES_EMAIL,
  website: SITE_URL,
  whatsappExport: PHONE_EXPORT,
  whatsappOffice: '+919978479258',
  stats: {
    monthlyMT: '5000+',
    chemicals: '50+',
    buyers: '100+',
    manufacturers: '6',
  },
  team: [
    {
      name: 'Manish Shukla',
      role: 'Chief Procurement Officer (CPO)',
      remit: 'Global procurement, sourcing & supplier relationships',
      linkedin: null as string | null,
      email: PROCUREMENT_EMAIL as string | null,
      whatsapp: PHONE_PROCUREMENT as string | null,
      image: null as string | null,
    },
    {
      name: 'Meet Sheth',
      role: 'Chief Operating Officer (COO)',
      remit: 'Export, import, logistics, documentation & operations',
      linkedin: 'https://www.linkedin.com/in/meet-sheth-0871/',
      email: EXPORT_EMAIL,
      whatsapp: PHONE_EXPORT,
      image: null,
    },
    {
      name: 'Darsh Katkoria',
      role: 'Chief Business Officer (CBO)',
      remit: 'Sales, customers, revenue & commercial growth',
      linkedin: 'https://www.linkedin.com/in/darsh-k-07579a3b5/',
      email: SALES_EMAIL,
      whatsapp: '+919987539258',
      image: null,
    },
    {
      name: 'Mahir Bhojani',
      role: 'Marketing & Business Development',
      remit: 'Pharma & API sales, marketing & market expansion',
      linkedin: 'https://www.linkedin.com/in/mahir-bhojani-b49027268/',
      email: MARKETING_EMAIL,
      whatsapp: '+919825112687',
      image: null,
    },
  ],
  manufacturers: [
    { name: 'GACL', full: 'Gujarat Alkalies and Chemicals Ltd.', type: 'Authorized Partner', badge: true },
    { name: 'Grasim', full: 'Grasim Industries / Aditya Birla Chemicals', type: 'Authorized Partner', badge: true },
    { name: 'Reliance Industries', full: 'Reliance Industries Ltd.', type: 'Supply Partner', badge: false },
    { name: 'IOCL', full: 'Indian Oil Corporation Ltd.', type: 'Supply Partner', badge: false },
    { name: 'Tata Chemicals', full: 'Tata Chemicals Ltd.', type: 'Supply Partner', badge: false },
    { name: 'Nirma', full: 'Nirma Ltd.', type: 'Supply Partner', badge: false },
    { name: 'GHCL', full: 'GHCL Ltd.', type: 'Supply Partner', badge: false },
    { name: 'DCM Shriram', full: 'DCM Shriram Ltd.', type: 'Supply Partner', badge: false },
    { name: 'Kutch Chemical', full: 'Kutch Chemical Industries Ltd.', type: 'Supply Partner', badge: false },
  ],
};

// ─── Jaydev Group structure ───────────────────
// ─── Certifications & registrations (verifiable proof) ──
export const CERTIFICATIONS = [
  { code: 'ISO 9001:2015', label: 'Quality Management' },
  { code: 'ISO 14001:2015', label: 'Environmental Management' },
  { code: 'ISO 45001:2018', label: 'Occupational Health & Safety' },
  { code: 'IEC Registered', label: 'Import-Export Code' },
  { code: 'GST', label: 'Registered Enterprise' },
  { code: 'RCMC', label: 'Export Promotion Council' },
];

export const GROUP = {
  name: 'Jaydev Group',
  founder: 'Jitesh Vajir',
  founderImage: '/brand/jitesh-vajir.png',
  founderTitle: 'Founder',
  tagline: 'Connecting Chemistry, Creating Solutions',
  hq: 'Ahmedabad, Gujarat, India',
  established: '2018',
  description:
    'Founded in Ahmedabad in 2018, Jaydev Group supplies industrial chemicals and pharmaceutical ingredients to manufacturers across India and to buyers in more than 30 countries. We carry no speculative stock and add no middlemen: every consignment is bought direct from the producer against a confirmed order.',
};

export type Branch = { city: string; country: string; role: string; lat: number; lng: number; hq?: boolean };
export const BRANCHES: Branch[] = [
  { city: 'Ahmedabad', country: 'India', role: 'Head Office & Operations', lat: 23.02, lng: 72.57, hq: true },
  { city: 'Rajkot', country: 'India', role: 'Sourcing & Trade Desk', lat: 22.30, lng: 70.80 },
  { city: 'Mumbai', country: 'India', role: 'Port & Trade Desk', lat: 19.08, lng: 72.88 },
  { city: 'Lagos', country: 'Nigeria', role: 'West Africa Distribution', lat: 6.52, lng: 3.38 },
];

export type BusinessUnit = {
  id: string;
  name: string;
  scope: string;
  icon: string;
  description: string;
  highlights: string[];
};
export const BUSINESS_UNITS: BusinessUnit[] = [
  {
    id: 'multicomm',
    name: 'Jaydev Multicomm Pvt. Ltd.',
    scope: 'Export & Import',
    icon: 'Globe',
    description:
      'Our export arm. IEC-registered, and the entity that contracts every export - chemicals and pharma alike. 100+ buyers across Africa, the Gulf and Southeast Asia.',
    highlights: ['Export to 30+ countries', 'IEC Registered', 'Chemicals & pharma', 'Full COA / MSDS / COO'],
  },
  {
    id: 'pharma',
    name: 'Jaydev Pharma & Intermediates LLP',
    scope: 'Domestic Supply',
    icon: 'FlaskConical',
    description:
      'Our India arm. Supplies APIs, intermediates, excipients and industrial chemicals to manufacturers nationwide, on bulk or spot terms with credit.',
    highlights: ['Pan-India distribution', 'APIs & intermediates', 'Bulk & spot supply', 'Trusted credit terms'],
  },
];

// ─── Import portfolio (Multicomm sources into India) ──
export type ImportProduct = {
  id: string;
  name: string;
  formula?: string;
  cas?: string;
  origin: string;
  description: string;
  applications: string[];
  icon: string;
};
export const IMPORT_PRODUCTS: ImportProduct[] = [
  {
    id: 'zircon-sand',
    name: 'Zircon Sand',
    formula: 'ZrSiO₄',
    cas: '14940-68-2',
    origin: 'Imported under exclusive dealership',
    description:
      'Premium zircon sand (zirconium silicate) for ceramics, refractories, foundry casting, and TV/glass frit. Supplied to Indian ceramic and refractory manufacturers under an exclusive import arrangement.',
    applications: ['Ceramic Opacifier', 'Refractory Bricks', 'Foundry Sand', 'Glass & Frit', 'Investment Casting'],
    icon: 'Gem',
  },
  {
    id: 'lauric-acid',
    name: 'Lauric Acid (C12)',
    formula: 'C₁₂H₂₄O₂',
    cas: '143-07-7',
    origin: 'Imported',
    description:
      'Saturated medium-chain fatty acid (dodecanoic acid) for soaps, surfactants, cosmetics, and food-grade emulsifiers. Sourced from established Southeast Asian oleochemical producers.',
    applications: ['Soap & Detergent', 'Surfactants', 'Cosmetics & Personal Care', 'Food Emulsifiers', 'Lubricants'],
    icon: 'Droplets',
  },
  {
    id: 'decanoic-acid',
    name: 'Decanoic Acid (C10)',
    formula: 'C₁₀H₂₀O₂',
    cas: '334-48-5',
    origin: 'Imported',
    description:
      'Medium-chain capric acid for esters, plasticizers, lubricants, flavour & fragrance, and food-grade applications. Imported to serve Indian specialty and oleochemical processors.',
    applications: ['Esters & Plasticizers', 'Synthetic Lubricants', 'Flavour & Fragrance', 'Food Additives', 'Pharmaceuticals'],
    icon: 'Droplets',
  },
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Group' },
  { href: '/products', label: 'Products' },
  { href: '/industries', label: 'Industries' },
  { href: '/markets', label: 'Markets & Insights' },
  { href: '/quote', label: 'Get Quote' },
];

// ─── Product image mapping ────────────────────
// Unique per-product photos (real substance/sample/transport shots).
// Products not listed here fall back to a distinct local image where one exists,
// then to CATEGORY_IMAGE. Add a path here when a better photo becomes available.
export const IMAGE_MAP: Record<string, string> = {
  // Sourced unique product photographs
  'acetone': '/images/products/acetone.jpg',
  'aluminium-chloride': '/images/products/aluminium-chloride.jpg',
  'aluminium-sulphate': '/images/products/aluminium-sulphate.jpg',
  'calcium-chloride': '/images/products/calcium-chloride.jpg',
  'carbon-tetrachloride': '/images/products/carbon-tetrachloride.jpg',
  'chlorinated-paraffin': '/images/products/chlorinated-paraffin.jpg',
  'chloroform': '/images/products/chloroform.jpg',
  'epichlorohydrin': '/images/products/epichlorohydrin.jpg',
  'epoxy-resin': '/images/products/epoxy-resin.jpg',
  'ethylene-glycol': '/images/products/ethylene-glycol.jpg',
  'hydrazine-hydrate': '/images/products/hydrazine-hydrate.jpg',
  'hydrochloric-acid': '/images/products/hydrochloric-acid.jpg',
  'hydrogen-gas': '/images/products/hydrogen-gas.jpg',
  'hydrogen-peroxide': '/images/products/hydrogen-peroxide.jpg',
  'liquid-chlorine': '/images/products/liquid-chlorine.jpg',
  'methanol': '/images/products/methanol.jpg',
  'methylene-chloride': '/images/products/methylene-chloride.jpg',
  'oleum': '/images/products/oleum.jpg',
  'phosphoric-acid': '/images/products/phosphoric-acid.jpg',
  'smbs': '/images/products/smbs.jpg',
  'sodium-acetate': '/images/products/sodium-acetate.jpg',
  'sodium-bicarbonate': '/images/products/sodium-bicarbonate.jpg',
  'sodium-chlorate': '/images/products/sodium-chlorate.jpg',
  'sodium-nitrate': '/images/products/sodium-nitrate.jpg',
  'stable-bleaching-powder': '/images/products/stable-bleaching-powder.jpg',
  'sulphur': '/images/products/sulphur.jpg',
  'sulphuryl-chloride': '/images/products/sulphuryl-chloride.jpg',
  'thionyl-chloride': '/images/products/thionyl-chloride.jpg',
  'toluene': '/images/products/toluene.jpg',
  'trichloroethylene': '/images/products/trichloroethylene.jpg',
  // Distinct local assets for flagships without a sourced photo
  'pac': '/images/pac.webp',
  'caustic-potash': '/images/causticsoda.webp',
  'sodium-hypochlorite': '/images/watertreatment.webp',
  // Branded Jaydev Multicomm packaging shots (used on Featured)
  'caustic-soda': '/images/packaging/caustic-soda.png',
  'sulphuric-acid': '/images/packaging/sulphuric-acid.png',
};

// ─── Category fallback images (every product gets a photo) ──
export const CATEGORY_IMAGE: Record<string, string> = {
  'chlor-alkali':    '/images/causticsoda.webp',
  'acids':           '/images/sulphuricacid.webp',
  'water-treatment': '/images/watertreatment.webp',
  'specialty':       '/images/smbs.webp',
  'solvents':        '/images/bags-drums.png',
  'inorganic-salts': '/images/calciumchloride.webp',
  'surfactants':     '/images/soap.webp',
  'minerals':        '/images/zircon.jpg',
  'agro':            '/images/fertilizer.jpg',
};

// Resolve the best image for any product: specific → category → generic bags.
export const productImage = (p: { id: string; category: string }) =>
  IMAGE_MAP[p.id] ?? CATEGORY_IMAGE[p.category] ?? '/images/bags.png';

// Dedicated editorial imagery for the home Featured carousel ONLY.
// Product cards / detail pages keep their real product image via productImage().
export const FEATURED_IMAGE: Record<string, string> = {
  'caustic-soda': '/images/causticsoda.webp',
  'sulphuric-acid': '/images/sulphuricacid.webp',
  'pac': '/images/pac.webp',
  'smbs': '/images/smbs.webp',
  'hydrogen-peroxide': '/images/h2o2.webp',
  'calcium-chloride': '/images/calciumchloride.webp',
};
export const featuredImage = (p: { id: string; category: string }) =>
  FEATURED_IMAGE[p.id] ?? productImage(p);

// ─── Industry image mapping (all industries covered) ──
export const INDUSTRY_IMAGE_MAP: Record<string, string> = {
  'water-treatment':        '/images/watertreatment.webp',
  'mining':                 '/images/mining.webp',
  'oil-gas':                '/images/oil.webp',
  'chlor-alkali':           '/images/causticsoda.webp',
  'chemical-intermediates': '/images/plant.jpg',
  'paints-coatings':        '/images/paint.jpg',
  'plastic-rubber':         '/images/plastic.jpg',
  'home-personal-care':     '/images/soap.webp',
  'agro-fertilizer':        '/images/fertilizer.jpg',
  'food-pharma':            '/images/pharma.webp',
  'textile-dyeing':         '/images/textile.webp',
  'pulp-paper':             '/images/paper.webp',
};

// ─── Types ───────────────────────────────────
export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  formula: string;
  cas: string;
  grade: string;
  category: string;
  description: string;
  specs: ProductSpec[];
  applications: string[];
  manufacturers: string[];
  packaging: string[];
  featured?: boolean;
  image?: string; // resolved via IMAGE_MAP at render time
  variants?: { form: string; grade: string }[]; // bundled forms (e.g. flakes/lye/prills)
};

// ─── Full Product Catalog ─────────────────────
// Sources: GACL, Grasim/Aditya Birla, DCM Shriram, Kutch Chemical, GHCL, Reliance
export const products: Product[] = [

  // ══ CHLOR-ALKALI ══════════════════════════════════════════
  {
    id: 'caustic-soda',
    name: 'Caustic Soda',
    formula: 'NaOH',
    cas: '1310-73-2',
    grade: 'Flakes 98.5% · Lye 47-50% · Prills 99.4%',
    category: 'chlor-alkali',
    description: 'Sodium hydroxide via membrane-cell technology - our flagship export from GACL & Grasim. Available as Flakes, Lye (liquid) and Prills/Pearl for textiles, alumina, soap, paper, water treatment, pharma and food processing.',
    specs: [
      { label: 'Flakes Purity', value: '98.5% min (Membrane)' },
      { label: 'Lye Concentration', value: '47-50%' },
      { label: 'Prills Purity', value: '99.4% min' },
      { label: 'NaCl', value: '0.03% max' },
      { label: 'Fe', value: '10 ppm max' },
    ],
    applications: ['Alumina Refining', 'Textile Mercerizing', 'Soap & Detergent', 'Paper & Pulp', 'Water Treatment', 'Pharmaceutical Synthesis', 'Food Processing', 'Oil & Gas Drilling'],
    manufacturers: ['GACL', 'Grasim', 'DCM Shriram', 'Reliance'],
    packaging: ['25 kg / 50 kg HDPE Bags', '500 kg / 1000 kg Jumbo Bags', 'ISO Tanks / Flexi Tanks (Lye)', 'Road Tankers (Lye)'],
    featured: true,
    variants: [
      { form: 'Flakes', grade: '98.5% min · Membrane Grade' },
      { form: 'Lye (Liquid)', grade: '47-50% concentration' },
      { form: 'Prills / Pearl', grade: '99.4% min · low moisture' },
    ],
  },
  {
    id: 'caustic-potash',
    name: 'Caustic Potash',
    formula: 'KOH',
    cas: '1310-58-3',
    grade: 'Lye 47-48% · Flakes 90% / 87%',
    category: 'chlor-alkali',
    description: 'Potassium hydroxide in Lye (liquid) and Flakes form for soft-soap production, biodiesel, battery electrolyte, pharmaceuticals, and potassium-salt synthesis.',
    specs: [
      { label: 'Lye Concentration', value: '47-48%' },
      { label: 'Flakes Purity', value: '90% / 87% min' },
      { label: 'K₂CO₃', value: '1% max' },
      { label: 'Cl⁻', value: '0.01% max' },
    ],
    applications: ['Soft Soap Production', 'Biodiesel Manufacturing', 'Battery Electrolyte', 'Pharmaceutical', 'Potassium Salt Production', 'Alkaline Cleaning'],
    manufacturers: ['GACL'],
    packaging: ['25 kg / 50 kg HDPE Bags (Flakes)', 'ISO Tanks / Flexi Tanks (Lye)', 'Road Tankers (Lye)'],
    featured: false,
    variants: [
      { form: 'Lye (Liquid)', grade: '47-48% concentration' },
      { form: 'Flakes', grade: '90% / 87% min' },
    ],
  },
  {
    id: 'liquid-chlorine',
    name: 'Liquid Chlorine',
    formula: 'Cl₂',
    cas: '7782-50-5',
    grade: '99.5% Min · Liquefied',
    category: 'chlor-alkali',
    description: 'Liquefied chlorine gas for water treatment, PVC production, and organic chemical synthesis. Supplied in tonner cylinders or ISO containers.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Moisture', value: '0.015% max' },
      { label: 'Non-condensable gas', value: '0.5% max' },
      { label: 'UN Number', value: 'UN 1017' },
    ],
    applications: ['Water/Wastewater Disinfection', 'PVC Manufacturing', 'Paper Bleaching', 'Organic Chemical Synthesis'],
    manufacturers: ['GACL', 'Grasim', 'DCM Shriram'],
    packaging: ['900 kg Tonner Cylinders', 'ISO Containers', '150 kg Cylinders'],
    featured: false,
  },
  {
    id: 'hydrogen-gas',
    name: 'Hydrogen Gas',
    formula: 'H₂',
    cas: '1333-74-0',
    grade: '99.9% Min · Compressed',
    category: 'chlor-alkali',
    description: 'High-purity hydrogen gas (co-product of chlor-alkali electrolysis) for hydrogenation, fuel cells, and metal processing.',
    specs: [
      { label: 'Purity', value: '99.9% min' },
      { label: 'Moisture', value: '10 ppm max' },
      { label: 'O₂', value: '5 ppm max' },
      { label: 'UN Number', value: 'UN 1049' },
    ],
    applications: ['Hydrogenation Reactions', 'Fuel Cells', 'Metal Annealing', 'Chemical Synthesis'],
    manufacturers: ['GACL', 'Grasim'],
    packaging: ['High-pressure Steel Cylinders', 'Tube Trailers'],
    featured: false,
  },
  {
    id: 'soda-ash',
    name: 'Soda Ash',
    formula: 'Na₂CO₃',
    cas: '497-19-8',
    grade: '99.2% Min · Dense & Light',
    category: 'chlor-alkali',
    description: 'Sodium carbonate in dense and light grades for glass, detergents, water softening. Sourced from GHCL and Kutch Chemical.',
    specs: [
      { label: 'Purity', value: '99.2% min' },
      { label: 'NaCl', value: '0.5% max' },
      { label: 'Bulk Density (Dense)', value: '1000-1100 g/L' },
      { label: 'Bulk Density (Light)', value: '450-600 g/L' },
      { label: 'Moisture', value: '0.5% max' },
    ],
    applications: ['Glass Manufacturing', 'Detergent Production', 'Water Softening', 'Pulp & Paper'],
    manufacturers: ['GHCL', 'Kutch Chemical'],
    packaging: ['50 kg HDPE Bags', '1000 kg Jumbo Bags'],
    featured: false,
  },

  // ══ ACIDS ══════════════════════════════════════════════════
  {
    id: 'sulphuric-acid',
    name: 'Sulphuric Acid',
    formula: 'H₂SO₄',
    cas: '7664-93-9',
    grade: '98% / 80% / 70% · Industrial',
    category: 'acids',
    description: 'Industrial-grade sulphuric acid for fertilizers, batteries, mining leaching, metal processing, and chemical synthesis. IMDG-compliant packaging for export.',
    specs: [
      { label: 'Purity Available', value: '98% · 80% · 70%' },
      { label: 'Specific Gravity (98%)', value: '1.84 g/cm³' },
      { label: 'Colour', value: 'Colourless to pale yellow' },
      { label: 'UN Number', value: 'UN 1830' },
    ],
    applications: ['Fertilizer (DAP/MAP)', 'Battery Manufacturing', 'Mining Leaching', 'Metal Processing', 'Chemical Synthesis', 'Petroleum Refining'],
    manufacturers: ['GACL', 'Reliance'],
    packaging: ['ISO Tanks (20 MT)', 'UN Drums (200L)', 'Flexi Bags'],
    featured: true,
  },
  {
    id: 'hydrochloric-acid',
    name: 'Hydrochloric Acid',
    formula: 'HCl',
    cas: '7647-01-0',
    grade: '30-33% · Industrial',
    category: 'acids',
    description: 'Industrial hydrochloric acid for metal pickling, pH adjustment, food processing, and chemical synthesis. Supplied in carboys and barrels.',
    specs: [
      { label: 'Concentration', value: '30-33%' },
      { label: 'Fe', value: '5 ppm max' },
      { label: 'As', value: '0.1 ppm max' },
      { label: 'Free Cl₂', value: 'Nil' },
    ],
    applications: ['Metal Pickling & Cleaning', 'pH Control', 'Food Processing', 'Organic Synthesis', 'Oil Well Acidizing'],
    manufacturers: ['GACL', 'DCM Shriram'],
    packaging: ['35 kg Carboys', '265 kg Barrels', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'phosphoric-acid',
    name: 'Phosphoric Acid',
    formula: 'H₃PO₄',
    cas: '7664-38-2',
    grade: '85% Min · Technical + Food Grade',
    category: 'acids',
    description: 'High-purity phosphoric acid in technical and food grade for fertilizers, food/beverage, metal treatment, and detergents.',
    specs: [
      { label: 'Concentration', value: '85% min' },
      { label: 'As (Food Grade)', value: '1 ppm max' },
      { label: 'Heavy Metals', value: '10 ppm max' },
      { label: 'Colour (APHA)', value: '20 max' },
    ],
    applications: ['Fertilizer Production', 'Food & Beverage Acidulant', 'Metal Treatment', 'Detergent Manufacturing', 'Water Treatment'],
    manufacturers: ['Reliance', 'GACL'],
    packaging: ['35 kg Carboys', '250 kg IBC', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'oleum',
    name: 'Oleum (Fuming Sulphuric Acid)',
    formula: 'H₂SO₄·SO₃',
    cas: '8014-95-7',
    grade: '23% / 65% Free SO₃',
    category: 'acids',
    description: 'Oleum (fuming sulphuric acid) in 23% and 65% grades for dye synthesis, sulfonation reactions, and specialty chemical manufacture.',
    specs: [
      { label: 'Free SO₃', value: '23% · 65%' },
      { label: 'H₂SO₄', value: 'Balance' },
      { label: 'Fe', value: '50 ppm max' },
      { label: 'UN Number', value: 'UN 1831' },
    ],
    applications: ['Dye & Pigment Synthesis', 'Sulfonation', 'Pharmaceutical Intermediates', 'Explosives', 'Detergent Sulfonation'],
    manufacturers: ['GACL'],
    packaging: ['ISO Tanks', 'MS Drums (200 kg)'],
    featured: false,
  },
  {
    id: 'chlorosulphonic-acid',
    name: 'Chlorosulphonic Acid',
    formula: 'ClSO₃H',
    cas: '7790-94-5',
    grade: '99% Min',
    category: 'acids',
    description: 'Highly reactive chlorosulphonic acid for saccharin, dye, and pharmaceutical intermediate synthesis. Requires IMDG Class 8 packaging.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'SO₂Cl₂', value: '0.2% max' },
      { label: 'UN Number', value: 'UN 1754' },
      { label: 'Appearance', value: 'Colourless to pale yellow fuming liquid' },
    ],
    applications: ['Saccharin Synthesis', 'Dye Manufacture', 'Pharmaceutical Intermediates', 'Surface-active Agents'],
    manufacturers: ['GACL'],
    packaging: ['50 kg MS Drums', '200 kg MS Drums'],
    featured: false,
  },
  {
    id: 'sulphuryl-chloride',
    name: 'Sulphuryl Chloride',
    formula: 'SO₂Cl₂',
    cas: '7791-25-5',
    grade: '97% Min',
    category: 'acids',
    description: 'Sulphuryl chloride for organic chlorination reactions and pharmaceutical synthesis.',
    specs: [
      { label: 'Purity', value: '97% min' },
      { label: 'Boiling Point', value: '69°C' },
      { label: 'UN Number', value: 'UN 1834' },
    ],
    applications: ['Organic Chlorination', 'Pharmaceutical Synthesis', 'Dye Intermediates'],
    manufacturers: ['GACL'],
    packaging: ['50 kg MS Drums', '250 kg MS Drums'],
    featured: false,
  },
  {
    id: 'thionyl-chloride',
    name: 'Thionyl Chloride',
    formula: 'SOCl₂',
    cas: '7719-09-7',
    grade: '98% Min',
    category: 'acids',
    description: 'Thionyl chloride for pharmaceutical synthesis, agrochemical production, and organic chemistry.',
    specs: [
      { label: 'Purity', value: '98% min' },
      { label: 'Boiling Point', value: '74.6°C' },
      { label: 'UN Number', value: 'UN 1836' },
    ],
    applications: ['Pharmaceutical Synthesis', 'Agrochemical Production', 'Acyl Chloride Manufacture'],
    manufacturers: ['DCM Shriram'],
    packaging: ['50 kg MS Drums', '250 kg MS Drums'],
    featured: false,
  },

  // ══ WATER TREATMENT ══════════════════════════════════════
  {
    id: 'pac',
    name: 'PAC - Poly Aluminium Chloride',
    formula: 'Al₂(OH)nCl₆₋ₙ',
    cas: '1327-41-9',
    grade: 'PAC10 / PAC14 / PAC18 / PAC30',
    category: 'water-treatment',
    description: 'Premium PAC coagulant for municipal water plants and industrial effluent. Available liquid (10-18% Al₂O₃) and powder (28-30%). High demand Africa & Middle East.',
    specs: [
      { label: 'Al₂O₃ (Liquid)', value: '10% · 14% · 18%' },
      { label: 'Al₂O₃ (Powder)', value: '28-30%' },
      { label: 'Basicity', value: '70-90%' },
      { label: 'pH (1% sol.)', value: '3.5-5.0' },
      { label: 'Fe Content', value: '0.5% max' },
    ],
    applications: ['Municipal Water Treatment', 'Industrial Effluent', 'Sewage Treatment', 'Paper Manufacturing'],
    manufacturers: ['GACL'],
    packaging: ['IBC Tanks (1000L)', '250 kg HDPE Drums', '25 kg HDPE Bags (powder)'],
    featured: true,
  },
  {
    id: 'aluminium-sulphate',
    name: 'Aluminium Sulphate (Alum)',
    formula: 'Al₂(SO₄)₃',
    cas: '10043-01-3',
    grade: '17% Al₂O₃ · Liquid & Solid',
    category: 'water-treatment',
    description: 'Classic water treatment coagulant for drinking water purification and effluent treatment. Cost-effective alternative to PAC for lower turbidity water.',
    specs: [
      { label: 'Al₂O₃', value: '17% min (solid) · 8% (liquid)' },
      { label: 'Fe', value: '0.05% max (potable grade)' },
      { label: 'pH (1% sol.)', value: '3.0-4.0' },
      { label: 'Form', value: 'Granular / Liquid' },
    ],
    applications: ['Drinking Water Purification', 'Sewage Treatment', 'Paper Making', 'Sugar Refining'],
    manufacturers: ['GACL'],
    packaging: ['50 kg PP Bags', '1000 kg Jumbo Bags', 'IBC Tanks (liquid)'],
    featured: false,
  },
  {
    id: 'sodium-hypochlorite',
    name: 'Sodium Hypochlorite',
    formula: 'NaOCl',
    cas: '7681-52-9',
    grade: '40-200 gpl Available Chlorine',
    category: 'water-treatment',
    description: 'Liquid sodium hypochlorite for water disinfection, bleaching, and sanitation. Multiple concentrations for municipal and industrial use.',
    specs: [
      { label: 'Available Chlorine', value: '40-200 g/L' },
      { label: 'NaOH (free)', value: '0.5-1.5%' },
      { label: 'Appearance', value: 'Clear pale yellow liquid' },
    ],
    applications: ['Water Disinfection', 'Bleaching', 'Sanitation & Hygiene', 'Food Industry CIP', 'Swimming Pools'],
    manufacturers: ['GACL'],
    packaging: ['30 kg HDPE Carboys', '250 kg HDPE Drums', 'Tanker Load'],
    featured: false,
  },
  {
    id: 'stable-bleaching-powder',
    name: 'Stable Bleaching Powder',
    formula: 'CaOCl₂',
    cas: '7778-54-3',
    grade: '34% Available Cl₂ Min',
    category: 'water-treatment',
    description: 'Calcium hypochlorite-based bleaching powder for water disinfection, textile bleaching, and sanitation. Stable chlorine content during transport.',
    specs: [
      { label: 'Available Chlorine', value: '34% min' },
      { label: 'Moisture', value: '3% max' },
      { label: 'Appearance', value: 'White to off-white powder' },
    ],
    applications: ['Water Disinfection', 'Textile Bleaching', 'Sanitation', 'Swimming Pools'],
    manufacturers: ['GACL', 'Kutch Chemical'],
    packaging: ['25 kg HDPE Bags', '50 kg HDPE Bags'],
    featured: false,
  },
  {
    id: 'tcca',
    name: 'TCCA - Trichloroisocyanuric Acid',
    formula: 'C₃Cl₃N₃O₃',
    cas: '87-90-1',
    grade: '90% Min Active Chlorine',
    category: 'water-treatment',
    description: 'Slow-release TCCA tablets/granules for swimming pool disinfection and water system treatment. Stable, long-lasting chlorine release.',
    specs: [
      { label: 'Active Chlorine', value: '90% min' },
      { label: 'Moisture', value: '0.5% max' },
      { label: 'pH (1% sol.)', value: '2.7-3.3' },
      { label: 'Form', value: 'Tablets (200g, 500g) · Granules · Powder' },
    ],
    applications: ['Swimming Pool Disinfection', 'Drinking Water Treatment', 'Industrial Water Systems'],
    manufacturers: ['Kutch Chemical'],
    packaging: ['25 kg HDPE Drums', '50 kg Fiber Drums'],
    featured: false,
  },
  {
    id: 'calcium-hypochlorite',
    name: 'Calcium Hypochlorite',
    formula: 'Ca(OCl)₂',
    cas: '7778-54-3',
    grade: '65-70% Active Cl₂',
    category: 'water-treatment',
    description: 'High-content granular calcium hypochlorite for water purification, food sanitation, and industrial bleaching.',
    specs: [
      { label: 'Active Chlorine', value: '65-70%' },
      { label: 'Moisture', value: '5.5% max' },
      { label: 'Form', value: 'Granular / Tablet' },
    ],
    applications: ['Drinking Water Disinfection', 'Swimming Pools', 'Food Industry Sanitation', 'Industrial Bleaching'],
    manufacturers: ['GACL'],
    packaging: ['25 kg Drums', '45 kg Drums'],
    featured: false,
  },
  {
    id: 'sodium-chlorate',
    name: 'Sodium Chlorate',
    formula: 'NaClO₃',
    cas: '7775-09-9',
    grade: '99% Min',
    category: 'water-treatment',
    description: 'Sodium chlorate for herbicide production, pulp & paper bleaching (ClO₂ generation), and chemical synthesis.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Moisture', value: '0.1% max' },
      { label: 'NaCl', value: '0.3% max' },
    ],
    applications: ['ClO₂ Generation for Pulp Bleaching', 'Herbicide Production', 'Chemical Synthesis'],
    manufacturers: ['GACL'],
    packaging: ['50 kg HDPE Bags', '1000 kg Jumbo Bags'],
    featured: false,
  },

  // ══ SPECIALTY ══════════════════════════════════════════════
  {
    id: 'smbs',
    name: 'SMBS - Sodium Metabisulphite',
    formula: 'Na₂S₂O₅',
    cas: '7681-57-4',
    grade: '96.5% Tech / 97% Food Grade',
    category: 'specialty',
    description: 'Critical for gold/silver cyanide leaching destruction, food preservation, and water dechlorination. Key product for East African mining sector.',
    specs: [
      { label: 'Purity (Tech)', value: '96.5% min' },
      { label: 'Purity (Food)', value: '97% min' },
      { label: 'SO₂ Content', value: '64% min' },
      { label: 'Fe', value: '10 ppm max' },
    ],
    applications: ['Gold/Silver Cyanide Destruction', 'Food Preservation', 'Water Dechlorination', 'Wine Industry', 'Photography'],
    manufacturers: ['GACL', 'Kutch Chemical'],
    packaging: ['25 kg Bags', '50 kg Bags', 'Bulk Big Bags'],
    featured: true,
  },
  {
    id: 'sodium-sulphite',
    name: 'Sodium Sulphite',
    formula: 'Na₂SO₃',
    cas: '7757-83-7',
    grade: '96% Min · Anhydrous',
    category: 'specialty',
    description: 'Sodium sulphite as oxygen scavenger, photographic developer, and food preservative. Used in paper making and water treatment.',
    specs: [
      { label: 'Purity', value: '96% min' },
      { label: 'Fe', value: '20 ppm max' },
      { label: 'Chloride (as NaCl)', value: '0.5% max' },
      { label: 'Moisture', value: '1% max' },
    ],
    applications: ['Boiler Water O₂ Scavenger', 'Photographic Developer', 'Paper Making', 'Food Preservation (E221)'],
    manufacturers: ['GACL', 'Kutch Chemical'],
    packaging: ['25 kg HDPE Bags', '50 kg HDPE Bags'],
    featured: false,
  },
  {
    id: 'hydrogen-peroxide',
    name: 'Hydrogen Peroxide',
    formula: 'H₂O₂',
    cas: '7722-84-1',
    grade: '35% / 50% / 60% · Industrial',
    category: 'specialty',
    description: 'Industrial hydrogen peroxide for textile bleaching, paper pulp, wastewater treatment, and electronics. UN-certified HDPE or SS tankers.',
    specs: [
      { label: 'Concentration', value: '35% · 50% · 60%' },
      { label: 'Stability', value: '96% min (24h at 100°C)' },
      { label: 'Non-volatile Residue', value: '0.05 g/100mL max' },
      { label: 'Acidity (H₂SO₄)', value: '0.04% max' },
    ],
    applications: ['Textile Bleaching', 'Paper & Pulp', 'Wastewater Treatment', 'Food Processing', 'Electronics'],
    manufacturers: ['Reliance'],
    packaging: ['35 kg HDPE Carboys', '230 kg HDPE Drums', 'SS Tankers'],
    featured: true,
  },
  {
    id: 'hydrazine-hydrate',
    name: 'Hydrazine Hydrate',
    formula: 'N₂H₄·H₂O',
    cas: '7803-57-8',
    grade: '80% Min',
    category: 'specialty',
    description: 'Hydrazine hydrate as boiler water oxygen scavenger, pharmaceutical synthesis reagent, and blowing agent precursor.',
    specs: [
      { label: 'Purity', value: '80% min' },
      { label: 'Specific Gravity', value: '1.03-1.04' },
      { label: 'UN Number', value: 'UN 2030' },
    ],
    applications: ['Boiler Water Treatment', 'Pharmaceutical Synthesis', 'Agrochemical Production', 'Blowing Agents'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg HDPE Barrels', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'chlorinated-paraffin',
    name: 'Chlorinated Paraffin',
    formula: 'CP-52 / CP-60',
    cas: '63449-39-8',
    grade: 'CP-50/52 · CP-60',
    category: 'specialty',
    description: 'Chlorinated paraffin as flame retardant and secondary PVC plasticizer. Reduces flammability in rubber, PVC, and sealant applications.',
    specs: [
      { label: 'Cl Content (CP-52)', value: '50-52%' },
      { label: 'Cl Content (CP-60)', value: '60-62%' },
      { label: 'Viscosity (CP-52)', value: '1500-3000 mPa·s' },
      { label: 'Colour (Gardner)', value: '≤ 6' },
    ],
    applications: ['Flame Retardant', 'PVC Plasticizer', 'Metalworking Lubricant', 'Rubber Industry'],
    manufacturers: ['DCM Shriram'],
    packaging: ['250 kg UN Barrels', 'IBC Tanks (1000 kg)'],
    featured: false,
  },
  {
    id: 'epichlorohydrin',
    name: 'Epichlorohydrin (ECH)',
    formula: 'C₃H₅ClO',
    cas: '106-89-8',
    grade: '99.5% Min',
    category: 'specialty',
    description: 'Epichlorohydrin (ECH) - key raw material for epoxy resin synthesis, water treatment resins, and elastomers. Sourced from Aditya Birla.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Water', value: '0.03% max' },
      { label: 'Boiling Point', value: '116-117°C' },
      { label: 'UN Number', value: 'UN 2023' },
    ],
    applications: ['Epoxy Resin Raw Material', 'Water Treatment Resins', 'Elastomers', 'Pharmaceutical Intermediates'],
    manufacturers: ['Grasim'],
    packaging: ['200 kg Steel Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'epoxy-resin',
    name: 'Epoxy Resin',
    formula: 'DGEBA',
    cas: '25068-38-6',
    grade: 'Liquid · Solid · Various EEW',
    category: 'specialty',
    description: 'Bisphenol-A epoxy resins in liquid and solid grades for coatings, adhesives, composites, and electrical laminates. Aditya Birla make.',
    specs: [
      { label: 'EEW (Liquid)', value: '182-194 g/eq' },
      { label: 'EEW (Solid)', value: '450-900+ g/eq' },
      { label: 'Viscosity (Liquid @ 25°C)', value: '11,000-14,000 mPa·s' },
      { label: 'Hydrolysable Cl', value: '< 200 ppm' },
    ],
    applications: ['Industrial Coatings', 'Adhesives', 'Electrical Laminates', 'Composites', 'Civil Engineering'],
    manufacturers: ['Grasim'],
    packaging: ['25 kg Tins', '200 kg Drums', 'IBC Tanks'],
    featured: false,
  },
  {
    id: 'beta-naphthol',
    name: 'Beta Naphthol',
    formula: 'C₁₀H₇OH',
    cas: '135-19-3',
    grade: '99% Min',
    category: 'specialty',
    description: 'Beta Naphthol for azo dye synthesis and rubber antioxidants. Key intermediate for textile dye industry.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Melting Point', value: '121-123°C' },
      { label: 'Moisture', value: '0.5% max' },
    ],
    applications: ['Azo Dye Synthesis', 'Rubber Antioxidants', 'Pharmaceutical Intermediates', 'Fungicide'],
    manufacturers: ['Kutch Chemical'],
    packaging: ['25 kg Paper/PE Bags', '50 kg Fiber Drums'],
    featured: false,
  },

  // ══ SOLVENTS & CHLORINATED ══════════════════════════════════
  {
    id: 'chloroform',
    name: 'Chloroform',
    formula: 'CHCl₃',
    cas: '67-66-3',
    grade: '99.9% Min · Industrial',
    category: 'solvents',
    description: 'Industrial chloroform for pharmaceutical synthesis, refrigerant (R-22) feedstock, and solvent extraction. GACL / DCM Shriram origin.',
    specs: [
      { label: 'Purity', value: '99.9% min' },
      { label: 'Water', value: '0.01% max' },
      { label: 'Acidity (as HCl)', value: '0.001% max' },
    ],
    applications: ['Pharmaceutical Synthesis', 'Refrigerant R-22 Production', 'Chemical Solvent', 'Extraction'],
    manufacturers: ['DCM Shriram', 'GACL'],
    packaging: ['250 kg GI Barrels', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'methylene-chloride',
    name: 'Methylene Chloride (DCM)',
    formula: 'CH₂Cl₂',
    cas: '75-09-2',
    grade: '99.9% Min',
    category: 'solvents',
    description: 'Dichloromethane for paint stripping, pharmaceutical manufacturing, foam blowing, and solvent extraction.',
    specs: [
      { label: 'Purity', value: '99.9% min' },
      { label: 'Water', value: '0.02% max' },
      { label: 'Residue on evaporation', value: '0.001% max' },
    ],
    applications: ['Paint & Coating Removal', 'Pharmaceutical Production', 'PU Foam Blowing', 'Adhesives'],
    manufacturers: ['DCM Shriram'],
    packaging: ['250 kg Zinc-coated GI Barrels', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'carbon-tetrachloride',
    name: 'Carbon Tetrachloride',
    formula: 'CCl₄',
    cas: '56-23-5',
    grade: '99.9% Min',
    category: 'solvents',
    description: 'Carbon tetrachloride for chemical synthesis and specialty solvent applications.',
    specs: [
      { label: 'Purity', value: '99.9% min' },
      { label: 'Water', value: '0.01% max' },
    ],
    applications: ['Chemical Synthesis', 'Specialty Solvent', 'CFC Production', 'Metal Degreasing'],
    manufacturers: ['DCM Shriram'],
    packaging: ['200 kg Steel Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'trichloroethylene',
    name: 'Trichloroethylene (TCE)',
    formula: 'C₂HCl₃',
    cas: '79-01-6',
    grade: '99.5% Min',
    category: 'solvents',
    description: 'TCE for metal cleaning/degreasing, HFC refrigerant production, and chemical synthesis.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Boiling Point', value: '86-88°C' },
      { label: 'UN Number', value: 'UN 1710' },
    ],
    applications: ['Metal Degreasing', 'HFC-134a Production', 'Chemical Synthesis'],
    manufacturers: ['GACL'],
    packaging: ['250 kg Steel Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'perchloroethylene',
    name: 'Perchloroethylene (PCE)',
    formula: 'C₂Cl₄',
    cas: '127-18-4',
    grade: '99.5% Min',
    category: 'solvents',
    description: 'Perchloroethylene (tetrachloroethylene) for dry cleaning, metal degreasing, and textile scouring.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Boiling Point', value: '120-122°C' },
      { label: 'UN Number', value: 'UN 1897' },
    ],
    applications: ['Dry Cleaning', 'Metal Degreasing', 'Textile Scouring', 'Chemical Intermediate'],
    manufacturers: ['GACL'],
    packaging: ['250 kg Steel Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'ethylene-dichloride',
    name: 'Ethylene Dichloride (EDC)',
    formula: 'C₂H₄Cl₂',
    cas: '107-06-2',
    grade: '99.8% Min',
    category: 'solvents',
    description: 'EDC (1,2-Dichloroethane) as primary feedstock for VCM/PVC production and as industrial solvent.',
    specs: [
      { label: 'Purity', value: '99.8% min' },
      { label: 'Water', value: '0.01% max' },
      { label: 'UN Number', value: 'UN 1184' },
    ],
    applications: ['VCM / PVC Feedstock', 'Industrial Solvent', 'Chemical Synthesis'],
    manufacturers: ['GACL'],
    packaging: ['200 kg Steel Drums', 'ISO Tanks', 'Flexi Tanks'],
    featured: false,
  },
  {
    id: 'ethyl-acetate',
    name: 'Ethyl Acetate',
    formula: 'C₄H₈O₂',
    cas: '141-78-6',
    grade: '99.5% Min',
    category: 'solvents',
    description: 'High-purity ethyl acetate for pharmaceutical, food flavouring, coatings, adhesives, and extraction.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Water', value: '0.05% max' },
      { label: 'Acidity (as AcOH)', value: '0.005% max' },
    ],
    applications: ['Pharmaceutical Solvent', 'Food Flavouring', 'Coatings & Paints', 'Adhesives'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg MS Drums', 'ISO Tanks', 'IBC Tanks'],
    featured: false,
  },
  {
    id: 'hexane',
    name: 'Hexane',
    formula: 'C₆H₁₄',
    cas: '110-54-3',
    grade: '95% Min · Extraction Grade',
    category: 'solvents',
    description: 'Technical hexane for edible oil extraction, pharmaceutical solvent, and adhesive formulations.',
    specs: [
      { label: 'n-Hexane Content', value: '≥ 55% (extraction grade)' },
      { label: 'Boiling Range', value: '63-69°C' },
      { label: 'Bromine Index', value: '< 200' },
    ],
    applications: ['Edible Oil Extraction', 'Pharmaceutical Solvent', 'Adhesive Formulations', 'Rubber Cement'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg MS Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'toluene',
    name: 'Toluene',
    formula: 'C₇H₈',
    cas: '108-88-3',
    grade: '99.5% Min',
    category: 'solvents',
    description: 'Industrial toluene for paint thinners, adhesives, rubber, pharmaceutical, and TDI feedstock.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Benzene', value: '0.1% max' },
      { label: 'Boiling Point', value: '110-111°C' },
    ],
    applications: ['Paint Thinner', 'Adhesive Solvent', 'TDI Feedstock', 'Pharmaceutical Synthesis'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg MS Drums', 'ISO Tanks', 'Flexi Tanks'],
    featured: false,
  },
  {
    id: 'methanol',
    name: 'Methanol',
    formula: 'CH₃OH',
    cas: '67-56-1',
    grade: '99.85% Min · Industrial',
    category: 'solvents',
    description: 'Industrial methanol for biodiesel production, formaldehyde feedstock, and chemical synthesis.',
    specs: [
      { label: 'Purity', value: '99.85% min' },
      { label: 'Water', value: '0.1% max' },
      { label: 'Acetone', value: '30 ppm max' },
    ],
    applications: ['Biodiesel Production', 'Formaldehyde Feedstock', 'Solvent', 'MTBE Production'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg MS Drums', 'ISO Tanks', 'Flexi Tanks'],
    featured: false,
  },
  {
    id: 'acetone',
    name: 'Acetone',
    formula: 'C₃H₆O',
    cas: '67-64-1',
    grade: '99.5% Min',
    category: 'solvents',
    description: 'Industrial acetone for pharmaceutical, cosmetics, coatings, and adhesive applications.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'Water', value: '0.1% max' },
      { label: 'Aldehyde (as CH₂O)', value: '10 ppm max' },
    ],
    applications: ['Pharmaceutical Solvent', 'Nail Polish Remover', 'Coatings', 'Adhesives', 'Resin Production'],
    manufacturers: ['Reliance'],
    packaging: ['200 kg MS Drums', 'ISO Tanks'],
    featured: false,
  },
  {
    id: 'ethylene-glycol',
    name: 'Ethylene Glycol (MEG)',
    formula: 'C₂H₆O₂',
    cas: '107-21-1',
    grade: '99.9% Min · Industrial',
    category: 'solvents',
    description: 'Monoethylene glycol for polyester (PET/PEF) fibre, antifreeze formulations, and heat transfer fluids.',
    specs: [
      { label: 'Purity', value: '99.9% min' },
      { label: 'Water', value: '0.03% max' },
      { label: 'Colour (APHA)', value: '5 max' },
    ],
    applications: ['PET Polyester Fibre', 'Antifreeze', 'Heat Transfer Fluid', 'Polyurethane Production'],
    manufacturers: ['Reliance'],
    packaging: ['220 kg HDPE Drums', 'IBC Tanks', 'ISO Tanks'],
    featured: false,
  },

  // ══ INORGANIC SALTS ═══════════════════════════════════════
  {
    id: 'sodium-sulphate',
    name: 'Sodium Sulphate Anhydrous',
    formula: 'Na₂SO₄',
    cas: '7757-82-6',
    grade: '99% Min · Anhydrous',
    category: 'inorganic-salts',
    description: 'Anhydrous sodium sulphate for detergent manufacturing, glass production, textile dyeing, and kraft paper.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Moisture', value: '0.5% max' },
      { label: 'NaCl', value: '0.3% max' },
      { label: 'Fe', value: '5 ppm max' },
    ],
    applications: ['Detergent Manufacturing', 'Glass Production', 'Textile Dyeing', 'Kraft Paper'],
    manufacturers: ['GHCL'],
    packaging: ['50 kg HDPE Bags', '1000 kg Jumbo Bags'],
    featured: false,
  },
  {
    id: 'sodium-bicarbonate',
    name: 'Sodium Bicarbonate',
    formula: 'NaHCO₃',
    cas: '144-55-8',
    grade: '99.5% Min · Food Grade',
    category: 'inorganic-salts',
    description: 'Food-grade sodium bicarbonate for food leavening, pharmaceutical antacid, fire extinguishers, and pH control.',
    specs: [
      { label: 'Purity', value: '99.5% min' },
      { label: 'As', value: '1 ppm max' },
      { label: 'Heavy Metals', value: '5 ppm max' },
      { label: 'Loss on Drying', value: '0.2% max' },
    ],
    applications: ['Food Leavening Agent', 'Pharmaceutical Antacid', 'Fire Extinguisher', 'Water Treatment', 'Animal Feed'],
    manufacturers: ['GHCL', 'DCM Shriram'],
    packaging: ['25 kg Bags', '50 kg Bags'],
    featured: false,
  },
  {
    id: 'potassium-carbonate',
    name: 'Potassium Carbonate',
    formula: 'K₂CO₃',
    cas: '584-08-7',
    grade: '99% Min · Powder + Granules',
    category: 'inorganic-salts',
    description: 'Potassium carbonate for glass manufacturing, soap production, and agrochemical synthesis.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Chloride (Cl⁻)', value: '0.005% max' },
      { label: 'Moisture', value: '0.5% max' },
    ],
    applications: ['Glass Manufacturing', 'Soap & Detergent', 'Food Processing', 'Agrochemicals'],
    manufacturers: ['DCM Shriram'],
    packaging: ['25 kg HDPE Bags', '50 kg HDPE Bags'],
    featured: false,
  },
  {
    id: 'sodium-acetate',
    name: 'Sodium Acetate',
    formula: 'CH₃COONa',
    cas: '127-09-3',
    grade: '99% Min · Anhydrous + Trihydrate',
    category: 'inorganic-salts',
    description: 'Sodium acetate as food preservative (E262), textile dye mordant, and pharmaceutical buffer.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Form', value: 'Anhydrous / Trihydrate' },
      { label: 'Heavy Metals', value: '10 ppm max' },
    ],
    applications: ['Food Preservative (E262)', 'Textile Dyeing', 'Pharmaceutical Buffer', 'Heat Packs'],
    manufacturers: ['DCM Shriram'],
    packaging: ['25 kg Bags', '50 kg Bags'],
    featured: false,
  },
  {
    id: 'aluminium-chloride',
    name: 'Anhydrous Aluminium Chloride',
    formula: 'AlCl₃',
    cas: '7446-70-0',
    grade: '99% Min · Anhydrous',
    category: 'inorganic-salts',
    description: 'Anhydrous AlCl₃ for Friedel-Crafts reactions, dye synthesis, and pharmaceutical intermediates. Nitrogen-blanketed vacuum packs.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Fe', value: '0.1% max' },
      { label: 'Water (KF)', value: '0.1% max' },
    ],
    applications: ['Friedel-Crafts Reactions', 'Dye Synthesis', 'Pharmaceutical Intermediates', 'Petroleum Cracking'],
    manufacturers: ['GACL'],
    packaging: ['25 kg N₂-blanketed Vacuum Packs', '250 kg MS Drums'],
    featured: false,
  },
  {
    id: 'sodium-nitrate',
    name: 'Sodium Nitrate',
    formula: 'NaNO₃',
    cas: '7631-99-4',
    grade: '99% Min · Industrial',
    category: 'inorganic-salts',
    description: 'Sodium nitrate as fertilizer, food curing salt (E251), glass flux, and heat transfer fluid.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'NaCl', value: '0.3% max' },
      { label: 'Moisture', value: '0.5% max' },
    ],
    applications: ['Fertilizer', 'Food Preservation (E251)', 'Glass Manufacturing', 'Heat Transfer Fluid'],
    manufacturers: ['DCM Shriram'],
    packaging: ['50 kg PP Bags', '1000 kg Jumbo Bags'],
    featured: false,
  },
  {
    id: 'calcium-chloride',
    name: 'Calcium Chloride',
    formula: 'CaCl₂',
    cas: '10043-52-4',
    grade: '94-97% Flakes · Industrial / Oilfield / Food',
    category: 'inorganic-salts',
    description: 'Calcium chloride flakes for oilfield drilling fluids, dust control, concrete acceleration, and food processing. High demand from GCC oilfield operators.',
    specs: [
      { label: 'Purity (Flakes)', value: '94-97%' },
      { label: 'NaCl', value: '2% max' },
      { label: 'MgCl₂', value: '0.5% max' },
      { label: 'Form', value: 'Flakes / Pellets / Powder' },
    ],
    applications: ['Oilfield Drilling Fluids', 'Dust Suppression', 'Concrete Acceleration', 'Refrigeration Brine', 'Food Processing'],
    manufacturers: ['Kutch Chemical', 'GHCL'],
    packaging: ['25 kg HDPE Bags', '50 kg HDPE Bags', '1000 kg Jumbo Bags'],
    featured: true,
  },

  // ══ AGRO / FERTILIZER ═══════════════════════════════════
  {
    id: 'sulphur',
    name: 'Sulphur',
    formula: 'S',
    cas: '7704-34-9',
    grade: '99% Min · Powder / Granules / WDG',
    category: 'agro',
    description: 'Agricultural and industrial sulphur in powder, granule, and WDG form for fertilizer, rubber vulcanization, and fungicide.',
    specs: [
      { label: 'Purity', value: '99% min' },
      { label: 'Moisture', value: '0.5% max' },
      { label: 'Ash', value: '0.05% max' },
    ],
    applications: ['Fertilizer (Sulphur Bentonite)', 'Rubber Vulcanization', 'Fungicide', 'Paper Manufacturing'],
    manufacturers: ['Reliance', 'GACL'],
    packaging: ['50 kg PP Bags', '1000 kg Jumbo Bags', 'Bulk'],
    featured: false,
  },

  // ══ EXTENDED CATALOG ══════════════════════════════════════
  // Acids
  { id: 'acetic-acid', name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', cas: '64-19-7', grade: '99.85% Min · Glacial', category: 'acids', description: 'Glacial acetic acid for textiles, PTA, food acidulant, pharmaceuticals, and ester/solvent manufacture.', specs: [{ label: 'Purity', value: '99.85% min' }, { label: 'Water', value: '0.15% max' }, { label: 'Appearance', value: 'Clear colourless liquid' }], applications: ['Textile Processing', 'PTA / PET', 'Food Acidulant', 'Pharmaceutical', 'Ester Manufacture'], manufacturers: ['Indian Manufacturers'], packaging: ['30 kg Carboys', '200 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'formic-acid', name: 'Formic Acid', formula: 'CH₂O₂', cas: '64-18-6', grade: '85% / 90% Min', category: 'acids', description: 'Formic acid for leather tanning, rubber coagulation, textile dyeing, and animal feed preservation.', specs: [{ label: 'Concentration', value: '85% / 90%' }, { label: 'Chloride', value: '5 ppm max' }, { label: 'Sulphate', value: '5 ppm max' }], applications: ['Leather Tanning', 'Rubber Coagulation', 'Textile Dyeing', 'Feed Preservative'], manufacturers: ['Indian Manufacturers'], packaging: ['35 kg Carboys', '250 kg Drums'], featured: false },
  { id: 'citric-acid', name: 'Citric Acid', formula: 'C₆H₈O₇', cas: '77-92-9', grade: 'Anhydrous / Monohydrate · Food', category: 'acids', description: 'Food-grade citric acid for beverages, food preservation, detergents, and pharmaceutical formulations.', specs: [{ label: 'Purity', value: '99.5% min' }, { label: 'Heavy Metals', value: '10 ppm max' }, { label: 'Form', value: 'Anhydrous / Monohydrate' }], applications: ['Beverages', 'Food Preservation', 'Detergents', 'Pharmaceuticals', 'Cosmetics'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'nitric-acid', name: 'Nitric Acid', formula: 'HNO₃', cas: '7697-37-2', grade: '60% / 68% · Industrial', category: 'acids', description: 'Nitric acid for fertilizers, explosives, metal pickling, and nitration in chemical synthesis.', specs: [{ label: 'Concentration', value: '60% / 68%' }, { label: 'Appearance', value: 'Colourless to pale yellow' }, { label: 'UN Number', value: 'UN 2031' }], applications: ['Fertilizer (CAN/AN)', 'Metal Pickling', 'Nitration', 'Explosives'], manufacturers: ['Deepak Fertilisers', 'GNFC'], packaging: ['250 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'oxalic-acid', name: 'Oxalic Acid', formula: 'C₂H₂O₄', cas: '144-62-7', grade: '99.6% Min', category: 'acids', description: 'Oxalic acid for metal cleaning, marble polishing, textile and leather processing, and rare-earth refining.', specs: [{ label: 'Purity', value: '99.6% min' }, { label: 'Ash', value: '0.05% max' }, { label: 'Heavy Metals', value: '10 ppm max' }], applications: ['Metal & Rust Cleaning', 'Marble Polishing', 'Textile Bleaching', 'Leather'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'stearic-acid', name: 'Stearic Acid', formula: 'C₁₈H₃₆O₂', cas: '57-11-4', grade: 'Single / Double / Triple Pressed', category: 'acids', description: 'Stearic acid for rubber, candles, cosmetics, PVC stabilizers, and lubricants.', specs: [{ label: 'Acid Value', value: '200-212' }, { label: 'Iodine Value', value: '0.5 max (TP)' }, { label: 'Form', value: 'Flakes / Beads' }], applications: ['Rubber Processing', 'Candles', 'Cosmetics', 'PVC Stabilizers', 'Lubricants'], manufacturers: ['Godrej', 'Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'boric-acid', name: 'Boric Acid', formula: 'H₃BO₃', cas: '10043-35-3', grade: '99.9% Min', category: 'acids', description: 'Boric acid for glass & ceramics, flame retardants, fertilizers, and antiseptic applications.', specs: [{ label: 'H₃BO₃', value: '99.9% min' }, { label: 'Sulphate', value: '0.1% max' }, { label: 'Form', value: 'Powder / Granular' }], applications: ['Glass & Ceramics', 'Flame Retardant', 'Micronutrient Fertilizer', 'Antiseptic'], manufacturers: ['Imported'], packaging: ['25 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'lactic-acid', name: 'Lactic Acid', formula: 'C₃H₆O₃', cas: '50-21-5', grade: '80% / 88% · Food/Tech', category: 'acids', description: 'Lactic acid for food, beverages, pharmaceuticals, leather, and biodegradable plastics (PLA).', specs: [{ label: 'Concentration', value: '80% / 88%' }, { label: 'Form', value: 'Liquid' }, { label: 'Grade', value: 'Food / Technical' }], applications: ['Food & Beverage', 'Pharmaceutical', 'Leather', 'PLA Bioplastics'], manufacturers: ['Imported'], packaging: ['25 kg Carboys', '250 kg Drums'], featured: false },

  // Chlor-alkali / basics
  { id: 'sodium-silicate', name: 'Sodium Silicate (Water Glass)', formula: 'Na₂SiO₃', cas: '1344-09-8', grade: 'Liquid & Solid · Various Ratios', category: 'chlor-alkali', description: 'Sodium silicate for detergents, adhesives, foundry binders, water treatment, and paper.', specs: [{ label: 'SiO₂:Na₂O Ratio', value: '2.0-3.3' }, { label: 'Solids', value: '36-48%' }, { label: 'Form', value: 'Liquid / Solid Lumps' }], applications: ['Detergents', 'Adhesives & Binders', 'Foundry', 'Water Treatment', 'Paper'], manufacturers: ['Indian Manufacturers'], packaging: ['300 kg Drums', 'Road Tankers', '50 kg Bags (solid)'], featured: false },
  { id: 'quick-lime', name: 'Quick Lime (Calcium Oxide)', formula: 'CaO', cas: '1305-78-8', grade: '90% Min', category: 'minerals', description: 'Quick lime for steel, sugar, water treatment, construction, and chemical manufacture.', specs: [{ label: 'CaO', value: '90% min' }, { label: 'Form', value: 'Lumps / Powder' }, { label: 'Reactivity', value: 'High' }], applications: ['Steel Flux', 'Sugar Refining', 'Water Treatment', 'Construction'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'hydrated-lime', name: 'Hydrated Lime', formula: 'Ca(OH)₂', cas: '1305-62-0', grade: '90% Min', category: 'minerals', description: 'Hydrated (slaked) lime for water/effluent treatment, construction, soil stabilization, and flue-gas treatment.', specs: [{ label: 'Ca(OH)₂', value: '90% min' }, { label: 'Form', value: 'Fine Powder' }, { label: 'Fineness', value: '90% < 90 µm' }], applications: ['Water & Effluent Treatment', 'Construction', 'Soil Stabilization', 'Flue-Gas Desulphurization'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags', 'Jumbo Bags'], featured: false },

  // Water treatment
  { id: 'ferric-chloride', name: 'Ferric Chloride', formula: 'FeCl₃', cas: '7705-08-0', grade: '40% Liquid / 96% Anhydrous', category: 'water-treatment', description: 'Ferric chloride coagulant for drinking water, sewage and industrial effluent, plus PCB etching.', specs: [{ label: 'FeCl₃ (Liquid)', value: '40% min' }, { label: 'FeCl₃ (Anhydrous)', value: '96% min' }, { label: 'Free Acid', value: '0.5% max' }], applications: ['Water & Sewage Treatment', 'Effluent Treatment', 'PCB Etching', 'Sludge Conditioning'], manufacturers: ['Indian Manufacturers'], packaging: ['250 kg Drums', 'IBC Tanks', '25 kg Bags (anhydrous)'], featured: false },
  { id: 'ferrous-sulphate', name: 'Ferrous Sulphate', formula: 'FeSO₄·7H₂O', cas: '7782-63-0', grade: '19% Fe Min', category: 'water-treatment', description: 'Ferrous sulphate for water treatment, micronutrient fertilizer, cement chromate reduction, and pigments.', specs: [{ label: 'Fe', value: '19% min' }, { label: 'FeSO₄·7H₂O', value: '98% min' }, { label: 'Form', value: 'Crystal / Granular' }], applications: ['Water Treatment', 'Micronutrient Fertilizer', 'Cement Additive', 'Pigments'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'copper-sulphate', name: 'Copper Sulphate', formula: 'CuSO₄·5H₂O', cas: '7758-99-8', grade: '98% Min · Pentahydrate', category: 'water-treatment', description: 'Copper sulphate for algaecide, fungicide, animal feed, electroplating, and mining flotation.', specs: [{ label: 'CuSO₄·5H₂O', value: '98% min' }, { label: 'Cu', value: '25% min' }, { label: 'Form', value: 'Crystal / Powder' }], applications: ['Algaecide', 'Fungicide (Bordeaux)', 'Animal Feed', 'Electroplating', 'Froth Flotation'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'potassium-permanganate', name: 'Potassium Permanganate', formula: 'KMnO₄', cas: '7722-64-7', grade: '99% Min', category: 'water-treatment', description: 'Potassium permanganate for water treatment, oxidation, denim washing, and disinfection.', specs: [{ label: 'KMnO₄', value: '99% min' }, { label: 'Form', value: 'Free-flowing crystals' }, { label: 'Insolubles', value: '0.2% max' }], applications: ['Water Treatment', 'Oxidising Agent', 'Denim Washing', 'Disinfection'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Drums'], featured: false },
  { id: 'sodium-thiosulphate', name: 'Sodium Thiosulphate', formula: 'Na₂S₂O₃·5H₂O', cas: '10102-17-7', grade: '99% Min', category: 'water-treatment', description: 'Sodium thiosulphate for dechlorination, photography, gold leaching, and analytical use.', specs: [{ label: 'Purity', value: '99% min' }, { label: 'Form', value: 'Crystal / Pentahydrate' }, { label: 'pH', value: '6.0-8.4' }], applications: ['Dechlorination', 'Photography', 'Gold Leaching', 'Analytical'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'activated-carbon', name: 'Activated Carbon', formula: 'C', cas: '7440-44-0', grade: 'Granular / Powder · Various Iodine', category: 'water-treatment', description: 'Activated carbon for water/air purification, gold recovery, decolourisation, and solvent recovery.', specs: [{ label: 'Iodine Value', value: '500-1100 mg/g' }, { label: 'Form', value: 'Granular / Powdered' }, { label: 'Moisture', value: '5% max' }], applications: ['Water Purification', 'Gold Recovery (CIP/CIL)', 'Decolourisation', 'Air Filtration'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },

  // Specialty
  { id: 'titanium-dioxide', name: 'Titanium Dioxide', formula: 'TiO₂', cas: '13463-67-7', grade: 'Rutile / Anatase', category: 'specialty', description: 'TiO₂ white pigment for paints, plastics, paper, inks, and cosmetics - high opacity and brightness.', specs: [{ label: 'TiO₂', value: '93-98%' }, { label: 'Grade', value: 'Rutile / Anatase' }, { label: 'Brightness', value: 'High' }], applications: ['Paints & Coatings', 'Plastics', 'Paper', 'Inks', 'Cosmetics'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'zinc-oxide', name: 'Zinc Oxide', formula: 'ZnO', cas: '1314-13-2', grade: '99.5% Min', category: 'specialty', description: 'Zinc oxide for rubber vulcanization, ceramics, paints, cosmetics, and animal feed.', specs: [{ label: 'ZnO', value: '99.5% min' }, { label: 'Form', value: 'White Powder' }, { label: 'Surface Area', value: '3-5 m²/g' }], applications: ['Rubber Activator', 'Ceramics & Glaze', 'Cosmetics', 'Animal Feed', 'Paints'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'zinc-sulphate', name: 'Zinc Sulphate', formula: 'ZnSO₄', cas: '7733-02-0', grade: '21% / 33% Zn', category: 'specialty', description: 'Zinc sulphate (hepta/mono) for micronutrient fertilizer, animal feed, and viscose rayon.', specs: [{ label: 'Zn (Hepta)', value: '21% min' }, { label: 'Zn (Mono)', value: '33% min' }, { label: 'Form', value: 'Crystal / Powder' }], applications: ['Micronutrient Fertilizer', 'Animal Feed', 'Viscose Rayon', 'Pigments'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'magnesium-sulphate', name: 'Magnesium Sulphate (Epsom)', formula: 'MgSO₄·7H₂O', cas: '10034-99-8', grade: '99.5% Min', category: 'specialty', description: 'Epsom salt for fertilizers, animal feed, pharmaceuticals, and bath/personal care.', specs: [{ label: 'MgSO₄·7H₂O', value: '99.5% min' }, { label: 'MgO', value: '16% min' }, { label: 'Form', value: 'Crystal' }], applications: ['Fertilizer', 'Animal Feed', 'Pharmaceutical', 'Personal Care'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'magnesium-chloride', name: 'Magnesium Chloride', formula: 'MgCl₂·6H₂O', cas: '7791-18-6', grade: '46-47% Min', category: 'specialty', description: 'Magnesium chloride for dust control, de-icing, tofu coagulant, and textile processing.', specs: [{ label: 'MgCl₂', value: '46-47%' }, { label: 'Form', value: 'Flakes / Pellets' }, { label: 'Insolubles', value: '0.1% max' }], applications: ['Dust Control', 'De-icing', 'Tofu Coagulant', 'Textile'], manufacturers: ['Imported'], packaging: ['25 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'borax', name: 'Borax (Sodium Tetraborate)', formula: 'Na₂B₄O₇·10H₂O', cas: '1303-96-4', grade: 'Decahydrate / Pentahydrate', category: 'specialty', description: 'Borax for glass & ceramics, detergents, metallurgy flux, fertilizers, and wood preservation.', specs: [{ label: 'B₂O₃', value: '36% / 48%' }, { label: 'Form', value: 'Deca / Penta' }, { label: 'Purity', value: '99% min' }], applications: ['Glass & Ceramics', 'Detergents', 'Metallurgy Flux', 'Fertilizer', 'Wood Preservation'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'sodium-lignosulphonate', name: 'Sodium Lignosulphonate', formula: '-', cas: '8061-51-6', grade: 'Powder · Dispersant', category: 'specialty', description: 'Lignosulphonate dispersant for concrete admixtures, dyes, pesticides, and ceramic processing.', specs: [{ label: 'Form', value: 'Brown Powder' }, { label: 'Water Reduction', value: '8-10%' }, { label: 'pH', value: '7-9' }], applications: ['Concrete Admixture', 'Dye Dispersant', 'Pesticide Carrier', 'Ceramics'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['25 kg Bags'], featured: false },
  { id: 'refined-glycerine', name: 'Refined Glycerine', formula: 'C₃H₈O₃', cas: '56-81-5', grade: '99.5% / 99.7% USP', category: 'specialty', description: 'Refined glycerine (USP/technical) for pharmaceuticals, cosmetics, food, tobacco, and polyols.', specs: [{ label: 'Glycerol', value: '99.5% / 99.7%' }, { label: 'Moisture', value: '0.5% max' }, { label: 'Colour (APHA)', value: '10 max' }], applications: ['Pharmaceutical', 'Cosmetics & Personal Care', 'Food', 'Tobacco', 'Polyols'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['250 kg Drums', 'IBC Tanks', 'ISO Tanks'], featured: false },

  // Solvents
  { id: 'isopropyl-alcohol', name: 'Isopropyl Alcohol (IPA)', formula: 'C₃H₈O', cas: '67-63-0', grade: '99.9% Min', category: 'solvents', description: 'IPA for pharmaceuticals, sanitizers, electronics cleaning, coatings, and printing.', specs: [{ label: 'Purity', value: '99.9% min' }, { label: 'Water', value: '0.05% max' }, { label: 'Appearance', value: 'Clear colourless' }], applications: ['Pharmaceutical', 'Sanitizers', 'Electronics Cleaning', 'Coatings', 'Printing'], manufacturers: ['Deepak Phenolics', 'Imported'], packaging: ['160 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'mek', name: 'Methyl Ethyl Ketone (MEK)', formula: 'C₄H₈O', cas: '78-93-3', grade: '99.5% Min', category: 'solvents', description: 'MEK for paints, adhesives, printing inks, synthetic leather, and resins.', specs: [{ label: 'Purity', value: '99.5% min' }, { label: 'Water', value: '0.1% max' }, { label: 'Colour (APHA)', value: '10 max' }], applications: ['Paints & Coatings', 'Adhesives', 'Printing Inks', 'Synthetic Leather'], manufacturers: ['Imported'], packaging: ['165 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'mibk', name: 'Methyl Isobutyl Ketone (MIBK)', formula: 'C₆H₁₂O', cas: '108-10-1', grade: '99.5% Min', category: 'solvents', description: 'MIBK for coatings, rubber chemicals, pharmaceuticals, and metal extraction.', specs: [{ label: 'Purity', value: '99.5% min' }, { label: 'Water', value: '0.05% max' }, { label: 'Colour (APHA)', value: '10 max' }], applications: ['Coatings', 'Rubber Antiozonants', 'Pharmaceutical', 'Metal Extraction'], manufacturers: ['Imported'], packaging: ['160 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'xylene', name: 'Xylene', formula: 'C₈H₁₀', cas: '1330-20-7', grade: '98.5% Min', category: 'solvents', description: 'Xylene (mixed) for paints, thinners, printing inks, rubber, and chemical synthesis.', specs: [{ label: 'Purity', value: '98.5% min' }, { label: 'Distillation', value: '137-143°C' }, { label: 'Colour (APHA)', value: '15 max' }], applications: ['Paints & Thinners', 'Printing Inks', 'Rubber', 'Chemical Synthesis'], manufacturers: ['Reliance', 'Indian Manufacturers'], packaging: ['180 kg Drums', 'ISO Tanks', 'Flexi Tanks'], featured: false },
  { id: 'n-butanol', name: 'n-Butanol', formula: 'C₄H₁₀O', cas: '71-36-3', grade: '99.5% Min', category: 'solvents', description: 'n-Butanol for plasticizers, acrylate esters, coatings, and as a solvent.', specs: [{ label: 'Purity', value: '99.5% min' }, { label: 'Water', value: '0.1% max' }, { label: 'Acidity', value: '0.005% max' }], applications: ['Plasticizers', 'Acrylate Esters', 'Coatings', 'Solvent'], manufacturers: ['Imported'], packaging: ['165 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'propylene-glycol', name: 'Propylene Glycol (MPG)', formula: 'C₃H₈O₂', cas: '57-55-6', grade: 'USP / Industrial', category: 'solvents', description: 'Propylene glycol for unsaturated polyester resins, antifreeze, food, pharma, and cosmetics.', specs: [{ label: 'Purity', value: '99.5% min' }, { label: 'Water', value: '0.1% max' }, { label: 'Grade', value: 'USP / Industrial' }], applications: ['UPR Resins', 'Antifreeze', 'Food & Pharma', 'Cosmetics'], manufacturers: ['Imported'], packaging: ['215 kg Drums', 'IBC Tanks', 'ISO Tanks'], featured: false },
  { id: 'diethylene-glycol', name: 'Diethylene Glycol (DEG)', formula: 'C₄H₁₀O₃', cas: '111-46-6', grade: '99.9% Min', category: 'solvents', description: 'DEG for unsaturated polyester resins, plasticizers, gas dehydration, and brake fluids.', specs: [{ label: 'Purity', value: '99.9% min' }, { label: 'Water', value: '0.1% max' }, { label: 'Colour (APHA)', value: '5 max' }], applications: ['UPR Resins', 'Plasticizers', 'Gas Dehydration', 'Brake Fluids'], manufacturers: ['Reliance', 'Imported'], packaging: ['230 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'mono-ethanolamine', name: 'Mono Ethanolamine (MEA)', formula: 'C₂H₇NO', cas: '141-43-5', grade: '99% Min', category: 'solvents', description: 'MEA for gas treating, detergents, metalworking fluids, and corrosion inhibitors.', specs: [{ label: 'Purity', value: '99% min' }, { label: 'Water', value: '0.5% max' }, { label: 'Colour (APHA)', value: '15 max' }], applications: ['Gas Treating (CO₂/H₂S)', 'Detergents', 'Metalworking Fluids', 'Corrosion Inhibitors'], manufacturers: ['Imported'], packaging: ['200 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'di-ethanolamine', name: 'Di Ethanolamine (DEA)', formula: 'C₄H₁₁NO₂', cas: '111-42-2', grade: '99% Min', category: 'solvents', description: 'DEA for surfactants, gas purification, agrochemicals, and textile chemicals.', specs: [{ label: 'Purity', value: '99% min' }, { label: 'Water', value: '0.5% max' }, { label: 'Form', value: 'Liquid / Crystalline' }], applications: ['Surfactants', 'Gas Purification', 'Agrochemicals', 'Textile'], manufacturers: ['Imported'], packaging: ['230 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'tri-ethanolamine', name: 'Tri Ethanolamine (TEA)', formula: 'C₆H₁₅NO₃', cas: '102-71-6', grade: '85% / 99% Min', category: 'solvents', description: 'TEA for cement grinding aids, cosmetics, surfactants, and metalworking fluids.', specs: [{ label: 'Purity', value: '85% / 99%' }, { label: 'Colour (APHA)', value: '60 max' }, { label: 'Water', value: '0.5% max' }], applications: ['Cement Grinding Aid', 'Cosmetics', 'Surfactants', 'Metalworking Fluids'], manufacturers: ['Imported'], packaging: ['230 kg Drums', 'ISO Tanks'], featured: false },
  { id: 'formaldehyde', name: 'Formaldehyde', formula: 'CH₂O', cas: '50-00-0', grade: '37% / Para', category: 'solvents', description: 'Formaldehyde (formalin) for resins (UF/PF/MF), disinfectants, and chemical synthesis.', specs: [{ label: 'Concentration', value: '37% min' }, { label: 'Methanol', value: '8-12%' }, { label: 'Acidity', value: '0.05% max' }], applications: ['UF/PF/MF Resins', 'Disinfectants', 'Chemical Synthesis', 'Textile'], manufacturers: ['Indian Manufacturers'], packaging: ['230 kg Drums', 'Road Tankers'], featured: false },
  { id: 'ethanol', name: 'Ethanol (Denatured)', formula: 'C₂H₆O', cas: '64-17-5', grade: '99.9% / 96%', category: 'solvents', description: 'Denatured ethanol for sanitizers, pharmaceuticals, cosmetics, printing, and coatings.', specs: [{ label: 'Purity', value: '99.9% / 96%' }, { label: 'Water', value: '0.2% max' }, { label: 'Type', value: 'Denatured / ENA' }], applications: ['Sanitizers', 'Pharmaceutical', 'Cosmetics', 'Printing', 'Coatings'], manufacturers: ['Indian Manufacturers'], packaging: ['160 kg Drums', 'ISO Tanks'], featured: false },

  // Inorganic salts
  { id: 'potassium-nitrate', name: 'Potassium Nitrate', formula: 'KNO₃', cas: '7757-79-1', grade: '99% Min · Tech/Agri', category: 'inorganic-salts', description: 'Potassium nitrate for water-soluble fertilizers, glass, fireworks, and food curing.', specs: [{ label: 'KNO₃', value: '99% min' }, { label: 'N', value: '13.5%' }, { label: 'K₂O', value: '46%' }], applications: ['Water-Soluble Fertilizer', 'Glass Manufacturing', 'Pyrotechnics', 'Food Curing'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'ammonium-chloride', name: 'Ammonium Chloride', formula: 'NH₄Cl', cas: '12125-02-9', grade: '99.5% Min', category: 'inorganic-salts', description: 'Ammonium chloride for dry batteries, soldering flux, fertilizer, and pharmaceuticals.', specs: [{ label: 'NH₄Cl', value: '99.5% min' }, { label: 'Form', value: 'Powder / Granular' }, { label: 'Moisture', value: '0.5% max' }], applications: ['Dry Batteries', 'Soldering Flux', 'Fertilizer', 'Pharmaceutical'], manufacturers: ['Imported / Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'ammonium-sulphate', name: 'Ammonium Sulphate', formula: '(NH₄)₂SO₄', cas: '7783-20-2', grade: '21% N Min', category: 'agro', description: 'Ammonium sulphate nitrogen-sulphur fertilizer, also used in textile and food sectors.', specs: [{ label: 'Nitrogen', value: '21% min' }, { label: 'Sulphur', value: '24% min' }, { label: 'Form', value: 'Crystal / Granular' }], applications: ['Nitrogen-Sulphur Fertilizer', 'Textile', 'Food Additive', 'Water Treatment'], manufacturers: ['GSFC', 'Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'stpp', name: 'Sodium Tripolyphosphate (STPP)', formula: 'Na₅P₃O₁₀', cas: '7758-29-4', grade: '94% Min', category: 'inorganic-salts', description: 'STPP builder for detergents, ceramics, water treatment, and food processing.', specs: [{ label: 'Na₅P₃O₁₀', value: '94% min' }, { label: 'P₂O₅', value: '57% min' }, { label: 'Form', value: 'White Powder' }], applications: ['Detergent Builder', 'Ceramics', 'Water Treatment', 'Food Processing'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'shmp', name: 'Sodium Hexametaphosphate (SHMP)', formula: '(NaPO₃)₆', cas: '10124-56-8', grade: '68% P₂O₅ Min', category: 'inorganic-salts', description: 'SHMP sequestrant for water treatment, detergents, food, and oilfield scale control.', specs: [{ label: 'P₂O₅', value: '68% min' }, { label: 'Form', value: 'Powder / Granular' }, { label: 'pH (1%)', value: '5.8-6.5' }], applications: ['Water Treatment', 'Detergents', 'Food Additive', 'Oilfield Scale Control'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'potassium-chloride', name: 'Potassium Chloride (MOP)', formula: 'KCl', cas: '7447-40-7', grade: '99% / 60% K₂O', category: 'agro', description: 'Muriate of potash (MOP) for fertilizers, plus industrial and food-grade potassium chloride.', specs: [{ label: 'KCl', value: '99% (industrial)' }, { label: 'K₂O', value: '60% (MOP)' }, { label: 'Form', value: 'Crystal / Granular' }], applications: ['Potash Fertilizer', 'Industrial', 'Food Grade', 'Drilling Fluids'], manufacturers: ['Imported'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'calcium-nitrate', name: 'Calcium Nitrate', formula: 'Ca(NO₃)₂', cas: '10124-37-5', grade: '15.5% N Min', category: 'agro', description: 'Calcium nitrate for fertigation, greenhouse crops, concrete accelerator, and wastewater odour control.', specs: [{ label: 'Nitrogen', value: '15.5%' }, { label: 'CaO', value: '26%' }, { label: 'Form', value: 'Granular / Soluble' }], applications: ['Fertigation', 'Greenhouse Crops', 'Concrete Accelerator', 'Odour Control'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },
  { id: 'potassium-sulphate', name: 'Potassium Sulphate (SOP)', formula: 'K₂SO₄', cas: '7778-80-5', grade: '50% K₂O Min', category: 'agro', description: 'Sulphate of potash (SOP) - chloride-free potassium fertilizer for high-value crops.', specs: [{ label: 'K₂O', value: '50% min' }, { label: 'Sulphur', value: '17.5%' }, { label: 'Cl', value: '1.5% max' }], applications: ['Chloride-Free Fertilizer', 'Fruit & Vegetable Crops', 'Fertigation'], manufacturers: ['Imported'], packaging: ['25 kg / 50 kg Bags'], featured: false },

  // Surfactants
  { id: 'labsa', name: 'LABSA (Sulphonic Acid)', formula: 'C₁₈H₃₀O₃S', cas: '27176-87-0', grade: '96% Min', category: 'surfactants', description: 'Linear Alkyl Benzene Sulphonic Acid - the primary anionic surfactant for detergents, dishwash, and cleaners.', specs: [{ label: 'Active Matter', value: '96% min' }, { label: 'Free Oil', value: '2% max' }, { label: 'Colour (5% Klett)', value: '30 max' }], applications: ['Detergent Powder & Liquid', 'Dishwash', 'Hard-Surface Cleaners', 'Textile Auxiliaries'], manufacturers: ['Indian Manufacturers'], packaging: ['225 kg Drums', 'IBC Tanks'], featured: false },
  { id: 'sles', name: 'SLES (Sodium Lauryl Ether Sulphate)', formula: '-', cas: '9004-82-4', grade: '70% / 28% Active', category: 'surfactants', description: 'SLES 2EO - mild anionic surfactant for shampoos, body wash, dishwash, and liquid detergents.', specs: [{ label: 'Active Matter', value: '70% / 28%' }, { label: 'EO', value: '2 mole' }, { label: '1,4-Dioxane', value: 'Low' }], applications: ['Shampoo & Body Wash', 'Dishwash Liquid', 'Liquid Detergents', 'Personal Care'], manufacturers: ['Indian Manufacturers'], packaging: ['230 kg Drums', 'IBC Tanks'], featured: false },
  { id: 'cdea', name: 'Coconut Diethanolamide (CDEA)', formula: '-', cas: '68603-42-9', grade: '85% Min', category: 'surfactants', description: 'CDEA foam booster and viscosity builder for shampoos, dishwash, and liquid cleaners.', specs: [{ label: 'Active Matter', value: '85% min' }, { label: 'Free Amine', value: '8% max' }, { label: 'Form', value: 'Viscous Liquid' }], applications: ['Foam Booster', 'Viscosity Modifier', 'Shampoo', 'Dishwash'], manufacturers: ['Indian Manufacturers'], packaging: ['215 kg Drums'], featured: false },
  { id: 'soap-noodles', name: 'Soap Noodles', formula: '-', cas: '-', grade: '80:20 / 90:10', category: 'surfactants', description: 'Toilet & laundry soap noodles (palm/palm-kernel based) for soap finishing and stamping.', specs: [{ label: 'Blend', value: '80:20 / 90:10' }, { label: 'TFM', value: '78% min' }, { label: 'Moisture', value: '12-14%' }], applications: ['Toilet Soap', 'Laundry Soap', 'Soap Finishing'], manufacturers: ['Imported'], packaging: ['25 kg Bags'], featured: false },

  // Agro
  { id: 'urea', name: 'Urea', formula: 'CH₄N₂O', cas: '57-13-6', grade: '46% N · Prilled/Granular', category: 'agro', description: 'Urea nitrogen fertilizer (46% N), also used in resins, AdBlue/DEF, and animal feed.', specs: [{ label: 'Nitrogen', value: '46% min' }, { label: 'Biuret', value: '1% max' }, { label: 'Form', value: 'Prilled / Granular' }], applications: ['Nitrogen Fertilizer', 'UF Resins', 'AdBlue / DEF', 'Animal Feed'], manufacturers: ['IFFCO', 'Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags', 'Bulk'], featured: false },
  { id: 'dap', name: 'Di-Ammonium Phosphate (DAP)', formula: '(NH₄)₂HPO₄', cas: '7783-28-0', grade: '18-46-0', category: 'agro', description: 'DAP - the leading phosphate fertilizer (18% N, 46% P₂O₅) for broad-acre and horticultural crops.', specs: [{ label: 'Nitrogen', value: '18%' }, { label: 'P₂O₅', value: '46%' }, { label: 'Form', value: 'Granular' }], applications: ['Phosphate Fertilizer', 'Crop Nutrition', 'Soil Conditioning'], manufacturers: ['Coromandel', 'Imported'], packaging: ['50 kg Bags', 'Bulk'], featured: false },
  { id: 'gypsum', name: 'Gypsum (Agricultural/Industrial)', formula: 'CaSO₄·2H₂O', cas: '13397-24-5', grade: 'Agri / Industrial', category: 'minerals', description: 'Gypsum for soil conditioning, cement, plaster, and as a sulphur-calcium source for crops.', specs: [{ label: 'CaSO₄·2H₂O', value: '85% min' }, { label: 'Form', value: 'Powder / Granular' }, { label: 'Moisture', value: '8% max' }], applications: ['Soil Conditioning', 'Cement Retarder', 'Plaster / POP', 'Sulphur-Calcium Source'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', 'Bulk'], featured: false },

  // Minerals
  { id: 'bentonite', name: 'Bentonite', formula: '-', cas: '1302-78-9', grade: 'Drilling / Foundry / API', category: 'minerals', description: 'Sodium/calcium bentonite for drilling fluids, foundry sand, civil engineering, and edible-oil bleaching.', specs: [{ label: 'Viscosity (API)', value: '30 min' }, { label: 'Swelling', value: 'High (Na)' }, { label: 'Moisture', value: '12% max' }], applications: ['Drilling Mud', 'Foundry Sand', 'Civil Engineering', 'Oil Bleaching'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'barite', name: 'Barite (Barytes)', formula: 'BaSO₄', cas: '13462-86-7', grade: '4.2 SG · API Drilling', category: 'minerals', description: 'Barite weighting agent for oil & gas drilling fluids, plus filler for paints, rubber, and plastics.', specs: [{ label: 'Specific Gravity', value: '4.2 min' }, { label: 'BaSO₄', value: '92% min' }, { label: 'Mesh', value: '200 / 325' }], applications: ['Drilling Fluid Weighting', 'Paints Filler', 'Rubber & Plastics', 'Radiation Shielding'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'china-clay', name: 'China Clay (Kaolin)', formula: 'Al₂Si₂O₅(OH)₄', cas: '1332-58-7', grade: 'Coating / Filler', category: 'minerals', description: 'Refined kaolin for paper coating, ceramics, paints, rubber, and fibreglass.', specs: [{ label: 'Brightness', value: '80-88%' }, { label: 'Al₂O₃', value: '37% min' }, { label: 'Form', value: 'Powder' }], applications: ['Paper Coating', 'Ceramics', 'Paints Filler', 'Rubber', 'Fibreglass'], manufacturers: ['Indian Manufacturers'], packaging: ['50 kg Bags', '1000 kg Jumbo Bags'], featured: false },
  { id: 'calcium-carbonate', name: 'Calcium Carbonate (GCC/PCC)', formula: 'CaCO₃', cas: '471-34-1', grade: 'Ground / Precipitated', category: 'minerals', description: 'Calcium carbonate filler for plastics, paints, paper, rubber, and PVC - ground and precipitated grades.', specs: [{ label: 'CaCO₃', value: '98% min' }, { label: 'Whiteness', value: '90%+' }, { label: 'Grade', value: 'GCC / PCC' }], applications: ['Plastics & PVC Filler', 'Paints', 'Paper', 'Rubber', 'Adhesives'], manufacturers: ['Indian Manufacturers'], packaging: ['25 kg / 50 kg Bags'], featured: false },
];

// ─── Categories ───────────────────────────────
export const categories = [
  { id: 'chlor-alkali',    label: 'Chlor-Alkali',    icon: 'Atom',         count: 0 },
  { id: 'acids',           label: 'Acids',           icon: 'Beaker',       count: 0 },
  { id: 'water-treatment', label: 'Water Treatment', icon: 'Droplets',     count: 0 },
  { id: 'specialty',       label: 'Specialty',       icon: 'Sparkles',     count: 0 },
  { id: 'solvents',        label: 'Solvents',        icon: 'FlaskConical', count: 0 },
  { id: 'inorganic-salts', label: 'Inorganic Salts', icon: 'Hexagon',      count: 0 },
  { id: 'surfactants',     label: 'Surfactants',     icon: 'Droplets',     count: 0 },
  { id: 'minerals',        label: 'Minerals',        icon: 'Gem',          count: 0 },
  { id: 'agro',            label: 'Agro',            icon: 'Wheat',        count: 0 },
];

// ─── Industry Data ────────────────────────────
export type IndustryData = {
  id: string;
  name: string;
  icon: string;          // lucide-react icon name
  description: string;
  seoKeywords: string;   // comma-separated, for meta + AEO
  productIds: string[];
  additionalProducts: string[];
  markets: string[];
  /** Pharma sections this sector draws on. The pharma catalogue lives in
   *  lib/pharma.ts and is a separate axis from the industrial `products` array,
   *  so sectors that buy APIs or excipients have to opt in explicitly. */
  pharmaSections?: ('apis' | 'intermediates' | 'ingredients' | 'excipients' | 'others')[];
};

export const industryData: IndustryData[] = [
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    icon: 'Droplets',
    description: 'Municipal water purification, desalination, industrial effluent, and sewage treatment chemicals - coagulants, disinfectants, and pH control for plants across Africa, the GCC, and Asia.',
    seoKeywords: 'water treatment chemicals exporter, PAC supplier, poly aluminium chloride, aluminium sulphate, sodium hypochlorite, TCCA, bleaching powder',
    productIds: ['pac', 'aluminium-sulphate', 'sodium-hypochlorite', 'caustic-soda', 'calcium-hypochlorite', 'tcca', 'stable-bleaching-powder', 'sodium-sulphite', 'ferric-chloride', 'ferrous-sulphate', 'copper-sulphate', 'potassium-permanganate', 'sodium-thiosulphate', 'activated-carbon'],
    additionalProducts: ['Ferric Chloride', 'Ferric Alum', 'Chlorine Dioxide', 'Activated Carbon', 'Polyacrylamide Flocculants', 'Antiscalants'],
    markets: ['East Africa', 'GCC', 'SE Asia'],
  },
  {
    id: 'mining',
    name: 'Mining & Metallurgy',
    icon: 'Pickaxe',
    description: 'Gold, silver, and copper extraction - cyanide destruction, leaching, flotation, and pH adjustment chemicals for mines across East and West Africa.',
    seoKeywords: 'mining chemicals exporter, SMBS for cyanide destruction, sodium metabisulphite mining, gold leaching chemicals, flotation reagents Africa',
    productIds: ['smbs', 'sodium-sulphite', 'sulphuric-acid', 'caustic-soda', 'hydrazine-hydrate', 'calcium-chloride', 'sodium-chlorate', 'copper-sulphate', 'activated-carbon', 'sodium-thiosulphate', 'quick-lime'],
    additionalProducts: ['Sodium Cyanide', 'Xanthate Collectors', 'Frothers', 'Activated Carbon', 'Quick Lime'],
    markets: ['East Africa', 'West Africa'],
  },
  {
    id: 'oil-gas',
    name: 'Oil, Gas & Energy',
    icon: 'Flame',
    description: 'Drilling fluids, well completion, refinery, and energy-sector chemicals - high-demand calcium chloride and caustic across GCC oilfields.',
    seoKeywords: 'oilfield chemicals supplier, calcium chloride drilling fluid, caustic soda oil and gas, GCC chemical exporter',
    productIds: ['calcium-chloride', 'caustic-soda', 'hydrochloric-acid', 'sulphuric-acid', 'methanol', 'sodium-bicarbonate', 'barite', 'bentonite', 'mono-ethanolamine', 'potassium-chloride', 'shmp'],
    additionalProducts: ['Barite (Drilling Grade)', 'Bentonite', 'Mono Ethylene Glycol', 'Corrosion Inhibitors', 'Defoamers'],
    markets: ['GCC', 'East Africa'],
  },
  {
    id: 'chlor-alkali',
    name: 'Chlor-Alkali & Basics',
    icon: 'Atom',
    description: 'Core chlor-alkali commodities - caustic soda, chlorine, soda ash, and acids that form the backbone of every downstream chemical industry.',
    seoKeywords: 'caustic soda exporter India, caustic soda flakes GACL, soda ash supplier, liquid chlorine, hydrochloric acid bulk',
    productIds: ['caustic-soda', 'caustic-potash', 'hydrochloric-acid', 'liquid-chlorine', 'soda-ash', 'sodium-silicate', 'quick-lime', 'hydrated-lime'],
    additionalProducts: ['Hydrogen Gas (H₂)', 'Chlorine Gas', 'Sodium Silicate', 'Potassium Carbonate'],
    markets: ['East Africa', 'SE Asia', 'West Africa'],
  },
  {
    id: 'chemical-intermediates',
    name: 'Chemical Intermediates',
    icon: 'FlaskConical',
    description: 'Building-block solvents, acids, and reactive intermediates for pharmaceutical, agrochemical, dye, and specialty chemical synthesis.',
    seoKeywords: 'chemical intermediates exporter, chlorinated solvents, oleum, chlorosulphonic acid, epichlorohydrin India',
    productIds: ['oleum', 'chlorosulphonic-acid', 'sulphuryl-chloride', 'thionyl-chloride', 'chloroform', 'methylene-chloride', 'epichlorohydrin', 'beta-naphthol', 'acetic-acid', 'formic-acid', 'formaldehyde', 'isopropyl-alcohol', 'mek', 'mibk'],
    additionalProducts: ['Acetic Anhydride', 'Aniline', 'Phenol', 'Acetic Acid', 'Formaldehyde'],
    markets: ['SE Asia', 'GCC'],
    pharmaSections: ['intermediates', 'others'],
  },
  {
    id: 'paints-coatings',
    name: 'Paints, Inks & Coatings',
    icon: 'PaintBucket',
    description: 'Resins, solvents, pigments dispersants, and additives for paints, printing inks, and protective/industrial coatings.',
    seoKeywords: 'paint chemicals supplier, epoxy resin exporter, coating solvents, toluene, MEG, titanium dioxide',
    productIds: ['epoxy-resin', 'toluene', 'acetone', 'ethyl-acetate', 'methanol', 'ethylene-glycol', 'titanium-dioxide', 'xylene', 'n-butanol', 'propylene-glycol', 'calcium-carbonate', 'stearic-acid'],
    additionalProducts: ['Titanium Dioxide', 'Xylene', 'MIBK', 'Butyl Acetate', 'Driers & Additives'],
    markets: ['SE Asia', 'GCC', 'West Africa'],
  },
  {
    id: 'plastic-rubber',
    name: 'Plastics, PVC & Rubber',
    icon: 'Recycle',
    description: 'Polymer feedstock, plasticizers, stabilizers, and processing aids for PVC, polymers, and rubber manufacturing.',
    seoKeywords: 'PVC chemicals supplier, chlorinated paraffin exporter, EDC, plasticizer, polymer additives India',
    productIds: ['caustic-soda', 'chlorinated-paraffin', 'aluminium-chloride', 'ethylene-dichloride', 'liquid-chlorine', 'epoxy-resin', 'sulphur', 'calcium-carbonate', 'titanium-dioxide', 'zinc-oxide', 'stearic-acid', 'china-clay', 'diethylene-glycol'],
    additionalProducts: ['DOP / DBP Plasticizers', 'Calcium-Zinc Stabilizers', 'Titanium Dioxide', 'Carbon Black', 'Impact Modifiers'],
    markets: ['SE Asia', 'GCC'],
  },
  {
    id: 'home-personal-care',
    name: 'Home & Personal Care',
    icon: 'SprayCan',
    description: 'Surfactants, builders, and actives for soaps, detergents, cosmetics, and household cleaning - including imported fatty acids.',
    seoKeywords: 'detergent chemicals supplier, LABSA, caustic soda soap, lauric acid importer, surfactants exporter',
    productIds: ['caustic-soda', 'caustic-potash', 'soda-ash', 'sodium-sulphate', 'oleum', 'sodium-bicarbonate', 'lauric-acid', 'decanoic-acid', 'labsa', 'sles', 'cdea', 'soap-noodles', 'refined-glycerine', 'citric-acid', 'stpp'],
    additionalProducts: ['LABSA 96%', 'SLES 70%', 'Refined Glycerine', 'CDEA / CAPB', 'Soap Noodles'],
    markets: ['West Africa', 'East Africa', 'GCC'],
  },
  {
    id: 'agro-fertilizer',
    name: 'Agro & Fertilizer',
    icon: 'Wheat',
    description: 'Crop nutrition, soil treatment, and crop-protection intermediates - sulphur, acids, and nitrate salts for agriculture.',
    seoKeywords: 'agro chemicals exporter, fertilizer raw material, sulphur supplier, sodium nitrate, phosphoric acid agriculture',
    productIds: ['sulphur', 'sulphuric-acid', 'sodium-nitrate', 'phosphoric-acid', 'sodium-chlorate', 'urea', 'dap', 'potassium-chloride', 'calcium-nitrate', 'potassium-sulphate', 'ammonium-sulphate', 'potassium-nitrate', 'magnesium-sulphate', 'zinc-sulphate', 'boric-acid'],
    additionalProducts: ['Urea', 'MOP (Potassium Chloride)', 'Zinc Sulphate', 'Magnesium Sulphate', 'Micronutrient Blends'],
    markets: ['East Africa', 'West Africa', 'SE Asia'],
  },
  {
    id: 'food-pharma',
    name: 'Food & Pharma',
    icon: 'Pill',
    description: 'Food-grade and pharmaceutical-grade chemicals for processing, preservation, buffering, and active synthesis.',
    seoKeywords: 'food grade chemicals exporter, pharma intermediates, sodium bicarbonate food grade, calcium chloride food, phosphoric acid food grade',
    productIds: ['smbs', 'calcium-chloride', 'sodium-bicarbonate', 'hydrogen-peroxide', 'phosphoric-acid', 'sodium-acetate', 'sodium-nitrate', 'decanoic-acid', 'citric-acid', 'lactic-acid', 'refined-glycerine', 'magnesium-sulphate', 'ammonium-chloride'],
    additionalProducts: ['Citric Acid', 'Lactic Acid', 'Potassium Sorbate', 'Sodium Benzoate', 'Dextrose'],
    markets: ['GCC', 'SE Asia', 'West Africa'],
    pharmaSections: ['apis', 'excipients', 'ingredients'],
  },
  {
    id: 'textile-dyeing',
    name: 'Textile & Dyeing',
    icon: 'Shirt',
    description: 'Fabric mercerizing, scouring, bleaching, dyeing, and effluent treatment chemicals for textile mills and dye houses.',
    seoKeywords: 'textile chemicals exporter, caustic soda mercerizing, hydrogen peroxide bleaching, beta naphthol dye, glauber salt',
    productIds: ['caustic-soda', 'hydrogen-peroxide', 'sodium-hypochlorite', 'sulphuric-acid', 'beta-naphthol', 'sodium-sulphate', 'acetic-acid', 'formic-acid', 'oxalic-acid'],
    additionalProducts: ['Sodium Hydrosulphite', 'Optical Brighteners', 'Acetic Acid', 'Soda Ash', 'Fixing Agents'],
    markets: ['SE Asia', 'East Africa', 'West Africa'],
  },
  {
    id: 'pulp-paper',
    name: 'Pulp & Paper',
    icon: 'ScrollText',
    description: 'Pulping, bleaching, sizing, and de-inking chemicals for paper mills and packaging board producers.',
    seoKeywords: 'paper chemicals supplier, caustic soda pulp, sodium chlorate bleaching, hydrogen peroxide paper, rosin sizing',
    productIds: ['caustic-soda', 'sodium-chlorate', 'hydrogen-peroxide', 'soda-ash', 'aluminium-sulphate', 'sodium-sulphite', 'china-clay', 'calcium-carbonate', 'sodium-silicate'],
    additionalProducts: ['Rosin Size', 'Optical Brighteners', 'AKD Wax', 'Defoamers', 'Retention Aids'],
    markets: ['SE Asia', 'East Africa'],
  },
];

export const industryById = (id: string) => industryData.find(i => i.id === id);

// ─── Market Data ──────────────────────────────
export type MarketData = {
  id: string;
  name: string;
  countries: string[];
  industries: string[];
  keyProducts: string[];
  leadTime: string;
  ports: string[];
  description: string;
};

export const marketData: MarketData[] = [
  {
    id: 'east-africa',
    name: 'East Africa',
    countries: ['Kenya', 'Tanzania', 'Uganda', 'DRC', 'Zambia', 'Rwanda', 'Ethiopia', 'Mozambique'],
    industries: ['Mining (Gold/Silver)', 'Water Treatment', 'Food Processing', 'Textiles', 'Agriculture'],
    keyProducts: ['SMBS', 'PAC', 'Caustic Soda Flakes', 'Calcium Chloride', 'Sulphuric Acid'],
    leadTime: '15-20 days',
    ports: ['Mombasa (Kenya)', 'Dar es Salaam (Tanzania)', 'Beira (Mozambique)', 'Djibouti'],
    description: 'Our largest market. Mining in Zambia, Tanzania, and DRC drives SMBS demand. Rapid urbanization creates strong need for PAC in water plants.',
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    countries: ['Nigeria', 'Ghana', 'Côte d\'Ivoire', 'Senegal', 'Cameroon', 'Togo'],
    industries: ['Food Processing', 'Textiles', 'Construction', 'Soap & Detergent', 'Mining'],
    keyProducts: ['Caustic Soda Flakes', 'Soda Ash', 'SMBS', 'Calcium Chloride', 'PAC'],
    leadTime: '18-25 days',
    ports: ['Lagos/Apapa (Nigeria)', 'Tema (Ghana)', 'Abidjan (Côte d\'Ivoire)', 'Dakar (Senegal)'],
    description: 'West Africa\'s growing FMCG sector drives caustic soda demand. Nigeria and Ghana are key markets for construction and food processing chemicals.',
  },
  {
    id: 'gcc',
    name: 'GCC & Middle East',
    countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Jordan', 'Iraq'],
    industries: ['Oil & Gas', 'Desalination', 'Construction', 'Food Processing', 'Pharmaceuticals'],
    keyProducts: ['Calcium Chloride', 'PAC', 'Caustic Soda Lye', 'Sulphuric Acid', 'Hydrogen Peroxide'],
    leadTime: '7-12 days',
    ports: ['Jebel Ali (UAE)', 'Ras Tanura (Saudi Arabia)', 'Shuaiba (Kuwait)', 'Sohar (Oman)'],
    description: 'Our fastest-growing market. 7-12 day delivery from Indian ports. Oilfield drilling drives CaCl₂ demand; desalination plants need PAC and caustic soda.',
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    countries: ['Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Myanmar', 'Cambodia'],
    industries: ['Textiles', 'Pulp & Paper', 'Food Processing', 'Petrochemicals', 'Electronics'],
    keyProducts: ['Caustic Soda Flakes', 'Hydrogen Peroxide', 'SMBS', 'Sulphuric Acid', 'PAC'],
    leadTime: '12-18 days',
    ports: ['Port Klang (Malaysia)', 'Bangkok (Thailand)', 'Ho Chi Minh City (Vietnam)', 'Tanjung Priok (Indonesia)'],
    description: 'Southeast Asia\'s manufacturing boom drives demand across textile, paper, and electronics. Vietnam and Indonesia are fast-growing markets.',
  },
];

/** How many products a sector actually offers, across BOTH books. The industry
 *  cards used to count `productIds` alone, which under-reported every sector that
 *  draws on APIs, intermediates or excipients. */
export const sectorProductCount = (
  ind: Pick<IndustryData, 'productIds' | 'pharmaSections'>,
  pharma: { section: string }[],
) => ind.productIds.length + (ind.pharmaSections ?? []).reduce(
  (n, sec) => n + pharma.filter((p) => p.section === sec).length, 0,
);
