import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import ServiceDoctorPicker from '../../Component/ServiceDoctorPicker/ServiceDoctorPicker'

const AppointmentPage = () => {
  return (
    <section className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] py-10 pt-32'>
      <div className='mx-auto flex max-w-6xl flex-col gap-8 px-4 md:px-0'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'
        >
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Appointment
          </p>
          <h1 className='mt-3 text-4xl font-semibold text-[#07332F]'>Book your visit</h1>
          <p className='mt-2 max-w-3xl text-slate-600'>
            Start by choosing a service and date. We will surface the clinicians who provide that
            service so you can pick the right fit.
          </p>
        </motion.div>

        <ServiceDoctorPicker />
      </div>
    </section>
  )
}

export default AppointmentPage
