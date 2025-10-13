// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import OurJourney from '../components/sections/OurJourney';
import OurServices from '../components/sections/OurServices';
import ReachDistribution from '../components/sections/ReachDistribution';
import ProductSection from '../components/sections/ProductSection';
import ContactSection from '../components/sections/ContactSection';
import ExploreChemistry from '../components/sections/ExploreChemistry';
import Testimonials from '../components/sections/Testimonials';
import ContactUs from '../components/sections/ContactUs';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <OurJourney />
      <OurServices />
      <ReachDistribution />
      <ProductSection />
      <ContactSection />
      <ExploreChemistry />
      <Testimonials />
      <ContactUs />
    </main>
  );
};

export default HomePage;
