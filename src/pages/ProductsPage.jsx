// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllProducts, 
  selectAllProducts, 
  selectProductLoading, 
  selectProductError 
} from '../redux/productSlice';
import { 
  fetchAllIndustries, 
  selectAllIndustries, 
  selectIndustryLoading, 
  selectIndustryError 
} from '../redux/industrySlice';
import GetInTouch from '../components/sections/GetInTouch';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  // Redux state for products
  const products = useSelector(selectAllProducts);
  const productLoading = useSelector(selectProductLoading);
  const productError = useSelector(selectProductError);

  // Redux state for industries
  const industries = useSelector(selectAllIndustries);
  const industryLoading = useSelector(selectIndustryLoading);
  const industryError = useSelector(selectIndustryError);

  // Fetch products on component mount
  useEffect(() => {
    if (activeTab === 'products') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, activeTab]);

  // Fetch industries when industries tab is active
  useEffect(() => {
    if (activeTab === 'industries') {
      dispatch(fetchAllIndustries());
    }
  }, [dispatch, activeTab]);

  // Transform API products to match component structure
  const transformedProducts = products.map(product => ({
    id: product._id,
    name: product.name.replace(/"/g, ''),
    code: product.productCode.replace(/"/g, ''),
    image: product.mainImage.url,
    category: product.subheading?.replace(/"/g, '') || 'Product'
  }));

  // Transform API industries to match component structure
  const transformedIndustries = industries.map(industry => ({
    id: industry._id,
    name: industry.name?.replace(/"/g, '') || industry.name,
    code: industry.industryCode?.replace(/"/g, '') || '#IND',
    image: industry.mainImage?.url || '/assets/products/sodium-bicarbonate.jpg',
    category: industry.description?.replace(/"/g, '').substring(0, 50) || 'Industry'
  }));

  const displayData = activeTab === 'products' ? transformedProducts : transformedIndustries;
  const loading = activeTab === 'products' ? productLoading : industryLoading;
  const error = activeTab === 'products' ? productError : industryError;

  // Filter data based on search query
  const filteredData = displayData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div 
        className="min-h-screen pt-24 pb-20 relative"
        style={{
          backgroundImage: 'url(/assets/bg-contact.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-white backdrop-blur-sm"
          style={{ opacity: 0.8 }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32405B] mb-4">
              CHEMISTRY ACROSS<br />INDUSTRIES
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'products'
                  ? 'text-[#32405B]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              PRODUCTS
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('industries')}
              className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'industries'
                  ? 'text-[#32405B]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              INDUSTRIES
              {activeTab === 'industries' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00]"></div>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH CATEGORIES"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#FF6A00] transition-colors text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6A00]"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
                <p className="font-semibold">Error loading {activeTab}</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Products/Industries Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + item.name;
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#32405B] mb-2 group-hover:text-[#FF6A00] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.code}</p>
                    {item.category && (
                      <p className="text-xs text-gray-400 mt-2">{item.category}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No results found for your search
              </p>
            </div>
          )}
        </div>
      </div>
      <GetInTouch />
    </>
  );
};

export default ProductsPage;
