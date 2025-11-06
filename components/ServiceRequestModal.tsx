import React, { useState } from 'react';
import { CloseIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';

interface ServiceRequestModalProps {
    title: string;
    prompt: string;
    placeholder: string;
    onClose: () => void;
    onSave: (details: { request: string }) => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ title, prompt, placeholder, onClose, onSave }) => {
    const { t } = useLocalization();
    const [request, setRequest] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!request.trim()) {
            alert("Please provide details for your request.");
            return;
        }
        onSave({ request });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="request-details" className="block text-sm font-medium text-gray-400 mb-2">{prompt}</label>
                        <textarea
                            id="request-details"
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            placeholder={placeholder}
                            rows={5}
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

export default ServiceRequestModal;