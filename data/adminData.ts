// For LoginSecurity.tsx & UserManagement.tsx
export type SubscriptionPackage = 'Elit Access' | 'Diamond Access' | 'Royal Black Access';
export type AccountStatus = 'Active' | 'Pending' | 'Rejected' | 'Banned';
export type UserRole = 'Admin' | 'Content Manager' | 'Concierge Manager' | 'Support';

export interface AdminUser {
  id: number;
  name: string;
  country: string;
  subscription: SubscriptionPackage;
  accountStatus: AccountStatus;
  vipTag?: string;
  assignedConcierge?: string;
  notes: string;
}

export const adminUsers: AdminUser[] = [
  { id: 1, name: "Adrian Roth", country: "Switzerland", subscription: 'Diamond Access', accountStatus: 'Active', vipTag: 'Founding Member', assignedConcierge: 'C. Blackwood', notes: 'Primary contact for Aethelred Capital. Interests: Classic Cars, Geopolitics.' },
  { id: 2, name: "Isabella Rossi", country: "Italy", subscription: 'Elit Access', accountStatus: 'Active', vipTag: '', assignedConcierge: 'A. Dubois', notes: 'Curator for The Rossi Collection. Focus on Renaissance Art.' },
  { id: 3, name: "Kenji Tanaka", country: "Japan", subscription: 'Elit Access', accountStatus: 'Active', vipTag: 'Tech Council', assignedConcierge: 'C. Blackwood', notes: 'Key figure in AI ethics discussions.' },
  { id: 4, name: "Sofia Petrova", country: "Monaco", subscription: 'Royal Black Access', accountStatus: 'Active', vipTag: 'Equestrian Patron', assignedConcierge: 'C. Blackwood', notes: 'Lead on sustainable development projects.' },
  { id: 5, name: "Charles Dubois", country: "France", subscription: 'Elit Access', accountStatus: 'Banned', vipTag: '', assignedConcierge: 'N/A', notes: 'Account suspended due to policy violation.' },
  { id: 6, name: "New Applicant", country: "USA", subscription: 'Royal Black Access', accountStatus: 'Pending', vipTag: '', assignedConcierge: '', notes: 'Awaiting verification.' },
];

// For InvitationSystem.tsx
export interface Invitation {
    id: number;
    email: string;
    code: string;
    status: 'Pending' | 'Accepted' | 'Expired';
    sentAt: string;
    expiresAt: string;
}

export const invitations: Invitation[] = [
    { id: 1, email: 'prospect1@example.com', code: 'VSTR-ABCD-EFGH', status: 'Accepted', sentAt: '2024-06-01', expiresAt: '2024-06-08' },
    { id: 2, email: 'prospect2@example.com', code: 'VSTR-IJKL-MNOP', status: 'Pending', sentAt: '2024-07-15', expiresAt: '2024-07-22' },
    { id: 3, email: 'prospect3@example.com', code: 'VSTR-QRST-UVWX', status: 'Expired', sentAt: '2024-05-10', expiresAt: '2024-05-17' },
];

// For Cms.tsx & MenuEditorModal.tsx
export interface MenuItem {
    id: number;
    label: string;
    path: string;
}

export const initialMenuItems: MenuItem[] = [
    { id: 1, label: 'DASHBOARD', path: '/dashboard' },
    { id: 2, label: 'FEATURED ESTATES', path: '/asset-management' },
    { id: 3, label: 'THE CIRCLE', path: '/circle' },
];

// For SystemSettings.tsx
export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  user: string;
  action: string;
}

export const initialLogs: LogEntry[] = [
  { id: 1, timestamp: new Date().toISOString(), level: 'INFO', user: 'Admin', action: 'Accessed Admin Panel.' },
  { id: 2, timestamp: new Date().toISOString(), level: 'INFO', user: 'adrian@vestra.com', action: 'Logged in successfully.' },
  { id: 3, timestamp: new Date().toISOString(), level: 'WARN', user: 'system', action: 'API latency detected for Gemini endpoint.' },
  { id: 4, timestamp: new Date().toISOString(), level: 'ERROR', user: 'kenji@vestra.com', action: 'Failed login attempt (invalid password).' },
];
