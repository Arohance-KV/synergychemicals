import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const OurJourney = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const timelineData = [
    {
      title: "2003",
      heading: "Humble Beginnings",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          Synergy Chemicals was born in a modest rented office space with a small, dedicated team of visionaries. With limited resources and boundless ambition, we began sourcing and distributing high-quality chemical products, establishing key supplier relationships, and laying the groundwork for a company driven by innovation and customer trust. This year marked the start of our journey to become a trusted name in the chemical industry.
        </p>
      ),
    },
    {
      title: "2004",
      heading: "Official Establishment",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          Synergy Chemicals was formally incorporated, marking a pivotal moment in our history. We set up our first official office in JP Nagar, Bengaluru, equipped with a passionate team committed to excellence. This year, we began building a robust network of clients across various industries, focusing on delivering tailored solutions and reliable, quality chemical products while fostering strong partnerships. Our early efforts centered on understanding customer needs and providing tailored solutions, setting the stage for future growth.
        </p>
      ),
    },
    {
      title: "2006",
      heading: "Expansion with a Godown",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          To meet the rising demand for our chemical products, Synergy Chemicals acquired its first godown facility in 2006. This strategic expansion significantly enhanced our inventory management capabilities, allowing us to stock a wider range of products and ensure timely deliveries. Our team worked tirelessly to optimize logistics, streamline operations, and maintain stringent quality control, reinforcing our commitment to customer satisfaction and operational excellence.
        </p>
      ),
    },
    {
      title: "2010",
      heading: "Our Own Office",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          In 2010, Synergy Chemicals achieved a significant milestone by moving into our own office space on JC Road, Bengaluru. This modern facility provided a professional environment to support our growing team and operations. The new office enabled us to enhance customer service, host client meetings, and foster a collaborative work culture. This move solidified our presence in the industry and marked our transition from a startup to an established enterprise.
        </p>
      ),
    },
    {
      title: "2011",
      heading: "A Turning Point",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          The year 2011 was transformative for Synergy Chemicals, as we experienced exponential growth in business volume, product diversity, and workforce. We expanded our product portfolio to include specialized chemicals for niche industries, strengthened our supply chain, and invested in employee training to enhance expertise. Our growing reputation for reliability and quality attracted major clients, cementing our position as a leading player in the chemical distribution market.
        </p>
      ),
    },
    {
      title: "2018 - 2019",
      heading: "Change in Infrastructure",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          To support our expanding operations, Synergy Chemicals established a state-of-the-art godown facility between 2018 and 2019. This advanced warehouse was equipped with modern inventory systems, enabling faster order fulfillment and improved scalability. We also implemented eco-friendly storage practices and invested in technology to enhance operational efficiency. This infrastructure upgrade allowed us to better serve our growing customer base across diverse sectors, from pharmaceuticals to agriculture.
        </p>
      ),
    },
    {
      title: "2012 - 2020",
      heading: "A Decade of Growth and Challenges",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          From 2012 to 2020, Synergy Chemicals experienced a decade of remarkable growth, navigating challenges such as market fluctuations and the global COVID-19 pandemic. We expanded our product offerings, entered new markets, and adopted innovative technologies to streamline operations. During the pandemic, we played a vital role in supporting communities by distributing essential chemicals, providing financial aid, and organizing food drives. Our commitment to corporate social responsibility and resilience during tough times strengthened our brand and community ties.
        </p>
      ),
    },
    {
      title: "2023",
      heading: "New Milestone",
      content: (
        <p className="text-gray-600 text-lg leading-relaxed">
          In 2023, Synergy Chemicals relocated to a newly designed, state-of-the-art office on JC Road, Bengaluru, reflecting our commitment to innovation and excellence. This modern facility featured advanced technology, sustainable design, and collaborative workspaces, fostering creativity and productivity. The move enhanced our ability to serve clients efficiently and attracted top talent to our team. This milestone underscored our ongoing dedication to growth, quality, and leadership in the chemical industry.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full bg-gray-50 font-sans" ref={containerRef}>
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
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-24">
        {timelineData.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-start pt-10 sm:pt-20 gap-6 sm:gap-12 px-4 sm:px-6">
            {/* Timeline Marker - Left Side */}
            <div className={`flex flex-col sm:flex-row z-40 items-start ${isMobile ? '' : 'sticky sm:sticky top-20 sm:top-32'} self-start w-full sm:w-1/3`}>
              <div className="h-12 w-12 absolute left-4 sm:left-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-600 shadow-lg ring-4 ring-blue-200/50" />
              </div>
              <h3 className="ml-16 sm:ml-20 text-3xl sm:text-5xl font-bold text-gray-900">
                {item.title}
              </h3>
            </div>

            {/* Timeline Content - Right Side */}
            <div className="relative pl-20 sm:pl-0 w-full sm:w-2/3">
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                {item.heading}
              </h4>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated Timeline Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-9 sm:left-6 top-0 w-[3px] bg-gray-200/50 [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OurJourney;