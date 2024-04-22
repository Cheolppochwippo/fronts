import React, { useEffect, useState } from 'react';
import { getCartItems, updateCartItem, removeFromCart } from '../../api/cartApi';

const CartItemComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        setCartItems(data.data);
        setTotalPrice(calculateTotalPrice(data.data));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChangeQuantity = async (orderId, newQuantity) => {
    try {
      await updateCartItem(orderId, newQuantity);
      const updatedCartItems = cartItems.map((item) =>
        item.orderId === orderId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);
      setTotalPrice(calculateTotalPrice(updatedCartItems));
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const handleRemoveFromCart = async (orderId) => {
    try {
      await removeFromCart(orderId);
      const updatedCartItems = cartItems.filter((item) => item.orderId !== orderId);
      setCartItems(updatedCartItems);
      setTotalPrice(calculateTotalPrice(updatedCartItems));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.orderId} className="py-4 flex items-center">
                <div className="w-2/3 flex items-center">
                  <div>
                    <p className="text-lg font-semibold">{item.productName}</p>
                    <p className="text-gray-600">Price: {item.price}</p>
                  </div>
                </div>
                <div className="w-1/3 flex justify-end items-center">
                  <div className="flex items-center">
                    <button
                      className="m-1 p-1 text-2xl bg-orange-500 text-white w-8 rounded-lg"
                      onClick={() => handleChangeQuantity(item.orderId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="m-1 p-1 text-2xl bg-orange-500 text-white w-8 rounded-lg"
                      onClick={() => handleChangeQuantity(item.orderId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFromCart(item.orderId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <div className="text-xlg font-bold ">
              Total Price: {totalPrice.toLocaleString()} 원
            </div>
          </div>
          {/* <div className="mt-10 flex justify-end ">
            <button className="px-4 py-2 bg-orange-400 text-white rounded-md">
              주문하기
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default CartItemComponent;