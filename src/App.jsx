import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>Bring nature home with our beautiful houseplants.</p>
      <button className="get-started-btn" onClick={() => navigate('/products')}>
        Get Started
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
};

export default App;