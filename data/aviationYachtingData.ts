
export interface AviationYachtingService {
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: 'Plane' | 'Boat';
}

export interface FleetAsset {
    id: number;
    name: string;
    type: 'Aircraft' | 'Yacht';
    model: string;
    status: 'On Standby' | 'In Transit' | 'Maintenance';
    location: string;
}

export const aviationYachtingServices: AviationYachtingService[] = [
    {
        id: 'aviation',
        title: 'Private Aviation Management',
        description: 'A comprehensive, turnkey solution for aircraft ownership and charter. We manage everything from acquisition and crewing to maintenance and flight operations, ensuring your asset is always ready and optimized for your travel needs.',
        features: [
            'Aircraft Acquisition & Sales',
            'Full Operational Management',
            'Charter Revenue Optimization',
            'Regulatory Compliance'
        ],
        icon: 'Plane'
    },
    {
        id: 'yachting',
        title: 'Superyacht Management',
        description: 'Our world-class yacht management service covers every aspect of owning a superyacht. From crew placement and itinerary planning to financial administration and technical support, we ensure a seamless ownership experience.',
        features: [
            'New Build & Refit Supervision',
            'Global Crew Management',
            'Itinerary Planning & Concierge',
            'Financial & ISM/ISPS Compliance'
        ],
        icon: 'Boat'
    }
];

export const fleetAssets: FleetAsset[] = [
    { id: 1, name: "G-VSTR", type: 'Aircraft', model: 'Gulfstream G700', status: 'On Standby', location: 'Geneva (LSGG)' },
    { id: 2, name: "M/Y VESTRA", type: 'Yacht', model: 'Lürssen 95m', status: 'In Transit', location: 'Cruising, Mediterranean Sea' },
    { id: 3, name: "N789VE", type: 'Aircraft', model: 'Sikorsky S-92 (Heli)', status: 'Maintenance', location: 'London (EGLC)' },
];