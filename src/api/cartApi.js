import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { getCookie } from "../util/cookieUtil";

const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST


export const postChangeCart = async (productId, qty) => {
  const res = await jwtAxios.post(
    `${API_SERVER_HOST}/products/${productId}/orders`,
    {
      qty,
    }
  );
  return res.data;
};

export const getCartItems = async () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.get(`${API_SERVER_HOST}/orders`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const addToCart = async (productId, quantity) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.post(
    `${API_SERVER_HOST}/products/${productId}/orders?quantity=${quantity}`,
    {},
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
};
export const updateCartItem = async (orderId, quantity) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.put(
    `${API_SERVER_HOST}/orders/${orderId}?quantity=${quantity}`,
    {},
    { headers: { Authorization: token } }
  );
  return res.data;
};

export const removeFromCart = async (orderId) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.delete(`${API_SERVER_HOST}/orders/${orderId}`, 
  {
    headers: { Authorization: token },
  });
  return res.data;
};

