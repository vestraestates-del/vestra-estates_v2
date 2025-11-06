import React, { useState, useMemo } from 'react';
import WidgetCard from '../../ui/WidgetCard.tsx';
import Button from '../../ui/Button.tsx';
import { PortfolioItem } from '../../../data/portfolioData.ts';
import { OffMarketProperty } from '../../../data/offMarketData.ts';
import { ArtItem } from '../../../data/artData.ts';
import { WatchItem } from '../../../data/watchesData.ts';
import { AutomobileItem } from '../../../data/automobilesData.ts';
import { JewelItem } from '../../../data/jewelsData.ts';
import { WineItem } from '../../../data/winesData.ts';
import { PlusCircleIcon } from '../../icons/EliteIcons.tsx';
import AdminFormModal from '../../AdminFormModal.tsx';
import ConfirmationModal from '../../ConfirmationModal.tsx';

// Type definitions for assets
type CuratedAsset = (ArtItem & { assetType: 'Art' }) | (WatchItem & { assetType: 'Watch' }) | (AutomobileItem & { assetType: 'Automobile' }) | (JewelItem & { assetType: 'Jewel' }) | (WineItem & { assetType: 'Wine' });
type AnyAsset = PortfolioItem | OffMarketProperty | CuratedAsset;
type AssetType = 'featured' | 'off-market' | 'curated';

// Props for the main component
interface PropertyManagementProps {
    portfolioItems: PortfolioItem[];
    setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
    offMarketProperties: OffMarketProperty[];
    setOffMarketProperties: React.Dispatch<React.SetStateAction<OffMarketProperty[]>>;
    artCollection: ArtItem[];
    setArtCollection: React.Dispatch<React.SetStateAction<ArtItem[]>>;
    watchCollection: WatchItem[];
    setWatchCollection: React.Dispatch<React.SetStateAction<WatchItem[]>>;
    automobileCollection: AutomobileItem[];
    setAutomobileCollection: React.Dispatch<React.SetStateAction<AutomobileItem[]>>;
    jewelCollection: JewelItem[];
    setJewelCollection: React.Dispatch<React.SetStateAction<JewelItem[]>>;
    wineCollection: WineItem[];
    setWineCollection: React.Dispatch<React.SetStateAction<WineItem[]>>;
}

const PropertyManagement: React.FC<PropertyManagementProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AssetType>('featured');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState<AnyAsset | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<AnyAsset | null>(null);

    const curatedAssets = useMemo(() => [
        ...props.artCollection.map(a => ({...a, assetType: 'Art' as const})),
        ...props.watchCollection.map(w => ({...w, assetType: 'Watch' as const})),
        ...props.automobileCollection.map(a => ({...a, assetType: 'Automobile' as const})),
        ...props.jewelCollection.map(j => ({...j, assetType: 'Jewel' as const})),
        ...props.wineCollection.map(w => ({...w, assetType: 'Wine' as const})),
    ], [props.artCollection, props.watchCollection, props.automobileCollection, props.jewelCollection, props.wineCollection]);

    const handleOpenModal = (asset?: AnyAsset) => {
        setEditingAsset(asset || null);
        setIsModalOpen(true);
    };

    const handleSave = (savedAsset: Record<string, any>) => {
        const id = savedAsset.id || Date.now();
        const assetToSave = { ...savedAsset, id };

        switch (activeTab) {
            case 'featured':
                props.setPortfolioItems(prev => 
                    prev.some(p => p.id === id) 
                        ? prev.map(p => p.id === id ? assetToSave as PortfolioItem : p) 
                        : [...prev, assetToSave as PortfolioItem]
                );
                break;
            case 'off-market':
                 props.setOffMarketProperties(prev => 
                    prev.some(p => p.id === id) 
                        ? prev.map(p => p.id === id ? assetToSave as OffMarketProperty : p) 
                        : [...prev, assetToSave as OffMarketProperty]
                );
                break;
            case 'curated':
                const curatedType = (assetToSave as CuratedAsset).assetType;
                const updateCollection = (setter: Function, type: string) => {
                    setter((prev: any[]) => 
                        prev.some(p => p.id === id)
                            ? prev.map(p => p.id === id ? assetToSave : p)
                            : [...prev, assetToSave]
                    );
                };
                if (curatedType === 'Art') updateCollection(props.setArtCollection, 'Art');
                else if (curatedType === 'Watch') updateCollection(props.setWatchCollection, 'Watch');
                else if (curatedType === 'Automobile') updateCollection(props.setAutomobileCollection, 'Automobile');
                else if (curatedType === 'Jewel') updateCollection(props.setJewelCollection, 'Jewel');
                else if (curatedType === 'Wine') updateCollection(props.setWineCollection, 'Wine');
                break;
        }
        setIsModalOpen(false);
    };
    
    const handleDelete = () => {
        if (!confirmDelete) return;
        const id = confirmDelete.id;
        switch (activeTab) {
            case 'featured': props.setPortfolioItems(prev => prev.filter(p => p.id !== id)); break;
            case 'off-market': props.setOffMarketProperties(prev => prev.filter(p => p.id !== id)); break;
            case 'curated':
                const assetType = (confirmDelete as CuratedAsset).assetType;
                if (assetType === 'Art') props.setArtCollection(prev => prev.filter(p => p.id !== id));
                if (assetType === 'Watch') props.setWatchCollection(prev => prev.filter(p => p.id !== id));
                if (assetType === 'Automobile') props.setAutomobileCollection(prev => prev.filter(p => p.id !== id));
                if (assetType === 'Jewel') props.setJewelCollection(prev => prev.filter(p => p.id !== id));
                if (assetType === 'Wine') props.setWineCollection(prev => prev.filter(p => p.id !== id));
                break;
        }
        setConfirmDelete(null);
    };

    const getEmptyAsset = (): Record<string, any> => {
        switch (activeTab) {
            case 'featured': return { nameKey: '', locationKey: '', value: '$0M', image: '', descriptionKey: '', featureKeys: '', bedrooms: 0, bathrooms: 0, gallery: [], videos: [], lat: 0, lon: 0 };
            case 'off-market': return { codename: '', location: '', country: '', teaser: '', image: '', category: 'Villa', stats: [], gallery: [], securityGrade: 'A', smartHomeGrade: 'A', architecturalStyle: '', investmentScore: 0, lifestyleScore: 0 };
            case 'curated': return { title: '', artist: '', year: '', medium: '', value: '', image: '', description: '', assetType: 'Art' }; // Default to Art
        }
    };

    const tabs: { id: AssetType, name: string }[] = [
        { id: 'featured', name: 'Featured Estates' },
        { id: 'off-market', name: 'Off-Market' },
        { id: 'curated', name: "Curator's Room" },
    ];

    const renderCurrentTab = () => {
        let items: AnyAsset[] = [];
        let columns: string[] = [];
        
        switch(activeTab) {
            case 'featured':
                items = props.portfolioItems;
                columns = ['Name Key', 'Location Key', 'Value'];
                break;
            case 'off-market':
                items = props.offMarketProperties;
                columns = ['Codename', 'Location', 'Category'];
                break;
            case 'curated':
                items = curatedAssets;
                columns = ['Name/Model', 'Type', 'Artist/Brand', 'Value'];
                break;
        }

        return (
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-white/5">
                    <tr>
                        {columns.map(col => <th key={col} className="px-6 py-3">{col}</th>)}
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="border-b border-gray-800 hover:bg-white/5">
                            {columns.map(col => (
                                <td key={col} className="px-6 py-4 font-medium text-white">
                                    {
                                        col === 'Name Key' ? (item as PortfolioItem).nameKey :
                                        col === 'Location Key' ? (item as PortfolioItem).locationKey :
                                        col === 'Codename' ? (item as OffMarketProperty).codename :
                                        col === 'Location' ? (item as OffMarketProperty).location :
                                        col === 'Category' ? (item as OffMarketProperty).category :
                                        col === 'Name/Model' ? (item as any).title || (item as any).model || (item as any).name :
                                        col === 'Type' ? (item as CuratedAsset).assetType :
                                        col === 'Artist/Brand' ? (item as any).artist || (item as any).brand || (item as any).make :
                                        (item as any).value
                                    }
                                </td>
                            ))}
                            <td className="px-6 py-4 text-right">
                                <Button size="sm" variant="secondary" onClick={() => handleOpenModal(item)} className="mr-2">Edit</Button>
                                <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400" onClick={() => setConfirmDelete(item)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <header className="mb-8 flex justify-between items-center">
                <div><h1 className="text-3xl font-bold text-white">Asset Management</h1><p className="text-gray-400">Manage all platform listings.</p></div>
                <Button onClick={() => handleOpenModal(getEmptyAsset() as AnyAsset)} className="flex items-center gap-2"><PlusCircleIcon className="w-5 h-5"/> Add New Asset</Button>
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
            {isModalOpen && <AdminFormModal item={editingAsset || getEmptyAsset()} onSave={handleSave} onClose={() => setIsModalOpen(false)} title={editingAsset ? 'Edit Asset' : `Add New ${activeTab} Asset`} />}
            {confirmDelete && <ConfirmationModal title="Confirm Deletion" message={`Are you sure you want to delete this asset? This action cannot be undone.`} onConfirm={handleDelete} onClose={() => setConfirmDelete(null)} confirmText="Delete Asset" />}
        </div>
    );
};

export default PropertyManagement;