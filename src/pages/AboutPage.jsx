// src/pages/AboutPage.jsx
import React from 'react';
import AboutVision from '../components/sections/AboutVision';
import OurMission from '../components/sections/OurMission';
import EnvironmentalCommitment from '../components/sections/EnvironmentalCommitment';
import ReachDistribution from '../components/sections/ReachDistribution';
import OurJourney from '../components/sections/OurJourney';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <AboutVision />
      <OurMission />
      <EnvironmentalCommitment />
      <ReachDistribution />
      <OurJourney />
      {/* Add more sections here */}
    </div>
  );
};

export default AboutPage;
