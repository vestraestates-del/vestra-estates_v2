import React, { useState, lazy, Suspense } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { initialVaultDocuments, VaultDocument } from '../data/digitalVaultData';
import { LockClosedIcon, VaultIcon, DocumentTextIcon } from './icons/EliteIcons';
import Button from './ui/Button';

const VaultAuthModal = lazy(() => import('./VaultAuthModal'));
const SecureDocumentViewerModal = lazy(() => import('./SecureDocumentViewerModal'));

type SecurityLevelInfo = {
  level: 'High' | 'Medium' | 'Low';
  color: string;
  textColor: string;
};

const getSecurityLevel = (category: VaultDocument['category']): SecurityLevelInfo => {
    switch (category) {
        case 'Legal':
            return { level: 'High', color: 'bg-red-500/20', textColor: 'text-red-300' };
        case 'Financial':
            return { level: 'Medium', color: 'bg-yellow-500/20', textColor: 'text-yellow-300' };
        case 'Personal':
            return { level: 'Low', color: 'bg-cyan-500/20', textColor: 'text-cyan-300' };
        default:
            return { level: 'Low', color: 'bg-gray-500/20', textColor: 'text-gray-300' };
    }
};

const DigitalVaultPage: React.FC = () => {
    const { t } = useLocalization();
    const [documents] = useState<VaultDocument[]>(initialVaultDocuments);
    const [isVerified, setIsVerified] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<VaultDocument | null>(null);
    
    const handleVerificationSuccess = () => {
        setIsAuthModalOpen(false);
        setIsVerified(true);
    };

    const categories: VaultDocument['category'][] = ['Financial', 'Legal', 'Personal'];

    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-12 text-center">
                    <div className="flex justify-center text-cyan-400 mb-4">
                        <VaultIcon className="w-16 h-16" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{t('generationalOffice.vault.title')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('generationalOffice.vault.subtitle')}</p>
                </header>

                <div className="max-w-5xl mx-auto relative">
                    {!isVerified && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex flex-col items-center justify-center rounded-xl p-8">
                            <LockClosedIcon className="w-16 h-16 text-cyan-400 mb-4" />
                            <h2 className="text-2xl font-bold text-white">{t('generationalOffice.vault.lockedTitle')}</h2>
                            <p className="text-gray-400 mt-2 mb-6">{t('generationalOffice.vault.lockedSubtitle')}</p>
                            <Button size="lg" onClick={() => setIsAuthModalOpen(true)}>
                                {t('generationalOffice.vault.authenticateButton')}
                            </Button>
                        </div>
                    )}

                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${!isVerified ? 'blur-sm select-none pointer-events-none' : ''}`}>
                        {categories.map(category => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold text-cyan-300 border-b-2 border-cyan-500/30 pb-2 mb-4">{category}</h3>
                                <div className="space-y-3">
                                    {documents.filter(doc => doc.category === category).map(doc => {
                                        const { level, color, textColor } = getSecurityLevel(doc.category);
                                        return (
                                            <button 
                                                key={doc.id}
                                                onClick={() => setSelectedDocument(doc)}
                                                className="w-full text-left bg-white/5 p-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-white/10"
                                            >
                                                <DocumentTextIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-white">{doc.title}</p>
                                                    <p className="text-xs text-gray-500">{t('generationalOffice.vault.added')}: {doc.dateAdded}</p>
                                                </div>
                                                <div>
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${color} ${textColor}`}>
                                                        {t(`generationalOffice.vault.securityLevels.${level.toLowerCase()}`)}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Suspense fallback={null}>
                {isAuthModalOpen && (
                    <VaultAuthModal 
                        onClose={() => setIsAuthModalOpen(false)}
                        onVerified={handleVerificationSuccess}
                    />
                )}
                {selectedDocument && (
                    <SecureDocumentViewerModal 
                        document={selectedDocument}
                        onClose={() => setSelectedDocument(null)}
                    />
                )}
            </Suspense>
        </>
    );
};

export default DigitalVaultPage;