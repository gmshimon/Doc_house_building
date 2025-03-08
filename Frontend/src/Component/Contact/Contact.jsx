import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <section className='bg-[#07332F] text-white md:flex py-20 px-10 rounded-lg mt-10 font-[Source Sans 3]'>
      <div className='md:w-3/4 md:mr-4'>
        <h1 className='text-4xl font-semibold mb-4'>Contact With us</h1>
        <p className='my-6 text-justify'>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inve ntore veritatis et quasi.
        </p>
        <div className='flex items-center mb-4'>
          <p className='text-2xl mr-4'>
            <FaPhoneAlt />
          </p>
          <p>+88 01750 14 14 14</p>
        </div>
        <div className='flex items-center'>
          <p className='text-2xl mr-4'>
            <CiLocationOn />
          </p>
          <p>Dhanmondi, Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className='w-full h-full mt-5 md:mt-0'>
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-7 w-full'>
          <div className='max-w-sm space-y-3'>
            <input
              type='text'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Name'
            />
          </div>
          <div className='max-w-sm space-y-3'>
            <input
              type='text'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Email'
            />
          </div>
          <div className='max-w-sm space-y-3'>
            <input
              type='text'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Mobile Number'
            />
          </div>
          <div className='max-w-sm space-y-3'>
            <input
              type='text'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Doctor Name'
            />
          </div>
          <div className='max-w-sm space-y-3'>
            <input
              type='date'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Doctor Name'
            />
          </div>
          <div className='max-w-sm space-y-3'>
            <input
              type='time'
              className='py-2.5 sm:py-3 px-4 text-black block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Doctor Name'
            />
          </div>
        </div>
        <button
          type='button'
          className='md:mt-3 mt-6 py-3 px-4 w-full text-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F7A582] text-white hover:bg-[#F7A582] focus:outline-hidden focus:[#F7A582] disabled:opacity-50 disabled:pointer-events-none'
        >
          Book Now
        </button>
      </div>
    </section>
  )
}

export default Contact
