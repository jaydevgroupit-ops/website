import HomeClient from '@/components/HomeClient';

export const metadata = {
  // Bing/Google guidance: title <= ~60 chars, description ~120-160 chars
  title: { absolute: 'Industrial Chemical Exporter India | Jaydev Multicomm' },
  description: 'IEC-registered chemical exporter in Rajkot, India. 100+ chemicals to 30+ countries - GACL & Grasim authorized, full export documentation.',
  alternates: { canonical: 'https://www.jaydevmulticomm.com' },
};

export default function HomePage() {
  return <HomeClient />;
}
