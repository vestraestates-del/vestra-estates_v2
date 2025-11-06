
import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';
import { LifestyleService } from './ServicesPage';

interface LifestyleRequestModalProps {
    service: LifestyleService;
    onClose: () => void;
    onSave: (details: string) => void;
}

const LifestyleRequestModal: React.FC<LifestyleRequestModalProps> = ({ service, onClose, onSave }) => {
    const { t } = useLocalization();
    const [details, setDetails] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!details.trim()) {
            alert("Please provide some details for your request.");
            return;
        }
        onSave(details);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                     <div>
                        <h2 className="text-xl font-bold text-white">{t('services.requestPackageButton')}</h2>
                        <p className="text-sm text-gray-400">{t(service.titleKey)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="request-details" className="block text-sm font-medium text-gray-400 mb-2">
                            Please provide any specific requirements or questions you have regarding this service.
                        </label>
                        <textarea
                            id="request-details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="e.g., I'm interested in chartering a jet for 4 passengers from Geneva to Dubai next month..."
                            rows={6}
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Submit Request</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LifestyleRequestModal;
