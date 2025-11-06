import React, { useState } from 'react';
import { LogoConfig } from '../icons/VestraLogo.tsx';
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
import { BackgroundImages } from '../../App.tsx';
import { PortfolioItem } from '../../data/portfolioData.ts';
import { OffMarketProperty } from '../../data/offMarketData.ts';
import { ArtItem } from '../../data/artData.ts';
import { WatchItem } from '../../data/watchesData.ts';
import { AutomobileItem } from '../../data/automobilesData.ts';
import { JewelItem } from '../../data/jewelsData.ts';
import { WineItem } from '../../data/winesData.ts';

interface AdminPageProps {
    // Branding and Content
    onBrandingChange: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
    siteContent: { slogan: string; siteTitle: string; metaDescription: string; };
    onSiteContentSave: (content: { slogan: string; siteTitle: string; metaDescription: string; }) => void;

    // Data Collections
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


export type AdminSection = 
    'dashboard' | 
    'security' | 
    'users' | 
    'properties' | 
    'services' | 
    'invitations' | 
    'crm' | 
    'finance' | 
    'cms' | 
    'integrations' | 
    'settings';

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'security':
                return <LoginSecurity />;
            case 'users':
                return <UserManagement />;
            case 'properties':
                return <PropertyManagement 
                    portfolioItems={props.portfolioItems} setPortfolioItems={props.setPortfolioItems}
                    offMarketProperties={props.offMarketProperties} setOffMarketProperties={props.setOffMarketProperties}
                    artCollection={props.artCollection} setArtCollection={props.setArtCollection}
                    watchCollection={props.watchCollection} setWatchCollection={props.setWatchCollection}
                    automobileCollection={props.automobileCollection} setAutomobileCollection={props.setAutomobileCollection}
                    jewelCollection={props.jewelCollection} setJewelCollection={props.setJewelCollection}
                    wineCollection={props.wineCollection} setWineCollection={props.setWineCollection}
                />;
            case 'services':
                return <ServiceDesk />;
            case 'invitations':
                return <InvitationSystem />;
            case 'crm':
                return <Crm />;
            case 'finance':
                return <Finance />;
            case 'cms':
                return <Cms siteContent={props.siteContent} onSave={props.onSiteContentSave} />;
            case 'integrations':
                return <Integrations />;
            case 'settings':
                return <SystemSettings onSave={props.onBrandingChange} currentLogo={props.currentLogo} currentBgs={props.currentBgs} />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="flex h-full">
            <AdminSidebar activeSection={activeSection} onNavigate={setActiveSection} />
            <main className="flex-1 p-4 md:p-8 h-full overflow-y-auto bg-black/20">
                {renderSection()}
            </main>
        </div>
    );
};

export default AdminPage;