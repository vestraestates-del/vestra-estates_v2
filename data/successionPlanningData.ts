
export interface SuccessionStep {
    id: number;
    title: string;
    description: string;
    icon: 'Eye' | 'Users' | 'BookOpen' | 'Key';
}

export const successionPlanningSteps: SuccessionStep[] = [
    {
        id: 1,
        title: 'Phase 1: Vision & Governance',
        description: 'Collaborative workshops to define the family\'s long-term vision, establish a robust governance framework, and create a family constitution that will guide future generations.',
        icon: 'Eye'
    },
    {
        id: 2,
        title: 'Phase 2: Next-Generation Assessment',
        description: 'Discreet and comprehensive evaluation of potential successors. We identify strengths, development areas, and provide tailored mentorship programs from industry leaders within The Circle.',
        icon: 'Users'
    },
    {
        id: 3,
        title: 'Phase 3: Structural & Financial Transition',
        description: 'Designing the optimal legal and financial structures for the transfer of assets, operating businesses, and investment entities, ensuring tax efficiency and capital preservation.',
        icon: 'BookOpen'
    },
    {
        id: 4,
        title: 'Phase 4: Leadership Handover',
        description: 'A carefully managed transition process, providing ongoing strategic counsel to both the outgoing and incoming leadership to ensure continuity, stability, and sustained growth.',
        icon: 'Key'
    }
];
