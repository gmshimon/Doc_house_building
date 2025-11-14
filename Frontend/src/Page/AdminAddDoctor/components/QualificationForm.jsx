import React from 'react'

const SectionHeader = ({ title, subtitle, actionLabel, onAction }) => (
  <div className='flex flex-wrap items-center justify-between gap-3'>
    <div>
      <h3 className='text-base font-semibold text-gray-800'>{title}</h3>
      <p className='text-sm text-gray-500'>{subtitle}</p>
    </div>
    <button
      type='button'
      onClick={onAction}
      className='rounded-lg bg-[#07332F] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
    >
      {actionLabel}
    </button>
  </div>
)

const InputField = ({ label, type = 'text', value, onChange, placeholder, required }) => (
  <div className='space-y-2'>
    <label className='block text-sm font-semibold text-gray-700'>{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        required={required}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'
        required={required}
      />
    )}
  </div>
)

const Card = ({ children, onRemove, removable }) => (
  <div className='relative rounded-xl border border-gray-100 bg-white/90 p-5 shadow-sm shadow-gray-100'>
    {removable ? (
      <button
        type='button'
        onClick={onRemove}
        className='absolute -top-3 -right-3 inline-flex size-7 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-300'
      >
        ×
      </button>
    ) : null}
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>{children}</div>
  </div>
)

const QualificationForm = ({
  education,
  experience,
  awards,
  onEducationChange,
  onAddEducation,
  onRemoveEducation,
  onExperienceChange,
  onAddExperience,
  onRemoveExperience,
  onAwardChange,
  onAddAward,
  onRemoveAward
}) => {
  return (
    <div className='space-y-10'>
      <div className='rounded-xl bg-white p-6 shadow-md'>
        <SectionHeader
          title='Education'
          subtitle='Academic history that supports the doctor’s expertise.'
          actionLabel='Add Education'
          onAction={onAddEducation}
        />

        <div className='mt-5 space-y-5'>
          {education.map((item, index) => (
            <Card
              key={`education-${index}`}
              removable={education.length > 1}
              onRemove={() => onRemoveEducation(index)}
            >
              <InputField
                label='Degree'
                value={item.degree}
                onChange={event => onEducationChange(index, 'degree', event.target.value)}
                placeholder='MBBS'
                required
              />
              <InputField
                label='Institution'
                value={item.company}
                onChange={event => onEducationChange(index, 'company', event.target.value)}
                placeholder='Harvard Medical School'
                required
              />
              <InputField
                type='date'
                label='Start Date'
                value={item.startDate}
                onChange={event => onEducationChange(index, 'startDate', event.target.value)}
              />
              <InputField
                type='date'
                label='End Date'
                value={item.endDate}
                onChange={event => onEducationChange(index, 'endDate', event.target.value)}
              />
            </Card>
          ))}
        </div>
      </div>

      <div className='rounded-xl bg-white p-6 shadow-md'>
        <SectionHeader
          title='Experience'
          subtitle='Clinical experience or practice information.'
          actionLabel='Add Experience'
          onAction={onAddExperience}
        />

        <div className='mt-5 space-y-5'>
          {experience.map((item, index) => (
            <Card
              key={`experience-${index}`}
              removable={experience.length > 1}
              onRemove={() => onRemoveExperience(index)}
            >
              <InputField
                label='Role / Title'
                value={item.title}
                onChange={event => onExperienceChange(index, 'title', event.target.value)}
                placeholder='Senior Cardiologist'
                required
              />
              <InputField
                label='Hospital / Organization'
                value={item.company}
                onChange={event => onExperienceChange(index, 'company', event.target.value)}
                placeholder='Doc House, New York'
                required
              />
              <InputField
                type='date'
                label='Start Date'
                value={item.startDate}
                onChange={event => onExperienceChange(index, 'startDate', event.target.value)}
              />
              <InputField
                type='date'
                label='End Date'
                value={item.endDate}
                onChange={event => onExperienceChange(index, 'endDate', event.target.value)}
              />
            </Card>
          ))}
        </div>
      </div>

      <div className='rounded-xl bg-white p-6 shadow-md'>
        <SectionHeader
          title='Awards & Recognition'
          subtitle='Highlight notable achievements for added credibility.'
          actionLabel='Add Award'
          onAction={onAddAward}
        />

        <div className='mt-5 space-y-5'>
          {awards.map((item, index) => (
            <Card
              key={`award-${index}`}
              removable={awards.length > 1}
              onRemove={() => onRemoveAward(index)}
            >
              <InputField
                label='Award Title'
                value={item.title}
                onChange={event => onAwardChange(index, 'title', event.target.value)}
                placeholder='Best Cardiologist Award'
              />
              <InputField
                label='Year'
                value={item.year}
                onChange={event => onAwardChange(index, 'year', event.target.value)}
                placeholder='2024'
              />
              <InputField
                type='textarea'
                label='Description'
                value={item.description}
                onChange={event => onAwardChange(index, 'description', event.target.value)}
                placeholder='Recognized for outstanding patient outcomes and innovations in ...'
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QualificationForm
