

import React, { useState, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import type { PortfolioItem } from '../data/portfolioData';
import { CloseIcon, MapPinIcon, CheckSquareIcon, DollarSignIcon, PlayCircleIcon, ShareIcon, CheckIcon, PlayIcon, PauseIcon, VolumeMuteIcon, VolumeLowIcon, VolumeHighIcon, MaximizeIcon, MinimizeIcon, ThreeDIcon, PlusCircleIcon, LockClosedIcon, PencilSquareIcon } from './icons/EliteIcons';
import Button from './ui/Button';
import { ServiceIcon } from './ServicesPage';
// FIX: Added file extension to appData import
import type { AgendaItem } from '../data/appData.ts';
import { useLocalization } from '../localization/LocalizationContext';
import { useCurrency } from '../localization/CurrencyContext';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const SchedulingModal = lazy(() => import('./SchedulingModal'));
const NdaModal = lazy(() => import('./NdaModal'));

interface MediaItem {
  url: string;
  type: 'image' | 'video' | '3d';
}

interface PropertyDetailModalProps {
  property: PortfolioItem;
  onClose: () => void;
  userType: 'user' | 'admin';
  onScheduleViewing: (item: AgendaItem) => void;
  signedNdaIds: Set<number>;
  onSignNda: (propertyId: number) => void;
  onUpdateProperty: (property: PortfolioItem) => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose, userType, onScheduleViewing, signedNdaIds, onSignNda, onUpdateProperty }) => {
  const { t } = useLocalization();
  const { formatCurrency } = useCurrency();
  const hasSignedNda = signedNdaIds.has(property.id);

  const [galleryMedia, setGalleryMedia] = useState<MediaItem[]>([]);
  const [mainMedia, setMainMedia] = useState<MediaItem>({ url: property.image, type: 'image' });
  const [isCopied, setIsCopied] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  // State for custom video player
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

  // State for image zoom
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const priceChange = useMemo(() => {
    if (!property.priceHistory || property.priceHistory.length < 2) {
      return null;
    }
    const firstValue = property.priceHistory[0].value;
    const lastValue = property.priceHistory[property.priceHistory.length - 1].value;
    const change = lastValue - firstValue;
    const percentage = ((change / firstValue) * 100).toFixed(2);
    const isPositive = change >= 0;
    return {
      percentage: `${isPositive ? '+' : ''}${percentage}%`,
      isPositive,
    };
  }, [property.priceHistory]);
  
  useEffect(() => {
    const media: MediaItem[] = [
        ...property.gallery.map(url => ({ url, type: 'image' as const })),
        ...(property.videos || []).map(url => ({ url, type: 'video' as const })),
    ];
    if (property.modelUrl) {
        media.push({ url: property.modelUrl, type: '3d' as const });
    }
    setGalleryMedia(media);
    setMainMedia(media[0] || { url: property.image, type: 'image' });
  }, [property.gallery, property.videos, property.modelUrl, property.image]);


  // Reset main media if it's deleted from the gallery
  useEffect(() => {
    if (!galleryMedia.find(item => item.url === mainMedia.url)) {
      setMainMedia(galleryMedia[0] || { url: property.image, type: 'image' });
    }
  }, [galleryMedia, mainMedia.url, property.image]);


  const showControlsAndSetHideTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  const toggleFullScreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (mainMedia.type === 'video') {
      setProgress(0);
      showControlsAndSetHideTimer();
    } else {
      setZoom(1);
      setPosition({ x: 50, y: 50 });
    }
  }, [mainMedia.url, mainMedia.type]);

  useEffect(() => {
    // Cleanup timeouts on unmount
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleMediaSelect = (media: MediaItem) => {
    setMainMedia(media);
  };

  const handleShare = () => {
    if (isCopied) return;
    const propertyUrl = `https://vestra.app/property/${property.id}`;
    navigator.clipboard.writeText(propertyUrl).then(() => {
      setIsCopied(true);
      copyTimeoutRef.current = window.setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link.');
    });
  };

  const handleAddVideo = () => {
    const videoUrl = window.prompt(t('propertyDetail.addVideoPrompt'));
    if (videoUrl) {
      const updatedProperty = {
        ...property,
        videos: [...(property.videos || []), videoUrl]
      };
      onUpdateProperty(updatedProperty);
    }
  };

  const handleDeleteMedia = (indexToDelete: number) => {
    const mediaToDelete = galleryMedia[indexToDelete];
    if (!mediaToDelete) return;

    const updatedProperty: PortfolioItem = { ...property };

    if (mediaToDelete.type === 'image') {
        updatedProperty.gallery = updatedProperty.gallery.filter(url => url !== mediaToDelete.url);
    } else if (mediaToDelete.type === 'video') {
        updatedProperty.videos = (updatedProperty.videos || []).filter(url => url !== mediaToDelete.url);
    } else if (mediaToDelete.type === '3d') {
        updatedProperty.modelUrl = undefined;
    }

    onUpdateProperty(updatedProperty);
  };


  // Video player handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = Number(e.target.value);
      videoRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if(videoRef.current){
        videoRef.current.volume = newVolume;
        const newMuted = newVolume === 0;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
    }
  };

  const toggleMute = () => {
    if(videoRef.current){
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if(!newMuted && volume === 0){
         setVolume(0.5);
         videoRef.current.volume = 0.5;
      }
    }
  };
  
  // Image zoom handlers
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  const handleImageMouseLeave = () => {
    setZoom(1);
    setPosition({ x: 50, y: 50 });
  };

  const handleImageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.2;
    const direction = e.deltaY < 0 ? 1 : -1;
    const newZoom = Math.max(1, Math.min(zoom + direction * zoomFactor, 5));
    setZoom(newZoom);
    if (newZoom <= 1) {
      setPosition({ x: 50, y: 50 });
    }
  };

  const handleImageClick = () => {
    if (zoom > 1) {
      setZoom(1);
      setPosition({ x: 50, y: 50 });
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleConfirmScheduling = (date: string, time: string) => {
    const newAgendaItem: AgendaItem = {
        id: Date.now(),
        time: time,
        title: `${t('propertyDetail.agendaViewingTitle')}: ${t(property.nameKey)}`,
        location: t(property.locationKey),
        completed: false,
    };
    onScheduleViewing(newAgendaItem);
    setIsScheduling(false);
    alert(t('propertyDetail.schedulingSuccess'));
  };
  
  const handlePrimaryAction = () => {
      if (hasSignedNda) {
          setIsScheduling(true);
      } else {
          setIsNdaModalOpen(true);
      }
  };

  const handleNdaConfirmed = () => {
      onSignNda(property.id);
      setIsNdaModalOpen(false);
      // Immediately open scheduling after signing
      setIsScheduling(true);
  };

  const LockedOverlay: React.FC<{ message: string }> = ({ message }) => (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-20">
      <LockClosedIcon className="w-8 h-8 text-cyan-400 mb-3" />
      <p className="text-sm font-semibold text-white">{message}</p>
    </div>
  );

  const videoPlayerJsx = (
    <div 
      ref={videoContainerRef}
      className="relative w-full h-full group bg-black"
      onMouseMove={showControlsAndSetHideTimer}
      onMouseLeave={() => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) setShowControls(false);
      }}
    >
      <video 
        ref={videoRef}
        key={mainMedia.url} 
        src={mainMedia.url} 
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
          if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        }}
        onClick={handlePlayPause}
        className="max-w-full max-h-full w-full h-full object-contain" 
      />
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm accent-cyan-500"
          />
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button onClick={handlePlayPause} className="p-1">
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="p-1">
                  {isMuted || volume === 0 ? <VolumeMuteIcon className="w-5 h-5" /> : volume < 0.5 ? <VolumeLowIcon className="w-5 h-5" /> : <VolumeHighIcon className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm accent-cyan-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span>{formatTime(progress)} / {formatTime(duration)}</span>
              <button onClick={toggleFullScreen} className="p-1 text-white">
                {isFullscreen ? <MinimizeIcon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const ChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const formattedValue = formatCurrency(`$${payload[0].value}M`);
        return (
            <div className="bg-gray-900/80 p-2 border border-gray-700 rounded-md shadow-lg">
                <p className="label text-xs text-gray-400">{label}</p>
                <p className="intro text-cyan-400 font-semibold">{formattedValue}</p>
            </div>
        );
    }
    return null;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in"
        onClick={onClose}
      >
        <div 
          className="bg-[#0c0c10] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex-shrink-0 p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">{t(property.nameKey)}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <MapPinIcon className="w-3 h-3" />
                <span>{t(property.locationKey)}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
            {/* Left Side: Media Gallery */}
            <div className="w-full md:w-3/5 p-4 flex flex-col">
              <div className="flex-grow mb-4 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                {mainMedia.type === 'video' ? (
                  videoPlayerJsx
                ) : mainMedia.type === '3d' && hasSignedNda ? (
                   <iframe
                      title={`${t(property.nameKey)} 3D Model`}
                      src={mainMedia.url}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      allowFullScreen
                    ></iframe>
                ) : (
                  <div
                    className="w-full h-full overflow-hidden"
                    onMouseMove={handleImageMouseMove}
                    onMouseLeave={handleImageMouseLeave}
                    onWheel={handleImageWheel}
                    onClick={handleImageClick}
                  >
                    <img
                      src={mainMedia.url}
                      alt="Main property view"
                      className="w-full h-full object-cover transition-transform duration-100 ease-out"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: `${position.x}% ${position.y}%`,
                        cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="flex-shrink-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-2">
                  {galleryMedia.map((media, index) => (
                    <div 
                      key={media.url + index} 
                      className="relative aspect-video rounded-md overflow-hidden cursor-pointer group bg-black" 
                      onClick={() => handleMediaSelect(media)}
                    >
                      {userType === 'admin' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMedia(index);
                          }}
                          className="absolute top-1 right-1 z-20 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                          title={t('propertyDetail.removeMedia')}
                        >
                          <CloseIcon className="w-3.5 h-3.5" />
                        </button>
                      )}

                       {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={`${t('propertyDetail.view')} ${index + 1}`} 
                          className={`w-full h-full object-cover transition-opacity duration-200 ${mainMedia.url !== media.url && 'opacity-60 group-hover:opacity-100'}`} 
                        />
                      ) : media.type === 'video' ? (
                        <>
                          <video
                            src={media.url}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className={`w-full h-full object-cover transition-opacity duration-200 ${mainMedia.url !== media.url && 'opacity-60 group-hover:opacity-100'}`}
                            onMouseEnter={e => e.currentTarget.play().catch(console.error)}
                            onMouseLeave={e => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:opacity-0 pointer-events-none">
                            <PlayCircleIcon className="w-8 h-8 text-white/90" />
                          </div>
                        </>
                      ) : ( // 3D Tour
                        <>
                           <img src={property.image} alt="3D Tour thumbnail" className={`w-full h-full object-cover transition-opacity duration-200 ${mainMedia.url !== media.url && 'opacity-60 group-hover:opacity-100'}`}/>
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                                <ThreeDIcon className="w-8 h-8 text-white/90"/>
                           </div>
                        </>
                      )}

                      {mainMedia.url === media.url && (
                        <div className="absolute inset-0 ring-2 ring-cyan-500 ring-offset-2 ring-offset-[#0c0c10] rounded-md pointer-events-none z-10"></div>
                      )}
                    </div>
                  ))}
                  {userType === 'admin' && (
                    <div
                      onClick={handleAddVideo}
                      className="aspect-video rounded-md border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-gray-600 transition-colors"
                      title={t('propertyDetail.addVideo')}
                    >
                      <div className="text-center text-gray-500">
                        <PlusCircleIcon className="w-6 h-6" />
                        <span className="text-xs mt-1 block font-semibold">{t('propertyDetail.addVideo')}</span>
                      </div>
                    </div>
                  )}
                </div>
                {!hasSignedNda && <LockedOverlay message={t('propertyDetail.ndaLock.gallery')} />}
              </div>
            </div>
            
            {/* Right Side: Details */}
            <div className="w-full md:w-2/5 p-4 md:border-l border-gray-800 flex flex-col">
              <div className="flex-shrink-0">
                  <div className="bg-white/5 p-4 rounded-lg relative overflow-hidden">
                      <div className="flex items-start justify-between">
                          <div className="flex-1 z-10">
                              <div className="flex items-center gap-2 text-gray-300">
                                  <DollarSignIcon className="w-4 h-4" />
                                  <span className="text-sm">{t('propertyDetail.marketValue')}</span>
                              </div>
                              <p className="text-2xl font-semibold text-cyan-400">{formatCurrency(property.value)}</p>
                              {priceChange && (
                                <p className={`text-xs font-semibold mt-1 ${priceChange.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {priceChange.percentage} {t('propertyDetail.priceTrend7d')}
                                </p>
                              )}
                          </div>
                          <div className="w-1/2 h-20 absolute top-0 right-0 -mr-4 opacity-70">
                              {property.priceHistory && (
                              <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart
                                      data={property.priceHistory}
                                      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                  >
                                  <defs>
                                      <linearGradient id="priceChartGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                      </linearGradient>
                                  </defs>
                                  <Tooltip content={<ChartTooltip />} cursor={false} />
                                  <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="url(#priceChartGradient)" />
                                  </AreaChart>
                              </ResponsiveContainer>
                              )}
                          </div>
                      </div>
                      {!hasSignedNda && <LockedOverlay message={t('propertyDetail.ndaLock.price')} />}
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 pt-4">
                  <div className="relative">
                    <div className={!hasSignedNda ? 'blur-sm' : ''}>
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider mb-2">{t('propertyDetail.description')}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{t(property.descriptionKey)}</p>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider mb-3">{t('propertyDetail.features')}</h3>
                        <div className="space-y-2">
                          {property.featureKeys.map((featureKey, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckSquareIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{t(featureKey)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {property.amenities && property.amenities.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 tracking-wider mb-3">{t('propertyDetail.amenities')}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                                        <div className="text-cyan-400 bg-cyan-900/50 p-2 rounded-md">
                                            <ServiceIcon name={amenity.icon} className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm text-gray-300">{t(amenity.nameKey)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                      )}
                    </div>
                     {!hasSignedNda && <LockedOverlay message={t('propertyDetail.ndaLock.details')} />}
                  </div>
              </div>

              <div className="flex-shrink-0 mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-stretch gap-4">
                  <Button variant="primary" size="lg" className="w-full sm:flex-grow flex items-center justify-center gap-2" onClick={handlePrimaryAction}>
                      {hasSignedNda ? (
                          t('propertyDetail.scheduleButton')
                      ) : (
                          <>
                              <PencilSquareIcon className="w-5 h-5" />
                              {t('propertyDetail.signNdaButton')}
                          </>
                      )}
                  </Button>
                  <Button 
                      variant="ghost" 
                      size="lg" 
                      onClick={handleShare}
                      disabled={isCopied}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 transition-colors ${isCopied ? 'text-green-400' : ''}`}
                  >
                      {isCopied ? (
                          <>
                              <CheckIcon className="w-5 h-5" />
                              <span>{t('propertyDetail.copiedButton')}</span>
                          </>
                      ) : (
                          <>
                              <ShareIcon className="w-5 h-5" />
                              <span>{t('propertyDetail.shareButton')}</span>
                          </>
                      )}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
          {isScheduling && (
              <SchedulingModal 
                  property={property}
                  onClose={() => setIsScheduling(false)}
                  onSchedule={handleConfirmScheduling}
              />
          )}
          {isNdaModalOpen && (
              <NdaModal 
                  property={property}
                  onClose={() => setIsNdaModalOpen(false)}
                  onConfirm={handleNdaConfirmed}
              />
          )}
      </Suspense>
    </>
  );
};

export default PropertyDetailModal;