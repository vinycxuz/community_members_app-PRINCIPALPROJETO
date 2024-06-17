import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../../API/posts/postsAPI';

const PostDetails = () => {
  const { id }  = useParams();

  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => getPost(id),
  });
  console.log(data);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post</p>}
      {error && <p>Error</p>}
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetails;