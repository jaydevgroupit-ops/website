// ─── Blog / Insights content ──────────────────
// Authority + SEO content. Add new posts here; pages render from this list.

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // ISO
  author: string;
  readTime: string;
  category: string;
  image: string;
  keywords: string;
  // Body as simple section blocks (heading optional + paragraphs)
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: 'smbs-gold-cyanide-destruction',
    title: 'SMBS for Gold Cyanide Destruction: Dosage, Handling & Export Specs',
    excerpt:
      'How sodium metabisulphite (SMBS) neutralises cyanide in gold and silver tailings - recommended dosage, purity grades, and what East African mines should specify when importing.',
    date: '2026-06-10',
    author: 'Jaydev Group',
    readTime: '5 min read',
    category: 'Mining',
    image: '/images/products/smbs.jpg',
    keywords: 'SMBS gold cyanide destruction, sodium metabisulphite mining dosage, SMBS exporter Africa, cyanide detox tailings',
    body: [
      { paragraphs: [
        'Sodium metabisulphite (SMBS, Na₂S₂O₅) is one of the most widely used reagents for cyanide destruction in gold and silver processing. As leached tailings move to the detox circuit, residual free and WAD (weak-acid-dissociable) cyanide must be reduced to environmentally compliant levels before discharge - and SMBS, often paired with a copper catalyst and air, is the workhorse chemistry for the SO₂/air (Inco) process.',
      ]},
      { heading: 'Why SMBS over liquid SO₂', paragraphs: [
        'For most African mine sites, importing and storing liquid SO₂ is impractical. SMBS is a stable, free-flowing powder that releases SO₂ in solution on demand, making it far easier to ship in 25 kg bags or jumbo bags, store in a warehouse, and dose with standard equipment. This logistical simplicity is why SMBS dominates demand across Tanzania, Zambia, DRC, and Ghana.',
      ]},
      { heading: 'Typical dosage', paragraphs: [
        'Dosage depends on the cyanide load, but a common starting point is roughly 2.5-5 kg of SMBS per kg of cyanide to be destroyed, optimised on site through bench testing. The reaction is catalysed by copper (often added as copper sulphate) and requires controlled aeration and pH (around 8-9) for efficient oxidation of cyanide to cyanate.',
      ]},
      { heading: 'What to specify when importing', paragraphs: [
        'For metallurgical use, specify technical-grade SMBS at 96.5% min purity with an SO₂ content of 64% min. Always request a manufacturer Certificate of Analysis (COA) per batch, plus MSDS and IMDG documentation for ocean freight. Jaydev Multicomm supplies GACL/Kutch-origin SMBS with full export documentation, CIF to Mombasa, Dar es Salaam, and Beira.',
      ]},
    ],
  },
  {
    slug: 'caustic-soda-flakes-lye-prills',
    title: 'Caustic Soda: Flakes vs Lye vs Prills - Which Form for Your Application',
    excerpt:
      'The three commercial forms of sodium hydroxide differ in purity, handling, and cost-in-use. A practical guide to choosing the right caustic soda form for textiles, soap, water treatment, and pharma.',
    date: '2026-06-05',
    author: 'Jaydev Group',
    readTime: '4 min read',
    category: 'Chlor-Alkali',
    image: '/images/products/caustic-soda.jpg',
    keywords: 'caustic soda flakes vs lye, sodium hydroxide grades, caustic soda prills, caustic soda exporter India',
    body: [
      { paragraphs: [
        'Caustic soda (sodium hydroxide, NaOH) is the backbone alkali of the chemical industry, but it ships in three distinct forms. Choosing the right one is a question of purity needs, handling capability, and total cost-in-use - not just headline price per tonne.',
      ]},
      { heading: 'Flakes (98.5% min)', paragraphs: [
        'Solid flakes are the most traded form for export. At 98.5% purity they suit textile mercerizing, soap and detergent, alumina refining, and general manufacturing. They are easy to bag (25/50 kg) and palletise, and tolerate long ocean transit well. For most buyers without bulk-liquid handling, flakes are the default.',
      ]},
      { heading: 'Lye / Liquid (47-50%)', paragraphs: [
        'Caustic soda lye is a ready-to-dose liquid favoured by plants with continuous processes - paper mills, large water-treatment works, and chemical synthesis. It removes the dissolving step but requires ISO-tank or flexitank handling and heated storage in cold climates. Best where consumption is high and steady.',
      ]},
      { heading: 'Prills / Pearl (99.4% min)', paragraphs: [
        'Prills are higher-purity, low-moisture beads used where contamination matters - pharmaceutical synthesis, specialty soaps, and food-grade applications. They cost more per tonne but reduce downstream purification. Specify prills only when your spec genuinely needs the extra purity.',
      ]},
    ],
  },
  {
    slug: 'incoterms-cif-fob-chemical-imports',
    title: 'CIF, FOB & Incoterms Explained for Chemical Buyers',
    excerpt:
      'A plain-English guide to the Incoterms that matter when importing industrial chemicals - who pays freight, who carries risk, and how to compare quotes correctly.',
    date: '2026-05-28',
    author: 'Jaydev Group',
    readTime: '6 min read',
    category: 'Trade & Logistics',
    image: '/images/logistics-port.png',
    keywords: 'CIF FOB incoterms chemicals, chemical import terms, CIF quote chemical exporter, incoterms 2020 explained',
    body: [
      { paragraphs: [
        'When you request a quote for industrial chemicals, the price only means something once you know the Incoterm attached to it. Incoterms are the internationally recognised rules that define where the seller\'s responsibility ends and yours begins - covering freight, insurance, customs, and the critical question of who bears risk at each stage.',
      ]},
      { heading: 'EXW (Ex Works)', paragraphs: [
        'The seller makes goods available at their factory. You arrange and pay for everything after that - inland transport, export clearance, freight, insurance. Lowest headline price, highest effort and risk for the buyer.',
      ]},
      { heading: 'FOB (Free On Board)', paragraphs: [
        'The seller delivers the goods onto the vessel at the port of origin and handles export clearance. From that point, freight, insurance, and risk are yours. FOB is common when the buyer has their own freight forwarder and wants control over shipping.',
      ]},
      { heading: 'CIF (Cost, Insurance & Freight)', paragraphs: [
        'The seller pays for freight and minimum insurance to your destination port. CIF is the simplest term for many importers because the landed-to-port cost is bundled into one number - easy to budget and compare. Note that risk still transfers at origin, so the insurance cover matters.',
      ]},
      { heading: 'Comparing quotes correctly', paragraphs: [
        'Always compare like-for-like: an EXW price will look cheaper than CIF but excludes freight and insurance you must add. When you request a quote from Jaydev Multicomm, we provide clear CIF and FOB options to your nominated port, with full documentation, so the number you see is the number you plan around.',
      ]},
    ],
  },
  {
    slug: 'pac-vs-alum-water-treatment',
    title: 'PAC vs Alum: Choosing the Right Coagulant for Water Treatment',
    excerpt:
      'Poly Aluminium Chloride and aluminium sulphate both clarify water - but they behave differently on pH, dose, sludge, and cold-water performance. How to choose for municipal and industrial plants.',
    date: '2026-05-20',
    author: 'Jaydev Group',
    readTime: '5 min read',
    category: 'Water Treatment',
    image: '/images/watertreatment.webp',
    keywords: 'PAC vs alum, poly aluminium chloride water treatment, coagulant selection, PAC supplier exporter',
    body: [
      { paragraphs: [
        'Coagulation is the first chemical step in clarifying turbid water, and the two dominant coagulants - Poly Aluminium Chloride (PAC) and aluminium sulphate (alum) - are not interchangeable. The right choice affects dose rate, pH correction, sludge volume, and performance in cold or low-alkalinity water.',
      ]},
      { heading: 'Poly Aluminium Chloride (PAC)', paragraphs: [
        'PAC is a pre-hydrolysed coagulant that works across a wider pH band, requires lower doses, and produces less sludge than alum. It performs notably better in cold water and low-turbidity conditions, which is why modern municipal plants increasingly standardise on PAC. It ships as liquid (10-18% Al₂O₃) or powder (28-30%).',
      ]},
      { heading: 'Aluminium Sulphate (Alum)', paragraphs: [
        'Alum remains the cost-effective workhorse for higher-turbidity raw water where its larger dose is offset by lower price per tonne. It consumes more alkalinity and can require pH correction, and it generates more sludge - but for many plants it is still the economical choice.',
      ]},
      { heading: 'The practical decision', paragraphs: [
        'If you are dosing cold or low-turbidity water, fighting sludge handling costs, or want a wider operating window, PAC usually wins on total cost-in-use despite a higher per-tonne price. For high-turbidity surface water on a tight budget, alum holds its ground. Jaydev Multicomm supplies both with batch COAs, CIF to East Africa, GCC, and SE Asia.',
      ]},
    ],
  },
];

export const articleCategories = [...new Set(articles.map(a => a.category))];
