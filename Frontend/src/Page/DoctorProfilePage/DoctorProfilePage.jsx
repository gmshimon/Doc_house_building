import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CiLocationOn } from 'react-icons/ci'
import docImg from '../../assets/Doc_2.png'
import DoctorOverview from '../../Component/DoctorOverview/DoctorOverview'
import DoctorLocation from '../../Component/DoctorLocation/DoctorLocation'
import DoctorReview from '../../Component/DoctorReview/DoctorReview'
import BusinessHours from '../../Component/BusinessHours/BusinessHours'

const tabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Locations' },
  { id: 3, label: 'Reviews' },
  { id: 4, label: 'Business Hours' }
]

const specialties = ['Dental Filling', 'Teeth Whitening', 'Root Canal']

const DoctorProfilePage = () => {
  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const TabContent = useMemo(() => {
    switch (activeTab) {
      case 2:
        return <DoctorLocation />
      case 3:
        return <DoctorReview />
      case 4:
        return <BusinessHours />
      default:
        return <DoctorOverview />
    }
  }, [activeTab])

  return (
    <section className='mt-20 bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] py-10'>
      <motion.div
        className='mx-auto max-w-5xl rounded-3xl border border-[#07332F]/10 bg-white/95 px-6 py-6 shadow-xl shadow-[#07332F]/10 backdrop-blur md:px-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          <motion.div
            className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#07332F]/5 to-[#F7A582]/10 p-2 shadow-inner'
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className='h-[320px] w-[280px] rounded-xl object-cover object-center md:h-[360px] md:w-[320px]'
              src={docImg}
              alt='Doctor portrait'
            />
          </motion.div>

          <div className='flex-1 space-y-3'>
            <motion.h1
              className='text-4xl font-semibold text-[#07332F]'
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Dr. Ruby Perrin
            </motion.h1>
            <p className='text-slate-600'>MBBS, MD - General Medicine</p>
            <div className='flex items-center gap-3'>
              <Rating style={{ maxWidth: 150 }} value={4} readOnly />
              <span className='text-sm font-semibold text-[#07332F]'>4.0 / 5</span>
            </div>
            <div className='flex items-center gap-2 text-slate-700'>
              <CiLocationOn className='text-xl text-[#F7A582]' />
              <p>Dhanmondi, Dhaka, Bangladesh</p>
            </div>
            <div className='flex flex-wrap gap-2 pt-2'>
              {specialties.map(item => (
                <span
                  key={item}
                  className='rounded-full border border-[#07332F]/15 bg-slate-50 px-3 py-1 text-sm font-semibold text-[#07332F]'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className='mx-auto mt-6 max-w-5xl rounded-3xl border border-[#07332F]/10 bg-white/95 shadow-lg shadow-[#07332F]/10 backdrop-blur'>
        <div className='w-full px-4 pt-4'>
          <nav className='flex flex-wrap gap-3 border-b border-[#07332F]/10 pb-4' aria-label='Tabs'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                type='button'
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#07332F] ${
                  activeTab === tab.id
                    ? 'bg-[#07332F] text-white shadow-md shadow-[#07332F]/15'
                    : 'border border-[#07332F]/15 bg-white text-[#07332F] hover:border-[#07332F]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className='px-4 py-6'>{TabContent}</div>
      </div>
    </section>
  )
}

export default DoctorProfilePage
