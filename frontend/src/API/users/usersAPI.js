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

export const logoutAPI = async (userData) => {
  const response = await axios.post('http://localhost:3000/user/logout', {
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

export const getUsersAPI = async () => {
  const response = await axios.get('http://localhost:3000/user/profile', {
    withCredentials: true
  });
  return response.data;
}

export const userFollowAPI = async (userId) => {
  const response = await axios.put(`http://localhost:3000/user/follow/${userId}`, {}, {
    withCredentials: true
  });
  return response.data;
}

export const userUnfollowAPI = async (userId) => {
  const response = await axios.put(`http://localhost:3000/user/unfollow/${userId}`, {},{
    withCredentials: true
  });
  return response.data;
}

export const sendEmailVerificationTokenAPI = async () => {
  const response = await axios.put('http://localhost:3000/user/email-verification', {}, {
    withCredentials: true
  });
  return response.data;
}

export const verifyUserAccountAPI = async (verifyToken) => {
  const response = await axios.put(`http://localhost:3000/user/user-verification/${verifyToken}`, {}, {
    withCredentials: true
  });
  return response.data;
}
