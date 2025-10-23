// src/components/sections/ExploreChemistry.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllIndustries, 
  selectAllIndustries, 
  selectIndustryLoading, 
  selectIndustryError 
} from '../../redux/industrySlice';

const ExploreChemistry = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  // Redux state
  const dispatch = useDispatch();
  const industriesData = useSelector(selectAllIndustries);
  const loading = useSelector(selectIndustryLoading);
  const error = useSelector(selectIndustryError);

  // Fetch industries on component mount
  useEffect(() => {
    dispatch(fetchAllIndustries());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile - show 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet - show 2 cards
      } else {
        setItemsPerView(3); // Desktop - show 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform API data - only use name and image
  const industries = industriesData.map((industry, index) => {
    // Background colors cycle
    const bgColors = [
      "bg-blue-50",
      "bg-yellow-50",
      "bg-pink-50",
      "bg-purple-50",
      "bg-orange-50",
      "bg-green-50",
      "bg-indigo-50",
      "bg-teal-50",
      "bg-rose-50"
    ];

    return {
      id: industry._id,
      title: industry.name?.replace(/"/g, '') || 'Industry',
      image: industry.image?.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop',
      bgColor: bgColors[index % bgColors.length]
    };
  });

  const totalSlides = industries.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerView);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Reset current index when items per view changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6A00]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600">Error loading industries: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // No data - don't render section
  if (industries.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`has-staggered-in transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Title */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal transition-all duration-700"
                style={{ 
                  color: '#000',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
                }}
              >
                EXPLORE CHEMISTRY BY INDUSTRY
              </h2>

              {/* Desktop Navigation - Above 1023px */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: currentIndex === 0 ? '#BEBEC1' : '#5C5C64'
                  }}
                  aria-label="Previous card"
                >
                  <ChevronLeft 
                    className="w-5 h-5" 
                    color={currentIndex === 0 ? '#BEBEC1' : '#5C5C64'}
                  />
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'
                  }}
                  aria-label="Next card"
                >
                  <ChevronRight 
                    className="w-5 h-5" 
                    color={currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div 
            className="overflow-hidden" 
            ref={listRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <ul 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                gap: itemsPerView === 1 ? '0' : '1.5rem'
              }}
            >
              {industries.map((industry, index) => (
                <li
                  key={industry.id}
                  className="flex-shrink-0"
                  style={{
                    width: itemsPerView === 1 
                      ? '100%' 
                      : `calc((100% - ${(itemsPerView - 1) * 1.5}rem) / ${itemsPerView})`,
                    paddingLeft: itemsPerView === 1 && index > 0 ? '0.5rem' : '0',
                    paddingRight: itemsPerView === 1 && index < industries.length - 1 ? '0.5rem' : '0'
                  }}
                >
                  <div 
                    className="h-full"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                      transition: `all 700ms ease-out ${Math.min(index, 2) * 60}ms`
                    }}
                  >
                    <div className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
                      
                      {/* Card Body - Fixed Height */}
                      <div 
                        className={`${industry.bgColor} p-6 md:p-8 lg:p-10 flex flex-col justify-between`} 
                        style={{ height: '220px' }}
                      >
                        <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-[#15274B] uppercase leading-tight">
                          {industry.title}
                        </h3>
                        
                        {/* Action Button */}
                        <div className="flex justify-start mt-auto">
                          <div className="bg-[#15274B] hover:bg-[#1e3a5f] rounded-full p-3 transition-all duration-300 cursor-pointer inline-flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Image Section - Fixed Height */}
                      <div 
                        className="relative overflow-hidden" 
                        style={{ height: '280px' }}
                      >
                        <img 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                          alt={industry.title}
                          src={industry.image}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation and Progress Indicator */}
        <div className="lg:hidden mt-6 md:mt-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Progress Bar */}
            <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-[#15274B] rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / totalSlides) * 100}%`
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: currentIndex === 0 ? '#BEBEC1' : '#5C5C64'
                }}
                aria-label="Previous card"
              >
                <ChevronLeft 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  color={currentIndex === 0 ? '#BEBEC1' : '#5C5C64'}
                />
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'
                }}
                aria-label="Next card"
              >
                <ChevronRight 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  color={currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'}
                />
              </button>
            </div>
          </div>

          {/* Page Counter */}
          <div className="text-center mt-4 text-sm text-gray-600">
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExploreChemistry;
