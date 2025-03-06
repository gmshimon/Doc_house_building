import React from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { MdAddIcCall, MdLocationOn } from 'react-icons/md'

const ContactBanner = () => {
  return (
    <section className='w-full mt-10'>
      <div className='md:flex md:space-x-8 space-y-5 md:space-y-0 w-full'>
        <div className='bg-[#07332F] rounded-md text-white flex justify-center items-center w-full py-7 px-2'>
          <p className='mr-5 text-3xl'>
            <FaRegClock />
          </p>
          <div className='w-2/3'>
            <p className='font-semibold text-xl mb-2'>Opening Hours</p>
            <p>Open 9.00 am to 5.00pm Everyday</p>
          </div>
        </div>
        <div className='bg-[#F7A582] rounded-md text-white flex justify-center items-center w-full py-7 px-2'>
          <p className='mr-5 text-4xl'>
            <MdLocationOn />
          </p>
          <div className='w-2/3'>
            <p className='font-semibold text-xl mb-2'>Our Locations</p>
            <p>Dhanmondi 17, Dhaka -1200, Bangladesh</p>
          </div>
        </div>
        <div className='bg-[#07332F] rounded-md text-white flex justify-center items-center w-full py-7 px-2'>
          <p className='mr-5 text-4xl'>
            <MdAddIcCall />
          </p>
          <div className='w-2/3'>
            <p className='font-semibold text-xl mb-2'>Contact Us</p>
            <p>+88 01750 00 00 00 </p>
            <p> +88 01750 00 00 00</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactBanner
