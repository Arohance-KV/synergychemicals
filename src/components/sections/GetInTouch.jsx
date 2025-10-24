// src/components/sections/GetInTouch.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { createContact, clearError, clearSuccess } from '../../redux/contactSlice'; // Adjust path

const GetInTouch = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phoneNumber: '',
    email: '',
    message: ''
  });

  const countryCodes = [
    '+91', '+1', '+44', '+86', '+61', '+971', '+65', '+60', '+81'
  ];

  // Clear success message after 5 seconds and reset form
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        setFormData({
          name: '',
          countryCode: '+91',
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for API - combine country code with phone number
    const contactData = {
      name: formData.name,
      phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
      email: formData.email,
      message: formData.message
    };

    // Dispatch the createContact action
    await dispatch(createContact(contactData));
  };

  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dmrgscauc/image/upload/v1759748605/getintouch_l009zx.png)',
        }}
      >
        {/* Overlay - Darker on mobile for better readability */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* LEFT SIDE - Form */}
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto lg:mx-0">
            
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                Get in touch
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Have any questions? Our team is ready to assist you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Mobile Number with Country Code */}
              <div className="flex gap-2 sm:gap-3">
                <div className="relative w-20 sm:w-24 flex-shrink-0">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-2 sm:px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {countryCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  pattern="[0-9]{10}"
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Details Textarea */}
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Enter more details"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={500}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none placeholder-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400">
                  {formData.message.length}/500
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white border-2 border-gray-900 text-gray-900 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {success && (
              <div className="mt-4 md:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-xs sm:text-sm font-medium">
                  Thank you for contacting us. Our team shall get in touch with you shortly.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 md:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-xs sm:text-sm font-medium">
                  {error || 'Oh no, something went wrong while submitting your request. Try again later.'}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Empty (for image background showcase) */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
