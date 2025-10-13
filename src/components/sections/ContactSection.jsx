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

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Main Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/bg-contact.jpg')`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
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
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] lg:min-h-screen">
          {/* Contact Card */}
          <div
            className={`relative bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 transform max-w-6xl w-full ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ minHeight: 'auto' }}
          >
            {/* Card Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/assets/fac.jpg')`
              }}
            >
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 text-center flex flex-col justify-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
              
              {/* Subtitle */}
              <div 
                className={`text-base sm:text-lg md:text-xl lg:text-[20px] font-medium text-white mb-3 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7)' 
                }}
              >
                Products That Perform
              </div>

              {/* Main Heading */}
              <h1 
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[60px] font-bold text-white leading-tight mb-4 md:mb-6 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  textShadow: '3px 3px 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.8)' 
                }}
              >
                People Who Care.
              </h1>

              {/* Description */}
              <p 
                className={`text-sm sm:text-base md:text-lg lg:text-xl text-white mb-8 md:mb-10 max-w-2xl mx-auto font-semibold px-4 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7)',
                  lineHeight: '1.6'
                }}
              >
                Our solutions are essential, so they're designed<br className="hidden sm:block" /> to the highest standards.
              </p>

              {/* Contact Button */}
              <div 
                className={`transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 sm:py-3.5 sm:px-8 md:py-4 md:px-10 rounded-full font-bold transition-all duration-300 flex items-center gap-2 sm:gap-3 group text-base sm:text-lg md:text-xl mx-auto shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
                  <span>Contact Us</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Decorative Hexagon Elements - Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block absolute top-4 md:top-6 right-4 md:right-6 opacity-20">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 md:w-6 md:h-6 border border-white"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:block absolute bottom-4 md:bottom-6 left-4 md:left-6 opacity-20">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 md:w-4 md:h-4 border border-white"
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
