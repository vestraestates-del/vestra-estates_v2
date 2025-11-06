

import React, { createContext, useState, useContext, useMemo } from 'react';
// FIX: Added file extension to translations import
import { translations } from './translations.ts';

export type Language = 'en' | 'tr' | 'ru' | 'fr' | 'it' | 'es' | 'ar';

interface LocalizationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = useMemo(() => (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];
        
        // Find the translation in the current language
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) break;
        }

        // If not found, fall back to English
        if (result === undefined) {
            let fallbackResult: any = translations.en;
            for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
                if (fallbackResult === undefined) return key; // Return the key if not in English either
            }
            return fallbackResult || key;
        }
        
        return result;
    }, [language]);
    
    return (
        <LocalizationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};