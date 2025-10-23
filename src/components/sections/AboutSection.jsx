import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate= useNavigate();
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&family=Source+Code+Pro:wght@400&family=Manrope:wght@500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@700&display=swap');
      `}</style>

      {/* Background Chemical Pattern for Left Side */}
      <div 
        className="absolute left-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/left-chemical-background.png')`
        }}
      />
      
      {/* Background Chemical Pattern for Right Side (Images) */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/right-chemical-background.png')`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <h2 
                className="text-6xl md:text-7xl font-bold mb-6"
                style={{ 
                  fontFamily: "'Noto Serif JP', serif",
                  color: '#244D4D'
                }}
              >
                About Us
              </h2>
              <p 
                className="text-gray-600 text-base leading-relaxed"
                style={{ fontFamily: "'Source Code Pro', monospace" }}
              >
                At Synergy Chemicals, we believe that through teamwork, we can achieve anything . Founded in 2004, we have grown to become a trusted name in the chemical distribution industry, known for our commitment to quality, reliability, and innovation.
              </p>
            </div>
            <button 
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              onClick={() => navigate("/about")}
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content - 2x2 Grid of Numbered Sections */}
          <div className="grid grid-cols-1 gap-16">
            {/* Top Row - Sections 1 & 2 */}
            <div className="grid grid-cols-2 gap-12">
              {/* Section 1 */}
              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-6xl font-bold mb-4"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    1.
                  </h3>
                  <h4 
                    className="text-2xl font-bold mb-3"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    Who We Are
                  </h4>
                  <p 
                    className="text-gray-600 leading-relaxed text-base"
                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                  >
                    Focused on innovation, trust, sustainability
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-6xl font-bold mb-4"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    2.
                  </h3>
                  <h4 
                    className="text-2xl font-bold mb-3"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    What Do We Do
                  </h4>
                  <p 
                    className="text-gray-600 leading-relaxed text-base"
                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                  >
                    Essential raw materials that support global manufacturing
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row - Sections 3 & 4 */}
            <div className="grid grid-cols-2 gap-12">
              {/* Section 3 */}
              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-6xl font-bold mb-4"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    3.
                  </h3>
                  <h4 
                    className="text-2xl font-bold mb-3"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    How Do We Help
                  </h4>
                  <p 
                    className="text-gray-600 leading-relaxed text-base"
                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                  >
                    Leveraging research and development to deliver smarter, safer, and more effective chemical solutions
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <div>
                  <h3 
                    className="text-6xl font-bold mb-4"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    4.
                  </h3>
                  <h4 
                    className="text-2xl font-bold mb-3"
                    style={{ 
                      fontFamily: "'Google Sans', sans-serif",
                      color: '#244D4D'
                    }}
                  >
                    Create success story
                  </h4>
                  <p 
                    className="text-gray-600 leading-relaxed text-base"
                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                  >
                    A long-term partnership built on trust and innovation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 2x2 Grid of Images */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Left - Industrial Plant */}
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Industrial Plant"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Top Right - Laboratory */}
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Laboratory Work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bottom Left - Test Tubes */}
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chemical Testing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bottom Right - Research */}
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chemical Research"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
