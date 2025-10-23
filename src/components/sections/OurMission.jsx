// src/components/sections/OurMission.jsx
import React, { useState, useEffect, useRef } from 'react';

const OurMission = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  const strengths = [
    'We provide support for vendor qualification documentation, both from the vendor and manufacturer sides.',
    'We assist with virtual and physical audits at the manufacturer\'s plant.',
    'We ensure timely supply and delivery.',
    'We provide end-to-end support in the event of client rejections, working closely with the manufacturer to address issues and guide the next steps.'
  ];

  const coreValues = [
    'Integrity in every transaction',
    'Partnership through synergy',
    'We constantly seek to improve our processes, services, and knowledge to exceed industry standards and client expectations',
    'We build long-term partnerships with manufacturers and clients based on mutual trust and shared goals',
    'Our clients are at the center of everything we do. We strive to understand their needs and deliver tailored solutions with efficiency and reliability.'
  ];

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
        
        {/* Container with Team Image and Overlay Box */}
        <div className="relative flex justify-center mb-12 md:mb-16">
          
          <div className="relative w-full max-w-[1270px]">
            {/* Team Photo - Responsive */}
            <div className="w-full relative overflow-hidden rounded-t-lg md:rounded-t-xl">
              <img
                src="/assets/team-photo.png"
                alt="Our Mission Team"
                className="w-full h-auto object-cover"
                style={{ 
                  aspectRatio: '1270/557',
                  maxHeight: '557px'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1270&h=557&fit=crop';
                }}
              />
            </div>
            
            {/* Overlay Card - Positioned Lower with translate-y-3/4 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4 md:translate-y-2/3 lg:translate-y-1/2 z-20 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[944px] max-w-[944px]">
              <div 
                className="bg-[#4A5A6A] rounded-lg md:rounded-xl shadow-2xl flex flex-col items-center justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3 md:mb-4">
                  Our mission
                </h2>
                <p className="text-[#FF6A00] text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed">
                  Our mission is to provide reliable chemical products and services through teamwork, innovation, and a commitment to quality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to prevent content overlap */}
        <div className="h-40 sm:h-48 md:h-56 lg:h-44"></div>

        {/* Our Strengths and Core Values Section */}
        <div ref={contentRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - Our Strengths */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#32405B] mb-6">
                Our Strengths
              </h3>
              <div className="space-y-4">
                {strengths.map((strength, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Bullet Point */}
                    <div className="flex-shrink-0 w-2 h-2 bg-[#FF6A00] rounded-full mt-2"></div>
                    
                    {/* Content */}
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Core Values */}
            <div 
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#32405B] mb-6">
                Core Values
              </h3>
              <div className="space-y-4">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    {/* Bullet Point */}
                    <div className="flex-shrink-0 w-2 h-2 bg-[#FF6A00] rounded-full mt-2"></div>
                    
                    {/* Content */}
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default OurMission;
