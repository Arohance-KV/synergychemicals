// src/components/sections/Products.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Sample products data with corrected image paths
  const products = [
    {
      id: 1,
      name: "PRODUCT NAME",
      code: "#52612",
      description: "CONTINUED THE DEVELOPMENT AND SCALE-UP OF BIO-BASED SURFACTANT MANUFACTURING TECHNOLOGY AND ACHIEVED THE SOLVENT-FREE PROCESS. THIS PROCESS DOES NOT GENERATE ANY SOLID WASTE AND EFFLUENT.",
      image: "/assets/product-1.png" // Corrected to .png
    },
    {
      id: 2,
      name: "ADVANCED FORMULA",
      code: "#52613",
      description: "INNOVATIVE CHEMICAL SOLUTIONS DESIGNED FOR MAXIMUM EFFICIENCY AND ENVIRONMENTAL SUSTAINABILITY. ZERO WASTE PRODUCTION WITH ADVANCED BIOTECHNOLOGY INTEGRATION.",
      image: "/assets/product-2.png" // Corrected to .png
    },
    {
      id: 3,
      name: "BIO SURFACTANT",
      code: "#52614",
      description: "NEXT-GENERATION BIOLOGICAL SURFACTANTS WITH SUPERIOR PERFORMANCE CHARACTERISTICS. ENVIRONMENTALLY FRIENDLY PRODUCTION PROCESS WITH NO HARMFUL BYPRODUCTS.",
      image: "/assets/product-3.png" // Corrected to .png
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative overflow-hidden"
    >
      {/* Top Half - Product Image */}
      <div className="relative h-96">
        {/* Product Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url('${products[currentSlide].image}')`
          }}
        >
        </div>
      </div>

      {/* Bottom Half - Dark Product Details */}
      <div className="bg-slate-800 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            {/* Product Content */}
            <div className="flex-1 max-w-3xl">
              <div className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                {/* Product Title and Code */}
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {products[currentSlide].name}
                    <span className="ml-6 text-3xl md:text-4xl font-normal text-gray-400">
                      {products[currentSlide].code}
                    </span>
                  </h2>
                </div>

                {/* Product Description */}
                <div className="mb-10">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                    {products[currentSlide].description}
                  </p>
                </div>

                {/* Explore More Button */}
                <button className="bg-white text-slate-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base tracking-wide">
                  EXPLORE MORE
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3 ml-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 group border border-white border-opacity-20"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 group border border-white border-opacity-30"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-start mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
