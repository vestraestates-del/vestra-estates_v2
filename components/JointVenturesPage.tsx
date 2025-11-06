

import React from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { JointVenture } from '../data/jointVenturesData';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';
import Button from './ui/Button';

interface JointVenturesPageProps {
    ventures: JointVenture[];
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const JointVenturesPage: React.FC<JointVenturesPageProps> = ({ ventures, onAddRequest }) => {
    const { t } = useLocalization();

    const handleExpressInterest = (venture: JointVenture) => {
        const newRequest: Omit<RequestItem, 'id' | 'requester'> = {
            type: 'Joint Venture',
            title: `Express Interest in: ${venture.title}`,
            assignee: 'Senior Partner',
            status: 'Pending',
        };
        onAddRequest(newRequest);
        alert('Your expression of interest has been confidentially registered. A Senior Partner will be in contact to provide the full prospectus.');
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Joint Ventures & Co-Investment</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Exclusive opportunities to partner in high-growth, off-market ventures curated for The Circle.</p>
            </header>

            <div className="space-y-12 max-w-5xl mx-auto">
                {ventures.map(venture => (
                    <div key={venture.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
                        <div className="md:w-1/3">
                            <img src={venture.image} alt={venture.title} className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="md:w-2/3 p-8 flex flex-col">
                            <div>
                                <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{venture.category} - {venture.location}</p>
                                <h2 className="text-2xl font-bold text-white mt-1">{venture.title}</h2>
                                <p className="text-gray-300 mt-3 leading-relaxed flex-grow">{venture.description}</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-xs text-gray-400">Investment Size</p>
                                    <p className="text-lg font-semibold text-white">{venture.investmentSize}</p>
                                    <p className="text-xs text-gray-400 mt-2">Projected IRR</p>
                                    <p className="text-lg font-semibold text-cyan-300">{venture.expectedReturn}</p>
                                </div>
                                <Button size="lg" onClick={() => handleExpressInterest(venture)}>
                                    Request Prospectus
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JointVenturesPage;
