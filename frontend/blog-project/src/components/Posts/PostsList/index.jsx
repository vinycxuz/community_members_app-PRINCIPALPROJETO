import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../../API/posts/postsAPI';

const PostsList = () => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['list-Posts'],
    queryFn: getPosts,
  })
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts</p>}  
      {error && <p>Error</p>}
    {data && data.map((post) => (
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    ))}
    </div>
  );
};

export default PostsList;