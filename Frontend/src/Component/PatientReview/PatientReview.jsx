import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const reviews = [
  {
    id: 1,
    name: 'Awlad Hossain',
    role: 'Product Designer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=256&h=256&q=80',
    rating: 4.9,
    visit: 'Back pain relief',
    quote:
      'The physio team listened carefully and built a plan that fit my busy schedule. I felt cared for from booking to follow-up.'
  },
  {
    id: 2,
    name: 'Salma Akter',
    role: 'Teacher',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=256&h=256&q=80',
    rating: 4.8,
    visit: 'Preventive checkup',
    quote:
      'Everything was simple: reminders, paperwork, and the doctor took time to explain each step. It felt like a partnership.'
  },
  {
    id: 3,
    name: 'Rayhan Chowdhury',
    role: 'Entrepreneur',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=256&h=256&q=80',
    rating: 4.7,
    visit: 'Cardio consult',
    quote:
      'The clinic blended technology with warmth. Test results, advice, and next actions were crystal clear. Highly recommend.'
  }
]

const PatientReview = () => {
  return (
    <section className='mt-16'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07332F] via-[#0c4b43] to-[#041a17] px-6 py-10 text-white shadow-2xl shadow-[#07332F]/30 md:px-10'>
        <div className='pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-[#F7A582]/25 blur-3xl' />
        <div className='pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl' />

        <div className='relative flex flex-col gap-3'>
          <p className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80'>
            Patient voices
          </p>
          <h1 className='text-4xl font-semibold'>Real experiences, real care</h1>
          <p className='max-w-3xl text-slate-100/80'>
            Stories from patients who trusted us with their health. Transparent
            feedback keeps us improving every visit.
          </p>
        </div>

        <div className='relative mt-10'>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2 }
            }}
            style={{
              '--swiper-navigation-color': '#F7A582',
              '--swiper-pagination-color': '#F7A582'
            }}
            className='pb-12'
          >
            {reviews.map(review => (
              <SwiperSlide key={review.id} className='h-auto'>
                <div className='group relative h-full rounded-2xl border border-white/30 bg-white/95 p-6 text-[#07332F] shadow-xl shadow-black/10 backdrop-blur'>
                  <div className='pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full bg-[#F7A582]/20 blur-2xl transition duration-300 group-hover:scale-110' />
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                      <img
                        alt={review.name}
                        src={review.avatar}
                        className='inline-block size-14 rounded-full ring-2 ring-[#F7A582]/80'
                      />
                      <div>
                        <p className='text-lg font-semibold'>{review.name}</p>
                        <p className='text-sm text-slate-600'>{review.role}</p>
                        <p className='text-xs font-semibold text-[#F7A582]'>
                          {review.visit}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col items-end text-[#F7A582]'>
                      <FaQuoteLeft className='text-3xl' />
                      <Rating
                        style={{ maxWidth: 110 }}
                        value={review.rating}
                        readOnly
                      />
                      <span className='mt-1 text-xs font-semibold text-slate-500'>
                        {review.rating} / 5
                      </span>
                    </div>
                  </div>
                  <p className='mt-4 text-base leading-relaxed text-slate-700'>
                    {review.quote}
                  </p>
                  <div className='mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>
                    <span className='h-2 w-2 rounded-full bg-[#F7A582]' />
                    Verified patient
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default PatientReview
