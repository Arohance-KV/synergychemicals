// src/components/sections/ProductSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllProducts, selectAllProducts, selectProductLoading, selectProductError } from '../../redux/productSlice';
import { setModalOpen } from '../../redux/otpSlice';  // NEW: Import for modal dispatch

const ProductSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [useFallback, setUseFallback] = useState(false);  // NEW: Fallback flag
  const sectionRef = useRef(null);

  // Redux state for products
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);  // NEW: Error selector

  useEffect(() => {
    // Fetch products on mount
    dispatch(fetchAllProducts()).then((result) => {
      if (result.error || (result.payload && result.payload.length === 0)) {
        console.warn('Products fetch failed or empty—using fallback data');
        setUseFallback(true);
      }
    });
  }, [dispatch]);

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

  // Fallback sample data (from your original code)
  const fallbackProducts = [
    {
      id: 1,
      name: "PRODUCT NAME",
      code: "#52612",
      description: "CONTINUED THE DEVELOPMENT AND SCALE-UP OF BIO-BASED SURFACTANT MANUFACTURING TECHNOLOGY AND ACHIEVED THE SOLVENT-FREE PROCESS. THIS PROCESS DOES NOT GENERATE ANY SOLID WASTE AND EFFLUENT.",
      mainImage: { url: "/assets/product-1.png" }  // UPDATED: Match API structure
    },
    {
      id: 2,
      name: "ADVANCED FORMULA",
      code: "#52613",
      description: "INNOVATIVE CHEMICAL SOLUTIONS DESIGNED FOR MAXIMUM EFFICIENCY AND ENVIRONMENTAL SUSTAINABILITY. ZERO WASTE PRODUCTION WITH ADVANCED BIOTECHNOLOGY INTEGRATION.",
      mainImage: { url: "/assets/product-2.png" }
    },
    {
      id: 3,
      name: "BIO SURFACTANT",
      code: "#52614",
      description: "NEXT-GENERATION BIOLOGICAL SURFACTANTS WITH SUPERIOR PERFORMANCE CHARACTERISTICS. ENVIRONMENTALLY FRIENDLY PRODUCTION PROCESS WITH NO HARMFUL BYPRODUCTS.",
      mainImage: { url: "/assets/product-3.png" }
    }
  ];

  // Use fallback if error, empty, or flag set; otherwise, limit to top 3 products
  const displayProducts = useFallback || error || !products || products.length === 0 
    ? fallbackProducts 
    : products.slice(0, 3);

  // Helper to check if OTP is verified
  const isOtpVerified = () => {
    return sessionStorage.getItem('otpVerified') === 'true';
  };

  // Handle Explore More click - similar to Navbar (UPDATED: Dispatch modal open)
  const handleExploreMore = (e) => {
    e.preventDefault();
    
    if (isOtpVerified()) {
      // Skip modal, go directly to products
      console.log('OTP already verified, navigating directly to products');
      navigate('/products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Open modal for verification via Redux
      dispatch(setModalOpen(true));
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(displayProducts.length, 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(displayProducts.length, 1)) % Math.max(displayProducts.length, 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Loading skeleton
  if (loading && !useFallback) {
    return (
      <section ref={sectionRef} id="products" className="relative overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200 animate-pulse"></div>
        <div className="bg-slate-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-600 rounded-full w-32"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = displayProducts[currentSlide % displayProducts.length];

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative overflow-hidden"
    >
      {/* Top Half - Heading Centered */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 bg-slate-800 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Our Products
        </h1>
      </div>

      {/* Bottom Half - Dark Product Details */}
      <div className="bg-slate-800 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          {/* Error Banner if applicable (NEW) */}
          {error && (
            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-100 text-sm rounded-lg">
              Unable to load full catalog—showing highlights. Please try again later.
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
            {/* Product Content */}
            <div className="flex-1 lg:max-w-3xl">
              <div className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                {/* Product Title and Code - UPDATED: Use productCode */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white flex flex-row items-baseline gap-2 sm:gap-6">
                    <span>{currentProduct.name || 'PRODUCT NAME'}</span>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-400">
                      {currentProduct.productCode || currentProduct.code || '#52612'}
                    </span>
                  </h2>
                </div>

                {/* Explore More Button */}
                <button
                  onClick={handleExploreMore}
                  className="w-full sm:w-auto bg-white text-slate-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base tracking-wide"
                >
                  EXPLORE MORE
                </button>
              </div>
            </div>

            {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex items-center space-x-3 lg:ml-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 group border border-white border-opacity-20"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-gray-700" />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 group border border-white border-opacity-30"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-gray-700" />
              </button>
            </div>
          </div>

          {/* Slide Indicators and Mobile Navigation */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Slide Indicators */}
            <div className="flex justify-start space-x-2">
              {displayProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 border border-white border-opacity-20"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white bg-opacity-30 hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 border border-white border-opacity-30"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;