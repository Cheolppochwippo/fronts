import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
//쿠폰 발급
export const issuedCoupon = async (couponId) => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.post(`${API_SERVER_HOST}/issued/${couponId}`, null,{
    headers: {
      Authorization: header,
    },
  });

  return res.data;
};

//발급받은 쿠폰 조회
export const getIssued = async () => {
  const header = "Bearer " +localStorage.getItem('jwt');
  const res = await axios.get(`${API_SERVER_HOST}/issued`, {
    headers: {
      Authorization: header,
    },
  });

  return res.data;
};


