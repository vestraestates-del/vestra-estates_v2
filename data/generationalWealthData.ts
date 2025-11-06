
export interface WealthService {
  id: string;
  title: string;
  description: string;
  icon: 'Tree' | 'BuildingKey' | 'UsersGroup' | 'Diamond' | 'PlaneBoat' | 'Fingerprint';
}

export const generationalWealthServices: WealthService[] = [
    {
        id: 'family-office',
        title: 'Family Office',
        description: 'Establishing and managing a dedicated office to oversee your family\'s financial and personal affairs, ensuring continuity and professional governance.',
        icon: 'BuildingKey'
    },
    {
        id: 'succession-planning',
        title: 'Succession Planning',
        description: 'A strategic process for identifying and developing future leaders of your family enterprise, ensuring a smooth transition of leadership and legacy.',
        icon: 'UsersGroup'
    },
    {
        id: 'passion-assets',
        title: 'Passion Assets',
        description: 'Expert advisory for the acquisition, management, and curation of legacy assets like fine art, rare automobiles, and haute horlogerie.',
        icon: 'Diamond'
    },
    {
        id: 'aviation-yachting',
        title: 'Aviation & Yachting',
        description: 'Comprehensive management solutions for private aircraft and superyachts, handling everything from acquisition and crewing to operations.',
        icon: 'PlaneBoat'
    },
    {
        id: 'digital-vault',
        title: 'Digital Vault',
        description: 'An ultra-secure, encrypted repository for your most critical legal, financial, and personal documents, accessible only by you.',
        icon: 'Fingerprint'
    }
];
