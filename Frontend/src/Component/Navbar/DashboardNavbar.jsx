import { BriefcaseMedical, User } from 'lucide-react'
import React from 'react'
import { FaDocker } from 'react-icons/fa6'
import { MdDashboard } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const navSections = [
  {
    heading: 'Overview',
    items: [
      {
        label: 'Dashboard',
        helper: 'Live KPIs & reports',
        to: '/dashboard/admin-dashboard',
        icon: (
          <MdDashboard size={24}/>
        )
      }
    ]
  },
  {
    heading: 'Manage',
    items: [
      {
        label: 'Patients & Users',
        helper: 'Profiles & access',
        to: '/dashboard/admin-user',
        icon: (
          <User/>
        )
      },
      {
        label: 'Add Doctor',
        helper: 'Invite specialists',
        to: '/dashboard/add-doctor',
        icon: (
         <BriefcaseMedical />
        )
      }
    ]
  }
]

const DashboardNavbar = () => {
  const baseLinkClass =
    'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200'
  const activeLinkClass =
    'text-white bg-white/10 shadow-lg shadow-black/10 before:absolute before:-left-3 before:top-1/2 before:h-9 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-lime-400 before:content-[""] after:absolute after:-left-3 after:top-1/2 after:h-9 after:w-1 after:-translate-y-1/2 after:animate-pulse after:rounded-full after:bg-lime-400/40 after:content-[""]'
  const inactiveLinkClass =
    'text-white/70 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60'

  return (
    <aside className='relative hidden h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-[#052823] text-white md:flex'>
      <div className='pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-lime-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -right-24 bottom-24 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl' />

      <div className='flex flex-1 flex-col overflow-y-auto px-6 py-8 mt-10'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold tracking-wide text-lime-300 shadow-inner shadow-white/10'>
              DH
            </div>
            <div>
              <p className='text-lg font-semibold leading-tight'>Doc House</p>
              <p className='text-xs font-medium uppercase tracking-[0.25em] text-white/40'>
                Admin / Care
              </p>
            </div>
          </div>
          <button
            type='button'
            className='inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:text-white hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 md:hidden'
            aria-label='Toggle sidebar'
          >
            <svg
              className='size-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M4 6h16' />
              <path d='M4 12h16' />
              <path d='M4 18h16' />
            </svg>
          </button>
        </div>

        <div className='mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-white/5'>
          <p className='text-sm font-semibold text-white'>Today&apos;s focus</p>
          <p className='mt-1 text-xs text-white/60'>
            3 new consultations waiting for approval. Keep your queue healthy.
          </p>
          <button
            type='button'
            className='mt-4 inline-flex items-center gap-2 rounded-xl bg-lime-400/90 px-3 py-2 text-xs font-semibold text-[#062E2A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/70'
          >
            <svg
              className='size-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M12 5v14' />
              <path d='M5 12h14' />
            </svg>
            Create quick task
          </button>
        </div>

        <div className='mt-8 space-y-7'>
          {navSections.map(section => (
            <div key={section.heading}>
              <p className='px-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40'>
                {section.heading}
              </p>
              <nav className='mt-3 space-y-2'>
                {section.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                    }
                    end={item.to.endsWith('admin-dashboard')}
                  >
                    <span
                      className='flex size-10 items-center justify-center rounded-xl bg-white/5 text-lime-200 transition group-hover:bg-white/10 group-hover:text-lime-100'
                      aria-hidden='true'
                    >
                      {item.icon}
                    </span>
                    <span className='flex flex-col'>
                      <span className='text-sm font-semibold'>{item.label}</span>
                      <span className='text-xs font-medium text-white/50'>{item.helper}</span>
                    </span>
                    <svg
                      className='ms-auto size-4 text-white/30 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      aria-hidden='true'
                    >
                      <path d='m9 6 6 6-6 6' />
                    </svg>
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-white/10 px-6 py-6'>
        <div className='rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-black/20'>
          <div className='flex items-center gap-3'>
            <img
              className='size-10 rounded-full object-cover'
              src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&w=120&h=120&q=80'
              alt='Admin avatar'
            />
            <div className='flex-1'>
              <p className='text-sm font-semibold text-white'>Mia Hudson</p>
              {/* <p className='text-xs text-white/60'>Product Manager</p> */}
            </div>
            <button
              type='button'
              className='inline-flex size-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60'
              aria-label='Open profile menu'
            >
              <svg
                className='size-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m7 10 5 5 5-5' />
              </svg>
            </button>
          </div>
          <div className='mt-4 grid grid-cols-2 gap-2'>
            <button
              type='button'
              className='h-10 rounded-xl border border-white/15 bg-white/10 text-xs font-semibold text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60'
            >
              View profile
            </button>
            <button
              type='button'
              className='h-10 rounded-xl bg-lime-400/90 text-xs font-semibold text-[#062E2A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/70'
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DashboardNavbar
