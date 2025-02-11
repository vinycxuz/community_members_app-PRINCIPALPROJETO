import axios  from 'axios';

const URL = 'http://localhost:3000/api';


export const getEarnings = async () => {
    const earnings = await axios.get(`${URL}/earnings`);
    return earnings.data;
}

export const getUserEarnings = async () => {
    const posts = await axios.get(`${URL}/my-earnings`,{
      withCredentials: true
    });
    return posts.data;
}

