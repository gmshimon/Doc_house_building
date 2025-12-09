import React, { useEffect } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from 'react-icons/io5'
import { CiCalendar } from 'react-icons/ci'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { HiArrowLongRight } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import doc3 from '../../assets/Doc_3.png'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctors } from '../../Redux/Slice/DoctorSlice'
import Loading from '../Loading/Loading'

const getExperienceYears = experienceEntries => {
  if (!Array.isArray(experienceEntries) || !experienceEntries.length) return null
  const now = new Date()
  let earliestStart = null
  let latestEnd = null

  experienceEntries.forEach(item => {
    const start = item?.startDate ? new Date(item.startDate) : null
    const end = item?.endDate ? new Date(item.endDate) : now
    if (start && (!earliestStart || start < earliestStart)) earliestStart = start
    if (end && (!latestEnd || end > latestEnd)) latestEnd = end
  })

  if (!earliestStart || !latestEnd) return null
  const years = Math.round((latestEnd - earliestStart) / (1000 * 60 * 60 * 24 * 365))
  return Math.max(years, 1)
}

const getAvailabilityLabel = businessHours => {
  if (!Array.isArray(businessHours) || !businessHours.length) return 'Schedule not provided'
  const openDay = businessHours.find(item => !item.isClose && item.open && item.close)
  return openDay ? `${openDay.day}: ${openDay.open} - ${openDay.close}` : 'Schedule not provided'
}

const getMinFee = services => {
  if (!Array.isArray(services) || !services.length) return null
  const fees = services
    .map(service => service?.fee)
    .filter(fee => typeof fee === 'number' && !Number.isNaN(fee))
  if (!fees.length) return null
  return Math.min(...fees)
}

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
              const experienceYears = getExperienceYears(doctor.experience)
              const availability = getAvailabilityLabel(doctor.business_hour)
              const fee = getMinFee(doctor.services)
              const tags =
                (doctor.specialties && doctor.specialties.length
                  ? doctor.specialties
                  : doctor.services?.map(service => service.name)) || []
              const ratingValue = Math.min(5, Number(doctor?.rating) || 4.5)

              return (
                <article
                  key={doctor.id}
                  className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-lg shadow-[#07332F]/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#07332F]/10'
                >
                  <div className='pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100'>
                    <div className='absolute inset-x-0 -top-12 h-32 bg-gradient-to-b from-[#F7A582]/15 to-transparent blur-3xl' />
                  </div>
                  <div className='relative'>
                    <img
                      className='h-48 w-full object-cover'
                      src={doctor.image || doc3}
                      alt={doctor.name}
                    />
                    <div className='absolute left-4 top-4 rounded-full bg-[#07332F] px-3 py-1 text-xs font-semibold text-white/90 shadow-md shadow-[#07332F]/20'>
                      {experienceYears ? `${experienceYears}+ yrs experience` : 'Experienced clinician'}
                    </div>
                  </div>

                  <div className='flex flex-1 flex-col px-5 pb-6 pt-5'>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <h3 className='text-xl font-semibold text-[#07332F]'>
                          {doctor.name}
                        </h3>
                        {doctor.qualification ? (
                          <p className='text-sm text-slate-600'>{doctor.qualification}</p>
                        ) : null}
                      </div>
                      <div className='text-right'>
                        <Rating style={{ maxWidth: 110 }} value={ratingValue} readOnly />
                        <p className='mt-1 text-xs font-medium text-slate-500'>
                          {ratingValue} / 5 rating
                        </p>
                      </div>
                    </div>

                    <div className='mt-4 space-y-3 text-sm text-slate-700'>
                      <div className='flex items-center gap-3'>
                        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-[#F7A582]/15 text-lg text-[#F7A582]'>
                          <IoLocationOutline />
                        </span>
                        <span className='font-medium'>
                          {doctor?.address?.city || doctor?.address?.country || 'Address not provided'}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-[#07332F]/10 text-lg text-[#07332F]'>
                          <CiCalendar />
                        </span>
                        <span>Available: {availability}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-[#F7A582]/15 text-lg text-[#F7A582]'>
                          <AiOutlineDollarCircle />
                        </span>
                        {fee !== null ? (
                          <span className='font-semibold text-[#07332F]'>
                            ${fee}{' '}
                            <span className='font-normal text-slate-500'>
                              per visit
                            </span>
                          </span>
                        ) : (
                          <span className='font-semibold text-[#07332F]'>Fee on request</span>
                        )}
                      </div>
                    </div>

                    <div className='mt-4 flex flex-wrap gap-2'>
                      {tags.length ? (
                        tags.map(tag => (
                          <span
                            key={tag}
                            className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700'
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className='text-xs font-semibold text-slate-500'>
                          No specialties listed
                        </span>
                      )}
                    </div>

                    <button
                      type='button'
                      onClick={() => handleProfileClick(doctor.id)}
                      className='mt-6 inline-flex items-center justify-between rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F] cursor-pointer'
                    >
                      <span>View profile</span>
                      <HiArrowLongRight className='text-lg' />
                    </button>
                  </div>
                </article>
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
