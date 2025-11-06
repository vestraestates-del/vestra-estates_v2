
import React from 'react';
import WidgetCard from '../ui/WidgetCard';
import { TrendingUpIcon } from '../icons/EliteIcons';
// FIX: Added file extension to appData import
import { portfolioHistoryData, marketComparisonData } from '../../data/appData.ts';
import { AreaChart, Area, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useLocalization } from '../../localization/LocalizationContext';
import { useCurrency } from '../../localization/CurrencyContext';
import { parseCurrencyValue } from '../../utils/currency';

const PropertyValueWidget: React.FC = () => {
    const { t } = useLocalization();
    const { currency, formatCurrency } = useCurrency();

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const formattedValue = formatCurrency(`$${payload[0].value}M`);
            return (
                <div className="bg-gray-900/80 p-2 border border-gray-700 rounded-md shadow-lg">
                    <p className="label text-sm text-white">{t(`months.${String(label).toLowerCase()}`)}</p>
                    <p className="intro text-cyan-400 font-bold">{`${t('widgets.propertyValue.valueLabel')}: ${formattedValue}`}</p>
                </div>
            );
        }
        return null;
    };
    
    const ComparisonTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/80 p-3 border border-gray-700 rounded-md shadow-lg">
                    <p className="label text-sm text-white mb-2">{t(`months.${String(label).toLowerCase()}`)}</p>
                    {payload.map((pld: any) => (
                        <div key={pld.dataKey} style={{ color: pld.color }} className="flex justify-between items-center text-xs">
                           <span>{pld.name}:</span>
                           <span className="font-bold ml-4">{pld.value}%</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };
  
    const latestValue = portfolioHistoryData[portfolioHistoryData.length - 1].value;
    const previousValue = portfolioHistoryData[portfolioHistoryData.length - 2].value;
    const change = latestValue - previousValue;
    const percentageChange = ((change / previousValue) * 100).toFixed(2);
    const isPositive = change > 0;

    const formattedLatestValue = formatCurrency(`$${latestValue}M`);
    const { value: changeValue, suffix: changeSuffix } = parseCurrencyValue(formatCurrency(`$${change}M`));


  return (
    <WidgetCard title={t('widgets.propertyValue.title')} actionIcon={<TrendingUpIcon className="w-4 h-4" />}>
        <div className="flex items-start">
            <div className="flex-1">
                <p className="text-3xl font-bold text-white">{formattedLatestValue}</p>
                <p className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{changeValue}{changeSuffix} ({percentageChange}%) {t('widgets.propertyValue.lastMonth')}
                </p>
            </div>
            <div className="w-2/3 h-24 -mr-4 -mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={portfolioHistoryData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                         <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Comparative Market Analysis Section */}
        <div className="mt-6 pt-4 border-t border-gray-800">
            <h4 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">MARKET COMPARISON (% GROWTH YTD)</h4>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={marketComparisonData}
                        margin={{ top: 5, right: 20, left: -25, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                        <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                        <Tooltip content={<ComparisonTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px', color: '#d1d5db' }} />
                        <Line type="monotone" dataKey="portfolio" name="Your Portfolio" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="luxuryIndex" name="Luxury Property Index" stroke="#a3a3a3" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="globalIndex" name="Global Real Estate Index" stroke="#737373" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </WidgetCard>
  );
};

export default PropertyValueWidget;