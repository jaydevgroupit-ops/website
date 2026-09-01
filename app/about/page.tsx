import AboutClient from '@/components/AboutClient';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'About - Business Units & Leadership',
  description: 'Jaydev Group, founded by Jitesh Vajir: Multicomm (export & import) and Pharma & Intermediates (domestic). Ahmedabad HQ. Authorized partner of GACL & Grasim.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return <AboutClient />;
}
