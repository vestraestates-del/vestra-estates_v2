import React from 'react';
import WidgetCard from '../ui/WidgetCard';
import { BriefcaseIcon, MaximizeIcon } from '../icons/EliteIcons';
import type { PortfolioItem } from '../../data/portfolioData';
import { useLocalization } from '../../localization/LocalizationContext';
import { useCurrency } from '../../localization/CurrencyContext';

interface PortfolioWidgetProps {
  portfolioItems: PortfolioItem[];
  onSelectProperty: (property: PortfolioItem) => void;
  selectedProperty: PortfolioItem | null;
  onOpenPropertyDetail: (property: PortfolioItem) => void;
}

const PortfolioWidget: React.FC<PortfolioWidgetProps> = ({ portfolioItems, onSelectProperty, selectedProperty, onOpenPropertyDetail }) => {
  const { t } = useLocalization();
  const { formatCurrency } = useCurrency();
  const widgetProperties = portfolioItems.slice(0, 4);

  return (
    <WidgetCard title={t('widgets.portfolio.title')} actionIcon={<BriefcaseIcon className="w-4 h-4" />}>
      <div className="space-y-3">
        {widgetProperties.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center gap-4 p-2 rounded-r-lg cursor-pointer transition-all duration-200 border-l-4 ${selectedProperty?.id === item.id ? 'bg-cyan-500/10 border-cyan-500' : 'border-transparent hover:bg-white/5 hover:border-gray-700'}`}
            onClick={() => onSelectProperty(item)}
          >
            <img src={item.image} alt={t(item.nameKey)} className="w-16 h-12 object-cover rounded-md" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-200">{t(item.nameKey)}</p>
              <p className="text-xs text-gray-400">{t(item.locationKey)}</p>
            </div>
            <div className="text-sm font-bold text-cyan-400 ps-2">{formatCurrency(item.value)}</div>
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // prevent onSelectProperty from firing
                    onOpenPropertyDetail(item);
                }}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full"
                title={t('widgets.portfolio.viewDetails')}
            >
                <MaximizeIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default PortfolioWidget;