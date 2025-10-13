import React, { useState } from 'react';
import { X } from 'lucide-react';

const PressRelease = () => {
  const [selectedRelease, setSelectedRelease] = useState(null);

  const pressReleases = [
    {
      id: 1,
      title: "Metal Fairs 2024 Showcases Strong Industry Growth with Impressive Turnout",
      location: "Delhi / Mumbai",
      date: "25 July, 2025",
      image: "/assets/press-1.png",
      excerpt: "Highlighting Positive Trends and Developments in the metal industry...",
      content: "Metal Fairs 2024 has concluded with remarkable success, demonstrating the resilience and growth of the metal industry. The event attracted thousands of industry professionals, showcasing cutting-edge technologies, innovative products, and fostering valuable business connections. The fair featured over 500 exhibitors from 30 countries, displaying the latest advancements in metal processing, manufacturing equipment, and sustainable practices. Industry leaders praised the event for its comprehensive coverage of market trends and its role in facilitating global trade partnerships."
    },
    {
      id: 2,
      title: "Innovation Summit 2025 Brings Revolutionary Technologies to Manufacturing",
      location: "Bangalore",
      date: "15 August, 2025",
      image: "/assets/press-1.png",
      excerpt: "Breakthrough innovations unveiled at the annual summit...",
      content: "The Innovation Summit 2025 showcased groundbreaking technologies that are set to transform the manufacturing landscape. With participation from leading tech companies and startups, the summit highlighted AI-driven automation, IoT integration, and sustainable manufacturing practices. Keynote speakers included industry pioneers who shared insights on future trends and the digital transformation of traditional manufacturing processes."
    },
    {
      id: 3,
      title: "Sustainable Manufacturing Conference Addresses Climate Challenges",
      location: "Chennai",
      date: "10 September, 2025",
      image: "/assets/press-1.png",
      excerpt: "Industry leaders unite for environmental responsibility...",
      content: "The Sustainable Manufacturing Conference brought together environmental experts, industry leaders, and policymakers to discuss strategies for reducing carbon footprint in manufacturing. The conference emphasized the importance of green technologies, circular economy principles, and renewable energy adoption. Participants committed to implementing sustainable practices across their operations, with several major announcements regarding carbon-neutral manufacturing targets."
    },
    {
      id: 4,
      title: "Global Trade Expo 2025 Facilitates International Business Partnerships",
      location: "Mumbai",
      date: "5 October, 2025",
      image: "/assets/press-1.png",
      excerpt: "Record-breaking attendance at international trade event...",
      content: "The Global Trade Expo 2025 exceeded expectations with unprecedented international participation. Over 10,000 business professionals from 50 countries attended the four-day event, resulting in numerous trade agreements and partnerships. The expo featured dedicated pavilions for different sectors, networking sessions, and B2B matchmaking services that facilitated meaningful business connections and cross-border collaborations."
    },
    {
      id: 5,
      title: "Tech Innovation Awards 2025 Recognizes Industry Excellence",
      location: "Pune",
      date: "20 October, 2025",
      image: "/assets/press-1.png",
      excerpt: "Celebrating breakthrough innovations and technological advancement...",
      content: "The Tech Innovation Awards 2025 ceremony honored outstanding achievements in technology and innovation. Winners were selected from hundreds of nominees across various categories including AI, robotics, sustainable technology, and digital transformation. The awards recognized both established companies and emerging startups that demonstrated exceptional innovation and positive industry impact."
    },
    {
      id: 6,
      title: "Industry 4.0 Workshop Series Launches Nationwide Training Program",
      location: "Hyderabad",
      date: "1 November, 2025",
      image: "/assets/press-1.png",
      excerpt: "Empowering workforce with digital skills and knowledge...",
      content: "A comprehensive nationwide training program has been launched to prepare the workforce for Industry 4.0 transformation. The workshop series covers topics including automation, data analytics, cybersecurity, and smart manufacturing. With participation from leading educational institutions and industry partners, the program aims to train over 50,000 professionals in the next year, ensuring the industry has the skilled workforce needed for digital transformation."
    }
  ];

  const openModal = (release) => {
    setSelectedRelease(release);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRelease(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .text-shadow-orange {
          color: white;
          text-shadow: 8px 8px 0px #FF6A00;
          letter-spacing: 0.05em;
        }

        .text-shadow-orange-small {
          color: white;
          text-shadow: 2px 2px 0px #FF6A00;
          letter-spacing: 0.2em;
        }
      `}</style>

      {/* Hero Section - Full Viewport Height */}
      <section 
        className="relative h-screen flex items-end overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/bg-press.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-12 md:pb-16 lg:pb-20">
          {/* Text without background box - directly on the background */}
          <div>
            <p className="text-shadow-orange-small text-sm md:text-[38px] font-bold mb-4"
               style={{ fontFamily: 'Arial, sans-serif',letterSpacing: '0.26em' }}>
              Newsroom
            </p>
            <h1 className="text-shadow-orange text-5xl md:text-7xl lg:text-[144px] font-black leading-none"
                style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900 }}>
              Press<br />Releases
            </h1>
          </div>
        </div>
      </section>

      {/* Press Release Cards Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <div
                key={release.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => openModal(release)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Location */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{release.location}</span>
                    <span className="mx-2">|</span>
                    <span>{release.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#32405B] mb-3 line-clamp-2 group-hover:text-[#FF6A00] transition-colors duration-300">
                    {release.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {release.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-[#FF6A00] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRelease && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden animate-slideUp relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
              {/* Left Side - Image */}
              <div className="h-full min-h-[400px] lg:min-h-full">
                <img
                  src={selectedRelease.image}
                  alt={selectedRelease.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=800&fit=crop';
                  }}
                />
              </div>

              {/* Right Side - Content */}
              <div className="p-8 lg:p-12 overflow-y-auto">
                {/* Date & Location */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="font-semibold">{selectedRelease.location}</span>
                  <span className="mx-2">|</span>
                  <span>{selectedRelease.date}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#32405B] mb-6 leading-tight">
                  {selectedRelease.title}
                </h2>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedRelease.content}
                  </p>
                  
                  {/* Additional content sections */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-xl font-bold text-[#32405B] mb-3">
                      Key Highlights
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Record-breaking attendance and participation</li>
                      <li>Showcase of cutting-edge technologies and innovations</li>
                      <li>Strong industry partnerships and collaborations</li>
                      <li>Positive outlook for future growth and development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PressRelease;