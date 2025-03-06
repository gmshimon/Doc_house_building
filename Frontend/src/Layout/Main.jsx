import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'

const Main = () => {
  return (
    <div className=''>
      {/* Overlapping Navbar */}
      <Navbar />

      {/* Outlet (Banner, etc.) starts behind or just below the navbar */}
      <Outlet />
    </div>
  )
}

export default Main
