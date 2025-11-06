import React from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { passionAssetModules, PassionAsset, ManagedCollectionSummary } from '../data/passionAssetData';
import { ArtIcon, WatchIcon, CarIcon, JewelIcon, WineIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import WidgetCard from './ui/WidgetCard';

const iconMap: { [key in PassionAsset['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Art: ArtIcon,
    Watch: WatchIcon,
    Car: CarIcon,
    Jewel: JewelIcon,
    Wine: WineIcon,
};

interface PassionAssetPageProps {
    collections: ManagedCollectionSummary;
    onInitiateService: (serviceTitle: string) => void;
}

const PassionAssetPage: React.FC<PassionAssetPageProps> = ({ collections, onInitiateService }) => {
    const { t } = useLocalization();
    
    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Passion Asset Management</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Specialized advisory for collections of significant value and personal importance.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <WidgetCard title={t('generationalOffice.passion.overviewTitle')} className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-cyan-400">{collections.totalValue}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('generationalOffice.passion.totalValue')}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{collections.collections}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('generationalOffice.passion.collections')}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{collections.topAsset}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('generationalOffice.passion.topAsset')}</p>
                        </div>
                    </div>
                </WidgetCard>

                <div className="space-y-8">
                    {passionAssetModules.map(asset => {
                        const Icon = iconMap[asset.icon];
                        return (
                            <div key={asset.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0 text-cyan-400 bg-gray-900 p-5 rounded-full">
                                    <Icon className="w-12 h-12" />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-white">{asset.title}</h2>
                                    <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{asset.subtitle}</p>
                                    <p className="text-gray-300 mt-3">{asset.description}</p>
                                </div>
                                <div className="flex-shrink-0 mt-4 md:mt-0">
                                    <Button onClick={() => onInitiateService(asset.title)}>
                                        Initiate Service
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PassionAssetPage;