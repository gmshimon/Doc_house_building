import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import HomePage from '../Page/HomePage/HomePage'
import LoginPage from '../Page/LoginPage/LoginPage'
import RegisterPage from '../Page/RegisterPage/RegisterPage'
import AppointmentPage from '../Page/AppointmentPage/AppointmentPage'
import DoctorProfilePage from '../Page/DoctorProfilePage/DoctorProfilePage'
import ProfilePage from '../Page/Profile/ProfilePage'
import ContactPage from '../Page/ContactPage/ContactPage'
import AvailableSlotsPage from '../Page/AvailableSlotsPage/AvailableSlotsPage'
import ServicesPage from '../Page/ServicesPage/ServicesPage'
import MyAppointments from '../Page/MyAppointments/MyAppointments'
import Dashboard from '../Layout/Dashboard'
import AdminDashboard from '../Page/AdminDashboard/AdminDashboard'
import AdminUserDashboard from '../Page/AdminUserDashboard/AdminUserDashboard'
import AdminAddDoctor from '../Page/AdminAddDoctor/AdminAddDoctor'
import AdminServices from '../Page/AdminServices/AdminServices'
import AdminDoctors from '../Page/AdminDoctors/AdminDoctors'
import EditDoctor from '../Page/AdminDoctors/EditDoctor'
import DoctorsPage from '../Page/DoctorsPage/DoctorsPage'

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
                path:'/profile',
                element:<ProfilePage/>
            },
            {
                path:'/doctor-profile/:id',
                element:<DoctorProfilePage/>
            },
            {
                path:'/contact',
                element:<ContactPage/>
            },
            {
                path:'/available-slots',
                element:<AvailableSlotsPage/>
            },
            {
                path:'/services',
                element:<ServicesPage/>
            },
            {
                path:'/my-appointments',
                element:<MyAppointments/>
            },
            {
                path:'/doctors',
                element:<DoctorsPage/>
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
            },
            {
                path:'admin-user',
                element:<AdminUserDashboard/>
            },
            {
                path:'add-doctor',
                element:<AdminAddDoctor/>
            },
            {
                path:'services',
                element:<AdminServices/>
            },
            {
                path:'doctors',
                element:<AdminDoctors/>
            },
            {
                path:'doctors/:id/edit',
                element:<EditDoctor/>
            }
        ]
    }
])
