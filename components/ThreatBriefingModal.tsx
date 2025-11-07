import React, { useState, useEffect } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { CloseIcon, ShieldCheckIcon } from './icons/EliteIcons';

interface ThreatBriefingModalProps {
    onClose: () => void;
}

const briefingCache = new Map<string, string>();

const ThreatBriefingModal: React.FC<ThreatBriefingModalProps> = ({ onClose }) => {
    const { t, language } = useLocalization();
    const [briefing, setBriefing] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cacheKey = `threat-briefing-${language}`;

        const generateBriefing = async () => {
            if (briefingCache.has(cacheKey)) {
                setBriefing(briefingCache.get(cacheKey)!);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');
            try {
                const prompt = `Act as a global intelligence analyst for a high-net-worth clientele (VESTRA ESTATES). Provide a concise, up-to-the-minute threat intelligence briefing. Focus on current and emerging cybersecurity, physical security, and geopolitical risks relevant to this demographic. Use a formal, professional tone. Structure with clear headings. Do not use markdown.`;
                
                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
                });

                if (!response.ok) throw new Error('Failed to generate briefing');
                
                const data = await response.json();
                const resultText = data.text;
                setBriefing(resultText);
                briefingCache.set(cacheKey, resultText);
            } catch (err: any) {
                let errorMessage = 'AI is currently unavailable. Please try again later.';
                if (err.message.includes('429')) {
                    errorMessage = 'Too many requests. Please wait a moment.';
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        generateBriefing();
    }, [language]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in overscroll-contain" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[70vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-bold text-white">Global Threat Intelligence Briefing</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                    {loading && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="ml-2">Generating real-time threat analysis...</span>
                            </div>
                        </div>
                    )}
                    {error && <p className="text-red-400">{error}</p>}
                    {!loading && !error && (
                        <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm animate-fade-in">
                            {briefing}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThreatBriefingModal;