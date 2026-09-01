// ─── FAQ content (also powers FAQPage JSON-LD for AEO) ──
// Counts are derived, not typed out: this text is published as FAQPage schema,
// so a stale number here becomes a wrong answer in a search result.
import { products } from './content';
import { pharmaProducts, THERAPEUTIC_SEGMENTS } from './pharma';

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What does Jaydev Group supply?',
    a: `Two things. Industrial chemicals - ${products.length} products including Caustic Soda, Sulphuric Acid, PAC, SMBS, Hydrogen Peroxide and Calcium Chloride. And pharmaceuticals - ${pharmaProducts.length} products: human APIs across ${THERAPEUTIC_SEGMENTS.length} therapeutic areas, veterinary APIs, intermediates, excipients and nutraceutical ingredients. We sell both across India and export both. We also import Zircon Sand, Lauric Acid (C12) and Decanoic Acid (C10).`,
  },
  {
    q: 'Which countries do you supply to?',
    a: 'We ship to 30+ countries with a focus on East Africa (Kenya, Tanzania, Zambia, DRC), West Africa (Nigeria, Ghana), the GCC & Middle East (UAE, Saudi Arabia, Oman), and Southeast Asia (Indonesia, Malaysia, Vietnam).',
  },
  {
    q: 'What are your payment terms?',
    a: 'We accept an Irrevocable, Confirmed, Non-Transferable Letter of Credit at 100% sight via Dubai, or 30% cash in advance with the 70% balance against customs-clearance documents. Flexible terms (LC, TT, DA/DP) are available for established buyers.',
  },
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'Typical MOQ starts at 25 MT, though it varies by product and packaging. We handle both LCL (part-container) and FCL (full-container) shipments. Contact us with your requirement for exact terms.',
  },
  {
    q: 'How quickly can you deliver?',
    a: 'Indicative lead times are 7-12 days to the GCC, 12-18 days to Southeast Asia, 15-20 days to East Africa, and 18-25 days to West Africa, shipped FOB/CIF from Mundra, JNPT, Hazira, or Kandla.',
  },
  {
    q: 'What documentation do you provide with each shipment?',
    a: 'Every shipment includes a batch-specific Certificate of Analysis (COA), MSDS/Safety Data Sheet, Certificate of Origin, Bill of Lading, Packing List, Commercial Invoice, and IMDG declarations for hazardous cargo - all standard, at no extra charge.',
  },
  {
    q: 'Are you a manufacturer or a trader?',
    a: 'Jaydev Multicomm is an IEC-registered exporter and authorized partner of GACL and Grasim, with direct relationships to GACL, Grasim, Reliance, DCM Shriram, and other leading Indian producers. You get manufacturer-backed quality and traceability without multi-tier markup.',
  },
  {
    q: 'What documentation do you provide with each shipment?',
    a: 'Every export shipment carries a batch-specific Certificate of Analysis (COA) from the manufacturer, a GHS-compliant MSDS / Safety Data Sheet in English, a Certificate of Origin issued by the Indian Chamber of Commerce or the relevant Export Promotion Council, the full set of original Bill of Lading or Seaway Bill as your bank requires, a detailed Packing List with weights, dimensions, marks and lot numbers, a Commercial Invoice with all fields needed for customs clearance, an IMDG / IMO dangerous goods declaration for hazardous shipments, and a phytosanitary fumigation certificate where wooden packaging is used. We hold ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certification and are IEC, GST and RCMC registered.',
  },
  {
    q: 'What grades and documentation are available for APIs?',
    a: 'Pharmacopoeial grade (IP, BP, USP or EP), DMF and CEP status, GMP certification and packaging are confirmed per enquiry, since they vary by molecule and manufacturing site. Pharmaceutical products are offered for R&D and regulatory-filing purposes and are not offered for commercial supply in territories where the relevant patents are in force.',
  },
  {
    q: 'How do I request a quote or today\'s price?',
    a: 'Submit an RFQ through our Get Quote form, message us on WhatsApp at +91 90997 96811, or email exports@jaydevgroup.co.in with your product, grade, quantity, and destination port. We respond with a detailed CIF/FOB quote within 48 hours.',
  },
];
