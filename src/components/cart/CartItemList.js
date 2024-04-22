// CartItemList.js

import React from 'react';
import CartItem from './CartItem';

const CartItemList = ({ cartItems, handleChangeQuantity, handleRemoveFromCart }) => {
  return (
    <ul>
      {cartItems.map((item) => (
        <CartItem
          key={item.orderId}
          cino={item.orderId}
          pno={item.productId}
          pname={item.productName}
          price={item.price}
          qty={item.quantity}
          handleClickQty={handleChangeQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </ul>
  );
};

export default CartItemList;
