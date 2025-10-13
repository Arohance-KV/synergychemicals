// src/components/sections/OurMission.jsx
import React from 'react';

const OurMission = () => {
  return (
    <section 
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Container with Team Image and Overlay Box */}
        <div className="relative flex justify-center">
          
          <div className="relative">
            {/* Team Photo - Fixed Resolution 1270x557 */}
            <img
              src="/assets/team-photo.png"
              alt="Our Mission Team"
              className="object-cover rounded-t-lg"
              style={{ width: '1270px', height: '557px' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1270&h=557&fit=crop';
              }}
            />
            
            {/* Overlay Card - Fixed Resolution 944x275 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
              <div 
                className="bg-[#4A5A6A] rounded-lg shadow-2xl flex flex-col items-center justify-center"
                style={{ width: '944px', height: '275px' }}
              >
                <h2 className="text-5xl font-bold text-white text-center mb-4">
                  Our mission
                </h2>
                <p className="text-[#FF6A00] text-lg text-center leading-relaxed px-12">
                  Our mission is to deliver high-quality chemical solutions that empower industries, ensure sustainability, and create value for our customers, employees, and communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to prevent content overlap */}
        <div style={{ height: '180px' }}></div>
      </div>
    </section>
  );
};

export default OurMission;
