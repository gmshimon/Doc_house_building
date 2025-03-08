import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import HomePage from '../Page/HomePage/HomePage'
import LoginPage from '../Page/LoginPage/LoginPage'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/login',
                element:<LoginPage/>
            }
        ]
    }
])