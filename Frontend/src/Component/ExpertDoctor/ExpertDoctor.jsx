import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctors } from '../../Redux/Slice/DoctorSlice'
import Loading from '../Loading/Loading'
import DoctorCard from '../DoctorCard/DoctorCard'

const ExpertDoctor = () => {
  const { doctors: doctorList, getDoctorsLoading } = useSelector(state => state.doctor)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDoctors())
  }, [dispatch])

  const handleProfileClick = id => {
    console.log(id)
    navigate(`/doctor-profile/${id}`)
  }

  if (getDoctorsLoading) {
    return <Loading />
  }

  const doctors = doctorList || []

  return (
    <section className='mt-16 w-full'>
      <div className='relative overflow-hidden rounded-3xl border border-[#F7A582]/25 bg-gradient-to-br from-white via-[#fff5ed] to-[#e8f7f4] px-6 py-10 shadow-xl shadow-[#07332F]/5 md:px-10'>
        <div className='pointer-events-none absolute -left-10 -top-16 h-64 w-64 rounded-full bg-[#F7A582]/20 blur-3xl' />
        <div className='pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-[#07332F]/15 blur-3xl' />
        <div className='relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
              Trusted clinicians
            </p>
            <h1 className='mt-4 text-4xl font-semibold text-[#07332F]'>
              Our Expert Doctors
            </h1>
            <p className='mt-3 text-slate-600'>
              Meet the multidisciplinary team behind our care programs. Every
              physician here blends clinical expertise with a warm bedside
              manner to keep you feeling confident about your next visit.
            </p>
          </div>
          <button
            type='button'
            onClick={() => navigate('/appointment')}
            className='inline-flex items-center justify-center rounded-full border border-transparent bg-[#07332F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:bg-[#0a3f38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
          >
            Book an appointment
          </button>
        </div>

        <div className='relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {doctors.length ? (
            doctors.slice(0,3).map(doctor => {
              return (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={handleProfileClick}
                />
              )
            })
          ) : (
            <div className='col-span-full rounded-2xl border border-dashed border-[#07332F]/20 bg-white/80 p-8 text-center text-sm font-semibold text-slate-500'>
              No doctors available right now. Please check back soon.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ExpertDoctor
