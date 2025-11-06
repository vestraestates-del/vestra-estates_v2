export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string; // Full content for editor
}

export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Branded Residences",
    author: "Admin",
    date: "2024-07-20",
    image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
    content: "Branded residences represent the pinnacle of luxury living, combining the prestige of a world-class brand with the comfort and permanence of a private home. This trend is accelerating in key global cities, offering investors not just a property, but a lifestyle package with guaranteed service levels and potential for higher rental yields."
  },
  {
    id: 2,
    title: "Navigating the Off-Market Landscape",
    author: "Admin",
    date: "2024-06-15",
    image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg",
    content: "The world of off-market real estate is opaque by design, offering unparalleled opportunities for the discerning buyer. Access requires a trusted network and the ability to act decisively. Key benefits include privacy, exclusivity, and the potential to acquire unique assets before they are exposed to the broader market."
  }
];
