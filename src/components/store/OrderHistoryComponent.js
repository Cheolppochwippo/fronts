import React, { useState, useEffect } from 'react';
import { showOrderInStore, getStateOrder } from '../../api/storeApi';


const OrderHistoryComponent = () => {
 const [orders, setOrders] = useState([]);
 const [year, setYear] = useState(null);
 const [month, setMonth] = useState(null);
 const [totalAmount, setTotalAmount] = useState(0);

 useEffect(() => {
   const fetchOrders = async () => {
     try {
       const addedOrder = await showOrderInStore(year, month);
       setOrders(addedOrder.data);
     } catch (error) {
       console.error('Error fetching orders:', error);
     }

   };

   if (year && month) {
     fetchOrders();
   }
 }, [year, month]);

 const handleYearChange = (event) => {
   setYear(event.target.value);
 };

 const handleMonthChange = (event) => {
   setMonth(event.target.value);
 };

 return (
   <div>
     <h2>Order History</h2>
     <div>
       <label htmlFor="year">Year:</label>
       <input type="number" id="year" value={year || ''} onChange={handleYearChange} />
     </div>
     <div>
       <label htmlFor="month">Month:</label>
       <input type="number" id="month" value={month || ''} onChange={handleMonthChange} />
     </div>
     <p>Total Amount: {totalAmount}</p>
     <table>
       <thead>
         <tr>
           <th>Order ID</th>
           <th>Product Name</th>
           <th>Quantity</th>
           <th>Price</th>
           <th>Created At</th>
           <th>Modified At</th>
           <th>Total Price</th>
           <th>Statement</th>
         </tr>
       </thead>
       <tbody>
         {orders.map((order) => (
           <tr key={order.orderId}>
             <td>{order.orderId}</td>
             <td>{order.productName}</td>
             <td>{order.quantity}</td>
             <td>{order.price}</td>
             <td>{order.createdAt}</td>
             <td>{order.modifiedAt}</td>
             <td>{order.totalPrice}</td>
             <td>{order.statement}</td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
};

export default OrderHistoryComponent;