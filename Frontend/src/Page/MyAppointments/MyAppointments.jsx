import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Component/Loading/Loading'
import { getMyAppointments } from '../../Redux/Slice/AuthSlice'
import { CiLocationOn } from 'react-icons/ci'
import { FiMap } from 'react-icons/fi'

const statusStyles = {
  CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
  CANCELLED: 'bg-rose-100 text-rose-800 border-rose-200'
}

const MyAppointments = () => {
  const dispatch = useDispatch()
  const { myAppointments, getMyAppointmentsLoading } = useSelector(
    state => state.authSlice
  )
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    dispatch(getMyAppointments())
  }, [dispatch])

  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const appointments = myAppointments || []

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchesStatus =
        statusFilter === 'ALL' || appt.status === statusFilter
      const term = search.toLowerCase().trim()
      const matchesSearch =
        !term ||
        appt.doctor?.name?.toLowerCase().includes(term) ||
        appt.service?.name?.toLowerCase().includes(term) ||
        appt.date.includes(term)
      return matchesStatus && matchesSearch
    })
  }, [appointments, search, statusFilter])

  if (getMyAppointmentsLoading) {
    return <Loading />
  }

  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-10 pt-32'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 md:px-0'>
        <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            My appointments
          </p>
          <h1 className='mt-3 text-4xl font-semibold text-[#07332F]'>
            Your visits
          </h1>
          <p className='mt-2 max-w-3xl text-slate-600'>
            Review upcoming and past bookings. Filter by status or search by
            doctor, service, or date.
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
            {/* <input
              type='text'
              placeholder='Search by doctor, service, or date'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full rounded-xl border border-[#07332F]/15 bg-white px-4 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none md:w-80'
            /> */}
          </div>
        </div>

        <div className='grid gap-4'>
          {filteredAppointments.length ? (
            filteredAppointments.map((appt,index) => (
              <div
                key={index}
                className='rounded-2xl border border-[#07332F]/10 bg-white/95 px-5 py-4 shadow-md shadow-[#07332F]/10 backdrop-blur'
              >
                <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                  <div>
                    <p className='text-lg font-semibold text-[#07332F]'>
                      {appt.service?.name}
                    </p>
                    <p className='text-sm text-slate-600'>
                      with {appt.doctor?.name}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[appt.status] ||
                      'border-slate-200 bg-slate-100 text-slate-700'
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
                <div className='mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#07332F]'>
                  <span className='rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
                    {appt?.slot?.date}
                  </span>
                  <span className='rounded-full bg-[#07332F]/10 px-3 py-2 text-[#07332F]'>
                    {appt?.slot.startTime} - {appt?.slot.endTime}
                  </span>
                  {appt?.doctor?.address && (
                    <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[#07332F]'>
                      <CiLocationOn className='text-lg text-[#F7A582]' />
                      <span>
                        {appt?.doctor?.address?.street}, {appt?.doctor?.address?.city}{' '}
                        {appt?.doctor?.address?.state}, {appt?.doctor?.address?.country}
                      </span>
                    </span>
                  )}
                  {appt?.doctor?.address?.map && (
                    <a
                      className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/15 bg-white px-3 py-2 text-[#07332F] shadow-sm transition hover:border-[#07332F]/30 hover:bg-[#07332F]/5'
                      href={appt.doctor.address.map}
                      target='_blank'
                      rel='noreferrer'
                      title='Open location in map'
                    >
                      <FiMap className='text-lg text-[#F7A582]' />
                      <span className='text-xs font-semibold'>Open map</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-slate-600'>
              No appointments match your filters.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyAppointments
