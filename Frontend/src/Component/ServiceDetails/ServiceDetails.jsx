import React, { useState } from 'react'
import service_details_doc from '../../assets/service_details_doc.jpg'
import service_1 from '../../assets/service_1.jpg'

const ServiceDetails = () => {
  const [service_state, setServiceState] = useState('Cavity Protection')
  return (
    <section className='md:flex justify-center w-full mt-14'>
      {/* left side  */}
      <div className=''>
        <img className='rounded-xl w-[658px] md:h-[850px]' src={service_details_doc} alt='' />
      </div>
      {/* right side  */}
      <div className='md:w-4/5 md:ml-5 mt-5 md:mt-0'>
        <h1 className='text-4xl font-semibold'>Our Services</h1>
        <div className='flex justify-evenly border mt-14 mb-12 rounded-md md:w-full '>
          <div
            onClick={() => setServiceState('Cavity Protection')}
            className={`cursor-pointer text-center py-4 w-full ${
              service_state === 'Cavity Protection' &&
              'bg-orange-400 rounded-md '
            }`}
          >
            Cavity Protection
          </div>
          <div
            onClick={() => setServiceState('Cosmetic Dentistry')}
            className={`md:block hidden cursor-pointer text-center py-4 w-full ${
              service_state === 'Cosmetic Dentistry' &&
              'bg-orange-400 rounded-md '
            }`}
          >
            Cosmetic Dentistry
          </div>
          <div
            onClick={() => setServiceState('Oral Surgery')}
            className={`cursor-pointer text-center py-4 w-full ${
              service_state === 'Oral Surgery' && 'bg-orange-400 rounded-md '
            }`}
          >
            Oral Surgery
          </div>
        </div>
        <div>
          <img src={service_1} className='rounded-xl w-full' />
          <h1 className='text-3xl font-semibold my-5'>Electro Gastrology Therapy</h1>
          <p className='w-full text-justify leading-7'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inve ntore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus
            error{' '}.
            Sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inve ntore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo.
          </p>
          <button type="button" className="py-3 mt-7 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[#F7A582] text-[#F7A582] hover:border-[#F7A582] hover:text-[#000000FF] focus:outline-hidden focus:border-[#F7A582] hover:bg-[#F7A582] focus:text-[#000000FF] disabled:opacity-50 disabled:pointer-events-none">
  More Details
</button>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetails
