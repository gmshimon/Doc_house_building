import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getServices } from '../../Redux/Slice/ServiceSlice'
import Loading from '../../Component/Loading/Loading'
import { HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineSparkles } from 'react-icons/hi'

const ServicesPage = () => {
  const { services, getServicesLoading } = useSelector(state => state.services)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  if (getServicesLoading) {
    return <Loading />
  }

  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-10 pt-32'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 md:px-0'>
        <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Services
          </p>
          <h1 className='mt-3 text-4xl font-semibold text-[#07332F]'>Explore our services</h1>
          <p className='mt-2 max-w-3xl text-slate-600'>
            Browse all available services, durations, and fees. Select one to book with a specialist.
          </p>
        </div>

        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {services?.length ? (
            services.map(service => (
              <div
                key={service.id}
                className='group flex h-full flex-col gap-4 rounded-2xl border border-white/60 bg-white/95 px-5 py-5 shadow-lg shadow-[#07332F]/10 ring-1 ring-[#07332F]/5 backdrop-blur transition duration-200 hover:-translate-y-2 hover:shadow-xl hover:ring-[#07332F]/15'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <h3 className='text-xl font-semibold text-[#07332F]'>{service.name}</h3>
                    <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
                      Service ID: {service.id}
                    </p>
                  </div>
                </div>
                <p className='text-sm text-slate-600'>
                  {service.description || 'No description provided.'}
                </p>
                <div className='flex flex-wrap gap-2 text-xs font-semibold text-[#07332F]'>
                  <span className='inline-flex items-center gap-2 rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
                    <HiOutlineClock />
                    {service.duration} mins
                  </span>
                  <span className='inline-flex items-center gap-2 rounded-full bg-[#07332F]/10 px-3 py-2 text-[#07332F]'>
                    <HiOutlineCurrencyDollar />
                    ${service.fee}
                  </span>
                  {service.doctors && (
                    <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[#07332F]'>
                      <HiOutlineSparkles />
                      {service.doctors.length} doctors
                    </span>
                  )}
                </div>

                {service.doctors?.length ? (
                  <>
                    <div className='rounded-xl border border-[#07332F]/10 bg-slate-50 px-3 py-3'>
                      <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#07332F]'>
                        Doctors
                      </p>
                      <ul className='mt-2 space-y-1 text-sm text-slate-700'>
                        {service.doctors.slice(0, 3).map(doc => (
                          <li key={doc.id} className='flex items-center gap-2'>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#F7A582]' />
                            <span className='font-semibold text-[#07332F]'>{doc.name}</span>
                            {doc.qualification && (
                              <span className='text-xs text-slate-500'>• {doc.qualification}</span>
                            )}
                          </li>
                        ))}
                        {service.doctors.length > 3 && (
                          <li className='text-xs font-semibold text-[#07332F]'>
                            +{service.doctors.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className='mt-auto flex justify-end'>
                      <Link
                        to={`/appointment?serviceId=${service.id}`}
                        className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
                      >
                        Book this service
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className='rounded-xl border border-dashed border-[#07332F]/15 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-500'>
                    No doctors linked to this service yet.
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className='text-sm text-slate-500'>No services available.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
