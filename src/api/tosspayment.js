import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const confirmPayment = async (request) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.post(`${API_SERVER_HOST}/payments/confirm`, request, {
    headers: {
      Authorization: header,
    },
  });
  console.log(res)
  return res.data;
};

export const cancelPayment = async (request) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.post(`${API_SERVER_HOST}/payments/cancel`, request, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};

export const getPayments = async (page) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/payments`,  {
    headers: {
      Authorization: header,
    }, params: {
      page
    },
  });
  return res.data.data;
};

export const getPayment = async (productId) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/payments/${productId}`,  {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};
