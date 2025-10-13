// src/components/sections/ContactSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Main Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/bg-contact.jpg')`
        }}
      >
      </div>

      {/* Hexagonal Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-white"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="flex items-center justify-center min-h-screen">
          {/* Contact Card */}
          <div
            className={`relative bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 transform max-w-6xl w-full ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ minHeight: '800px' }}
          >
            {/* Card Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/assets/fac.jpg')`
              }}
            >
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-8 md:p-70 text-center flex flex-col justify-center">
              {/* Subtitle */}
              <div 
                className="text-sm md:text-[20px] font-[500] text-white opacity-90"
                style={{ 
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' 
                }}
              >
                Products That Perform
              </div>

              {/* Main Heading */}
              <h1 
                className="text-4xl md:text-5xl lg:text-[42px] font-[700] text-white leading-tight mb-1"
                style={{ 
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' 
                }}
              >
                People Who Care.
              </h1>

              {/* Description */}
              <p 
                className="text-base md:text-lg text-white opacity-90 mb-5 max-w-2xl font-[700]"
                style={{ 
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' 
                }}
              >
                Our solutions are essential, so they're designed<br/> to the highest standards.
              </p>

              {/* Contact Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 px-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 group text-base md:text-[20px] mx-auto shadow-lg">
                <span>Contact Us</span>
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Decorative Hexagon Elements*/}
            <div className="absolute top-6 right-6 opacity-20">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 border border-white"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-6 left-6 opacity-20">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 border border-white"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
