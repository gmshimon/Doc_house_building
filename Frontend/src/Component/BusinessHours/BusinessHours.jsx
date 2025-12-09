import React from 'react'
import { FaClock } from 'react-icons/fa'

const BusinessHours = ({ hours }) => {
  const data =
    hours && hours.length
      ? hours.map(item => ({
          day: item.day,
          open: item.isClose ? 'Closed' : item.open,
          close: item.isClose ? '' : item.close,
          note: item.special_notes
        }))
      : [
          { day: 'Monday', open: '09:00 AM', close: '05:00 PM' },
          { day: 'Tuesday', open: '09:00 AM', close: '05:00 PM' },
          { day: 'Wednesday', open: '09:00 AM', close: '05:00 PM' },
          { day: 'Thursday', open: '09:00 AM', close: '05:00 PM' },
          { day: 'Friday', open: '09:00 AM', close: '05:00 PM' },
          { day: 'Saturday', open: '10:00 AM', close: '02:00 PM' },
          { day: 'Sunday', open: 'Closed', close: '' }
        ]

  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-3 rounded-2xl border border-[#07332F]/10 bg-white/95 px-4 py-3 shadow-sm shadow-[#07332F]/10 backdrop-blur'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7A582]/15 text-lg text-[#F7A582]'>
          <FaClock />
        </span>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
            Availability
          </p>
          <h2 className='text-lg font-semibold text-[#07332F]'>Business hours</h2>
        </div>
      </div>

      <div className='overflow-hidden rounded-2xl border border-[#07332F]/10 bg-white/95 shadow-md shadow-[#07332F]/10 backdrop-blur'>
        <div className='divide-y divide-[#07332F]/10'>
          {data.map((hour, index) => {
            const isClosed = hour.open.toLowerCase() === 'closed'
            return (
              <div
                key={hour.day}
                className={`flex items-center justify-between px-4 py-3 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'
                }`}
              >
                <span className='text-sm font-semibold text-[#07332F]'>{hour.day}</span>
                <span
                  className={`text-sm font-semibold ${
                    isClosed ? 'text-red-500' : 'text-slate-700'
                  }`}
                >
                  {isClosed ? 'Closed' : `${hour.open} - ${hour.close}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BusinessHours
