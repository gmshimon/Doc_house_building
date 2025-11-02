import React from 'react'
import { CiFileOn, CiUser } from 'react-icons/ci'
import { IoPeopleOutline } from 'react-icons/io5'
import PatientGraph from '../../Component/PatientGraph/PatientGraph'
import AppointmentGraph from '../../Component/AppointmentGraph/AppointmentGraph'

const AdminDashboard = () => {
  return (
    <section className='pt-10 '>
      <div className='flex justify-center'>
      <div className='grid md:grid-cols-3 gap-x-20 gap-y-5'>
        <div className='bg-white w-[327px] rounded-lg'>
          <div className='w-full px-6 py-6'>
            <div className='flex items-center w-full'>
              <p className='text-4xl bg-[#ff003363] text-[#FF0034] p-2 rounded-xl mr-8'>
                <CiUser />
              </p>
              <h1 className='text-5xl'>168</h1>
            </div>
            <div
              className='flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 mt-3'
              role='progressbar'
              aria-valuenow='25'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className='flex flex-col justify-center rounded-full overflow-hidden bg-[#FF0034] text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500'
                style={{
                  width: '55%'
                }}
              ></div>
            </div>
            <p className='text-lg mt-2'>Doctor</p>
          </div>
        </div>
        <div className='bg-white w-[327px] rounded-lg'>
          <div className='w-full px-6 py-6'>
            <div className='flex items-center'>
              <p className='text-4xl bg-[#7ab13c4f] text-[#7BB13C] p-2 rounded-xl mr-8'>
                <IoPeopleOutline />
              </p>
              <h1 className='text-5xl'>487</h1>
            </div>
            <div
              className='flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 mt-3'
              role='progressbar'
              aria-valuenow='25'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className='flex flex-col justify-center rounded-full overflow-hidden bg-[#FF0034] text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500'
                style={{
                  width: '85%'
                }}
              ></div>
            </div>
            <p className='text-lg mt-2'>Patient</p>
          </div>
        </div>
        <div className='bg-white w-[327px] rounded-lg'>
          <div className='w-full px-6 py-6'>
            <div className='flex items-center'>
              <p className='text-4xl bg-[#ffbb3449] text-[#FFBC34] p-2 rounded-xl mr-8'>
                <CiFileOn />
              </p>
              <h1 className='text-5xl'>95</h1>
            </div>
            <div
              className='flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 mt-3'
              role='progressbar'
              aria-valuenow='25'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className='flex flex-col justify-center rounded-full overflow-hidden bg-[#FF0034] text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500'
                style={{
                  width: '75%'
                }}
              ></div>
            </div>
            <p className='text-lg mt-2'>Appointment</p>
          </div>
        </div>
      </div>
      </div>
      <div className='md:flex justify-evenly mt-7'>
        <div className='md:w-[700px] bg-white rounded-lg p-5'>
            <h1 className='text-3xl pl-5 border-b pb-2 mb-8'>Patient</h1>
            <PatientGraph/>
        </div>
        <div className='md:w-[700px] bg-white rounded-lg p-5 mt-10 md:mt-0'>
            <h1 className='text-3xl pl-5 border-b pb-2 mb-8'>Appointment</h1>
            <AppointmentGraph/>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
