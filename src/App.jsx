import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Navbar from './components/Navbar';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Home from './components/Home';

const router = createBrowserRouter(
  [
    {

      path: "/",
      element :
      <div>
        <Navbar />
        <Home />

      </div>
    },
    {
      path: "/pastes",
      element :
      <div>
        <Navbar />
        <Paste/>
        
      </div>
    },
    {
      path: "/pastes/:id",
      element :
      <div>
        <Navbar />
        <ViewPaste/>
        
      </div>
    },
  ]
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}/>
     
    </div>
  )
}

export default App
