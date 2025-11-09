import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { CloseIcon, AIIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import type { RequestItem } from '../data/appData';

interface Protocol {
    key: string;
    icon: React.ReactNode;
    image: string;
}

interface SecurityProtocolDetailModalProps {
    protocol: Protocol;
    onClose: () => void;
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const scenarioCache = new Map<string, string>();

const SecurityProtocolDetailModal: React.FC<SecurityProtocolDetailModalProps> = ({ protocol, onClose, onAddRequest }) => {
    const { t, language } = useLocalization();
    const [scenario, setScenario] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const protocolTitle = t(`securityDiscretion.protocols.${protocol.key}.title`);
    const protocolDescription = t(`securityDiscretion.protocols.${protocol.key}.description`);

    const handleGenerateScenario = async () => {
        const cacheKey = `${protocol.key}-scenario-${language}`;
        if (scenarioCache.has(cacheKey)) {
            setScenario(scenarioCache.get(cacheKey)!);
            return;
        }

        setLoading(true);
        setError('');
        setScenario('');
        try {
            const prompt = `You are a cybersecurity expert at VESTRA ESTATES. Create a brief, realistic threat scenario illustrating the importance of "${protocolTitle}" for a high-profile individual. Describe the threat, the vulnerability without this protocol, and how the protocol mitigates the risk. Keep it concise and impactful. Do not use markdown.`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
            });
            if (!response.ok) throw new Error('Failed to generate scenario.');
            const data = await response.json();
            // FIX: Added type check to safely handle API response and prevent assigning 'unknown' to a string state.
            if (data && typeof data.text === 'string') {
                const resultText = data.text;
                setScenario(resultText);
                scenarioCache.set(cacheKey, resultText);
            } else {
                throw new Error('Invalid response from AI service');
            }
        } catch (err: any) {
            setError('Failed to generate scenario. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleRequestConsultation = () => {
        onAddRequest({
            type: 'Action',
            title: `Security Consultation: ${protocolTitle}`,
            assignee: 'Senior Security Advisor',
            status: 'Urgent',
        });
        alert(t('securityDiscretion.requestConfirmation'));
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in overscroll-contain" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">{protocolTitle}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-gray-800">
                        <img src={protocol.image} alt={protocolTitle} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 mb-6">{protocolDescription}</p>

                    <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-cyan-300">AI-Powered Threat Simulation</h3>
                            <Button size="sm" onClick={handleGenerateScenario} disabled={loading} className="flex items-center gap-2">
                                <AIIcon className="w-4 h-4" />
                                {loading ? 'Simulating...' : 'Simulate Threat Scenario'}
                            </Button>
                        </div>
                        {(loading || error || scenario) && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                {loading && <p className="text-gray-400">Generating realistic scenario...</p>}
                                {error && <p className="text-red-400">{error}</p>}
                                {scenario && (
                                    <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm animate-fade-in">
                                        {scenario}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button variant="primary" onClick={handleRequestConsultation}>{t('securityDiscretion.requestButton')}</Button>
                </div>
            </div>
        </div>
    );
};

export default SecurityProtocolDetailModal;