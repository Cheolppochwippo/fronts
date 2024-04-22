import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const getCoupons = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/coupons`);
  return res.data;
};


