import React from 'react'
import { motion } from 'framer-motion'
import { CiLocationOn } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiOutlineClock } from 'react-icons/hi'

const locations = [
  {
    id: 1,
    name: 'Dhanmondi Clinic',
    address: 'House 12, Road 4, Dhanmondi, Dhaka, Bangladesh',
    phone: '+880 1234 567 890',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7955328781824!2d90.3840367122193!3d23.74883028459071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bae33c21af%3A0x5fa31e34317a7eb6!2sDhanmondi%20Clinic%20Pvt.%20Ltd.!5e0!3m2!1sen!2sbd!4v1712073123456!5m2!1sen!2sbd',
    availableTimes: ['10:00 AM - 12:00 PM', '3:00 PM - 6:00 PM']
  }
]

const DoctorLocation = () => {
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

      {locations.map(location => (
        <motion.div
          key={location.id}
          className='overflow-hidden rounded-2xl border border-[#07332F]/10 bg-white/95 shadow-md shadow-[#07332F]/10 backdrop-blur'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: location.id * 0.05 }}
        >
          <div className='p-5'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-[#07332F] flex items-center gap-2'>
                  <CiLocationOn className='text-[#F7A582]' />
                  {location.name}
                </h2>
                <p className='text-sm text-slate-600'>{location.address}</p>
              </div>
              <div className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/15 bg-slate-50 px-3 py-2 text-sm font-semibold text-[#07332F]'>
                <FaPhoneAlt className='text-[#F7A582]' />
                {location.phone}
              </div>
            </div>

            <div className='mt-4 flex flex-wrap gap-2 text-sm'>
              {location.availableTimes.map(time => (
                <span
                  key={time}
                  className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/15 bg-[#07332F]/5 px-3 py-1 text-[#07332F]'
                >
                  <HiOutlineClock className='text-[#F7A582]' />
                  {time}
                </span>
              ))}
            </div>
          </div>

          <div className='h-[320px] w-full overflow-hidden'>
            <iframe
              title={`Map-${location.id}`}
              src={location.mapSrc}
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>
        </motion.div>
      ))}
    </section>
  )
}

export default DoctorLocation
