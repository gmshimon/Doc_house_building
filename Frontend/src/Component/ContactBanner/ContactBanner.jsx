import React from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { MdAddIcCall, MdLocationOn } from 'react-icons/md'

const cards = [
  {
    title: 'Opening hours',
    lines: ['Open 9.00 am to 5.00 pm', 'Everyday'],
    icon: FaRegClock
  },
  {
    title: 'Our location',
    lines: ['Dhanmondi 17, Dhaka -1200,', 'Bangladesh'],
    icon: MdLocationOn
  },
  {
    title: 'Contact us',
    lines: ['+88 01750 00 00 00', '+88 01750 00 00 00'],
    icon: MdAddIcCall
  }
]

const ContactBanner = () => {
  return (
    <section className='w-full mt-16'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07332F] via-[#0c4b43] to-[#07332F] px-6 py-10 text-white shadow-2xl shadow-[#07332F]/30 md:px-10'>
        <div className='pointer-events-none absolute -left-14 -top-16 h-48 w-48 rounded-full bg-[#F7A582]/30 blur-3xl' />
        <div className='pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-white/10 blur-3xl' />

        <div className='relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <div className='max-w-xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80'>
              Quick access
            </p>
            <h2 className='mt-3 text-3xl font-semibold leading-tight md:text-4xl'>
              Connect with our care team
            </h2>
            <p className='mt-2 text-white/80'>
              Drop by, call ahead, or book in advance - our lines stay open and
              our doors stay welcoming.
            </p>
          </div>
          <div className='mt-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 shadow-lg shadow-black/10'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F7A582]/30 text-xl text-white'>
              <MdAddIcCall />
            </span>
            <div className='leading-tight'>
              <p className='text-xs uppercase tracking-[0.14em] text-white/70'>
                Hotline
              </p>
              <p className='text-base'>+88 01750 00 00 00</p>
            </div>
          </div>
        </div>

        <div className='relative mt-8 grid grid-cols-1 gap-5 md:grid-cols-3'>
          {cards.map(({ title, lines, icon: Icon }) => (
            <div
              key={title}
              className='group relative flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-6 text-white shadow-lg shadow-black/10 backdrop-blur transition duration-200 hover:-translate-y-1 hover:bg-white/15'
            >
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl text-[#F7A582] shadow-inner shadow-black/10'>
                <Icon />
              </div>
              <div className='flex flex-1 flex-col'>
                <p className='text-lg font-semibold capitalize'>{title}</p>
                <div className='mt-2 space-y-1 text-sm text-white/80'>
                  {lines.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className='mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/60'>
                  <span className='h-1.5 w-1.5 rounded-full bg-[#F7A582]' />
                  Always-on support
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactBanner
