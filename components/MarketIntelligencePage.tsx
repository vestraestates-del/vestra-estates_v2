import React, { useState } from 'react';
import { marketIntelligenceCategories, marketIntelligenceReports, MarketIntelligenceReport } from '../data/marketIntelligenceData';
import type { User } from '../App';
import type { CircleMember } from '../data/circleData';
import { useLocalization } from '../localization/LocalizationContext';
import { 
    TrendingUpIcon, 
    DocumentArrowDownIcon, 
    LockClosedIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from './icons/EliteIcons';
import Button from './ui/Button';

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
}

const ReportItem: React.FC<ReportItemProps> = ({ report, user, isExpanded, onToggle, onUpgrade }) => {
    const { t } = useLocalization();
    
    const userTierLevel = user.type === 'admin' ? 99 : tierLevels[user.tier] || 0;
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
                        <div>
                            <h4 className="font-semibold text-cyan-400 mb-2">{t('marketIntel.summary')}</h4>
                            <p className="text-gray-300 text-sm mb-4">{report.summary}</p>
                            <Button as="a" href={report.pdfUrl} download className="flex items-center gap-2">
                                <DocumentArrowDownIcon className="w-4 h-4" />
                                {t('marketIntel.downloadPdf')}
                            </Button>
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
}

const MarketIntelligencePage: React.FC<MarketIntelligencePageProps> = ({ user, onUpgrade }) => {
    const { t } = useLocalization();
    const [expandedReportId, setExpandedReportId] = useState<number | null>(null);

    const handleToggle = (reportId: number) => {
        setExpandedReportId(prevId => (prevId === reportId ? null : reportId));
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4">
                    <TrendingUpIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('marketIntel.mainTitle')}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('marketIntel.mainSubtitle')}</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-12">
                {marketIntelligenceCategories.map(category => (
                    <section key={category.id}>
                        <h2 className="text-2xl font-bold text-white border-b-2 border-gray-800 pb-2 mb-6">{t(category.titleKey)}</h2>
                        <div className="space-y-4">
                            {marketIntelligenceReports
                                .filter(report => report.category === category.id)
                                .map(report => (
                                    <ReportItem
                                        key={report.id}
                                        report={report}
                                        user={user}
                                        isExpanded={expandedReportId === report.id}
                                        onToggle={() => handleToggle(report.id)}
                                        onUpgrade={onUpgrade}
                                    />
                                ))
                            }
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default MarketIntelligencePage;
