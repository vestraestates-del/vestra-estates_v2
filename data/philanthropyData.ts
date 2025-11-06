
// FIX: Create philanthropy data file with mock data and types to resolve module resolution errors.
export interface PhilanthropyProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  goal: string;
  raised: string;
}

export const initialPhilanthropyProjects: PhilanthropyProject[] = [
  {
    id: 1,
    title: "Ocean Cleanup Initiative",
    category: "Environmental Conservation",
    description: "Funding advanced technologies to remove plastic waste from our oceans. This project supports the development of autonomous systems for large-scale cleanup operations.",
    image: "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    goal: "$25M",
    raised: "$18.5M"
  },
  {
    id: 2,
    title: "Global Literacy Program",
    category: "Education",
    description: "Providing educational resources and establishing learning centers in underserved communities worldwide. Our focus is on empowering the next generation through digital literacy and access to information.",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    goal: "$15M",
    raised: "$11.2M"
  },
  {
    id: 3,
    title: "Heritage Site Preservation",
    category: "Cultural Heritage",
    description: "A fund dedicated to the restoration and preservation of endangered world heritage sites, ensuring these cultural treasures are protected for future generations.",
    image: "https://images.pexels.com/photos/326874/pexels-photo-326874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    goal: "$30M",
    raised: "$22.8M"
  }
];