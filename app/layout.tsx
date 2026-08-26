import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SocialRail from '@/components/SocialRail';
import SmoothScroll from '@/components/SmoothScroll';
import MobileNav from '@/components/MobileNav';
import { SITE_URL, SALES_EMAIL, EXPORT_EMAIL, PHONE_EXPORT, PHONE_RAJKOT } from '@/lib/site';
import { products } from '@/lib/content';
import { pharmaProducts, THERAPEUTIC_SEGMENTS } from '@/lib/pharma';

export const metadata: Metadata = {
  title: {
    default: 'Industrial Chemicals & Pharma APIs India | Jaydev Group',
    template: '%s | Jaydev Group',
  },
  description: 'Industrial chemicals and pharmaceutical APIs from Ahmedabad, India. 300+ products supplied across India and exported to 30+ countries, fully documented.',
  keywords: ['industrial chemicals exporter India', 'caustic soda exporter', 'sulphuric acid supplier', 'PAC SMBS exporter', 'GACL Grasim authorized partner', 'chemical trading Ahmedabad Gujarat', 'zircon sand importer', 'lauric acid decanoic acid'],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Jaydev Group',
    title: 'Jaydev Group - Global Industrial Chemical Supply',
    description: 'Industrial chemicals and pharmaceutical APIs from India. Domestic supply and export to 30+ countries. GACL & Grasim Authorized Partner.',
    // og image auto-supplied by app/opengraph-image.tsx (1200x630 branded)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaydev Group',
    description: 'Industrial chemicals & pharma APIs from Ahmedabad, India. GACL & Grasim Authorized Partner.',
    // twitter image auto-derived from the opengraph-image
  },
};

const ORG_ID = `${SITE_URL}/#organization`;
const LOGO = `${SITE_URL}/brand/jaydev-group-logo.png`;

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'B-408 Ratnakar Nine Square, opp ITC Narmada, near Keshavbaug Cross Road, Vastrapur,',
  addressLocality: 'Ahmedabad',
  addressRegion: 'Gujarat',
  postalCode: '380015',
  addressCountry: 'IN',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Jaydev Group',
      legalName: 'Jaydev Multicomm Pvt. Ltd.',
      alternateName: ['Jaydev Multicomm', 'Jaydev Multicomm Pvt. Ltd.', 'Jaydev Pharma & Intermediates LLP'],
      url: SITE_URL,
      logo: LOGO,
      image: LOGO,
      email: SALES_EMAIL,
      telephone: PHONE_EXPORT,
      slogan: 'Connecting Chemistry, Creating Solutions',
      founder: { '@type': 'Person', name: 'Jitesh Vajir' },
      address: ADDRESS,
      hasOfferCatalog: [
        {
          '@type': 'OfferCatalog',
          '@id': `${SITE_URL}/#catalog-industrial`,
          name: 'Industrial Chemicals',
          numberOfItems: products.length,
          description:
            'Chlor-alkali, acids, water treatment chemicals, solvents, inorganic salts, surfactants, minerals and agro inputs - manufacturer-direct, with full COA, MSDS and export documentation.',
          url: `${SITE_URL}/products?division=industrial`,
        },
        {
          '@type': 'OfferCatalog',
          '@id': `${SITE_URL}/#catalog-pharma`,
          name: 'Pharma, Intermediates & APIs',
          numberOfItems: pharmaProducts.length,
          description: `Active pharmaceutical ingredients across ${THERAPEUTIC_SEGMENTS.length} therapeutic areas, plus pharmaceutical intermediates, excipients, nutraceutical ingredients and fine chemicals. Supplied for R&D and regulatory-filing purposes.`,
          url: `${SITE_URL}/products?division=pharma`,
        },
      ],
      subOrganization: [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#multicomm`,
          name: 'Jaydev Multicomm Pvt. Ltd.',
          description:
            'The export and import arm of Jaydev Group, and the IEC-registered exporting entity for both portfolios - industrial chemicals and pharmaceuticals - to 30+ countries across Africa, the GCC and Southeast Asia.',
          parentOrganization: { '@id': ORG_ID },
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#pharma`,
          name: 'Jaydev Pharma & Intermediates LLP',
          description:
            'The domestic distribution arm of Jaydev Group, supplying both portfolios across India - APIs, intermediates and excipients alongside industrial chemicals and raw materials.',
          parentOrganization: { '@id': ORG_ID },
        },
      ],
      contactPoint: [
        { '@type': 'ContactPoint', telephone: PHONE_EXPORT, contactType: 'sales', email: EXPORT_EMAIL, availableLanguage: ['English', 'Hindi', 'Gujarati'], areaServed: 'Worldwide' },
        { '@type': 'ContactPoint', telephone: PHONE_RAJKOT, contactType: 'customer service', email: SALES_EMAIL, availableLanguage: ['English', 'Hindi', 'Gujarati'], areaServed: 'IN' },
      ],
      sameAs: [
        'https://www.linkedin.com/company/jaydev-multicomm',
        'https://www.linkedin.com/in/jitesh-vajir-2471993b6/',
        'https://www.linkedin.com/in/darsh-k-07579a3b5/',
        'https://www.linkedin.com/in/meet-sheth-0871/',
      ],
      areaServed: ['India', 'East Africa', 'West Africa', 'GCC', 'Middle East', 'Southeast Asia'],
      knowsAbout: [
        'Industrial chemicals export', 'Caustic Soda', 'Sulphuric Acid', 'Poly Aluminium Chloride (PAC)',
        'Sodium Metabisulphite (SMBS)', 'Hydrogen Peroxide', 'Calcium Chloride', 'Water treatment chemicals',
        'Chlor-alkali chemicals', 'Chemical trading', 'Pharmaceutical intermediates',
        'Active pharmaceutical ingredients (APIs)', 'Pharmaceutical excipients',
        'Nutraceutical ingredients', 'Fine chemicals', 'API sourcing',
        'Export documentation (COA, MSDS, IMDG)',
      ],
      description:
        'Jaydev Group is an Ahmedabad-headquartered chemical enterprise operating through two arms: Jaydev Multicomm Pvt. Ltd., an IEC-registered exporter and importer of industrial chemicals serving 30+ countries, and Jaydev Pharma & Intermediates LLP, its domestic distribution business. Authorized partner of GACL and Grasim / Aditya Birla Chemicals.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Jaydev Group',
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* spacer so the floating mobile tray never covers footer content */}
        <div className="h-20 lg:hidden" aria-hidden="true" />
        <SmoothScroll />
        <SocialRail />
        <FloatingWhatsApp />
        <MobileNav />
      </body>
    </html>
  );
}
