// src/pages/CareersPage.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ApplySec from '../components/sections/ApplySec';

const CareersPage = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  // Job opportunities data
  const jobListings = [
    {
      id: 1,
      title: 'Section Head - E&A Maintenance',
      location: 'Surat',
      description: 'We are looking for an experienced Section Head to lead our Electrical & Automation Maintenance team. The ideal candidate will have strong leadership skills and extensive knowledge in maintenance operations.',
      requirements: [
        '10+ years of experience in E&A Maintenance',
        'Bachelor\'s degree in Electrical Engineering',
        'Strong leadership and team management skills',
        'Knowledge of industrial automation systems'
      ],
      responsibilities: [
        'Lead and manage the E&A maintenance team',
        'Ensure optimal performance of electrical systems',
        'Implement preventive maintenance programs',
        'Coordinate with other departments'
      ]
    },
    {
      id: 2,
      title: 'Section Head - E&A Maintenance',
      location: 'Surat',
      description: 'Join our team as Section Head for Electrical & Automation Maintenance. This role requires expertise in managing complex maintenance operations in a chemical manufacturing environment.',
      requirements: [
        '10+ years of experience in E&A Maintenance',
        'Bachelor\'s degree in Electrical Engineering',
        'Strong leadership and team management skills',
        'Knowledge of industrial automation systems'
      ],
      responsibilities: [
        'Lead and manage the E&A maintenance team',
        'Ensure optimal performance of electrical systems',
        'Implement preventive maintenance programs',
        'Coordinate with other departments'
      ]
    },
    {
      id: 3,
      title: 'Section Head - E&A Maintenance',
      location: 'Surat',
      description: 'Seeking a qualified Section Head to oversee our Electrical & Automation Maintenance operations. The position offers excellent growth opportunities in a dynamic environment.',
      requirements: [
        '10+ years of experience in E&A Maintenance',
        'Bachelor\'s degree in Electrical Engineering',
        'Strong leadership and team management skills',
        'Knowledge of industrial automation systems'
      ],
      responsibilities: [
        'Lead and manage the E&A maintenance team',
        'Ensure optimal performance of electrical systems',
        'Implement preventive maintenance programs',
        'Coordinate with other departments'
      ]
    }
  ];

  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Hero Section - Responsive Height */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-screen min-h-[500px] md:min-h-screen bg-gray-900">
        <img
          src="/assets/getintouch.png"
          alt="Careers at Synergy Chemicals"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&h=1080&fit=crop';
          }}
        />
        
        {/* Overlay Content - Responsive */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 
                className="font-bold text-white mb-4 sm:mb-6 md:mb-8 text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[155px]"
                style={{ lineHeight: '1.2' }}
              >
                <span className="text-[#FF6A00]">Careers</span>
              </h1>
              <p 
                className="text-white leading-relaxed text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px]"
                style={{ lineHeight: '1.3' }}
              >
                Exposure to diverse industries <br className="hidden sm:block"/>like steel, pharmaceuticals, <br className="hidden sm:block"/>agriculture, food, <br className="hidden sm:block"/>and construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Opportunities Section - WITH BACKGROUND IMAGE */}
      <section 
        className="py-12 md:py-16 lg:py-20 relative"
        style={{
          backgroundImage: 'url(/assets/bg-contact.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* White Overlay with 80% opacity */}
        <div className="absolute inset-0 bg-white" style={{ opacity: 0.8 }}></div>
        
        {/* Content with relative positioning to sit above overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#32405B] mb-8 md:mb-12">
            Job Opportunities
          </h2>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="border-b border-gray-200 pb-6"
              >
                {/* Job Header - Always Visible */}
                <div 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer group"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#32405B] mb-2 group-hover:text-[#FF6A00] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-[#FF6A00] font-medium text-sm">
                      {job.location}
                    </p>
                  </div>
                  
                  <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-[#32405B] transition-colors flex items-center gap-2 self-start sm:self-auto">
                    <span className="whitespace-nowrap">
                      {expandedJob === job.id ? 'SHOW LESS' : 'SHOW MORE'}
                    </span>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedJob === job.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Job Details */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedJob === job.id ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#32405B] mb-3">
                        Job Description
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {job.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#32405B] mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm sm:text-base">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#32405B] mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm sm:text-base">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4">
                      <button className="w-full sm:w-auto bg-[#FF6A00] text-white px-8 py-3 rounded-full font-medium hover:bg-[#E55F00] transition-colors duration-300">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <ApplySec />
    </>
  );
};

export default CareersPage;
