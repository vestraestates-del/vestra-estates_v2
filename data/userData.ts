// This is the full content of data/userData.ts

import type { User } from '../App';

export type AccountStatus = 'Active' | 'Pending' | 'Banned';

export interface MockUser extends User {
    password?: string;
    firstLogin?: boolean;
    country?: string;
    accountStatus?: AccountStatus;
    assignedConcierge?: string;
    notes?: string;
}

export const mockUsers: { [key: string]: MockUser } = {
    'adrian@vestra.com': {
        name: "Adrian Roth",
        email: 'adrian@vestra.com',
        type: 'user',
        tier: 'Diamond Access',
        password: 'password',
        firstLogin: true,
        country: 'Switzerland',
        accountStatus: 'Active',
        assignedConcierge: 'C. Blackwood',
        notes: 'Primary contact for Aethelred Capital. Interests: Classic Cars, Geopolitics.',
    },
    'sofia@vestra.com': {
        name: "Sofia Petrova",
        email: 'sofia@vestra.com',
        type: 'user',
        tier: 'Royal Black Access',
        password: 'password',
        firstLogin: false,
        country: 'Monaco',
        accountStatus: 'Active',
        assignedConcierge: 'C. Blackwood',
        notes: 'Lead on sustainable development projects.',
    },
    'isabella@vestra.com': {
        name: "Isabella Rossi",
        email: 'isabella@vestra.com',
        type: 'user',
        tier: 'Elit Access',
        password: 'password',
        firstLogin: false,
        country: 'Italy',
        accountStatus: 'Active',
        assignedConcierge: 'A. Dubois',
        notes: 'Curator for The Rossi Collection. Focus on Renaissance Art.',
    },
    'admin@vestra.com': {
        name: "C. Blackwood",
        email: 'admin@vestra.com',
        type: 'admin',
        tier: 'Royal Black Access',
        password: 'admin',
        firstLogin: false,
        country: 'United Kingdom',
        accountStatus: 'Active',
        assignedConcierge: 'Self',
        notes: 'Platform Administrator.',
    },
    'new.applicant@vestra.com': {
        name: "New Applicant",
        email: 'new.applicant@vestra.com',
        type: 'user',
        tier: 'Elit Access',
        password: 'password',
        firstLogin: true,
        country: 'USA',
        accountStatus: 'Pending',
        assignedConcierge: '',
        notes: 'Awaiting verification after tier selection.',
    }
};