
import React from 'react';
import WidgetCard from '../ui/WidgetCard';
import { FlowIcon, CheckCircleIcon } from '../icons/EliteIcons';
import type { PortfolioItem } from '../../data/portfolioData';
import { useLocalization } from '../../localization/LocalizationContext';

interface CollectionFlowWidgetProps {
  portfolioItems: PortfolioItem[];
}

interface CollectionStep {
    id: number;
    name: string;
    details: string;
    status: 'completed' | 'current' | 'upcoming';
}

// FIX: Added mock data for collection flow steps as it was missing.
const collectionFlowSteps: CollectionStep[] = [
    { id: 1, name: 'Initial Offer', details: 'Offer submitted for The Bosphorus Estate.', status: 'completed' },
    { id: 2, name: 'Due Diligence', details: 'Legal and financial review initiated.', status: 'completed' },
    { id: 3, name: 'Negotiation', details: 'Final terms are being negotiated with the seller.', status: 'current' },
    { id: 4, name: 'Closing', details: 'Finalizing contracts and transfer of funds.', status: 'upcoming' },
    { id: 5, name: 'Acquisition Complete', details: 'Property added to portfolio.', status: 'upcoming' },
];

const getStatusClasses = (status: CollectionStep['status']) => {
    switch(status) {
        case 'completed': return { line: 'bg-cyan-500', icon: 'bg-cyan-500 text-gray-900', text: 'text-white' };
        case 'current': return { line: 'bg-cyan-500', icon: 'bg-cyan-500 ring-4 ring-cyan-500/30 animate-pulse text-gray-900', text: 'text-white font-bold' };
        case 'upcoming': return { line: 'bg-gray-700', icon: 'bg-gray-700', text: 'text-gray-500' };
    }
}

const CollectionFlowWidget: React.FC<CollectionFlowWidgetProps> = ({ portfolioItems }) => {
    const { t } = useLocalization();

    return (
        <WidgetCard title={t('widgets.collectionFlow.title')} actionIcon={<FlowIcon className="w-4 h-4" />}>
            <div className="relative pl-5">
                {collectionFlowSteps.map((step, index) => {
                    const { line, icon, text } = getStatusClasses(step.status);
                    const isLast = index === collectionFlowSteps.length - 1;
                    return (
                        <div key={step.id} className="relative pb-8">
                            {!isLast && <div className={`absolute top-2 left-[5px] w-0.5 h-full ${line}`}></div>}
                            <div className="flex items-start gap-4">
                                <div className={`absolute left-0 top-1 w-3 h-3 rounded-full flex items-center justify-center ${icon}`}>
                                    {step.status === 'completed' && <CheckCircleIcon className="w-3 h-3 text-gray-900" />}
                                </div>
                                <div className="pl-4">
                                    <h4 className={`text-sm ${text}`}>{step.name}</h4>
                                    <p className="text-xs text-gray-400">{step.details}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </WidgetCard>
    );
};

export default CollectionFlowWidget;
