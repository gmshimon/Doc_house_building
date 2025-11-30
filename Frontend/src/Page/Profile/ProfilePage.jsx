import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const { user, userDetails } = useSelector(state => state.authSlice)

  const profile = useMemo(() => {
    const source = userDetails || user || {}
    return {
      name: source.name || source.displayName || 'Guest User',
      email: source.email || 'Not provided',
      phone: source.phone || '+880 0000 000 000',
      role: source.role || 'Patient',
      membership: source.membership || 'Standard',
      city: source.city || 'Dhaka, Bangladesh'
    }
  }, [user, userDetails])

  const stats = [
    { label: 'Next visit', value: 'Aug 24', helper: 'With Dr. Patel' },
    { label: 'Total visits', value: '12', helper: 'Past 12 months' },
    { label: 'Care team', value: '3', helper: 'Doctors on file' }
  ]

  const timeline = [
    { title: 'Follow-up consultation', time: 'Aug 24, 9:30 AM', status: 'Scheduled' },
    { title: 'Lab work review', time: 'Jul 12, 4:00 PM', status: 'Completed' },
    { title: 'Cardio screening', time: 'Jun 03, 11:00 AM', status: 'Completed' }
  ]

  const preferences = ['Video visits', 'SMS reminders', 'Digital prescriptions']

  return (
    <div className='relative isolate overflow-hidden bg-[#041F1B] text-white'>
      <div
        className='pointer-events-none absolute inset-x-10 top-16 h-64 rounded-full bg-gradient-to-r from-lime-400/20 via-emerald-300/10 to-transparent blur-3xl'
        aria-hidden='true'
      />
      <div className='pointer-events-none absolute -right-24 top-32 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl' />
      <div className='pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-lime-500/10 blur-3xl' />

      <div className='mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.25em] text-white/60'>
              Profile
            </p>
            <h1 className='mt-1 text-3xl font-semibold leading-tight md:text-4xl'>
              Your care, in one place.
            </h1>
            <p className='mt-2 text-sm text-white/70'>
              Manage your details, preferences, and upcoming visits without leaving this page.
            </p>
          </div>
          <Link
            to='/appointment'
            className='inline-flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2 text-sm font-semibold text-[#05302A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/70'
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

        <div className='mt-8 grid gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25 backdrop-blur'>
              <div
                className='pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/5 blur-3xl'
                aria-hidden='true'
              />
              <div className='flex flex-col gap-4 md:flex-row md:items-center'>
                <div className='relative size-20 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-inner shadow-white/10'>
                  <img
                    className='h-full w-full object-cover'
                    src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&w=200&h=200&q=80'
                    alt='Profile avatar'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h2 className='text-2xl font-semibold leading-tight'>{profile.name}</h2>
                    <span className='rounded-full border border-lime-400/40 bg-lime-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-lime-100'>
                      {profile.role}
                    </span>
                    <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70'>
                      {profile.membership} plan
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-white/70'>{profile.city}</p>
                  <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80'>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                        Email
                      </p>
                      <p className='mt-1 break-all font-semibold'>{profile.email}</p>
                    </div>
                    <div className='rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80'>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                        Phone
                      </p>
                      <p className='mt-1 font-semibold'>{profile.phone}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
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
                    Edit details
                  </button>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
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
                      <path d='M3 12h18' />
                      <path d='m15 5 7 7-7 7' />
                    </svg>
                    Update password
                  </button>
                </div>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-3'>
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-lg shadow-black/15'
                >
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                    {stat.label}
                  </p>
                  <p className='mt-2 text-2xl font-semibold'>{stat.value}</p>
                  <p className='text-sm text-white/70'>{stat.helper}</p>
                </div>
              ))}
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur'>
              <div className='flex items-center justify-between gap-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                    Care timeline
                  </p>
                  <p className='text-lg font-semibold'>Upcoming & recent</p>
                </div>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
                >
                  View all
                </button>
              </div>
              <div className='mt-4 space-y-3'>
                {timeline.map(item => (
                  <div
                    key={item.title}
                    className='flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/10'
                  >
                    <div>
                      <p className='text-sm font-semibold'>{item.title}</p>
                      <p className='text-xs text-white/60'>{item.time}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                        item.status === 'Scheduled'
                          ? 'border border-lime-400/40 bg-lime-400/10 text-lime-50'
                          : 'border border-white/15 bg-white/5 text-white/70'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/25 backdrop-blur'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                Care preferences
              </p>
              <p className='mt-1 text-lg font-semibold'>How you like to be cared for</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {preferences.map(pref => (
                  <span
                    key={pref}
                    className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80'
                  >
                    <span className='size-2 rounded-full bg-lime-400' />
                    {pref}
                  </span>
                ))}
              </div>
              <button
                type='button'
                className='mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70'
              >
                Edit preferences
              </button>
            </div>

            <div className='rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                Emergency contact
              </p>
              <p className='mt-2 text-lg font-semibold'>Keeps you safe, always</p>
              <div className='mt-4 space-y-2 text-sm text-white/80'>
                <p className='font-semibold'>Aisha Rahman</p>
                <p>+880 1780 000 000</p>
                <p>Sibling · Dhaka</p>
              </div>
              <button
                type='button'
                className='mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#05302A] shadow-lg shadow-lime-500/30 transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/70'
              >
                Update contact
              </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
