import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const getCoupons = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/coupons`);
  return res.data;
};

export const createCoupon = async (request) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.post(`${API_SERVER_HOST}/coupons`, request, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};


