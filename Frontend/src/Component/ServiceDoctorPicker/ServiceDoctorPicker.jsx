import React, { useEffect, useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from '../../Redux/Slice/ServiceSlice'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'

const placeholderImg =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&q=80'

const ServiceDoctorPicker = () => {
  const navigate = useNavigate()
  const { services, getServicesLoading } = useSelector(state => state.services)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])
  const selectedService = useMemo(
    () => services.find(service => service.id === selectedServiceId) || null,
    [selectedServiceId, services]
  )

  const selectedDoctor = useMemo(() => {
    if (!selectedService) return null
    return (
      selectedService.doctors.find(doc => doc.id === selectedDoctorId) || null
    )
  }, [selectedDoctorId, selectedService])

  const formattedDate = useMemo(
    () =>
      selectedDate instanceof Date
        ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : '',
    [selectedDate]
  )

  const formattedDateForQuery = useMemo(() => {
    if (!(selectedDate instanceof Date)) return ''
    return selectedDate.toISOString().split('T')[0]
  }, [selectedDate])

  const handleSeeSlots = () => {
    if (!selectedDoctor || !selectedService || !formattedDateForQuery) return
    navigate(
      `/available-slots?doctorId=${selectedDoctor.id}&serviceId=${selectedService.id}&date=${formattedDateForQuery}`
    )
  }
  if (getServicesLoading) {
    return <Loading />
  }
  return (
    <div className='grid gap-6 lg:grid-cols-[380px,1fr]'>
      <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 p-4 shadow-md shadow-[#07332F]/10 backdrop-blur'>
        <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
          Step 1
        </p>
        <h3 className='text-xl font-semibold text-[#07332F]'>Pick a service</h3>
        <p className='mt-1 text-sm text-slate-600'>
          Search and select a service to continue.
        </p>

        <div className='mt-4 space-y-3'>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <input
              type='text'
              placeholder='Search service...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full rounded-xl border border-[#07332F]/15 bg-white px-4 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none'
            />
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
              onClick={() => {
                dispatch(getServices(searchTerm))
              }}
            >
              Search
            </button>
          </div>

          <div className='grid gap-2'>
            {services?.length ? (
              services?.map(service => {
                const isActive = service.id === selectedServiceId
                return (
                  <button
                    key={service.id}
                    type='button'
                    onClick={() => {
                      setSelectedServiceId(service.id)
                      setSelectedDoctorId(null)
                    }}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? 'border-transparent bg-[#07332F] text-white shadow-md shadow-[#07332F]/15'
                        : 'border-[#07332F]/15 bg-white text-[#07332F] hover:border-[#07332F]/30'
                    }`}
                  >
                    <span>{service.name}</span>
                    <span className='text-xs font-semibold'>
                      {service.duration}m · ${service.fee}
                    </span>
                  </button>
                )
              })
            ) : (
              <p className='text-sm text-slate-500'>
                No services match your search.
              </p>
            )}
          </div>
        </div>

        <div className='mt-6 rounded-2xl border border-[#07332F]/10 bg-white/90 p-3 shadow-inner'>
          <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
            Step 2
          </p>
          <p className='text-sm font-semibold text-[#07332F]'>Choose a date</p>
          <div className='mt-2'>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>
          <p className='mt-2 text-sm font-semibold text-[#07332F]'>
            Selected: <span className='text-slate-600'>{formattedDate}</span>
          </p>
        </div>
      </div>

      <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 p-5 shadow-md shadow-[#07332F]/10 backdrop-blur'>
        <div className='flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
              Step 3
            </p>
            <h3 className='text-xl font-semibold text-[#07332F]'>
              {selectedService
                ? `Doctors for ${selectedService.name}`
                : 'Select a service'}
            </h3>
            {selectedService && (
              <p className='text-sm text-slate-600'>
                Available on {formattedDate}
              </p>
            )}
          </div>
        </div>

        {!selectedService ? (
          <p className='mt-4 text-sm text-slate-500'>
            Choose a service to view available doctors.
          </p>
        ) : (
          <div className='mt-5 grid gap-4 md:grid-cols-2'>
            {selectedService.doctors.length ? (
              selectedService.doctors.map(doctor => (
                <div
                  key={doctor.id}
                  className={`flex gap-3 rounded-2xl border p-3 shadow-sm shadow-[#07332F]/10 cursor-pointer ${
                    selectedDoctorId === doctor.id
                      ? 'border-[#07332F] bg-white'
                      : 'border-[#07332F]/10 bg-slate-50/70'
                  }`}
                  onClick={() => setSelectedDoctorId(doctor.id)}
                >
                  <img
                    src={doctor.image || placeholderImg}
                    alt={doctor.name}
                    className='h-16 w-16 rounded-xl object-cover'
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-semibold text-[#07332F]'>
                      {doctor.name}
                    </p>
                    <p className='text-xs text-slate-600'>
                      {doctor.qualification}
                    </p>
                    <p className='text-xs text-slate-500'>
                      {doctor.description}
                    </p>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {doctor.specialties && doctor.specialties.length ? (
                        doctor.specialties.map(spec => (
                          <span
                            key={spec}
                            className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#07332F] shadow-sm'
                          >
                            {spec}
                          </span>
                        ))
                      ) : (
                        <span className='text-xs text-slate-500'>
                          No specialties listed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-sm text-slate-500'>
                No doctors available for this service.
              </p>
            )}
          </div>
        )}

        {selectedDoctor && (
          <div className='mt-6 flex flex-col gap-3 rounded-2xl border border-[#07332F]/10 bg-slate-50/80 px-4 py-3 shadow-inner shadow-[#07332F]/10 md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
                Selected doctor
              </p>
              <p className='text-sm font-semibold text-[#07332F]'>
                {selectedDoctor.name}
              </p>
              <p className='text-xs text-slate-600'>
                Preferred date: {formattedDate}
              </p>
            </div>
            <button
              type='button'
              onClick={handleSeeSlots}
              className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
            >
              See Available Slots
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDoctorPicker
