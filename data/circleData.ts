
export interface CircleMember {
  id: number;
  name: string;
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
  { id: 1, name: "Adrian Roth", title: "Founder & CEO", company: "Aethelred Capital", avatar: `https://i.pravatar.cc/150?u=adrian`, online: true, interests: ["Fintech", "Geopolitics", "Classic Cars"], gender: 'male', tier: 'Diamond Access', invitationCode: 'AR-001' },
  { id: 2, name: "Isabella Rossi", title: "Art Curator", company: "The Rossi Collection", avatar: `https://i.pravatar.cc/150?u=isabella`, online: true, interests: ["Renaissance Art", "Yachting", "Philanthropy"], gender: 'female', tier: 'Elit Access', invitationCode: 'IR-002' },
  { id: 3, name: "Kenji Tanaka", title: "Tech Visionary", company: "Cyberdyne Systems", avatar: `https://i.pravatar.cc/150?u=kenji`, online: false, interests: ["AI Ethics", "Go", "Architecture"], gender: 'male', tier: 'Elit Access', invitationCode: 'KT-003' },
  { id: 4, name: "Sofia Petrova", title: "Principal", company: "Petrova Real Estate", avatar: `https://i.pravatar.cc/150?u=sofia`, online: true, interests: ["Sustainable Development", "Equestrian", "Haute Couture"], gender: 'female', tier: 'Royal Black Access', invitationCode: 'SP-004' },
  { id: 5, name: "Charles Dubois", title: "Vintner", company: "Château Dubois", avatar: `https://i.pravatar.cc/150?u=charles`, online: false, interests: ["Oenology", "Sailing", "History"], gender: 'male', tier: 'Elit Access', invitationCode: 'CD-005' },
];