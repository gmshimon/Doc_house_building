import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import Contact from '../../Component/Contact/Contact'

const ContactPage = () => {
  return (
    <div className='bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] py-10'>
      <div className='mx-auto flex max-w-5xl flex-col gap-6 px-5 md:px-0'>
        <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Contact
          </p>
          <h1 className='mt-3 text-4xl font-semibold text-[#07332F]'>
            Let’s talk about your visit
          </h1>
          <p className='mt-2 max-w-3xl text-slate-600'>
            Have a question, need to reschedule, or want to plan your first appointment? Our care
            coordinators respond quickly during business hours.
          </p>
          <div className='mt-4 flex flex-wrap gap-4 text-sm font-semibold text-[#07332F]'>
            <span className='inline-flex items-center gap-2 rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
              <FaPhoneAlt />
              +88 01750 14 14 14
            </span>
            <span className='inline-flex items-center gap-2 rounded-full bg-[#07332F]/10 px-3 py-2 text-[#07332F]'>
              <CiLocationOn />
              Dhanmondi, Dhaka, Bangladesh
            </span>
          </div>
        </div>

        <Contact />
      </div>
    </div>
  )
}

export default ContactPage
