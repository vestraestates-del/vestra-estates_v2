import React, { useEffect, useState, useRef useMemo } from 'react';
import type { PortfolioItem } from '../data/portfolioData.ts';
import { MapPinIcon, MaximizeIcon, FilterIcon } from './icons/EliteIcons.tsx';
import { useLocalization } from '../localization/LocalizationContext.tsx';
import { useCurrency } from '../localization/CurrencyContext.tsx';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from './ui/Button.tsx';

interface AssetManagementPageProps {
  portfolioItems: PortfolioItem[];
  onOpenPropertyDetail: (property: PortfolioItem) => void;
}

const customMarkerIcon = (isActive: boolean) => new L.DivIcon({
    className: `pulsing-marker ${isActive ? 'active' : ''}`,
    html: `<div class="pulsing-dot"></div><div class="pulsing-halo"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Custom styles for active marker
const activeMarkerStyle = `
    .pulsing-marker.active .pulsing-dot {
        transform: scale(1.5);
        background-color: #ffde59; /* A gold color */
    }
    .pulsing-marker.active .pulsing-halo {
        animation: none;
        border: 2px solid #ffde59;
    }
    .leaflet-popup-content-wrapper {
        background: #111116;
        color: #e5e7eb;
        border-radius: 8px;
        border: 1px solid #06b6d4;
    }
    .leaflet-popup-content {
        margin: 10px;
        font-family: inherit;
    }
    .leaflet-popup-tip {
        background: #111116;
    }
    .leaflet-popup-close-button {
        color: #e5e7eb !important;
    }
`;


const ChangeView: React.FC<{ bounds: L.LatLngBoundsExpression | null }> = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.flyToBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

const continents: Record<string, [number, number, number, number]> = {
    Europe: [36, -10, 71, 40],
    Americas: [-59, -168, 83, -34],
    Asia: [-11, 25, 81, 180],
};

const valueRanges: Record<string, [number, number]> = {
    '0-100': [0, 100],
    '100-500': [100, 500],
    '500+': [500, Infinity],
};


const AssetManagementPage: React.FC<AssetManagementPageProps> = ({ portfolioItems, onOpenPropertyDetail }) => {
    const [isClient, setIsClient] = useState(false);
    const { t } = useLocalization();
    const { formatCurrency } = useCurrency();
    const mapRef = useRef<L.Map>(null);
    const [activePropertyId, setActivePropertyId] = useState<number | null>(null);

    const [regionFilter, setRegionFilter] = useState('All');
    const [valueFilter, setValueFilter] = useState('All');

    useEffect(() => {
        setIsClient(true);
    }, []);

    const filteredPortfolio = useMemo(() => {
        return portfolioItems.filter(item => {
            const inRegion = regionFilter === 'All' || (
                continents[regionFilter] &&
                item.lat >= continents[regionFilter][0] && item.lat <= continents[regionFilter][2] &&
                item.lon >= continents[regionFilter][1] && item.lon <= continents[regionFilter][3]
            );

            const value = parseFloat(item.value.replace(/[^0-9.]/g, ''));
            const inValueRange = valueFilter === 'All' || (
                valueRanges[valueFilter] &&
                value >= valueRanges[valueFilter][0] && value < valueRanges[valueFilter][1]
            );

            return inRegion && inValueRange;
        });
    }, [portfolioItems, regionFilter, valueFilter]);

    const bounds = useMemo(() => {
        if (filteredPortfolio.length > 0) {
            const lats = filteredPortfolio.map(p => p.lat);
            const lons = filteredPortfolio.map(p => p.lon);
            return [[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]] as L.LatLngBoundsExpression;
        }
        return null;
    }, [filteredPortfolio]);

    const handleMarkerClick = (itemId: number) => {
        const element = document.getElementById(`property-${itemId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActivePropertyId(itemId);
        }
    };
    
    const handleListItemClick = (item: PortfolioItem) => {
        if (mapRef.current) {
            mapRef.current.flyTo([item.lat, item.lon], 10);
            setActivePropertyId(item.id);
        }
    }

    return (
        <div className="h-full flex flex-col">
            <style>{activeMarkerStyle}</style>
            <header className="p-8 border-b border-gray-800">
                <h1 className="text-3xl font-bold text-white">{t('assetManagement.title')}</h1>
                <p className="text-gray-400">{t('assetManagement.subtitle')}</p>
            </header>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
                {/* Interactive Map */}
                <div className="lg:col-span-2 h-64 lg:h-full bg-gray-900 relative">
                    {isClient && (
                        <MapContainer ref={mapRef} center={[25, 10]} zoom={2} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true} className="z-0">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            {filteredPortfolio.map(item => (
                                <Marker
                                    key={item.id}
                                    position={[item.lat, item.lon]}
                                    icon={customMarkerIcon(item.id === activePropertyId)}
                                    eventHandlers={{
                                        click: () => handleMarkerClick(item.id),
                                    }}
                                >
                                    <Popup>
                                        <div className="w-48">
                                            <img src={item.image} alt={t(item.nameKey)} className="w-full h-24 object-cover rounded-md mb-2" />
                                            <p className="font-bold text-sm">{t(item.nameKey)}</p>
                                            <p className="text-cyan-400 text-xs">{formatCurrency(item.value)}</p>
                                            <Button size="sm" className="w-full mt-2" onClick={() => onOpenPropertyDetail(item)}>View Details</Button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            <ChangeView bounds={bounds} />
                        </MapContainer>
                    )}
                </div>

                {/* Property List */}
                <div className="lg:col-span-1 h-full flex flex-col overflow-hidden border-l border-gray-800">
                     {/* Filter Bar */}
                    <div className="p-4 border-b border-gray-800 bg-black/50 backdrop-blur-xl space-y-3">
                         <div className="flex items-center gap-2 text-sm text-gray-400">
                            <FilterIcon className="w-4 h-4" />
                            <span>Filters</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-cyan-500">
                                <option value="All">All Continents</option>
                                <option value="Europe">Europe</option>
                                <option value="Americas">Americas</option>
                                <option value="Asia">Asia</option>
                            </select>
                             <select value={valueFilter} onChange={e => setValueFilter(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-cyan-500">
                                <option value="All">All Values</option>
                                <option value="0-100">$0M - $100M</option>
                                <option value="100-500">$100M - $500M</option>
                                <option value="500+">$500M+</option>
                            </select>
                        </div>
                         <Button variant="ghost" size="sm" onClick={() => { setRegionFilter('All'); setValueFilter('All'); }}>Reset Filters</Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-4">
                            {filteredPortfolio.map(item => (
                                <div
                                    id={`property-${item.id}`}
                                    key={item.id}
                                    className={`bg-white/5 p-4 rounded-lg flex gap-4 transition-all duration-300 cursor-pointer ${activePropertyId === item.id ? 'bg-cyan-500/10 ring-2 ring-cyan-500' : 'hover:bg-white/10'}`}
                                    onClick={() => handleListItemClick(item)}
                                    onMouseEnter={() => setActivePropertyId(item.id)}
                                    onMouseLeave={() => setActivePropertyId(null)}
                                >
                                    <img src={item.image} alt={t(item.nameKey)} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{t(item.nameKey)}</h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPinIcon className="w-3 h-3"/> {t(item.locationKey)}</p>
                                        <p className="text-lg font-bold text-cyan-400 mt-2">{formatCurrency(item.value)}</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onOpenPropertyDetail(item); }}
                                        className="self-start p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                                        title="View Details"
                                    >
                                        <MaximizeIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                             {filteredPortfolio.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    <p>No properties match the selected filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetManagementPage;