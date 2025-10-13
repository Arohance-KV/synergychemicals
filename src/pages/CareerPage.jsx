// src/pages/CareersPage.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ApplySec from '../components/sections/applysec';

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
      {/* Hero Section - Full Viewport Height */}
      <section className="relative h-screen min-h-screen bg-gray-900">
        <img
          src="/assets/getintouch.png"
          alt="Careers at Synergy Chemicals"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&h=1080&fit=crop';
          }}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 
                className="font-bold text-white mb-8"
                style={{ fontSize: '155px', lineHeight: '1.2' }}
              >
                <span className="text-[#FF6A00]">Careers</span>
              </h1>
              <p 
                className="text-white leading-relaxed"
                style={{ fontSize: '44px', lineHeight: '1.3' }}
              >
                Exposure to diverse industries <br/>like steel, pharmaceuticals, <br/>agriculture, food, <br/>and construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Opportunities Section - WITH BACKGROUND IMAGE */}
      <section 
        className="py-16 relative"
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#32405B] mb-12">
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
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleJob(job.id)}
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#32405B] mb-2 group-hover:text-[#FF6A00] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-[#FF6A00] font-medium text-sm">
                      {job.location}
                    </p>
                  </div>
                  
                  <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-[#32405B] transition-colors flex items-center gap-2">
                    SHOW MORE
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
                    expandedJob === job.id ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#32405B] mb-3">
                        Job Description
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#32405B] mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full mt-2"></span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#32405B] mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full mt-2"></span>
                            <span className="text-gray-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4">
                      <button className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-medium hover:bg-[#E55F00] transition-colors duration-300">
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
