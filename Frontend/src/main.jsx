import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/Routes.jsx'
import "preline/preline";

createRoot(document.getElementById('root')).render(
  <div>
    <RouterProvider router={router} />
  </div>,
)
