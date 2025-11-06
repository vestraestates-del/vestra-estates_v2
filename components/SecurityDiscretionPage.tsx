import React, { useState, lazy, Suspense } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { ShieldCheckIcon, LockClosedIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import type { RequestItem } from '../data/appData';

const ServiceRequestModal = lazy(() => import('./ServiceRequestModal'));

interface Protocol {
    key: string;
    icon: React.ReactNode;
    image: string;
}

const protocols: Protocol[] = [
    { key: 'server', icon: <LockClosedIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg' },
    { key: 'encryption', icon: <LockClosedIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg' },
    { key: 'nda', icon: <LockClosedIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg' },
    { key: 'cloaking', icon: <LockClosedIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg' },
    { key: 'ownership', icon: <LockClosedIcon className="w-8 h-8" />, image: 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg' },
];

interface SecurityDiscretionPageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const SecurityDiscretionPage: React.FC<SecurityDiscretionPageProps> = ({ onAddRequest }) => {
    const { t } = useLocalization();
    const [requestModalService, setRequestModalService] = useState<{ title: string } | null>(null);

    const handleSaveRequest = (details: { request: string }) => {
        if (!requestModalService) return;
        const newRequest: Omit<RequestItem, 'id' | 'requester'> = {
            type: 'Action',
            title: `Security Consultation: ${requestModalService.title}`,
            assignee: 'Senior Security Advisor',
            status: 'Urgent',
            details: details.request,
        };
        onAddRequest(newRequest);
        alert(t('securityDiscretion.requestConfirmation'));
        setRequestModalService(null);
    };

    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-12 text-center">
                    <div className="flex justify-center text-cyan-400 mb-4">
                        <ShieldCheckIcon className="w-16 h-16" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('securityDiscretion.title')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('securityDiscretion.text')}</p>
                </header>

                <div className="space-y-10 max-w-4xl mx-auto">
                    {protocols.map((protocol, index) => (
                        <div key={protocol.key} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                                <div className="flex-shrink-0 text-cyan-400 bg-gray-900 p-4 rounded-full border border-gray-700">
                                    {protocol.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center md:text-left">{t(`securityDiscretion.protocols.${protocol.key}.title`)}</h2>
                            </div>
                            
                            <div className="aspect-video rounded-lg overflow-hidden my-4 border border-gray-800">
                                <img src={protocol.image} alt={t(`securityDiscretion.protocols.${protocol.key}.title`)} className="w-full h-full object-cover" />
                            </div>

                            <p className="text-gray-300 mt-3 text-sm">{t(`securityDiscretion.protocols.${protocol.key}.description`)}</p>
                            
                            <div className="mt-6 pt-6 border-t border-gray-800 flex justify-end">
                                <Button size="md" onClick={() => setRequestModalService({ title: t(`securityDiscretion.protocols.${protocol.key}.title`) })}>
                                    {t('securityDiscretion.requestButton')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <footer className="text-center mt-12">
                    <p className="text-lg font-semibold text-gray-500 italic">{t('securityDiscretion.subtext')}</p>
                </footer>
            </div>
            
            <Suspense fallback={null}>
                {requestModalService && (
                    <ServiceRequestModal
                        title={`Consultation: ${requestModalService.title}`}
                        prompt="Please provide details regarding your security inquiry."
                        placeholder="e.g., I'm interested in a security audit for my primary residence..."
                        onClose={() => setRequestModalService(null)}
                        onSave={handleSaveRequest}
                    />
                )}
            </Suspense>
        </>
    );
};

export default SecurityDiscretionPage;