import React, { useEffect, useState } from 'react'
import { CreditCard, Timer, Users, X } from 'lucide-react'

const blankForm = {
  name: '',
  duration: 0,
  fee: '',
  doctorIds: []
}

const EditServiceModal = ({
  open,
  service = null,
  onClose,
  onSubmit,
  doctorOptions = []
}) => {
  const [form, setForm] = useState(blankForm)

  useEffect(() => {
    if (open && service) {
      setForm({
        name: service.name || '',
        duration: service.duration || 0,
        fee: service.fee ?? '',
        doctorIds: (service.doctors || []).map(
          doctor => doctor.id ?? doctor._id ?? doctor.email ?? doctor.name ?? doctor
        )
      })
    }
  }, [open, service])

  if (!open || !service) return null

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDoctorChange = event => {
    const selected = Array.from(event.target.selectedOptions).map(
      option => option.value
    )
    setForm(prev => ({ ...prev, doctorIds: selected }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const payload = {
      id: service.id,
      name: form.name.trim(),
      duration: Number(form.duration) || 0,
      fee: form.fee === '' ? null : Number(form.fee),
      doctorIds: form.doctorIds
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
              Edit service
            </p>
            <h2 className='text-xl font-semibold text-gray-900'>
              Update appointment type
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
          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Service name</label>
            <input
              required
              name='name'
              value={form.name}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-1'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                <Timer size={14} />
                Duration (minutes)
              </label>
              <input
                type='number'
                min='0'
                name='duration'
                value={form.duration}
                onChange={handleChange}
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
            <div className='space-y-1'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                <CreditCard size={14} />
                Fee (optional)
              </label>
              <input
                type='number'
                min='0'
                name='fee'
                value={form.fee}
                onChange={handleChange}
                className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              />
            </div>
          </div>

          <div className='space-y-1'>
            <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
              <Users size={14} />
              Assign doctors
            </label>
            <select
              multiple
              value={form.doctorIds}
              onChange={handleDoctorChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            >
              {doctorOptions.length ? (
                doctorOptions.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))
              ) : (
                <option disabled value=''>
                  No doctors available
                </option>
              )}
            </select>
            <p className='text-xs text-gray-500'>
              Hold Ctrl/Cmd to select multiple doctors.
            </p>
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

export default EditServiceModal
