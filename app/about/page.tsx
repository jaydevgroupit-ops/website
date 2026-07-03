import AboutClient from '@/components/AboutClient';

export const metadata = {
  title: 'Jaydev Group - About, Business Units & Leadership',
  description: 'Jaydev Group, founded by Jitesh Vajir in Rajkot. Two business units: Multicomm (export & import) and Pharma & Intermediates (domestic). Branches in Ahmedabad, Mumbai & Nigeria. Authorized partner of GACL & Grasim.',
  alternates: { canonical: 'https://www.jaydevmulticomm.com/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
