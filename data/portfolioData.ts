export interface Amenity {
  nameKey: string;
  icon: string; // Corresponds to a key in iconMap in ServicesPage.tsx
}

export interface PortfolioItem {
  id: number;
  nameKey: string;
  locationKey: string;
  value: string;
  image: string;
  descriptionKey: string;
  featureKeys: string[];
  bedrooms: number;
  bathrooms: number;
  gallery: string[];
  videos?: string[];
  lat: number;
  lon: number;
  amenities?: Amenity[];
  modelUrl?: string;
  priceHistory?: { day: string; value: number }[];
}

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    nameKey: "portfolio.item1.name",
    locationKey: "portfolio.item1.location",
    value: "$115M",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    descriptionKey: "portfolio.item1.description",
    featureKeys: [
      "portfolio.item1.feature1",
      "portfolio.item1.feature2",
      "portfolio.item1.feature3",
      "portfolio.item1.feature4",
      "portfolio.item1.feature5",
      "portfolio.item1.feature6"
    ],
    bedrooms: 8,
    bathrooms: 10,
    gallery: [
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
    ],
    videos: ["https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"],
    lat: 41.042,
    lon: 29.04,
    amenities: [
      { nameKey: "amenities.oceanBreeze", icon: "Wind" },
      { nameKey: "amenities.gym", icon: "Dumbbell" },
      { nameKey: "amenities.cinema", icon: "Film" },
      { nameKey: "amenities.beachAccess", icon: "Waves" },
      { nameKey: "amenities.security", icon: "Shield" },
    ],
    modelUrl: "https://my.matterport.com/show/?m=uRGXgoiYk9f",
    priceHistory: [
      { day: 'Day 1', value: 114.8 },
      { day: 'Day 2', value: 115.1 },
      { day: 'Day 3', value: 115.0 },
      { day: 'Day 4', value: 115.3 },
      { day: 'Day 5', value: 115.2 },
      { day: 'Day 6', value: 114.9 },
      { day: 'Day 7', value: 115.0 },
    ]
  },
  {
    id: 2,
    nameKey: "portfolio.item2.name",
    locationKey: "portfolio.item2.location",
    value: "$75M",
    image: "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg",
    descriptionKey: "portfolio.item2.description",
    featureKeys: [
        "portfolio.item2.feature1",
        "portfolio.item2.feature2",
        "portfolio.item2.feature3",
        "portfolio.item2.feature4",
        "portfolio.item2.feature5",
        "portfolio.item2.feature6"
    ],
    bedrooms: 7,
    bathrooms: 9,
    gallery: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg",
      "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",
    ],
    lat: 39.18,
    lon: -106.82,
    priceHistory: [
      { day: 'Day 1', value: 75.2 },
      { day: 'Day 2', value: 75.1 },
      { day: 'Day 3', value: 75.3 },
      { day: 'Day 4', value: 75.5 },
      { day: 'Day 5', value: 75.4 },
      { day: 'Day 6', value: 75.6 },
      { day: 'Day 7', value: 75.0 },
    ]
  },
  {
    id: 3,
    nameKey: "portfolio.item3.name",
    locationKey: "portfolio.item3.location",
    value: "$640M",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    descriptionKey: "portfolio.item3.description",
    featureKeys: [
        "portfolio.item3.feature1",
        "portfolio.item3.feature2",
        "portfolio.item3.feature3",
        "portfolio.item3.feature4",
        "portfolio.item3.feature5",
        "portfolio.item3.feature6"
    ],
    bedrooms: 14,
    bathrooms: 19,
    gallery: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
    ],
    videos: ["https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
    lat: 43.7,
    lon: 7.31,
    priceHistory: [
      { day: 'Day 1', value: 640.1 },
      { day: 'Day 2', value: 640.0 },
      { day: 'Day 3', value: 639.8 },
      { day: 'Day 4', value: 639.9 },
      { day: 'Day 5', value: 640.2 },
      { day: 'Day 6', value: 640.5 },
      { day: 'Day 7', value: 640.0 },
    ]
  },
  {
    id: 4,
    nameKey: "portfolio.item4.name",
    locationKey: "portfolio.item4.location",
    value: "$45M",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    descriptionKey: "portfolio.item4.description",
    featureKeys: [
        "portfolio.item4.feature1",
        "portfolio.item4.feature2",
        "portfolio.item4.feature3",
        "portfolio.item4.feature4",
        "portfolio.item4.feature5",
        "portfolio.item4.feature6"
    ],
    bedrooms: 5,
    bathrooms: 7,
    gallery: [
      "https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg",
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    ],
    lat: 25.77,
    lon: -80.19,
    amenities: [
      { nameKey: "amenities.gym", icon: "Dumbbell" },
      { nameKey: "amenities.cinema", icon: "Film" },
      { nameKey: "amenities.security", icon: "Shield" },
    ],
    modelUrl: "https://my.matterport.com/show/?m=f23p2sJp8fK",
    priceHistory: [
      { day: 'Day 1', value: 44.9 },
      { day: 'Day 2', value: 45.0 },
      { day: 'Day 3', value: 45.1 },
      { day: 'Day 4', value: 45.0 },
      { day: 'Day 5', value: 45.2 },
      { day: 'Day 6', value: 45.3 },
      { day: 'Day 7', value: 45.0 },
    ]
  },
  {
    id: 5,
    nameKey: "portfolio.item5.name",
    locationKey: "portfolio.item5.location",
    value: "$250M",
    image: "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg",
    descriptionKey: "portfolio.item5.description",
    featureKeys: [
        "portfolio.item5.feature1",
        "portfolio.item5.feature2",
        "portfolio.item5.feature3",
        "portfolio.item5.feature4",
        "portfolio.item5.feature5",
        "portfolio.item5.feature6"
    ],
    bedrooms: 12,
    bathrooms: 15,
    gallery: [
        "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
        "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg",
        "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg",
    ],
    videos: ["https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"],
    lat: 3.2028,
    lon: 73.2207,
    amenities: [
        { nameKey: "amenities.privateMarina", icon: "Waves" },
        { nameKey: "amenities.spaWellness", icon: "Concierge" },
        { nameKey: "amenities.helipadAccess", icon: "Asset" },
    ],
    modelUrl: "https://my.matterport.com/show/?m=JGPfW2m2pUW",
    priceHistory: [
      { day: 'Day 1', value: 250.0 },
      { day: 'Day 2', value: 250.2 },
      { day: 'Day 3', value: 250.1 },
      { day: 'Day 4', value: 250.4 },
      { day: 'Day 5', value: 250.5 },
      { day: 'Day 6', value: 250.3 },
      { day: 'Day 7', value: 250.0 },
    ]
  }
];