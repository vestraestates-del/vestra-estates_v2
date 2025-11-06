import React, { useState, useEffect, useMemo, useRef } from 'react';
import { OffMarketProperty } from '../data/offMarketData';
import { useLocalization } from '../localization/LocalizationContext';
import { 
    CloseIcon, BriefcaseIcon, ShieldCheckIcon, TrendingUpIcon, PlayCircleIcon, 
    PlayIcon, PauseIcon, VolumeMuteIcon, VolumeLowIcon, VolumeHighIcon, 
    MaximizeIcon, MinimizeIcon, ThreeDIcon, ClockIcon, DocumentArrowDownIcon,
    KeyIcon, BookOpenIcon
} from './icons/EliteIcons';
import Button from './ui/Button';

interface OffMarketDetailModalProps {
  property: OffMarketProperty;
  onClose: () => void;
  onRequestVisit: (property: OffMarketProperty) => void;
}

type AnalysisTab = 'investment' | 'tax' | 'insurance';
interface MediaItem {
  url: string;
  type: 'image' | 'video' | '3d';
}

const analysisCache = new Map<string, string>();

const ScoreDisplay: React.FC<{ score: number, label: string }> = ({ score, label }) => (
    <div className="text-center">
        <p className="text-3xl font-bold text-cyan-400">{score.toFixed(1)}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
);

const DetailItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
        <div className="text-cyan-400">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);

const OffMarketDetailModal: React.FC<OffMarketDetailModalProps> = ({ property, onClose, onRequestVisit }) => {
    const { t, language } = useLocalization();
    const [activeTab, setActiveTab] = useState<AnalysisTab>('investment');
    
    const [analyses, setAnalyses] = useState<Record<AnalysisTab, string>>({ investment: '', tax: '', insurance: '' });
    const [loading, setLoading] = useState<Record<AnalysisTab, boolean>>({ investment: false, tax: false, insurance: false });
    const [errors, setErrors] = useState<Record<AnalysisTab, string>>({ investment: '', tax: '', insurance: '' });

    // Media State
    const initialMedia = useMemo(() => {
        const media: MediaItem[] = [
            ...property.gallery.map(url => ({ url, type: 'image' as const })),
            ...(property.videos || []).map(url => ({ url, type: 'video' as const })),
        ];
        if (property.modelUrl) {
            media.push({ url: property.modelUrl, type: '3d' as const });
        }
        return media;
    }, [property]);

    const [galleryMedia] = useState<MediaItem[]>(initialMedia);
    const [mainMedia, setMainMedia] = useState(galleryMedia[0] || { url: property.image, type: 'image' });

    // Video Player State
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Image Zoom State
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const generateAnalysis = async (tab: AnalysisTab) => {
            const cacheKey = `${property.id}-${tab}-${language}`;
            
            if (analyses[tab]) return; // Already in component state
            
            if (analysisCache.has(cacheKey)) {
                setAnalyses(prev => ({ ...prev, [tab]: analysisCache.get(cacheKey)! }));
                return;
            }

            setLoading(prev => ({ ...prev, [tab]: true }));
            setErrors(prev => ({ ...prev, [tab]: '' }));

            try {
                let prompt = '';

                switch (tab) {
                    case 'investment':
                        prompt = `You are a Senior Investment Analyst at VESTRA ESTATES. Provide a detailed investment evaluation for the off-market property: "${property.codename}", located in ${property.country}. The property is described as "${property.teaser}". Your analysis should cover: 1. Market Positioning & Uniqueness. 2. Potential for Capital Appreciation (short and long term). 3. Yield Potential (if applicable). 4. Key Risks & Mitigation strategies. 5. A concluding recommendation. Your tone must be formal, data-driven, and confidential. Do not use markdown.`;
                        break;
                    case 'tax':
                        prompt = `You are a Global Tax Advisor specializing in ultra-high-net-worth real estate for VESTRA ESTATES. Provide a comprehensive tax analysis for acquiring the property known as "${property.codename}" in ${property.country}. Your analysis must cover: 1. Property Acquisition Taxes (e.g., stamp duty, transfer tax). 2. Annual Property Taxes. 3. Capital Gains Tax upon future disposal. 4. Potential Wealth and Inheritance Tax implications. 5. Notable tax considerations or incentives specific to ${property.country} for foreign investors. Frame this as a confidential preliminary advisory. Do not use markdown.`;
                        break;
                    case 'insurance':
                        prompt = `You are a Senior Risk & Insurance Consultant for VESTRA ESTATES. Provide an insurance advisory for the off-market property: "${property.codename}" in ${property.country}, described as "${property.teaser}". Detail the necessary insurance coverage, including: 1. A comprehensive All-Risks policy for the structure. 2. Contents insurance, considering high-value items. 3. Public Liability insurance. 4. Any specialized coverage required due to the property's unique nature or location (e.g., environmental, political risk, fine art). Estimate the likely annual premium range in USD. Present this as a preliminary risk assessment. Do not use markdown.`;
                        break;
                }

                const response = await fetch('/api/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Failed to generate ${tab} analysis`);
                }

                const data = await response.json();
                const resultText = data.text;
                setAnalyses(prev => ({ ...prev, [tab]: resultText }));
                analysisCache.set(cacheKey, resultText);

            } catch (err: any) {
                console.error(`AI analysis error for tab ${tab}:`, err);
                const errorMessage = String(err.message);
                if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
                    setErrors(prev => ({ ...prev, [tab]: t('widgets.errors.rateLimit') }));
                } else {
                    setErrors(prev => ({ ...prev, [tab]: t('widgets.aiEvaluation.error') }));
                }
            } finally {
                setLoading(prev => ({ ...prev, [tab]: false }));
            }
        };

        generateAnalysis(activeTab);
    }, [activeTab, property, t, language, analyses]);

    const handleMediaSelect = (media: MediaItem) => {
        setMainMedia(media);
    };
    
    // --- Video and Image Handlers (adapted from PropertyDetailModal) ---
    const showControlsAndSetHideTimer = () => { setShowControls(true); if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); controlsTimeoutRef.current = window.setTimeout(() => { if (videoRef.current && !videoRef.current.paused) setShowControls(false); }, 3000); };
    const toggleFullScreen = () => { const container = videoContainerRef.current; if (!container) return; if (!document.fullscreenElement) container.requestFullscreen(); else if (document.exitFullscreen) document.exitFullscreen(); };
    useEffect(() => { const handleFullScreenChange = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', handleFullScreenChange); return () => document.removeEventListener('fullscreenchange', handleFullScreenChange); }, []);
    useEffect(() => { if (mainMedia.type === 'video') { setProgress(0); showControlsAndSetHideTimer(); } else { setZoom(1); setPosition({ x: 50, y: 50 }); } }, [mainMedia.url, mainMedia.type]);
    useEffect(() => { return () => { if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); }; }, []);
    const handlePlayPause = () => { if (videoRef.current) isPlaying ? videoRef.current.pause() : videoRef.current.play(); };
    const handleTimeUpdate = () => { if (videoRef.current) setProgress(videoRef.current.currentTime); };
    const handleLoadedMetadata = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (videoRef.current) { const newTime = Number(e.target.value); videoRef.current.currentTime = newTime; setProgress(newTime); } };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => { const newVolume = Number(e.target.value); setVolume(newVolume); if (videoRef.current) { videoRef.current.volume = newVolume; const newMuted = newVolume === 0; videoRef.current.muted = newMuted; setIsMuted(newMuted); } };
    const toggleMute = () => { if (videoRef.current) { const newMuted = !isMuted; videoRef.current.muted = newMuted; setIsMuted(newMuted); if (!newMuted && volume === 0) { setVolume(0.5); videoRef.current.volume = 0.5; } } };
    const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { if (zoom > 1) { const { left, top, width, height } = e.currentTarget.getBoundingClientRect(); const x = ((e.clientX - left) / width) * 100; const y = ((e.clientY - top) / height) * 100; setPosition({ x, y }); } };
    const handleImageMouseLeave = () => { setZoom(1); setPosition({ x: 50, y: 50 }); };
    const handleImageWheel = (e: React.WheelEvent<HTMLDivElement>) => { e.preventDefault(); const newZoom = Math.max(1, Math.min(zoom + (e.deltaY < 0 ? 1 : -1) * 0.2, 5)); setZoom(newZoom); if (newZoom <= 1) setPosition({ x: 50, y: 50 }); };
    const handleImageClick = () => { if (zoom > 1) { setZoom(1); setPosition({ x: 50, y: 50 }); } };
    const formatTime = (timeInSeconds: number) => { if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00'; const minutes = Math.floor(timeInSeconds / 60); const seconds = Math.floor(timeInSeconds % 60); return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; };

    // --- RENDER LOGIC ---
    const renderTabContent = () => {
        if (loading[activeTab]) return <div className="flex items-center justify-center h-full min-h-[200px]"><div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span><span className="ml-2">Generating analysis...</span></div></div>;
        if (errors[activeTab]) return <p className="text-red-400 p-4">{errors[activeTab]}</p>;
        return <div className="text-gray-300 text-sm whitespace-pre-wrap font-mono p-4">{analyses[activeTab]}</div>;
    };
    
    const tabs = [{ id: 'investment' as AnalysisTab, label: 'Investment Evaluation', icon: <TrendingUpIcon className="w-4 h-4" /> },{ id: 'tax' as AnalysisTab, label: 'Tax Analysis', icon: <BriefcaseIcon className="w-4 h-4" /> },{ id: 'insurance' as AnalysisTab, label: 'Insurance Advisory', icon: <ShieldCheckIcon className="w-4 h-4" /> }];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center"><h2 className="text-xl font-bold text-cyan-400">{property.codename}</h2><button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white"><CloseIcon className="w-6 h-6" /></button></div>
                <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
                    {/* Left Side: Media */}
                    <div className="w-full md:w-3/5 p-4 flex flex-col">
                        <div className="flex-grow mb-4 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                            {mainMedia.type === 'video' ? (
                                <div ref={videoContainerRef} className="relative w-full h-full group bg-black" onMouseMove={showControlsAndSetHideTimer} onMouseLeave={() => { if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); if (isPlaying) setShowControls(false); }}>
                                    <video ref={videoRef} key={mainMedia.url} src={mainMedia.url} autoPlay onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => { setIsPlaying(false); setShowControls(true); if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); }} onClick={handlePlayPause} className="w-full h-full object-contain" />
                                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                                        <input type="range" min={0} max={duration || 0} value={progress} onChange={handleProgressChange} className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm accent-cyan-500" />
                                        <div className="flex items-center justify-between text-white mt-2"><div className="flex items-center gap-4"><button onClick={handlePlayPause}>{isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}</button><div className="flex items-center gap-2"><button onClick={toggleMute}>{isMuted || volume === 0 ? <VolumeMuteIcon className="w-5 h-5" /> : volume < 0.5 ? <VolumeLowIcon className="w-5 h-5" /> : <VolumeHighIcon className="w-5 h-5" />}</button><input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-24 h-1.5 bg-white/20 rounded-lg accent-cyan-500" /></div></div><div className="flex items-center gap-4 text-xs font-mono"><span>{formatTime(progress)} / {formatTime(duration)}</span><button onClick={toggleFullScreen}>{isFullscreen ? <MinimizeIcon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}</button></div></div>
                                    </div>
                                </div>
                            ) : mainMedia.type === '3d' ? (
                                <iframe title={`${property.codename} 3D Tour`} src={mainMedia.url} className="w-full h-full border-0" allow="fullscreen"></iframe>
                            ) : (
                                <div className="w-full h-full" onMouseMove={handleImageMouseMove} onMouseLeave={handleImageMouseLeave} onWheel={handleImageWheel} onClick={handleImageClick}>
                                    <img src={mainMedia.url} alt="Main property view" className="w-full h-full object-cover transition-transform duration-100" style={{ transform: `scale(${zoom})`, transformOrigin: `${position.x}% ${position.y}%`, cursor: zoom > 1 ? 'zoom-out' : 'zoom-in' }} />
                                </div>
                            )}
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-2">
                            {galleryMedia.map((media, index) => (
                                <div key={media.url + index} className="relative aspect-video rounded-md overflow-hidden cursor-pointer group bg-black" onClick={() => handleMediaSelect(media)}>
                                    
                                     {media.type === 'image' ? (
                                        <img src={media.url} alt={`View ${index + 1}`} className={`w-full h-full object-cover transition-opacity ${mainMedia.url !== media.url && 'opacity-60 group-hover:opacity-100'}`} />
                                     ) : (
                                        <img src={property.image} alt={`Thumbnail for ${media.type}`} className={`w-full h-full object-cover transition-opacity ${mainMedia.url !== media.url && 'opacity-60 group-hover:opacity-100'}`} />
                                     )}

                                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:opacity-0 pointer-events-none`}>
                                        {media.type === 'video' ? <PlayCircleIcon className="w-8 h-8 text-white/90" /> : media.type === '3d' ? <ThreeDIcon className="w-8 h-8 text-white/90" /> : null}
                                    </div>
                                    {mainMedia.url === media.url && <div className="absolute inset-0 ring-2 ring-cyan-500 ring-offset-2 ring-offset-[#0c0c10] rounded-md z-10"></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-2/5 p-4 md:border-l border-gray-800 flex flex-col">
                        <div className="flex-shrink-0">
                           <p className="text-sm text-gray-400 font-mono">{property.location}</p>
                           <p className="text-gray-300 italic mt-2">"{property.teaser}"</p>
                           <div className="my-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
                                <ScoreDisplay score={property.investmentScore} label={t('offMarket.investmentScore')} />
                                <ScoreDisplay score={property.lifestyleScore} label={t('offMarket.lifestyleScore')} />
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <DetailItem icon={<ShieldCheckIcon className="w-5 h-5"/>} label={t('offMarket.securityGrade')} value={property.securityGrade} />
                                <DetailItem icon={<KeyIcon className="w-5 h-5"/>} label={t('offMarket.smartHomeGrade')} value={property.smartHomeGrade} />
                                <DetailItem icon={<BookOpenIcon className="w-5 h-5"/>} label={t('offMarket.architecturalStyle')} value={property.architecturalStyle} />
                           </div>
                           <div className="flex border-b border-gray-800 mt-4">
                                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-900/10' : 'text-gray-400 hover:text-white'}`}>{tab.icon} {tab.label}</button>)}
                           </div>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1 pt-2">{renderTabContent()}</div>
                        <div className="flex-shrink-0 mt-4 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-stretch gap-4">
                            <Button variant="secondary" size="lg" className="w-full sm:flex-1 flex items-center justify-center gap-2" href={property.investorPackUrl} target="_blank" rel="noopener noreferrer" as="a">
                                <DocumentArrowDownIcon className="w-5 h-5" />
                                {t('offMarket.downloadInvestorPack')}
                            </Button>
                            <Button variant="primary" size="lg" className="w-full sm:flex-1 flex items-center justify-center gap-2" onClick={() => onRequestVisit(property)}>
                                <ClockIcon className="w-5 h-5" />
                                {t('offMarket.requestVisitButton')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffMarketDetailModal;
