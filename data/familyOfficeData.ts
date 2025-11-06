
export interface FamilyOfficeService {
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: 'Building' | 'Cloud';
}

export const familyOfficeServices: FamilyOfficeService[] = [
    {
        id: 'virtual-fo',
        title: 'Virtual Family Office (VFO) Integration',
        description: 'Seamlessly augment your existing advisory team with VESTRA\'s specialized expertise. We provide on-demand access to our global network, asset management intelligence, and consolidated reporting, all integrated into your current structure.',
        features: [
            'Consolidated Asset Reporting',
            'On-Demand Specialist Access',
            'Risk Management Overlay',
            'Secure Digital Vault'
        ],
        icon: 'Cloud'
    },
    {
        id: 'full-service-fo',
        title: 'Full-Service Family Office Establishment',
        description: 'A complete, turnkey solution for creating a dedicated, single-family office. VESTRA handles every aspect, from legal and corporate structuring to talent acquisition and operational management, building an institution designed to serve your family for generations.',
        features: [
            'Legal & Corporate Structuring',
            'C-Suite Talent Acquisition',
            'Investment Policy Statement Design',
            'Day-to-Day Operational Management'
        ],
        icon: 'Building'
    }
];
