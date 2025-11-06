import React from 'react';
import { useLocalization, Language } from '../../localization/LocalizationContext';
import { useCurrency, Currency } from '../../localization/CurrencyContext';

const languages: { code: Language, name: string, flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const currencies: { code: Currency, name: string }[] = [
    { code: 'USD', name: 'USD ($)' },
    { code: 'EUR', name: 'EUR (€)' },
    { code: 'TRY', name: 'TRY (₺)' },
    { code: 'RUB', name: 'RUB (₽)' },
    { code: 'GBP', name: 'GBP (£)' },
];

const LanguageSelector: React.FC = () => {
    const { language, setLanguage, t } = useLocalization();
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="px-3 py-2 space-y-2 border-t border-gray-800">
            <div>
                <label htmlFor="language-select" className="text-xs text-gray-500">{t('selector.language')}</label>
                <select 
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md mt-1 px-2 py-1 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                    ))}
                </select>
            </div>
             <div>
                <label htmlFor="currency-select" className="text-xs text-gray-500">{t('selector.currency')}</label>
                <select 
                    id="currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md mt-1 px-2 py-1 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                    {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>{curr.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LanguageSelector;
