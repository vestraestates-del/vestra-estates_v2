import React, { useState, useEffect } from 'react';
import { FingerprintIcon, CheckCircleIcon } from './icons/EliteIcons';
import { useLocalization } from '../localization/LocalizationContext';

interface VaultAuthModalProps {
    onClose: () => void;
    onVerified: () => void;
}

const VaultAuthModal: React.FC<VaultAuthModalProps> = ({ onClose, onVerified }) => {
    const { t } = useLocalization();
    const [status, setStatus] = useState<'prompt' | 'verifying' | 'granted'>('prompt');

    useEffect(() => {
        if (status === 'verifying') {
            const timer = setTimeout(() => {
                setStatus('granted');
            }, 1500);
            return () => clearTimeout(timer);
        }
        if (status === 'granted') {
            const timer = setTimeout(() => {
                onVerified();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [status, onVerified]);

    const handleVerification = () => {
        setStatus('verifying');
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col p-8 text-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-white">{t('generationalOffice.vaultAuth.title')}</h2>
                <p className="text-sm text-gray-400 mt-2">{t('generationalOffice.vaultAuth.prompt')}</p>

                <div className="my-8">
                    {status === 'prompt' && (
                        <button onClick={handleVerification} className="w-24 h-24 mx-auto rounded-full bg-gray-900 border-2 border-gray-700 text-cyan-400 flex items-center justify-center transition-all hover:border-cyan-500 hover:scale-105 animate-pulse">
                            <FingerprintIcon className="w-12 h-12" />
                        </button>
                    )}
                    {status === 'verifying' && (
                        <div className="w-24 h-24 mx-auto flex items-center justify-center">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                     {status === 'granted' && (
                        <div className="w-24 h-24 mx-auto flex items-center justify-center">
                            <CheckCircleIcon className="w-20 h-20 text-green-400 animate-fade-in" />
                        </div>
                    )}
                </div>
                
                <p className="text-sm font-semibold h-5">
                    {status === 'verifying' && t('generationalOffice.vaultAuth.verifying')}
                    {status === 'granted' && t('generationalOffice.vaultAuth.granted')}
                </p>
            </div>
        </div>
    );
};

export default VaultAuthModal;