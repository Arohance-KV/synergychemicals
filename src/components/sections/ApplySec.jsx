// src/components/sections/ApplySec.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ApplySec = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    resumeLink: '',
    jobId: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const countryCodes = [
    '+91', '+1', '+44', '+86', '+61', '+971', '+65', '+60', '+81'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        countryCode: '+91',
        mobile: '',
        email: '',
        resumeLink: '',
        jobId: '',
        description: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/apply.png)',
        }}
      >
        {/* Optional: Dark Overlay for better mobile readability */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/10 lg:bg-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* LEFT SIDE - Empty space to show background image on desktop */}
          <div className="hidden lg:block"></div>

          {/* RIGHT SIDE - Application Form */}
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                Apply Now
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Work with a leading name in the chemical industry
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Mobile Number with Country Code */}
              <div className="flex gap-2 sm:gap-3">
                <div className="relative w-20 sm:w-24 flex-shrink-0">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer text-sm sm:text-base"
                  >
                    {countryCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base"
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
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Resume/CV Link */}
              <div>
                <input
                  type="url"
                  name="resumeLink"
                  placeholder="Resume/CV Link"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Job ID */}
              <div>
                <input
                  type="text"
                  name="jobId"
                  placeholder="Job Id"
                  value={formData.jobId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Description Textarea */}
              <div className="relative">
                <textarea
                  name="description"
                  placeholder="Your Description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={250}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none placeholder-gray-400 text-sm sm:text-base"
                />
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400">
                  {formData.description.length}/250
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white border-2 border-gray-900 text-gray-900 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 md:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-xs sm:text-sm">
                  Application submitted successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 md:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-xs sm:text-sm">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySec;
