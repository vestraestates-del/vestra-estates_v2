import React from 'react';
import * as Icons from '../icons/EliteIcons';
import { AdminSection } from '../AdminPage';

interface AdminSidebarProps {
    activeSection: AdminSection;
    onNavigate: (section: AdminSection) => void;
}

const NavLink: React.FC<{
  id: AdminSection;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ id, label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-300'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
    <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
    </h3>
);

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <Icons.DashboardIcon className="w-5 h-5" /> },
        { type: 'header', label: 'Management' },
        { id: 'security', label: 'Login & Security', icon: <Icons.ShieldCheckIcon className="w-5 h-5" /> },
        { id: 'users', label: 'User Management', icon: <Icons.UsersGroupIcon className="w-5 h-5" /> },
        { id: 'properties', label: 'Property Management', icon: <Icons.BuildingKeyIcon className="w-5 h-5" /> },
        { id: 'services', label: 'Service Desk', icon: <Icons.ConciergeBellIcon className="w-5 h-5" /> },
        { id: 'invitations', label: 'Invitation System', icon: <Icons.KeyIcon className="w-5 h-5" /> },
        { id: 'crm', label: 'CRM & Comms', icon: <Icons.MessageIcon className="w-5 h-5" /> },
        { id: 'finance', label: 'Finance & Payments', icon: <Icons.DollarSignIcon className="w-5 h-5" /> },
        { type: 'header', label: 'Platform' },
        { id: 'cms', label: 'Content Management', icon: <Icons.PencilSquareIcon className="w-5 h-5" /> },
        { id: 'integrations', label: 'Integrations', icon: <Icons.FlowIcon className="w-5 h-5" /> },
        { id: 'settings', label: 'System Settings', icon: <Icons.AdminIcon className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-[#0c0c10]/50 border-r border-gray-800 flex flex-col">
            <div className="flex items-center justify-center h-20 border-b border-gray-800 flex-shrink-0 px-4">
                <h2 className="text-xl font-bold text-white tracking-wider">ADMIN PANEL</h2>
            </div>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {navItems.map((item, index) => {
                    if (item.type === 'header') {
                        return <SectionHeader key={`header-${index}`} label={item.label} />;
                    }
                    return (
                        <NavLink
                            key={item.id}
                            id={item.id as AdminSection}
                            label={item.label}
                            icon={item.icon}
                            isActive={activeSection === item.id}
                            onClick={() => onNavigate(item.id as AdminSection)}
                        />
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
