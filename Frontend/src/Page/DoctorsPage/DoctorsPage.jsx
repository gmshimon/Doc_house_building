import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDoctors } from '../../Redux/Slice/DoctorSlice'
import Loading from '../../Component/Loading/Loading'
import DoctorCard from '../../Component/DoctorCard/DoctorCard'

const DoctorsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { doctors, getDoctorsLoading } = useSelector(state => state.doctor)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getDoctors())
  }, [dispatch])

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return doctors || []
    return (doctors || []).filter(doc => {
      const matchesName = doc.name?.toLowerCase().includes(term)
      const matchesSpecialty = (doc.specialties || []).some(spec =>
        spec.toLowerCase().includes(term)
      )
      return matchesName || matchesSpecialty
    })
  }, [doctors, search])

  const handleProfileClick = id => {
    navigate(`/doctor-profile/${id}`)
  }

  if (getDoctorsLoading) {
    return <Loading />
  }

  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-12 pt-24'>
      <div className='mx-auto max-w-6xl space-y-8 px-4'>
        <header className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur md:px-8'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
                Find your specialist
              </p>
              <h1 className='text-3xl font-semibold text-[#07332F]'>All Doctors</h1>
              <p className='text-sm text-slate-600'>
                Browse every clinician and jump into their detailed profile.
              </p>
            </div>
            <div className='flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center'>
              <div className='relative flex-1'>
                <input
                  type='text'
                  placeholder='Search by name or specialty'
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  className='w-full rounded-xl border border-[#07332F]/15 bg-white px-4 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none'
                />
                <span className='pointer-events-none absolute right-3 top-3 text-xs font-semibold text-slate-400'>
                  {filteredDoctors.length}
                </span>
              </div>
              <button
                type='button'
                onClick={() => dispatch(getDoctors(search.trim() || null))}
                className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
              >
                Search
              </button>
            </div>
          </div>
        </header>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredDoctors.length ? (
            filteredDoctors.map(doctor => {
              return (
                <DoctorCard key={doctor.id} doctor={doctor} onViewProfile={handleProfileClick} />
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

export default DoctorsPage
