import { useEffect, useMemo, useState } from 'react'
import {
  BriefcaseMedical,
  Mail,
  Phone,
  Search,
  Stethoscope,
  User,
  Users
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctors } from '../../Redux/Slice/DoctorSlice'
import Loading from '../../Component/Loading/Loading'
import { Link } from 'react-router-dom'

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

const AdminDoctors = () => {
  const { doctors, getDoctorsLoading } = useSelector(state => state.doctors)
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDoctors())
  }, [dispatch])
  const metrics = useMemo(() => {
    const totalDoctors = doctors.length
    const totalServices = doctors.reduce(
      (sum, doctor) => sum + (doctor.services?.length || 0),
      0
    )
    const specialties = new Set()
    doctors.forEach(doc =>
      (doc.specialties || []).forEach(spec => specialties.add(spec))
    )
    return {
      totalDoctors,
      avgServices: totalDoctors ? Math.round(totalServices / totalDoctors) : 0,
      specialtyCount: specialties.size
    }
  }, [doctors])
  if (getDoctorsLoading) {
    return <Loading />
  }

  const handleDeleteDoctor = doctorId => {
    // Hook up to delete doctor action when ready
    // eslint-disable-next-line no-console
    console.log('Delete doctor id', doctorId)
  }

  return (
    <section className='min-h-screen bg-[#F1F5F9] p-4 md:p-8'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[#07332F]'>
            Admin / Doctors
          </p>
          <h1 className='text-3xl font-semibold text-gray-900'>
            Doctor roster
          </h1>
          <p className='text-sm text-gray-500'>
            Review specialists, contact info, and their assigned services.
          </p>
        </div>
        <div className='flex gap-2'>
          <Link to='/dashboard/add-doctor'>
            <button
              type='button'
               className='inline-flex items-center gap-2 self-start rounded-xl bg-[#07332F] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/50'
            >
              <Stethoscope size={16} />
              Add doctor
            </button>
          </Link>
         
        </div>
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          icon={<Users size={20} />}
          label='Total doctors'
          value={metrics.totalDoctors}
          helper='Active in roster'
        />
        <MetricCard
          icon={<BriefcaseMedical size={20} />}
          label='Avg services per doctor'
          value={metrics.avgServices}
          helper='Coverage breadth'
        />
        <MetricCard
          icon={<User size={20} />}
          label='Specialties tracked'
          value={metrics.specialtyCount}
          helper='Unique specialties'
        />
        <MetricCard
          icon={<Stethoscope size={20} />}
          label='Services total'
          value={doctors.reduce((sum, d) => sum + (d.services?.length || 0), 0)}
          helper='Across all doctors'
        />
      </div>

      <div className='mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>Doctors</h2>
            <p className='text-sm text-gray-500'>
              Showing {doctors.length} of {doctors.length} entries
            </p>
          </div>
          <div className='flex w-full items-center gap-2 md:w-80'>
            <div className='relative w-full'>
              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder='Search by name, email, specialty'
                className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 shadow-sm transition focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/20'
              />
            </div>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:border-[#07332F]/40 hover:text-[#07332F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
              onClick={() => {
                console.log('Searching for:', query)
                dispatch(getDoctors(query))
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
                  Doctor
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Specialties
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Contact
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Services
                </th>
                <th scope='col' className='px-6 py-3 font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {doctors?.map(doctor => (
                <tr key={doctor.id} className='hover:bg-gray-50/60'>
                  <td className='px-6 py-3'>
                    <div className='flex items-center gap-3'>
                      <img
                        className='h-10 w-10 rounded-full object-cover ring-1 ring-gray-200'
                        src={
                          doctor.image ||
                          doctor.avatar ||
                          'https://i.pravatar.cc/80?img=65'
                        }
                        alt={doctor.name || 'Doctor avatar'}
                      />
                      <div>
                        <p className='text-sm font-semibold text-gray-900'>
                          {doctor.name || 'Unnamed'}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {doctor.title || 'Doctor'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='flex flex-wrap gap-2'>
                      {(doctor.specialties || []).slice(0, 3).map(spec => (
                        <span
                          key={spec}
                          className='rounded-full bg-[#07332F]/10 px-3 py-1 text-xs font-semibold text-[#07332F]'
                        >
                          {spec}
                        </span>
                      ))}
                      {doctor.specialties?.length > 3 ? (
                        <span className='text-xs text-gray-500'>
                          +{doctor.specialties.length - 3} more
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='flex flex-col gap-1 text-xs text-gray-700'>
                      {doctor.email ? (
                        <span className='inline-flex items-center gap-2'>
                          <Mail size={14} className='text-gray-400' />
                          {doctor.email}
                        </span>
                      ) : null}
                      {doctor.phone ? (
                        <span className='inline-flex items-center gap-2'>
                          <Phone size={14} className='text-gray-400' />
                          {doctor.phone}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100'>
                      <BriefcaseMedical size={14} />
                      {doctor.services?.length || 0} services
                    </div>
                  </td>
                  <td className='px-6 py-3'>
                    <div className='flex flex-wrap gap-2'>
                      <Link
                        to={`/dashboard/doctors/${doctor.id}/edit`}
                        className='inline-flex items-center gap-2 rounded-lg border border-[#07332F]/10 bg-[#07332F]/10 px-3 py-1.5 text-xs font-semibold text-[#07332F] transition hover:border-[#07332F]/30 hover:bg-[#07332F]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
                      >
                        Edit
                      </Link>
                      <button
                        type='button'
                        onClick={() => handleDeleteDoctor(doctor.id)}
                className='inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200'
              >
                Delete
              </button>
            </div>
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

export default AdminDoctors
