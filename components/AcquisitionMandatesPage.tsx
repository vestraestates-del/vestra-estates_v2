import React, { useState, useMemo, lazy, Suspense } from 'react';
import { MandateItem } from '../data/appData.ts';
import { useLocalization } from '../localization/LocalizationContext.tsx';
import { PlusCircleIcon, EditIcon, EyeIcon, TargetIcon, FilterIcon } from './icons/EliteIcons.tsx';
import Button from './ui/Button.tsx';
import MandateStatusTracker from './MandateStatusTracker.tsx';

const MandateFormModal = lazy(() => import('./MandateFormModal.tsx'));

interface AcquisitionMandatesPageProps {
    mandates: MandateItem[];
    onSaveOrUpdateMandate: (mandate: MandateItem) => void;
    onOpenGhostBidModal: (mandate: MandateItem) => void;
}

const AcquisitionMandatesPage: React.FC<AcquisitionMandatesPageProps> = ({ mandates, onSaveOrUpdateMandate, onOpenGhostBidModal }) => {
    const { t } = useLocalization();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMandate, setEditingMandate] = useState<MandateItem | null>(null);

    // Filtering and Sorting State
    const [statusFilter, setStatusFilter] = useState('All');
    const [regionFilter, setRegionFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const uniqueRegions = useMemo(() => [...new Set(mandates.map(m => m.region))], [mandates]);
    const allStatuses = ['Pending Review', 'Active Search', 'Match Found', 'Ghost Bid Submitted', 'Seller Interested', 'Seller Countered', 'Negotiating', 'Closed', 'Rejected'];

    const filteredAndSortedMandates = useMemo(() => {
        let filtered = mandates;

        if (statusFilter !== 'All') {
            filtered = filtered.filter(m => m.status === statusFilter);
        }
        if (regionFilter !== 'All') {
            filtered = filtered.filter(m => m.region === regionFilter);
        }

        return filtered.sort((a, b) => {
            switch (sortOrder) {
                case 'date_asc': return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
                case 'budget_desc': return b.budgetMax - a.budgetMax;
                case 'budget_asc': return a.budgetMax - b.budgetMax;
                case 'date_desc':
                default:
                    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
            }
        });
    }, [mandates, statusFilter, regionFilter, sortOrder]);


    const handleOpenForm = (mandate?: MandateItem) => {
        setEditingMandate(mandate || null);
        setIsFormOpen(true);
    };

    const handleSave = (mandateData: Omit<MandateItem, 'id' | 'status' | 'submittedDate'>) => {
        const mandateToSave: MandateItem = {
            id: editingMandate?.id || Date.now(),
            status: editingMandate?.status || 'Pending Review',
            submittedDate: editingMandate?.submittedDate || new Date().toISOString().split('T')[0],
            ...mandateData,
        };
        onSaveOrUpdateMandate(mandateToSave);
        setIsFormOpen(false);
    };

    const getPrimaryAction = (mandate: MandateItem) => {
        switch (mandate.status) {
            case 'Match Found':
            case 'Seller Countered':
                return (
                    <Button variant="primary" onClick={() => onOpenGhostBidModal(mandate)}>
                        <EyeIcon className="w-4 h-4 mr-2"/> Submit / Revise Ghost Bid
                    </Button>
                );
            case 'Seller Interested':
                 return (
                    <Button variant="primary" onClick={() => onOpenGhostBidModal(mandate)}>
                        <EyeIcon className="w-4 h-4 mr-2"/> Update Negotiation Terms
                    </Button>
                );
            default:
                return (
                    <Button variant="secondary" disabled>
                        No Action Available
                    </Button>
                );
        }
    };

    return (
        <>
            <div className="p-4 md:p-8 h-full overflow-y-auto">
                <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{t('mandates.title')}</h1>
                        <p className="text-gray-400">{t('mandates.subtitle')}</p>
                    </div>
                    <Button onClick={() => handleOpenForm()} className="flex items-center gap-2 self-start md:self-center">
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>{t('mandates.newMandate')}</span>
                    </Button>
                </header>

                {/* Filter and Sort Controls */}
                <div className="mb-6 bg-black/50 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-lg">
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-400">
                        <FilterIcon className="w-4 h-4"/>
                        <span>Filter & Sort</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-cyan-500">
                            <option value="All">All Statuses</option>
                            {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-cyan-500">
                            <option value="All">All Regions</option>
                            {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                         <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-cyan-500">
                            <option value="date_desc">Date (Newest First)</option>
                            <option value="date_asc">Date (Oldest First)</option>
                            <option value="budget_desc">Budget (High to Low)</option>
                            <option value="budget_asc">Budget (Low to High)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    {filteredAndSortedMandates.map(mandate => (
                        <div key={mandate.id} className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-cyan-500/30">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <TargetIcon className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-xl font-bold text-white">{mandate.propertyType}</h2>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1 ml-9">{mandate.region}</p>
                                </div>
                                <div className="text-right">
                                     <p className="text-xs text-gray-500 uppercase tracking-wider">Budget</p>
                                     <p className="text-lg text-white font-semibold">${mandate.budgetMin}M - ${mandate.budgetMax}M</p>
                                </div>
                            </div>

                            <MandateStatusTracker currentStatus={mandate.status} />

                            <div className="mt-6 pt-6 border-t border-gray-800">
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Features & Requirements</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">{mandate.features}</p>
                            </div>
                            
                             <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                                <Button variant="secondary" onClick={() => handleOpenForm(mandate)}>
                                    <EditIcon className="w-4 h-4 mr-2"/> Edit Details
                                </Button>
                                {getPrimaryAction(mandate)}
                            </div>
                        </div>
                    ))}
                    {filteredAndSortedMandates.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            <p>No mandates match the current filters.</p>
                        </div>
                    )}
                </div>
            </div>

            <Suspense fallback={null}>
                {isFormOpen && (
                    <MandateFormModal
                        mandate={editingMandate}
                        onClose={() => setIsFormOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </Suspense>
        </>
    );
};

export default AcquisitionMandatesPage;
