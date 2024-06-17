import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { deletePost, getPosts } from '../../../API/posts/postsAPI';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['list-Posts'],
    queryFn: getPosts,
  });

  const postMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost,
  });

  const deleteHandler = async (id) => {
    postMutation.mutateAsync(id)
    .then(() => {
      refetch();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts</p>}  
      {error && <p>Error</p>}
    {data && data.map((post) => (
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <Link to={`/posts/${post?._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={()=> deleteHandler(post._id)}>Delete</button>
      </div>
    ))}
    </div>
  );
};

export default PostsList;