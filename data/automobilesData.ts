
export interface AutomobileItem {
    id: number;
    make: string;
    model: string;
    year: number;
    value: string;
    image: string;
    description: string;
}

export const initialAutomobiles: AutomobileItem[] = [
    {
        id: 1,
        make: "Ferrari",
        model: "250 GTO",
        year: 1962,
        value: "Est. $70M",
        image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Considered the holy grail of sports cars, one of only 36 built. A legend in both beauty and racing pedigree."
    },
    {
        id: 2,
        make: "Aston Martin",
        model: "DB5",
        year: 1964,
        value: "Est. $6.4M (Goldfinger Spec)",
        image: "https://images.pexels.com/photos/39504/aston-martin-db5-oldtimer-classic-car-39504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "The most famous car in the world, forever linked with James Bond. An icon of British engineering and timeless style."
    },
    {
        id: 3,
        make: "Bugatti",
        model: "La Voiture Noire",
        year: 2019,
        value: "$18.7M (Sold)",
        image: "https://images.pexels.com/photos/15982136/pexels-photo-15982136/free-photo-of-a-black-bugatti-chiron-super-sport-on-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A one-of-a-kind masterpiece and a modern tribute to Jean Bugatti's personal Type 57 SC Atlantic. The ultimate in automotive haute couture."
    },
    {
        id: 4,
        make: "McLaren",
        model: "F1 LM",
        year: 1995,
        value: "Est. $25M+",
        image: "https://images.pexels.com/photos/7126149/pexels-photo-7126149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A road-legal version of the Le Mans-winning GTR. One of only five in existence, representing the peak of 90s supercar engineering."
    },
    {
        id: 5,
        make: "Rolls-Royce",
        model: "Phantom",
        year: 2024,
        value: "$600K",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        description: "The pinnacle of automotive luxury and bespoke craftsmanship, offering an unparalleled serene driving experience."
    }
];
