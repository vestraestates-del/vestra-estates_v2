import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import { LogoConfig } from '../../icons/VestraLogo';
import BrandingForm from '../BrandingForm'; 
import Button from '../../ui/Button';
import { initialLogs, LogEntry } from '../../../data/adminData';
import { SearchIcon } from '../../icons/EliteIcons';
import { BackgroundImages } from '../../../App';

interface SystemSettingsProps {
    onSave: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
}

interface LanguageSetting {
    code: string;
    name: string;
    flag: string;
    enabled: boolean;
}

const initialLanguageSettings: LanguageSetting[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', enabled: true },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', enabled: true },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', enabled: true },
    { code: 'fr', name: 'Français', flag: '🇫🇷', enabled: true },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', enabled: true },
    { code: 'es', name: 'Español', flag: '🇪🇸', enabled: true },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', enabled: true },
];

const getLogLevelClasses = (level: LogEntry['level']) => {
    switch (level) {
        case 'ERROR': return 'bg-red-500/20 text-red-300 border-red-500/30';
        case 'WARN': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        case 'FATAL': return 'bg-red-800/50 text-red-200 border-red-700/50';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-700/50';
    }
};

const SystemSettings: React.FC<SystemSettingsProps> = ({ onSave, currentLogo, currentBgs }) => {
    const [languageSettings, setLanguageSettings] = useState<LanguageSetting[]>(initialLanguageSettings);
    const [defaultLanguage, setDefaultLanguage] = useState<string>('en');
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
    const [levelFilter, setLevelFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredLogs = useMemo(() => {
        return logs
            .filter(log => levelFilter === 'All' || log.level === levelFilter)
            .filter(log =>
                log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [logs, levelFilter, searchTerm]);

    const handleToggleLanguage = (code: string) => {
        if (code === defaultLanguage) {
            alert("You cannot disable the default language.");
            return;
        }
        setLanguageSettings(prev =>
            prev.map(lang =>
                lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
            )
        );
    };

    const handleSetDefault = (code: string) => {
        const langToSet = languageSettings.find(l => l.code === code);
        if (langToSet && !langToSet.enabled) {
            // Automatically enable a language when it's set as default
            setLanguageSettings(prev =>
                prev.map(lang =>
                    lang.code === code ? { ...lang, enabled: true } : lang
                )
            );
        }
        setDefaultLanguage(code);
    };

    const handleSaveLanguages = () => {
        alert("Language settings saved!");
    };

    const handleExport = (dataType: 'Users' | 'Properties' | 'Payments') => {
        let csvContent = "data:text/csv;charset=utf-8,";
        let headers = "", data = "";
        switch (dataType) {
            case 'Users': headers = "ID,Name,Country,Subscription,Status\n"; data = "1,Adrian Roth,Switzerland,Diamond Access,Active\n2,Sofia Petrova,Monaco,Royal Black Access,Active"; break;
            case 'Properties': headers = "ID,Name,Location,Value\n"; data = "1,The Bosphorus Estate,Istanbul,$115M\n2,Aspen Mountain Retreat,Aspen,$75M"; break;
            case 'Payments': headers = "ID,User,Amount,Date,Status\n"; data = "pay_1,Adrian Roth,$50000,2024-07-01,Succeeded"; break;
        }
        csvContent += headers + data;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${dataType}_Export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const logLevels: ('All' | LogEntry['level'])[] = ['All', 'INFO', 'WARN', 'ERROR', 'FATAL'];

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">System Settings</h1>
                <p className="text-gray-400">Manage global platform settings.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BrandingForm onSave={onSave} currentLogo={currentLogo} currentBgs={currentBgs} />
                <WidgetCard title="Multi-Language Settings">
                    {/* Language settings content... */}
                </WidgetCard>
                <div className="md:col-span-2">
                    <WidgetCard title="Logging System">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {logLevels.map(level => (
                                    <Button
                                        key={level}
                                        size="sm"
                                        variant={levelFilter === level ? 'primary' : 'secondary'}
                                        onClick={() => setLevelFilter(level)}
                                    >
                                        {level}
                                    </Button>
                                ))}
                            </div>
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-gray-900 border border-gray-700 rounded-md pl-9 pr-3 py-1.5 text-sm w-full sm:w-auto"
                                />
                            </div>
                        </div>
                        <div className="h-96 overflow-y-auto bg-black/50 rounded-md p-2 space-y-2 font-mono text-xs">
                            {filteredLogs.map(log => (
                                <div key={log.id} className={`p-2 rounded flex items-start gap-3 border-l-4 ${getLogLevelClasses(log.level)}`}>
                                    <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${getLogLevelClasses(log.level)}`}>{log.level}</span>
                                    <span className="text-cyan-400">[{log.user}]</span>
                                    <span className="text-gray-300 flex-1">{log.action}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" size="sm" className="mt-4" onClick={() => setLogs([])}>Clear Logs</Button>
                    </WidgetCard>
                </div>
                 <WidgetCard title="Data Export">
                     <p className="text-gray-400 text-sm mb-4">Export platform data in CSV format.</p>
                     <div className="flex flex-wrap gap-4">
                        <Button variant="ghost" size="sm" onClick={() => handleExport('Users')}>Export Users</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleExport('Properties')}>Export Properties</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleExport('Payments')}>Export Payments</Button>
                     </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default SystemSettings;
