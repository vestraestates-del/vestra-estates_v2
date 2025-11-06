export interface WatchItem {
    id: number;
    brand: string;
    model: string;
    reference: string;
    value: string;
    image: string;
    description: string;
}

export const initialWatches: WatchItem[] = [
    {
        id: 1,
        brand: "Patek Philippe",
        model: "Grandmaster Chime",
        reference: "6300G-010",
        value: "Price on Request",
        image: "https://images.pexels.com/photos/10837537/pexels-photo-10837537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "The most complicated Patek Philippe wristwatch ever made, boasting 20 complications in a reversible case.",
    },
    {
        id: 2,
        brand: "Audemars Piguet",
        model: "Royal Oak Concept 'Black Panther'",
        reference: "26620IO.OO.D002CA.01",
        value: "Est. $5.2M",
        image: "https://images.pexels.com/photos/16130453/pexels-photo-16130453/free-photo-of-close-up-of-an-audemars-piguet-watch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A limited edition flying tourbillon, celebrating the Marvel superhero with a hand-painted white gold 3D figure.",
    },
    {
        id: 3,
        brand: "Richard Mille",
        model: "RM 56-02 Sapphire",
        reference: "RM 56-02",
        value: "Est. $2.2M",
        image: "https://images.pexels.com/photos/9980860/pexels-photo-9980860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "An engineering marvel with a case crafted entirely from sapphire crystal, revealing a unique cable-suspended movement.",
    },
    {
        id: 4,
        brand: "Vacheron Constantin",
        model: "Les Cabinotiers Celestia",
        reference: "9720C/000G-B281",
        value: "Est. $1.0M+",
        image: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A one-of-a-kind astronomical masterpiece featuring 23 complications on two dials, displaying three different time measurements.",
    }
];
