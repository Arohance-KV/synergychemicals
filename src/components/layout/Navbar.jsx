// src/components/layout/Navbar.jsx (UPDATED: Use Redux for modal state)
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, Search } from 'lucide-react';
import useScrollPosition from '../../hooks/useScrollPosition';
import { FaWhatsapp, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import OtpModal from '../modals/OtpModal';
import { setModalOpen, selectIsModalOpen } from '../../redux/otpSlice';  // NEW: Use Redux modal

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();
  const navigate = useNavigate();
  const isOtpModalOpen = useSelector(selectIsModalOpen);  // NEW: From Redux

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close mobile menu and scroll to top when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to check if OTP is already verified
  const isOtpVerified = () => {
    return sessionStorage.getItem('otpVerified') === 'true';
  };

  // Helper to set OTP verified flag
  const setOtpVerified = () => {
    sessionStorage.setItem('otpVerified', 'true');
  };

  // Handle Products click - UPDATED: Use Redux dispatch
  const handleProductsClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (isOtpVerified()) {
      console.log('OTP already verified, navigating directly to products');
      navigate('/products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      dispatch(setModalOpen(true));  // Open via Redux
    }
  };

  // Handle OTP Success - Navigate to Products + Set Flag
  const handleOtpSuccess = () => {
    setOtpVerified();
    dispatch(setModalOpen(false));  // Close via Redux
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine navbar background
  const navBg = isHomePage 
    ? (isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent')
    : 'bg-white/95 backdrop-blur-md shadow-lg';

  // Determine text color
  const getTextColor = () => {
    if (isHomePage) {
      return isScrolled ? 'text-gray-800' : 'text-white';
    }
    return 'text-gray-800';
  };

  // Determine icon color
  const getIconColor = () => {
    if (isHomePage) {
      return isScrolled ? 'text-gray-600' : 'text-white';
    }
    return 'text-gray-600';
  };

  return (
    <>
      {/* OTP Modal - UPDATED: Use Redux state */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => dispatch(setModalOpen(false))}
        onSuccess={handleOtpSuccess}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo Section */}
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0 relative z-[60]">
              <img 
                src={(isHomePage && !isScrolled && !isMenuOpen) ? "/assets/logo-light.png" : "/assets/logo-dark.png"} 
                alt="Synergy Chemicals Logo" 
                className="h-10 w-auto transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x40?text=SYNERGY';
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                  isActive('/') || isActive('/home')
                    ? 'text-orange-500 font-semibold'
                    : getTextColor()
                }`}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                onClick={handleLinkClick}
                className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                  isActive('/about')
                    ? 'text-orange-500 font-semibold'
                    : getTextColor()
                }`}
              >
                ABOUT US
              </Link>
              <button 
                onClick={handleProductsClick}
                className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                  isActive('/products')
                    ? 'text-orange-500 font-semibold'
                    : getTextColor()
                }`}
              >
                PRODUCT LIST
              </button>
              <Link 
                to="/careers" 
                onClick={handleLinkClick}
                className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                  isActive('/careers')
                    ? 'text-orange-500 font-semibold'
                    : getTextColor()
                }`}
              >
                CAREERS
              </Link>
              <Link 
                to="/contact" 
                onClick={handleLinkClick}
                className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                  isActive('/contact')
                    ? 'text-orange-500 font-semibold'
                    : getTextColor()
                }`}
              >
                CONTACT
              </Link>
            </div>

            {/* Social Icons & Search */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/919923131311" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`cursor-pointer transition-colors hover:text-green-500 ${getIconColor()}`}
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/synergy-chemicals" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`cursor-pointer transition-colors hover:text-blue-600 ${getIconColor()}`}
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              
              {/* Gmail */}
              <a 
                href="mailto:info@synergy.com"
                className={`cursor-pointer transition-colors hover:text-red-500 ${getIconColor()}`}
              >
                <FaGoogle className="h-5 w-5" />
              </a>
              
              {/* Twitter/X */}
              <a 
                href="https://twitter.com/synergy_chemicals" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`cursor-pointer transition-colors hover:text-black ${getIconColor()}`}
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              
              {/* Search */}
              <button className="bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden relative z-[60]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  isMenuOpen
                    ? 'text-gray-800 hover:bg-gray-100'
                    : (isHomePage && !isScrolled) 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="px-6 py-20 space-y-6">
              {/* Mobile Logo */}
              <div className="pb-6 border-b border-gray-200">
                <Link to="/" onClick={handleLinkClick}>
                  <img 
                    src="/assets/logo-dark.png" 
                    alt="Synergy Chemicals Logo" 
                    className="h-10 w-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x40?text=SYNERGY';
                    }}
                  />
                </Link>
              </div>
              
              {/* Navigation Links */}
              <div className="space-y-4">
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className={`block text-lg font-medium hover:text-orange-400 transition-colors py-2 ${
                    isActive('/') || isActive('/home') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                  }`}
                >
                  HOME
                </Link>
                <Link 
                  to="/about" 
                  onClick={handleLinkClick}
                  className={`block text-lg font-medium hover:text-orange-400 transition-colors py-2 ${
                    isActive('/about') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                  }`}
                >
                  ABOUT US
                </Link>
                <button 
                  onClick={handleProductsClick}
                  className={`block text-lg font-medium hover:text-orange-400 transition-colors py-2 text-left w-full ${
                    isActive('/products') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                  }`}
                >
                  PRODUCT LIST
                </button>
                <Link 
                  to="/careers" 
                  onClick={handleLinkClick}
                  className={`block text-lg font-medium hover:text-orange-400 transition-colors py-2 ${
                    isActive('/careers') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                  }`}
                >
                  CAREERS
                </Link>
                <Link 
                  to="/contact" 
                  onClick={handleLinkClick}
                  className={`block text-lg font-medium hover:text-orange-400 transition-colors py-2 ${
                    isActive('/contact') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                  }`}
                >
                  CONTACT
                </Link>
              </div>
              
              {/* Mobile Social Icons */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-600 mb-4">CONNECT WITH US</p>
                <div className="flex space-x-6">
                  <a 
                    href="https://wa.me/919923131311" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 cursor-pointer hover:text-green-500 transition-colors"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/synergy-chemicals" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                  <a 
                    href="mailto:info@synergy.com"
                    className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors"
                  >
                    <FaGoogle className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com/synergy_chemicals" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 cursor-pointer hover:text-black transition-colors"
                  >
                    <FaXTwitter className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Search Button */}
              <div className="pt-4">
                <button className="w-full bg-orange-500 text-white py-3 rounded-full font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;