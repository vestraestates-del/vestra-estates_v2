import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import FileUpload from './FileUpload';
import { useLocalization } from '../localization/LocalizationContext';

interface MandateFormModalProps {
    onClose: () => void;
    onSave: (mandate: Omit<any, 'id' | 'status' | 'submittedDate'>) => void;
}

const MandateFormModal: React.FC<MandateFormModalProps> = ({ onClose, onSave }) => {
    const { t } = useLocalization();
    const [propertyType, setPropertyType] = useState('');
    const [region, setRegion] = useState('');
    const [budgetMin, setBudgetMin] = useState('');
    const [budgetMax, setBudgetMax] = useState('');
    const [features, setFeatures] = useState('');
    const [financialsFile, setFinancialsFile] = useState<File | null>(null);

    const canSubmit = propertyType && region && budgetMin && budgetMax && features && financialsFile;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) {
            alert("Please fill all fields and upload the required document.");
            return;
        }
        onSave({
            propertyType,
            region,
            budgetMin: Number(budgetMin),
            budgetMax: Number(budgetMax),
            features,
            financialDocUrl: financialsFile.name, // In a real app, this would be a URL after upload
        });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('mandates.modalTitle')}</h2>
                        <p className="text-sm text-gray-400">{t('mandates.modalSubtitle')}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.form.propertyType')}</label>
                                <input
                                    id="propertyType" type="text" value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    placeholder={t('mandates.form.propertyTypePlaceholder')} required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.form.region')}</label>
                                <input
                                    id="region" type="text" value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    placeholder={t('mandates.form.regionPlaceholder')} required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.form.budget')}</label>
                             <div className="flex items-center gap-2">
                                <input
                                    type="number" value={budgetMin}
                                    onChange={(e) => setBudgetMin(e.target.value)}
                                    placeholder="Min" required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="number" value={budgetMax}
                                    onChange={(e) => setBudgetMax(e.target.value)}
                                    placeholder="Max" required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                             </div>
                        </div>

                        <div>
                            <label htmlFor="features" className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.form.features')}</label>
                            <textarea
                                id="features" value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                placeholder={t('mandates.form.featuresPlaceholder')} required
                                rows={4}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <FileUpload
                            label={t('mandates.form.financials')}
                            onFileSelect={setFinancialsFile}
                            acceptedTypes="application/pdf"
                        />
                    </div>

                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={!canSubmit}>
                            {t('mandates.form.submitButton')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MandateFormModal;