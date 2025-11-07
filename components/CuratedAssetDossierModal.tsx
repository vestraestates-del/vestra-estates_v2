import React, { useState, useEffect } from 'react';
import { useLocalization } from '../localization/LocalizationContext.tsx';
import { CloseIcon, TrendingUpIcon, BookOpenIcon, KeyIcon, UsersGroupIcon } from './icons/EliteIcons.tsx';
import Button from './ui/Button.tsx';
import type { AnyCuratedAsset } from '../App.tsx';
import type { RequestItem } from '../data/appData.ts';

interface CuratedAssetDossierModalProps {
  asset: AnyCuratedAsset;
  onClose: () => void;
  onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

type AnalysisTab = 'provenance' | 'market' | 'curation';
const analysisCache = new Map<string, string>();

const CuratedAssetDossierModal: React.FC<CuratedAssetDossierModalProps> = ({ asset, onClose, onAddRequest }) => {
    const { t, language } = useLocalization();
    const [activeTab, setActiveTab] = useState<AnalysisTab>('provenance');
    
    const [analyses, setAnalyses] = useState<Record<AnalysisTab, string>>({ provenance: '', market: '', curation: '' });
    const [loading, setLoading] = useState<Record<AnalysisTab, boolean>>({ provenance: false, market: false, curation: false });
    const [errors, setErrors] = useState<Record<AnalysisTab, string>>({ provenance: '', market: '', curation: '' });

    // Helper to get consistent naming
    const getAssetName = (item: AnyCuratedAsset): string => {
        // FIX: Use unique properties ('artist', 'brand', 'make') to safely narrow the union type and access properties correctly.
        if ('artist' in item) { // ArtItem
            return item.title;
        }
        if ('brand' in item) { // WatchItem
            return `${item.brand} ${item.model}`;
        }
        if ('make' in item) { // AutomobileItem
            return `${item.make} ${item.model}`;
        }
        if ('name' in item) { // JewelItem or WineItem
            return item.name;
        }
        return 'this asset';
    };

    const assetName = getAssetName(asset);

    useEffect(() => {
        const generateAnalysis = async (tab: AnalysisTab) => {
            const cacheKey = `${asset.id}-${tab}-${language}`;
            
            if (analyses[tab] || loading[tab]) return;
            if (analysisCache.has(cacheKey)) {
                setAnalyses(prev => ({ ...prev, [tab]: analysisCache.get(cacheKey)! }));
                return;
            }

            setLoading(prev => ({ ...prev, [tab]: true }));
            setErrors(prev => ({ ...prev, [tab]: '' }));

            try {
                let prompt = '';
                switch (tab) {
                    case 'provenance':
                        prompt = `As a senior specialist from Sotheby's, provide a detailed provenance report for "${assetName}". Based on its description ("${asset.description}"), elaborate on its potential history, creator's significance, and its importance in its field. The tone must be expert, authoritative, and formal. Do not use markdown.`;
                        break;
                    case 'market':
                        prompt = `As a senior market analyst for Knight Frank's Wealth Report, provide a concise market analysis for assets like "${assetName}". Discuss the current market appetite for this category, recent comparable auction results (you can invent plausible ones), and future investment potential. Tone must be data-driven and professional. Do not use markdown.`;
                        break;
                    case 'curation':
                        prompt = `As a head curator for a major private collection, write professional curator's notes for "${assetName}". Highlight its most compelling features, aesthetic/technical merits, and explain why it is a cornerstone piece for a world-class collection. The tone should be evocative, sophisticated, and appreciative. Do not use markdown.`;
                        break;
                }

                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
                });

                if (!response.ok) throw new Error('Failed to generate analysis');
                const data = await response.json();
                const resultText = data.text;

                setAnalyses(prev => ({ ...prev, [tab]: resultText }));
                analysisCache.set(cacheKey, resultText);

            } catch (err: any) {
                let errorMessage = 'AI is currently unavailable. Please try again later.';
                 if (err.message.includes('429')) {
                    errorMessage = 'Too many requests. Please wait a moment.';
                }
                setErrors(prev => ({ ...prev, [tab]: errorMessage }));
            } finally {
                setLoading(prev => ({ ...prev, [tab]: false }));
            }
        };

        generateAnalysis(activeTab);
    }, [activeTab, asset, language, analyses, loading, assetName]);

    const handleRequest = (type: 'Sale' | 'Transit') => {
        const title = type === 'Sale' ? `Initiate Private Sale: ${assetName}` : `Request Secure Transit: ${assetName}`;
        const assignee = type === 'Sale' ? 'Senior Partner' : 'Logistics Desk';

        onAddRequest({
            type: 'Action',
            title,
            assignee,
            status: 'Pending',
            details: `A request has been initiated regarding the curated asset: "${assetName}" (ID: ${asset.id}).`
        });
        alert(`Your request has been submitted. The ${assignee} will be in contact shortly.`);
    };

    const tabs = [
        { id: 'provenance' as AnalysisTab, label: 'Provenance & History', icon: <BookOpenIcon className="w-4 h-4" /> },
        { id: 'market' as AnalysisTab, label: 'Market Analysis', icon: <TrendingUpIcon className="w-4 h-4" /> },
        { id: 'curation' as AnalysisTab, label: 'Curator Notes', icon: <KeyIcon className="w-4 h-4" /> }
    ];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in overscroll-contain" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">{assetName}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10"><CloseIcon className="w-6 h-6" /></button>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
                    {/* Left: Image & Core Details */}
                    <div className="w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col">
                        <div className="aspect-square rounded-lg overflow-hidden bg-black mb-4">
                            <img src={asset.image} alt={assetName} className="w-full h-full object-cover"/>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{assetName}</h3>
                        {'artist' in asset && <p className="text-sm text-gray-400">{asset.artist}, {asset.year}</p>}
                        {'brand' in asset && <p className="text-sm text-gray-400">{asset.brand} - {asset.reference}</p>}
                        {'make' in asset && <p className="text-sm text-gray-400">{asset.year}</p>}
                        {'designer' in asset && <p className="text-sm text-gray-400">{asset.designer}</p>}
                        {'vineyard' in asset && <p className="text-sm text-gray-400">{asset.vineyard}, {asset.vintage}</p>}
                        <p className="text-lg font-bold text-cyan-300 mt-2">{asset.value}</p>
                        <p className="text-xs text-gray-500 mt-4 flex-grow overflow-y-auto">{asset.description}</p>
                        <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                             <Button size="sm" className="w-full" onClick={() => handleRequest('Sale')}>Initiate Private Sale Inquiry</Button>
                             <Button size="sm" variant="secondary" className="w-full" onClick={() => handleRequest('Transit')}>Request Secure Transit</Button>
                        </div>
                    </div>

                    {/* Right: AI Analysis */}
                    <div className="w-full md:w-2/3 flex flex-col">
                        <div className="flex border-b border-gray-800">
                           {tabs.map(tab => (
                               <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-900/10' : 'text-gray-400 hover:text-white'}`}>
                                   {tab.icon} {tab.label}
                               </button>
                           ))}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {loading[activeTab] && <div className="text-center text-gray-400">Generating analysis...</div>}
                            {errors[activeTab] && <p className="text-red-400">{errors[activeTab]}</p>}
                            {analyses[activeTab] && <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{analyses[activeTab]}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CuratedAssetDossierModal;