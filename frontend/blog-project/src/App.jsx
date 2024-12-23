import './App.css'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isAuthenticated } from './redux/slices/authSlices'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatusAPI } from './API/users/usersAPI'

import NavBar from './components/NavBar'
import PrivateNavbar from './components/NavBar/Private'
import UpdatePost from './components/Posts/UpdatePost'
import PostDetails from './components/Posts/PostDetails'
import Login from './components/User/Login'
import Register from './components/User/Register'
import Profile from './components/User/Profile'
import AuthRoute from './components/Auth'

function App() {
  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });
  console.log(data)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data])

  const { userAuth } = useSelector((state) => state.auth)
  console.log(userAuth)

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <NavBar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/list-posts/" />
        {/* <Route element={<UpdatePost />} path="/posts/:id" /> */}
        <Route element={<PostDetails />} path="/posts/:id" />
        <Route element={<Login />} path="/user-login" />
        <Route element={<Register />} path="/user-register" />
        <Route element={<AuthRoute>
                          <Profile />
                        </AuthRoute>} path="/profile" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
