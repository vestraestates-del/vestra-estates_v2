import React, { useState, useEffect } from 'react';
import WidgetCard from '../ui/WidgetCard';
import Button from '../ui/Button';
import { LogoConfig } from '../icons/VestraLogo';
import { BackgroundImages } from '../../App';

interface BrandingFormProps {
    onSave: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
}

const fontFamilies = [
    { name: 'System Sans-Serif', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" },
    { name: 'Serif', value: "'Times New Roman', Times, serif" },
    { name: 'Monospace', value: "'Courier New', Courier, monospace" },
];

const BrandingForm: React.FC<BrandingFormProps> = ({ onSave, currentLogo, currentBgs }) => {
    const [formState, setFormState] = useState<LogoConfig>(currentLogo);
    const [activeLogoTab, setActiveLogoTab] = useState<LogoConfig['type']>(currentLogo.type);
    
    const [dayBg, setDayBg] = useState(currentBgs.day);
    const [eveningBg, setEveningBg] = useState(currentBgs.evening);
    const [nightBg, setNightBg] = useState(currentBgs.night);

    useEffect(() => {
        setFormState(currentLogo);
        setActiveLogoTab(currentLogo.type);
        setDayBg(currentBgs.day);
        setEveningBg(currentBgs.evening);
        setNightBg(currentBgs.night);
    }, [currentLogo, currentBgs]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSave = () => {
        const newLogoConfig: LogoConfig = { ...formState, type: activeLogoTab };
        
        // Clear unused properties based on type
        if (activeLogoTab === 'text') {
            newLogoConfig.url = undefined;
        } else {
            newLogoConfig.text = undefined;
        }
        
        const newBgs = { day: dayBg, evening: eveningBg, night: nightBg };
        onSave(newLogoConfig, newBgs);
        alert('Branding settings saved!');
    };

    const logoTabs: { id: LogoConfig['type'], name: string }[] = [
        { id: 'text', name: 'Text' },
        { id: 'image', name: 'Image' },
        { id: 'video', name: 'Video' },
    ];

    return (
        <WidgetCard title="Login Screen Branding">
            <div className="space-y-6">
                {/* Logo Settings */}
                <section>
                    <h4 className="text-base font-semibold text-gray-300 mb-2">Logo Configuration</h4>
                    <div className="flex border-b border-gray-700 mb-4">
                        {logoTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveLogoTab(tab.id)}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeLogoTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                    <div>
                        {activeLogoTab === 'text' && (
                            <div>
                                <label htmlFor="text" className="block text-sm font-medium text-gray-400 mb-1">Logo Text</label>
                                <input id="text" name="text" type="text" value={formState.text || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        )}
                        {(activeLogoTab === 'image' || activeLogoTab === 'video') && (
                            <div>
                                <label htmlFor="url" className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                                <input id="url" name="url" type="text" value={formState.url || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        )}
                    </div>
                </section>

                {/* Sizing & Style Settings */}
                 <section className="pt-4 border-t border-gray-800">
                     <h4 className="text-base font-semibold text-gray-300 mb-3">Sizing & Style</h4>
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="navSize" className="block text-sm font-medium text-gray-400 mb-1">Nav Logo Height (px)</label>
                                <input id="navSize" name="navSize" type="number" value={formState.navSize || 40} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                             <div>
                                <label htmlFor="mobileNavSize" className="block text-sm font-medium text-gray-400 mb-1">Mobile Nav Height (px)</label>
                                <input id="mobileNavSize" name="mobileNavSize" type="number" value={formState.mobileNavSize || 32} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                             <div>
                                <label htmlFor="loginSize" className="block text-sm font-medium text-gray-400 mb-1">Login Logo Height (px)</label>
                                <input id="loginSize" name="loginSize" type="number" value={formState.loginSize || 80} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                            </div>
                        </div>
                        {activeLogoTab === 'text' && (
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
                                 <div>
                                    <label htmlFor="textColor" className="block text-sm font-medium text-gray-400 mb-1">Text Color</label>
                                    <input id="textColor" name="textColor" type="text" value={formState.textColor || '#06b6d4'} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300" />
                                 </div>
                                  <div>
                                    <label htmlFor="fontWeight" className="block text-sm font-medium text-gray-400 mb-1">Font Weight</label>
                                    <select id="fontWeight" name="fontWeight" value={formState.fontWeight || 'bold'} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300">
                                        <option value="normal">Normal</option>
                                        <option value="bold">Bold</option>
                                    </select>
                                 </div>
                                  <div>
                                    <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-400 mb-1">Font Family</label>
                                    <select id="fontFamily" name="fontFamily" value={formState.fontFamily || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300">
                                        {fontFamilies.map(font => <option key={font.name} value={font.value}>{font.name}</option>)}
                                    </select>
                                 </div>
                             </div>
                        )}
                     </div>
                </section>


                {/* Background Settings */}
                <section className="pt-4 border-t border-gray-800">
                    <h4 className="text-base font-semibold text-gray-300 mb-2">Dynamic Background Images</h4>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="dayBg" className="block text-sm font-medium text-gray-400 mb-1">Day Background URL (6am - 6pm)</label>
                            <input id="dayBg" type="text" value={dayBg} onChange={(e) => setDayBg(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                         <div>
                            <label htmlFor="eveningBg" className="block text-sm font-medium text-gray-400 mb-1">Evening Background URL (6pm - 9pm)</label>
                            <input id="eveningBg" type="text" value={eveningBg} onChange={(e) => setEveningBg(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                         <div>
                            <label htmlFor="nightBg" className="block text-sm font-medium text-gray-400 mb-1">Night Background URL (9pm - 6am)</label>
                            <input id="nightBg" type="text" value={nightBg} onChange={(e) => setNightBg(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500" />
                        </div>
                    </div>
                </section>
                
                <div className="pt-4">
                    <Button onClick={handleSave} className="w-full">Save Branding</Button>
                </div>
            </div>
        </WidgetCard>
    );
};

export default BrandingForm;