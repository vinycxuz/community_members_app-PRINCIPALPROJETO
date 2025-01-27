import axios  from 'axios';

const URL = 'http://localhost:3000/api/earnings';


export const getEarnings = async () => {
    const earnings = await axios.get(URL);
    return earnings.data;
}

