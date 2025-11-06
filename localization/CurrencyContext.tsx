import React, { createContext, useState, useContext, useMemo } from 'react';
import { parseCurrencyValue } from '../utils/currency';

export type Currency = 'USD' | 'EUR' | 'TRY' | 'RUB' | 'GBP';
type CurrencySymbol = '$' | '€' | '₺' | '₽' | '£';

const conversionRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.93,
    TRY: 32.20,
    RUB: 90.50,
    GBP: 0.79,
};

const currencySymbols: Record<Currency, CurrencySymbol> = {
    USD: '$',
    EUR: '€',
    TRY: '₺',
    RUB: '₽',
    GBP: '£',
};

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatCurrency: (valueString: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<Currency>('USD');

    const formatCurrency = useMemo(() => (valueString: string): string => {
        if (!valueString || typeof valueString !== 'string') return valueString;
        
        const { value, suffix } = parseCurrencyValue(valueString);
        if (isNaN(value) || value === 0) return valueString; // Return original if parsing fails or value is 0

        const rate = conversionRates[currency];
        const symbol = currencySymbols[currency];

        const convertedValue = value * rate;

        const formattedValue = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: convertedValue < 10 ? 2 : 0,
        }).format(convertedValue);
        
        return `${symbol}${formattedValue}${suffix}`;
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
