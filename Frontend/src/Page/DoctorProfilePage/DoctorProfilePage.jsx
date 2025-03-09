import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CiLocationOn } from 'react-icons/ci'
import doc_img from '../../assets/Doc_2.png'
import category_1 from '../../assets/category_1.jpg'
import DoctorOverview from '../../Component/DoctorOverview/DoctorOverview'
import DoctorLocation from '../../Component/DoctorLocation/DoctorLocation'
import DoctorReview from '../../Component/DoctorReview/DoctorReview'
import BusinessHours from '../../Component/BusinessHours/BusinessHours'

const DoctorProfilePage = () => {
  const [activeTab, setActiveTab] = useState(1)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <section className='bg-gray-200 py-10 h-'>
      <motion.div
        className='mx-auto max-w-5xl bg-white rounded-md'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='md:flex px-3 py-6'>
          <motion.div
            className='bg-gray-100 rounded-lg'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img className='w-[350px] h-[378px]' src={doc_img} alt='' />
          </motion.div>
          <div className='ml-10 mt-8'>
            <motion.h1
              className='text-4xl font-semibold mb-6'
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dr. Ruby Perrin
            </motion.h1>
            <p className='mb-2 text-gray-600'>MBBS, MD - General Medicine</p>
            <Rating style={{ maxWidth: 150 }} value={4} readOnly />
            <motion.div
              className='flex items-center my-3'
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className='text-xl'>
                <CiLocationOn />
              </p>
              <p className='ml-2'>
                Dhanmondi, Dhaka, Bangladesh - Get Directions
              </p>
            </motion.div>
            <motion.div
              className='grid md:grid-cols-6 grid-cols-3 gap-x-2 gap-y-3 md:mt-0 mt-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[...Array(5)].map((_, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                  <img
                    className='w-[80px] h-[80px] rounded-lg'
                    src={category_1}
                    alt=''
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className='grid md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-3 mt-5'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {['Dental Filling', 'Teeth Whitening', 'Teeth Whitening'].map(
                (service, index) => (
                  <motion.div
                    key={index}
                    className='w-[160px] py-2 border-2 rounded-lg text-center'
                    whileHover={{ scale: 1.1, backgroundColor: '#f8f9fa' }}
                  >
                    {service}
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className='mx-auto max-w-5xl bg-white rounded-md mt-5 mb'>
        <div className='w-full p-2'>
          <nav
            className='grid grid-cols-2 md:grid-cols-4 gap-x-12 border-b w-full'
            aria-label='Tabs'
            role='tablist'
            aria-orientation='horizontal'
          >
            {['Overview', 'Locations', 'Reviews', 'Business Hours'].map(
              (tab, index) => {
                const tabIndex = index + 1
                return (
                  <button
                    key={tabIndex}
                    type='button'
                    className={`py-3 px-4 mr-10  gap-x-2 text-sm font-medium text-center rounded-lg focus:outline-none ${
                      activeTab === tabIndex
                        ? 'bg-[#F7A582] text-white'
                        : 'bg-transparent text-black hover:text-black'
                    }`}
                    id={`pills-with-brand-color-item-${tabIndex}`}
                    aria-selected={activeTab === tabIndex}
                    data-hs-tab={`#pills-with-brand-color-${tabIndex}`}
                    aria-controls={`pills-with-brand-color-${tabIndex}`}
                    role='tab'
                    onClick={() => setActiveTab(tabIndex)} // Change active tab on click
                  >
                    {tab}
                  </button>
                )
              }
            )}
          </nav>
        </div>

        <div className='p-2'>
          <div className='mt-3'>
            <div
              id='pills-with-brand-color-1'
              role='tabpanel'
              aria-labelledby='pills-with-brand-color-item-1'
            >
              <DoctorOverview />
            </div>
            <div
              id='pills-with-brand-color-2'
              className='hidden'
              role='tabpanel'
              aria-labelledby='pills-with-brand-color-item-2'
            >
              <DoctorLocation />
            </div>
            <div
              id='pills-with-brand-color-3'
              className='hidden'
              role='tabpanel'
              aria-labelledby='pills-with-brand-color-item-3'
            >
              <DoctorReview />
            </div>
            <div
              id='pills-with-brand-color-4'
              className='hidden'
              role='tabpanel'
              aria-labelledby='pills-with-brand-color-item-4'
            >
              <BusinessHours />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorProfilePage
