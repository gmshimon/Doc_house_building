import React, { useState } from 'react'
import { motion } from "framer-motion";

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
      <motion.div
      initial={{ opacity: 0 }} // Fade in effect
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `url(${appointment_bg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
      }}
      className="md:flex justify-evenly pt-20 w-full"
    >
      {/* Calendar Animation */}
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Calendar
          onChange={(e) => setValue(e.toString().split("00:00:00")[0])}
          value={value}
        />
      </motion.div>

      {/* Image Slide-in Animation */}
      <motion.div
        className="ml-10 hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <img className="w-[594px] h-[355px] rounded-xl" src={appointment} alt="" />
      </motion.div>
    </motion.div>
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
