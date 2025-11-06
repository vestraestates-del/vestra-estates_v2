export interface JewelItem {
    id: number;
    name: string;
    designer: string;
    type: string;
    value: string;
    image: string;
    description: string;
}

export const initialJewels: JewelItem[] = [
    {
        id: 1,
        name: "The Oppenheimer Blue Diamond",
        designer: "Unknown",
        type: "Ring",
        value: "$57.5M (Auction)",
        image: "https://images.pexels.com/photos/10983637/pexels-photo-10983637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "The largest Vivid Blue diamond ever offered at auction. Its exceptional color and classic emerald cut make it a true treasure of nature."
    },
    {
        id: 2,
        name: "L'Incomparable Diamond Necklace",
        designer: "Mouawad",
        type: "Necklace",
        value: "$55M",
        image: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Features the world's largest internally flawless diamond. A breathtaking piece of artistry and gemological significance."
    },
    {
        id: 3,
        name: "The Graff Pink",
        designer: "Graff Diamonds",
        type: "Ring",
        value: "$46.2M",
        image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "An exceptionally rare 24.78-carat fancy intense pink diamond, described as one of the greatest diamonds ever discovered."
    },
    {
        id: 4,
        name: "Cartier 'Tutti Frutti' Bracelet",
        designer: "Cartier",
        type: "Bracelet",
        value: "Est. $2M+",
        image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "An iconic Art Deco masterpiece, featuring a vibrant composition of carved sapphires, emeralds, and rubies."
    }
];
