//totalOrederApi.js
import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const totalOrderAdd = async (totalOrderRequest) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.post(`${API_SERVER_HOST}/totalOrders`, totalOrderRequest, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};

export const getTotalOrders = async (page) => {
  const header ="Bearer " + localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/totalOrders`,  {
    headers: {
      Authorization: header,
    }, params: {
      page
    },
  });
  return res.data.data;
};

export const getTotalOrder = async (totalOrderId) => {
  const header ="Bearer " + localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/totalOrders/${totalOrderId}`,  {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};

export const createOrderByDirect = async (productId, quantity) => {
  const header = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.post(
    `${API_SERVER_HOST}/products/${productId}/to-order`,
    null,
    {
      headers: {
        Authorization: header,
      },
      params: {
        quantity,
      },
    }
  );
  return res.data;
};