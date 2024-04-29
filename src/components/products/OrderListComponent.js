import React, { useEffect, useState } from 'react';
import { getStateOrder } from '../../api/totalOrderApi';

const OrderListComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getStateOrder();
        setOrders(data);
        setTotalPrice(calculateTotalPrice(data));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">주문 목록</h2>
      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.orderId} className="py-4 flex items-center">
                <div className="w-2/3 flex items-center">
                  <div>
                    <p className="text-lg font-semibold">{order.productName}</p>
                    <p className="text-gray-600">가격: {order.price.toLocaleString()} 원</p>
                    <p className="text-gray-600">수량: {order.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <div className="text-xlg font-bold ">
              총 주문 금액: {totalPrice.toLocaleString()} 원
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListComponent;