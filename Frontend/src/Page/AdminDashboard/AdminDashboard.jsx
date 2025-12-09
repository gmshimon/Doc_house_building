import React from 'react'
import { CiFileOn, CiUser } from 'react-icons/ci'
import { IoPeopleOutline } from 'react-icons/io5'
import PatientGraph from '../../Component/PatientGraph/PatientGraph'
import AppointmentGraph from '../../Component/AppointmentGraph/AppointmentGraph'

const stats = [
  { id: 1, label: 'Doctors', value: 168, icon: CiUser, color: '#FF0034', progress: 55 },
  { id: 2, label: 'Patients', value: 487, icon: IoPeopleOutline, color: '#7BB13C', progress: 85 },
  { id: 3, label: 'Appointments', value: 95, icon: CiFileOn, color: '#FFBC34', progress: 75 }
]

const AdminDashboard = () => {
  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-12 pt-24'>
      <div className='mx-auto max-w-6xl space-y-7 px-4'>
        <header className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-5 shadow-lg shadow-[#07332F]/10 backdrop-blur md:px-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Admin dashboard
          </p>
          <div className='mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <h1 className='text-3xl font-semibold text-[#07332F]'>Overview</h1>
            <p className='text-sm text-slate-600'>
              Quick glance at platform activity and engagement.
            </p>
          </div>
        </header>

        <div className='grid gap-4 md:grid-cols-3'>
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className='rounded-2xl border border-[#07332F]/10 bg-white/95 p-5 shadow-md shadow-[#07332F]/10 backdrop-blur'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span
                      className='flex h-12 w-12 items-center justify-center rounded-2xl text-2xl'
                      style={{ backgroundColor: `${stat.color}1a`, color: stat.color }}
                    >
                      <Icon />
                    </span>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
                        {stat.label}
                      </p>
                      <p className='text-3xl font-semibold text-[#07332F]'>{stat.value}</p>
                    </div>
                  </div>
                  <span className='rounded-full bg-[#07332F]/5 px-3 py-1 text-xs font-semibold text-[#07332F]'>
                    {stat.progress}% target
                  </span>
                </div>
                <div className='mt-4 h-2 w-full rounded-full bg-[#07332F]/10'>
                  <div
                    className='h-full rounded-full bg-[#F7A582]'
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='rounded-2xl border border-[#07332F]/10 bg-white/95 p-5 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
            <div className='flex items-center justify-between border-b border-[#07332F]/10 pb-3'>
              <h2 className='text-xl font-semibold text-[#07332F]'>Patients</h2>
              <span className='text-xs font-semibold text-slate-500'>Last 6 months</span>
            </div>
            <div className='mt-4'>
              <PatientGraph />
            </div>
          </div>

          <div className='rounded-2xl border border-[#07332F]/10 bg-white/95 p-5 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
            <div className='flex items-center justify-between border-b border-[#07332F]/10 pb-3'>
              <h2 className='text-xl font-semibold text-[#07332F]'>Appointments</h2>
              <span className='text-xs font-semibold text-slate-500'>Last 6 months</span>
            </div>
            <div className='mt-4'>
              <AppointmentGraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
