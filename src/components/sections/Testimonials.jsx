// src/components/sections/Testimonials.jsx
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllTestimonials,
  selectAllTestimonials,
  selectTestimonialLoading,
  selectTestimonialError
} from '../../redux/testimonialSlice';

const CircularTestimonialCard = React.memo(({
  testimonial, index, currentIndex, totalItems, isMobile
}) => {
  const isMainCard = index === currentIndex;

  const cardTransform = useMemo(() => {
    const angleStep = (2 * Math.PI) / totalItems;
    const angle = (index - currentIndex) * angleStep;
    const radius = isMobile ? 150 : 250;
    const cardWidth = isMobile ? 200 : 280;
    const cardHeight = isMobile ? 280 : 380;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = z > 0 ? 1 : Math.max(isMobile ? 0.6 : 0.7, 0.7 + (z / radius) * 0.3);
    const opacity = isMainCard ? 1 : 1;
    const tiltY = isMainCard ? 0 : (x > 0 ? -15 : 15);
    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle + tiltY * Math.PI/180}rad) scale(${scale})`,
      opacity,
      zIndex: Math.round((z + radius) * 10),
      isMainCard,
      width: cardWidth,
      height: cardHeight
    };
  }, [index, currentIndex, totalItems, isMainCard, isMobile]);

  return (
    <div
      className="absolute transition-all duration-500 ease-out cursor-pointer will-change-transform"
      style={{
        transform: cardTransform.transform,
        opacity: cardTransform.opacity,
        zIndex: cardTransform.zIndex,
        width: cardTransform.width,
        height: cardTransform.height
      }}
    >
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <div className="h-[30%] bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full border-4 border-white shadow-lg object-cover`}
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name) + '&background=FF6A00&color=fff';
            }}
          />
        </div>
        <div className={`h-[70%] ${isMobile ? 'p-3' : 'p-4'} flex flex-col justify-between`}>
          <blockquote className={`text-gray-700 ${isMobile ? 'text-[10px]' : 'text-xs'} flex-1 overflow-hidden leading-relaxed`}>
            "{testimonial.content}"
          </blockquote>
          <div className="border-t border-gray-200 pt-2 mt-auto">
            <p className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>{testimonial.name}</p>
            {testimonial.role && <p className={`text-[10px] text-gray-600 ${isMobile ? 'text-[9px]' : ''}`}>{testimonial.role}</p>}
            {testimonial.company && <p className={`text-[10px] text-orange-600 font-medium ${isMobile ? 'text-[9px]' : ''}`}>{testimonial.company}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Testimonials() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollAccumulator = useRef(0);
  const autoScrollRef = useRef();
  const isUserInteracting = useRef(false);
  const scrollTimeout = useRef();
  const [isAutoScrollSuspended, setIsAutoScrollSuspended] = useState(false);

  // Redux state
  const dispatch = useDispatch();
  const testimonialsData = useSelector(selectAllTestimonials);
  const loading = useSelector(selectTestimonialLoading);
  const error = useSelector(selectTestimonialError);

  // Fetch testimonials on mount
  useEffect(() => {
    dispatch(fetchAllTestimonials());
  }, [dispatch]);

  // Transform API data to match component structure
  const testimonials = useMemo(() => {
    return testimonialsData.map(testimonial => ({
      id: testimonial._id,
      name: testimonial.name?.replace(/"/g, '') || 'Anonymous',
      role: testimonial.title?.replace(/"/g, '') || '',
      company: '', // API doesn't have company field
      content: testimonial.description?.replace(/"/g, '') || '',
      avatar: testimonial.profileImgUrl?.url || 'https://via.placeholder.com/150'
    }));
  }, [testimonialsData]);

  const total = testimonials.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      
      autoScrollRef.current = setInterval(() => {
        if (!isUserInteracting.current && !isAutoScrollSuspended) {
          setCurrentIndex(prev => (prev + 1) % total);
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isMobile, total, isAutoScrollSuspended]);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isInCardsArea = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInCardsArea) return;
      
      const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
      const isAtFirstCard = currentIndex === 0;
      const isAtLastCard = currentIndex === total - 1;
      
      if ((isAtFirstCard && scrollDirection === 'up') || 
          (isAtLastCard && scrollDirection === 'down')) {
        return;
      }
      
      e.preventDefault();
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollAccumulator.current += e.deltaY;
      const threshold = 100;
      
      if (Math.abs(scrollAccumulator.current) >= threshold) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        
        setCurrentIndex(prevIndex => {
          if (direction > 0) {
            return Math.min(prevIndex + 1, total - 1);
          } else {
            return Math.max(prevIndex - 1, 0);
          }
        });
        
        scrollAccumulator.current = 0;
      }
      
      scrollTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 150);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [total, currentIndex, isMobile]);

  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInCardsArea = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInCardsArea) return;
      
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInCardsArea = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInCardsArea) return;
      
      touchEnd.current = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const deltaX = touchStart.current.x - touchEnd.current.x;
      const deltaY = touchStart.current.y - touchEnd.current.y;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        e.preventDefault();
        
        if (deltaX > 0) {
          setCurrentIndex(prevIndex => (prevIndex + 1) % total);
        } else {
          setCurrentIndex(prevIndex => prevIndex === 0 ? total - 1 : prevIndex - 1);
        }

        if (isMobile) {
          setIsAutoScrollSuspended(false);
          isUserInteracting.current = false;
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [total, isMobile]);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollAccumulator.current = newIndex * 100;
  }, [currentIndex, total]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % total;
    setCurrentIndex(newIndex);
    scrollAccumulator.current = newIndex * 100;
  }, [currentIndex, total]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
    scrollAccumulator.current = index * 100;
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full">
        <section className="w-full min-h-screen bg-white py-20 px-4 overflow-hidden relative">
          <div className="quarter-circle-bottom-left" />
          <div className="quarter-circle-top-right" />
          <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6A00]"></div>
          </div>
        </section>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full">
        <section className="w-full min-h-screen bg-white py-20 px-4 overflow-hidden relative">
          <div className="quarter-circle-bottom-left" />
          <div className="quarter-circle-top-right" />
          <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-center min-h-[400px]">
            <p className="text-red-600">Error loading testimonials: {error}</p>
          </div>
        </section>
      </div>
    );
  }

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <style>{`
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .will-change-transform {
          will-change: transform, opacity;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-header {
          animation: fadeSlideIn 1s ease-out forwards;
        }
        
        .animate-subheader {
          animation: fadeSlideIn 1s ease-out 0.3s forwards;
        }

        .quarter-circle-bottom-left {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 250px;
          height: 250px;
          background: #32405B;
          border-radius: 0 100% 0 0;
          opacity: 1;
          pointer-events: none;
        }

        .quarter-circle-top-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: #32405B;
          border-radius: 0 0 0 100%;
          opacity: 1;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .transform-gpu {
            perspective: 600px;
          }
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="w-full min-h-screen bg-white py-20 px-4 overflow-hidden relative"
      >
        {/* Bottom Left Quarter Circle */}
        <div className="quarter-circle-bottom-left" />

        {/* Top Right Quarter Circle */}
        <div className="quarter-circle-top-right" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT SIDE - Heading */}
            <div className="space-y-6 animate-header">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700 rounded-full">
                <ThumbsUp className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">
                Testimonials
              </h2>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Social Proof &<br />
                Reviews<br />
                Widgets
              </h3>
            </div>

            {/* RIGHT SIDE - 3D Circular Gallery */}
            <div 
              ref={containerRef}
              className={`relative ${isMobile ? 'h-[400px]' : 'h-[500px]'} flex items-center justify-center transform-gpu`}
              style={{
                perspective: isMobile ? '600px' : '800px',
                perspectiveOrigin: 'center center'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform-gpu">
                {testimonials.map((t, index) => (
                  <CircularTestimonialCard
                    key={`testimonial-${t.id}`}
                    testimonial={t}
                    index={index}
                    currentIndex={currentIndex}
                    totalItems={total}
                    isMobile={isMobile}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              {!isMobile && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-orange-50 border border-orange-400 text-orange-600 hover:text-orange-700 rounded-full w-10 h-10 p-0 shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-orange-50 border border-orange-400 text-orange-600 hover:text-orange-700 rounded-full w-10 h-10 p-0 shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              <div className={`absolute ${isMobile ? 'bottom-[-25px]' : 'bottom-[-40px]'} left-1/2 -translate-x-1/2 flex gap-2 z-30`}>
                {testimonials.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    onClick={() => handleDotClick(i)}
                    className={`${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full border border-orange-500 transition-all duration-200 ${
                      i === currentIndex 
                        ? "bg-orange-500 scale-110" 
                        : "bg-white hover:bg-orange-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
