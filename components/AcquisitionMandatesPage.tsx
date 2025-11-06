
import React, { useState } from 'react';
// FIX: Added file extension to appData import
import { MandateItem } from '../data/appData.ts';
import { useLocalization } from '../localization/LocalizationContext';
import { PlusCircleIcon, EditIcon, EyeIcon, TargetIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import MandateFormModal from './MandateFormModal';

interface AcquisitionMandatesPageProps {
    mandates: MandateItem[];
    onSaveOrUpdateMandate: (mandate: MandateItem) => void;
    onOpenGhostBidModal: (mandate: MandateItem) => void;
}

const getStatusClasses = (status: MandateItem['status']) => {
  const base = 'px-3 py-1 text-xs font-semibold rounded-full';
  switch (status) {
    case 'Active Search': return `${base} bg-blue-500/20 text-blue-300`;
    case 'Match Found': return `${base} bg-green-500/20 text-green-300`;
    case 'Ghost Bid Submitted': return `${base} bg-purple-500/20 text-purple-300`;
    case 'Seller Interested':
    case 'Seller Countered':
        return `${base} bg-yellow-500/20 text-yellow-300`;
    case 'Negotiating': return `${base} bg-orange-500/20 text-orange-300`;
    case 'Closed': return `${base} bg-gray-500/20 text-gray-400`;
    case 'Rejected': return `${base} bg-red-500/20 text-red-300`;
    default: return `${base} bg-gray-700/50 text-gray-300`;
  }
};

const AcquisitionMandatesPage: React.FC<AcquisitionMandatesPageProps> = ({ mandates, onSaveOrUpdateMandate, onOpenGhostBidModal }) => {
    const { t } = useLocalization();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMandate, setEditingMandate] = useState<MandateItem | null>(null);

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

                <div className="space-y-6">
                    {mandates.map(mandate => (
                        <div key={mandate.id} className="bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:border-cyan-500/30">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <TargetIcon className="w-6 h-6 text-cyan-400" />
                                        <h2 className="text-xl font-bold text-white">{mandate.propertyType}</h2>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1 ml-9">{mandate.region}</p>
                                </div>
                                <div className={getStatusClasses(mandate.status)}>{mandate.status}</div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-wider">Budget</h4>
                                        <p className="text-white font-semibold">${mandate.budgetMin}M - ${mandate.budgetMax}M</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-wider">Submitted</h4>
                                        <p className="text-white font-semibold">{mandate.submittedDate}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-xs text-gray-500 uppercase tracking-wider">Key Features</h4>
                                        <p className="text-gray-300 text-sm mt-1">{mandate.features}</p>
                                    </div>
                                </div>
                            </div>
                            
                             <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                                <Button variant="secondary" onClick={() => handleOpenForm(mandate)}>
                                    <EditIcon className="w-4 h-4 mr-2"/> Edit Mandate
                                </Button>
                                {mandate.status === 'Match Found' && (
                                     <Button variant="primary" onClick={() => onOpenGhostBidModal(mandate)}>
                                        <EyeIcon className="w-4 h-4 mr-2"/> Submit Ghost Bid
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isFormOpen && (
                <MandateFormModal
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default AcquisitionMandatesPage;
