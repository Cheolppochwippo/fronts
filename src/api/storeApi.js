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
