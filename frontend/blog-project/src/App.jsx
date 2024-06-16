import { useState } from 'react'
import './App.css'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
