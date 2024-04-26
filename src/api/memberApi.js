//memberApi.js
import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;

const host = `${API_SERVER_HOST}/auth`

export const signup = async (signupParam) => {
    const header = { headers: { "Content-Type": "application/json" } };
    const body = {
      username: signupParam.username,
      password: signupParam.password,
      role: signupParam.role,
    };
  
    const res = await axios.post(`${host}/signup`, body, header);
    return res.data;
  };

export const loginPost = async (data) => {
  const body = {
    username: data.username,
    password: data.pw
  };
  console.log(`${host}/login`)
  const res = await axios.post(`${host}/login`, body);
  console.log(res)
  const token = res.headers['authorization'].split("Bearer ")[1];
  console.log(token)
  
  if (token) {
    localStorage.setItem('jwt',token);
  }

  return res.data

}

export const signupPost = async (data) => {
  const body = {
    username : data.username,
    password: data.password,
    phoneNumber :data.phoneNumber,
    consent : data.consent

  };
  const res = await axios.post(`${host}/signup/userTest`, body);
  
  return res.data
}

export const viewUserInfo = async () => {
  const header = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.get(`${host}/mypage`, {
    headers: {
      Authorization: header,
    },
  });

  return res.data
}

export const updateUserInfo = async (updatedInfo) => {
  
  const token = "Bearer " + localStorage.getItem("jwt");
  const res = await axios.patch(`${host}/mypage`, updatedInfo,{
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

// export const loginPost = async (loginParam) => {

//   const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

//   const form = new FormData()
//   form.append('username', loginParam.username)
//   form.append('password', loginParam.password)





// }
// export const signup = async (signupParam) => {
//     const header = { headers: { "Content-Type": "application/json" } };
//     const body = {
//       username: signupParam.username,
//       password: signupParam.password,
//       role: signupParam.role,
//     };



export const login = async (loginParam) => {
  const header = { headers: { "Content-Type": "application/json" } };
  const body = {
    username: loginParam.username,
    password: loginParam.password,
  };


  const res = await axios.post(`${host}/login`, body, header);
  return res.data;
};



//로그인 할 떄 해 줘야 하느
// axios.defaults.headers.common.Authorization = res.headers['authorization']

//로그아웃할 할 때 해줘야 하는 것
// axios.defaults.headers.common.Authorization = ""


