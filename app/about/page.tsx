import AboutClient from '@/components/AboutClient';
import { SITE_URL } from '@/lib/site';
import { breadcrumb, jsonLdScript } from '@/lib/seo';

export const metadata = {
  title: 'About - Business Units & Leadership',
  description: 'Jaydev Group, founded by Jitesh Vajir: Multicomm (export & import) and Pharma & Intermediates (domestic). Ahmedabad HQ. Authorized partner of GACL & Grasim.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <script {...jsonLdScript(breadcrumb([{ name: 'About', path: '/about' }]))} />
      <AboutClient />
    </>
  );
}
