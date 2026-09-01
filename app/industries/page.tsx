import IndustriesClient from '@/components/IndustriesClient';
import { industryData } from '@/lib/content';
import { SITE_URL } from '@/lib/site';
import { breadcrumb, jsonLdScript } from '@/lib/seo';

export const metadata = {
  title: 'Industries - Chemicals & APIs for 12 Sectors',
  description: `Industrial chemicals and pharma inputs across ${industryData.length} sectors: water treatment, mining, textile, FMCG, agro, food and pharma. Sourcing and documentation support.`,
  alternates: { canonical: `${SITE_URL}/industries` },
};

export default function IndustriesPage() {
  return (
    <>
      <script {...jsonLdScript(breadcrumb([{ name: 'Industries', path: '/industries' }]))} />
      <IndustriesClient />
    </>
  );
}
