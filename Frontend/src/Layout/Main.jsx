import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'
import CommonBanner from '../Component/CommonBanner/CommonBanner'
import CurrentUser from '../Utilis/CurrentUser'

const Main = () => {
  const location = useLocation()
  const isLoginPage =
    location.pathname.includes('login') ||
    location.pathname.includes('register')
  const isHomePage =
    location.pathname.includes('home') || location.pathname === '/'
    CurrentUser()
  return (
    <div className=''>
      {/* Overlapping Navbar */}
      {isLoginPage || <Navbar />}
      {isHomePage ||isLoginPage || <CommonBanner />}
      {/* Outlet (Banner, etc.) starts behind or just below the navbar */}
      <Outlet />
      {isLoginPage || <Footer />}
    </div>
  )
}

export default Main
