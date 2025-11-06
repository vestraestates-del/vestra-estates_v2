
import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { successionPlanningSteps, SuccessionStep } from '../data/successionPlanningData';
import { EyeIcon, UsersGroupIcon, BookOpenIcon, KeyIcon, CloseIcon } from './icons/EliteIcons';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';
import Button from './ui/Button';

const iconMap: { [key in SuccessionStep['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Eye: EyeIcon,
    Users: UsersGroupIcon,
    BookOpen: BookOpenIcon,
    Key: KeyIcon,
};

interface SuccessionPlanningPageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const SuccessionPlanningPage: React.FC<SuccessionPlanningPageProps> = ({ onAddRequest }) => {
    const { t } = useLocalization();
    const [activeStep, setActiveStep] = useState<SuccessionStep | null>(null);

    const handleRequest = () => {
        onAddRequest({
            type: 'Succession',
            title: 'Request Succession Planning Consultation',
            assignee: 'Senior Partner',
            status: 'Pending'
        });
        alert('Your request for a consultation has been submitted.');
    };

    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Succession Planning</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-2">Ensuring the smooth transition of leadership and legacy.</p>
                </header>

                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block" />

                    {successionPlanningSteps.map((step, index) => {
                        const Icon = iconMap[step.icon];
                        const isEven = index % 2 === 0;

                        return (
                            <div key={step.id} className={`relative flex items-center mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-cyan-500 rounded-full border-4 border-[#111116] flex items-center justify-center">
                                    <span className="text-white font-bold">{step.id}</span>
                                </div>

                                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="bg-[#111116]/60 border border-gray-800 rounded-xl p-6 shadow-lg backdrop-blur-md cursor-pointer hover:border-cyan-500/50" onClick={() => setActiveStep(step)}>
                                        <div className="flex items-center gap-4 mb-3">
                                            <Icon className="w-8 h-8 text-cyan-400" />
                                            <h2 className="text-xl font-bold text-white">{step.title}</h2>
                                        </div>
                                        <p className="text-gray-300 text-sm">{step.description.substring(0, 100)}...</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg" onClick={handleRequest}>
                        Initiate Formal Review
                    </Button>
                </div>
            </div>

            {activeStep && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={() => setActiveStep(null)}>
                    <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{t('generationalOffice.succession.popupTitle')}</h2>
                            <button onClick={() => setActiveStep(null)} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-cyan-400 mb-2">{activeStep.title}</h3>
                            <p className="text-gray-300">{activeStep.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SuccessionPlanningPage;
