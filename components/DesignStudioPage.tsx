import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { designStudioCategories, DesignStudioCategory } from '../data/designStudioData';
import { ShowcaseIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import type { RequestItem } from '../data/appData';

interface DesignStudioPageProps {
    onAddRequest: (request: Omit<RequestItem, 'id' | 'requester'>) => void;
}

const CategorySection: React.FC<{
    category: DesignStudioCategory;
    isExpanded: boolean;
    onToggle: () => void;
    onBookSession: () => void;
}> = ({ category, isExpanded, onToggle, onBookSession }) => {
    const { t } = useLocalization();

    return (
        <div className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <div className="relative h-48 group cursor-pointer" onClick={onToggle}>
                <img src={category.heroImage} alt={t(category.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 flex justify-between items-end w-full">
                    <h2 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{t(category.titleKey)}</h2>
                    <div className="text-white bg-black/30 rounded-full p-2">
                        {isExpanded ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
                    </div>
                </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 md:p-8 space-y-12">
                    {/* Showreel */}
                    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
                        <video src={category.showreelUrl} controls autoPlay muted loop className="w-full aspect-video" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Philosophy & Awards */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-cyan-400 mb-3">{t('designStudio.philosophy')}</h3>
                                <p className="text-gray-300 leading-relaxed">{t(category.philosophyKey)}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-cyan-400 mb-3">{t('designStudio.awards')}</h3>
                                <ul className="space-y-2">
                                    {category.awards.map(award => (
                                        <li key={award} className="flex items-center gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                                            <span className="text-gray-300">{award}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Portfolio Images */}
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3">{t('designStudio.portfolioImages')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {category.images.map((img, index) => (
                                    <div key={index} className="aspect-square rounded-lg overflow-hidden group">
                                        <img src={img} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 text-center">
                        <Button size="lg" onClick={onBookSession}>
                            {t('designStudio.bookSessionButton')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DesignStudioPage: React.FC<DesignStudioPageProps> = ({ onAddRequest }) => {
    const { t } = useLocalization();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const handleToggleCategory = (categoryId: string) => {
        setExpandedCategory(prev => (prev === categoryId ? null : categoryId));
    };

    const handleBookSession = (category: DesignStudioCategory) => {
        onAddRequest({
            type: 'Action',
            title: `Design Session Request: ${t(category.titleKey)}`,
            assignee: 'Design Principal',
            status: 'Pending',
        });
        alert(t('designStudio.sessionRequestSuccess'));
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4">
                    <ShowcaseIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('designStudio.pageTitle')}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('designStudio.pageSubtitle')}</p>
            </header>

            <div className="max-w-6xl mx-auto space-y-8">
                {designStudioCategories.map(cat => (
                    <CategorySection
                        key={cat.id}
                        category={cat}
                        isExpanded={expandedCategory === cat.id}
                        onToggle={() => handleToggleCategory(cat.id)}
                        onBookSession={() => handleBookSession(cat)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DesignStudioPage;