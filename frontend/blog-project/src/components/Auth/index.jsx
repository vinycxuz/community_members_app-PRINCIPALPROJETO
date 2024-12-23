import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../API/users/usersAPI';
import { Navigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const AuthRoute = ({ children }) => {
  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });
  console.log(data)

  if (isLoading) 
    return (
      <div className="flex flex-col items-center justify-center h-36 bg-white">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="mt-4 text-lg text-gray-900">
          Loading...
        </p>
      </div>
    )
  
  if(!data)
    return <Navigate to='/user-login' />
   
  return children
};

export default AuthRoute;