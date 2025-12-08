import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logOut } from '../../Redux/Slice/AuthSlice'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Appointment', to: '/appointment' },
  { label: 'Contact', to: '/contact', isHash: true }
]

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  const baseLinkClass =
    'group relative inline-flex items-center text-xs font-semibold uppercase tracking-[0.22em] transition'

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <div
        className='pointer-events-none absolute inset-x-6 top-3 h-28 rounded-full bg-gradient-to-r from-lime-400/20 via-teal-300/10 to-transparent blur-3xl md:inset-x-10'
        aria-hidden='true'
      />
      <div className='mx-auto max-w-7xl  pt-4'>
        <div className='relative overflow-visible rounded-2xl border border-white/10 bg-gradient-to-r from-[#052823] via-[#0b3a32] to-[#0f5247] text-white  '>
          <div
            className='pointer-events-none absolute -left-16 -top-12 h-36 w-36 rounded-full bg-lime-400/15 blur-3xl'
            aria-hidden='true'
          />
          <div
            className='pointer-events-none absolute -right-12 top-6 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl'
            aria-hidden='true'
          />

          <div className='relative flex items-center gap-4 px-4 py-3 md:px-6'>
            <Link
              to='/'
              className='flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-white/30 text-lg font-black uppercase text-lime-200 shadow-inner shadow-white/10 ring-1 ring-white/15'>
                <img src='../../../public/doc_house_logo.jpg'/>
              </span>
              <span className='flex flex-col'>
                <span className='text-sm font-semibold leading-tight tracking-[0.18em] uppercase'>
                  Doc House
                </span>
                <span className='text-xs font-medium text-white/60'>Care without the wait</span>
              </span>
            </Link>

            <div className='hidden flex-1 items-center justify-center gap-8 md:flex'>
              {navLinks.map(link =>
                link.isHash ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`${baseLinkClass} text-white/70 hover:text-white`}
                  >
                    <span className='pr-1'>{link.label}</span>
                    <span className='pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-lime-400 transition duration-200 group-hover:scale-x-100' />
                  </Link>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `${baseLinkClass} ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className='pr-1'>{link.label}</span>
                        <span
                          className={`pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full origin-left bg-lime-400 transition duration-200 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>

            <div className='ml-auto flex items-center gap-3'>
              {/* <Link
                to='/appointment'
                className='hidden items-center gap-2 rounded-xl bg-lime-400/90 px-4 py-2 text-sm font-semibold text-[#05302A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60 sm:inline-flex'
              >
                <svg
                  className='size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M5 12h14' />
                  <path d='m12 5 7 7-7 7' />
                </svg>
                Book a visit
              </Link> */}

              <div className='relative'>
                {user ? (
                  <>
                    <button
                      type='button'
                      onClick={() => setProfileOpen(open => !open)}
                      className='group flex items-center gap-3 rounded-2xl bg-white/10 px-2 py-1 pl-1 text-left text-white shadow-inner shadow-black/10 ring-1 ring-white/15 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
                      aria-expanded={profileOpen}
                    >
                      <span className='relative inline-flex size-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-sm font-semibold uppercase text-lime-200 ring-1 ring-white/15'>
                        <img
                          className='h-full w-full object-cover'
                          src={`
                              ${user?.image ? user?.image : 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'}
                            `}
                          alt='User avatar'
                        />
                      </span>
                      <span className='hidden sm:flex flex-col text-left leading-tight'>
                        <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50'>
                          Signed in
                        </span>
                        <span className='text-sm font-semibold text-white'>Welcome back</span>
                      </span>
                      <svg
                        className='size-4 text-white/60 transition group-hover:text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                      >
                        <path d='m7 10 5 5 5-5' />
                      </svg>
                    </button>

                    {profileOpen && (
                      <div className='absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#0a332d] p-3 shadow-2xl shadow-black/30 backdrop-blur z-30'>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            <Link
                              to='/profile'
                              className='flex items-center justify-between rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
                            >
                              Profile
                              <span className='text-[10px] text-white/40'>View</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='/settings'
                              className='flex items-center justify-between rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
                            >
                              Settings
                              <span className='text-[10px] text-white/40'>Preferences</span>
                            </Link>
                          </li>
                          <li>
                            <button
                              type='button'
                              onClick={() => dispatch(logOut())}
                              className='flex w-full items-center justify-between rounded-xl px-3 py-2 text-red-300 transition hover:bg-red-500/10 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70'
                            >
                              Logout
                              <span className='text-[10px] text-red-200/70'>See you soon</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to='/login'
                    className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
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
                      aria-hidden='true'
                    >
                      <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
                      <path d='m10 17 5-5-5-5' />
                      <path d='M15 12H3' />
                    </svg>
                    Sign in
                  </Link>
                )}
              </div>

              <button
                type='button'
                className='inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 md:hidden'
                aria-expanded={mobileOpen}
                onClick={() => {
                  setMobileOpen(open => !open)
                  setProfileOpen(false)
                }}
              >
                {mobileOpen ? (
                  <svg
                    className='size-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M18 6 6 18' />
                    <path d='m6 6 12 12' />
                  </svg>
                ) : (
                  <svg
                    className='size-5'
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
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className='relative border-t border-white/10 px-4 pb-4 pt-3 md:hidden'>
              <div className='flex flex-col gap-3'>
                {navLinks.map(link =>
                  link.isHash ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className='group relative inline-flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:bg-white/10 hover:text-white'
                    >
                      {link.label}
                      <span className='h-1 w-6 rounded-full bg-lime-400/80 transition group-hover:w-10' />
                    </Link>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `group relative inline-flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                          isActive
                            ? 'bg-white/15 text-white shadow-inner shadow-white/10'
                            : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <span
                            className={`h-1 rounded-full transition ${
                              isActive ? 'w-10 bg-lime-400' : 'w-6 bg-white/30 group-hover:w-10'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  )
                )}

                <Link
                  to='/appointment'
                  onClick={() => setMobileOpen(false)}
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-3 py-2 text-sm font-semibold text-[#05302A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60'
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
                  Book a visit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
