import React, { useState } from 'react';
import { LogoConfig } from '../icons/VestraLogo';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './modules/AdminDashboard';
import LoginSecurity from './modules/LoginSecurity';
import UserManagement from './modules/UserManagement';
import PropertyManagement from './modules/PropertyManagement';
import ServiceDesk from './modules/ServiceDesk';
import InvitationSystem from './modules/InvitationSystem';
import Crm from './modules/Crm';
import Finance from './modules/Finance';
import Cms from './modules/Cms';
import Integrations from './modules/Integrations';
import SystemSettings from './modules/SystemSettings';
import { BackgroundImages } from '../../App';

interface AdminPageProps {
    onBrandingChange: (logo: LogoConfig, bgs: BackgroundImages) => void;
    currentLogo: LogoConfig;
    currentBgs: BackgroundImages;
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

const AdminPage: React.FC<AdminPageProps> = ({ onBrandingChange, currentLogo, currentBgs }) => {
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
                return <PropertyManagement />;
            case 'services':
                return <ServiceDesk />;
            case 'invitations':
                return <InvitationSystem />;
            case 'crm':
                return <Crm />;
            case 'finance':
                return <Finance />;
            case 'cms':
                return <Cms />;
            case 'integrations':
                return <Integrations />;
            case 'settings':
                return <SystemSettings onSave={onBrandingChange} currentLogo={currentLogo} currentBgs={currentBgs} />;
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
