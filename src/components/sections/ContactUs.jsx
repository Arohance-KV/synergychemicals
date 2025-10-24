// src/components/sections/ContactUs.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { createContact, clearError, clearSuccess } from '../../redux/contactSlice'; // Adjust path

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  });

  const [focusedInput, setFocusedInput] = useState(null);

  // Clear success message after 5 seconds and reset form
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          message: ''
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // Clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch the createContact action
    await dispatch(createContact(formData));
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background decoration with chemical structure pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMid slice">
          <circle cx="50" cy="50" r="5" fill="#CBD5E1" />
          <circle cx="100" cy="50" r="5" fill="#CBD5E1" />
          <circle cx="75" cy="90" r="5" fill="#CBD5E1" />
          <line x1="50" y1="50" x2="75" y2="90" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="100" y1="50" x2="75" y2="90" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-border {
          0%, 100% { border-color: #1f2937; }
          50% { border-color: #3b82f6; }
        }

        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .image-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-hover:hover {
          transform: scale(1.05) rotate(1deg);
        }

        .image-hover:hover img {
          transform: scale(1.1);
        }

        .input-wrapper {
          position: relative;
          overflow: hidden;
        }

        .input-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.4s ease;
        }

        .input-wrapper.focused::after {
          width: 100%;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        .decorative-corner {
          transition: all 0.3s ease;
        }

        .image-container:hover .decorative-corner {
          transform: scale(1.2);
          opacity: 0.4;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-45 items-start">
          
          {/* LEFT SIDE - Image */}
          <div className="relative image-container group">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl image-hover">
              <img 
                src="/assets/conimg.jpg" 
                alt="Laboratory"
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1200&fit=crop';
                }}
              />
              {/* Gradient Overlay with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-500"></div>
            </div>

            {/* Decorative corner elements with hover animation */}
            <div className="decorative-corner absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-500 opacity-20"></div>
            <div className="decorative-corner absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-orange-500 opacity-20"></div>
          </div>

          {/* RIGHT SIDE - Contact Form & Info */}
          <div className="space-y-12">
            
            {/* Heading with animation */}
            <div className="animate-scale-in">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-12 hover:text-gray-700 transition-colors duration-300">
                Contact Us
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-18">
              
              {/* Form Column */}
              <div className="space-y-8">
                
                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-green-800 font-semibold text-sm">Success!</h3>
                        <p className="text-green-700 text-xs mt-1">Your message has been sent successfully. We'll get back to you soon!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-red-800 font-semibold text-sm">Error</h3>
                        <p className="text-red-700 text-xs mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Full Name Input */}
                  <div 
                    className={`input-wrapper ${focusedInput === 'name' ? 'focused' : ''}`}
                  >
                    <label className="block text-sm text-gray-700 mb-2 transition-colors duration-300 hover:text-blue-600">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      disabled={loading}
                      className="w-full px-0 py-2 text-gray-900 bg-transparent border-b border-gray-900 focus:outline-none transition-all duration-300 disabled:opacity-50"
                      required
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div 
                    className={`input-wrapper ${focusedInput === 'phoneNumber' ? 'focused' : ''}`}
                  >
                    <label className="block text-sm text-gray-700 mb-2 transition-colors duration-300 hover:text-blue-600">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('phoneNumber')}
                      onBlur={() => setFocusedInput(null)}
                      disabled={loading}
                      className="w-full px-0 py-2 text-gray-900 bg-transparent border-b border-gray-900 focus:outline-none transition-all duration-300 disabled:opacity-50"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div 
                    className={`input-wrapper ${focusedInput === 'email' ? 'focused' : ''}`}
                  >
                    <label className="block text-sm text-gray-700 mb-2 transition-colors duration-300 hover:text-blue-600">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      disabled={loading}
                      className="w-full px-0 py-2 text-gray-900 bg-transparent border-b border-gray-900 focus:outline-none transition-all duration-300 disabled:opacity-50"
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div 
                    className={`input-wrapper ${focusedInput === 'message' ? 'focused' : ''}`}
                  >
                    <label className="block text-sm text-gray-700 mb-2 transition-colors duration-300 hover:text-blue-600">
                      Message
                    </label>
                    <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('message')}
                      onBlur={() => setFocusedInput(null)}
                      disabled={loading}
                      className="w-full px-0 py-2 text-gray-900 bg-transparent border-b border-gray-900 focus:outline-none transition-all duration-300 disabled:opacity-50"
                      required
                    />
                  </div>

                  {/* Submit Button with enhanced hover effect */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative bg-black text-white px-10 py-3 rounded-full text-base font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {loading ? 'Sending...' : 'Contact Us'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                  </div>
                </form>

              </div>

              {/* Contact Info Column */}
              <div className="space-y-10">
                
                {/* Phone Contact with hover effect */}
                <div className="group">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    Phone
                  </h3>
                  <a 
                    href="tel:+919945107777" 
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 inline-block hover:translate-x-2"
                  >
                    +91 99451 07777
                  </a>
                </div>

                {/* Email Contact with hover effect */}
                <div className="group">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    Contact
                  </h3>
                  <a 
                    href="mailto:hi@green.com" 
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 inline-block hover:translate-x-2"
                  >
                    hi@green.com
                  </a>
                </div>

                {/* Location with hover effect */}
                <div className="group">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    Based in
                  </h3>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    Los Angeles,<br />
                    California
                  </p>
                </div>

                {/* Social Media Icons with enhanced animations */}
                <div className="flex items-center gap-5 pt-4">
                  <a 
                    href="https://wa.me/919945107777" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-green-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="w-6 h-6" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
