export interface DesignStudioCategory {
  id: 'architecture' | 'interior' | 'landscape' | 'smart-home' | 'signature-villas';
  titleKey: string;
  philosophyKey: string;
  images: string[];
  awards: string[];
  showreelUrl: string;
  heroImage: string;
}

export const designStudioCategories: DesignStudioCategory[] = [
  {
    id: 'architecture',
    titleKey: 'designStudio.architecture.title',
    philosophyKey: 'designStudio.architecture.philosophy',
    images: [
      'https://images.pexels.com/photos/14849942/pexels-photo-14849942.jpeg',
      'https://images.pexels.com/photos/2079450/pexels-photo-2079450.jpeg',
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
      'https://images.pexels.com/photos/2440134/pexels-photo-2440134.jpeg',
    ],
    awards: [
      'Pritzker Architecture Prize (Collaborator)',
      'AIA Gold Medal',
      'RIBA International Prize',
    ],
    showreelUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    heroImage: 'https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg',
  },
  {
    id: 'interior',
    titleKey: 'designStudio.interior.title',
    philosophyKey: 'designStudio.interior.philosophy',
    images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/6585756/pexels-photo-6585756.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    ],
    awards: [
      'Andrew Martin Interior Designer of the Year',
      'SBID International Design Award',
      'Elle Deco International Design Award (EDIDA)',
    ],
    showreelUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    heroImage: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
  },
  {
    id: 'landscape',
    titleKey: 'designStudio.landscape.title',
    philosophyKey: 'designStudio.landscape.philosophy',
    images: [
      'https://images.pexels.com/photos/1468434/pexels-photo-1468434.jpeg',
      'https://images.pexels.com/photos/1009897/pexels-photo-1009897.jpeg',
      'https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg',
      'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
    ],
    awards: [
      'ASLA Design Medal',
      'Rosa Barba Landscape Prize',
      'Geoffrey Jellicoe Award',
    ],
    showreelUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    heroImage: 'https://images.pexels.com/photos/2247610/pexels-photo-2247610.jpeg',
  },
  {
    id: 'smart-home',
    titleKey: 'designStudio.smartHome.title',
    philosophyKey: 'designStudio.smartHome.philosophy',
    images: [
      'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg',
      'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg',
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
      'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg',
    ],
    awards: [
      'CEDIA Best Integrated Home',
      'Lutron Excellence Award',
      'Crestron Global Home Technology Award',
    ],
    showreelUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    heroImage: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
  },
  {
    id: 'signature-villas',
    titleKey: 'designStudio.signatureVillas.title',
    philosophyKey: 'designStudio.signatureVillas.philosophy',
    images: [
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
      'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
    ],
    awards: [
      'The International Architecture Awards',
      'Architizer A+Firm Award',
      'World Architecture Festival (WAF) Winner',
    ],
    showreelUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    heroImage: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg',
  },
];
