import React, { useState, useMemo, Suspense } from 'react';
import { marketIntelligenceCategories, marketIntelligenceReports, MarketIntelligenceReport } from '../data/marketIntelligenceData.ts';
import type { User } from '../App.tsx';
import type { PortfolioItem } from '../data/portfolioData.ts';
import type { RequestItem } from '../data/appData.ts';
import type { CircleMember } from '../data/circleData.ts';
import { useLocalization } from '../localization/LocalizationContext.tsx';
import { 
    TrendingUpIcon, 
    DocumentArrowDownIcon, 
    LockClosedIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    AIIcon,
    SearchIcon,
    PlusCircleIcon
} from './icons/EliteIcons.tsx';
import Button from './ui/Button.tsx';
import ServiceRequestModal from './ServiceRequestModal.tsx';

const tierLevels: Record<CircleMember['tier'], number> = {
    'Elit Access': 1,
    'Diamond Access': 2,
    'Royal Black Access': 3,
};

interface ReportItemProps {
    report: MarketIntelligenceReport;
    user: User;
    isExpanded: boolean;
    onToggle: () => void;
    onUpgrade: () => void;
    onGenerateBriefing: (report: MarketIntelligenceReport) => void;
    briefingState?: { text: string; loading: boolean; error: string };
}

const ReportItem: React.FC<ReportItemProps> = ({ report, user, isExpanded, onToggle, onUpgrade, onGenerateBriefing, briefingState }) => {
    const { t } = useLocalization();
    
    const userTierLevel = user.type === 'admin' ? 99 : user.tier ? tierLevels[user.tier] : 0;
    const requiredTierLevel = tierLevels[report.requiredTier] || 0;
    const hasAccess = userTierLevel >= requiredTierLevel;

    return (
        <div className="bg-[#111116]/60 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300">
            <div 
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5"
                onClick={onToggle}
            >
                <img src={report.image} alt={report.title} className="w-24 h-16 object-cover rounded-md flex-shrink-0" />
                <div className="flex-1">
                    <p className="font-semibold text-white">{report.title}</p>
                    <p className="text-xs text-gray-400">{report.date}</p>
                </div>
                {!hasAccess && <LockClosedIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />}
                <div className="text-gray-500">
                    {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 border-t border-gray-800 bg-black/20">
                    {hasAccess ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-cyan-400 mb-2">{t('marketIntel.summary')}</h4>
                                <p className="text-gray-300 text-sm mb-4">{report.summary}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-4">
                                <Button as="a" href={report.pdfUrl} download className="flex items-center gap-2">
                                    <DocumentArrowDownIcon className="w-4 h-4" />
                                    {t('marketIntel.downloadPdf')}
                                </Button>
                                <Button variant="secondary" onClick={() => onGenerateBriefing(report)} disabled={briefingState?.loading} className="flex items-center gap-2">
                                   <AIIcon className="w-4 h-4"/>
                                   {briefingState?.loading ? 'Generating...' : 'Generate AI Briefing'}
                                </Button>
                            </div>

                            {briefingState && !briefingState.loading && (briefingState.text || briefingState.error) && (
                                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 animate-fade-in">
                                    {briefingState.error ? (
                                        <p className="text-red-400">{briefingState.error}</p>
                                    ) : (
                                        <div>
                                            <h5 className="font-semibold text-white mb-2">Key Strategic Takeaways:</h5>
                                            <div className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{briefingState.text}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="text-center">
                            <h4 className="font-semibold text-white">{t('marketIntel.locked.title')}</h4>
                            <p className="text-gray-300 text-sm mt-1">{t('marketIntel.locked.message')}</p>
                            <p className="inline-block px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full mt-2 text-xs font-semibold border border-cyan-500/30">{report.requiredTier}</p>
                            <div className="mt-4">
                                <Button onClick={onUpgrade} size="sm">
                                    {t('marketIntel.locked.upgradeButton')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

interface MarketIntelligencePageProps {
    user: User;
    onUpgrade: () => void;
    portfolioItems: PortfolioItem[];
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const briefingCache = new Map<string, string>();

const MarketIntelligencePage: React.FC<MarketIntelligencePageProps> = ({ user, onUpgrade, portfolioItems, onAddRequest }) => {
    const { t, language } = useLocalization();
    const [expandedReportId, setExpandedReportId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [briefings, setBriefings] = useState<Record<number, { text: string; loading: boolean; error: string }>>({});
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    const recommendedReports = useMemo(() => {
        if (!portfolioItems || portfolioItems.length === 0) return [];
        const portfolioLocations = [...new Set(portfolioItems.map(p => t(p.locationKey).toLowerCase().split(',')[0].trim()))];

        const scoredReports = marketIntelligenceReports.map(report => {
            let score = 0;
            const reportText = `${report.title.toLowerCase()} ${report.summary.toLowerCase()}`;
            portfolioLocations.forEach(loc => {
                if (reportText.includes(loc)) score += 1;
            });
            if (report.category === 'global' || report.category === 'trends') score += 0.5;
            return { ...report, score };
        });

        return scoredReports.filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    }, [portfolioItems, t]);

    const filteredReports = useMemo(() => {
        return marketIntelligenceReports.filter(report =>
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleToggle = (reportId: number) => {
        setExpandedReportId(prevId => (prevId === reportId ? null : reportId));
    };

    const handleGenerateBriefing = async (report: MarketIntelligenceReport) => {
        const cacheKey = `${report.id}-${language}`;
        if (briefings[report.id]?.text || briefings[report.id]?.loading) return;
        if (briefingCache.has(cacheKey)) {
            setBriefings(prev => ({ ...prev, [report.id]: { text: briefingCache.get(cacheKey)!, loading: false, error: '' } }));
            return;
        }

        setBriefings(prev => ({ ...prev, [report.id]: { text: '', loading: true, error: '' } }));
        try {
            const prompt = `As a Senior Analyst at VESTRA ESTATES, create a concise, bulleted list of the top 3-5 key strategic takeaways from the following summary for an UHNW investor.
            Summary: "${report.summary}"`;

            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
            });

            if (!response.ok) throw new Error('Failed to generate briefing');
            
            const data = await response.json();
            const resultText = data.text;
            setBriefings(prev => ({ ...prev, [report.id]: { text: resultText, loading: false, error: '' } }));
            briefingCache.set(cacheKey, resultText);
// FIX: The 'error' variable in a catch block is of type 'unknown' in strict TypeScript. Added a type guard ('instanceof Error') to safely check for the error type before accessing its 'message' property. This resolves the error "Argument of type 'unknown' is not assignable to parameter of type 'string'".
        } catch (error) {
            console.error("AI briefing error:", error);
            let errorMessage = t('widgets.aiEvaluation.error');
            if (error instanceof Error) {
                if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
                    errorMessage = t('widgets.errors.rateLimit');
                }
            }
            setBriefings(prev => ({ ...prev, [report.id]: { text: '', loading: false, error: errorMessage } }));
        }
    };

    const handleSaveAnalysisRequest = (details: { request: string }) => {
        onAddRequest({
            type: 'Information',
            title: 'Custom Market Intelligence Report Request',
            assignee: 'Senior Analyst',
            status: 'Pending',
            details: details.request
        });
        alert('Your request has been submitted. A senior analyst will be in contact shortly.');
        setIsRequestModalOpen(false);
    };

    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-12 text-center">
                    <div className="flex justify-center text-cyan-400 mb-4"><TrendingUpIcon className="w-16 h-16" /></div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('marketIntel.mainTitle')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('marketIntel.mainSubtitle')}</p>
                </header>

                <div className="max-w-6xl mx-auto">
                    {recommendedReports.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">Recommended For You</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {recommendedReports.map(report => (
                                     <div key={report.id} className="group bg-[#0c0c10] border border-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/30 flex flex-col cursor-pointer" onClick={() => handleToggle(report.id)}>
                                        <img src={report.image} alt={report.title} className="w-full h-40 object-cover rounded-t-xl"/>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <p className="font-semibold text-white flex-grow">{report.title}</p>
                                            <p className="text-xs text-gray-400 mt-2">{report.date}</p>
                                        </div>
                                     </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="text-center mb-12">
                        <Button size="lg" variant="secondary" onClick={() => setIsRequestModalOpen(true)} className="flex items-center gap-2 mx-auto">
                            <PlusCircleIcon className="w-5 h-5"/>
                            Request Custom Analysis
                        </Button>
                    </div>

                    <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 py-4 mb-6">
                        <div className="relative max-w-4xl mx-auto">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search all reports..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/50 border border-gray-700 rounded-full pl-12 pr-4 py-3 text-lg focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {marketIntelligenceCategories.map(category => {
                            const reportsInCategory = filteredReports.filter(report => report.category === category.id);
                            if(reportsInCategory.length === 0) return null;

                            return (
                                <section key={category.id}>
                                    <h2 className="text-2xl font-bold text-white border-b-2 border-gray-800 pb-2 mb-6">{t(category.titleKey)}</h2>
                                    <div className="space-y-4">
                                        {reportsInCategory.map(report => (
                                            <ReportItem
                                                key={report.id}
                                                report={report}
                                                user={user}
                                                isExpanded={expandedReportId === report.id}
                                                onToggle={() => handleToggle(report.id)}
                                                onUpgrade={onUpgrade}
                                                onGenerateBriefing={handleGenerateBriefing}
                                                briefingState={briefings[report.id]}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Suspense fallback={null}>
                {isRequestModalOpen && (
                    <ServiceRequestModal
                        title="Request Custom Analysis"
                        prompt="Please describe the market analysis you require (e.g., specific region, asset class, or trend)."
                        placeholder="e.g., 'I would like a detailed report on the commercial real estate market in Zurich, focusing on the tech sector.'"
                        onClose={() => setIsRequestModalOpen(false)}
                        onSave={handleSaveAnalysisRequest}
                    />
                )}
            </Suspense>
        </>
    );
};

export default MarketIntelligencePage;