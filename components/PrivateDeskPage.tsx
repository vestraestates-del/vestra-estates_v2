import React from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import { KeyIcon, DocumentTextIcon, ConciergeBellIcon, EyeIcon, UsersGroupIcon, MessageIcon } from './icons/EliteIcons';
// FIX: The `CircleMember` type is not exported from `App.tsx`. It is now correctly imported from `../data/circleData.ts`.
import type { User } from '../App.tsx';
import type { CircleMember } from '../data/circleData.ts';

interface PrivateDeskPageProps {
    user: User;
    onOpenRequestModal: (requestType: string) => void;
    onNavigate: (page: string) => void;
    onOpenChat: (member: CircleMember) => void;
    privateDeskMember: CircleMember;
}

const PrivateDeskPage: React.FC<PrivateDeskPageProps> = ({ user, onOpenRequestModal, onNavigate, onOpenChat, privateDeskMember }) => {
    const { t } = useLocalization();

    const requestItems = [
        { key: 'contact', icon: <DocumentTextIcon className="w-6 h-6" /> },
        { key: 'nda', icon: <DocumentTextIcon className="w-6 h-6" /> },
        { key: 'concierge', icon: <ConciergeBellIcon className="w-6 h-6" /> },
        { key: 'viewing', icon: <EyeIcon className="w-6 h-6" /> },
        { key: 'consultant', icon: <UsersGroupIcon className="w-6 h-6" /> },
        { key: 'channel', icon: <MessageIcon className="w-6 h-6" /> },
    ];
    
    const handleItemClick = (itemKey: string) => {
        switch (itemKey) {
            case 'concierge':
                onNavigate('services');
                break;
            case 'viewing':
                onNavigate('asset-management');
                break;
            case 'channel':
                if (user.type === 'user' && user.tier === 'Royal Black Access') {
                    onOpenChat(privateDeskMember);
                } else if (user.type === 'admin') { // Also allow admin
                    onOpenChat(privateDeskMember);
                }
                else {
                    alert(t('privateDesk.vipOnlyAlert'));
                }
                break;
            default:
                onOpenRequestModal(itemKey);
                break;
        }
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto">
            <header className="mb-12 text-center">
                <div className="flex justify-center text-cyan-400 mb-4">
                    <KeyIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-glow">{t('privateDesk.title')}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-2">{t('privateDesk.text')}</p>
            </header>

            <div className="max-w-3xl mx-auto bg-[#111116]/60 border border-gray-800 rounded-xl shadow-lg p-8">
                <div className="space-y-4">
                    {requestItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleItemClick(item.key)}
                            className="w-full text-left bg-white/5 p-4 rounded-lg flex items-center gap-4 transition-colors hover:bg-white/10"
                        >
                            <div className="flex-shrink-0 text-cyan-400">{item.icon}</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{t(`privateDesk.requestItems.${item.key}`)}</h3>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivateDeskPage;