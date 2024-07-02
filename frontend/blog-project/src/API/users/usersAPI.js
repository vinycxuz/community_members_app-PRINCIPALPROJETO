import axios from 'axios';

export const register = async (userData) => {
  const response = await axios.post('http://localhost:3000/api/users/register', {
    username: userData?.username,
    email: userData?.email,
    password: userData?.password
  },{
    withCredentials: true
  });

  return response.data;
}