import HomeClient from '@/components/HomeClient';
import MarketNews from '@/components/MarketNews';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  // Bing/Google guidance: title <= ~60 chars, description ~120-160 chars
  title: { absolute: 'Industrial Chemicals & Pharma APIs India | Jaydev Group' },
  description: 'Industrial chemicals and pharmaceutical APIs from Ahmedabad, India. Domestic supply across India, export to 30+ countries. GACL & Grasim authorized.',
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return <HomeClient news={<MarketNews />} />;
}
