
export interface PassionAsset {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: 'Art' | 'Watch' | 'Car' | 'Jewel' | 'Wine';
}

export interface ManagedCollectionSummary {
    totalValue: string;
    collections: number;
    topAsset: string;
}

export const passionAssetModules: PassionAsset[] = [
    {
        id: 'fine-art',
        title: 'Fine Art Advisory',
        subtitle: 'Curating a Legacy, One Masterpiece at a Time',
        description: 'Our in-house art historians and market analysts provide discreet advisory on acquiring, managing, and divesting museum-quality art. We offer collection strategy, provenance verification, and access to private sales.',
        icon: 'Art'
    },
    {
        id: 'haute-horlogerie',
        title: 'Haute Horlogerie',
        subtitle: 'Acquiring Complications, Investing in Craft',
        description: 'Navigate the intricate world of high-end watchmaking. We provide access to rare and limited-edition timepieces from master watchmakers, advising on both their horological significance and investment potential.',
        icon: 'Watch'
    },
    {
        id: 'rare-automobiles',
        title: 'Rare Automobiles',
        subtitle: 'The Apex of Automotive Art and Engineering',
        description: 'From concours-winning classics to modern hypercars, our automotive specialists assist in sourcing, authenticating, and managing the world\'s most sought-after vehicles. We facilitate private transactions and collection management.',
        icon: 'Car'
    }
];

export const managedCollectionSummary: ManagedCollectionSummary = {
    totalValue: "Est. $450M",
    collections: 3,
    topAsset: "1962 Ferrari 250 GTO"
};