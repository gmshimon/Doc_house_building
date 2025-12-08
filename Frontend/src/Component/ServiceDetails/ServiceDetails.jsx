import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineClock, HiOutlineSparkles, HiOutlineClipboardCheck } from 'react-icons/hi'
import serviceDetailsDoc from '../../assets/service_details_doc.jpg'
import service1 from '../../assets/service_1.jpg'
import service2 from '../../assets/service_2.jpg'

const services = [
  {
    id: 'cavity',
    name: 'Cavity Protection',
    summary: 'Gentle preventive care to keep every smile confident and cavity-free.',
    description:
      'Routine cleanings, fluoride treatments, and sealants tailored to your daily habits. We focus on early detection and coaching so you can keep your smile healthy between visits.',
    image: service1,
    duration: '30-45 mins',
    price: 'From $45',
    slots: 'Same-day slots',
    highlights: ['Digital cavity scans', 'Fluoride + sealant combo', 'Personalized home-care plan']
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Dentistry',
    summary: 'Subtle enhancements that feel natural and photograph beautifully.',
    description:
      'From whitening to aligners, we craft a plan that respects your schedule and keeps downtime low. Expect shade-matching, smile previews, and step-by-step guidance.',
    image: service2,
    duration: '40-60 mins',
    price: 'From $120',
    slots: 'Weekend availability',
    highlights: ['Whitening & bonding', 'Aligner-friendly consults', 'Smile mock-ups before you commit']
  },
  {
    id: 'surgery',
    name: 'Oral Surgery',
    summary: 'Comfort-first procedures with clear recovery guidance.',
    description:
      'Our surgical team uses modern imaging and minimally invasive techniques to shorten healing time. You leave with clear aftercare steps and follow-ups booked.',
    image: serviceDetailsDoc,
    duration: '60-90 mins',
    price: 'From $250',
    slots: 'Priority scheduling',
    highlights: ['Cone-beam imaging', 'Sedation options', 'Day-of-care coordinator']
  }
]

const ServiceDetails = () => {
  const [activeService, setActiveService] = useState(services[0].id)
  const currentService = useMemo(
    () => services.find(service => service.id === activeService) || services[0],
    [activeService]
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='w-full mt-16'
    >
      <div className='relative overflow-hidden rounded-3xl border border-[#07332F]/10 bg-gradient-to-br from-white via-[#fff5ed] to-[#e8f7f4] px-6 py-10 shadow-2xl shadow-[#07332F]/10 md:px-10'>
        <div className='pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-[#F7A582]/20 blur-3xl' />
        <div className='pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#07332F]/10 blur-3xl' />

        <div className='relative flex flex-col gap-3'>
          <p className='inline-flex w-fit items-center gap-2 rounded-full border border-[#07332F]/10 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
            Care menu
          </p>
          <h2 className='text-4xl font-semibold text-[#07332F]'>Our Services</h2>
          <p className='max-w-3xl text-slate-600'>
            Choose the treatment path that matches your needs. Each program blends clinical
            precision with a calm, patient-first experience.
          </p>
        </div>

        <div className='relative mt-8 grid gap-10 lg:grid-cols-2 lg:items-center'>
          <div className='order-2 space-y-6 lg:order-1'>
            <div className='flex flex-wrap gap-3'>
              {services.map(service => (
                <button
                  key={service.id}
                  type='button'
                  onClick={() => setActiveService(service.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#07332F] ${
                    activeService === service.id
                      ? 'border-transparent bg-[#07332F] text-white shadow-md shadow-[#07332F]/15'
                      : 'border-[#07332F]/15 bg-white text-[#07332F] hover:border-[#07332F]/30 hover:bg-white/70'
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>

            <div className='rounded-2xl border border-white/70 bg-white/90 p-6 shadow-md shadow-[#07332F]/5 backdrop-blur'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
                    {currentService.summary}
                  </p>
                  <h3 className='mt-2 text-2xl font-semibold text-[#07332F]'>
                    {currentService.name}
                  </h3>
                </div>
                <div className='flex gap-3 text-sm font-semibold text-[#07332F]'>
                  <span className='inline-flex items-center gap-2 rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
                    <HiOutlineClock />
                    {currentService.duration}
                  </span>
                  <span className='inline-flex items-center gap-2 rounded-full bg-[#07332F]/10 px-3 py-2 text-[#07332F]'>
                    <HiOutlineSparkles />
                    {currentService.slots}
                  </span>
                </div>
              </div>

              <p className='mt-4 text-slate-700 leading-relaxed'>{currentService.description}</p>

              <div className='mt-4 grid gap-3 md:grid-cols-2'>
                {currentService.highlights.map(item => (
                  <div key={item} className='flex items-start gap-3 rounded-xl bg-slate-50 px-3 py-3'>
                    <span className='mt-0.5 text-lg text-[#F7A582]'>
                      <HiOutlineClipboardCheck />
                    </span>
                    <p className='text-sm font-semibold text-[#07332F]'>{item}</p>
                  </div>
                ))}
              </div>

              <div className='mt-6 flex flex-wrap items-center gap-4'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
                >
                  Book this service
                </button>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-xl border border-[#07332F]/20 bg-white px-5 py-3 text-sm font-semibold text-[#07332F] shadow-sm shadow-[#07332F]/10 transition hover:-translate-y-0.5 hover:border-[#07332F]/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
                >
                  View details
                </button>
                <div className='ml-auto text-sm font-semibold text-[#07332F]'>
                  {currentService.price}
                </div>
              </div>
            </div>
          </div>

          <div className='order-1 lg:order-2'>
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='relative h-[420px] overflow-hidden rounded-3xl shadow-xl shadow-[#07332F]/10 md:h-[520px]'
            >
              <img
                className='h-full w-full object-cover object-center'
                src={currentService.image}
                alt={currentService.name}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent' />
              <div className='absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#07332F] shadow-md shadow-black/15 backdrop-blur'>
                <span className='inline-flex items-center gap-2 rounded-full bg-[#F7A582]/15 px-3 py-2 text-sm font-semibold text-[#F7A582]'>
                  {currentService.duration}
                </span>
                <span className='inline-flex items-center gap-2 rounded-full bg-[#07332F]/10 px-3 py-2 text-sm font-semibold text-[#07332F]'>
                  {currentService.slots}
                </span>
                <span className='ml-auto text-sm font-semibold'>{currentService.price}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default ServiceDetails
