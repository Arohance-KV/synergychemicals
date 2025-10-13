// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import useScrollPosition from '../../hooks/useScrollPosition';
import { FaWhatsapp, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo Section */}
          <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
            <img 
              src={(isHomePage && !isScrolled) ? "/assets/logo-light.png" : "/assets/logo-dark.png"} 
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
            <Link 
              to="/products" 
              onClick={handleLinkClick}
              className={`font-medium transition-colors duration-300 hover:text-orange-400 ${
                isActive('/products')
                  ? 'text-orange-500 font-semibold'
                  : getTextColor()
              }`}
            >
              PRODUCT LIST
            </Link>
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
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                (isHomePage && !isScrolled) 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Logo */}
              <div className="pb-4 border-b">
                <Link to="/" onClick={handleLinkClick}>
                  <img 
                    src="/assets/logo-dark.png" 
                    alt="Synergy Chemicals Logo" 
                    className="h-8 w-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x40?text=SYNERGY';
                    }}
                  />
                </Link>
              </div>
              
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className={`block font-medium hover:text-orange-400 transition-colors ${
                  isActive('/') || isActive('/home') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                }`}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                onClick={handleLinkClick}
                className={`block font-medium hover:text-orange-400 transition-colors ${
                  isActive('/about') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                }`}
              >
                ABOUT US
              </Link>
              <Link 
                to="/products" 
                onClick={handleLinkClick}
                className={`block font-medium hover:text-orange-400 transition-colors ${
                  isActive('/products') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                }`}
              >
                PRODUCT LIST
              </Link>
              <Link 
                to="/careers" 
                onClick={handleLinkClick}
                className={`block font-medium hover:text-orange-400 transition-colors ${
                  isActive('/careers') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                }`}
              >
                CAREERS
              </Link>
              <Link 
                to="/contact" 
                onClick={handleLinkClick}
                className={`block font-medium hover:text-orange-400 transition-colors ${
                  isActive('/contact') ? 'text-orange-500 font-semibold' : 'text-gray-800'
                }`}
              >
                CONTACT
              </Link>
              
              {/* Mobile Social Icons */}
              <div className="flex space-x-4 pt-4 border-t">
                <a 
                  href="https://wa.me/919923131311" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 cursor-pointer hover:text-green-500 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/synergy-chemicals" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:info@synergy.com"
                  className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors"
                >
                  <FaGoogle className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/synergy_chemicals" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 cursor-pointer hover:text-black transition-colors"
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
