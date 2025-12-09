import React from 'react'
import { motion } from 'framer-motion'
import { CiLocationOn } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiOutlineClock } from 'react-icons/hi'

const DoctorLocation = ({ doctor }) => {
  const address = doctor?.address
  const businessHours = doctor?.business_hour || []
  const times =
    businessHours.length && businessHours[0]
      ? [`${businessHours[0].open} - ${businessHours[0].close}`]
      : []

  return (
    <section className='space-y-4'>
      <motion.h1
        className='text-2xl font-semibold text-[#07332F]'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Available locations
      </motion.h1>

      <motion.div
        className='overflow-hidden rounded-2xl border border-[#07332F]/10 bg-white/95 shadow-md shadow-[#07332F]/10 backdrop-blur'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='p-5'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-[#07332F] flex items-center gap-2'>
                <CiLocationOn className='text-[#F7A582]' />
                {address
                  ? `${address.street || ''} ${address.city ? ', ' + address.city : ''} ${
                      address.country ? ', ' + address.country : ''
                    }`
                  : 'Address not provided'}
              </h2>
              {address?.zip && <p className='text-sm text-slate-600'>{address.zip}</p>}
            </div>
            {doctor?.phone && (
              <div className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/15 bg-slate-50 px-3 py-2 text-sm font-semibold text-[#07332F]'>
                <FaPhoneAlt className='text-[#F7A582]' />
                {doctor.phone}
              </div>
            )}
          </div>

          <div className='mt-4 flex flex-wrap gap-2 text-sm'>
            {times.length ? (
              times.map(time => (
                <span
                  key={time}
                  className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/15 bg-[#07332F]/5 px-3 py-1 text-[#07332F]'
                >
                  <HiOutlineClock className='text-[#F7A582]' />
                  {time}
                </span>
              ))
            ) : (
              <span className='text-sm text-slate-500'>Schedule details not available.</span>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default DoctorLocation
