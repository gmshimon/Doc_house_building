import { useEffect, useState } from 'react'

const ProfileEditModal = ({ open, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      institution: '',
      map: ''
    },
    role: ''
  })

  useEffect(() => {
    if (open) {
      setFormData({
        name: profile?.name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        address: {
          street: profile?.address?.street || '',
          city: profile?.address?.city || '',
          state: profile?.address?.state || '',
          zip: profile?.address?.zip || '',
          country: profile?.address?.country || '',
          institution: profile?.address?.institution || '',
          map: profile?.address?.map || ''
        },
        role: profile?.role || ''
      })
    }
  }, [open, profile])

  const handleChange = e => {
    const { name, value } = e.target
    const addressFields = [
      'street',
      'city',
      'state',
      'zip',
      'country',
      'institution',
      'map'
    ]
    if (addressFields.includes(name)) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave?.(formData)
  }

  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase text-gray-500'>
              Edit profile
            </p>
            <h2 className='text-xl font-semibold text-gray-900'>
              Update your details
            </h2>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
            aria-label='Close'
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
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </button>
        </div>

        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Name *
              </label>
              <input
                type='text'
                name='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Email
              </label>
              <input
                type='email'
                name='email'
                readOnly
                value={formData.email}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Phone
              </label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Role
              </label>
              <input
                type='text'
                value={formData.role}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
                disabled
              />
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Street
              </label>
              <input
                type='text'
                name='street'
                value={formData.address.street}
                onChange={handleChange}
                placeholder='e.g. Vetterstrasse'
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                City
              </label>
              <input
                type='text'
                name='city'
                placeholder='e.g. Johor'
                value={formData.address.city}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                State
              </label>
              <input
                type='text'
                name='state'
                placeholder='e.g. Johor'
                value={formData.address.state}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>ZIP</label>
              <input
                type='text'
                name='zip'
                placeholder='e.g. 90909'
                value={formData.address.zip}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Country
              </label>
              <input
                type='text'
                name='country'
                value={formData.address.country}
                placeholder='e.g. Germany'
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-600'>
                Institution
              </label>
              <input
                type='text'
                name='institution'
                value={formData.address.institution}
                placeholder='e.g. TUM'
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              />
            </div>
          </div>

          <div>
            <label className='text-xs font-semibold text-gray-600'>
              Map link (optional)
            </label>
            <input
              type='url'
              name='map'
              value={formData.address.map}
              onChange={handleChange}
              className='mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200'
              placeholder='https://maps.google.com/...'
            />
          </div>

          <div className='flex items-center justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-nonefocus-visible:ring-2 focus-visible:ring-emerald-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200'
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditModal
