import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../../icons/EliteIcons';
import Button from '../../ui/Button';
import { Integration } from './Integrations';

interface IntegrationSettingsModalProps {
    integration: Integration;
    onClose: () => void;
    onSave: (integration: Integration) => void;
}

const IntegrationSettingsModal: React.FC<IntegrationSettingsModalProps> = ({ integration, onClose, onSave }) => {
    const [editedIntegration, setEditedIntegration] = useState(integration);

    useEffect(() => {
        setEditedIntegration(integration);
    }, [integration]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setEditedIntegration(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedIntegration);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Integration Settings: {integration.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                             <label htmlFor="connected" className="text-sm font-medium text-gray-300">
                                Status: {editedIntegration.connected ? 'Connected' : 'Disconnected'}
                            </label>
                            <label htmlFor="connected" className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="connected"
                                    name="connected"
                                    checked={editedIntegration.connected} 
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-400 mb-1">API Key</label>
                            <input
                                id="apiKey"
                                name="apiKey"
                                type="text"
                                value={editedIntegration.apiKey || ''}
                                onChange={handleChange}
                                placeholder="Enter API Key"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 font-mono text-xs focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Settings</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IntegrationSettingsModal;
