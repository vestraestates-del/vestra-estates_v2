

import React, { useState } from 'react';
import { ArtItem } from '../data/artData';
import { WatchItem } from '../data/watchesData';
import { AutomobileItem } from '../data/automobilesData';
import { JewelItem } from '../data/jewelsData';
import { WineItem } from '../data/winesData';
import { ArtIcon, WatchIcon, CarIcon, JewelIcon, WineIcon } from './icons/EliteIcons';

interface CuratorsRoomProps {
    artCollection: ArtItem[];
    watchCollection: WatchItem[];
    automobileCollection: AutomobileItem[];
    jewelCollection: JewelItem[];
    wineCollection: WineItem[];
}

type CollectionType = 'art' | 'watches' | 'automobiles' | 'jewels' | 'wines';

const ArtCard: React.FC<{ item: ArtItem }> = ({ item }) => (
    <div className="bg-white/5 p-4 rounded-lg group">
        <div className="aspect-[3/4] rounded-md overflow-hidden mb-4">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-semibold text-white">{item.title}</h3>
        <p className="text-sm text-cyan-400">{item.artist}, {item.year}</p>
        <p className="text-xs text-gray-400 mt-1">{item.medium}</p>
        {/* FIX: Add description to ArtCard for consistency with other asset cards. */}
        <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden">{item.description}</p>
        <p className="text-sm font-bold text-gray-200 mt-2">{item.value}</p>
    </div>
);

const WatchCard: React.FC<{ item: WatchItem }> = ({ item }) => (
    <div className="bg-white/5 p-4 rounded-lg group">
        <div className="aspect-square rounded-md overflow-hidden mb-4 bg-black flex items-center justify-center">
            <img src={item.image} alt={item.model} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-semibold text-white">{item.brand}</h3>
        <p className="text-sm text-cyan-400">{item.model}</p>
        <p className="text-xs text-gray-400 mt-1">{item.reference}</p>
        <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden">{item.description}</p>
        <p className="text-sm font-bold text-gray-200 mt-2">{item.value}</p>
    </div>
);

const AutomobileCard: React.FC<{ item: AutomobileItem }> = ({ item }) => (
     <div className="bg-white/5 p-4 rounded-lg group">
        <div className="aspect-video rounded-md overflow-hidden mb-4">
            <img src={item.image} alt={item.model} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-semibold text-white">{item.make} {item.model}</h3>
        <p className="text-sm text-cyan-400">{item.year}</p>
        <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden">{item.description}</p>
        <p className="text-sm font-bold text-gray-200 mt-2">{item.value}</p>
    </div>
);

const JewelCard: React.FC<{ item: JewelItem }> = ({ item }) => (
     <div className="bg-white/5 p-4 rounded-lg group">
        <div className="aspect-square rounded-md overflow-hidden mb-4 bg-black flex items-center justify-center">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-cyan-400">{item.designer} - {item.type}</p>
        <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden">{item.description}</p>
        <p className="text-sm font-bold text-gray-200 mt-2">{item.value}</p>
    </div>
);

const WineCard: React.FC<{ item: WineItem }> = ({ item }) => (
     <div className="bg-white/5 p-4 rounded-lg group">
        <div className="aspect-[3/4] rounded-md overflow-hidden mb-4 bg-black flex items-center justify-center p-4">
            <img src={item.image} alt={item.name} className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-cyan-400">{item.vineyard}, {item.vintage}</p>
        <p className="text-xs text-gray-400 mt-1">{item.region}</p>
        <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden">{item.description}</p>
        <p className="text-sm font-bold text-gray-200 mt-2">{item.value}</p>
    </div>
);


const CuratorsRoom: React.FC<CuratorsRoomProps> = ({ artCollection, watchCollection, automobileCollection, jewelCollection, wineCollection }) => {
    const [activeTab, setActiveTab] = useState<CollectionType>('art');

    const tabs: { id: CollectionType; name: string; icon: React.ReactNode }[] = [
        { id: 'art', name: 'Fine Art', icon: <ArtIcon className="w-5 h-5" /> },
        { id: 'watches', name: 'Haute Horlogerie', icon: <WatchIcon className="w-5 h-5" /> },
        { id: 'automobiles', name: 'Rare Automobiles', icon: <CarIcon className="w-5 h-5" /> },
        { id: 'jewels', name: 'Exceptional Jewels', icon: <JewelIcon className="w-5 h-5" /> },
        { id: 'wines', name: 'Fine Wines', icon: <WineIcon className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'art':
                return artCollection.map(item => <ArtCard key={item.id} item={item} />);
            case 'watches':
                return watchCollection.map(item => <WatchCard key={item.id} item={item} />);
            case 'automobiles':
                return automobileCollection.map(item => <AutomobileCard key={item.id} item={item} />);
            case 'jewels':
                return jewelCollection.map(item => <JewelCard key={item.id} item={item} />);
            case 'wines':
                return wineCollection.map(item => <WineCard key={item.id} item={item} />);
            default:
                return null;
        }
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Curator's Room</h1>
                <p className="text-gray-400">An exclusive selection of curated collectibles and passion assets.</p>
            </header>

            <div className="flex flex-wrap border-b border-gray-800 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab.icon} {tab.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default CuratorsRoom;