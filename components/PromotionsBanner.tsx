
import React from 'react';
import { InformationCircleIcon, CloseIcon } from './icons/EliteIcons';

interface PromotionsBannerProps {
    title: string;
    description: string;
    onDismiss: () => void;
}

const PromotionsBanner: React.FC<PromotionsBannerProps> = ({ title, description, onDismiss }) => {
    return (
        <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-4 mb-8 flex items-start gap-4 animate-fade-in">
            <div className="text-cyan-400 mt-1">
                <InformationCircleIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-cyan-200">{description}</p>
            </div>
            <button onClick={onDismiss} className="text-cyan-300 hover:text-white p-1">
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PromotionsBanner;
