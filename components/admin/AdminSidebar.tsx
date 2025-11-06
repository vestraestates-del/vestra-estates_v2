
import React from 'react';
import * as Icons from '../icons/EliteIcons.tsx';

interface AdminSidebarProps {
    activeModule: string;
    onNavigate: (module: string) => void;
}

const AdminNavLink: React.FC<{
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ id, label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeModule, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <Icons.DashboardIcon className="w-5 h-5" /> },
        { id: 'user-management', label: 'User Management', icon: <Icons.UsersGroupIcon className="w-5 h-5" /> },
        { id: 'property-management', label: 'Asset Management', icon: <Icons.BuildingKeyIcon className="w-5 h-5" /> },
        { id: 'service-desk', label: 'Service Desk', icon: <Icons.BellIcon className="w-5 h-5" /> },
        { id: 'invitations', label: 'Invitation System', icon: <Icons.MegaphoneIcon className="w-5 h-5" /> },
        { id: 'crm', label: 'CRM & Comms', icon: <Icons.MessageIcon className="w-5 h-5" /> },
        { id: 'finance', label: 'Finance', icon: <Icons.DollarSignIcon className="w-5 h-5" /> },
        { id: 'cms', label: 'CMS', icon: <Icons.DocumentTextIcon className="w-5 h-5" /> },
        { id: 'integrations', label: 'Integrations', icon: <Icons.KeyIcon className="w-5 h-5" /> },
        { id: 'login-security', label: 'Login & Security', icon: <Icons.ShieldCheckIcon className="w-5 h-5" /> },
        { id: 'system-settings', label: 'System Settings', icon: <Icons.AdminIcon className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-[#0c0c10]/80 backdrop-blur-xl border-r border-gray-800 p-2 space-y-1">
            {navItems.map(item => (
                <AdminNavLink
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    isActive={activeModule === item.id}
                    onClick={() => onNavigate(item.id)}
                />
            ))}
        </aside>
    );
};

export default AdminSidebar;
