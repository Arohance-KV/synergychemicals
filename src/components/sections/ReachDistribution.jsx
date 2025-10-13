// src/components/sections/ReachDistribution.jsx
import React, { useState, useEffect, useRef } from 'react';

const ReachDistribution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  // 8 distribution partners/regions data
  const distributionPartners = [
    {
      id: 1,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "North America"
    },
    {
      id: 2,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "Europe"
    },
    {
      id: 3,
      name: "Arohance Tech & Marketing", 
      logo: "/assets/arohance-logo.jpg",
      region: "Asia Pacific"
    },
    {
      id: 4,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "Middle East"
    },
    {
      id: 5,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "South America"
    },
    {
      id: 6,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "Africa"
    },
    {
      id: 7,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "Australia"
    },
    {
      id: 8,
      name: "Arohance Tech & Marketing",
      logo: "/assets/arohance-logo.jpg",
      region: "Southeast Asia"
    }
  ];

  // Duplicate partners for infinite scroll effect - need at least 3 sets for smooth infinite scroll
  const infinitePartners = [...distributionPartners, ...distributionPartners, ...distributionPartners];
  
  // Auto-scroll animation
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const scrollSpeed = 30; // pixels per second
    const totalWidth = (260 + 32) * distributionPartners.length; // card width + padding
    let scrollPosition = 0;
    
    const animate = () => {
      if (sliderRef.current) {
        scrollPosition += scrollSpeed / 60; // 60fps
        
        // Reset when scrolled one full set
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }
        
        sliderRef.current.style.transform = `translateX(-${scrollPosition}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [distributionPartners.length]);

  // Hexagon Component with wider dimensions
  const HexagonCard = ({ partner, index, isVisible }) => {
    return (
      <div
        className={`relative transition-all duration-700 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          transitionDelay: `${(index % 4) * 150}ms`,
        }}
      >
        {/* Hexagon Container - Increased width */}
        <div className="relative group cursor-pointer mx-auto" style={{ width: '260px', height: '230px' }}>
          {/* SVG Hexagon with Border */}
          <svg 
            viewBox="0 0 260 230" 
            className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
          >
            {/* Define hexagon path - wider hexagon */}
            <defs>
              <clipPath id={`hexagon-clip-${index}`}>
                <path d="M130 10 L220 57.5 L220 172.5 L130 220 L40 172.5 L40 57.5 Z" />
              </clipPath>
              <clipPath id={`hexagon-inner-${index}`}>
                <path d="M130 14 L216 59.5 L216 170.5 L130 216 L44 170.5 L44 59.5 Z" />
              </clipPath>
            </defs>
            
            {/* Border hexagon */}
            <path 
              d="M130 10 L220 57.5 L220 172.5 L130 220 L40 172.5 L40 57.5 Z"
              fill="white"
              stroke="#15274B"
              strokeWidth="4"
            />
            
            {/* Image container with full coverage */}
            <foreignObject 
              x="44" 
              y="14" 
              width="172" 
              height="202"
              clipPath={`url(#hexagon-inner-${index})`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  style={{ 
                    minWidth: '100%', 
                    minHeight: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </foreignObject>
            
            {/* Hover overlay */}
            <path 
              d="M130 10 L220 57.5 L220 172.5 L130 220 L40 172.5 L40 57.5 Z"
              fill="url(#gradient-hover)"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Gradient definition for hover */}
            <defs>
              <linearGradient id="gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(21, 39, 75, 0.1)" />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Region Label 
        <div className="text-center mt-4">
          <p className="text-sm font-semibold" style={{ color: '#244D4D' }}>
            {partner.region}
          </p>
        </div>*/}
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="reach-distribution" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/bg-contact.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* White Overlay with 80% opacity */}
      <div className="absolute inset-0 bg-white" style={{ opacity: 0.8 }}></div>

      {/* Background Hexagonal Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path 
                d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
                fill="none"
                stroke="#244D4D"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#244D4D' }}
          >
            Reach / Distribution
          </h2>
        </div>

        {/* Distribution Partners Grid - Infinite Scroll */}
        <div className="relative overflow-hidden">
          {/* Hexagon Cards Container */}
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex"
              style={{ 
                willChange: 'transform'
              }}
            >
              {infinitePartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 px-4 mb-8"
                  style={{ width: '292px' }} // 260px + 32px padding
                >
                  <HexagonCard 
                    partner={partner} 
                    index={index} 
                    isVisible={isVisible}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReachDistribution;