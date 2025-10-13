import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            SUCCESS IS A JOURNEY,{' '}
            <br />
            <span className="text-white">NOT A DESTINATION</span>
          </h1>

          {/* CTA Button */}
          <button className="group inline-flex items-center bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span className="mr-2">WHAT'S NEW</span>
            <div className="bg-gray-800 text-white p-2 rounded-full group-hover:bg-gray-700 transition-colors">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
