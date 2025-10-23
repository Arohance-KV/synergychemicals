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
          content: 'Our team plays a vital role in promoting quality chemicals from trusted manufacturers to diverse industries. With a strong sales network, transparent communication, and a customer-focused approach, we ensure every client receives the right solution with reliable service and competitive value.'
        },
        {
          type: 'customer-centric',
          title: 'Customer-Centric Approach',
          image: '/assets/customer-centric.jpg',
          content: [
            'We prioritize understanding our clients\' unique needs through in-depth consultations and tailored recommendations. Our sales experts provide comprehensive product knowledge and application guidance to help you achieve optimal results.',
            'Building lasting relationships is at the heart of our strategy. We offer flexible pricing models, volume discounts, and customized support packages to meet your business objectives and foster mutual growth.'
          ]
        },
        {
          type: 'market-strategy',
          title: 'Strategic Market Promotion',
          image: '/assets/market-strategy.jpg',
          content: [
            'Leveraging digital marketing, trade shows, and industry partnerships, we amplify your product visibility across target markets. Our campaigns are data-driven to maximize reach and conversion rates.',
            'We provide end-to-end support from lead generation to order fulfillment, ensuring seamless integration with your supply chain for enhanced efficiency and customer satisfaction.'
          ]
        }
      ]
    },
    'logistics': {
      id: 'logistics',
      title: 'Logistics',
      heroImage: '/assets/logistics-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'With streamlined operations and reliable transport partners, we ensure safe, compliant, and on-time delivery across all regions — maintaining consistency and care at every step.'
        },
        {
          type: 'transport-network',
          title: 'Robust Transport Network',
          image: '/assets/transport-network.jpg',
          content: [
            'Our extensive network of carriers and routes covers domestic and international destinations, utilizing road, rail, and sea transport for versatile shipping solutions.',
            'Real-time tracking and predictive analytics allow proactive management of shipments, minimizing delays and providing full visibility throughout the journey.'
          ]
        },
        {
          type: 'compliance-safety',
          title: 'Compliance & Safety Protocols',
          image: '/assets/compliance-safety.jpg',
          content: [
            'Adhering to global regulations like IMDG, IATA, and DOT standards, we implement rigorous safety measures for hazardous materials handling and secure packaging.',
            'Our dedicated logistics team coordinates with customs brokers for smooth border crossings and offers insurance options to protect your valuable consignments.'
          ]
        }
      ]
    },
    'sourcing': {
      id: 'sourcing',
      title: 'Sourcing',
      heroImage: '/assets/sourcing-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'Our global sourcing expertise helps us procure premium-quality raw materials from trusted suppliers. Every product undergoes quality checks and complies with regulatory standards.'
        },
        {
          type: 'supplier-network',
          title: 'Global Supplier Network',
          image: '/assets/logistics-hero.jpg',
          content: [
            'We maintain long-term partnerships with vetted manufacturers in key regions, ensuring access to high-grade materials at competitive prices through consolidated procurement.',
            'Our sourcing specialists conduct regular audits and performance evaluations to uphold supplier reliability and adaptability to market fluctuations.'
          ]
        },
        {
          type: 'quality-assurance',
          title: 'Rigorous Quality Assurance',
          image: '/assets/quality-assurance.webp',
          content: [
            'Incoming materials are subjected to multi-stage inspections, including chemical analysis, purity testing, and documentation verification to meet ISO and REACH compliance.',
            'We offer traceability from source to delivery, enabling full accountability and rapid issue resolution to safeguard your production processes.'
          ]
        }
      ]
    },
    'product-portfolio': {
      id: 'product-portfolio',
      title: 'Product Portfolio',
      heroImage: '/assets/portfolio-hero.jpg',
      sections: [
        {
          type: 'intro',
          content: 'Offering a diverse range of specialty and commodity chemicals, we serve key industries like Pharmaceuticals, Agrochemicals, Poultry, and Water Treatment with a focus on quality and reliability.'
        },
        {
          type: 'specialty-chemicals',
          title: 'Specialty Chemicals',
          image: '/assets/specialty-chemicals.jpg',
          content: [
            'Our curated selection of high-performance specialty chemicals includes catalysts, intermediates, and additives designed for precision applications in pharmaceuticals and agrochemicals.',
            'Each product is backed by technical data sheets and application support to ensure seamless integration and superior performance in your formulations.'
          ]
        },
        {
          type: 'commodity-chemicals',
          title: 'Commodity Chemicals',
          image: '/assets/commodity-chemicals.webp',
          content: [
            'We supply essential commodity chemicals in bulk volumes for large-scale operations in poultry feed, water treatment, and industrial processes, emphasizing cost-efficiency and consistent supply.',
            'Sustainability is integral to our portfolio; we prioritize eco-friendly alternatives and recycled content where possible to support your green initiatives.'
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
          {/* Hero Section - Responsive */}
          <motion.div 
            className="relative h-[300px] sm:h-[350px] md:h-[400px] bg-cover bg-center overflow-hidden"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4"
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

          {/* Content Sections - Responsive */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {activeService.sections.map((section, index) => {
              if (section.type === 'intro') {
                return (
                  <motion.div 
                    key={index} 
                    className="mb-12 md:mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                      {section.content}
                    </p>
                  </motion.div>
                );
              }

              const isImageRight = index % 2 === 0;

              return (
                <motion.div 
                  key={index} 
                  className={`mb-16 md:mb-20 flex flex-col ${isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                >
                  {/* Image Section */}
                  <motion.div 
                    className="w-full md:w-1/2"
                    variants={isImageRight ? fadeInLeft : fadeInRight}
                  >
                    <motion.div 
                      className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
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
                    className="w-full md:w-1/2"
                    variants={isImageRight ? fadeInRight : fadeInLeft}
                  >
                    <motion.h2 
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6"
                      style={{ color: '#244D4D' }}
                      initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {section.title}
                    </motion.h2>
                    <div className="space-y-3 md:space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <motion.p 
                          key={pIndex}
                          className="text-sm sm:text-base text-gray-700 leading-relaxed"
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
        </div>
        <GetInTouch />
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesPage;