import { useState } from 'react'
import './App.css'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import PostDetails from './components/Posts/PostDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/list-post" />
        <Route element={<PostDetails />} path="/post/:id" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
