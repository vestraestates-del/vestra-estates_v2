import React, { useState, useEffect } from 'react';
import type { PortfolioItem } from '../data/portfolioData';
import { CloseIcon, PencilSquareIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { useLocalization } from '../localization/LocalizationContext';

interface NdaModalProps {
    property: PortfolioItem;
    onConfirm: () => void;
    onClose: () => void;
}

const ndaCache = new Map<string, string>();

const NdaModal: React.FC<NdaModalProps> = ({ property, onConfirm, onClose }) => {
    const { t, language } = useLocalization();
    const [ndaText, setNdaText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [signature, setSignature] = useState('');
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        const cacheKey = `${property.id}-${language}`;
        
        const generateNda = async () => {
            if (ndaCache.has(cacheKey)) {
                setNdaText(ndaCache.get(cacheKey)!);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');
            try {
                const prompt = `
                    Generate a concise, one-page Non-Disclosure Agreement (NDA) for a potential client viewing a high-value real estate property. The tone should be formal, legally sound, but not overly intimidating.

                    **Key Details to Include:**
                    - **Parties:** "The Disclosing Party (VESTRA ESTATES, on behalf of the property owner)" and "The Receiving Party (the prospective client)".
                    - **Property:** "${t(property.nameKey)}" located in "${t(property.locationKey)}".
                    - **Confidential Information:** Define this broadly to include all non-public information related to the property's financials, layout, security features, ownership details, and any other materials provided during the viewing.
                    - **Obligation:** The Receiving Party agrees not to disclose, share, or use the Confidential Information for any purpose other than evaluating the potential acquisition of the Property.
                    - **Term:** The confidentiality obligation shall remain in effect for a period of five (5) years from the date of signing.
                    - **Jurisdiction:** State that the agreement is governed by the laws of the Canton of Geneva, Switzerland.

                    **Output Format:**
                    - Do not use markdown.
                    - Start with a clear title: "CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT".
                    - Use clear headings for sections like "1. Purpose", "2. Confidential Information", "3. Obligations", "4. Term", "5. Governing Law".
                    - End with a concluding paragraph before the signature line.
                `;
                
                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ prompt }),
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || 'Failed to generate NDA text');
                }

                const data = await response.json();
                const resultText = data.text;
                setNdaText(resultText);
                ndaCache.set(cacheKey, resultText);

            } catch (err: any) {
                console.error("NDA generation error:", err);
                const errorMessage = String(err.message);
                if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
                    setError(t('widgets.errors.rateLimit'));
                } else {
                    setError('Failed to generate the NDA. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        generateNda();
    }, [property, t, language]);

    const canSubmit = signature.trim() !== '' && agreed && !loading;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('ndaModal.title')}</h2>
                        <p className="text-sm text-gray-400">{t(property.nameKey)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    {loading && (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="ml-2">{t('ndaModal.generating')}</span>
                            </div>
                        </div>
                    )}
                    {error && <p className="text-red-400">{error}</p>}
                    {!loading && !error && (
                        <div className="text-gray-300 text-sm whitespace-pre-wrap font-mono bg-gray-900/50 p-4 rounded-md border border-gray-700">
                            {ndaText}
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 p-6 border-t border-gray-800 space-y-4">
                    <div>
                        <label htmlFor="signature" className="block text-sm font-medium text-gray-400 mb-1">{t('ndaModal.signaturePlaceholder')}</label>
                        <input
                            id="signature"
                            type="text"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            placeholder="Type your full legal name"
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex items-start">
                        <input
                            id="agreement"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="h-4 w-4 mt-1 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500"
                        />
                        <label htmlFor="agreement" className="ml-2 block text-sm text-gray-400">{t('ndaModal.agreement')}</label>
                    </div>
                </div>

                <div className="flex-shrink-0 p-4 border-t border-gray-800 flex justify-end gap-3">
                    <Button variant="secondary" type="button" onClick={onClose}>{t('ndaModal.cancelButton')}</Button>
                    <Button variant="primary" type="button" onClick={onConfirm} disabled={!canSubmit} className="flex items-center gap-2">
                        <PencilSquareIcon className="w-5 h-5"/>
                        {t('ndaModal.signButton')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NdaModal;
