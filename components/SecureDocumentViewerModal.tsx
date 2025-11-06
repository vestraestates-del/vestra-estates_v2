import React, { useState, useEffect } from 'react';
import { CloseIcon, LockClosedIcon, DocumentTextIcon } from './icons/EliteIcons';
import { VaultDocument } from '../data/digitalVaultData';
import { useLocalization } from '../localization/LocalizationContext';

interface SecureDocumentViewerModalProps {
    document: VaultDocument;
    onClose: () => void;
}

const SecureDocumentViewerModal: React.FC<SecureDocumentViewerModalProps> = ({ document, onClose }) => {
    const { t } = useLocalization();
    const [isDecrypting, setIsDecrypting] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDecrypting(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [document]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[70vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-5 h-5 text-cyan-400" />
                        <div>
                            <h2 className="text-xl font-bold text-white">{document.title}</h2>
                            <p className="text-xs text-gray-400">{document.category} / {document.dateAdded}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                    {isDecrypting ? (
                         <div className="flex flex-col items-center justify-center h-full">
                            <LockClosedIcon className="w-12 h-12 text-cyan-400 mb-4 animate-pulse" />
                            <p className="text-gray-400">{t('generationalOffice.vault.decrypting')}</p>
                        </div>
                    ) : (
                        <div className="text-gray-300 whitespace-pre-wrap font-mono animate-fade-in">
                            {document.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecureDocumentViewerModal;