
import React from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { familyOfficeServices, FamilyOfficeService } from '../data/familyOfficeData';
import { ShowcaseIcon, VaultIcon, CheckCircleIcon } from './icons/EliteIcons';
import Button from './ui/Button';
// FIX: Added file extension to appData import
import type { RequestItem } from '../data/appData.ts';

const iconMap: { [key in FamilyOfficeService['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Building: ShowcaseIcon,
    Cloud: VaultIcon,
};

interface FamilyOfficePageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
    onOpenBlueprintModal: () => void;
}

const FamilyOfficePage: React.FC<FamilyOfficePageProps> = ({ onAddRequest, onOpenBlueprintModal }) => {
    const { t } = useLocalization();

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Family Office Services</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Institutional-grade support for the management of significant private wealth.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {familyOfficeServices.map(service => {
                    const Icon = iconMap[service.icon];
                    return (
                        <div key={service.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl p-8 flex flex-col">
                            <div className="flex-shrink-0 text-cyan-400 mb-4">
                                <Icon className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                            <p className="text-gray-300 mt-3 flex-grow">{service.description}</p>
                            <ul className="space-y-3 mt-6">
                                {service.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Button size="lg" className="w-full" onClick={onOpenBlueprintModal}>Request Blueprint</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FamilyOfficePage;
