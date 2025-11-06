export interface OffMarketProperty {
  id: number;
  codename: string;
  location: string;
  country: string;
  teaser: string;
  image: string;
  category: 'Villa' | 'Mansion' | 'Estate' | 'Penthouse' | 'Island' | 'Portfolio';
  stats: {
    label: string;
    value: string;
  }[];
  gallery: string[];
  videos?: string[];
  modelUrl?: string;
  securityGrade: 'A+' | 'A' | 'B+';
  smartHomeGrade: 'A+' | 'A' | 'B+';
  architecturalStyle: string;
  investmentScore: number;
  lifestyleScore: number;
  investorPackUrl?: string;
}

export const initialOffMarketProperties: OffMarketProperty[] = [
  {
    id: 101,
    codename: "The Aethelgard Fortress",
    location: "Scottish Highlands, UK",
    country: "United Kingdom",
    teaser: "A self-sufficient architectural marvel embedded within a mountain.",
    image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: 'Estate',
    stats: [
      { label: "Acreage", value: "800+" },
      { label: "Access", value: "Heli-Access Only" },
      { label: "Security", value: "State-of-the-Art" }
    ],
    gallery: [
        "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/164332/pexels-photo-164332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    videos: ["https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"],
    securityGrade: 'A+',
    smartHomeGrade: 'A',
    architecturalStyle: 'Brutalist Modern',
    investmentScore: 8.9,
    lifestyleScore: 9.2,
    investorPackUrl: 'redacted.pdf'
  },
  {
    id: 102,
    codename: "Project Abyssal",
    location: "Monaco",
    country: "Monaco",
    teaser: "The world's first luxury subterranean residence with direct sea views.",
    image: "https://images.pexels.com/photos/957024/berchtesgen-watzmann-mountain-watzmann-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: 'Mansion',
    stats: [
      { label: "Levels", value: "5 (Subterranean)" },
      { label: "Feature", value: "Submerged Living Area" },
      { label: "Berth", value: "Private Submarine Pen" }
    ],
    gallery: [
        "https://images.pexels.com/photos/957024/berchtesgen-watzmann-mountain-watzmann-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1114900/pexels-photo-1114900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    modelUrl: "https://my.matterport.com/show/?m=uRGXgoiYk9f",
    securityGrade: 'A+',
    smartHomeGrade: 'A+',
    architecturalStyle: 'Subterranean Modernism',
    investmentScore: 9.8,
    lifestyleScore: 9.9,
    investorPackUrl: 'redacted.pdf'
  },
  {
    id: 103,
    codename: "Kyoto Heritage Sanctuary",
    location: "Kyoto, Japan",
    country: "Japan",
    teaser: "A historic temple complex, masterfully restored for private residential use.",
    image: "https://images.pexels.com/photos/161457/water-river-nature-forest-161457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: 'Villa',
    stats: [
      { label: "Estate Size", value: "15 Acres" },
      { label: "Structures", value: "7 (Restored)" },
      { label: "Status", value: "UNESCO Proximity" }
    ],
    gallery: ["https://images.pexels.com/photos/161457/water-river-nature-forest-161457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    securityGrade: 'A',
    smartHomeGrade: 'B+',
    architecturalStyle: 'Sukiya-zukuri',
    investmentScore: 9.5,
    lifestyleScore: 9.7,
  },
   {
    id: 104,
    codename: "The Patagonian Ark",
    location: "Patagonia, Chile",
    country: "Chile",
    teaser: "An ultra-modern, eco-conscious estate designed for absolute autonomy.",
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: 'Estate',
    stats: [
      { label: "Power", value: "Geothermal & Solar" },
      { label: "Access", value: "Private Airstrip" },
      { label: "Feature", value: "Hydroponic Biodome" }
    ],
    gallery: ["https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    securityGrade: 'A',
    smartHomeGrade: 'A+',
    architecturalStyle: 'Organic Modernism',
    investmentScore: 8.7,
    lifestyleScore: 9.5,
    investorPackUrl: 'redacted.pdf'
  },
  {
    id: 105,
    codename: "The Sky Citadel",
    location: "Manhattan, NYC, USA",
    country: "USA",
    teaser: "A triplex penthouse with 360-degree views, featuring a private sky-lobby and vehicle elevator.",
    image: "https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg",
    category: 'Penthouse',
    stats: [
      { label: "Floors", value: "3" },
      { label: "Special", value: "Vehicle Elevator" },
      { label: "Security", value: "Biometric Access" }
    ],
    gallery: ["https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg"],
    securityGrade: 'A+',
    smartHomeGrade: 'A+',
    architecturalStyle: 'Contemporary Skyscraper',
    investmentScore: 9.9,
    lifestyleScore: 9.8,
    investorPackUrl: 'redacted.pdf'
  },
  {
    id: 106,
    codename: "Isle of Cygnus",
    location: "The Bahamas",
    country: "The Bahamas",
    teaser: "A fully developed 75-acre private island with a deep-water marina and a 3,000ft airstrip.",
    image: "https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg",
    category: 'Island',
    stats: [
      { label: "Acreage", value: "75" },
      { label: "Marina", value: "Deep-Water" },
      { label: "Access", value: "Private Airstrip" }
    ],
    gallery: ["https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg"],
    securityGrade: 'A',
    smartHomeGrade: 'A',
    architecturalStyle: 'Colonial Modern',
    investmentScore: 9.1,
    lifestyleScore: 9.9,
  },
  {
    id: 107,
    codename: "The Sovereign Collection",
    location: "London, Paris, NYC",
    country: "Multiple",
    teaser: "A turnkey portfolio of trophy residential assets in three global capitals.",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    category: 'Portfolio',
    stats: [
      { label: "Assets", value: "3" },
      { label: "Type", value: "Residential" },
      { label: "Status", value: "Tenanted (Yield)" }
    ],
    gallery: ["https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"],
    securityGrade: 'A',
    smartHomeGrade: 'A',
    architecturalStyle: 'Varied',
    investmentScore: 9.7,
    lifestyleScore: 9.5,
    investorPackUrl: 'redacted.pdf'
  }
];