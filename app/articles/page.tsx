import { redirect } from 'next/navigation';

/**
 * Insights merged into /markets. Individual posts still live at
 * /articles/[slug] - they are indexed and linked from the markets page - but the
 * listing no longer has its own tab.
 */
export default function ArticlesIndex() {
  redirect('/markets#insights');
}
