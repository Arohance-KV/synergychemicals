// src/pages/ProductDetailPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductById, 
  fetchAllProducts,
  selectSelectedProduct, 
  selectAllProducts,
  selectProductLoading, 
  selectProductError,
  clearSelectedProduct 
} from '../redux/productSlice';
import GetInTouch from '../components/sections/GetInTouch';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Changed from productSlug to productId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('application');
  const moreProductsRef = useRef(null);

  // Redux state
  const currentProduct = useSelector(selectSelectedProduct);
  const allProducts = useSelector(selectAllProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

  // Fetch product by ID when component mounts or productId changes
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchAllProducts()); // Also fetch all products for "More Products" section
    }

    // Cleanup function to clear selected product when unmounting
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

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

  // Transform API products to match component structure
  const transformedProducts = allProducts.map(product => ({
    id: product._id,
    name: product.name.replace(/"/g, ''),
    code: product.productCode.replace(/"/g, ''),
    image: product.mainImage.url,
    category: product.subheading?.replace(/"/g, '') || 'Product'
  }));

  // Filter out current product from more products section
  const remainingProducts = transformedProducts.filter(p => p.id !== productId);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6A00]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
            <p className="font-semibold">Error loading product</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No product found
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-[#32405B] text-white rounded hover:bg-[#FF6A00]"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Transform current product data
  const product = {
    name: currentProduct.name.replace(/"/g, ''),
    subtitle: currentProduct.description?.replace(/"/g, '') || 'Quality product for your needs',
    heroImage: currentProduct.mainImage.url,
    applications: {
      title: 'Applications',
      intro: currentProduct.description?.replace(/"/g, '') || '',
      items: currentProduct.applications || []
    },
    bulletPoints: currentProduct.bulletPoints || []
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
            {product.applications.intro && (
              <p className="text-gray-700 text-base mb-16 leading-relaxed max-w-5xl">
                {product.applications.intro}
              </p>
            )}

            {/* Items Grid - 3 columns */}
            {product.applications.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {product.applications.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-base font-bold text-[#32405B] mb-3">
                      {item.point}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No applications available for this product.</p>
            )}

            {/* Bullet Points Section */}
            {product.bulletPoints.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-[#32405B] mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                  {product.bulletPoints.map((bullet, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF6A00] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-[#32405B] mb-1">{bullet.point}</h4>
                        <p className="text-gray-600 text-sm">{bullet.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/products/${prod.id}`);
                  }}
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
