import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'

const Main = () => {
  return (
    <div className=''>
      {/* Overlapping Navbar */}
      <Navbar />

      {/* Outlet (Banner, etc.) starts behind or just below the navbar */}
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Main
