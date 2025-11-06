
export interface RentalItem {
  id: number;
  name: string;
  location: string;
  type: 'Yacht' | 'Private Island' | 'Chalet' | 'Jet';
  price: string;
  image: string;
  description: string;
}

export const initialSpecialRentals: RentalItem[] = [
  {
    id: 1,
    name: "M/Y Serenity",
    location: "Monaco, Port Hercules",
    type: 'Yacht',
    price: "€850,000/week",
    image: "https://images.pexels.com/photos/163236/luxury-yacht-yacht-yacht-charter-yacht-holiday-163236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A 72-meter superyacht featuring a beach club, a cinema, and accommodation for 12 guests, serviced by a crew of 30."
  },
  {
    id: 2,
    name: "Calivigny Island",
    location: "Grenada, Caribbean",
    type: 'Private Island',
    price: "$132,000/night",
    image: "https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "An exclusive private island escape with two grand residences, a fleet of boats, and a host of water sports."
  },
  {
    id: 3,
    name: "Chalet Edelweiss",
    location: "Courchevel 1850, France",
    type: 'Chalet',
    price: "From €350,000/week",
    image: "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The largest and most luxurious chalet in the Alps, offering ski-in/ski-out access, a private nightclub, and a two-story spa."
  },
  {
    id: 4,
    name: "Gulfstream G650ER",
    location: "Global Charter",
    type: 'Jet',
    price: "Approx. $15,000/hour",
    image: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The pinnacle of private aviation. A top-of-the-line ultra-long-range jet connecting continents with unrivaled speed and comfort."
  },
];
