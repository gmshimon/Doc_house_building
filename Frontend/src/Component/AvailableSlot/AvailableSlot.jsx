import React, { useState } from 'react'
import { motion } from 'framer-motion'
const slots = [
  {
    id: 1,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  },
  {
    id: 2,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  },
  {
    id: 3,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  },
  {
    id: 4,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  },
  {
    id: 5,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  },
  {
    id: 6,
    title: 'Teeth Orthodontics',
    time: '8:00 AM - 9:00 AM',
    imgSrc:
      'https://static.vecteezy.com/system/resources/thumbnails/017/293/611/small/tooth-icon-l-on-transparent-background-free-png.png'
  }
]
const AvailableSlot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className='grid md:grid-cols-3 gap-x-8 gap-y-10'>
      {slots.map((slot, index) => (
        <motion.div
          key={slot.id}
          className='w-[366px] h-[439px] shadow-lg rounded-lg'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        >
          <div className='flex justify-center items-center h-full'>
            <div>
              <div className='flex justify-center mb-16'>
                <img
                  src={slot.imgSrc}
                  alt='Available Slot'
                  className='w-[100px] h-[70px] bg-blue-200 rounded-full'
                />
              </div>
              <p className='text-xl font-semibold text-center mb-2'>
                {slot.title}
              </p>
              <p className='text-sm font-semibold text-center'>{slot.time}</p>
              <button
                type='button'
                onClick={() => setIsModalOpen(true)}
                className='mt-8 py-3 px-4 w-full text-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F7A582] text-white hover:bg-[#f18658] focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none'
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className='bg-white rounded-lg shadow-lg w-full max-w-md p-6'
          >
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-bold'>Cavity Protection</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-white  bg-[#07332F] p-2 rounded-full'
              >
                ✕
              </button>
            </div>
            <div className='bg-slate-200 border border-slate-300 rounded-md p-2'>
              April 30, 2020
            </div>
            <div className='bg-slate-200 border border-slate-300 rounded-md p-2 mt-4'>
              10:05 am - 11:30 am
            </div>
            <div>
              <div className=' space-y-3 mb-2 mt-5'>
                <input
                  type='text'
                  className='py-2.5 sm:py-3 px-4 block w-full border border-black rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                  placeholder='First name'
                />
              </div>
              <div className=' space-y-3 mb-2'>
                <input
                  type='text'
                  className='py-2.5 sm:py-3 px-4 block w-full border border-black rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                  placeholder='Phone number'
                />
              </div>
              <div className=' space-y-3'>
                <input
                  type='text'
                  className='py-2.5 sm:py-3 px-4 block w-full border border-black rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                  placeholder='Email'
                />
              </div>
            </div>
            <div className='mt-4 flex justify-center space-x-2'>
              {/* <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 border border-gray-300 rounded-lg'
              >
                Close
              </button> */}
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 w-full bg-[#07332F] text-white rounded-lg'
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AvailableSlot
