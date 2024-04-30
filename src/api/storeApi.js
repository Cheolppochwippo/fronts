//storeApi.js
import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const viewStore = async () => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/stores`, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};

export const updateStore = async (request) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.patch(`${API_SERVER_HOST}/stores`,request, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
};

export const showOrderInStore = async (request) => {
  const header = "Bearer " + localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/store/orders`, {"year":2024,"month":4}, {
    headers: {
      Authorization: header,
    },
  });
  return res.data;
 };
