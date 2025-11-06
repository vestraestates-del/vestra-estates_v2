
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminDashboard from './modules/AdminDashboard.tsx';
import UserManagement from './modules/UserManagement.tsx';
import PropertyManagement from './modules/PropertyManagement.tsx';
import ServiceDesk from './modules/ServiceDesk.tsx';
import InvitationSystem from './modules/InvitationSystem.tsx';
import Crm from './modules/Crm.tsx';
import Finance from './modules/Finance.tsx';
import Cms from './modules/Cms.tsx';
import Integrations from './modules/Integrations.tsx';
import LoginSecurity from './modules/LoginSecurity.tsx';
import SystemSettings from './modules/SystemSettings.tsx';

import { LogoConfig } from '../icons/VestraLogo.tsx';
import type { BackgroundImages } from '../../App.tsx';

// Data types from main app
import type { PortfolioItem } from '../../data/portfolioData.ts';
import type { OffMarketProperty } from '../../data/offMarketData.ts';
import type { ArtItem } from '../../data/artData.ts';
import type { WatchItem } from '../../data/watchesData.ts';
import type { AutomobileItem } from '../../data/automobilesData.ts';
import type { JewelItem } from '../../data/jewelsData.ts';
import type { WineItem } from '../../data/winesData.ts';

interface AdminPageProps {
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
    onSaveBranding: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
    currentUserEmail: string;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeModule, setActiveModule] = useState('dashboard');

    const renderModule = () => {
        switch (activeModule) {
            case 'dashboard': return <AdminDashboard />;
            case 'user-management': return <UserManagement />;
            case 'property-management': return <PropertyManagement {...props} />;
            case 'service-desk': return <ServiceDesk />;
            case 'invitations': return <InvitationSystem />;
            case 'crm': return <Crm />;
            case 'finance': return <Finance />;
            case 'cms': return <Cms siteContent={{ slogan: "Discretion is the cornerstone of legacy.", siteTitle: "VESTRA ESTATES | Private Client Portal", metaDescription: "Exclusive access to the world's most prestigious real estate portfolio." }} onSave={(content) => console.log('CMS Save:', content)} />;
            case 'integrations': return <Integrations />;
            case 'login-security': return <LoginSecurity handleChangeAdminPassword={(curr, next) => ({success: true, message: 'Password changed successfully.'})} currentUserEmail={props.currentUserEmail} />;
            case 'system-settings': return <SystemSettings onSave={props.onSaveBranding} currentLogo={props.currentLogo} currentBgs={props.currentBgs} />;
            default: return <div>Select a module</div>;
        }
    };

    return (
        <div className="h-full flex">
            <AdminSidebar activeModule={activeModule} onNavigate={setActiveModule} />
            <div className="flex-1 p-8 overflow-y-auto">
                {renderModule()}
            </div>
        </div>
    );
};

export default AdminPage;
