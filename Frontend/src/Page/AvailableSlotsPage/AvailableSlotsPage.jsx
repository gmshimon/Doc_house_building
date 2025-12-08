import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../../Component/Loading/Loading'
import { getDoctorAvailability, makeAppointment } from '../../Redux/Slice/DoctorSlice'



const AvailableSlotsPage = () => {
  const {
    availability,
    getDoctorAvailabilityLoading,
    makeAppointmentLoading,
    makeAppointmentSuccess,
    makeAppointmentError
  } = useSelector(state => state.doctor)
  const [searchParams] = useSearchParams()
  const [selectedSlot, setSelectedSlot] = useState(null)
  const doctorId = searchParams.get('doctorId')
  const serviceId = searchParams.get('serviceId')
  const date = searchParams.get('date')

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDoctorAvailability({doctorId, date, serviceId}))
  },[date, dispatch, doctorId, serviceId])
useEffect(() => {
    if (makeAppointmentSuccess) {
      toast.success('Appointment booked successfully')
    }
    if (makeAppointmentError) {
      toast.error(makeAppointmentError || 'Failed to book appointment')
    }
  }, [makeAppointmentError, makeAppointmentSuccess])

console.log(availability);

  const readableDate = useMemo(() => {
    // if (!dataToDisplay?.date) return ''
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return date
    return parsed.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }, [date])

  if (getDoctorAvailabilityLoading) {
    return <Loading />
  }

  

  const handleBook = () => {
    if (!selectedSlot) return
    const payload = {
      doctorId: Number(doctorId),
      serviceId: Number(serviceId),
      date: date || availability?.date,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      reason: 'Appointment booked via UI'
    }
    dispatch(makeAppointment(payload))
  }

  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-10 pt-32'>
      <div className='mx-auto max-w-4xl rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-8 shadow-xl shadow-[#07332F]/10 backdrop-blur'>
        <div className='flex flex-wrap items-center gap-2'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Available slots
          </p>
          <span className='rounded-full bg-[#F7A582]/15 px-3 py-1 text-xs font-semibold text-[#F7A582]'>
            Service: {availability.service?.name}
          </span>
          <span className='rounded-full bg-[#07332F]/10 px-3 py-1 text-xs font-semibold text-[#07332F]'>
            Doctor: {availability.doctor?.name}
          </span>
        </div>

        <h1 className='mt-3 text-3xl font-semibold text-[#07332F]'>Choose a time</h1>
        {/* <p className='mt-2 text-slate-600'>
          Doctor ID: <span className='font-semibold text-[#07332F]'>{doctorId || 'N/A'}</span> | Service
          ID: <span className='font-semibold text-[#07332F]'>{serviceId || 'N/A'}</span>
        </p> */}
        <p className='text-slate-600'>
          Date: <span className='font-semibold text-[#07332F]'>{readableDate || 'N/A'}</span>
        </p>
        <p className='text-slate-600'>
          Duration: <span className='font-semibold text-[#07332F]'>{availability.service?.duration} mins</span> · Fee:{' '}
          <span className='font-semibold text-[#07332F]'>${availability.service?.fee}</span>
        </p>

        <div className='mt-6 grid gap-3 sm:grid-cols-2'>
          {availability?.availableSlots?.length ? (
            availability?.availableSlots.map(slot => {
              const isActive =
                selectedSlot &&
                selectedSlot.start === slot.start &&
                selectedSlot.end === slot.end
              return (
                <button
                  key={`${slot.start}-${slot.end}`}
                  type='button'
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F] ${
                    isActive
                      ? 'border-transparent bg-[#07332F] text-white shadow-[#07332F]/15'
                      : 'border-[#07332F]/15 bg-white text-[#07332F] hover:border-[#07332F]/30'
                  }`}
                >
                  {slot.start} - {slot.end}
                </button>
              )
            })
          ) : (
            <p className='text-sm text-slate-500'>No slots available.</p>
          )}
        </div>

        {selectedSlot && (
          <div className='mt-6 flex flex-col gap-3 rounded-2xl border border-[#07332F]/10 bg-slate-50/80 px-4 py-3 shadow-inner shadow-[#07332F]/10 md:flex-row md:items-center md:justify-between'>
            <div className='text-sm font-semibold text-[#07332F]'>
              Selected: {selectedSlot.start} - {selectedSlot.end}
            </div>
            <button
              type='button'
              onClick={handleBook}
              disabled={makeAppointmentLoading}
              className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
            >
              {makeAppointmentLoading ? 'Booking...' : 'Book appointment'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default AvailableSlotsPage
