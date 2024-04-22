// pages/OrderCartPage.js
import React from 'react';
import OrderCartComponent from '../../components/cart/OrderCartComponent';
import BasicLayout from '../../layouts/BasicLayout';
import CartItemComponent from '../../components/cart/CartItemComponent';
import { useNavigate } from 'react-router-dom';


const OrderCartPage = () => {
  const navigate = useNavigate();
  const handleClickPayments = () => {
    navigate(`/totalOrder`);
  };

  return (
    
      <div className=" text-3xl">
      {/* <OrderCartComponent/> */}
      <CartItemComponent/>
      {/* <CartComponent/> */}
      <div className="mt-10 flex justify-end ">
            <button className="px-4 py-2 bg-orange-400 text-white rounded-md"
            onClick={handleClickPayments}>
              주문하기
            </button>
          </div>
      </div>
      
      
  );
};

export default OrderCartPage;

