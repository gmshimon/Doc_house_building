import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <section id='contact' className='w-full mt-16'>
      <div className='relative overflow-hidden rounded-3xl border border-[#07332F]/10 bg-gradient-to-br from-white via-[#fff5ed] to-[#e8f7f4] px-6 py-10 shadow-xl shadow-[#07332F]/10 md:px-10'>
        <div className='pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-[#F7A582]/25 blur-3xl' />
        <div className='pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-[#07332F]/15 blur-3xl' />

        <div className='relative grid gap-8 lg:grid-cols-1'>
          <div className='space-y-5'>
            <p className='inline-flex w-fit items-center gap-2 rounded-full border border-[#07332F]/10 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
              Contact
            </p>
            <h2 className='text-4xl font-semibold text-[#07332F]'>Contact with us</h2>
            <p className='max-w-2xl text-slate-600'>
              Reach our care team to book, reschedule, or ask a quick question. We keep the
              lines open so you can plan visits without stress.
            </p>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#07332F] shadow-md shadow-[#07332F]/10 backdrop-blur'>
                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7A582]/15 text-lg text-[#F7A582]'>
                  <FaPhoneAlt />
                </span>
                <div>
                  <p className='text-sm font-semibold text-slate-600'>Call us</p>
                  <p className='text-lg font-semibold'>+88 01750 14 14 14</p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#07332F] shadow-md shadow-[#07332F]/10 backdrop-blur'>
                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#07332F]/10 text-xl text-[#07332F]'>
                  <CiLocationOn />
                </span>
                <div>
                  <p className='text-sm font-semibold text-slate-600'>Visit</p>
                  <p className='text-lg font-semibold'>Dhanmondi, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='relative rounded-3xl border border-white/70 bg-white/95 p-6 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
            <div className='grid gap-4 sm:grid-cols-2'>
              {[
                { placeholder: 'Name', type: 'text' },
                { placeholder: 'Email', type: 'email' },
                { placeholder: 'Mobile number', type: 'tel' },
                { placeholder: 'Doctor name', type: 'text' },
                { placeholder: 'Preferred date', type: 'date' },
                { placeholder: 'Preferred time', type: 'time' }
              ].map(field => (
                <div key={field.placeholder} className='space-y-2'>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className='w-full rounded-xl border border-[#07332F]/15 bg-white/90 px-4 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none'
                  />
                </div>
              ))}
            </div>
            <button
              type='button'
              className='mt-6 w-full rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
            >
              Book now
            </button>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Contact
