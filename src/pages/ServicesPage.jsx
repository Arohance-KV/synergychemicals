// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GetInTouch from '../components/sections/GetInTouch';

const ServicesPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);

  const servicesData = {
    'sales-marketing': {
      id: 'sales-marketing',
      title: 'Sales & Marketing',
      heroImage: '/assets/sales-marketing-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'At Synergy Chemicals, Our Sales And Marketing Team Acts As The Bridge Between Innovation And Industry. We Don\'t Just Sell Products — We Build Long-Term Partnerships By Understanding Our Customers\' Needs And Delivering Tailored Solutions.'
        },
        {
          type: 'customer-centric',
          title: 'Customer-Centric',
          image: '/assets/customer-centric.jpg',
          content: [
            'At Synergy Chemicals, Our Sales And Marketing Services Are Designed To Create Value Beyond The Product Itself. We Understand That Every Client Has Unique Requisitions, And Our Mission Is To Deliver Solutions That Are Reliable, Efficient, And Sensitive.',
            'Our Sales Team Is Committed To You With Customers By Offering Technical Expertise, Product Recommendations, And Real-To-Real Support To Ensure Maximum Benefit From Every Purchase. We Focus On Personalized Service Based On Trust And Transparency. We Aim To Become A Long-Term Partner In Your Growth Journey.'
          ]
        },
        {
          type: 'distribution',
          title: 'Distribution & Supply Chain',
          image: '/assets/distribution.jpg',
          content: [
            'Our Exceptionally Committed Group With Business And Specialized Mastery Alongside Profound Market Knowledge Give Start To Finish Answers For Our Customers And Suppliers.',
            'We Have A Very Skilled And Qualified Research And Development Team In Place Who Have Studied The Market For Over 30 Years. As Your Disposal To Conduct Strategic Market Research And Development, We Help Provide A Marketing Strategy As Per Your Preferences.',
            'Proper Material Handling, Quality And Regulatory Compliance Of Our Products To Provide Essential Customer Service In Commercial As Well As Technical Aspects.'
          ]
        }
      ]
    },
    'transportation': {
      id: 'transportation',
      title: 'Transportation',
      heroImage: '/assets/transportation-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'Synergy Chemicals Ensures Safe, Efficient, And Timely Delivery Of Chemical Products Through Our Advanced Transportation Network. We Understand The Critical Nature Of Chemical Logistics And Maintain The Highest Safety Standards.'
        },
        {
          type: 'fleet-management',
          title: 'Fleet Management',
          image: '/assets/fleet.jpg',
          content: [
            'Our Modern Fleet Is Equipped With Specialized Vehicles Designed For Chemical Transportation. Each Vehicle Undergoes Regular Maintenance And Safety Inspections To Ensure Compliance With International Standards.',
            'We Utilize GPS Tracking And Real-Time Monitoring Systems To Provide Complete Visibility Of Your Shipments. Our Drivers Are Trained In Hazardous Material Handling And Emergency Response Protocols.'
          ]
        },
        {
          type: 'logistics',
          title: 'Logistics & Route Optimization',
          image: '/assets/logistics.jpg',
          content: [
            'We Employ Advanced Route Planning Software To Optimize Delivery Times While Ensuring Safety And Regulatory Compliance. Our Logistics Team Works Around The Clock To Coordinate Seamless Transportation.',
            'With Strategic Warehousing Locations And Distribution Centers, We Can Serve Customers Across Multiple Regions Efficiently. Temperature-Controlled Transportation Options Are Available For Sensitive Chemical Products.'
          ]
        }
      ]
    },
    'quality-testing': {
      id: 'quality-testing',
      title: 'Quality Testing',
      heroImage: '/assets/quality-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'At Synergy Chemicals, Quality Is Not Just A Process — It\'s Our Promise. Our State-Of-The-Art Testing Facilities And Experienced Team Ensure That Every Product Meets The Highest Industry Standards Before Reaching Our Customers.'
        },
        {
          type: 'laboratory',
          title: 'Advanced Laboratory Facilities',
          image: '/assets/laboratory.jpg',
          content: [
            'Our In-House Laboratory Is Equipped With Cutting-Edge Analytical Instruments Including Spectrophotometers, Chromatography Systems, And Material Testing Equipment. We Conduct Comprehensive Testing For Purity, Composition, And Performance.',
            'Our Quality Control Team Follows Strict Testing Protocols Aligned With ISO Standards And Industry Regulations. Every Batch Undergoes Multiple Quality Checks From Raw Material Inspection To Final Product Verification.'
          ]
        },
        {
          type: 'certification',
          title: 'Certification & Compliance',
          image: '/assets/certification.jpg',
          content: [
            'We Maintain Certifications From Leading International Bodies And Regulatory Authorities. Our Products Come With Complete Documentation Including Certificates Of Analysis, MSDS, And Compliance Reports.',
            'Regular Third-Party Audits And Testing Ensure That Our Quality Management System Remains Robust And Up-To-Date. We Are Committed To Transparency And Provide Full Traceability For All Our Products.'
          ]
        }
      ]
    },
    'cargo-services': {
      id: 'cargo-services',
      title: 'Cargo Services',
      heroImage: '/assets/cargo-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'Synergy Chemicals Offers Comprehensive Cargo Services For Domestic And International Shipments. Our Expertise In Chemical Logistics Ensures Your Products Are Handled With The Utmost Care And Delivered Safely To Their Destination.'
        },
        {
          type: 'international',
          title: 'International Shipping',
          image: '/assets/international-shipping.jpg',
          content: [
            'We Have Established Partnerships With Leading Shipping Lines And Freight Forwarders Worldwide. Our Team Handles All Documentation, Customs Clearance, And Regulatory Requirements For Seamless International Trade.',
            'From Container Shipping To Bulk Cargo, We Offer Flexible Solutions Tailored To Your Needs. Our Network Spans Across Major Ports Globally, Ensuring Efficient And Cost-Effective Delivery.'
          ]
        },
        {
          type: 'warehousing',
          title: 'Warehousing & Storage',
          image: '/assets/warehouse.jpg',
          content: [
            'Our Strategically Located Warehouses Are Designed For Chemical Storage With Proper Ventilation, Temperature Control, And Safety Systems. We Maintain Strict Inventory Management For Complete Product Traceability.',
            'Value-Added Services Include Repackaging, Labeling, And Kitting To Meet Customer-Specific Requirements. Our Facilities Are Regularly Inspected And Comply With All Safety And Environmental Regulations.'
          ]
        }
      ]
    }
  };

  useEffect(() => {
    if (serviceId) {
      const service = servicesData[serviceId];
      if (service) {
        setActiveService(service);
        window.scrollTo(0, 0);
      } else {
        navigate('/');
      }
    }
  }, [serviceId, navigate]);

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  if (!activeService) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={serviceId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="min-h-screen bg-white">
          {/* Hero Section with Parallax Effect */}
          <motion.div 
            className="relative h-[400px] bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url('${activeService.heroImage}')`
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-white text-center px-4"
                style={{
                  textShadow: '2px 2px 8px rgba(249, 115, 22, 0.6), 4px 4px 12px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.3)'
                }}
                {...titleAnimation}
              >
                {activeService.title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {activeService.sections.map((section, index) => {
              if (section.type === 'intro') {
                return (
                  <motion.div 
                    key={index} 
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                      {section.content}
                    </p>
                  </motion.div>
                );
              }

              const isImageRight = index % 2 === 0;

              return (
                <motion.div 
                  key={index} 
                  className={`mb-20 flex flex-col ${isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                >
                  {/* Image Section with Hover Effect */}
                  <motion.div 
                    className="md:w-1/2"
                    variants={isImageRight ? fadeInLeft : fadeInRight}
                  >
                    <motion.div 
                      className="relative rounded-2xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-[400px] object-cover"
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      {/* Animated Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Text Section */}
                  <motion.div 
                    className="md:w-1/2"
                    variants={isImageRight ? fadeInRight : fadeInLeft}
                  >
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-6"
                      style={{ color: '#244D4D' }}
                      initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {section.title}
                    </motion.h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <motion.p 
                          key={pIndex}
                          className="text-gray-700 leading-relaxed text-base"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.3 + (pIndex * 0.1) 
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Related Products Section with Stagger Animation */}
          <motion.div 
            className="bg-gray-50 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="space-y-4"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' },
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' },
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' },
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' },
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' },
                  { name: 'Arohance', location: 'Bangalore', logo: '/assets/arohance-logo.png' }
                ].map((product, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 p-8 flex items-center justify-between group"
                    variants={{
                      initial: { opacity: 0, x: -50 },
                      animate: { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut"
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center gap-12">
                      {/* Logo with Pulse Animation */}
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={product.logo} 
                          alt={product.name}
                          className="h-20 w-auto object-contain"
                        />
                      </motion.div>
                      
                      {/* Product Info */}
                      <div>
                        <motion.h4 
                          className="text-2xl font-bold text-gray-900 mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {product.name}
                        </motion.h4>
                        <motion.p 
                          className="text-gray-600 text-base"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {product.location}
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Learn More Button with Hover Animation */}
                    <motion.button 
                      onClick={() => navigate('/products')}
                      className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-semibold px-8 py-3 transition-all duration-300 flex-shrink-0 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="relative z-10"
                      >
                        Learn More
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        <GetInTouch />
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesPage;