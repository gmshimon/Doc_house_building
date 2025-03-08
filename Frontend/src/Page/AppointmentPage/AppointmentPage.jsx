import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import appointment_bg from '../../assets/appointment_bg.jpg'
import appointment from '../../assets/appointment.jpg'
import AvailableCategory from '../../Component/AvailableCategory/AvailableCategory'
import AvailableSlot from '../../Component/AvailableSlot/AvailableSlot'

const AppointmentPage = () => {
  const [value, setValue] = useState()
  return (
    <section className='w-full'>
      <div
        style={{
          backgroundImage: `url(${appointment_bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'border-box'
        }}
        className='md:flex justify-evenly pt-20 w-full'
      >
        <div className='flex justify-center'>
          <Calendar
            onChange={e => setValue(e.toString().split('00:00:00')[0])}
            value={value}
          />
        </div>
        <div className='ml-10 hidden md:block'>
          <img
            className='w-[594px] h-[355px] rounded-xl'
            src={appointment}
            alt=''
          />
        </div>
      </div>
      <div className='mt-16'>
        <p className='text-center text-lg text-[#F7A582]'>
          Available Services on {value ? value : new Date().toDateString()}
        </p>
        <p className='text-center text-4xl font-semibold mt-4'>
          Please select a service
        </p>
      </div>
      {/* category */}
      <div className='flex justify-center mt-12'>
        <AvailableCategory />
      </div>
      {/* available slots */}
      <div className='mt-16'>
        <p className='text-center text-4xl font-semibold mt-4 px-2'>
          Available slots for Teeth Orthodontics.{' '}
        </p>
      </div>
      <div className='flex justify-center mt-12'>
<AvailableSlot/>
      </div>
    </section>
  )
}

export default AppointmentPage
