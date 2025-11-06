// This is the full content of App.tsx

import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import Dashboard from './components/Dashboard.tsx';
import AssetManagementPage from './components/AssetManagementPage.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import CuratorsRoom from './components/CuratorsRoom.tsx';
import CirclePage from './components/CirclePage.tsx';
import AcquisitionMandatesPage from './components/AcquisitionMandatesPage.tsx';
import OffMarketIntelligencePage from './components/OffMarketIntelligencePage.tsx';
import MarketIntelligencePage from './components/MarketIntelligencePage.tsx';
import JointVenturesPage from './components/JointVenturesPage.tsx';
import SecurityDiscretionPage from './components/SecurityDiscretionPage.tsx';
import PrivateDeskPage from './components/PrivateDeskPage.tsx';
import PhilanthropyBoardPage from './components/PhilanthropyBoardPage.tsx';
import DesignStudioPage from './components/DesignStudioPage.tsx';
import GenerationalWealthPage from './components/GenerationalWealthPage.tsx';
import FamilyOfficePage from './components/FamilyOfficePage.tsx';
import SuccessionPlanningPage from './components/SuccessionPlanningPage.tsx';
import PassionAssetPage from './components/PassionAssetPage.tsx';
import AviationYachtingPage from './components/AviationYachtingPage.tsx';
import DigitalVaultPage from './components/DigitalVaultPage.tsx';
import AdminPage from './components/admin/AdminPage.tsx';

import PropertyDetailModal from './components/PropertyDetailModal.tsx';
import OffMarketDetailModal from './components/OffMarketDetailModal.tsx';
import MemberChatWindow from './components/MemberChatWindow.tsx';
import MandateFormModal from './components/MandateFormModal.tsx';
import GhostBidModal from './components/GhostBidModal.tsx';
import PrivateDeskRequestModal from './components/PrivateDeskRequestModal.tsx';
import FamilyOfficeBlueprintModal from './components/FamilyOfficeBlueprintModal.tsx';
import ChatController from './components/ChatController.tsx';
import MembershipTiersPage from './components/MembershipTiersPage.tsx';
import PrivacyAgreementModal from './components/PrivacyAgreementModal.tsx';

import { mockUsers as initialMockUsers, MockUser } from './data/userData.ts';
import { initialPortfolioItems, PortfolioItem } from './data/portfolioData.ts';
import { initialAgendaItems, initialRequestItems, initialMandates, AgendaItem, RequestItem, MandateItem } from './data/appData.ts';
import { initialArtCollection, ArtItem } from './data/artData.ts';
import { initialWatches, WatchItem } from './data/watchesData.ts';
import { initialAutomobiles, AutomobileItem } from './data/automobilesData.ts';
import { initialJewels, JewelItem } from './data/jewelsData.ts';
import { initialWines, WineItem } from './data/winesData.ts';
import { initialSpecialRentals, RentalItem } from './data/rentalsData.ts';
import { circleMembers, CircleMember } from './data/circleData.ts';
import { initialOffMarketProperties, OffMarketProperty } from './data/offMarketData.ts';
import { initialJointVentures, JointVenture } from './data/jointVenturesData.ts';
import { initialPhilanthropyProjects, PhilanthropyProject } from './data/philanthropyData.ts';
import { managedCollectionSummary } from './data/passionAssetData.ts';
import { fleetAssets } from './data/aviationYachtingData.ts';
import { LogoConfig } from './components/icons/VestraLogo.tsx';
import { CurrencyProvider } from './localization/CurrencyContext.tsx';
import { LocalizationProvider } from './localization/LocalizationContext.tsx';


export type User = {
    name: string;
    email: string;
    type: 'user' | 'admin';
    tier: 'Elit Access' | 'Diamond Access' | 'Royal Black Access';
    firstLogin?: boolean;
};

export type GenerationalPage = 'generational-wealth' | 'family-office' | 'succession-planning' | 'passion-assets' | 'aviation-yachting' | 'digital-vault';

type Page = 'dashboard' | 'asset-management' | 'services' | 'curators-room' | 'circle' | 'mandates' | 'off-market' | 'market-intelligence' | 'ventures' | 'security' | 'private-desk' | 'philanthropy' | 'design-studio' | 'admin' | GenerationalPage;

export interface BackgroundImages {
    day: string;
    evening: string;
    night: string;
}

const App: React.FC = () => {
    // STATE MANAGEMENT
    const [user, setUser] = useState<User | null>(null);
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [showTiers, setShowTiers] = useState(false);
    
    // Data states
    const [mockUsers, setMockUsers] = useState<{ [key: string]: MockUser }>(initialMockUsers);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems);
    const [offMarketProperties, setOffMarketProperties] = useState<OffMarketProperty[]>(initialOffMarketProperties);
    const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgendaItems);
    const [requestItems, setRequestItems] = useState<RequestItem[]>(initialRequestItems);
    const [mandates, setMandates] = useState<MandateItem[]>(initialMandates);
    const [artCollection, setArtCollection] = useState<ArtItem[]>(initialArtCollection);
    const [watchCollection, setWatchCollection] = useState<WatchItem[]>(initialWatches);
    const [automobileCollection, setAutomobileCollection] = useState<AutomobileItem[]>(initialAutomobiles);
    const [jewelCollection, setJewelCollection] = useState<JewelItem[]>(initialJewels);
    const [wineCollection, setWineCollection] = useState<WineItem[]>(initialWines);

    // Modal states
    const [selectedProperty, setSelectedProperty] = useState<PortfolioItem | null>(null);
    const [selectedOffMarketProperty, setSelectedOffMarketProperty] = useState<OffMarketProperty | null>(null);
    const [chattingWithMember, setChattingWithMember] = useState<CircleMember | null>(null);
    const [unreadMessages, setUnreadMessages] = useState<Record<number, number>>({ 3: 1 });
    const [mandateFormOpen, setMandateFormOpen] = useState(false);
    const [ghostBidMandate, setGhostBidMandate] = useState<MandateItem | null>(null);
    const [privateDeskRequestType, setPrivateDeskRequestType] = useState<string | null>(null);
    const [familyOfficeBlueprintModalOpen, setFamilyOfficeBlueprintModalOpen] = useState(false);
    const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false);
    const [signedNdas, setSignedNdas] = useState<Set<number>>(new Set());

    // Branding & Content
    const [slogan, setSlogan] = useState("Where Legacy Meets Vision");
    const [logoConfig, setLogoConfig] = useState<LogoConfig>({ type: 'image', url: 'https://i.ibb.co/rRybtWz/V-logo-1.png', navSize: 32, mobileNavSize: 28, loginSize: 60, fontWeight: 'bold' });
    const [backgroundImages, setBackgroundImages] = useState<BackgroundImages>({
        day: "https://i.ibb.co/QqPZyJ6/DAY-0512-LE.jpg",
        evening: "https://i.ibb.co/yn2PGHd1/EVN-0511-LE.jpg",
        night: "https://i.ibb.co/TM2fv3Gn/NGH-0510-LE.jpg"
    });
    const [siteContent, setSiteContent] = useState({ slogan, siteTitle: 'VESTRA ESTATES | Secure Client Portal', metaDescription: '...' });

    const currentHour = new Date().getHours();
    const backgroundImage = useMemo(() => {
        if (currentHour >= 6 && currentHour < 18) return backgroundImages.day;
        if (currentHour >= 18 && currentHour < 21) return backgroundImages.evening;
        return backgroundImages.night;
    }, [currentHour, backgroundImages]);

    // EVENT HANDLERS
    const handleLogin = (loggedInUser: MockUser, email: string) => {
        setUser(loggedInUser);
        if (loggedInUser.firstLogin) {
            setShowPrivacyAgreement(true);
        }
    };
    const handleLogout = () => setUser(null);
    const handleNavigate = (page: Page) => setActivePage(page);
    const handleGenerationalNav = (page: GenerationalPage) => setActivePage(page);

    const handleSaveOrUpdateMandate = (mandate: MandateItem) => {
        setMandates(prev => {
            const exists = prev.some(m => m.id === mandate.id);
            if (exists) return prev.map(m => m.id === mandate.id ? mandate : m);
            return [mandate, ...prev];
        });
        setGhostBidMandate(null);
    };

    const handleAddRequest = (request: Omit<RequestItem, 'id' | 'requester'>) => {
        const newRequest: RequestItem = {
            ...request,
            id: Date.now(),
            requester: user?.name || 'User',
        };
        setRequestItems(prev => [newRequest, ...prev]);
    };

    const handleUpdateRequest = (id: number, newStatus: RequestItem['status']) => {
        setRequestItems(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const handleSaveAgenda = (item: AgendaItem) => {
        setAgendaItems(prev => {
            const exists = prev.some(a => a.id === item.id);
            if (exists) return prev.map(a => a.id === item.id ? item : a);
            return [...prev, item];
        });
    };
    
    // RENDER LOGIC
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={(id) => setAgendaItems(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed} : item))} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={(id) => setAgendaItems(prev => prev.filter(item => item.id !== id))} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
            case 'asset-management': return <AssetManagementPage portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} />;
            case 'services': return <ServicesPage onAddRequest={handleAddRequest} />;
            case 'curators-room': return <CuratorsRoom artCollection={artCollection} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} wineCollection={wineCollection} />;
            case 'circle': return <CirclePage members={circleMembers.filter(m => m.email !== user?.email)} onOpenChat={setChattingWithMember} unreadMessages={unreadMessages} />;
            case 'mandates': return <AcquisitionMandatesPage mandates={mandates} onSaveOrUpdateMandate={handleSaveOrUpdateMandate} onOpenGhostBidModal={setGhostBidMandate} />;
            case 'off-market': return <OffMarketIntelligencePage properties={offMarketProperties} onOpenDetail={setSelectedOffMarketProperty} />;
            case 'market-intelligence': return <MarketIntelligencePage user={user!} onUpgrade={() => setShowTiers(true)} />;
            case 'ventures': return <JointVenturesPage ventures={initialJointVentures} onAddRequest={handleAddRequest} />;
            case 'security': return <SecurityDiscretionPage onAddRequest={handleAddRequest} />;
            case 'private-desk': return <PrivateDeskPage user={user!} onOpenRequestModal={setPrivateDeskRequestType} onNavigate={handleNavigate} onOpenChat={setChattingWithMember} privateDeskMember={circleMembers.find(m => m.name === 'C. Blackwood')!} />;
            case 'philanthropy': return <PhilanthropyBoardPage projects={initialPhilanthropyProjects} onAddRequest={handleAddRequest} />;
            case 'design-studio': return <DesignStudioPage onAddRequest={handleAddRequest} />;
            case 'generational-wealth': return <GenerationalWealthPage onAddRequest={handleAddRequest} />;
            case 'family-office': return <FamilyOfficePage onAddRequest={handleAddRequest} onOpenBlueprintModal={() => setFamilyOfficeBlueprintModalOpen(true)} />;
            case 'succession-planning': return <SuccessionPlanningPage onAddRequest={handleAddRequest} />;
            case 'passion-assets': return <PassionAssetPage collections={managedCollectionSummary} onInitiateService={(title) => handleAddRequest({ type: 'Action', title: `Initiate Service: ${title}`, assignee: 'Specialist Curator', status: 'Pending' })} />;
            case 'aviation-yachting': return <AviationYachtingPage assets={fleetAssets} onInitiateService={(type) => handleAddRequest({ type: 'Action', title: `Engage ${type} Management`, assignee: 'Asset Manager', status: 'Pending' })} />;
            case 'digital-vault': return <DigitalVaultPage />;
            case 'admin': return <AdminPage 
                siteContent={siteContent} onSaveContent={setSiteContent} 
                onSaveBranding={(logo, bgs) => { setLogoConfig(logo); setBackgroundImages(bgs); }} 
                currentLogo={logoConfig} currentBgs={backgroundImages} 
                portfolioItems={portfolioItems} setPortfolioItems={setPortfolioItems} 
                offMarketProperties={offMarketProperties} setOffMarketProperties={setOffMarketProperties} 
                artCollection={artCollection} setArtCollection={setArtCollection} 
                watchCollection={watchCollection} setWatchCollection={setWatchCollection} 
                automobileCollection={automobileCollection} setAutomobileCollection={setAutomobileCollection} 
                jewelCollection={jewelCollection} setJewelCollection={setJewelCollection} 
                wineCollection={wineCollection} setWineCollection={setWineCollection} 
                mockUsers={mockUsers} setMockUsers={setMockUsers}
            />;
            default: return <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={(id) => setAgendaItems(prev => prev.map(item => item.id === id ? {...item, completed: !item.completed} : item))} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={(id) => setAgendaItems(prev => prev.filter(item => item.id !== id))} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
        }
    };
    
    if (showTiers) {
        return <MembershipTiersPage onBack={() => setShowTiers(false)} backgroundImage={backgroundImage} logoConfig={logoConfig} />;
    }

    if (!user) {
        return <LoginScreen slogan={slogan} onLogin={handleLogin} onShowTiers={() => setShowTiers(true)} logoConfig={logoConfig} backgroundImage={backgroundImage} mockUsers={mockUsers} />;
    }
    
    return (
        <LocalizationProvider>
            <CurrencyProvider>
                <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
                    <Sidebar activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout} user={user} logoConfig={logoConfig} onGenerationalOfficeNav={handleGenerationalNav} />
                    <main className="flex-1 overflow-y-auto bg-gray-900/50 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
                        {renderPage()}
                    </main>

                    {/* Modals */}
                    {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} userType={user.type} onScheduleViewing={handleSaveAgenda} signedNdaIds={signedNdas} onSignNda={(id) => setSignedNdas(prev => new Set(prev.add(id)))} onUpdateProperty={(prop) => setPortfolioItems(prev => prev.map(p => p.id === prop.id ? prop : p))} />}
                    {selectedOffMarketProperty && <OffMarketDetailModal property={selectedOffMarketProperty} onClose={() => setSelectedOffMarketProperty(null)} onRequestVisit={(prop) => handleAddRequest({ type: 'Action', title: `Request Visit: ${prop.codename}`, assignee: 'Senior Partner', status: 'Urgent' })} />}
                    {mandateFormOpen && <MandateFormModal onClose={() => setMandateFormOpen(false)} onSave={handleSaveOrUpdateMandate} />}
                    {ghostBidMandate && <GhostBidModal mandate={ghostBidMandate} onClose={() => setGhostBidMandate(null)} onSave={handleSaveOrUpdateMandate} />}
                    {privateDeskRequestType && <PrivateDeskRequestModal isOpen={!!privateDeskRequestType} requestType={privateDeskRequestType} user={user} onClose={() => setPrivateDeskRequestType(null)} onSave={(details) => { handleAddRequest({ type: 'Action', title: `Private Desk: ${privateDeskRequestType}`, assignee: 'Senior Partner', status: 'Urgent', details }); setPrivateDeskRequestType(null); }} />}
                    {familyOfficeBlueprintModalOpen && <FamilyOfficeBlueprintModal onClose={() => setFamilyOfficeBlueprintModalOpen(false)} onSave={(details) => { handleAddRequest({ type: 'Action', title: 'Request Family Office Blueprint', assignee: 'Senior Partner', status: 'Pending', details: JSON.stringify(details) }); setFamilyOfficeBlueprintModalOpen(false); }} />}
                    {showPrivacyAgreement && user && <PrivacyAgreementModal user={user} onClose={() => { setShowPrivacyAgreement(false); setUser(prev => prev ? {...prev, firstLogin: false} : null); }} onConfirm={() => { setShowPrivacyAgreement(false); setUser(prev => prev ? {...prev, firstLogin: false} : null); alert("Thank you for accepting the Privacy Agreement."); }} />}
                    
                    {/* Floating Chat Windows */}
                    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-30">
                        {chattingWithMember && <MemberChatWindow member={chattingWithMember} onClose={() => setChattingWithMember(null)} onNewMessage={() => {}} portfolioItems={portfolioItems} artCollection={artCollection} specialRentals={initialSpecialRentals} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} agendaItems={agendaItems} requestItems={requestItems} />}
                    </div>
                    <ChatController members={circleMembers} portfolioItems={portfolioItems} artCollection={artCollection} specialRentals={initialSpecialRentals} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} agendaItems={agendaItems} requestItems={requestItems} />
                </div>
            </CurrencyProvider>
        </LocalizationProvider>
    );
};

export default App;