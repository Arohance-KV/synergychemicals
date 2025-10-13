// src/components/sections/OurMission.jsx
import React from 'react';

const OurMission = () => {
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
        <div className="relative flex justify-center">
          
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
                  Our mission is to deliver high-quality chemical solutions that empower industries, ensure sustainability, and create value for our customers, employees, and communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to prevent content overlap - Increased for lower card position */}
        <div className="h-40 sm:h-48 md:h-56 lg:h-44"></div>
      </div>
    </section>
  );
};

export default OurMission;
