import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';

interface FamilyOfficeBlueprintModalProps {
    onClose: () => void;
    onSave: (details: { jurisdictions: string; assetComplexity: string; familySize: number }) => void;
}

const FamilyOfficeBlueprintModal: React.FC<FamilyOfficeBlueprintModalProps> = ({ onClose, onSave }) => {
    const { t } = useLocalization();
    const [jurisdictions, setJurisdictions] = useState('');
    const [assetComplexity, setAssetComplexity] = useState('');
    const [familySize, setFamilySize] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ jurisdictions, assetComplexity, familySize });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('generationalOffice.familyOffice.modalTitle')}</h2>
                        <p className="text-sm text-gray-400">{t('generationalOffice.familyOffice.modalSubtitle')}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="jurisdictions" className="block text-sm font-medium text-gray-400 mb-1">{t('generationalOffice.familyOffice.jurisdictions')}</label>
                            <input
                                id="jurisdictions" type="text" value={jurisdictions} onChange={(e) => setJurisdictions(e.target.value)}
                                placeholder={t('generationalOffice.familyOffice.jurisdictionsPlaceholder')} required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="assetComplexity" className="block text-sm font-medium text-gray-400 mb-1">{t('generationalOffice.familyOffice.assetComplexity')}</label>
                            <input
                                id="assetComplexity" type="text" value={assetComplexity} onChange={(e) => setAssetComplexity(e.target.value)}
                                placeholder={t('generationalOffice.familyOffice.assetComplexityPlaceholder')} required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="familySize" className="block text-sm font-medium text-gray-400 mb-1">{t('generationalOffice.familyOffice.familySize')}</label>
                            <input
                                id="familySize" type="number" min="1" value={familySize} onChange={(e) => setFamilySize(Number(e.target.value))}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">{t('generationalOffice.familyOffice.submit')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FamilyOfficeBlueprintModal;