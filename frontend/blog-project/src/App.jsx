import { useState } from 'react'
import './App.css'
import CreatePost from './components/CreatePost'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CreatePost />   
    </>
  )
}

export default App
