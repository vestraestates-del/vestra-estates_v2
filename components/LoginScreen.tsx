import React, { useState } from 'react';
import { VestraLogo, LogoConfig } from './icons/VestraLogo';
// FIX: Add file extension to App.tsx import
import { User } from '../App.tsx';
import Button from './ui/Button';

interface LoginScreenProps {
  onLogin: (user: User, email: string) => void;
  onShowTiers: () => void;
  logoConfig: LogoConfig;
  backgroundImage: string;
  mockUsers: { [key: string]: User };
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShowTiers, logoConfig, backgroundImage, mockUsers }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginAttempt = (e: React.FormEvent) => {
        e.preventDefault();
        const user = mockUsers[email.toLowerCase()];

        // In a real app, password would be hashed and checked on a server.
        // This is a simple mock for demonstration. 'password' is the valid pass for all users.
        if (user && password === 'password') {
            onLogin(user, email.toLowerCase());
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div 
            className="flex h-screen w-screen items-center justify-center bg-black bg-cover bg-center transition-all duration-1000 p-4" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-sm rounded-xl border border-gray-800 bg-[#111116]/60 p-8 shadow-2xl backdrop-blur-lg animate-fade-in">
                <div className="mb-8 flex flex-col items-center text-center">
                    <VestraLogo config={logoConfig} size={logoConfig.loginSize} className="text-cyan-400" />
                    <p className="mt-6 text-lg font-medium text-gray-200">Ultra-Luxury Real Estate for the World's Top 0.1%.</p>
                    <p className="mt-2 text-sm text-gray-400">Secure Client Portal</p>
                </div>

                <form onSubmit={handleLoginAttempt}>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                                placeholder="Email (e.g., adrian@vestra.com)"
                            />
                        </div>
                         <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                                placeholder="Password (e.g., password)"
                            />
                        </div>
                    </div>

                    {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
                    
                    <div className="mt-6">
                        <Button type="submit" className="w-full">
                            Secure Sign In
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <button type="button" onClick={onShowTiers} className="font-medium text-cyan-400 hover:text-cyan-300">
                           View Membership Tiers
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;