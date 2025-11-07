import React, { useState, useEffect, lazy, Suspense } from 'react';

// Contexts
import { LocalizationProvider } from './localization/LocalizationContext.tsx';
import { CurrencyProvider } from './localization/CurrencyContext.tsx';

// Components
import LoginScreen from './components/LoginScreen.tsx';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import ChatController from './components/ChatController.tsx';
import MemberChatWindow from './components/MemberChatWindow.tsx';
import PropertyDetailModal from './components/PropertyDetailModal.tsx';
import GhostBidModal from './components/GhostBidModal.tsx';
import PrivateDeskRequestModal from './components/PrivateDeskRequestModal.tsx';
import FamilyOfficeBlueprintModal from './components/FamilyOfficeBlueprintModal.tsx';

// Lazy-loaded page components
const AssetManagementPage = lazy(() => import('./components/AssetManagementPage.tsx'));
const ServicesPage = lazy(() => import('./components/ServicesPage.tsx'));
const CuratorsRoom = lazy(() => import('./components/CuratorsRoom.tsx'));
const CirclePage = lazy(() => import('./components/CirclePage.tsx'));
const AcquisitionMandatesPage = lazy(() => import('./components/AcquisitionMandatesPage.tsx'));
const OffMarketIntelligencePage = lazy(() => import('./components/OffMarketIntelligencePage.tsx'));
const MarketIntelligencePage = lazy(() => import('./components/MarketIntelligencePage.tsx'));
const JointVenturesPage = lazy(() => import('./components/JointVenturesPage.tsx'));
const SecurityDiscretionPage = lazy(() => import('./components/SecurityDiscretionPage.tsx'));
const PrivateDeskPage = lazy(() => import('./components/PrivateDeskPage.tsx'));
const PhilanthropyBoardPage = lazy(() => import('./components/PhilanthropyBoardPage.tsx'));
const GenerationalWealthPage = lazy(() => import('./components/GenerationalWealthPage.tsx'));
const FamilyOfficePage = lazy(() => import('./components/FamilyOfficePage.tsx'));
const SuccessionPlanningPage = lazy(() => import('./components/SuccessionPlanningPage.tsx'));
const PassionAssetPage = lazy(() => import('./components/PassionAssetPage.tsx'));
const AviationYachtingPage = lazy(() => import('./components/AviationYachtingPage.tsx'));
const DigitalVaultPage = lazy(() => import('./components/DigitalVaultPage.tsx'));
const DesignStudioPage = lazy(() => import('./components/DesignStudioPage.tsx'));
const AdminPage = lazy(() => import('./components/admin/AdminPage.tsx'));
const MembershipTiersPage = lazy(() => import('./components/MembershipTiersPage.tsx'));
const PrivacyAgreementModal = lazy(() => import('./components/PrivacyAgreementModal.tsx'));
const MfaModal = lazy(() => import('./components/MfaModal.tsx'));
const OffMarketDetailModal = lazy(() => import('./components/OffMarketDetailModal.tsx'));
const CuratedAssetDossierModal = lazy(() => import('./components/CuratedAssetDossierModal.tsx'));


// Data
import { initialPortfolioItems, PortfolioItem } from './data/portfolioData.ts';
import { initialArtCollection, ArtItem } from './data/artData.ts';
import { initialSpecialRentals, RentalItem } from './data/rentalsData.ts';
import { initialWatches, WatchItem } from './data/watchesData.ts';
import { initialAutomobiles, AutomobileItem } from './data/automobilesData.ts';
import { initialJewels, JewelItem } from './data/jewelsData.ts';
import { initialWines, WineItem } from './data/winesData.ts';
import { circleMembers, CircleMember } from './data/circleData.ts';
import { initialAgendaItems, initialRequestItems, initialMandates, AgendaItem, RequestItem, MandateItem } from './data/appData.ts';
import { initialJointVentures, JointVenture } from './data/jointVenturesData.ts';
import { initialPhilanthropyProjects, PhilanthropyProject } from './data/philanthropyData.ts';
import { fleetAssets } from './data/aviationYachtingData.ts';
import { managedCollectionSummary } from './data/passionAssetData.ts';
import { mockUsers, MockUser } from './data/userData.ts';
import { LogoConfig } from './components/icons/VestraLogo.tsx';
import { initialOffMarketProperties, OffMarketProperty } from './data/offMarketData.ts';

// Type definitions
export type UserTier = 'Elit Access' | 'Diamond Access' | 'Royal Black Access';
export interface User {
    name: string;
    email: string;
    type: 'user' | 'admin';
    tier?: UserTier;
    avatar: string;
}
export type GenerationalPage = 'generational-wealth' | 'family-office' | 'succession-planning' | 'passion-assets' | 'aviation-yachting' | 'digital-vault';
export interface BackgroundImages {
    day: string;
    evening: string;
    night: string;
}
export type AnyCuratedAsset = ArtItem | WatchItem | AutomobileItem | JewelItem | WineItem;


const defaultLogoConfig: LogoConfig = {
    type: 'image',
    url: 'https://i.ibb.co/C2rP6P5/vestra-key-logo.png',
    navSize: 40,
    loginSize: 80,
    mobileNavSize: 32,
};

const defaultBackgroundImages: BackgroundImages = {
    day: 'https://i.ibb.co/xc1yx2M/DAY-0512-LE.jpg',
    evening: 'https://i.ibb.co/yn2PGHd/EVN-0511-LE.jpg',
    night: 'https://i.ibb.co/TM2fv3Gn/NGH-0510-LE.jpg',
};


const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activePage, setActivePage] = useState('dashboard');
    const [activeGenerationalPage, setActiveGenerationalPage] = useState<GenerationalPage>('generational-wealth');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [showTiers, setShowTiers] = useState(false);
    
    // Branding state
    const [logoConfig, setLogoConfig] = useState<LogoConfig>(defaultLogoConfig);
    const [backgroundImages, setBackgroundImages] = useState<BackgroundImages>(defaultBackgroundImages);

    // Data state
    const [portfolioItems, setPortfolioItems] = useState(initialPortfolioItems);
    const [agendaItems, setAgendaItems] = useState(initialAgendaItems);
    const [requestItems, setRequestItems] = useState(initialRequestItems);
    const [mandates, setMandates] = useState(initialMandates);
    const [artCollection, setArtCollection] = useState(initialArtCollection);
    const [watchCollection, setWatchCollection] = useState(initialWatches);
    const [automobileCollection, setAutomobileCollection] = useState(initialAutomobiles);
    const [jewelCollection, setJewelCollection] = useState(initialJewels);
    const [wineCollection, setWineCollection] = useState(initialWines);
    const [offMarketProperties, setOffMarketProperties] = useState(initialOffMarketProperties);
    
    // Modal State
    const [selectedProperty, setSelectedProperty] = useState<PortfolioItem | null>(null);
    const [selectedOffMarketProperty, setSelectedOffMarketProperty] = useState<OffMarketProperty | null>(null);
    const [selectedCuratedAsset, setSelectedCuratedAsset] = useState<AnyCuratedAsset | null>(null);
    const [isGhostBidModalOpen, setIsGhostBidModalOpen] = useState(false);
    const [mandateForGhostBid, setMandateForGhostBid] = useState<MandateItem | null>(null);
    const [isPrivateDeskModalOpen, setIsPrivateDeskModalOpen] = useState(false);
    const [privateDeskRequestType, setPrivateDeskRequestType] = useState('');
    const [isFamilyOfficeBlueprintModalOpen, setIsFamilyOfficeBlueprintModalOpen] = useState(false);
    const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false);
    const [showMfaModal, setShowMfaModal] = useState(false);
    const [tempLoginInfo, setTempLoginInfo] = useState<{user: User, email: string} | null>(null);
    const [signedNdaIds, setSignedNdaIds] = useState(new Set<number>());

    // Chat State
    const [chattingWith, setChattingWith] = useState<CircleMember | null>(null);
    const [unreadMessages, setUnreadMessages] = useState<Record<number, number>>({});
    
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) setBackgroundImage(backgroundImages.day);
        else if (hour >= 18 && hour < 21) setBackgroundImage(backgroundImages.evening);
        else setBackgroundImage(backgroundImages.night);
    }, [backgroundImages]);
    
    const handleLogin = (loggedInUser: User, email: string) => {
        // In a real app, MFA status would come from user profile
        if (email === 'admin@vestra.com' || email === 'sofia@vestra.com') {
            setTempLoginInfo({ user: loggedInUser, email });
            setShowMfaModal(true);
        } else {
            // For other users, check for privacy agreement
            // In a real app, this flag would be stored in the DB
            if (localStorage.getItem(`privacy_agreed_${email}`) !== 'true') {
                setTempLoginInfo({ user: loggedInUser, email });
                setShowPrivacyAgreement(true);
            } else {
                setUser(loggedInUser);
            }
        }
    };

    const handleMfaVerify = (code: string) => {
        // Mock verification
        if (code === '123456' && tempLoginInfo) {
             if (localStorage.getItem(`privacy_agreed_${tempLoginInfo.email}`) !== 'true') {
                setShowMfaModal(false);
                setShowPrivacyAgreement(true);
            } else {
                setUser(tempLoginInfo.user);
                setShowMfaModal(false);
                setTempLoginInfo(null);
            }
        } else {
            alert('Invalid MFA code.');
        }
    };

    const handlePrivacyAgreement = () => {
        if (tempLoginInfo) {
            localStorage.setItem(`privacy_agreed_${tempLoginInfo.email}`, 'true');
            setUser(tempLoginInfo.user);
            setShowPrivacyAgreement(false);
            setTempLoginInfo(null);
        }
    };
    
    const handleLogout = () => {
        setUser(null);
        setActivePage('dashboard');
    };

    // CRUD Handlers
    const handleToggleAgendaComplete = (id: number) => setAgendaItems(agendaItems.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    const handleSaveAgenda = (itemToSave: AgendaItem) => {
        const exists = agendaItems.some(item => item.id === itemToSave.id);
        setAgendaItems(exists ? agendaItems.map(item => item.id === itemToSave.id ? itemToSave : item) : [...agendaItems, itemToSave]);
    };
    const handleDeleteAgenda = (id: number) => setAgendaItems(agendaItems.filter(item => item.id !== id));
    const handleAddRequest = (request: Omit<RequestItem, 'id' | 'requester'>) => {
        const newRequest = { ...request, id: Date.now(), requester: user?.name || 'Unknown' };
        setRequestItems(prev => [newRequest, ...prev]);
    };
    const handleRequestOffMarketVisit = (property: OffMarketProperty) => {
        handleAddRequest({
            type: 'Action',
            title: `Request Viewing: ${property.codename}`,
            assignee: 'Senior Partner',
            status: 'Urgent',
            details: `Client has requested a private viewing for the off-market property "${property.codename}" in ${property.location}.`,
        });
        alert('Your request for a private viewing has been confidentially submitted. A Senior Partner will be in contact shortly.');
    };
    const handleUpdateRequest = (id: number, newStatus: RequestItem['status']) => setRequestItems(requestItems.map(item => item.id === id ? { ...item, status: newStatus } : item));
    const handleSaveOrUpdateMandate = (mandate: MandateItem) => {
        const exists = mandates.some(m => m.id === mandate.id);
        setMandates(exists ? mandates.map(m => m.id === mandate.id ? mandate : m) : [...mandates, mandate]);
    };
    const handleOpenGhostBidModal = (mandate: MandateItem) => { setMandateForGhostBid(mandate); setIsGhostBidModalOpen(true); };
    const handleSignNda = (propertyId: number) => setSignedNdaIds(prev => new Set(prev).add(propertyId));
    const handleUpdateProperty = (updatedProperty: PortfolioItem) => {
        setPortfolioItems(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
        setSelectedProperty(updatedProperty); // Keep modal updated
    };
    const handleSaveBranding = (logo: LogoConfig, bgs: BackgroundImages) => {
        setLogoConfig(logo);
        setBackgroundImages(bgs);
    };

    const renderPage = () => {
        if (activePage.startsWith('generational-')) {
            const subPage = activePage.split('generational-')[1];
            switch (subPage) {
                case 'wealth': return <GenerationalWealthPage onNavigate={(page) => setActivePage(`generational-${page}`)} />;
                case 'family-office': return <FamilyOfficePage onAddRequest={handleAddRequest} onOpenBlueprintModal={() => setIsFamilyOfficeBlueprintModalOpen(true)} />;
                case 'succession-planning': return <SuccessionPlanningPage onAddRequest={handleAddRequest} />;
                case 'passion-assets': return <PassionAssetPage collections={managedCollectionSummary} onInitiateService={(title) => handleAddRequest({ type: 'Action', title: `Initiate Service: ${title}`, assignee: 'Specialist Advisor', status: 'Pending' })} />;
                case 'aviation-yachting': return <AviationYachtingPage assets={fleetAssets} onInitiateService={(title) => handleAddRequest({ type: 'Action', title: `Engage Service: ${title}`, assignee: 'Aviation/Yachting Desk', status: 'Pending' })} />;
                case 'digital-vault': return <DigitalVaultPage />;
                default: return <GenerationalWealthPage onNavigate={(page) => setActivePage(`generational-${page}`)} />;
            }
        }

        switch (activePage) {
            case 'dashboard': return <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={handleToggleAgendaComplete} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={handleDeleteAgenda} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
            case 'asset-management': return <AssetManagementPage portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} />;
            case 'services': return <ServicesPage onAddRequest={handleAddRequest} />;
            case 'curators-room': return <CuratorsRoom artCollection={artCollection} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} wineCollection={wineCollection} onOpenDossier={setSelectedCuratedAsset} />;
            case 'circle': return <CirclePage members={circleMembers.filter(m => m.email !== user?.email)} onOpenChat={setChattingWith} unreadMessages={unreadMessages} />;
            case 'mandates': return <AcquisitionMandatesPage mandates={mandates} onSaveOrUpdateMandate={handleSaveOrUpdateMandate} onOpenGhostBidModal={handleOpenGhostBidModal} />;
            case 'off-market': return <OffMarketIntelligencePage properties={offMarketProperties} onOpenDetail={setSelectedOffMarketProperty} />;
            case 'market-intelligence': return <MarketIntelligencePage user={user!} onUpgrade={() => setShowTiers(true)} portfolioItems={portfolioItems} onAddRequest={handleAddRequest}/>;
            case 'ventures': return <JointVenturesPage ventures={initialJointVentures} onAddRequest={handleAddRequest} />;
            case 'security': return <SecurityDiscretionPage onAddRequest={handleAddRequest} />;
            case 'private-desk': return <PrivateDeskPage user={user!} onOpenRequestModal={(type) => { setPrivateDeskRequestType(type); setIsPrivateDeskModalOpen(true); }} onNavigate={setActivePage} onOpenChat={setChattingWith} privateDeskMember={circleMembers.find(m => m.email === 'admin@vestra.com')!} />;
            case 'philanthropy': return <PhilanthropyBoardPage projects={initialPhilanthropyProjects} onAddRequest={handleAddRequest} />;
            case 'design-studio': return <DesignStudioPage onAddRequest={handleAddRequest} />;
            case 'admin': return user?.type === 'admin' ? <AdminPage portfolioItems={portfolioItems} setPortfolioItems={setPortfolioItems} offMarketProperties={offMarketProperties} setOffMarketProperties={setOffMarketProperties} artCollection={artCollection} setArtCollection={setArtCollection} watchCollection={watchCollection} setWatchCollection={setWatchCollection} automobileCollection={automobileCollection} setAutomobileCollection={setAutomobileCollection} jewelCollection={jewelCollection} setJewelCollection={setJewelCollection} wineCollection={wineCollection} setWineCollection={setWineCollection} onSaveBranding={handleSaveBranding} currentLogo={logoConfig} currentBgs={backgroundImages} currentUserEmail={user.email} requestItems={requestItems} setRequestItems={setRequestItems} /> : <Dashboard portfolioItems={portfolioItems} onOpenPropertyDetail={setSelectedProperty} agendaItems={agendaItems} onToggleComplete={handleToggleAgendaComplete} onSaveAgenda={handleSaveAgenda} onDeleteAgenda={handleDeleteAgenda} requestItems={requestItems} userType={user!.type} onAddRequest={handleAddRequest} onUpdateRequest={handleUpdateRequest} />;
            default: return <div>Page not found</div>;
        }
    };
    
    if (showTiers) {
        return <Suspense fallback={<div/>}><MembershipTiersPage onBack={() => setShowTiers(false)} backgroundImage={backgroundImage} logoConfig={logoConfig}/></Suspense>;
    }

    if (!user) {
        return (
            <LocalizationProvider>
                <CurrencyProvider>
                    <LoginScreen slogan="Discretion is the cornerstone of legacy." onLogin={handleLogin} onShowTiers={() => setShowTiers(true)} logoConfig={logoConfig} backgroundImage={backgroundImage} mockUsers={mockUsers} />
                    <Suspense fallback={<div/>}>
                        {showPrivacyAgreement && tempLoginInfo && <PrivacyAgreementModal user={tempLoginInfo.user} onClose={() => { setShowPrivacyAgreement(false); setTempLoginInfo(null); }} onConfirm={handlePrivacyAgreement} />}
                        {showMfaModal && <MfaModal onClose={() => { setShowMfaModal(false); setTempLoginInfo(null); }} onVerify={handleMfaVerify} />}
                    </Suspense>
                </CurrencyProvider>
            </LocalizationProvider>
        );
    }

    return (
        <LocalizationProvider>
            <CurrencyProvider>
                <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
                    <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={user} logoConfig={logoConfig} />
                    <main className="flex-1 overflow-y-auto bg-gray-900 bg-cover bg-center" style={{ backgroundImage: "url('/grid-bg.svg')"}}>
                        <Suspense fallback={<div className="p-8">Loading...</div>}>
                            {renderPage()}
                        </Suspense>
                    </main>
                    <ChatController members={circleMembers} portfolioItems={portfolioItems} artCollection={artCollection} specialRentals={initialSpecialRentals} watchCollection={watchCollection} automobileCollection={automobileCollection} jewelCollection={jewelCollection} agendaItems={agendaItems} requestItems={requestItems} />
                    {chattingWith && <div className="fixed bottom-4 right-4 z-30"><MemberChatWindow member={chattingWith} onClose={() => setChattingWith(null)} onNewMessage={() => setUnreadMessages(prev => ({...prev, [chattingWith.id]: (prev[chattingWith.id] || 0) + 1}))} {...{ portfolioItems, artCollection, specialRentals: initialSpecialRentals, watchCollection, automobileCollection, jewelCollection, agendaItems, requestItems }} /></div>}
                    <Suspense fallback={<div />}>
                        {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} userType={user.type} onScheduleViewing={handleSaveAgenda} signedNdaIds={signedNdaIds} onSignNda={handleSignNda} onUpdateProperty={handleUpdateProperty}/>}
                        {selectedOffMarketProperty && <OffMarketDetailModal property={selectedOffMarketProperty} onClose={() => setSelectedOffMarketProperty(null)} onRequestVisit={handleRequestOffMarketVisit} />}
                        {selectedCuratedAsset && <CuratedAssetDossierModal asset={selectedCuratedAsset} onClose={() => setSelectedCuratedAsset(null)} onAddRequest={handleAddRequest} />}
                        {isGhostBidModalOpen && mandateForGhostBid && <GhostBidModal mandate={mandateForGhostBid} onClose={() => setIsGhostBidModalOpen(false)} onSave={(mandate) => { handleSaveOrUpdateMandate(mandate); setIsGhostBidModalOpen(false); }} />}
                        {isPrivateDeskModalOpen && <PrivateDeskRequestModal isOpen={isPrivateDeskModalOpen} requestType={privateDeskRequestType} user={user} onClose={() => setIsPrivateDeskModalOpen(false)} onSave={(details) => { handleAddRequest({ type: 'Action', title: `Private Desk: ${privateDeskRequestType}`, assignee: 'Senior Partner', status: 'Urgent', details }); setIsPrivateDeskModalOpen(false); }} />}
                        {isFamilyOfficeBlueprintModalOpen && <FamilyOfficeBlueprintModal onClose={() => setIsFamilyOfficeBlueprintModalOpen(false)} onSave={(details) => { handleAddRequest({ type: 'Action', title: 'Family Office Blueprint Request', assignee: 'Senior Partner', status: 'Urgent', details: JSON.stringify(details) }); setIsFamilyOfficeBlueprintModalOpen(false); }} />}
                    </Suspense>
                </div>
            </CurrencyProvider>
        </LocalizationProvider>
    );
};

export default App;