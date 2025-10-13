// src/pages/ProductDetailPage.jsx
import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GetInTouch from '../components/sections/GetInTouch';

const ProductDetailPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('application');
  const moreProductsRef = useRef(null);

  // Scroll to More Products section
  const scrollToMoreProducts = () => {
    setActiveTab('moreproducts');
    setTimeout(() => {
      moreProductsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // All Products data (same as in ProductsPage)
  const allProducts = [
    {
      id: 1,
      name: 'SODA ASH',
      code: '#12131',
      slug: 'soda-ash',
      image: '/assets/products/soda-ash.png',
      category: 'Industrial Chemicals'
    },
    {
      id: 2,
      name: 'SODIUM BICARBONATE',
      code: '#12131',
      slug: 'sodium-bicarbonate',
      image: '/assets/products/sodium-bicarbonate.jpg',
      category: 'Industrial Chemicals'
    },
    {
      id: 3,
      name: 'PRECIPITATE SILICA',
      code: '#12131',
      slug: 'precipitate-silica',
      image: '/assets/products/precipitate-silica.png',
      category: 'Specialty Chemicals'
    },
    {
      id: 4,
      name: 'FRUCTO- OLIGOSACCHARIDES',
      code: '#12131',
      slug: 'fructo-oligosaccharides',
      image: '/assets/products/fructo-oligosaccharides.png',
      category: 'Agricultural Solutions'
    },
    {
      id: 5,
      name: 'CEMENT',
      code: '#12131',
      slug: 'cement',
      image: '/assets/products/cement.png',
      category: 'Construction'
    },
    {
      id: 6,
      name: 'NANO ZINC OXIDE',
      code: '#12131',
      slug: 'nano-zinc-oxide',
      image: '/assets/products/nano-zinc-oxide.jpg',
      category: 'Specialty Chemicals'
    },
    {
      id: 7,
      name: 'ALLIED CHEMICALS',
      code: '#12131',
      slug: 'allied-chemicals',
      image: '/assets/products/allied-chemicals.png',
      category: 'Industrial Chemicals'
    }
  ];

  // Get current product based on slug
  const currentProduct = allProducts.find(p => p.slug === productSlug) || allProducts[0];

  // Filter out current product to show remaining products
  const remainingProducts = allProducts.filter(p => p.id !== currentProduct.id);

  // Product detail data
  const product = {
    name: currentProduct.name,
    subtitle: 'Soda Ash is the common name for sodium carbonate (Na₂CO₃), a white, odourless, and stable powder that dissolves in water to form a slightly alkaline solution. Reliable and versatile, our Soda Ash range is a key raw material used across glass manufacturing, detergents, chemicals, and textiles. It is known for its consistent quality and purity.',
    heroImage: currentProduct.image,
    applications: {
      title: 'Applications',
      intro: 'Soda Ash is a fundamental industrial chemical known for its exceptional versatility across a wide spectrum of sectors. Its unique alkaline properties and ability to regulate pH make it indispensable in both manufacturing and processing environments. From enhancing product quality to improving operational efficiency, Soda Ash plays a critical role in driving innovation and sustainability across traditional and emerging industries.',
      items: [
        {
          title: 'Chemical Production',
          description: 'Soda Ash acts as a key raw material for manufacturing sodium-based chemicals like sodium silicates, phosphates, and percarbonates.'
        },
        {
          title: 'Silicate manufacturing',
          description: 'It is used to produce sodium silicate, essential in adhesives, detergents, and foundry moulds.'
        },
        {
          title: 'Water softening',
          description: 'It helps remove hardness in water by precipitating calcium and magnesium ions from water.'
        },
        {
          title: 'Oil and gas drilling (fluids)',
          description: 'It regulates the pH and reduces calcium levels in drilling fluids to prevent pipe scaling.'
        },
        {
          title: 'pH regulation in pools',
          description: 'Soda Ash maintains alkaline balance and stabilises pH levels in swimming pool water.'
        },
        {
          title: 'Bentonite manufacturing',
          description: 'Soda Ash can adjust the pH during activation of bentonite clay used in drilling and foundry applications.'
        },
        {
          title: 'Metal smelting',
          description: 'Used as a fluxing agent to remove impurities and improve metal recovery during smelting.'
        },
        {
          title: 'Boiler descaling',
          description: 'It helps neutralise acidic conditions and prevent scale buildup in boiler systems.'
        },
        {
          title: 'Li-ion battery manufacturing',
          description: 'Used in the production of lithium compounds critical for battery cathodes.'
        },
        {
          title: 'Solar glass for PV module manufacturing',
          description: 'Used for increasing clarity and chemical stability in low-iron solar glass panels.'
        },
        {
          title: 'Glass manufacturing (flat glass)',
          description: 'Soda Ash lowers the melting point and improves workability in float and sheet glass production.'
        },
        {
          title: 'Glass manufacturing (bottles, containers)',
          description: 'It enhances durability and clarity while optimising furnace performance.'
        },
        {
          title: 'Ceramic production (glazes, durability)',
          description: 'It acts as a flux to reduce firing temperature and improve surface finish in ceramics.'
        },
        {
          title: 'Textile manufacturing (dyeing, fabric softening)',
          description: 'Controls the pH during dyeing and improves the absorption of reactive dyes.'
        },
        {
          title: 'Household cleaning products (detergents, abrasives)',
          description: 'Provides alkalinity for effective cleaning and grease removal in soaps and detergents.'
        }
      ]
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Top Section - Title and Image */}
        <section className="bg-white pt-28 pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Product Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#32405B] mb-6">
                {product.name}
              </h1>
              <p className="text-gray-700 text-base leading-relaxed max-w-5xl">
                {product.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[500px] bg-gray-900 mb-0">
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=500&fit=crop';
            }}
          />
        </section>

        {/* Tabs Section */}
        <section className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-12">
                <button
                  onClick={() => setActiveTab('application')}
                  className={`py-4 px-2 font-medium text-sm relative transition-colors ${
                    activeTab === 'application'
                      ? 'text-[#32405B]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Applications
                  {activeTab === 'application' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00]"></div>
                  )}
                </button>
                <button
                  onClick={scrollToMoreProducts}
                  className={`py-4 px-2 font-medium text-sm relative transition-colors ${
                    activeTab === 'moreproducts'
                      ? 'text-[#32405B]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  More products
                  {activeTab === 'moreproducts' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00]"></div>
                  )}
                </button>
              </div>

              {/* Enquire Button */}
              <button className="px-6 py-2 border-2 border-gray-900 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                Enquire
              </button>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#32405B] mb-6">
              {product.applications.title}
            </h2>

            {/* Introduction Text */}
            <p className="text-gray-700 text-base mb-16 leading-relaxed max-w-5xl">
              {product.applications.intro}
            </p>

            {/* Items Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {product.applications.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-base font-bold text-[#32405B] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Products Section */}
        <section 
          ref={moreProductsRef}
          className="py-16 bg-white border-t border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header with + Icon */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#32405B]">
                MORE PRODUCTS
              </h2>
              <button 
                onClick={() => navigate('/products')}
                className="w-12 h-12 bg-[#32405B] rounded-full flex items-center justify-center text-white hover:bg-[#FF6A00] transition-colors duration-300"
              >
                <span className="text-2xl">+</span>
              </button>
            </div>

            {/* Products Grid - All remaining products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => navigate(`/products/${prod.slug}`)}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + prod.name;
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#32405B] mb-2 group-hover:text-[#FF6A00] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-sm text-gray-500">{prod.code}</p>
                    {prod.category && (
                      <p className="text-xs text-gray-400 mt-2">{prod.category}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Get In Touch Section */}
      <GetInTouch />
    </>
  );
};

export default ProductDetailPage;
