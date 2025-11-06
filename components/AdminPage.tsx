import React, { useState } from 'react';
import { LogoConfig } from './icons/VestraLogo';
import AdminSidebar from './admin/AdminSidebar';
import AdminDashboard from './admin/modules/AdminDashboard';
import LoginSecurity from './admin/modules/LoginSecurity';
import UserManagement from './admin/modules/UserManagement';
import PropertyManagement from './admin/modules/PropertyManagement';
import ServiceDesk from './admin/modules/ServiceDesk';
import InvitationSystem from './admin/modules/InvitationSystem';
import Crm from './admin/modules/Crm';
import Finance from './admin/modules/Finance';
import Cms from './admin/modules/Cms';
import Integrations from './admin/modules/Integrations';
import SystemSettings from './admin/modules/SystemSettings';
import { BackgroundImages } from '../App.tsx';

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