import React from 'react'

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const BusinessHourForm = ({ hours, onHourChange, onAddHour, onRemoveHour, onResetHours }) => {
  const options = daysOfWeek.includes('Custom') ? daysOfWeek : [...daysOfWeek, 'Custom']

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h3 className='text-base font-semibold text-gray-800'>Weekly Schedule</h3>
          <p className='text-sm text-gray-500'>
            Configure availability, including off days and special notes.
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={onResetHours}
            className='rounded-lg border border-[#07332F] px-3 py-2 text-sm font-semibold text-[#07332F] transition hover:bg-[#07332F]/10 focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          >
            Reset Week
          </button>
          <button
            type='button'
            onClick={onAddHour}
            className='rounded-lg bg-[#07332F] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          >
            Add Custom Slot
          </button>
        </div>
      </div>

      <div className='space-y-4'>
        {hours.map((item, index) => (
          <div
            key={`bh-${index}-${item.day}`}
            className='flex flex-col gap-4 rounded-xl border border-gray-100 bg-white/90 p-4 shadow-sm shadow-gray-100 md:flex-row md:items-center'
          >
            <div className='flex w-full flex-col gap-2 md:max-w-[140px]'>
              <label className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                Day
              </label>
              <select
                value={item.day}
                onChange={event => onHourChange(index, 'day', event.target.value)}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
              >
                {options.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                  Opens
                </label>
                <input
                  type='time'
                  value={item.open}
                  onChange={event => onHourChange(index, 'open', event.target.value)}
                  disabled={item.isClose}
                  className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40 disabled:cursor-not-allowed disabled:bg-gray-100'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                  Closes
                </label>
                <input
                  type='time'
                  value={item.close}
                  onChange={event => onHourChange(index, 'close', event.target.value)}
                  disabled={item.isClose}
                  className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40 disabled:cursor-not-allowed disabled:bg-gray-100'
                />
              </div>

              <div className='space-y-2 sm:col-span-2 md:col-span-1'>
                <label className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                  Special Notes
                </label>
                <input
                  type='text'
                  value={item.special_notes}
                  disabled={item.isClose}
                  onChange={event => onHourChange(index, 'special_notes', event.target.value)}
                  placeholder='e.g. Telehealth appointments only'
                  className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
                />
              </div>
            </div>

            <div className='flex flex-col items-start gap-3 md:w-32'>
              <label className='inline-flex items-center gap-2 text-sm font-medium text-gray-700'>
                <input
                  type='checkbox'
                  checked={item.isClose}
                  onChange={event => onHourChange(index, 'isClose', event.target.checked)}
                  className='size-4 rounded border-gray-300 text-[#07332F] focus:ring-[#07332F]'
                />
                Closed
              </label>
              {hours.length > 1 ? (
                <button
                  type='button'
                  onClick={() => onRemoveHour(index)}
                  className='text-sm font-semibold text-red-500 hover:text-red-600'
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessHourForm
