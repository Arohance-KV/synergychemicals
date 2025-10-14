// src/components/Footer.jsx
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaLinkedin, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  const [email, setEmail] = useState('');

  // Dynamic theme configuration
  const theme = isHomePage
    ? {
        bg: 'bg-white',
        text: 'text-gray-900',
        secondaryText: 'text-gray-600',
        headingColor: 'text-[#101E8E]',
        buttonBg: 'bg-[#101E8E]',
        buttonHover: 'hover:bg-[#0D1770]',
        inputBg: 'bg-gray-100',
        inputBorder: 'border-gray-300',
        divider: 'border-gray-300',
      }
    : {
        bg: 'bg-[#32405B]',
        text: 'text-white',
        secondaryText: 'text-gray-300',
        headingColor: 'text-[#FF6A00]',
        buttonBg: 'bg-[#FF6A00]',
        buttonHover: 'hover:bg-[#E55F00]',
        inputBg: 'bg-[#3D4E6B]',
        inputBorder: 'border-[#4A5D7A]',
        divider: 'border-[#4A5D7A]',
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  // Scroll to top and navigate
  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <footer className={`${theme.bg} ${theme.text} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${theme.headingColor}`}>
              SYNERGY CHEMICAL
            </h3>
            <p className={`${theme.secondaryText} text-sm leading-relaxed`}>
              Providing high-quality raw materials and specialty solutions that strengthen manufacturing, agriculture, pharmaceuticals, and more
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme.secondaryText} hover:text-green-600 transition-colors`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme.secondaryText} hover:text-blue-600 transition-colors`}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme.secondaryText} hover:text-red-600 transition-colors`}
                aria-label="Google"
              >
                <FaGoogle className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${theme.secondaryText} hover:text-gray-600 transition-colors`}
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className={`text-base font-semibold ${theme.headingColor}`}>
              SERVICES
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#sales-marketing" 
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors`}
                >
                  Sales & Marketing
                </a>
              </li>
              <li>
                <a 
                  href="#logistics" 
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors`}
                >
                  Logistics
                </a>
              </li>
              <li>
                <a 
                  href="#sourcing" 
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors`}
                >
                  Sourcing
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/products')}
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors text-left`}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/about')}
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors text-left`}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/press-release')}
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors text-left`}
                >
                  Blogs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className={`text-base font-semibold ${theme.headingColor}`}>
              CONTACT US
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className={`h-4 w-4 ${theme.secondaryText}`} />
                <a 
                  href="tel:+919923131311" 
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors`}
                >
                  +91 9923131311
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className={`h-4 w-4 ${theme.secondaryText}`} />
                <a 
                  href="mailto:info@synergy.com" 
                  className={`${theme.secondaryText} hover:${theme.headingColor} transition-colors`}
                >
                  info@synergy.com
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="space-y-4">
            <h4 className={`text-base font-semibold ${theme.headingColor}`}>
              INQUIRY
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-md ${theme.inputBg} border ${theme.inputBorder} ${theme.text} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all`}
                style={{
                  focusRingColor: isHomePage ? '#101E8E' : '#FF6A00'
                }}
                required
              />
              <button
                type="submit"
                className={`w-full ${theme.buttonBg} ${theme.buttonHover} text-white font-medium py-2.5 rounded-md transition-all duration-300 hover:shadow-lg`}
              >
                Send Mail
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${theme.divider} mt-8 pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${theme.secondaryText} text-sm`}>
            All rights Reserved
          </p>
          <p className={`${theme.secondaryText} text-sm mt-2 md:mt-0`}>
            Synergy Chemicals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
