import type { CircleMember } from './circleData';

export type MarketIntelligenceReportCategory = 'global' | 'local' | 'guides' | 'migration' | 'trends';

export interface MarketIntelligenceReport {
  id: number;
  title: string;
  category: MarketIntelligenceReportCategory;
  summary: string;
  pdfUrl: string;
  requiredTier: CircleMember['tier'];
  date: string;
  image: string;
}

export interface MarketIntelligenceCategory {
  id: MarketIntelligenceReportCategory;
  titleKey: string;
  subtitle: string;
  image: string;
}

export const marketIntelligenceCategories: MarketIntelligenceCategory[] = [
    { id: 'global', titleKey: 'sidebar.marketGlobal', subtitle: 'Macro analysis of global real estate trends.', image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg' },
    { id: 'local', titleKey: 'sidebar.marketLocal', subtitle: 'Deep dives into the world\'s most exclusive property markets.', image: 'https://images.pexels.com/photos/356984/pexels-photo-356984.jpeg' },
    { id: 'guides', titleKey: 'sidebar.marketGuides', subtitle: 'Strategic guides for acquiring and managing luxury assets.', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' },
    { id: 'migration', titleKey: 'sidebar.marketMigration', subtitle: 'Tracking the movement of global capital and UHNW individuals.', image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg' },
    { id: 'trends', titleKey: 'sidebar.marketTrends', subtitle: 'Analytics on the latest trends shaping luxury lifestyles.', image: 'https://images.pexels.com/photos/163236/luxury-yacht-yacht-yacht-charter-yacht-holiday-163236.jpeg' },
];

export const marketIntelligenceReports: MarketIntelligenceReport[] = [
  // Global
  {
    id: 201,
    title: 'Q3 2024 Global Luxury Real Estate Outlook',
    category: 'global',
    summary: 'A comprehensive analysis of prime property markets across 30+ global cities. This report identifies key growth drivers, emerging risks, and forecasts for the next 12-18 months, with a special focus on the impact of geopolitical shifts and currency fluctuations.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Elit Access',
    date: '2024-07-15',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
  },
  // Local
  {
    id: 202,
    title: 'Prime Zone Analysis: Monaco',
    category: 'local',
    summary: 'A detailed examination of the Monaco real estate market, covering micro-neighborhood trends, recent landmark transactions, and regulatory changes. Includes an analysis of the new Portier Cove eco-district development.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Diamond Access',
    date: '2024-06-20',
    image: 'https://images.pexels.com/photos/161848/monaco-monte-carlo-port-yachts-161848.jpeg',
  },
  {
    id: 203,
    title: 'Prime Zone Analysis: Bodrum Peninsula',
    category: 'local',
    summary: 'An inside look at Turkey\'s premier luxury destination. This report analyzes the rise of branded residences, marina developments, and the factors driving its appeal to international UHNWIs.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Elit Access',
    date: '2024-05-10',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
  },
  // Guides
  {
    id: 204,
    title: 'Guide to Acquiring Trophy Assets in Europe',
    category: 'guides',
    summary: 'A strategic guide covering legal structuring, tax implications, and cultural nuances of acquiring high-value residential real estate in key European jurisdictions like Switzerland, France, Italy, and the UK.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Diamond Access',
    date: '2024-07-01',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
  },
  // Migration
  {
    id: 205,
    title: '2024 Wealth Migration Report',
    category: 'migration',
    summary: 'Tracking the net inflows and outflows of high-net-worth individuals across the globe. This report identifies the top "safe haven" markets and analyzes the primary drivers of UHNWI relocation, from tax incentives to lifestyle factors.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Royal Black Access',
    date: '2024-04-30',
    image: 'https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg',
  },
  // Trends
  {
    id: 206,
    title: 'The Future of Wellness Real Estate',
    category: 'trends',
    summary: 'An analysis of the growing demand for homes that prioritize health and well-being. This report covers the latest in-home wellness technologies, biophilic design, and the financial premium associated with wellness-certified properties.',
    pdfUrl: 'report.pdf',
    requiredTier: 'Elit Access',
    date: '2024-06-05',
    image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
  },
];
