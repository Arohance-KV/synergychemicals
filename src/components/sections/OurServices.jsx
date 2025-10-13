// src/components/sections/OurServices.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OurServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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

  const services = [
    {
      id: 1,
      title: "Sales & Marketing",
      icon: "/assets/sales.png",
      route: "sales-marketing"
    },
    {
      id: 2,
      title: "Transportation",
      icon: "/assets/truck.png",
      route: "transportation"
    },
    {
      id: 3,
      title: "Quality Testing",
      icon: "/assets/test.png",
      route: "quality-testing"
    },
    {
      id: 4,
      title: "Cargo Services",
      icon: "/assets/cargo.png",
      route: "cargo-services"
    }
  ];

  const handleServiceClick = (route) => {
    navigate(`/services/${route}`);
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Chemical Pattern Image */}
      <div 
        className="absolute inset-0 bg-cover bg-left bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/assets/left-chemical-background.png')`
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-teal-300"
            style={{
              width: '40px',
              height: '40px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#244D4D' }}
          >
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.route)}
              className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } hover:-translate-y-2`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                minHeight: '280px',
                aspectRatio: '4/5'
              }}
            >
              {/* Main Card Background - All Slate by Default, Orange on Hover */}
              <div className="bg-slate-700 group-hover:bg-orange-500 h-full relative overflow-hidden transition-all duration-500 rounded-3xl">
                
                {/* Background Pattern Images */}
                {/* Default: Circle Pattern */}
                <div 
                  className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-500 bg-no-repeat opacity-60"
                  style={{
                    backgroundImage: "url('/assets/circle.png')",
                    backgroundSize: '60%',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Hover: Hexagon Pattern */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-no-repeat"
                  style={{
                    backgroundImage: "url('/assets/hexa.png')",
                    backgroundSize: '60%',
                    backgroundPosition: 'center'
                  }}
                />

                {/* Content Area */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Bottom Section with Title and Icon */}
                  <div className="flex items-center justify-between">
                    {/* Service Title */}
                    <div className="bg-orange-500 group-hover:bg-slate-600 px-4 py-3 rounded-xl transition-all duration-300 flex-1 mr-4">
                      <h3 className="text-white font-semibold text-sm">
                        {service.title}
                      </h3>
                    </div>

                    {/* Service Icon */}
                    <div className="bg-slate-600 group-hover:bg-orange-600 p-4 rounded-full shadow-lg transition-all duration-300 flex-shrink-0">
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-7 h-7 brightness-0 invert transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtle hover scale */}
                <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
