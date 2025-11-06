// This is the full content of components/admin/AdminPage.tsx

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminDashboard from './modules/AdminDashboard.tsx';
import LoginSecurity from './modules/LoginSecurity.tsx';
import UserManagement from './modules/UserManagement.tsx';
import PropertyManagement from './modules/PropertyManagement.tsx';
import ServiceDesk from './modules/ServiceDesk.tsx';
import InvitationSystem from './modules/InvitationSystem.tsx';
import Crm from './modules/Crm.tsx';
import Finance from './modules/Finance.tsx';
import Cms from './modules/Cms.tsx';
import Integrations from './modules/Integrations.tsx';
import SystemSettings from './modules/SystemSettings.tsx';

import type { LogoConfig } from '../icons/VestraLogo.tsx';
import type { BackgroundImages } from '../../App.tsx';
import type { PortfolioItem } from '../../data/portfolioData.ts';
import type { OffMarketProperty } from '../../data/offMarketData.ts';
import type { ArtItem } from '../../data/artData.ts';
import type { WatchItem } from '../../data/watchesData.ts';
import type { AutomobileItem } from '../../data/automobilesData.ts';
import type { JewelItem } from '../../data/jewelsData.ts';
import type { WineItem } from '../../data/winesData.ts';
import { MockUser } from '../../data/userData.ts';

export type AdminSection = 'dashboard' | 'security' | 'users' | 'properties' | 'services' | 'invitations' | 'crm' | 'finance' | 'cms' | 'integrations' | 'settings';

interface AdminPageProps {
    siteContent: { slogan: string; siteTitle: string; metaDescription: string; };
    onSaveContent: (content: { slogan: string; siteTitle: string; metaDescription: string; }) => void;
    onSaveBranding: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
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
    mockUsers: { [key: string]: MockUser };
    setMockUsers: React.Dispatch<React.SetStateAction<{ [key: string]: MockUser }>>;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard': return <AdminDashboard />;
            case 'security': return <LoginSecurity currentUserEmail="admin@vestra.com" handleChangeAdminPassword={() => ({ success: true, message: 'Password changed successfully (demo)'})} />;
            case 'users': return <UserManagement users={Object.values(props.mockUsers)} setUsers={props.setMockUsers} />;
            case 'properties': return <PropertyManagement {...props} />;
            case 'services': return <ServiceDesk />;
            case 'invitations': return <InvitationSystem />;
            case 'crm': return <Crm />;
            case 'finance': return <Finance />;
            case 'cms': return <Cms siteContent={props.siteContent} onSave={props.onSaveContent} />;
            case 'integrations': return <Integrations />;
            case 'settings': return <SystemSettings onSave={props.onSaveBranding} currentLogo={props.currentLogo} currentBgs={props.currentBgs} />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div className="h-full flex">
            <AdminSidebar activeSection={activeSection} onNavigate={setActiveSection} />
            <div className="flex-1 p-8 overflow-y-auto">
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminPage;