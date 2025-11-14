import React, { useState } from 'react'

const ListInput = ({ label, items, placeholder, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setInputValue('')
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-semibold text-gray-700'>{label}</label>
      <div className='flex items-center gap-2'>
        <input
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        />
        <button
          type='button'
          onClick={handleAdd}
          className='rounded-lg bg-[#07332F] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        >
          Add
        </button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {items.map(item => (
          <span
            key={item}
            className='inline-flex items-center gap-2 rounded-full bg-[#07332F]/10 px-3 py-1 text-xs font-medium text-[#07332F]'
          >
            {item}
            <button
              type='button'
              onClick={() => onRemove(item)}
              className='inline-flex size-5 items-center justify-center rounded-full bg-[#07332F]/10 text-[#07332F] hover:bg-[#07332F]/20'
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

const ProfileForm = ({ data, onFieldChange, onListItemAdd, onListItemRemove ,fileInput}) => {
  return (
    <div className='space-y-8 rounded-xl bg-white p-6 shadow-md'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Full Name *</label>
          <input
            type='text'
            value={data.name}
            onChange={event => onFieldChange('name', event.target.value)}
            placeholder='Dr. Jane Doe'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Email *</label>
          <input
            type='email'
            value={data.email}
            onChange={event => onFieldChange('email', event.target.value)}
            placeholder='doctor@dochouse.com'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Phone *</label>
          <input
            type='tel'
            value={data.phone}
            onChange={event => onFieldChange('phone', event.target.value)}
            placeholder='+1 555 123 4567'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
            required
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Qualification</label>
          <input
            type='text'
            value={data.qualification}
            onChange={event => onFieldChange('qualification', event.target.value)}
            placeholder='MBBS, MD – Cardiology'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Profile Image URL</label>
          <input
            type='file'
            accept='image/*'
            onChange={fileInput}
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-700'>Description</label>
          <textarea
            value={data.description}
            onChange={event => onFieldChange('description', event.target.value)}
            placeholder='Brief introduction, patient care philosophy, etc.'
            rows={4}
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
          />
        </div>
      </div>

      <ListInput
        label='Specialties'
        items={data.specialties}
        placeholder='e.g. Interventional Cardiology'
        onAdd={value => onListItemAdd('specialties', value)}
        onRemove={value => onListItemRemove('specialties', value)}
      />

      <ListInput
        label='Services'
        items={data.services}
        placeholder='e.g. Telemedicine Consultation'
        onAdd={value => onListItemAdd('services', value)}
        onRemove={value => onListItemRemove('services', value)}
      />
    </div>
  )
}

export default ProfileForm
