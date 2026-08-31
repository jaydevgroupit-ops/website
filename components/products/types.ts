/** One normalised catalogue row. Both books render through this shape so the
 *  grid and the table each have a single code path. */
export type Row = {
  id: string;
  name: string;
  formula?: string;
  cas?: string;
  /** Grade for industrial, therapeutic segment for pharma. */
  meta?: string;
  /** Category or pharma-section label - the grouping axis shown on the card. */
  group: string;
  /** Detail page where one exists. Pharma and imports go straight to enquiry. */
  href?: string;
  featured?: boolean;
  flag?: 'Investigational' | 'Import';
  blurb?: string;
};
