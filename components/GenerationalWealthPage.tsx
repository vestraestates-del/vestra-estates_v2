import React from 'react';
import { useLocalization } from '../localization/LocalizationContext.tsx';
import { generationalWealthServices, WealthService } from '../data/generationalWealthData.ts';
import { TreeIcon, BuildingKeyIcon, UsersGroupIcon, DiamondIcon, PlaneBoatIcon, FingerprintIcon } from './icons/EliteIcons.tsx';

const iconMap: { [key in WealthService['icon']]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Tree: TreeIcon,
    BuildingKey: BuildingKeyIcon,
    UsersGroup: UsersGroupIcon,
    Diamond: DiamondIcon,
    PlaneBoat: PlaneBoatIcon,
    Fingerprint: FingerprintIcon,
};

interface GenerationalWealthPageProps {
    onNavigate: (page: string) => void;
}

const GenerationalWealthPage: React.FC<GenerationalWealthPageProps> = ({ onNavigate }) => {
    const { t } = useLocalization();
    const serviceCount = generationalWealthServices.length;
    const angleStep = 360 / serviceCount;

    return (
        <div className="p-4 md:p-8 h-full flex flex-col justify-center items-center overflow-hidden">
            <header className="text-center mb-8 md:mb-16 animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">Generational Wealth Office</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">Your strategic center for the preservation and growth of multi-generational legacy.</p>
            </header>

            <div className="relative w-96 h-96 md:w-[500px] md:h-[500px] flex items-center justify-center">
                {/* Central Hub */}
                <div className="group absolute w-40 h-40 md:w-52 md:h-52 bg-[#111116] border-2 border-cyan-500/30 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl animate-pulse-glow">
                    <TreeIcon className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                    <h2 className="font-bold text-lg md:text-xl text-white">Family Legacy</h2>
                    <p className="text-xs text-gray-500">Core Services</p>
                </div>

                {/* Satellite Services */}
                {generationalWealthServices.map((service, index) => {
                    const angle = angleStep * index;
                    const Icon = iconMap[service.icon];
                    const radius = 180; // md: 240
                    const x = radius * Math.cos((angle - 90) * Math.PI / 180);
                    const y = radius * Math.sin((angle - 90) * Math.PI / 180);

                    return (
                        <React.Fragment key={service.id}>
                            {/* Connecting Line */}
                            <div
                                className="absolute top-1/2 left-1/2 h-0.5 bg-cyan-800/50 origin-left transition-all duration-500"
                                style={{
                                    width: `${radius}px`,
                                    transform: `translate(0, -50%) rotate(${angle}deg)`,
                                    animation: `draw-line 1s ${index * 0.1}s ease-out forwards`,
                                }}
                            ></div>
                            <style>{`
                                @keyframes draw-line {
                                    from { width: 0; }
                                    to { width: ${radius}px; }
                                }
                            `}</style>

                            {/* Service Node */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                                <button
                                    onClick={() => onNavigate(service.id)}
                                    className="relative w-20 h-20 bg-[#111116] border-2 border-gray-700 rounded-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-cyan-500 hover:scale-110 animate-fade-in"
                                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                                >
                                    <Icon className="w-7 h-7 text-cyan-400" />
                                    <p className="text-xs text-white mt-1">{service.title}</p>
                                </button>
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-900 border border-gray-700 rounded-md text-xs text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2">
                                    {service.description}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default GenerationalWealthPage;