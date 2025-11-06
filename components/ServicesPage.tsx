
import React, { useState, lazy, Suspense } from 'react';
import * as Icons from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';
import type { RequestItem } from '../data/appData.ts';

const LifestyleRequestModal = lazy(() => import('./LifestyleRequestModal'));

// This icon map is used by other components (e.g., PropertyDetailModal for amenities)
// It remains here for that purpose, even if this specific page no longer uses icons for services.
const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Wind: Icons.WindIcon,
  Dumbbell: Icons.DumbbellIcon,
  Film: Icons.FilmIcon,
  Waves: Icons.WavesIcon,
  Shield: Icons.ShieldCheckIcon,
  Asset: Icons.BriefcaseIcon,
  Concierge: Icons.ConciergeBellIcon,
  Security: Icons.ShieldCheckIcon,
};

export const ServiceIcon = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return <Icons.BriefcaseIcon {...props} />; // Default icon
  return <IconComponent {...props} />;
};

// New data structure for the page
export interface LifestyleService {
    id: string;
    titleKey: string;
    desc1Key: string;
    desc2Key: string;
    icon: React.ReactNode;
    image: string;
}

// FIX: Export lifestyleServices to be used as the single source of truth in other components.
export const lifestyleServices: LifestyleService[] = [
    { id: 'aviation', titleKey: 'services.aviation.title', desc1Key: 'services.aviation.desc1', desc2Key: 'services.aviation.desc2', icon: <Icons.PlaneBoatIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg' },
    { id: 'groundTransport', titleKey: 'services.groundTransport.title', desc1Key: 'services.groundTransport.desc1', desc2Key: 'services.groundTransport.desc2', icon: <Icons.CarIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg' },
    { id: 'yachting', titleKey: 'services.yachting.title', desc1Key: 'services.yachting.desc1', desc2Key: 'services.yachting.desc2', icon: <Icons.WavesIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/163236/luxury-yacht-yacht-yacht-charter-yacht-holiday-163236.jpeg' },
    { id: 'security', titleKey: 'services.security.title', desc1Key: 'services.security.desc1', desc2Key: 'services.security.desc2', icon: <Icons.ShieldCheckIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/7792243/pexels-photo-7792243.jpeg' },
    { id: 'staffing', titleKey: 'services.staffing.title', desc1Key: 'services.staffing.desc1', desc2Key: 'services.staffing.desc2', icon: <Icons.UsersGroupIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg' },
    { id: 'wellness', titleKey: 'services.wellness.title', desc1Key: 'services.wellness.desc1', desc2Key: 'services.wellness.desc2', icon: <Icons.HeartIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg' },
    { id: 'education', titleKey: 'services.education.title', desc1Key: 'services.education.desc1', desc2Key: 'services.education.desc2', icon: <Icons.BookOpenIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg' },
    { id: 'consulting', titleKey: 'services.consulting.title', desc1Key: 'services.consulting.desc1', desc2Key: 'services.consulting.desc2', icon: <Icons.JewelIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg' },
    { id: 'events', titleKey: 'services.events.title', desc1Key: 'services.events.desc1', desc2Key: 'services.events.desc2', icon: <Icons.KeyIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/196664/pexels-photo-196664.jpeg' },
];

interface ServicesPageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onAddRequest }) => {
    const { t } = useLocalization();
    const [requestModalService, setRequestModalService] = useState<LifestyleService | null>(null);

    const handleSaveRequest = (details: string) => {
        if (!requestModalService) return;
        const newRequest: Omit<RequestItem, 'id' | 'requester'> = {
            type: 'Action',
            title: `Lifestyle Package: ${t(requestModalService.titleKey)}`,
            assignee: 'Senior Partner',
            status: 'Pending',
            details,
        };
        onAddRequest(newRequest);
        alert(t('services.requestConfirmation'));
        setRequestModalService(null);
    };
    
    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('services.title')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('services.subtitle')}</p>
                </header>

                <div className="space-y-10 max-w-4xl mx-auto">
                    {lifestyleServices.map((service, index) => (
                        <div key={service.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                                <div className="flex-shrink-0 text-cyan-400 bg-gray-900 p-4 rounded-full border border-gray-700">
                                    {service.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center md:text-left">{t(service.titleKey)}</h2>
                            </div>
                            
                            <div className="aspect-video rounded-lg overflow-hidden my-4 border border-gray-800">
                                <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover" />
                            </div>

                            <p className="text-gray-300 mt-3 text-sm">{t(service.desc1Key)}</p>
                            <p className="text-gray-300 mt-2 text-sm">{t(service.desc2Key)}</p>
                            
                            <div className="mt-6 pt-6 border-t border-gray-800 flex justify-end">
                                <Button size="md" onClick={() => setRequestModalService(service)}>
                                    {t('services.requestPackageButton')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Suspense fallback={null}>
                {requestModalService && (
                    <LifestyleRequestModal
                        service={requestModalService}
                        onClose={() => setRequestModalService(null)}
                        onSave={handleSaveRequest}
                    />
                )}
            </Suspense>
        </>
    );
};

export default ServicesPage;
