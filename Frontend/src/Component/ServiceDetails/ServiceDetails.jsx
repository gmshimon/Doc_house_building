import React, { useState } from 'react'
import { motion } from 'framer-motion'
import service_details_doc from '../../assets/service_details_doc.jpg'
import service_1 from '../../assets/service_1.jpg'

const ServiceDetails = () => {
  const [service_state, setServiceState] = useState('Cavity Protection')

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move it 50px down
      animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and move up to normal position
      transition={{ duration: 0.8, ease: 'easeOut' }} // Smooth transition effect
      className='md:flex justify-center w-full mt-14'
    >
      {/* Left side */}
      <div>
        <motion.img
          initial={{ scale: 0.8 }} // Start small
          animate={{ scale: 1 }}  // Expand to normal size
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='rounded-xl w-[658px] md:h-[850px]'
          src={service_details_doc}
          alt=''
        />
      </div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Start hidden and slightly to the right
        animate={{ opacity: 1, x: 0 }} // Move in smoothly
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} // Delayed effect
        className='md:w-4/5 md:ml-5 mt-5 md:mt-0'
      >
        <h1 className='text-4xl font-semibold'>Our Services</h1>

        {/* Service Selection */}
        <div className='flex justify-evenly border mt-14 mb-12 rounded-md md:w-full'>
          {['Cavity Protection', 'Cosmetic Dentistry', 'Oral Surgery'].map((service) => (
            <motion.div
              key={service}
              onClick={() => setServiceState(service)}
              whileHover={{ scale: 1.05 }} // Slight scale effect on hover
              whileTap={{ scale: 0.95 }} // Slight shrink effect on tap
              className={`cursor-pointer text-center py-4 w-full ${
                service_state === service ? 'bg-orange-400 rounded-md' : ''
              }`}
            >
              {service}
            </motion.div>
          ))}
        </div>

        {/* Service Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <img src={service_1} className='rounded-xl w-full' />
          <h1 className='text-3xl font-semibold my-5'>Electro Gastrology Therapy</h1>
          <p className='w-full text-justify leading-7'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inven tore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          {/* Animated Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#F7A582', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            className="py-3 mt-7 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[#F7A582] text-[#F7A582] focus:outline-hidden focus:border-[#F7A582] disabled:opacity-50 disabled:pointer-events-none"
          >
            More Details
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default ServiceDetails
