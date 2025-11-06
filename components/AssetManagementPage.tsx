
import React, { useEffect, useState } from 'react';
import type { PortfolioItem } from '../data/portfolioData';
import { MapPinIcon, MaximizeIcon } from './icons/EliteIcons';
import { useLocalization } from '../localization/LocalizationContext';

// FIX: Switched to static imports for react-leaflet to resolve TypeScript errors
// caused by incorrect type inference with React.lazy.
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

interface AssetManagementPageProps {
  portfolioItems: PortfolioItem[];
  onOpenPropertyDetail: (property: PortfolioItem) => void;
}

const customMarkerIcon = new L.DivIcon({
    className: 'pulsing-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
});

const AssetManagementPage: React.FC<AssetManagementPageProps> = ({ portfolioItems, onOpenPropertyDetail }) => {
    const [isClient, setIsClient] = useState(false);
    const { t } = useLocalization();

    useEffect(() => {
        // Since Leaflet relies on the `window` object, we ensure this component only renders on the client-side.
        setIsClient(true);
    }, []);

    const handleMarkerClick = (itemId: number) => {
        const element = document.getElementById(`property-${itemId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a temporary highlight effect to draw attention
            element.classList.add('animate-highlight');
            setTimeout(() => {
                element.classList.remove('animate-highlight');
            }, 1500); // Animation duration is 1.5s
        }
    };
    
  return (
    <div className="h-full flex flex-col">
      <header className="p-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white">{t('assetManagement.title')}</h1>
        <p className="text-gray-400">{t('assetManagement.subtitle')}</p>
      </header>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        {/* Interactive Map */}
        <div className="lg:col-span-2 h-64 lg:h-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {isClient && (
                 // FIX: Removed React.Suspense wrapper as components are no longer lazy-loaded.
                    <MapContainer center={[25, 10]} zoom={2} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true} className="z-0">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {portfolioItems.filter(item => item.lat && item.lon).map(item => (
                            <Marker 
                                key={item.id} 
                                position={[item.lat, item.lon]} 
                                icon={customMarkerIcon}
                                eventHandlers={{
                                    click: () => handleMarkerClick(item.id),
                                }}
                            >
                                <Tooltip direction="top" offset={[0, -10]} className="leaflet-tooltip-custom">
                                    <div className="text-center">
                                        <p className="font-bold">{t(item.nameKey)}</p>
                                        <p className="text-cyan-400">{item.value}</p>
                                    </div>
                                </Tooltip>
                            </Marker>
                        ))}
                    </MapContainer>
            )}
        </div>

        {/* Property List */}
        <div className="lg:col-span-1 h-full overflow-y-auto border-l border-gray-800">
            <div className="p-4 space-y-4">
                {portfolioItems.map(item => (
                    <div 
                        id={`property-${item.id}`}
                        key={item.id} 
                        className="bg-white/5 p-4 rounded-lg flex gap-4 transition-all duration-300 transform hover:scale-[1.02] hover:bg-white/10"
                    >
                        <img src={item.image} alt={t(item.nameKey)} className="w-24 h-24 object-cover rounded-md" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{t(item.nameKey)}</h3>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPinIcon className="w-3 h-3"/> {t(item.locationKey)}</p>
                            <p className="text-lg font-bold text-cyan-400 mt-2">{item.value}</p>
                        </div>
                        <button 
                            onClick={() => onOpenPropertyDetail(item)}
                            className="self-start p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                            title="View Details"
                        >
                            <MaximizeIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagementPage;
