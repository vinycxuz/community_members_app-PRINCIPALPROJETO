import axios  from 'axios';

export const createPosts = async (post) => {
    try {
        const response = await axios.post('http://localhost:5000/posts', post);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}