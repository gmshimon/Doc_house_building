import React, { useState } from 'react'
import expert_doc_1 from '../../assets/expert_doc_1.jpg'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from 'react-icons/io5'
import { CiCalendar } from 'react-icons/ci'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ExpertDoctor = () => {
  const [rating, setRating] = useState(3)
  const navigate = useNavigate()
  return (
    <section className='mt-16 w-full'>
      <h1 className='text-4xl font-semibold text-center'>
        {' '}
        Our Expert Doctors
      </h1>
      <p className='text-center my-8'>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>

      <div className='md:flex w-full md:space-x-4 space-y-4 md:space-y-0'>
        {/* card */}
        <div>
          <div className='flex flex-col w-full md:w-80 p-2 bg-white border-2 border-gray-200 shadow-2xs rounded-xl  dark:border-neutral-700 dark:shadow-neutral-700/70'>
            <img
              className='w-full h-auto rounded-2xl'
              src={expert_doc_1}
              alt='Card Image'
            />
            <div className='mt-4'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                Karyen Anderson{' '}
              </h3>
              <p className='sm text-slate-700'>BTP - Senior Physiotherapist</p>
              <div className='mt-2 pb-5 mb-3 border-b'>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  readOnly
                  // onChange={setRating}
                />
              </div>
              <div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <IoLocationOutline />
                  </p>
                  <p>Dhanmondi, Dhaka, Bangladesh</p>
                </div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <CiCalendar />
                  </p>
                  <p>Available On Mon, 22 December</p>
                </div>
                <div className='flex items-center'>
                  <p className='text-lg mr-6'>
                    <AiOutlineDollarCircle />
                  </p>
                  <p>$15</p>
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='button'
                  className='w-full  py-3 mt-7 px-4  gap-x-2 text-sm font-medium rounded-lg border border-[#F7A582] text-[#F7A582] hover:border-[#F7A582] hover:text-[#000000FF] focus:outline-hidden focus:border-[#F7A582] hover:bg-[#F7A582] focus:text-[#000000FF] disabled:opacity-50 disabled:pointer-events-none'
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div>
          <div className='flex flex-col w-full md:w-80 p-2 bg-white border-2 border-gray-200 shadow-2xs rounded-xl  dark:border-neutral-700 dark:shadow-neutral-700/70'>
            <img
              className='w-full h-auto rounded-2xl'
              src={expert_doc_1}
              alt='Card Image'
            />
            <div className='mt-4'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                Karyen Anderson{' '}
              </h3>
              <p className='sm text-slate-700'>BTP - Senior Physiotherapist</p>
              <div className='mt-2 pb-5 mb-3 border-b'>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  readOnly
                  // onChange={setRating}
                />
              </div>
              <div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <IoLocationOutline />
                  </p>
                  <p>Dhanmondi, Dhaka, Bangladesh</p>
                </div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <CiCalendar />
                  </p>
                  <p>Available On Mon, 22 December</p>
                </div>
                <div className='flex items-center'>
                  <p className='text-lg mr-6'>
                    <AiOutlineDollarCircle />
                  </p>
                  <p>$15</p>
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='button'
                  className='w-full  py-3 mt-7 px-4  gap-x-2 text-sm font-medium rounded-lg border border-[#F7A582] text-[#F7A582] hover:border-[#F7A582] hover:text-[#000000FF] focus:outline-hidden focus:border-[#F7A582] hover:bg-[#F7A582] focus:text-[#000000FF] disabled:opacity-50 disabled:pointer-events-none'
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div>
          <div className='flex flex-col w-full md:w-80 p-2 bg-white border-2 border-gray-200 shadow-2xs rounded-xl  dark:border-neutral-700 dark:shadow-neutral-700/70'>
            <img
              className='w-full h-auto rounded-2xl'
              src={expert_doc_1}
              alt='Card Image'
            />
            <div className='mt-4'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                Karyen Anderson{' '}
              </h3>
              <p className='sm text-slate-700'>BTP - Senior Physiotherapist</p>
              <div className='mt-2 pb-5 mb-3 border-b'>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  readOnly
                  // onChange={setRating}
                />
              </div>
              <div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <IoLocationOutline />
                  </p>
                  <p>Dhanmondi, Dhaka, Bangladesh</p>
                </div>
                <div className='flex items-center mb-2'>
                  <p className='text-lg mr-6'>
                    <CiCalendar />
                  </p>
                  <p>Available On Mon, 22 December</p>
                </div>
                <div className='flex items-center'>
                  <p className='text-lg mr-6'>
                    <AiOutlineDollarCircle />
                  </p>
                  <p>$15</p>
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                onClick={()=>navigate(`/doctor-profile/1`)}
                  type='button'
                  className='w-full  py-3 mt-7 px-4  gap-x-2 text-sm font-medium rounded-lg border border-[#F7A582] text-[#F7A582] hover:border-[#F7A582] hover:text-[#000000FF] focus:outline-hidden focus:border-[#F7A582] hover:bg-[#F7A582] focus:text-[#000000FF] disabled:opacity-50 disabled:pointer-events-none'
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertDoctor
