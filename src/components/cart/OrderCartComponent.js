import React, { useState, useEffect } from 'react';
import { getCartItems, updateCartItem, removeFromCart } from '../../api/cartApi';

const OrderCartComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleUpdateQuantity = async (orderId, quantity) => {
    try {
      const response = await updateCartItem(orderId, quantity);
      setCartItems(cartItems.map((item) => (item.id === orderId ? response.data : item)));
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveFromCart = async (orderId) => {
    try {
      await removeFromCart(orderId);
      setCartItems(cartItems.filter((item) => item.id !== orderId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
            />
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCartComponent;