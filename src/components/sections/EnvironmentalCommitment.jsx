// src/components/sections/EnvironmentalCommitment.jsx
import React, { useState, useEffect } from 'react';

const EnvironmentalCommitment = () => {
  const [activeTab, setActiveTab] = useState('environmental');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 'environmental', label: 'Environmental' },
    { id: 'product', label: 'Product portfolio' },
    { id: 'governance', label: 'Governance' }
  ];

  const tabContent = {
    environmental: {
      title: 'Environmental',
      description: 'Recognising the impact of our actions on the environment, we are investing in the development of chemical products designed to strike a balance between creating financial value and environmental sustainability.',
      description2: 'We acknowledge the pressing need for decarbonisation and remain committed to reducing our carbon footprint, while implementing several initiatives to achieve this goal.',
      stats: [
        {
          number: '3,330',
          unit: 'MT',
          description: 'Estimated carbon dioxide equivalent (CO2 e) emissions reduction per year.'
        },
        {
          number: '2',
          unit: 'MW capacity',
          description: 'Installation of solar panels in Mithapur are nearing completion.'
        }
      ]
    },
    product: {
      title: 'Product portfolio',
      description: 'Our diverse product portfolio serves multiple industries with innovative chemical solutions designed for sustainability and performance.',
      description2: 'We continuously invest in research and development to create products that meet the evolving needs of our customers while maintaining environmental responsibility.',
      stats: [
        {
          number: '500+',
          unit: 'Products',
          description: 'Comprehensive range of chemical products serving diverse industries.'
        },
        {
          number: '25+',
          unit: 'Industries',
          description: 'Serving sectors including steel, pharmaceuticals, agriculture, and food.'
        }
      ]
    },
    governance: {
      title: 'Governance',
      description: 'We maintain the highest standards of corporate governance, ensuring transparency, accountability, and ethical business practices across all operations.',
      description2: 'Our governance framework is built on strong ethical foundations, ensuring compliance with all regulatory requirements and industry best practices.',
      stats: [
        {
          number: '100%',
          unit: 'Compliance',
          description: 'Full adherence to regulatory standards and industry guidelines.'
        },
        {
          number: '15+',
          unit: 'Years',
          description: 'Decades of maintaining excellence in corporate governance practices.'
        }
      ]
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with fade-in animation */}
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#32405B] mb-6 md:mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          Our commitment to people & planet
        </h2>

        {/* Hero Image with scale-in animation - Responsive */}
        <div 
          className={`mb-6 md:mb-8 flex justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/assets/commitment-hero.jpg"
            alt="Commitment to people and planet"
            className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ 
              maxWidth: '1306px',
              aspectRatio: '1306/475'
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1306&h=475&fit=crop';
            }}
          />
        </div>

        {/* Tabs - Mobile: Stacked with dropdown style, Desktop: Horizontal */}
        <div 
          className={`flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-300 mb-8 md:mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          {/* Tabs Container */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-4 sm:gap-6 md:gap-8 mb-4 md:mb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 md:pb-4 px-2 font-medium text-sm sm:text-base relative transition-all duration-300 text-left md:text-center ${
                  activeTab === tab.id
                    ? 'text-[#32405B] scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:scale-105'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00] animate-expand"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enquire Button - Hidden on mobile, visible on tablet+ */}
          <button className="hidden md:block px-6 py-3 border-2 border-gray-900 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300 transform flex-shrink-0">
            Enquire
          </button>
        </div>

        {/* Tab Content with fade animation */}
        <div 
          key={activeTab}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 animate-fadeIn"
        >
          
          {/* Left Column - Text Content with stagger animation */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#32405B] mb-4 md:mb-6 animate-slideInLeft">
              {currentContent.title}
            </h3>
            
            {currentContent.description && (
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 md:mb-6 animate-slideInLeft animation-delay-100">
                {currentContent.description}
              </p>
            )}

            {currentContent.description2 && (
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 md:mb-8 animate-slideInLeft animation-delay-200">
                {currentContent.description2}
              </p>
            )}

            {/* Enquire Button - Mobile version */}
            <button className="w-full sm:w-auto px-6 py-3 border-2 border-gray-900 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 transition-all duration-300 transform animate-slideInLeft animation-delay-300">
              Enquire
            </button>
          </div>

          {/* Right Column - Stats with slide-in animation */}
          {currentContent.stats.length > 0 && (
            <div className="mt-8 lg:mt-0">
              {currentContent.stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`${index > 0 ? 'pt-8 md:pt-10' : ''} animate-slideInRight`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Horizontal Line Above Each Stat (except first) */}
                  {index > 0 && (
                    <div className="border-t border-gray-300 mb-8 md:mb-10 animate-expandWidth"></div>
                  )}
                  
                  <div className="hover:translate-x-2 transition-transform duration-300">
                    <h4 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3D4A5C] mb-2 md:mb-3 hover:text-[#FF6A00] transition-colors duration-300">
                      {stat.number} <span className="text-xl sm:text-2xl md:text-3xl font-normal text-gray-600">{stat.unit}</span>
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-expand {
          animation: expand 0.3s ease-out;
        }

        .animate-expandWidth {
          animation: expandWidth 0.5s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

export default EnvironmentalCommitment;
