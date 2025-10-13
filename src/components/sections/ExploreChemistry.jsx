import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ExploreChemistry = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const listRef = useRef(null);

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

  const industries = [
    {
      id: 1,
      title: "Chemical & water treatment",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop", 
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Metal & mining",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=600&h=600&fit=crop",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      title: "Food, feed & pharmaceuticals",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=600&fit=crop",
      bgColor: "bg-pink-50"
    },
    {
      id: 4,
      title: "Construction & infrastructure",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=600&fit=crop",
      bgColor: "bg-purple-50"
    },
    {
      id: 5,
      title: "Oil & gas",
      image: "/assets/construction.png",
      bgColor: "bg-orange-50"
    },
    {
      id: 6,
      title: "Agriculture & fertilizers",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop",
      bgColor: "bg-green-50"
    },
    {
      id: 7,
      title: "Textiles & leather",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      bgColor: "bg-indigo-50"
    },
    {
      id: 8,
      title: "Pulp & paper",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      bgColor: "bg-teal-50"
    },
    {
      id: 9,
      title: "Personal care & cosmetics",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      bgColor: "bg-rose-50"
    }
  ];

  const itemsPerView = 3;
  const totalSlides = industries.length;
  const maxIndex = totalSlides - itemsPerView;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const getCardWidth = () => {
    if (listRef.current) {
      const containerWidth = listRef.current.offsetWidth;
      return (containerWidth / itemsPerView);
    }
    return 0;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`has-staggered-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="ui-product-cards-section__header mb-12">
            <div className="flex items-center justify-between">
              
              {/* Title */}
              <h2 
                className="text-3xl md:text-4xl font-normal transition-all duration-700"
                style={{ 
                  color: '#000',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
                }}
              >
                EXPLORE CHEMISTRY BY INDUSTRY
              </h2>

              {/* Desktop Navigation - Above 1023px */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="m-btn-slider m-btn-slider--prev w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: currentIndex === 0 ? '#BEBEC1' : '#5C5C64'
                  }}
                  aria-label="Previous card"
                >
                  <svg 
                    className="m-btn-slider__icon w-5 h-5" 
                    aria-hidden="true" 
                    focusable="false" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M11.6667 14.7115L6.9552 10L11.6667 5.28857L12.5448 6.1667L8.71145 10L12.5448 13.8334L11.6667 14.7115Z" 
                      fill={currentIndex === 0 ? '#BEBEC1' : '#5C5C64'}
                    />
                  </svg>
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  className="m-btn-slider m-btn-slider--next w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'
                  }}
                  aria-label="Next card"
                >
                  <svg 
                    className="m-btn-slider__icon w-5 h-5" 
                    aria-hidden="true" 
                    focusable="false" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M10.7885 10L6.9552 6.1667L7.83333 5.28857L12.5448 10L7.83333 14.7115L6.9552 13.8334L10.7885 10Z" 
                      fill={currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="ui-grid-card__list-wrapper has-staggered-in">
          <div className="overflow-hidden" ref={listRef}>
            <ul 
              className="ui-grid-card__list is-visible flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                gap: '1rem'
              }}
            >
              {industries.map((industry, index) => (
                <li
                  key={industry.id}
                  className="ui-grid-card__list-item flex-shrink-0"
                  slider-card=""
                  aria-hidden={index < currentIndex || index >= currentIndex + itemsPerView ? "true" : "false"}
                  tabIndex={index < currentIndex || index >= currentIndex + itemsPerView ? "-1" : "0"}
                  style={{
                    width: `calc((100% - ${(itemsPerView - 1)}rem) / ${itemsPerView})`
                  }}
                >
                  <div 
                    className="ui-grid-card ui-grid-card--lg h-full"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                      transition: `all 700ms ease-out ${Math.min(index, 2) * 60}ms`
                    }}
                  >
                    <div className="ui-product-card">
                      <div className="ui-product-card__content">
                        
                        {/* Card Body */}
                        <div className={`ui-product-card__body ${industry.bgColor} p-8 flex flex-col justify-between`} style={{ minHeight: '200px' }}>
                          <h3 className="ui-product-card__title text-[28px] font-[700] text-[#15274B] uppercase leading-tight mb-4">
                            <a 
                              href={industry.href}
                            >
                              {industry.title}
                            </a>
                          </h3>
                          
                          {/* Action Container */}
                          <div className="ui-product-card__action-container">
                            <div className="m-btn-primary-icon" aria-hidden="true">
                              <div className="m-btn-primary-icon__icon-wrapper bg-[#15274B] rounded-full p-2.5 transition-colors duration-300 inline-block group">
                                <svg 
                                  className="m-btn-primary-icon__icon w-4 h-4" 
                                  aria-hidden="true" 
                                  focusable="false" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 16 16" 
                                  fill="none"
                                >
                                  <path 
                                    d="M11.0847 8.5H3V7.5H11.0847L7.28717 3.7025L8 3L13 8L8 13L7.28717 12.2975L11.0847 8.5Z" 
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image Wrapper */}
                        <div className="ui-product-card__img-wrapper img-reveal-rtl__wrapper img-reveal-rtl relative overflow-hidden" style={{ height: '280px' }}>
                          <img 
                            className="ui-product-card__img img-reveal-rtl__img is-loaded w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                            alt={industry.title}
                            src={industry.image}
                            width="421" 
                            height="280"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Footer - Below 1024px */}
        <div className="ui-product-cards-section__footer is-below-1024 lg:hidden flex items-center justify-between mt-8">
          
          {/* Scroll Indicator */}
          <div className="m-slider-scroll-indicator flex-1 mr-4" aria-hidden="true">
            <div className="m-slider-scroll-indicator__track h-1 bg-gray-200 rounded-full relative">
              <div 
                className="m-slider-scroll-indicator__thumb h-full bg-gray-400 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + itemsPerView) / totalSlides) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="m-slider-nav flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="m-btn-slider m-btn-slider--prev w-10 h-10 rounded-full border flex items-center justify-center"
              style={{
                borderColor: currentIndex === 0 ? '#BEBEC1' : '#5C5C64'
              }}
              aria-label="Previous card"
            >
              <svg 
                className="m-btn-slider__icon w-5 h-5" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M11.6667 14.7115L6.9552 10L11.6667 5.28857L12.5448 6.1667L8.71145 10L12.5448 13.8334L11.6667 14.7115Z" 
                  fill={currentIndex === 0 ? '#BEBEC1' : '#5C5C64'}
                />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="m-btn-slider m-btn-slider--next w-10 h-10 rounded-full border flex items-center justify-center"
              style={{
                borderColor: currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'
              }}
              aria-label="Next card"
            >
              <svg 
                className="m-btn-slider__icon w-5 h-5" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M10.7885 10L6.9552 6.1667L7.83333 5.28857L12.5448 10L7.83333 14.7115L6.9552 13.8334L10.7885 10Z" 
                  fill={currentIndex === maxIndex ? '#BEBEC1' : '#5C5C64'}
                />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExploreChemistry;