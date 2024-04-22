import axios from "axios";

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const host = `${API_SERVER_HOST}/products`;


export const getOne = async (pno) => {
  const res = await axios.get(`${host}/${pno}` )
  return res.data
  }

// export const getList = async ({ page, size }) => {
//     const response = await axios.get(`${host}`, {
//       params: {
//         page,
//         size,
//       },
//     });
//     return response.data.data.productList; // productList 필드 반환
//   };

export const getList = async ({ page, size }) => {
  console.log('${host}')
    const response = await axios.get('${host}', {
      params: {
        page,
        size,
      },
    });
  console.log(response)
    return response.data.data.productList; 
  };


  // store 

  export const getStoreList = async ({ page, size }) => {
    const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.get(`${API_SERVER_HOST}/stores/products`, 
  { params: {
    page,
    size,
  },
    headers: { Authorization: token },
  });
    return res.data.data.productList; 
  };


export const addProduct = async (data, userDetails) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const body = {
    productName : data.productName,
    info : data.info,
    realPrice : data.realPrice,
    price : data.price,
    discount : data.discount,
    quantity : data.quantity
  }
  const res = await axios.post(`${API_SERVER_HOST}/stores/products`, body, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

// 상품 수정
export const updateProduct = async (productId, data) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.patch(`${API_SERVER_HOST}/stores/products/${productId}`, data, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
// export const updateProduct = async (productId, data) => {
//   const token = "Bearer " + localStorage.getItem("jwt");
//   const body = {
//     productName : data.productName,
//     info : data.info,
//     realPrice : data.realPrice,
//     price : data.price,
//     discount : data.discount,
//     quantity : data.quantity
//   }
//   const res = await axios.patch(`${API_SERVER_HOST}/stores/products/${productId}`, body, {
//     headers: {
//       Authorization: token,
//     },
//   });
//   return res.data;
// };

// 상품 삭제
export const deleteProduct = async (productId) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.delete(`${API_SERVER_HOST}/products/${productId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

//   export const getOne = async (productId, product, userDetails) => {
//     const header = { headers: { "Content-Type": "multipart/form-data" } };
//     const res = await axios.patch(`${host}/${productId}`, product, {
//       headers: {
//         Authenthorization + getitem.
//       },
//     });
//     return res.data;
//   };





// export const getList = async (pageParam, searchValue) => {
//   const { page, size } = pageParam;
//   const res = await axios.get(`${host}`, {
//     params: { page, size },
//   });
//   return res.data.data;
// };


// export const getList = async ({ page, size }) => {
//     const response = await apiClient.get(`${API_SERVER_HOST}/products`, {
//       params: {
//         page,
//         size,
//       },
//     });
//     return response.data.data;
//   };
// export const getOne = async (productId) => {
//   const res = await axios.get(`${host}/${productId}`);
//   return res.data;
// };



// export const deleteOne = async (productId, userDetails) => {
//   const res = await axios.delete(`${host}/${productId}`, {
//     headers: {
//       Authorization: `Bearer ${userDetails.accessToken}`,
//     },
//   });
//   return res.data;
// };
