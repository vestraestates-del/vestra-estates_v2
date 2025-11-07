import React, { useState } from 'react';
import { ArtItem } from '../data/artData.ts';
import { WatchItem } from '../data/watchesData.ts';
import { AutomobileItem } from '../data/automobilesData.ts';
import { JewelItem } from '../data/jewelsData.ts';
import { WineItem } from '../data/winesData.ts';
import { ArtIcon, WatchIcon, CarIcon, JewelIcon, WineIcon } from './icons/EliteIcons.tsx';
import type { AnyCuratedAsset } from '../App.tsx';

interface CuratorsRoomProps {
    artCollection: ArtItem[];
    watchCollection: WatchItem[];
    automobileCollection: AutomobileItem[];
    jewelCollection: JewelItem[];
    wineCollection: WineItem[];
    onOpenDossier: (asset: AnyCuratedAsset) => void;
}

type CollectionType = 'art' | 'watches' | 'automobiles' | 'jewels' | 'wines';

const AssetCard: React.FC<{ item: AnyCuratedAsset, onClick: () => void }> = ({ item, onClick }) => {
    let title: string, subtitle1: string, subtitle2: string, image: string, value: string, description: string, aspectRatio: string;

    if ('artist' in item) { // ArtItem
        title = item.title;
        subtitle1 = item.artist;
        subtitle2 = item.year;
        image = item.image;
        value = item.value;
        description = item.description;
        aspectRatio = 'aspect-[3/4]';
    } else if ('brand' in item) { // WatchItem
        title = item.brand;
        subtitle1 = item.model;
        subtitle2 = item.reference;
        image = item.image;
        value = item.value;
        description = item.description;
        aspectRatio = 'aspect-square';
    } else if ('make' in item) { // AutomobileItem
        title = `${item.make} ${item.model}`;
        subtitle1 = String(item.year);
        subtitle2 = '';
        image = item.image;
        value = item.value;
        description = item.description;
        aspectRatio = 'aspect-video';
    } else if ('designer' in item) { // JewelItem
        title = item.name;
        subtitle1 = item.designer;
        subtitle2 = item.type;
        image = item.image;
        value = item.value;
        description = item.description;
        aspectRatio = 'aspect-square';
    } else { // WineItem
        title = item.name;
        subtitle1 = item.vineyard;
        subtitle2 = String(item.vintage);
        image = item.image;
        value = item.value;
        description = item.description;
        aspectRatio = 'aspect-[3/4]';
    }

    return (
        <div className="bg-white/5 p-4 rounded-lg group cursor-pointer" onClick={onClick}>
            <div className={`${aspectRatio} rounded-md overflow-hidden mb-4 bg-black flex items-center justify-center`}>
                <img src={image} alt={title} className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${'vineyard' in item ? 'object-contain p-4' : ''}`} />
            </div>
            <h3 className="font-semibold text-white truncate">{title}</h3>
            <p className="text-sm text-cyan-400 truncate">{subtitle1}</p>
            {subtitle2 && <p className="text-xs text-gray-400 mt-1">{subtitle2}</p>}
            <p className="text-sm text-gray-300 mt-2 h-10 overflow-hidden text-ellipsis">{description}</p>
            <p className="text-sm font-bold text-gray-200 mt-2">{value}</p>
        </div>
    );
};


const CuratorsRoom: React.FC<CuratorsRoomProps> = ({ artCollection, watchCollection, automobileCollection, jewelCollection, wineCollection, onOpenDossier }) => {
    const [activeTab, setActiveTab] = useState<CollectionType>('art');

    const tabs: { id: CollectionType; name: string; icon: React.ReactNode }[] = [
        { id: 'art', name: 'Fine Art', icon: <ArtIcon className="w-5 h-5" /> },
        { id: 'watches', name: 'Haute Horlogerie', icon: <WatchIcon className="w-5 h-5" /> },
        { id: 'automobiles', name: 'Rare Automobiles', icon: <CarIcon className="w-5 h-5" /> },
        { id: 'jewels', name: 'Exceptional Jewels', icon: <JewelIcon className="w-5 h-5" /> },
        { id: 'wines', name: 'Fine Wines', icon: <WineIcon className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        let collection: AnyCuratedAsset[] = [];
        switch (activeTab) {
            case 'art': collection = artCollection; break;
            case 'watches': collection = watchCollection; break;
            case 'automobiles': collection = automobileCollection; break;
            case 'jewels': collection = jewelCollection; break;
            case 'wines': collection = wineCollection; break;
            default: return null;
        }
        return collection.map(item => <AssetCard key={item.id} item={item} onClick={() => onOpenDossier(item)} />);
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