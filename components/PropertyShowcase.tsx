import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { PortfolioItem } from '../data/portfolioData';
import { useLocalization } from '../localization/LocalizationContext';
import { useCurrency } from '../localization/CurrencyContext';
import { ChevronLeftIcon, ChevronRightIcon, MaximizeIcon, FilterIcon, CloseIcon, InformationCircleIcon, BedIcon, BathIcon } from './icons/EliteIcons';

interface PropertyShowcaseProps {
  portfolioItems: PortfolioItem[];
  onOpenPropertyDetail: (property: PortfolioItem) => void;
}

const parsePriceToNumber = (priceStr: string): number => {
    const numericValue = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return 0;
    if (priceStr.toLowerCase().includes('m')) {
        return numericValue * 1_000_000;
    }
    if (priceStr.toLowerCase().includes('k')) {
        return numericValue * 1_000;
    }
    return numericValue;
};


const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ portfolioItems, onOpenPropertyDetail }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLocalization();
  const { formatCurrency } = useCurrency();

  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const { minPrice, maxPrice, uniqueLocations } = useMemo(() => {
    if (portfolioItems.length === 0) {
        return { minPrice: 0, maxPrice: 1000, uniqueLocations: [] };
    }
    const prices = portfolioItems.map(p => parsePriceToNumber(p.value));
    const locations = [...new Set(portfolioItems.map(p => t(p.locationKey)))];
    return {
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
        uniqueLocations: locations,
    };
  }, [portfolioItems, t]);

  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(maxPrice);

  useEffect(() => {
    setPriceFilter(maxPrice);
  }, [maxPrice]);
  
  const handleApplyFilters = () => {
    let items = [...portfolioItems];

    if (locationFilter !== 'all') {
      items = items.filter(item => t(item.locationKey) === locationFilter);
    }

    items = items.filter(item => {
      const itemPrice = parsePriceToNumber(item.value);
      return itemPrice <= priceFilter;
    });

    setFilteredItems(items);
    setCurrentIndex(0);
    setIsAnimating(false);
    setIsFilterOpen(false);
  };
  
  const handleResetFilters = () => {
    setLocationFilter('all');
    setPriceFilter(maxPrice);
    setFilteredItems(portfolioItems);
    setCurrentIndex(0);
  };

  const changeSlide = (newIndex: number) => {
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);
    setIsQuickViewOpen(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const goToPrevious = useCallback(() => {
    if (filteredItems.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? filteredItems.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  }, [currentIndex, filteredItems.length]);

  const goToNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    const isLastSlide = currentIndex === filteredItems.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  }, [currentIndex, filteredItems.length]);
  
  const currentProperty = filteredItems[currentIndex];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 19000); 
    return () => clearTimeout(timer);
  }, [currentIndex, filteredItems.length, goToNext]);

  return (
    <div className="h-full w-full relative overflow-hidden bg-black text-white">
        {/* Background Image Container */}
        <div className="absolute inset-0">
            {filteredItems.map((item, index) => {
                return (
                    <div 
                        key={item.id}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={t(item.nameKey)}
                                className={`w-full h-full object-cover ${index === currentIndex ? 'animate-ken-burns' : ''}`}
                            />
                        )}
                    </div>
                );
            })}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>

        <button 
            onClick={() => setIsFilterOpen(true)}
            className="absolute top-8 right-8 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Open filters"
        >
            <FilterIcon className="w-6 h-6 text-white"/>
        </button>

        {isFilterOpen && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-30 flex items-center justify-center animate-fade-in">
                <div className="bg-[#111116]/80 border border-gray-800 rounded-xl p-8 shadow-2xl w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Filter Residences</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="location-filter" className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                            <select 
                                id="location-filter"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="all">All Locations</option>
                                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price-filter" className="block text-sm font-semibold text-gray-300 mb-2">
                                Price up to: <span className="font-bold text-cyan-400">{formatCurrency(`$${(priceFilter / 1_000_000).toFixed(0)}M`)}</span>
                            </label>
                            <input 
                                id="price-filter"
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                step={1_000_000}
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button onClick={handleResetFilters} className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">Reset</button>
                        <button onClick={handleApplyFilters} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-colors">Apply Filters</button>
                    </div>
                </div>
            </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
            {filteredItems.length > 0 && currentProperty ? (
              <div 
                className={`w-full max-w-lg transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                key={currentIndex}
              >
                  <div className="overflow-hidden">
                      <p className="text-cyan-400 font-semibold tracking-[0.2em] uppercase animate-text-fade-in-up" style={{ animationDelay: '0.2s' }}>
                          {t(currentProperty.locationKey)}
                      </p>
                  </div>
                  <div className="overflow-hidden my-4">
                      <h1 className="text-5xl md:text-6xl font-bold text-shadow-lg animate-text-fade-in-up" style={{ animationDelay: '0.4s', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                          {t(currentProperty.nameKey)}
                      </h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-gray-300 leading-relaxed max-w-md animate-text-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        {t(currentProperty.descriptionKey).substring(0, 150)}...
                    </p>
                  </div>
                  <div className="overflow-hidden mt-8">
                    <div className="relative flex items-center gap-4 animate-text-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        <span className="text-3xl font-bold tracking-wider">{formatCurrency(currentProperty.value)}</span>
                        <button 
                            onClick={() => setIsQuickViewOpen(prev => !prev)}
                            className="p-2 text-gray-300 hover:text-white bg-white/10 rounded-full"
                        >
                            <InformationCircleIcon className="w-5 h-5"/>
                        </button>
                         {isQuickViewOpen && (
                            <div className="absolute top-full left-0 mt-3 bg-[#111116]/80 border border-gray-700 rounded-lg p-3 shadow-2xl backdrop-blur-md animate-fade-in">
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <BedIcon className="w-5 h-5 text-cyan-400"/>
                                        <span>{currentProperty.bedrooms} Bedrooms</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <BathIcon className="w-5 h-5 text-cyan-400"/>
                                        <span>{currentProperty.bathrooms} Bathrooms</span>
                                    </div>
                                </div>
                            </div>
                         )}
                    </div>
                  </div>
                  <div className="overflow-hidden mt-4">
                     <button 
                        onClick={() => onOpenPropertyDetail(currentProperty)}
                        className="bg-cyan-600/80 backdrop-blur-sm border border-cyan-500/50 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg animate-text-fade-in-up"
                         style={{ animationDelay: '1.0s' }}
                    >
                        <MaximizeIcon className="w-5 h-5" />
                        <span>Explore Residence</span>
                    </button>
                  </div>
              </div>
            ) : (
                <div className="w-full max-w-lg">
                    <h1 className="text-4xl font-bold">No Residences Found</h1>
                    <p className="text-gray-300 mt-4">No properties match your current filter criteria. Please adjust your filters or reset to view all available residences.</p>
                </div>
            )}

            <div className="w-full flex justify-between items-center">
                 <button
                    onClick={goToPrevious}
                    disabled={filteredItems.length < 2}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous property"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                
                <div className="flex items-center gap-3">
                    {filteredItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => changeSlide(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                            aria-label={`Go to property ${index + 1}`}
                            aria-selected={currentIndex === index}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    disabled={filteredItems.length < 2}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next property"
                >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default PropertyShowcase;