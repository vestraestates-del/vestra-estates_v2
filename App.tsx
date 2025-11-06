import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AssetManagementPage from './components/AssetManagementPage';
import ServicesPage from './components/ServicesPage';
import CuratorsRoom from './components/CuratorsRoom';
import CirclePage from './components/CirclePage';
import AcquisitionMandatesPage from './components/AcquisitionMandatesPage';
import JointVenturesPage from './components/JointVenturesPage';
import SecurityDiscretionPage from './components/SecurityDiscretionPage';
import PrivateDeskPage from './components/PrivateDeskPage';
import PhilanthropyBoardPage from './components/PhilanthropyBoardPage';
import GenerationalWealthPage from './components/GenerationalWealthPage';
import FamilyOfficePage from './components/FamilyOfficePage';
import SuccessionPlanningPage from './components/SuccessionPlanningPage';
import PassionAssetPage from './components/PassionAssetPage';
import AviationYachtingPage from './components/AviationYachtingPage';
import DigitalVaultPage from './components/DigitalVaultPage';
import AdminPage from './components/AdminPage';
import ChatController from './components/ChatController';
import MemberChatWindow from './components/MemberChatWindow';
import PropertyDetailModal from './components/PropertyDetailModal';
import OffMarketDetailModal from './components/OffMarketDetailModal';
import GhostBidModal from './components/GhostBidModal';
import FamilyOfficeBlueprintModal from './components/FamilyOfficeBlueprintModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import MfaModal from './components/MfaModal';
import MembershipTiersPage from './components/MembershipTiersPage';
import PrivacyModal from './components/PrivacyModal';
import DesignStudioPage from './components/DesignStudioPage';
import PrivateDeskRequestModal from './components/PrivateDeskRequestModal';
import MarketIntelligencePage from './components/MarketIntelligencePage';
import OffMarketIntelligencePage from './components/OffMarketIntelligencePage';
import PrivacyAgreementModal from './components/PrivacyAgreementModal';

import { LocalizationProvider } from './localization/LocalizationContext';
import { CurrencyProvider } from './localization/CurrencyContext';

import { LogoConfig } from './components/icons/VestraLogo';
import { initialPortfolioItems, PortfolioItem } from './data/portfolioData';
import { initialArtCollection, ArtItem } from './data/artData';
import { initialSpecialRentals, RentalItem } from './data/rentalsData';
import { initialWatches, WatchItem } from './data/watchesData';
import { initialAutomobiles, AutomobileItem } from './data/automobilesData';
import { initialJewels, JewelItem } from './data/jewelsData';
import { initialWines, WineItem } from './data/winesData';
import { circleMembers, CircleMember } from './data/circleData';
// FIX: Add file extension to appData import
import { initialAgendaItems, initialRequestItems, initialMandates, AgendaItem, RequestItem, MandateItem } from './data/appData.ts';
import { initialOffMarketProperties, OffMarketProperty } from './data/offMarketData';
import { initialJointVentures, JointVenture } from './data/jointVenturesData';
import { initialPhilanthropyProjects, PhilanthropyProject } from './data/philanthropyData';
import { managedCollectionSummary } from './data/passionAssetData';
import { fleetAssets } from './data/aviationYachtingData';
import { useLocalization } from './localization/LocalizationContext';

export type User = ({ type: 'user' } & CircleMember) | { type: 'admin'; name: string };
export type GenerationalPage = 'generational-wealth' | 'family-office' | 'succession-planning' | 'passion-assets' | 'aviation-yachting' | 'digital-vault';

// Mock users for login demo
const mockUsers: { [key: string]: User } = {
  'adrian@vestra.com': { ...circleMembers[0], type: 'user' },
  'isabella@vestra.com': { ...circleMembers[1], type: 'user' },
  'kenji@vestra.com': { ...circleMembers[2], type: 'user' },
  'sofia@vestra.com': { ...circleMembers[3], type: 'user' },
  'charles@vestra.com': { ...circleMembers[4], type: 'user' },
  'admin@vestra.com': { type: 'admin', name: 'Administrator' },
};

const privateDeskMember: CircleMember = {
  id: 999, // High ID to avoid collisions
  name: "Private Desk",
  title: "Confidential Concierge",
  company: "VESTRA ESTATES",
  avatar: 'https://i.imgur.com/r6feV7k.png', // Abstract, professional icon
  online: true,
  interests: ["Client Services", "Discretion", "Logistics"],
  gender: 'neutral',
  tier: 'Royal Black Access',
  invitationCode: null
};

export interface BackgroundImages {
    day: string;
    evening: string;
    night: string;
}

const AppContent: React.FC = () => {
    const { t } = useLocalization(); // Hook needs to be inside a component that is a child of the provider
    // State management
    const [user, setUser] = useState<User | null>(null);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const [activePage, setActivePage] = useState('dashboard');
    const [backgroundImages, setBackgroundImages] = useState<BackgroundImages>({
        day: 'https://i.ibb.co/QqPZyJ6/DAY-0512-LE.jpg',
        evening: 'https://i.ibb.co/yn2PGHd1/EVN-0511-LE.jpg',
        night: 'https://i.ibb.co/TM2fv3Gn/NGH-0510-LE.jpg'
    });
    const [activeBackgroundImage, setActiveBackgroundImage] = useState(backgroundImages.night);
    const [logoConfig, setLogoConfig] = useState<LogoConfig>({
        url: 'https://i.ibb.co/rRybtWzF/V-logo-1.png',
        type: 'image',
        text: 'VESTRA',
        navSize: 120,
        loginSize: 240,
        mobileNavSize: 64,
        fontWeight: 'bold',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        textColor: '#06b6d4',
    });

    useEffect(() => {
        const getActiveBg = () => {
            const hour = new Date().getHours();
            if (hour >= 6 && hour < 18) { // Day: 6am - 5:59pm
                return backgroundImages.day;
            } else if (hour >= 18 && hour < 21) { // Evening: 6pm - 8:59pm
                return backgroundImages.evening;
            } else { // Night: 9pm - 5:59am
                return backgroundImages.night;
            }
        };
        setActiveBackgroundImage(getActiveBg());
    }, [backgroundImages]);
    
    // Data states
    const [portfolioItems, setPortfolioItems] = useState(initialPortfolioItems);
    const [artCollection, setArtCollection] = useState(initialArtCollection);
    const [specialRentals, setSpecialRentals] = useState(initialSpecialRentals);
    const [watchCollection, setWatchCollection] = useState(initialWatches);
    const [automobileCollection, setAutomobileCollection] = useState(initialAutomobiles);
    const [jewelCollection, setJewelCollection] = useState(initialJewels);
    const [wineCollection, setWineCollection] = useState(initialWines);
    const [agendaItems, setAgendaItems] = useState(initialAgendaItems);
    const [requestItems, setRequestItems] = useState(initialRequestItems);
    const [mandates, setMandates] = useState(initialMandates);
    const [offMarketProperties, setOffMarketProperties] = useState(initialOffMarketProperties);
    const [jointVentures, setJointVentures] = useState(initialJointVentures);
    const [philanthropyProjects, setPhilanthropyProjects] = useState(initialPhilanthropyProjects);
    
    // Modal states
    const [selectedProperty, setSelectedProperty] = useState<PortfolioItem | null>(null);
    const [selectedOffMarketProperty, setSelectedOffMarketProperty] = useState<OffMarketProperty | null>(null);
    const [activeChatMember, setActiveChatMember] = useState<CircleMember | null>(null);
    const [unreadMessages, setUnreadMessages] = useState<Record<number, number>>({});
    const [ghostBidMandate, setGhostBidMandate] = useState<MandateItem | null>(null);
    const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
    const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState(false);
    const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
    const [isShowingTiers, setIsShowingTiers] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [privateDeskModalState, setPrivateDeskModalState] = useState({ isOpen: false, requestType: '' });
    const [isPrivacyAgreementModalOpen, setIsPrivacyAgreementModalOpen] = useState(false);
    
    // NDA State
    const [signedNdaIds, setSignedNdaIds] = useState<Set<number>>(new Set());
    const handleSignNda = (propertyId: number) => setSignedNdaIds(prev => new Set(prev).add(propertyId));

    // Privacy Agreement State
    const [acceptedPrivacyUserEmails, setAcceptedPrivacyUserEmails] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('vestra_privacy_accepted');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    // Data handling functions
    const handleToggleAgenda = (id: number) => setAgendaItems(agendaItems.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    const handleSaveAgenda = (item: AgendaItem) => {
        const index = agendaItems.findIndex(i => i.id === item.id);
        if (index > -1) {
            setAgendaItems(agendaItems.map(i => i.id === item.id ? item : i));
        } else {
            setAgendaItems([...agendaItems, item]);
        }
    };
    const handleDeleteAgenda = (id: number) => setAgendaItems(agendaItems.filter(item => item.id !== id));
    const handleAddRequest = (request: Omit<RequestItem, 'id' | 'requester'>) => {
        const requesterName = user?.type === 'admin' ? 'Administrator' : user?.name;
        setRequestItems(prev => [...prev, { ...request, requester: requesterName, id: Date.now() }]);
    };
    const handleUpdateRequest = (id: number, newStatus: RequestItem['status']) => setRequestItems(requestItems.map(r => r.id === id ? { ...r, status: newStatus } : r));
    const handleSaveOrUpdateMandate = (mandate: MandateItem) => {
        const index = mandates.findIndex(m => m.id === mandate.id);
        if (index > -1) {
            setMandates(mandates.map(m => m.id === mandate.id ? mandate : m));
        } else {
            setMandates([...mandates, mandate]);
        }
        setGhostBidMandate(null); // Close modal on save
    };
    const handleUpdateProperty = (property: PortfolioItem) => {
        const index = portfolioItems.findIndex(p => p.id === property.id);
        if (index > -1) {
            const newPortfolio = [...portfolioItems];
            newPortfolio[index] = property;
            setPortfolioItems(newPortfolio);
            setSelectedProperty(property); // Update the modal view
        }
    };

    const handleLogin = (loggedInUser: User, email: string) => {
        setUser(loggedInUser);
        setCurrentUserEmail(email.toLowerCase());
        setActivePage('dashboard');

        if (!acceptedPrivacyUserEmails.has(email.toLowerCase()) && loggedInUser.type !== 'admin') {
            setIsPrivacyAgreementModalOpen(true);
        }
    };
    
    const handleAcceptPrivacyAgreement = () => {
        if (!currentUserEmail) return;

        const updatedSet = new Set(acceptedPrivacyUserEmails).add(currentUserEmail);
        setAcceptedPrivacyUserEmails(updatedSet);
        localStorage.setItem('vestra_privacy_accepted', JSON.stringify(Array.from(updatedSet)));
        
        const userName = user?.name || currentUserEmail;
        handleAddRequest({
            type: 'Information',
            title: `Privacy Agreement Approved by ${userName}`,
            assignee: 'Admin Desk',
            status: 'Completed',
        });

        setIsPrivacyAgreementModalOpen(false);
    };

    const handleGenerationalOfficeNav = (page: GenerationalPage) => {
        if (user && user.type === 'user' && user.tier === 'Royal Black Access') {
            setIsMfaModalOpen(true);
            // Store the intended page to navigate to after MFA
            // In a real app, use a state management library for this
            (window as any)._postMfaNav = page;
        } else if (user && user.type === 'admin') {
            setActivePage(page); // Admin bypasses MFA
        } else {
            alert('This section requires Royal Black Access.');
        }
    };

    const handleMfaVerify = (code: string) => {
        // Mock verification: any 6-digit code works
        if (code.length === 6 && /^\d+$/.test(code)) {
            setIsMfaModalOpen(false);
            const targetPage = (window as any)._postMfaNav;
            if (targetPage) {
                setActivePage(targetPage);
                delete (window as any)._postMfaNav;
            }
        } else {
            alert('Invalid verification code.');
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={handleToggleAgenda} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={handleDeleteAgenda} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
            case 'asset-management': return <AssetManagementPage portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} />;
            case 'services': return <ServicesPage onAddRequest={handleAddRequest} />;
            case 'curators-room': return <CuratorsRoom artCollection={artCollection} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} wineCollection={wineCollection} />;
            case 'circle': return <CirclePage members={circleMembers.filter(m => m.id !== (user as CircleMember)?.id)} onOpenChat={setActiveChatMember} unreadMessages={unreadMessages} />;
            case 'mandates': return <AcquisitionMandatesPage mandates={mandates} onSaveOrUpdateMandate={handleSaveOrUpdateMandate} onOpenGhostBidModal={setGhostBidMandate} />;
            case 'off-market': return <OffMarketIntelligencePage properties={offMarketProperties} onOpenDetail={setSelectedOffMarketProperty} />;
            case 'ventures': return <JointVenturesPage ventures={jointVentures} onAddRequest={handleAddRequest} />;
            case 'security': return <SecurityDiscretionPage onAddRequest={handleAddRequest} />;
            case 'private-desk': return <PrivateDeskPage user={user!} onOpenRequestModal={(type) => setPrivateDeskModalState({ isOpen: true, requestType: type })} onNavigate={setActivePage} onOpenChat={setActiveChatMember} privateDeskMember={privateDeskMember} />;
            case 'philanthropy': return <PhilanthropyBoardPage projects={philanthropyProjects} onAddRequest={handleAddRequest} />;
            case 'design-studio': return <DesignStudioPage onAddRequest={handleAddRequest} />;
            case 'market-intelligence': return <MarketIntelligencePage user={user!} onUpgrade={() => setIsShowingTiers(true)} />;
            case 'generational-wealth': return <GenerationalWealthPage onAddRequest={handleAddRequest} />;
            case 'family-office': return <FamilyOfficePage onAddRequest={handleAddRequest} onOpenBlueprintModal={() => setIsBlueprintModalOpen(true)} />;
            case 'succession-planning': return <SuccessionPlanningPage onAddRequest={handleAddRequest} />;
            case 'passion-assets': return <PassionAssetPage collections={managedCollectionSummary} onInitiateService={(title) => setIsServiceRequestModalOpen(true)} />;
            case 'aviation-yachting': return <AviationYachtingPage assets={fleetAssets} onInitiateService={(title) => setIsServiceRequestModalOpen(true)} />;
            case 'digital-vault': return <DigitalVaultPage />;
            case 'admin': return <AdminPage onBrandingChange={(logo, bgs) => { setLogoConfig(logo); setBackgroundImages(bgs); }} currentLogo={logoConfig} currentBgs={backgroundImages} />;
            default: return <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={handleToggleAgenda} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={handleDeleteAgenda} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
        }
    };

    if (isShowingTiers) {
        return <MembershipTiersPage onBack={() => setIsShowingTiers(false)} backgroundImage={activeBackgroundImage} logoConfig={logoConfig} />;
    }

    if (!user) {
        return <LoginScreen onLogin={handleLogin} onShowTiers={() => setIsShowingTiers(true)} logoConfig={logoConfig} backgroundImage={activeBackgroundImage} mockUsers={mockUsers} />;
    }

    return (
        <div className="flex h-screen w-screen bg-black text-white font-sans overflow-hidden" style={{ backgroundImage: `url(${activeBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={() => setUser(null)} user={user} logoConfig={logoConfig} onGenerationalOfficeNav={handleGenerationalOfficeNav} />
            <main className="flex-1 overflow-y-auto relative">
                {renderPage()}
            </main>
            <ChatController members={circleMembers} portfolioItems={portfolioItems} artCollection={artCollection} specialRentals={specialRentals} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} agendaItems={agendaItems} requestItems={requestItems} />
            {activeChatMember && <div className="fixed bottom-4 right-4 z-30"><MemberChatWindow member={activeChatMember} onClose={() => setActiveChatMember(null)} portfolioItems={portfolioItems} artCollection={artCollection} specialRentals={specialRentals} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} agendaItems={agendaItems} requestItems={requestItems} onNewMessage={() => setUnreadMessages(prev => ({...prev, [activeChatMember.id]: (prev[activeChatMember.id] || 0) + 1}))} /></div>}
            {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} userType={user.type} onScheduleViewing={handleSaveAgenda} signedNdaIds={signedNdaIds} onSignNda={handleSignNda} onUpdateProperty={handleUpdateProperty} />}
            {selectedOffMarketProperty && <OffMarketDetailModal property={selectedOffMarketProperty} onClose={() => setSelectedOffMarketProperty(null)} onRequestVisit={(p) => handleAddRequest({type: 'Action', title: `Request Visit: ${p.codename}`, assignee: 'Senior Partner', status: 'Urgent'})} />}
            {ghostBidMandate && <GhostBidModal mandate={ghostBidMandate} onClose={() => setGhostBidMandate(null)} onSave={handleSaveOrUpdateMandate} />}
            {isBlueprintModalOpen && <FamilyOfficeBlueprintModal onClose={() => setIsBlueprintModalOpen(false)} onSave={(details) => { handleAddRequest({ type: 'Action', title: `Request Family Office Blueprint`, assignee: 'Senior Partner', status: 'Pending', details: JSON.stringify(details) }); setIsBlueprintModalOpen(false); }} />}
            {isServiceRequestModalOpen && <ServiceRequestModal title="Initiate Service" prompt="Please provide preliminary details for your request." placeholder="e.g., Interested in sourcing a vintage Patek Philippe..." onClose={() => setIsServiceRequestModalOpen(false)} onSave={(details) => { handleAddRequest({ type: 'Action', title: `Service Request`, assignee: 'Senior Partner', status: 'Pending', details: details.request }); setIsServiceRequestModalOpen(false); }} />}
            {privateDeskModalState.isOpen && user.type === 'user' && (
                <PrivateDeskRequestModal
                    isOpen={privateDeskModalState.isOpen}
                    requestType={privateDeskModalState.requestType}
                    user={user}
                    onClose={() => setPrivateDeskModalState({ isOpen: false, requestType: '' })}
                    onSave={(details) => {
                        handleAddRequest({
                            type: 'Action',
                            title: 'Private Desk Request',
                            assignee: 'Senior Partner',
                            status: 'Urgent',
                            details,
                        });
                        alert(t('privateDesk.confirmation'));
                        setPrivateDeskModalState({ isOpen: false, requestType: '' });
                    }}
                />
            )}
            {isMfaModalOpen && <MfaModal onClose={() => setIsMfaModalOpen(false)} onVerify={handleMfaVerify} />}
            {isPrivacyModalOpen && <PrivacyModal onClose={() => setIsPrivacyModalOpen(false)} />}
            {isPrivacyAgreementModalOpen && user.type === 'user' && (
                <PrivacyAgreementModal
                    user={user}
                    onClose={() => alert("You must accept the privacy agreement to continue using the platform.")}
                    onConfirm={handleAcceptPrivacyAgreement}
                />
            )}
        </div>
    );
};

const App: React.FC = () => (
    <LocalizationProvider>
        <CurrencyProvider>
            <AppContent />
        </CurrencyProvider>
    </LocalizationProvider>
);

export default App;