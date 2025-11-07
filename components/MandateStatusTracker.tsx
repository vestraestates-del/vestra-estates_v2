import React from 'react';
import type { MandateItem } from '../data/appData';
import { CheckCircleIcon } from './icons/EliteIcons';

interface MandateStatusTrackerProps {
    currentStatus: MandateItem['status'];
}

const allStatuses: MandateItem['status'][] = [
    'Pending Review', 
    'Active Search', 
    'Match Found', 
    'Ghost Bid Submitted', 
    'Seller Interested', 
    'Seller Countered',
    'Negotiating', 
    'Closed'
];

const MandateStatusTracker: React.FC<MandateStatusTrackerProps> = ({ currentStatus }) => {
    const currentIndex = allStatuses.indexOf(currentStatus);
    const isRejected = currentStatus === 'Rejected';

    const getStatusClasses = (index: number, currentStatusIndex: number) => {
        if (isRejected) {
             return {
                dot: 'bg-red-500/50 border-red-500',
                text: 'text-red-300',
                line: 'bg-red-500/30'
            };
        }
        if (index < currentStatusIndex) {
            return {
                dot: 'bg-cyan-500 border-cyan-400',
                text: 'text-gray-400',
                line: 'bg-cyan-500'
            };
        }
        if (index === currentStatusIndex) {
            return {
                dot: 'bg-cyan-500 border-cyan-300 ring-4 ring-cyan-500/30 animate-pulse',
                text: 'text-white font-bold',
                line: 'bg-gray-700'
            };
        }
        return {
            dot: 'bg-gray-700 border-gray-600',
            text: 'text-gray-500',
            line: 'bg-gray-700'
        };
    };

    if(isRejected) {
        return (
             <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                 <p className="font-bold text-red-300">Mandate Rejected</p>
            </div>
        )
    }

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex items-center min-w-max">
                {allStatuses.map((status, index) => {
                    const { dot, text, line } = getStatusClasses(index, currentIndex);
                    const isLast = index === allStatuses.length - 1;

                    return (
                        <div key={status} className={`flex-1 flex items-center ${isLast ? 'flex-grow-0' : ''}`}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${dot}`}>
                                    {index < currentIndex && <CheckCircleIcon className="w-4 h-4 text-gray-900"/>}
                                </div>
                                <p className={`mt-2 text-xs transition-colors duration-300 ${text}`}>{status}</p>
                            </div>
                            {!isLast && <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${line}`}></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MandateStatusTracker;
