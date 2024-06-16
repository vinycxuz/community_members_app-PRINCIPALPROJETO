import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id }  = useParams();
  return (
    <div>
      {/* Add your component content here */}
    </div>
  );
};

export default PostDetails;