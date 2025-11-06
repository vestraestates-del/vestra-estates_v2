import React from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { aviationYachtingServices, AviationYachtingService, FleetAsset } from '../data/aviationYachtingData';
import { PlaneBoatIcon, WavesIcon, CheckCircleIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import WidgetCard from './ui/WidgetCard';

const iconMap: { [key in AviationYachtingService['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Plane: PlaneBoatIcon,
    Boat: WavesIcon,
};

const getStatusColor = (status: FleetAsset['status']) => {
    switch (status) {
        case 'On Standby': return 'bg-green-500';
        case 'In Transit': return 'bg-blue-500';
        case 'Maintenance': return 'bg-yellow-500';
    }
};

interface AviationYachtingPageProps {
    assets: FleetAsset[];
    onInitiateService: (serviceTitle: string) => void;
}

const AviationYachtingPage: React.FC<AviationYachtingPageProps> = ({ assets, onInitiateService }) => {
    const { t } = useLocalization();

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Aviation & Yachting</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Comprehensive management solutions for the ultimate assets of freedom.</p>
            </header>

            <div className="max-w-6xl mx-auto">
                 <WidgetCard title={t('generationalOffice.aviation.fleetStatusTitle')} className="mb-12">
                    <div className="space-y-3">
                        {assets.map(asset => (
                            <div key={asset.id} className="grid grid-cols-1 sm:grid-cols-4 gap-x-4 gap-y-2 items-center bg-white/5 p-3 rounded-lg">
                                <p className="font-semibold text-white sm:col-span-1">{asset.name} <span className="text-gray-400 text-xs">({asset.model})</span></p>
                                <p className="text-gray-300 sm:col-span-1">{asset.type}</p>
                                <div className="flex items-center gap-2 sm:col-span-1">
                                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(asset.status)} ${asset.status !== 'Maintenance' ? 'animate-pulse' : ''}`}></div>
                                    <p className="text-gray-300">{asset.status}</p>
                                </div>
                                <p className="text-gray-300 sm:col-span-1">{asset.location}</p>
                            </div>
                        ))}
                    </div>
                </WidgetCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {aviationYachtingServices.map(service => {
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
                                    <Button size="lg" className="w-full" onClick={() => onInitiateService(service.id === 'aviation' ? 'Aircraft' : 'Yacht')}>Engage Service</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AviationYachtingPage;