import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard';
import Button from '../../ui/Button';
import { initialPortfolioItems, PortfolioItem } from '../../../data/portfolioData';
import { initialOffMarketProperties, OffMarketProperty } from '../../../data/offMarketData';
import { initialArtCollection, ArtItem } from '../../../data/artData';
import { initialWatches, WatchItem } from '../../../data/watchesData';
import { initialAutomobiles, AutomobileItem } from '../../../data/automobilesData';
import { initialJewels, JewelItem } from '../../../data/jewelsData';
import { initialWines, WineItem } from '../../../data/winesData';
import { PlusCircleIcon, CloseIcon } from '../../icons/EliteIcons';

type CuratedAsset = (ArtItem & { assetType: 'Art' }) | (WatchItem & { assetType: 'Watch' }) | (AutomobileItem & { assetType: 'Automobile' }) | (JewelItem & { assetType: 'Jewel' }) | (WineItem & { assetType: 'Wine' });
type AnyAsset = PortfolioItem | OffMarketProperty | CuratedAsset;
type AssetType = 'featured' | 'off-market' | 'curated';

const AssetEditorModal: React.FC<{
    asset: AnyAsset | null;
    assetType: AssetType;
    onClose: () => void;
    onSave: (asset: AnyAsset) => void;
}> = ({ asset, assetType, onClose, onSave }) => {
    const [editedAsset, setEditedAsset] = useState<Partial<AnyAsset>>(asset || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedAsset(prev => ({ ...prev, [name]: value }));
    };

    const handleMediaChange = (field: 'gallery' | 'videos', newMedia: string[]) => {
        setEditedAsset(prev => ({ ...prev, [field]: newMedia }));
    };
    
    const handleSave = () => {
        onSave({ id: Date.now(), ...asset, ...editedAsset } as AnyAsset);
    };

    const renderCommonFields = () => (
        <>
            <div>
                <label className="text-sm text-gray-400">Title / Name / Codename</label>
                <input type="text" name={('codename' in editedAsset) ? 'codename' : ('name' in editedAsset) ? 'name' : 'title'} value={(editedAsset as any).title || (editedAsset as any).name || (editedAsset as any).codename || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" />
            </div>
            <div>
                <label className="text-sm text-gray-400">Value / Price Range</label>
                <input type="text" name={('value' in editedAsset) ? 'value' : 'priceRange'} value={(editedAsset as any).value || (editedAsset as any).priceRange || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" />
            </div>
        </>
    );

    const renderMediaManager = () => {
        const gallery = (editedAsset as PortfolioItem)?.gallery || [];
        const videos = (editedAsset as PortfolioItem)?.videos || [];

        const addMedia = (type: 'image' | 'video') => {
            const url = prompt(`Enter new ${type} URL:`);
            if (url) {
                if (type === 'image') handleMediaChange('gallery', [...gallery, url]);
                if (type === 'video') handleMediaChange('videos', [...videos, url]);
            }
        };

        const removeMedia = (type: 'image' | 'video', index: number) => {
            if (type === 'image') handleMediaChange('gallery', gallery.filter((_, i) => i !== index));
            if (type === 'video') handleMediaChange('videos', videos.filter((_, i) => i !== index));
        };
        
        return (
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Media Management</h3>
                <div className="grid grid-cols-3 gap-2">
                    {gallery.map((url, i) => <div key={i} className="relative group"><img src={url} className="w-full h-24 object-cover rounded" /><button onClick={() => removeMedia('image', i)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"><CloseIcon className="w-3 h-3"/></button></div>)}
                    {videos.map((url, i) => <div key={i} className="relative group"><video src={url} className="w-full h-24 object-cover rounded bg-black" /><button onClick={() => removeMedia('video', i)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"><CloseIcon className="w-3 h-3"/></button></div>)}
                </div>
                <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="ghost" onClick={() => addMedia('image')}>Add Image URL</Button>
                    <Button size="sm" variant="ghost" onClick={() => addMedia('video')}>Add Video URL</Button>
                </div>
            </div>
        )
    }

    const renderSpecificFields = () => {
        if (assetType === 'featured') {
            const prop = editedAsset as Partial<PortfolioItem>;
            return <>
                <div><label className="text-sm text-gray-400">Location Key</label><input type="text" name="locationKey" value={prop.locationKey || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                <div><label className="text-sm text-gray-400">Description Key</label><textarea name="descriptionKey" value={prop.descriptionKey || ''} onChange={handleChange} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2"></textarea></div>
                {renderMediaManager()}
            </>
        }
        if (assetType === 'off-market') {
            const prop = editedAsset as Partial<OffMarketProperty>;
            return <>
                <div><label className="text-sm text-gray-400">Location</label><input type="text" name="location" value={prop.location || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                <div><label className="text-sm text-gray-400">Teaser</label><textarea name="teaser" value={prop.teaser || ''} onChange={handleChange} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2"></textarea></div>
                <div><label className="text-sm text-gray-400">Investment Score</label><input type="number" name="investmentScore" value={prop.investmentScore || 0} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                {renderMediaManager()}
            </>
        }
        if (assetType === 'curated') {
             const item = editedAsset as Partial<CuratedAsset>;
             return <>
                <div><label className="text-sm text-gray-400">Artist / Brand / Make</label><input type="text" name={(item as any).artist ? 'artist' : (item as any).brand ? 'brand' : 'make'} value={(item as any).artist || (item as any).brand || (item as any).make || ''} onChange={handleChange} className="w-full bg-gray-900 border-gray-700 rounded p-2" /></div>
                <div><label className="text-sm text-gray-400">Description</label><textarea name="description" value={item.description || ''} onChange={handleChange} className="w-full h-24 bg-gray-900 border-gray-700 rounded p-2"></textarea></div>
             </>
        }
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-800"><h2 className="text-xl font-bold text-white">{asset ? 'Edit' : 'Add'} Asset</h2></div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        {renderCommonFields()}
                    </div>
                    {renderSpecificFields()}
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={handleSave}>Save Asset</Button></div>
            </div>
        </div>
    );
};


const PropertyManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AssetType>('featured');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState<AnyAsset | null>(null);

    const [featuredEstates, setFeaturedEstates] = useState(initialPortfolioItems);
    const [offMarketProperties, setOffMarketProperties] = useState(initialOffMarketProperties);
    
    const curatedAssets = useMemo(() => [
        ...initialArtCollection.map(a => ({...a, assetType: 'Art' as const})),
        ...initialWatches.map(w => ({...w, assetType: 'Watch' as const})),
        ...initialAutomobiles.map(a => ({...a, assetType: 'Automobile' as const})),
        ...initialJewels.map(j => ({...j, assetType: 'Jewel' as const})),
        ...initialWines.map(w => ({...w, assetType: 'Wine' as const})),
    ], []);
    const [curated, setCurated] = useState<CuratedAsset[]>(curatedAssets);

    const handleOpenModal = (asset?: AnyAsset) => {
        setEditingAsset(asset || null);
        setIsModalOpen(true);
    };

    const handleSave = (savedAsset: AnyAsset) => {
        switch (activeTab) {
            case 'featured':
                setFeaturedEstates(prev => savedAsset.id ? prev.map(p => p.id === savedAsset.id ? savedAsset as PortfolioItem : p) : [...prev, savedAsset as PortfolioItem]);
                break;
            case 'off-market':
                 setOffMarketProperties(prev => savedAsset.id ? prev.map(p => p.id === savedAsset.id ? savedAsset as OffMarketProperty : p) : [...prev, savedAsset as OffMarketProperty]);
                break;
            case 'curated':
                 setCurated(prev => savedAsset.id ? prev.map(p => p.id === savedAsset.id ? savedAsset as CuratedAsset : p) : [...prev, savedAsset as CuratedAsset]);
                break;
        }
        setIsModalOpen(false);
    };
    
    const tabs: { id: AssetType, name: string }[] = [
        { id: 'featured', name: 'Featured Estates' },
        { id: 'off-market', name: 'Off-Market' },
        { id: 'curated', name: "Curator's Room" },
    ];

    const renderCurrentTab = () => {
        switch(activeTab) {
            case 'featured': return (
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-white/5"><tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Location Key</th><th className="px-6 py-3">Value</th><th className="px-6 py-3">Actions</th></tr></thead>
                    <tbody>{featuredEstates.map(prop => (<tr key={prop.id} className="border-b border-gray-800 hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">{prop.nameKey}</td><td className="px-6 py-4">{prop.locationKey}</td><td className="px-6 py-4">{prop.value}</td><td className="px-6 py-4"><Button size="sm" onClick={() => handleOpenModal(prop)}>Edit</Button></td></tr>))}</tbody>
                </table>
            );
            case 'off-market': return (
                 <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-white/5"><tr><th className="px-6 py-3">Codename</th><th className="px-6 py-3">Location</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Actions</th></tr></thead>
                    <tbody>{offMarketProperties.map(prop => (<tr key={prop.id} className="border-b border-gray-800 hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">{prop.codename}</td><td className="px-6 py-4">{prop.location}</td><td className="px-6 py-4">{prop.category}</td><td className="px-6 py-4"><Button size="sm" onClick={() => handleOpenModal(prop)}>Edit</Button></td></tr>))}</tbody>
                </table>
            );
            case 'curated': return (
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-white/5"><tr><th className="px-6 py-3">Name / Model</th><th className="px-6 py-3">Type</th><th className="px-6 py-3">Artist / Brand</th><th className="px-6 py-3">Value</th><th className="px-6 py-3">Actions</th></tr></thead>
                    <tbody>{curated.map(item => (<tr key={item.id} className="border-b border-gray-800 hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">{(item as any).title || (item as any).model || (item as any).name}</td><td className="px-6 py-4">{item.assetType}</td><td className="px-6 py-4">{(item as any).artist || (item as any).brand || (item as any).make}</td><td className="px-6 py-4">{item.value}</td><td className="px-6 py-4"><Button size="sm" onClick={() => handleOpenModal(item)}>Edit</Button></td></tr>))}</tbody>
                </table>
            );
        }
    }

    return (
        <div>
            <header className="mb-8 flex justify-between items-center">
                <div><h1 className="text-3xl font-bold text-white">Asset Management</h1><p className="text-gray-400">Manage all platform listings.</p></div>
                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2"><PlusCircleIcon className="w-5 h-5"/> Add New Asset</Button>
            </header>
            
             <div className="flex border-b border-gray-800 mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <WidgetCard title={`All ${tabs.find(t => t.id === activeTab)?.name}`}>
                <div className="overflow-x-auto">
                   {renderCurrentTab()}
                </div>
            </WidgetCard>
            {isModalOpen && <AssetEditorModal asset={editingAsset} assetType={activeTab} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        </div>
    );
};

export default PropertyManagement;
