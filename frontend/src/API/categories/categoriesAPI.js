import axios  from 'axios';

const URL = 'http://localhost:3000/api/category/create';

export const createCategory = async (category) => {
    console.log(category);
    const response = await axios.post(URL, category,
    {
      withCredentials: true
    });
    return response.data;    
}

export const getCategory = async () => {
    const categories = await axios.get('http://localhost:3000/api/category');
    return categories.data;
}

