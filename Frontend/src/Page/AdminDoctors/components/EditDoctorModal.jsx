import React, { useEffect, useState } from 'react'
import { Mail, Phone, User, X } from 'lucide-react'

const blankForm = {
  name: '',
  email: '',
  phone: '',
  title: '',
  specialtiesText: '',
  image: ''
}

const EditDoctorModal = ({ open, doctor = null, onClose, onSubmit }) => {
  const [form, setForm] = useState(blankForm)

  useEffect(() => {
    if (open && doctor) {
      setForm({
        name: doctor.name || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        title: doctor.title || '',
        specialtiesText: (doctor.specialties || []).join(', '),
        image: doctor.image || doctor.avatar || ''
      })
    }
  }, [open, doctor])

  if (!open || !doctor) return null

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const payload = {
      id: doctor.id,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      title: form.title.trim(),
      image: form.image.trim(),
      specialties: form.specialtiesText
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
    }
    if (onSubmit) {
      onSubmit(payload)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='w-full max-w-lg rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#07332F]'>
              Edit doctor
            </p>
            <h2 className='text-xl font-semibold text-gray-900'>
              Update profile
            </h2>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 px-6 py-5'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-1'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                <User size={14} />
                Name
              </label>
              <input
                required
                name='name'
                value={form.name}
                onChange={handleChange}
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-sm font-semibold text-gray-800'>Title</label>
              <input
                name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='e.g. Cardiologist'
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-1'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                <Mail size={14} />
                Email
              </label>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
            <div className='space-y-1'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                <Phone size={14} />
                Phone
              </label>
              <input
                name='phone'
                value={form.phone}
                onChange={handleChange}
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Specialties</label>
            <textarea
              name='specialtiesText'
              value={form.specialtiesText}
              onChange={handleChange}
              placeholder='Comma separated, e.g. Cardiology, Neurology'
              rows={2}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Image URL</label>
            <input
              name='image'
              value={form.image}
              onChange={handleChange}
              placeholder='https://...'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>

          <div className='flex items-center justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/15'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-xl bg-[#07332F] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/40'
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditDoctorModal
