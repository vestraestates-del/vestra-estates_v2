
export type UserTier = 'Elit Access' | 'Diamond Access' | 'Royal Black Access';

export interface MockUser {
    name: string;
    email: string;
    type: 'user' | 'admin';
    tier?: UserTier;
    avatar: string;
    password?: string;
}

export const mockUsers: { [key: string]: MockUser } = {
    'adrian@vestra.com': {
        name: 'Adrian Roth',
        email: 'adrian@vestra.com',
        type: 'user',
        tier: 'Diamond Access',
        password: 'password123',
        avatar: `https://i.pravatar.cc/150?u=adrian`,
    },
    'isabella@vestra.com': {
        name: 'Isabella Rossi',
        email: 'isabella@vestra.com',
        type: 'user',
        tier: 'Elit Access',
        password: 'password123',
        avatar: `https://i.pravatar.cc/150?u=isabella`,
    },
    'sofia@vestra.com': {
        name: 'Sofia Petrova',
        email: 'sofia@vestra.com',
        type: 'user',
        tier: 'Royal Black Access',
        password: 'password123',
        avatar: `https://i.pravatar.cc/150?u=sofia`,
    },
    'admin@vestra.com': {
        name: 'C. Blackwood',
        email: 'admin@vestra.com',
        type: 'admin',
        password: 'adminpassword',
        avatar: `https://i.pravatar.cc/150?u=blackwood`,
    },
};
