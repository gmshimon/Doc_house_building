import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const { user, userDetails } = useSelector(state => state.authSlice)

  const profile = useMemo(() => {
    const source = userDetails || user || {}
    const address = source.address || {}
    return {
      name: source.name || source.displayName || 'User',
      email: source.email || 'Not provided',
      phone: source.phone || 'Not provided',
      role: source.role || 'USER',
      image:
        source.image ||
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&w=200&h=200&q=80',
      addressLine:
        address.line1 ||
        address.street ||
        address.addressLine ||
        address.address ||
        'No address on file',
      city: address.city || address.district || address.state || 'City not set'
    }
  }, [user, userDetails])

  const contactItems = [
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone },
    { label: 'Address', value: profile.addressLine },
    { label: 'City / Region', value: profile.city }
  ]

  return (
    <div className='min-h-screen bg-white text-gray-900 mt-20'>
      <div className='mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-emerald-700'>Profile</p>
            <h1 className='mt-1 text-3xl font-semibold leading-tight md:text-4xl'>
              Your information
            </h1>
            <p className='mt-2 text-sm text-gray-600'>
              View and maintain your Doc House account details.
            </p>
          </div>
          <Link
            to='/appointment'
            className='inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
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

        <div className='mt-8 grid gap-8 '>
          <div className='space-y-6 lg:col-span-2'>
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='flex flex-col gap-4 md:flex-row md:items-center'>
                <div className='relative size-24 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50'>
                  <img className='h-full w-full object-cover' src={profile.image} alt='Avatar' />
                  <input id='profile-photo' type='file' accept='image/*' className='hidden' />
                  <label
                    htmlFor='profile-photo'
                    className='absolute -top-2 -right-2 inline-flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-md transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
                    title='Update profile picture'
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
                      <path d='M17 3a2.828 2.828 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
                      <path d='m15 5 4 4' />
                    </svg>
                  </label>
                </div>

                <div className='flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h2 className='text-2xl font-semibold leading-tight'>{profile.name}</h2>
                    <span className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800'>
                      {profile.role}
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-gray-600'>{profile.email}</p>
                  <div className='mt-4 flex flex-wrap gap-3'>
                    <button
                      type='button'
                      className='inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
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
                      Edit profile
                    </button>
                    <button
                      type='button'
                      className='inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
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
            </div>

            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>Contact & address</h3>
                <button
                  type='button'
                  className='rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
                >
                  Edit
                </button>
              </div>
              <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                {contactItems.map(item => (
                  <div
                    key={item.label}
                    className='rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800'
                  >
                    <p className='text-xs font-semibold uppercase text-gray-500'>{item.label}</p>
                    <p className='mt-1 font-semibold text-gray-900'>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
