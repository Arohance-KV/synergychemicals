// src/components/sections/AboutVision.jsx
import React, { useState, useEffect, useRef } from 'react';

const AboutVision = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [counters, setCounters] = useState({ team: 0, features: 0, locations: 0 });
  const statsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer to trigger counting when stats section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startCounting) {
      // Animate counters with easing
      const duration = 2000; // 2 seconds
      const steps = 60;
      const teamTarget = 30;
      const featuresTarget = 100;
      const locationsTarget = 30;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        // Easing function for smooth animation
        const progress = easeOutQuart(currentStep / steps);
        
        setCounters({
          team: Math.floor(teamTarget * progress),
          features: Math.floor(featuresTarget * progress),
          locations: Math.floor(locationsTarget * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters({ team: teamTarget, features: featuresTarget, locations: locationsTarget });
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [startCounting]);

  // Easing function for smooth animation
  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  const stats = [
    {
      number: '30+',
      label: 'Team Members',
      count: counters.team,
      suffix: '+'
    },
    {
      number: '100+',
      label: 'Features',
      count: counters.features,
      suffix: '+'
    },
    {
      number: '30',
      label: 'locations',
      count: counters.locations,
      suffix: ''
    }
  ];

  const founder = {
    name: 'Ronald Richards',
    role: 'Founder',
    image: '/assets/founder.png'
  };

  return (
    <section 
      className="py-12 md:py-16 lg:py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/bg-contact.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* White Overlay with 80% opacity */}
      <div className="absolute inset-0 bg-white" style={{ opacity: 0.8 }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Label with fade-in */}
        <div 
          className={`text-center mb-4 md:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wider uppercase">
            ABOUT US
          </span>
        </div>

        {/* Main Title with zoom-in */}
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#32405B] text-center mb-4 md:mb-6 max-w-4xl mx-auto leading-tight px-4 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          Our vision is to make work inspiring and fulfilling
        </h2>

        {/* Subtitle Description with fade-in */}
        <p 
          className={`text-gray-600 text-center text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed px-4 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          HRLink is a cloud-based HR system designed to simplify and streamline HR processes. Grove HR is a powerful tool that can help SMB businesses manage their HR operations with ease.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* Left Column - Text Content with stagger animation */}
          <div className="space-y-4 md:space-y-6">
            {[
              "HRLink was established in 2009 as a U.S.-based software development & consulting company with development centers in Vietnam.",
              "Besides providing outsourcing services, HRLink has built and successfully launched its own software companies. The most notable companies with millions of users worldwide.",
              "HRLink is reliable, secure, and backed by a team of HR experts with a proven track record of developing high-quality technology solutions.",
              "With the growing size of many startups and SME companies and the increasing complexity of HR regulations and employee expectations, manual HR processes can become time-consuming, error-prone, and difficult to manage. HR management software provides a centralized platform for storing and automating HR processes to offer more free time for HR staff."
            ].map((text, index) => (
              <p 
                key={index}
                className={`text-gray-700 leading-relaxed text-sm sm:text-base transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Right Column - Founder Image with slide and hover effect */}
          <div 
            className={`relative flex items-center justify-center transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-3 md:space-y-4 group">
              <div 
                className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 w-full max-w-[280px] sm:max-w-[332px] mx-auto"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-auto aspect-[332/372] object-cover transform transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/332x372?text=' + founder.name;
                  }}
                />
              </div>
              <div className="text-center transform transition-all duration-500 group-hover:translate-y-1">
                <h3 className="font-bold text-[#32405B] text-lg sm:text-xl transition-colors duration-300 group-hover:text-[#FF6A00]">
                  {founder.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{founder.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section with animated counters */}
        <div 
          ref={statsRef}
          className={`bg-[#3D4A5C] rounded-2xl md:rounded-3xl px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="space-y-1 md:space-y-2 transform transition-all duration-500 hover:scale-110 cursor-pointer"
              >
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white transition-all duration-300 hover:text-[#FF6A00]">
                  {startCounting ? `${stat.count}${stat.suffix}` : '0'}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes countUp {
          from {
            opacity: 0.5;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutVision;
