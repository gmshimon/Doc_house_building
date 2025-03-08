import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'

const Main = () => {
  const location = useLocation()
  const isLoginPage = location.pathname.includes("login") || location.pathname.includes("register")
  return (
    <div className=''>
      {/* Overlapping Navbar */}
      {
        isLoginPage || <Navbar/>
      }

      {/* Outlet (Banner, etc.) starts behind or just below the navbar */}
      <Outlet />
      {
        isLoginPage || <Footer/>
      }
    </div>
  )
}

export default Main
