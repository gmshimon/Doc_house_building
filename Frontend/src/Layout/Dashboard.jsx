
import React, { useState } from 'react'
import DashboardNavbar from '../Component/Navbar/DashboardNavbar'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className='md:flex'>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/40 md:hidden'
          onClick={closeSidebar}
          aria-hidden='true'
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 md:static md:inset-auto md:block md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <DashboardNavbar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>

      <div className='flex-1 h-screen overflow-y-auto'>
        <header className='fixed top-0 left-0 z-50 flex flex-wrap md:hidden lg:justify-start lg:flex-nowrap w-full py-3 bg-[#07332F]'>
          <nav className='relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto'>
            <div className='flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3'>
              <div className='lg:hidden ml-1'>
                <button
                  type='button'
                  className='size-10 flex justify-center items-center text-lg font-semibold rounded-xl border border-gray-200 text-white hover:bg-gray-800 focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none'
                  aria-expanded={isSidebarOpen}
                  aria-controls='dashboard-mobile-sidebar'
                  aria-label='Toggle navigation'
                  onClick={toggleSidebar}
                >
                  <svg
                    className={`${isSidebarOpen ? 'hidden' : 'block'} shrink-0 size-4`}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='3' x2='21' y1='6' y2='6' />
                    <line x1='3' x2='21' y1='12' y2='12' />
                    <line x1='3' x2='21' y1='18' y2='18' />
                  </svg>
                  <svg
                    className={`${isSidebarOpen ? 'block' : 'hidden'} shrink-0 size-4`}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M18 6 6 18' />
                    <path d='m6 6 12 12' />
                  </svg>
                </button>
              </div>
            </div>
            <div
              id='hs-navbar-hcail'
              className='hidden overflow-hidden transition-all duration-300 basis-full pl-10 bg-white grow md:bg-transparent lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6'
              aria-labelledby='hs-navbar-hcail-collapse'
            >
              <div className='lg:hidden flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0'>
                <div>
                  <Link to='/'>
                    <p className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'>
                      Home
                    </p>
                  </Link>
                </div>
                <div>
                  <a
                    className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'
                    href='#'
                  >
                    About
                  </a>
                </div>
                <div>
                  <Link to='/appointment'>
                    <p className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'>
                      Appointment
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div
          className='md:mt-0 mt-16 bg-[#F1F5F9]'
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
