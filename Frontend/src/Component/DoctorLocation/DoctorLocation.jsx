import React from 'react'
import { motion } from 'framer-motion'
import { CiLocationOn } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'
const locations = [
  {
    id: 1,
    name: 'Dhanmondi Clinic',
    address: 'House 12, Road 4, Dhanmondi, Dhaka, Bangladesh',
    phone: '+880 1234 567 890',
    mapSrc: 'https://www.google.com/maps/embed?...', // Replace with actual map link
    availableTimes: ['10:00 AM - 12:00 PM', '3:00 PM - 6:00 PM']
  }
]

const DoctorLocation = () => {
  return (
    <section className='px-5 pb-6'>
      <div className='max-w-5xl mx-auto  p-6 '>
        <motion.h1
          className='text-3xl font-semibold text-center mb-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Available Locations
        </motion.h1>

        {locations.map(location => (
          <motion.div
            key={location.id}
            className='border p-5 rounded-lg shadow-md bg-white'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: location.id * 0.2 }}
          >
            <h2 className='text-2xl font-semibold flex items-center'>
              <CiLocationOn className='text-red-500 mr-2' /> {location.name}
            </h2>
            <p className='text-gray-600 mt-2'>{location.address}</p>
            <p className='flex items-center mt-2 text-blue-600'>
              <FaPhoneAlt className='mr-2' /> {location.phone}
            </p>
            <div className='mt-4'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7955328781824!2d90.3840367122193!3d23.74883028459071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bae33c21af%3A0x5fa31e34317a7eb6!2sDhanmondi%20Clinic%20Pvt.%20Ltd.!5e0!3m2!1sen!2sbd!4v1712073123456!5m2!1sen!2sbd'
                width='100%'
                height='450'
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default DoctorLocation
