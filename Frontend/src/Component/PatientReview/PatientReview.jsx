import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// Import required module
import { Navigation } from 'swiper/modules'
const PatientReview = () => {
  const data = [1, 2, 3]
  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>Our Expert Doctors</h1>
      <p className='text-center  my-8'>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>

      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {data.map((item, index) => (
          <SwiperSlide key={index} className='w-full'>
            <div className='md:flex pb-1 md:space-x-5 md:space-y-0 mx-6 space-y-5'>
              <div className='border rounded-lg py-8 px-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img
                      alt=''
                      src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      className='inline-block size-16 rounded-full ring-2 ring-[#F7A582]'
                    />
                    <div className='ml-3'>
                      <p className='font-semibold text-lg'>Awlad Hossain</p>
                      <p>Product Designer</p>
                    </div>
                  </div>
                  <p className='text-6xl text-[#F7A582]'>
                    <FaQuoteLeft />
                  </p>
                </div>
                <p className='mt-5 text-justify'>
                  Lorem Ipsum has been the industry’s standard dummy text ever
                  since the 1500s, when an unknow printer tool a galley of type
                  and scrambled it to make type specimen book has survived not
                  only five centurines.
                </p>
              </div>
              <div className='border rounded-lg py-8 px-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img
                      alt=''
                      src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      className='inline-block size-16 rounded-full ring-2 ring-[#F7A582]'
                    />
                    <div className='ml-3'>
                      <p className='font-semibold text-lg'>Awlad Hossain</p>
                      <p>Product Designer</p>
                    </div>
                  </div>
                  <p className='text-6xl text-[#F7A582]'>
                    <FaQuoteLeft />
                  </p>
                </div>
                <p className='mt-5 text-justify'>
                  Lorem Ipsum has been the industry’s standard dummy text ever
                  since the 1500s, when an unknow printer tool a galley of type
                  and scrambled it to make type specimen book has survived not
                  only five centurines.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    
    </section>
  )
}

export default PatientReview
