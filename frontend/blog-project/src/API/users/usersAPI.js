import axios from 'axios';

export const registerAPI = async (userData) => {
  const response = await axios.post('http://localhost:3000/user/register', {
    username: userData?.username,
    email: userData?.email,
    password: userData?.password
  },{
    withCredentials: true
  });

  return response.data;
}

export const loginAPI = async (userData) => {
  const response = await axios.post('http://localhost:3000/user/login', {
    email: userData?.email,
    password: userData?.password
  },{
    withCredentials: true
  });

  return response.data;
}

export const checkAuthStatusAPI = async () => {
  const response = await axios.get('http://localhost:3000/user/check-authenticated', {
    withCredentials: true
  });
  return response.data;
}