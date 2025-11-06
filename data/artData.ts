export interface ArtItem {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  value: string;
  image: string;
  // FIX: Add description property to align with other curated asset types.
  description: string;
}

export const initialArtCollection: ArtItem[] = [
  {
    id: 1,
    title: "Composition with Red, Blue and Yellow",
    artist: "Piet Mondrian",
    year: "1930",
    medium: "Oil on canvas",
    value: "Est. $50.6M",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
    // FIX: Add description data.
    description: "A quintessential work of the De Stijl movement, showcasing Mondrian's theory of Neoplasticism.",
  },
  {
    id: 2,
    title: "No. 5, 1948",
    artist: "Jackson Pollock",
    year: "1948",
    medium: "Oil on fiberboard",
    value: "Est. $140M",
    image: "https://upload.wikimedia.org/wikipedia/en/8/89/No._5%2C_1948.jpg",
    // FIX: Add description data.
    description: "A prime example of Pollock's 'drip' technique and a landmark piece of abstract expressionism.",
  },
  {
    id: 3,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: "1931",
    medium: "Oil on canvas",
    value: "Priceless",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    // FIX: Add description data.
    description: "Dalí's iconic surrealist masterpiece, featuring melting clocks in a dreamlike landscape.",
  },
  {
    id: 4,
    title: "The Son of Man",
    artist: "René Magritte",
    year: "1964",
    medium: "Oil on canvas",
    value: "Est. $30M",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg",
    // FIX: Add description data.
    description: "A famous surrealist self-portrait that explores themes of concealment and the unseen.",
  }
];