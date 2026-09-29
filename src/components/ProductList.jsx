import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400' },
      { id: 2, name: 'Spider Plant', price: 12, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400' },
      { id: 3, name: 'Peace Lily', price: 18, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400' },
      { id: 4, name: 'Boston Fern', price: 14, image: 'https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=400' },
      { id: 5, name: 'Aloe Vera', price: 10, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 6, name: 'Rubber Plant', price: 20, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { id: 7, name: 'Lavender', price: 16, image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400' },
      { id: 8, name: 'Jasmine', price: 19, image: 'https://images.unsplash.com/photo-1592722212830-c50cb3b1e1c8?w=400' },
      { id: 9, name: 'Rosemary', price: 11, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400' },
      { id: 10, name: 'Mint', price: 8, image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400' },
      { id: 11, name: 'Basil', price: 9, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400' },
      { id: 12, name: 'Gardenia', price: 22, image: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=400' },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { id: 13, name: 'Citronella', price: 13, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400' },
      { id: 14, name: 'Marigold', price: 7, image: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400' },
      { id: 15, name: 'Catnip', price: 10, image: 'https://images.unsplash.com/photo-1595431875860-3e2bb2e6c1e0?w=400' },
      { id: 16, name: 'Lemongrass', price: 12, image: 'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=400' },
      { id: 17, name: 'Petunia', price: 9, image: 'https://images.unsplash.com/photo-1596724878470-1f5a2e7c1d11?w=400' },
      { id: 18, name: 'Chrysanthemum', price: 14, image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400' },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedIds, setAddedIds] = useState([]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds((prev) => [...prev, plant.id]);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart" className="cart-icon">
            🛒 <span className="cart-count">{totalCount}</span>
          </Link>
        </div>
      </nav>

      {plantsData.map((cat) => (
        <div key={cat.category}>
          <h2 style={{ padding: '20px 30px 0' }}>{cat.category}</h2>
          <div className="product-grid">
            {cat.plants.map((plant) => {
              const isAdded = addedIds.includes(plant.id);
              return (
                <div className="product-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button
                    disabled={isAdded}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isAdded ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;