
import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import FileUpload from './FileUpload';
import { useLocalization } from '../localization/LocalizationContext';
// FIX: Added file extension to appData import
import { MandateItem } from '../data/appData.ts';

interface GhostBidModalProps {
    mandate: MandateItem;
    onClose: () => void;
    onSave: (mandate: MandateItem) => void;
}

const GhostBidModal: React.FC<GhostBidModalProps> = ({ mandate, onClose, onSave }) => {
    const { t } = useLocalization();
    const [bidMin, setBidMin] = useState('');
    const [bidMax, setBidMax] = useState('');
    const [message, setMessage] = useState('');
    const [financialsFile, setFinancialsFile] = useState<File | null>(null);

    const canSubmit = bidMin && bidMax && financialsFile;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) {
            alert("Please fill all fields and upload the required document.");
            return;
        }
        const updatedMandate: MandateItem = {
            ...mandate,
            status: 'Ghost Bid Submitted',
            ghostBidRangeMin: Number(bidMin),
            ghostBidRangeMax: Number(bidMax),
            ghostBidMessage: message,
            ghostBidFinancialDocUrl: financialsFile.name,
        };
        onSave(updatedMandate);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('mandates.ghostBid.modalTitle')}</h2>
                        <p className="text-sm text-gray-400">{t('mandates.ghostBid.modalSubtitle')}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400">You are submitting a bid for:</p>
                            <p className="font-semibold text-white">{mandate.propertyType} in {mandate.region}</p>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.ghostBid.range')}</label>
                             <div className="flex items-center gap-2">
                                <input
                                    type="number" value={bidMin} onChange={(e) => setBidMin(e.target.value)}
                                    placeholder={t('mandates.ghostBid.min')} required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="number" value={bidMax} onChange={(e) => setBidMax(e.target.value)}
                                    placeholder={t('mandates.ghostBid.max')} required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                                />
                             </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">{t('mandates.ghostBid.message')}</label>
                            <textarea
                                id="message" value={message} onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('mandates.ghostBid.messagePlaceholder')} rows={3}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <FileUpload
                            label={t('mandates.ghostBid.financials')}
                            onFileSelect={setFinancialsFile}
                            acceptedTypes="application/pdf"
                        />
                    </div>

                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={!canSubmit}>
                            {t('mandates.ghostBid.submitButton')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GhostBidModal;