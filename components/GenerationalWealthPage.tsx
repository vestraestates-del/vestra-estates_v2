import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { generationalWealthServices, WealthService } from '../data/generationalWealthData';
import { TreeIcon, BuildingKeyIcon, UsersGroupIcon, DiamondIcon, PlaneBoatIcon, FingerprintIcon } from './icons/EliteIcons';
import Button from './ui/Button';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';

const iconMap: { [key in WealthService['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Tree: TreeIcon,
    BuildingKey: BuildingKeyIcon,
    UsersGroup: UsersGroupIcon,
    Diamond: DiamondIcon,
    PlaneBoat: PlaneBoatIcon,
    Fingerprint: FingerprintIcon,
};

interface GenerationalWealthPageProps {
     onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const briefingCache = new Map<string, string>();

const GenerationalWealthPage: React.FC<GenerationalWealthPageProps> = ({ onAddRequest }) => {
    const { t, language } = useLocalization();
    const [expandedService, setExpandedService] = useState<string | null>(null);
    const [briefings, setBriefings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const handleToggleBriefing = async (service: WealthService) => {
        const serviceId = service.id;
        if (expandedService === serviceId) {
            setExpandedService(null);
            return;
        }

        setExpandedService(serviceId);

        const cacheKey = `${serviceId}-${language}`;
        if (briefings[serviceId] || briefingCache.has(cacheKey)) {
            if (briefingCache.has(cacheKey) && !briefings[serviceId]) {
                setBriefings(prev => ({ ...prev, [serviceId]: briefingCache.get(cacheKey)! }));
            }
            return;
        }

        setLoading(prev => ({...prev, [serviceId]: true }));
        try {
            const prompt = `You are a Senior Legacy Advisor at VESTRA ESTATES. Generate a concise, expert-level strategic primer on "${service.title}". The description is: "${service.description}". Focus on the key considerations, strategic benefits, and potential complexities relevant to an ultra-high-net-worth individual. The tone should be authoritative and insightful. Do not use markdown.`;
            
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate briefing');
            }
            
            const data = await response.json();
            const resultText = data.text;
            setBriefings(prev => ({ ...prev, [serviceId]: resultText }));
            briefingCache.set(cacheKey, resultText);
        } catch (error: any) {
            console.error("AI Briefing Error:", error);
            const errorMessage = String(error.message);
            if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
                setBriefings(prev => ({ ...prev, [serviceId]: t('widgets.errors.rateLimit') }));
            } else {
                setBriefings(prev => ({ ...prev, [serviceId]: "An error occurred while generating the briefing. Please try again." }));
            }
        } finally {
            setLoading(prev => ({...prev, [serviceId]: false }));
        }
    };

    const handleRequest = (service: WealthService) => {
        onAddRequest({
            type: 'Wealth Planning',
            title: `Inquiry: ${service.title}`,
            assignee: 'Senior Wealth Advisor',
            status: 'Pending'
        });
        alert(`Your inquiry regarding ${service.title} has been submitted. A Senior Wealth Advisor will contact you shortly.`);
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4">
                    <TreeIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Generational Wealth Office</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Strategic advisory for the preservation and growth of family legacy across generations.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {generationalWealthServices.map(service => {
                    const Icon = iconMap[service.icon];
                    const isExpanded = expandedService === service.id;
                    return (
                        <div key={service.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg flex flex-col transition-all duration-300 hover:bg-white/5 hover:border-cyan-500/30">
                            <div className="p-6 text-center items-center flex flex-col flex-grow">
                                <div className="flex-shrink-0 text-cyan-400 mb-4 bg-gray-900 p-4 rounded-full">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-white">{service.title}</h2>
                                <p className="text-gray-300 mt-2 flex-grow text-sm">{service.description}</p>
                                <div className="mt-6 w-full flex flex-col gap-2">
                                    <Button className="w-full" variant="ghost" onClick={() => handleToggleBriefing(service)}>
                                        {isExpanded ? t('generationalOffice.wealth.hideBriefing') : t('generationalOffice.wealth.viewBriefing')}
                                    </Button>
                                    <Button className="w-full" onClick={() => handleRequest(service)}>Request Consultation</Button>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="border-t border-gray-700 bg-cyan-900/10 p-4">
                                    {loading[service.id] && <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span><span>{t('generationalOffice.wealth.generatingBriefing')}</span></div>}
                                    {briefings[service.id] && <p className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{briefings[service.id]}</p>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GenerationalWealthPage;
