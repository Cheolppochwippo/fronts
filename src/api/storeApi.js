import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

export const viewStore = async () => {
  const header = "Bearer " +localStorage.getItem('jwt');
  console.log(header+"AAAAAAAAAAAAAAA")
  const res = await axios.get(`${API_SERVER_HOST}/stores`, {
    headers: {
      Authorization: header,
    },
  });
  console.log(res,"BBBBBBBBBBBBBBBBBBBBBB")
  return res.data;
};
