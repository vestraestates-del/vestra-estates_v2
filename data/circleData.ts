
export interface CircleMember {
  id: number;
  name: string;
  // FIX: Added 'email' to the CircleMember interface to allow filtering by email,
  // resolving a TypeScript error in App.tsx.
  email: string;
  title: string;
  company: string;
  avatar: string;
  online: boolean;
  interests: string[];
  gender: 'male' | 'female' | 'neutral';
  tier: 'Elit Access' | 'Diamond Access' | 'Royal Black Access';
  invitationCode?: string | null;
}

export const circleMembers: CircleMember[] = [
  { id: 1, name: "Adrian Roth", email: "adrian@vestra.com", title: "Founder & CEO", company: "Aethelred Capital", avatar: `https://i.pravatar.cc/150?u=adrian`, online: true, interests: ["Fintech", "Geopolitics", "Classic Cars"], gender: 'male', tier: 'Diamond Access', invitationCode: 'AR-001' },
  { id: 2, name: "Isabella Rossi", email: "isabella@vestra.com", title: "Art Curator", company: "The Rossi Collection", avatar: `https://i.pravatar.cc/150?u=isabella`, online: true, interests: ["Renaissance Art", "Yachting", "Philanthropy"], gender: 'female', tier: 'Elit Access', invitationCode: 'IR-002' },
  { id: 3, name: "Kenji Tanaka", email: "kenji.tanaka@cyberdyne.com", title: "Tech Visionary", company: "Cyberdyne Systems", avatar: `https://i.pravatar.cc/150?u=kenji`, online: false, interests: ["AI Ethics", "Go", "Architecture"], gender: 'male', tier: 'Elit Access', invitationCode: 'KT-003' },
  { id: 4, name: "Sofia Petrova", email: "sofia@vestra.com", title: "Principal", company: "Petrova Real Estate", avatar: `https://i.pravatar.cc/150?u=sofia`, online: true, interests: ["Sustainable Development", "Equestrian", "Haute Couture"], gender: 'female', tier: 'Royal Black Access', invitationCode: 'SP-004' },
  { id: 5, name: "Charles Dubois", email: "charles.dubois@chateaudubois.com", title: "Vintner", company: "Château Dubois", avatar: `https://i.pravatar.cc/150?u=charles`, online: false, interests: ["Oenology", "Sailing", "History"], gender: 'male', tier: 'Elit Access', invitationCode: 'CD-005' },
  // FIX: Added 'C. Blackwood' to the circleMembers array. He is the private desk contact
  // and was missing, which would cause a runtime error on the Private Desk page.
  { id: 6, name: "C. Blackwood", email: "admin@vestraestates.com", title: "Senior Partner, Private Desk", company: "VESTRA ESTATES", avatar: `https://i.pravatar.cc/150?u=blackwood`, online: true, interests: ["Discreet Services", "Security", "Global Logistics"], gender: 'male', tier: 'Royal Black Access', invitationCode: null },
];