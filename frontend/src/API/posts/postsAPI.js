import axios  from 'axios';

const URL = 'http://localhost:3000/api/posts';

export const createPost = async (post) => {
    console.log(post);
    const response = await axios.post(`${URL}/create`, {
      description: post.description,
      category: post.category,
    },
    {
      withCredentials: true
    });
    return response.data;    
}

export const getPosts = async (filters) => {
    const posts = await axios.get(URL,{
      params: filters
    });
    return posts.data;
}

export const getPost = async (id) => {
  const posts = await axios.get(`http://localhost:3000/api/posts/${id}`, {
    withCredentials: true
  });
  return posts.data;
}

export const updatePost = async ({post, postId}) => {
  console.log(post?.id);
  const response = await axios.put(`http://localhost:3000/api/posts/update/${postId}`, {
    description: post.description,
  },
  {
    withCredentials: true
  });
  return response.data;    
}

export const deletePost = async (id) => {
  const posts = await axios.delete(`http://localhost:3000/api/posts/delete/${id}`,{
    withCredentials: true
  });
  return posts.data;
}

export const likePost = async (postId) => {
  const response = await axios.put(`http://localhost:3000/api/posts/like/${postId}`, {},
  {
    withCredentials: true
  });
  return response.data;    
}

export const dislikePost = async (postId) => {
  const response = await axios.put(`http://localhost:3000/api/posts/dislike/${postId}`, {},
  {
    withCredentials: true
  });
  return response.data;    
}
