import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showMessage, setShowMessage] = useState(false);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
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

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity}</p>
                </div>
                <div>
                  <button className="qty-btn" onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            ))}

            <div className="total-amount">Total Amount: ${totalAmount}</div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <Link to="/products">
              <button className="continue-btn">Continue Shopping</button>
            </Link>

            {showMessage && (
              <p style={{ color: 'green', marginTop: '15px' }}>
                Coming Soon!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;