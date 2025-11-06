import React, { useState } from 'react';
import type { LogoConfig } from './icons/VestraLogo';
import { VestraLogo } from './icons/VestraLogo';
import { CloseIcon, CheckCircleIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import VerificationModal from './VerificationModal';

interface MembershipTiersPageProps {
  onBack: () => void;
  backgroundImage: string;
  logoConfig: LogoConfig;
}

const tiers = [
    {
        name: 'Elit Access',
        price: 'By Invitation',
        features: [
            'Dedicated Senior Partner',
            'Full Portfolio Access',
            'Bespoke Acquisition Strategy',
            '24/7 Global Concierge',
            'Exclusive Event Access',
            'Priority Asset Liquidation',
            'Comprehensive Risk Management'
        ],
        highlight: false,
    },
    {
        name: 'Diamond Access',
        price: 'Price on Application',
        features: [
            "All 'Elit Access' benefits",
            'Direct line to the Chairman',
            'Veto rights on Circle admissions',
            'Bespoke off-market opportunities',
            'Co-investment opportunities',
            'Personal security detail on demand',
            'Seat on the Philanthropic Board'
        ],
        highlight: true,
    },
    {
        name: 'Royal Black Access',
        price: 'By Nomination',
        features: [
            "All 'Diamond Access' benefits",
            'Multi-generational wealth planning',
            'Family office integration',
            'Succession planning services',
            'Art & passion asset curation',
            'Private aircraft & yacht management',
            'Guaranteed anonymity'
        ],
        highlight: false,
    },
];

const MembershipTiersPage: React.FC<MembershipTiersPageProps> = ({ onBack, backgroundImage, logoConfig }) => {
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    const handleSelectTier = (tierName: string) => {
        setSelectedTier(tierName);
        setIsVerificationOpen(true);
    };

    return (
        <>
            <div 
                className="flex h-screen w-screen items-center justify-center bg-black bg-cover bg-center transition-all duration-1000 p-4" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="w-full max-w-5xl rounded-xl border border-gray-800 bg-[#111116]/60 p-8 shadow-2xl backdrop-blur-lg animate-fade-in relative">
                    <button onClick={onBack} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                    <div className="mb-8 flex flex-col items-center">
                        <VestraLogo config={logoConfig} size={logoConfig.loginSize} className="text-cyan-400" />
                        <h1 className="mt-4 text-3xl font-bold text-white text-glow">VESTRA MEMBERSHIP</h1>
                        <p className="text-sm text-gray-400">Join an exclusive circle of global leaders.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier) => (
                            <div key={tier.name} className={`flex flex-col rounded-lg p-6 border transition-all duration-300 ${tier.highlight ? 'bg-cyan-900/20 border-cyan-500/50 scale-105' : 'bg-white/5 border-gray-800 hover:border-gray-700'}`}>
                                <div>
                                    <h2 className={`text-2xl font-bold ${tier.highlight ? 'text-cyan-400' : 'text-white'}`}>{tier.name}</h2>
                                    <p className="text-lg font-semibold text-gray-400 mt-1 mb-6">{tier.price}</p>
                                    <ul className="space-y-3 text-left">
                                        {tier.features.map(feature => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto pt-6">
                                    <Button className="w-full" onClick={() => handleSelectTier(tier.name)}>
                                        Select Membership
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isVerificationOpen && selectedTier && (
                <VerificationModal 
                    selectedTier={selectedTier}
                    onClose={() => setIsVerificationOpen(false)}
                    onVerified={() => {
                        setIsVerificationOpen(false);
                        alert("Verification successful. An advisor will contact you shortly.");
                    }}
                />
            )}
        </>
    );
};

export default MembershipTiersPage;