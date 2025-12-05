import React, { useEffect, useMemo, useState } from 'react'
import {
  CalendarClock,
  Clock3,
  CreditCard,
  Pencil,
  Search,
  Stethoscope,
  Users
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from '../../Redux/Slice/ServiceSlice'
import Loading from '../../Component/Loading/Loading'

const servicesData = [
  {
    id: 1,
    name: 'General Consultation',
    duration: 30,
    fee: 50,
    doctors: ['Dr. Mia Hudson', 'Dr. Luca Chen'],
    slots: 18,
    appointments: 42,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Dental Cleaning',
    duration: 45,
    fee: 120,
    doctors: ['Dr. Priya Das', 'Dr. Anika Rahman'],
    slots: 12,
    appointments: 23,
    status: 'High demand'
  },
  {
    id: 3,
    name: 'Root Canal Therapy',
    duration: 60,
    fee: 250,
    doctors: ['Dr. Luca Chen'],
    slots: 9,
    appointments: 12,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Pediatric Checkup',
    duration: 30,
    fee: 80,
    doctors: ['Dr. Felix Moore', 'Dr. Amara Singh'],
    slots: 14,
    appointments: 19,
    status: 'Paused'
  },
  {
    id: 5,
    name: 'Orthodontic Review',
    duration: 40,
    fee: 160,
    doctors: ['Dr. Priya Das', 'Dr. Amara Singh'],
    slots: 16,
    appointments: 21,
    status: 'Active'
  },
  {
    id: 6,
    name: 'Post-Op Follow Up',
    duration: 20,
    fee: null,
    doctors: ['Dr. Mia Hudson'],
    slots: 20,
    appointments: 17,
    status: 'Active'
  }
]

const MetricCard = ({ icon, label, value, helper }) => (
  <div className='relative overflow-hidden rounded-2xl border border-white/60 bg-white p-4 shadow-sm'>
    <div className='pointer-events-none absolute -right-6 top-0 h-20 w-20 rounded-full bg-[#07332F]/10 blur-3xl' />
    <div className='pointer-events-none absolute -bottom-10 left-0 h-20 w-20 rounded-full bg-[#F7A582]/10 blur-3xl' />
    <div className='relative flex items-center gap-3'>
      <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#07332F]/10 text-[#07332F]'>
        {icon}
      </div>
      <div>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-2xl font-semibold text-gray-900'>{value}</p>
        {helper ? <p className='text-xs text-gray-400'>{helper}</p> : null}
      </div>
    </div>
  </div>
)

const AdminServices = () => {
  const { services, getServicesLoading } = useSelector(state => state.services)
  const [query, setQuery] = useState(null)
  const dispatch = useDispatch()
  const metrics = useMemo(() => {
    const uniqueDoctors = new Set()
    let totalDuration = 0
    let totalFee = 0

    services.forEach(service => {
      totalDuration += service.duration || 0
      totalFee += service.fee ?? 0
      service.doctors.forEach(doc => uniqueDoctors.add(doc))
    })

    return {
      totalServices: services.length,
      averageDuration: servicesData.length
        ? Math.round(totalDuration / servicesData.length)
        : 0,
      totalFee,
      totalDoctors: uniqueDoctors.size
    }
  }, [])

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const formatFee = fee => {
    if (fee === null || fee === undefined) return 'Not set'
    return `$${fee}`
  }

  if (getServicesLoading) {
    return <Loading />
  }
  return (
    <section className='h-screen bg-[#F1F5F9] p-4 md:p-8'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[#07332F]'>
            Admin / Services
          </p>
          <h1 className='text-3xl font-semibold text-gray-900'>
            Service catalog
          </h1>
          <p className='text-sm text-gray-500'>
            Review every procedure with duration, fees, assigned doctors and
            demand signals.
          </p>
        </div>
        <button
          type='button'
          className='inline-flex items-center gap-2 self-start rounded-xl bg-[#07332F] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/50'
        >
          <Stethoscope size={16} />
          New service
        </button>
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          icon={<Stethoscope size={20} />}
          label='Total services'
          value={metrics.totalServices}
          helper='Active in catalog'
        />
        <MetricCard
          icon={<Clock3 size={20} />}
          label='Average duration'
          value={`${metrics.averageDuration} min`}
          helper='Per appointment'
        />
        <MetricCard
          icon={<Users size={20} />}
          label='Doctors covering'
          value={metrics.totalDoctors}
          helper='Unique specialists'
        />
        <MetricCard
          icon={<CreditCard size={20} />}
          label='Total fee baseline'
          value={`$${metrics.totalFee}`}
          helper='Sum of listed fees'
        />
      </div>

      <div className='mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>Services</h2>
            <p className='text-sm text-gray-500'>
              Showing {servicesData.length} of {servicesData.length} entries
            </p>
          </div>
          <div className='flex w-full items-center gap-2 md:w-80'>
            <div className='relative w-full'>
              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder='Search by service or doctor'
                className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 shadow-sm transition focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/20'
              />
            </div>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:border-[#07332F]/40 hover:text-[#07332F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
              onClick={() => {
                dispatch(getServices(query))
              }}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full text-left text-sm text-gray-700'>
            <thead className='bg-gray-50 text-gray-500'>
              <tr>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Service
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Duration
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Fee
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Doctors
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Slots
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Appointments
                </th>
                {/* <th scope='col' className='px-6 py-3 font-semibold'>
                  Status
                </th> */}
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {services?.map(service => (
                <tr key={service.id} className='hover:bg-gray-50/60'>
                  <td className='px-6 py-3 font-semibold text-gray-900'>
                    {service.name}
                  </td>
                  <td className='px-6 py-3'>{service.duration} min</td>
                  <td className='px-6 py-3'>{formatFee(service.fee)}</td>
                  <td className='px-6 py-3'>
                    <div className='flex flex-wrap gap-2'>
                      {service?.doctors?.slice(0, 2).map(doctor => (
                        <span
                          key={doctor.id}
                          className='rounded-full bg-[#07332F]/10 px-3 py-1 text-xs font-semibold text-[#07332F]'
                        >
                          {doctor?.name}
                        </span>
                      ))}
                      {service?.doctors.length > 2 ? (
                        <span className='text-xs text-gray-500'>
                          +{service.doctors.length - 2} more
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100'>
                      <CalendarClock size={14} />
                      {service.slots.length} slots
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-100'>
                      {service.appointments.length} booked
                    </div>
                  </td>
                  {/* <td className='px-6 py-3'>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                  </td> */}
                  <td className='px-6 py-3'>
                    <button
                      type='button'
                      className='inline-flex items-center gap-2 rounded-lg border border-[#07332F]/10 bg-[#07332F]/10 px-3 py-1.5 text-xs font-semibold text-[#07332F] transition hover:border-[#07332F]/30 hover:bg-[#07332F]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminServices
