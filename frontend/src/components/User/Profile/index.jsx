import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../../API/users/usersAPI';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../../../redux/slices/authSlices';

const Profile = () => {

  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });
  console.log(data)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data])

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;