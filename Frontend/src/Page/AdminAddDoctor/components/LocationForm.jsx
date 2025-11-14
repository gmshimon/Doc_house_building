import React from 'react'

const LocationForm = ({ data, onFieldChange }) => (
  <div className='space-y-8 rounded-xl bg-white p-6 shadow-md'>
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>Street Address</label>
        <input
          type='text'
          value={data.street}
          onChange={event => onFieldChange('street', event.target.value)}
          placeholder='123 Main Street'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          required
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>City</label>
        <input
          type='text'
          value={data.city}
          onChange={event => onFieldChange('city', event.target.value)}
          placeholder='New York'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          required
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>State / Province</label>
        <input
          type='text'
          value={data.state}
          onChange={event => onFieldChange('state', event.target.value)}
          placeholder='NY'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>ZIP / Postal Code</label>
        <input
          type='text'
          value={data.zip}
          onChange={event => onFieldChange('zip', event.target.value)}
          placeholder='10001'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>Country</label>
        <input
          type='text'
          value={data.country}
          onChange={event => onFieldChange('country', event.target.value)}
          placeholder='United States'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          required
        />
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>Practice / Institution</label>
        <input
          type='text'
          value={data.institution}
          onChange={event => onFieldChange('institution', event.target.value)}
          placeholder='Doc House Clinic'
          className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        />
      </div>
    </div>

    <div className='space-y-2'>
      <label className='block text-sm font-semibold text-gray-700'>Google Maps URL</label>
      <input
        type='url'
        value={data.map}
        onChange={event => onFieldChange('map', event.target.value)}
        placeholder='https://maps.google.com/...'
        className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
      />
    </div>
  </div>
)

export default LocationForm
