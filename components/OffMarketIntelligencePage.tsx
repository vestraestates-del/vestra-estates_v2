import React from 'react';
import { OffMarketProperty } from '../data/offMarketData';
import { useLocalization } from '../localization/LocalizationContext';
import { VaultIcon, ThreeDIcon } from './icons/EliteIcons';

interface OffMarketIntelligencePageProps {
    properties: OffMarketProperty[];
    onOpenDetail: (property: OffMarketProperty) => void;
}

const OffMarketIntelligencePage: React.FC<OffMarketIntelligencePageProps> = ({ properties, onOpenDetail }) => {
    const { t } = useLocalization();

    const categories: { key: OffMarketProperty['category']; titleKey: string }[] = [
        { key: 'Villa', titleKey: 'offMarket.villas' },
        { key: 'Mansion', titleKey: 'offMarket.mansions' },
        { key: 'Estate', titleKey: 'offMarket.estates' },
        { key: 'Penthouse', titleKey: 'offMarket.penthouses' },
        { key: 'Island', titleKey: 'offMarket.islands' },
        { key: 'Portfolio', titleKey: 'offMarket.portfolios' },
    ];

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4">
                    <VaultIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('opportunities.title')}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('opportunities.subtitle')}</p>
            </header>

            <div className="max-w-7xl mx-auto space-y-12">
                {categories.map(category => {
                    const filteredItems = properties.filter(p => p.category === category.key);
                    if (filteredItems.length === 0) return null;

                    return (
                        <section key={category.key}>
                            <h2 className="text-2xl font-bold text-white border-b-2 border-gray-800 pb-2 mb-6">{t(category.titleKey)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredItems.map(item => (
                                    <div 
                                        key={item.id}
                                        onClick={() => onOpenDetail(item)}
                                        className="group bg-[#0c0c10] border border-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/30 flex flex-col cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden">
                                            <img src={item.image} alt={item.codename} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-4">
                                                <h2 className="text-xl font-bold text-white">{item.codename}</h2>
                                                <p className="text-sm text-gray-400 font-mono">{item.location}</p>
                                            </div>
                                            {item.modelUrl && (
                                                <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2" title="3D Tour Available">
                                                    <ThreeDIcon className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-4 flex-grow">
                                            <p className="text-sm text-gray-300 italic">"{item.teaser}"</p>
                                        </div>

                                        <div className="p-4 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
                                            {item.stats.slice(0, 3).map(stat => (
                                                <div key={stat.label}>
                                                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default OffMarketIntelligencePage;