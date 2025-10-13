import React, { useState, useEffect, useRef } from 'react';
import { Beaker, Droplet, TestTube, Activity, Home, Briefcase, Calendar, CheckCircle, Target } from 'lucide-react';

const OurJourney = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleMilestones, setVisibleMilestones] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on scroll position
        const scrolled = Math.max(0, Math.min(1, (windowHeight - top) / (height + windowHeight)));
        setScrollProgress(scrolled * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    
    const milestoneElements = document.querySelectorAll('[data-milestone]');
    
    milestoneElements.forEach((element) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const milestoneId = entry.target.getAttribute('data-milestone');
            if (milestoneId) {
              setVisibleMilestones(prev => {
                const newSet = new Set(prev);
                if (entry.isIntersecting) {
                  newSet.add(milestoneId);
                } else {
                  newSet.delete(milestoneId);
                }
                return newSet;
              });
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px'
        }
      );
      
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Journey milestones organized by rows
  const row1 = [
    {
      year: "2009",
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Home,
      color: 'orange',
      position: 10
    },
    {
      year: "2010",
      title: "Dolor Sit Amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Beaker,
      color: 'red',
      position: 20
    },
    {
      year: "2011",
      title: "Consectetur",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Target,
      color: 'purple',
      position: 30
    }
  ];

  const row2 = [
    {
      year: "2014",
      title: "Magna Aliqua",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Calendar,
      color: 'teal',
      position: 45
    },
    {
      year: "2013",
      title: "Sed Do Eiusmod",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Briefcase,
      color: 'blue',
      position: 55
    },
    {
      year: "2012",
      title: "Adipiscing Elit",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Activity,
      color: 'green',
      position: 65
    }
  ];

  const row3 = [
    {
      year: "2015",
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: TestTube,
      color: 'pink',
      position: 75
    },
    {
      year: "2016",
      title: "Labore et Dolore",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: CheckCircle,
      color: 'indigo',
      position: 85
    },
    {
      year: "2017",
      title: "Incididunt",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      icon: Activity,
      color: 'gray',
      position: 95
    }
  ];

  const getIconBgColor = (color) => {
    const colors = {
      orange: 'bg-orange-100',
      blue: 'bg-blue-100',
      red: 'bg-red-100',
      purple: 'bg-purple-100',
      green: 'bg-green-100',
      teal: 'bg-teal-100',
      pink: 'bg-pink-100',
      indigo: 'bg-indigo-100',
      gray: 'bg-gray-100'
    };
    return colors[color] || 'bg-gray-100';
  };

  const getIconColor = (color) => {
    const colors = {
      orange: 'text-orange-600',
      blue: 'text-blue-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      teal: 'text-teal-600',
      pink: 'text-pink-600',
      indigo: 'text-indigo-600',
      gray: 'text-gray-700'
    };
    return colors[color] || 'text-gray-600';
  };

  const getBorderColor = (color) => {
    const colors = {
      orange: 'border-orange-500',
      blue: 'border-blue-500',
      red: 'border-red-500',
      purple: 'border-purple-500',
      green: 'border-green-500',
      teal: 'border-teal-500',
      pink: 'border-pink-500',
      indigo: 'border-indigo-500',
      gray: 'border-gray-600'
    };
    return colors[color] || 'border-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/assets/right-chemical-background.png')`
        }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
          Our Journey
        </h1>

        {/* Desktop Timeline Container */}
        <div ref={containerRef} className="relative px-8 hidden md:block">
          {/* Start Circle and Text */}
          <div className="flex items-center mb-2" data-milestone="start">
            <div className={`w-20 h-20 rounded-full bg-orange-100 border-4 border-orange-500 flex items-center justify-center shadow-lg transform transition-all duration-500 ${visibleMilestones.has('start') ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} z-10`}>
              <span className="text-sm font-bold text-orange-600">Start</span>
            </div>
            <div className={`ml-6 transition-opacity duration-500 ${visibleMilestones.has('start') ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="text-xl font-bold text-gray-800">Lorem Ipsum Dolor Sit Amet</h3>
              <p className="text-gray-600 mt-1">Beginning our journey with passion and dedication</p>
            </div>
            
            {/* Connection from Start to Row 1 */}
            <div className="absolute left-17 top-20 w-[6px] h-[60px] bg-gray-200"></div>
            <div 
              className="absolute left-17 top-20 w-[6px] bg-gradient-to-b from-orange-500 to-orange-400 transition-all duration-500"
              style={{ height: scrollProgress > 5 ? '60px' : '0px' }}
            ></div>
          </div>

          {/* Row 1 - Left to Right */}
          <div className="relative mb-4 mt-6">
            {/* Background line */}
            <div className="absolute top-8 left-10 right-10 h-[6px] bg-gray-200 rounded-full"></div>
            {/* Animated line */}
            <div 
              className="absolute top-8 left-10 h-[6px] bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(scrollProgress * 3.5, 90)}%` }}
            ></div>
            
            {/* Milestones */}
            <div className="relative flex justify-between items-start pt-0 pb-20">
              {row1.map((milestone, index) => {
                const Icon = milestone.icon;
                const milestoneId = `row1-${milestone.year}`;
                const isVisible = visibleMilestones.has(milestoneId);
                return (
                  <div key={index} data-milestone={milestoneId} className={`flex flex-col items-center flex-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className={`w-16 h-16 rounded-full ${getIconBgColor(milestone.color)} ${getBorderColor(milestone.color)} border-4 bg-white shadow-lg flex items-center justify-center mb-3 z-10`}>
                      <Icon className={`w-8 h-8 ${getIconColor(milestone.color)}`} />
                    </div>
                    <span className={`text-2xl font-bold ${getIconColor(milestone.color)} mb-2 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{milestone.year}</span>
                    <h4 className="font-semibold text-gray-800 text-center mb-2">{milestone.title}</h4>
                    <p className="text-xs text-gray-600 text-center leading-relaxed max-w-xs px-2">{milestone.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Right curve from 2011 to 2014 (inverted C) */}
            <div className="absolute right-10 top-8 w-48 h-56">
              <svg width="302" height="302" viewBox="0 0 192 224" className="absolute" style={{ left: 141, top: -9 }}>
                <path
                  d="M 0 8 C 80 8, 80 40, 80 112 C 80 184, 80 216, 0 216"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <path
                  d="M 0 8 C 80 8, 80 40, 80 112 C 80 184, 80 216, 0 216"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeDasharray="400"
                  strokeDashoffset={400 - (Math.max(0, (scrollProgress - 30) * 9))}
                />
                <defs>
                  <linearGradient id="gradient1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative mb-4">
            {/* Background line */}
            <div className="absolute top-7 left-10 right-10 h-[6px] bg-gray-200 rounded-full"></div>
            {/* Animated line from right to left */}
            <div 
              className="absolute top-7 right-10 h-[6px] bg-gradient-to-l from-green-400 via-blue-400 to-teal-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(Math.max(0, (scrollProgress - 35) * 3.5), 90)}%` }}
            ></div>
            
            {/* Milestones */}
            <div className="relative flex justify-between items-start flex-row-reverse pt-0 pb-20">
              {row2.map((milestone, index) => {
                const Icon = milestone.icon;
                const milestoneId = `row2-${milestone.year}`;
                const isVisible = visibleMilestones.has(milestoneId);
                return (
                  <div key={index} data-milestone={milestoneId} className={`flex flex-col items-center flex-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className={`w-16 h-16 rounded-full ${getIconBgColor(milestone.color)} ${getBorderColor(milestone.color)} border-4 bg-white shadow-lg flex items-center justify-center mb-3 z-10`}>
                      <Icon className={`w-8 h-8 ${getIconColor(milestone.color)}`} />
                    </div>
                    <span className={`text-2xl font-bold ${getIconColor(milestone.color)} mb-2 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{milestone.year}</span>
                    <h4 className="font-semibold text-gray-800 text-center mb-2">{milestone.title}</h4>
                    <p className="text-xs text-gray-600 text-center leading-relaxed max-w-xs px-2">{milestone.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Left C curve (normal C shape, opening to the right) */}
            <div className="absolute left-10 top-8 w-48 h-56">
              <svg width="302" height="302" viewBox="0 0 192 224" className="absolute" style={{ left: -252, top: -12 }}>
                {/* Base path (gray outline) */}
                <path
                  d="M 192 8 C 112 8, 112 40, 112 112 C 112 184, 112 216, 192 216"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                {/* Animated gradient path */}
                <path
                  d="M 192 8 C 112 8, 112 40, 112 112 C 112 184, 112 216, 192 216"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="4"
                  strokeDasharray="400"
                  strokeDashoffset={400 - (Math.max(0, (scrollProgress - 65) * 9))}
                />
                <defs>
                  <linearGradient id="gradient2">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="relative mb-2">
            {/* Background line */}
            <div className="absolute top-6 left-10 right-10 h-[6px] bg-gray-200 rounded-full"></div>
            {/* Animated line */}
            <div 
              className="absolute top-6 left-10 h-[6px] bg-gradient-to-r from-pink-400 via-indigo-400 to-gray-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(Math.max(0, (scrollProgress - 70) * 3.5), 90)}%` }}
            ></div>
            
            {/* Milestones */}
            <div className="relative flex justify-between items-start pt-0 pb-20">
              {row3.map((milestone, index) => {
                const Icon = milestone.icon;
                const milestoneId = `row3-${milestone.year}`;
                const isVisible = visibleMilestones.has(milestoneId);
                return (
                  <div key={index} data-milestone={milestoneId} className={`flex flex-col items-center flex-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className={`w-16 h-16 rounded-full ${getIconBgColor(milestone.color)} ${getBorderColor(milestone.color)} border-4 bg-white shadow-lg flex items-center justify-center mb-3 z-10`}>
                      <Icon className={`w-8 h-8 ${getIconColor(milestone.color)}`} />
                    </div>
                    <span className={`text-2xl font-bold ${getIconColor(milestone.color)} mb-2 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{milestone.year}</span>
                    <h4 className="font-semibold text-gray-800 text-center mb-2">{milestone.title}</h4>
                    <p className="text-xs text-gray-600 text-center leading-relaxed max-w-xs px-2">{milestone.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Right curve from 2017 to Present (inverted C) */}
            <div className="absolute right-10 top-8 w-48 h-56">
              <svg width="302" height="302" viewBox="0 0 192 224" className="absolute" style={{ left: 141, top: -16 }}>
                <path
                  d="M 0 8 C 80 8, 80 40, 80 112 C 80 184, 80 216, 0 216"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <path
                  d="M 0 8 C 80 8, 80 40, 80 112 C 80 184, 80 216, 0 216"
                  fill="none"
                  stroke="url(#gradient3)"
                  strokeWidth="4"
                  strokeDasharray="400"
                  strokeDashoffset={400 - (Math.max(0, (scrollProgress - 30) * 9))}
                />
                <defs>
                  <linearGradient id="gradient3">
                    <stop offset="0%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* End Circle and Text */}
          <div className="flex items-center justify-end mt-6" data-milestone="end">
            <div className={`mr-6 text-right transition-opacity duration-500 ${visibleMilestones.has('end') ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="text-xl font-bold text-gray-800">Tempor Magna Aliqua Incididunt</h3>
              <p className="text-gray-600 mt-1">Continuing to innovate and grow every day</p>
            </div>
            <div className={`w-20 h-20 rounded-full bg-indigo-100 border-4 border-indigo-500 flex items-center justify-center shadow-lg transform transition-all duration-500 ${visibleMilestones.has('end') ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} z-10`}>
              <span className="text-sm font-bold text-indigo-600">Present</span>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden relative px-4">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
          
          {/* Start */}
          <div className="relative mb-12" data-milestone="mobile-start">
            <div className={`flex items-start transition-all duration-500 ${visibleMilestones.has('mobile-start') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="w-16 h-16 rounded-full bg-orange-100 border-4 border-orange-500 flex items-center justify-center shadow-lg z-10 flex-shrink-0">
                <span className="text-xs font-bold text-orange-600">Start</span>
              </div>
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-bold text-gray-800">Lorem Ipsum Dolor</h3>
                <p className="text-sm text-gray-600 mt-1">Beginning our journey with passion</p>
              </div>
            </div>
          </div>

          {/* All Milestones Chronologically */}
          {[...row1, ...row2, ...row3].sort((a, b) => parseInt(a.year) - parseInt(b.year)).map((milestone, index) => {
            const Icon = milestone.icon;
            const milestoneId = `mobile-${milestone.year}`;
            const isVisible = visibleMilestones.has(milestoneId);
            
            return (
              <div key={index} className="relative mb-12" data-milestone={milestoneId}>
                <div className={`flex items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <div className={`w-16 h-16 rounded-full ${getIconBgColor(milestone.color)} ${getBorderColor(milestone.color)} border-4 bg-white shadow-lg flex items-center justify-center z-10 flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${getIconColor(milestone.color)}`} />
                  </div>
                  <div className="ml-4">
                    <span className={`text-xl font-bold ${getIconColor(milestone.color)} block mb-1 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                      {milestone.year}
                    </span>
                    <h4 className="font-semibold text-gray-800 mb-1">{milestone.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End */}
          <div className="relative" data-milestone="mobile-end">
            <div className={`flex items-start transition-all duration-500 ${visibleMilestones.has('mobile-end') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="w-16 h-16 rounded-full bg-indigo-100 border-4 border-indigo-500 flex items-center justify-center shadow-lg z-10 flex-shrink-0">
                <span className="text-xs font-bold text-indigo-600">Now</span>
              </div>
              <div className="ml-4 mt-2">
                <h3 className="text-lg font-bold text-gray-800">Tempor Magna Aliqua</h3>
                <p className="text-sm text-gray-600 mt-1">Continuing to innovate every day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurJourney;