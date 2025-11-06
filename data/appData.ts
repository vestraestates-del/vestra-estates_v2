
export interface AgendaItem {
  id: number;
  time: string;
  title: string;
  location: string;
  completed: boolean;
  notes?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface RequestItem {
  id: number;
  title: string;
  type: 'Approval' | 'Action' | 'Information' | 'Joint Venture' | 'Philanthropy' | 'Succession' | 'Wealth Planning';
  assignee: string;
  status: 'Urgent' | 'Pending' | 'In Progress' | 'Completed';
  requester?: string;
  details?: string;
}

export interface MandateItem {
    id: number;
    propertyType: string;
    region: string;
    budgetMin: number;
    budgetMax: number;
    features: string;
    status: 'Pending Review' | 'Active Search' | 'Match Found' | 'Ghost Bid Submitted' | 'Seller Interested' | 'Seller Countered' | 'Negotiating' | 'Closed' | 'Rejected';
    submittedDate: string;
    financialDocUrl?: string;
    ghostBidRangeMin?: number;
    ghostBidRangeMax?: number;
    ghostBidMessage?: string;
    ghostBidFinancialDocUrl?: string;
}

export const initialAgendaItems: AgendaItem[] = [
  { id: 1, time: "09:00", title: "Portfolio Review with Aethelred Capital", location: "Virtual Call", completed: false, priority: 'High', notes: 'Discuss Q3 strategy for the European portfolio.' },
  { id: 2, time: "11:30", title: "Finalize Acquisition of 'The Bosphorus Estate'", location: "Law Offices of Dubois & Fils", completed: false, priority: 'High' },
  { id: 3, time: "14:00", title: "Art Curation Meeting", location: "The Rossi Collection Gallery", completed: true, priority: 'Medium' },
  { id: 4, time: "18:30", title: "Dinner with Kenji Tanaka", location: "Le Cercle de l'Union interalliée", completed: false, priority: 'Low', notes: 'Topic: Potential joint venture in AI ethics.' },
];

export const initialRequestItems: RequestItem[] = [
  { id: 1, title: "Arrange security detail for Monaco Grand Prix", type: 'Action', assignee: "C. Blackwood", status: 'Urgent', requester: 'Adrian Roth' },
  { id: 2, title: "Review and approve Q2 philanthropic disbursements", type: 'Approval', assignee: "A. Roth", status: 'Pending', requester: 'Adrian Roth' },
  { id: 3, title: "Source 1958 Ferrari 250 Testa Rossa", type: 'Action', assignee: "Auto Curator", status: 'In Progress', requester: 'Adrian Roth' },
  { id: 4, title: "Provide prospectus for 'Project Hyperion'", type: 'Information', assignee: "Senior Partner", status: 'Completed', requester: 'Adrian Roth' },
];

export const initialMandates: MandateItem[] = [
    {
        id: 1,
        propertyType: 'Private Island',
        region: 'Caribbean Sea',
        budgetMin: 50,
        budgetMax: 150,
        features: 'Must include a private deep-water marina, a primary residence with at least 8 suites, and self-sufficient power/water generation capabilities. Airstrip is highly preferred.',
        status: 'Match Found',
        submittedDate: '2024-05-20',
        financialDocUrl: 'redacted.pdf'
    },
    {
        id: 2,
        propertyType: 'Historic European Castle',
        region: 'Tuscany, Italy or Provence, France',
        budgetMin: 30,
        budgetMax: 70,
        features: 'Must be fully restored with modern amenities while preserving historical integrity. Vineyard or significant agricultural land is a key requirement. Minimum of 10 bedrooms.',
        status: 'Active Search',
        submittedDate: '2024-06-10',
        financialDocUrl: 'redacted.pdf'
    }
];

export const portfolioHistoryData: { month: string; value: number }[] = [
  { month: 'Jan', value: 980 }, { month: 'Feb', value: 995 },
  { month: 'Mar', value: 1010 }, { month: 'Apr', value: 1025 },
  { month: 'May', value: 1050 }, { month: 'Jun', value: 1075 },
];

export const marketComparisonData: { month: string; portfolio: number; luxuryIndex: number; globalIndex: number }[] = [
  { month: 'Jan', portfolio: 2.1, luxuryIndex: 1.5, globalIndex: 0.8 },
  { month: 'Feb', portfolio: 2.5, luxuryIndex: 1.8, globalIndex: 1.1 },
  { month: 'Mar', portfolio: 3.2, luxuryIndex: 2.2, globalIndex: 1.5 },
  { month: 'Apr', portfolio: 4.0, luxuryIndex: 2.8, globalIndex: 1.9 },
  { month: 'May', portfolio: 5.5, luxuryIndex: 3.5, globalIndex: 2.4 },
  { month: 'Jun', portfolio: 6.8, luxuryIndex: 4.1, globalIndex: 2.8 },
];
