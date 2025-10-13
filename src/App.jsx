// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import ProductDetailPage from './pages/ProductDetailPage';
import PressRelease from './pages/PressRelease';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productSlug" element={<ProductDetailPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/press-release" element={<PressRelease/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
