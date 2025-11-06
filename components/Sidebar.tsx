import React, { useState } from 'react';
import { VestraLogo, LogoConfig } from './icons/VestraLogo';
import LanguageSelector from './ui/LanguageSelector';
// FIX: Import GenerationalPage type to use in SidebarProps and add file extension
import type { User, GenerationalPage } from '../App.tsx';
import * as Icons from './icons/EliteIcons';
import { useLocalization } from '../localization/LocalizationContext';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: User;
  logoConfig: LogoConfig;
  // FIX: Add onGenerationalOfficeNav to the component's props interface
  onGenerationalOfficeNav: (page: GenerationalPage) => void;
}

const NavLink: React.FC<{
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isSub?: boolean;
}> = ({ id, label, icon, isActive, onClick, isSub = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
      isSub ? 'px-3 pl-11' : 'px-3'
    } ${
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

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout, user, logoConfig, onGenerationalOfficeNav }) => {
    const { t } = useLocalization();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tierLevel = user.type === 'admin' ? 3 : 
                      user.tier === 'Royal Black Access' ? 2 :
                      user.tier === 'Diamond Access' ? 1 : 0;
    
    const navItems = [
      { id: 'dashboard', labelKey: 'sidebar.dashboard', icon: <Icons.DashboardIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      { id: 'asset-management', labelKey: 'sidebar.assetManagement', icon: <Icons.BriefcaseIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      { id: 'services', labelKey: 'sidebar.services', icon: <Icons.ConciergeBellIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      { id: 'curators-room', labelKey: 'sidebar.curatorsRoom', icon: <Icons.ArtIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      { id: 'circle', labelKey: 'sidebar.theCircle', icon: <Icons.CircleIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      { id: 'mandates', labelKey: 'sidebar.acquisitionMandates', icon: <Icons.TargetIcon className="w-5 h-5" />, tier: 0, adminOnly: false },
      
      // Private Office
      { id: 'private-office-header', type: 'header', labelKey: 'sidebar.privateOffice', tier: 1, adminOnly: false },
      { id: 'off-market', labelKey: 'sidebar.offMarketIntelligence', icon: <Icons.VaultIcon className="w-5 h-5" />, tier: 1, adminOnly: false },
      { id: 'market-intelligence', labelKey: 'sidebar.marketIntelligence', icon: <Icons.TrendingUpIcon className="w-5 h-5" />, tier: 1, adminOnly: false },
      { id: 'ventures', labelKey: 'sidebar.jointVentures', icon: <Icons.HandshakeIcon className="w-5 h-5" />, tier: 1, adminOnly: false },
      { id: 'security', labelKey: 'sidebar.securityDiscretion', icon: <Icons.ShieldLockIcon className="w-5 h-5" />, tier: 1, adminOnly: false },
      { id: 'private-desk', labelKey: 'sidebar.privateDesk', icon: <Icons.KeyIcon className="w-5 h-5" />, tier: 1, adminOnly: false },
      { id: 'philanthropy', labelKey: 'sidebar.philanthropyBoard', icon: <Icons.GlobeHeartIcon className="w-5 h-5" />, tier: 1, adminOnly: false },

      // Design Studio
      { id: 'design-studio-header', type: 'header', labelKey: 'sidebar.designStudio', tier: 0, adminOnly: false },
      { id: 'design-studio', labelKey: 'sidebar.designStudio', icon: <Icons.ShowcaseIcon className="w-5 h-5" />, tier: 0, adminOnly: false },

      // Generational Office
      { id: 'generational-office-header', type: 'header', labelKey: 'sidebar.generationalOffice', tier: 2, adminOnly: false },
      { id: 'generational-wealth', labelKey: 'sidebar.legacyOffice', icon: <Icons.TreeIcon className="w-5 h-5" />, tier: 2, adminOnly: false },
      
      // Admin
      { id: 'admin', labelKey: 'sidebar.adminPanel', icon: <Icons.AdminIcon className="w-5 h-5" />, tier: 0, adminOnly: true },
    ];

    const filteredNavItems = navItems.filter(item => {
        if (user.type === 'admin') {
            return item.adminOnly || !item.type; // Show admin links and all regular links
        }
        // For users
        return !item.adminOnly && tierLevel >= item.tier;
    });

    const sidebarContent = (logoSize?: number) => (
        <div className="flex flex-col h-full bg-[#0c0c10]/80 backdrop-blur-xl border-r border-gray-800">
            <div className="flex items-center justify-center h-20 border-b border-gray-800 flex-shrink-0 px-4">
                <VestraLogo config={logoConfig} size={logoSize} />
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredNavItems.map(item => {
                    if (item.type === 'header') {
                        return <SectionHeader key={item.id} label={t(item.labelKey)} />;
                    }

                    return (
                        <NavLink
                            key={item.id}
                            id={item.id}
                            label={t(item.labelKey)}
                            icon={item.icon}
                            isActive={activePage === item.id}
                            onClick={() => {
                                if (item.id === 'generational-wealth') {
                                    onGenerationalOfficeNav('generational-wealth');
                                } else {
                                    onNavigate(item.id);
                                }
                                setIsMobileMenuOpen(false);
                            }}
                        />
                    );
                })}
            </nav>

            <div className="flex-shrink-0">
                <LanguageSelector />
                <div className="p-3 border-t border-gray-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <Icons.LogoutIcon className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0 z-20">
                {sidebarContent(logoConfig.navSize)}
            </aside>

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-40">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)} 
                    className="p-2 bg-black/50 backdrop-blur-md rounded-md text-white"
                >
                    <Icons.MenuIcon className="w-6 h-6" />
                </button>
            </div>
            
            {/* Mobile Sidebar */}
            <div 
                className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="w-64 h-full">
                    {sidebarContent(logoConfig.mobileNavSize)}
                </div>
                <div className="absolute top-4 right-4" onClick={() => setIsMobileMenuOpen(false)}>
                    <Icons.CloseIcon className="w-6 h-6 text-white" />
                </div>
            </div>
             {isMobileMenuOpen && <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>}
        </>
    );
};

export default Sidebar;