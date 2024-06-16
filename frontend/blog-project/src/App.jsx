import { useState } from 'react'
import './App.css'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CreatePost />
     <PostsList />
    </>
  )
}

export default App
