import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import HomePage from '../Page/HomePage/HomePage'
import LoginPage from '../Page/LoginPage/LoginPage'
import RegisterPage from '../Page/RegisterPage/RegisterPage'
import AppointmentPage from '../Page/AppointmentPage/AppointmentPage'
import DoctorProfilePage from '../Page/DoctorProfilePage/DoctorProfilePage'
import Dashboard from '../Layout/Dashboard'
import AdminDashboard from '../Page/AdminDashboard/AdminDashboard'

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
                path:'/appointment',
                element:<AppointmentPage/>
            },
            {
                path:'/login',
                element:<LoginPage/>
            },
            {
                path:'register',
                element:<RegisterPage/>
            },
            {
                path:'/doctor-profile/:id',
                element:<DoctorProfilePage/>
            }
        ]
    },
    {
        path:'dashboard/',
        element:<Dashboard/>,
        children:[
            {
                path:'admin-dashboard',
                element:<AdminDashboard/>
            }
        ]
    }
])