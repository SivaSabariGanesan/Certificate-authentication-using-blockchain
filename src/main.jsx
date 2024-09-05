import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.jsx'
import Verifier from './verifier.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <App></App>,
    path: "/"
  },
  {
    element: <Verifier></Verifier>,
    path: "/verify/:iddd"
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
