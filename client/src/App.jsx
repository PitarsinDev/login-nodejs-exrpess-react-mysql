import { useState } from 'react'
import './App.css'

import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-center p-10'>
        Login Nodejs React
        </h1>
      </div>
      <div className='flex justify-center'>
        <a href="/login" className='bg-indigo-600 px-5 py-1 rounded-full shadow-md'>
          Login
        </a>
      </div>
    </>
  )
}

export default App
