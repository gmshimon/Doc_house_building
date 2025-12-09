import React, { useMemo, useState } from 'react'

const sampleAppointments = [
  {
    id: 1,
    doctorName: 'Dr. Ruby Perrin',
    serviceName: 'General Consultation',
    date: '2025-12-08',
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    status: 'CONFIRMED',
    location: 'Dhanmondi Clinic'
  },
  {
    id: 2,
    doctorName: 'Dr. Samuel Hossain',
    serviceName: 'Cardio Consultation',
    date: '2025-12-10',
    startTime: '09:00 AM',
    endTime: '09:45 AM',
    status: 'PENDING',
    location: 'Gulshan Clinic'
  },
  {
    id: 3,
    doctorName: 'Dr. Sarah Rahman',
    serviceName: 'Dental Checkup',
    date: '2025-12-12',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    status: 'CANCELLED',
    location: 'Banani Dental'
  }
]

const statusStyles = {
  CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
  CANCELLED: 'bg-rose-100 text-rose-800 border-rose-200'
}

const MyAppointments = () => {
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filteredAppointments = useMemo(() => {
    return sampleAppointments.filter(appt => {
      const matchesStatus = statusFilter === 'ALL' || appt.status === statusFilter
      const term = search.toLowerCase().trim()
      const matchesSearch =
        !term ||
        appt.doctorName.toLowerCase().includes(term) ||
        appt.serviceName.toLowerCase().includes(term) ||
        appt.date.includes(term)
      return matchesStatus && matchesSearch
    })
  }, [search, statusFilter])

  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] py-10'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 md:px-0'>
        <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            My appointments
          </p>
          <h1 className='mt-3 text-4xl font-semibold text-[#07332F]'>Your visits</h1>
          <p className='mt-2 max-w-3xl text-slate-600'>
            Review upcoming and past bookings. Filter by status or search by doctor, service, or date.
          </p>

          <div className='mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-2'>
              {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(status => (
                <button
                  key={status}
                  type='button'
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    statusFilter === status
                      ? 'border-transparent bg-[#07332F] text-white shadow-md shadow-[#07332F]/15'
                      : 'border-[#07332F]/15 bg-white text-[#07332F] hover:border-[#07332F]/30'
                  }`}
                >
                  {status === 'ALL' ? 'All' : status}
                </button>
              ))}
            </div>
            <input
              type='text'
              placeholder='Search by doctor, service, or date'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full rounded-xl border border-[#07332F]/15 bg-white px-4 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none md:w-80'
            />
          </div>
        </div>

        <div className='grid gap-4'>
          {filteredAppointments.length ? (
            filteredAppointments.map(appt => (
              <div
                key={appt.id}
                className='rounded-2xl border border-[#07332F]/10 bg-white/95 px-5 py-4 shadow-md shadow-[#07332F]/10 backdrop-blur'
              >
                <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                  <div>
                    <p className='text-lg font-semibold text-[#07332F]'>{appt.serviceName}</p>
                    <p className='text-sm text-slate-600'>with {appt.doctorName}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[appt.status] || 'border-slate-200 bg-slate-100 text-slate-700'}`}
                  >
                    {appt.status}
                  </span>
                </div>
                <div className='mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#07332F]'>
                  <span className='rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
                    {appt.date}
                  </span>
                  <span className='rounded-full bg-[#07332F]/10 px-3 py-2 text-[#07332F]'>
                    {appt.startTime} - {appt.endTime}
                  </span>
                  <span className='rounded-full bg-slate-100 px-3 py-2 text-[#07332F]'>
                    {appt.location}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-slate-600'>No appointments match your filters.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyAppointments
