import React, { useState } from 'react'
import ProfileForm from './components/ProfileForm'
import QualificationForm from './components/QualificationForm'
import LocationForm from './components/LocationForm'
import BusinessHourForm from './components/BusinessHourForm'

const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'location', label: 'Locations' },
  { key: 'business_hour', label: 'Business Hours' }
]

const createDefaultBusinessHours = () =>
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ].map(day => ({
    day,
    open: '09:00',
    close: '17:00',
    isClose: day === 'Sunday',
    special_notes: ''
  }))

const blankEducation = { degree: '', company: '', startDate: '', endDate: '' }
const blankExperience = { title: '', company: '', startDate: '', endDate: '' }
const blankAward = { title: '', description: '', year: '' }
const blankBusinessHour = {
  day: 'Custom',
  open: '',
  close: '',
  isClose: false,
  special_notes: ''
}

const initialDoctorState = {
  profile: {
    name: '',
    email: '',
    phone: '',
    qualification: '',
    specialties: [],
    image: '',
    services: [],
    description: ''
  },
  education: [{ ...blankEducation }],
  experience: [{ ...blankExperience }],
  awards: [{ ...blankAward }],
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    map: '',
    institution: ''
  },
  businessHours: createDefaultBusinessHours()
}

const AdminAddDoctor = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [doctorData, setDoctorData] = useState(initialDoctorState)
  const [imageFile, setImageFile] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const handleProfileFieldChange = (field, value) => {
    setDoctorData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }))
  }

  const handleProfileListAdd = (field, value) => {
    setDoctorData(prev => {
      if (prev.profile[field].includes(value)) return prev
      return {
        ...prev,
        profile: {
          ...prev.profile,
          [field]: [...prev.profile[field], value]
        }
      }
    })
  }

  const handleProfileListRemove = (field, value) => {
    setDoctorData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: prev.profile[field].filter(item => item !== value)
      }
    }))
  }

  const handleFileInput = e => {
    const file = e.target.files[0]
    setImageFile(file)
  }

  const updateCollectionItem = (collectionKey, index, field, value) => {
    setDoctorData(prev => {
      const updatedCollection = prev[collectionKey].map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
      return {
        ...prev,
        [collectionKey]: updatedCollection
      }
    })
  }

  const addCollectionItem = (collectionKey, template) => {
    setDoctorData(prev => ({
      ...prev,
      [collectionKey]: [...prev[collectionKey], { ...template }]
    }))
  }

  const removeCollectionItem = (collectionKey, index) => {
    setDoctorData(prev => {
      const filtered = prev[collectionKey].filter((_, idx) => idx !== index)
      return {
        ...prev,
        [collectionKey]: filtered.length
          ? filtered
          : [{ ...initialDoctorState[collectionKey][0] }]
      }
    })
  }

  const handleAddressChange = (field, value) => {
    setDoctorData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleBusinessHourChange = (index, field, value) => {
    setDoctorData(prev => {
      const updated = prev.businessHours.map((item, idx) => {
        if (idx !== index) return item
        const nextItem = { ...item, [field]: value }

        if (field === 'isClose') {
          if (value) {
            nextItem.open = ''
            nextItem.close = ''
          } else {
            nextItem.open = nextItem.open || '09:00'
            nextItem.close = nextItem.close || '17:00'
          }
        }

        return nextItem
      })
      return {
        ...prev,
        businessHours: updated
      }
    })
  }

  const addBusinessHour = () =>
    addCollectionItem('businessHours', blankBusinessHour)
  const removeBusinessHour = index =>
    removeCollectionItem('businessHours', index)
  const resetBusinessHours = () =>
    setDoctorData(prev => ({
      ...prev,
      businessHours: createDefaultBusinessHours()
    }))

  const handleSubmit = event => {
    event.preventDefault()
    setStatusMessage(
      'Doctor profile payload prepared. Check console for the JSON object.'
    )
    // eslint-disable-next-line no-console
    console.log('Doctor payload', doctorData)

    const formData = new FormData()
    const appendFormData = (formData, data, parentKey = '') => {
      if (data && typeof data === 'object' && !(data instanceof File)) {
        if (Array.isArray(data)) {
          data.forEach((value, index) => {
            appendFormData(formData, value, `${parentKey}[${index}]`)
          })
        } else {
          Object.keys(data).forEach(key => {
            const value = data[key]
            const formKey = parentKey ? `${parentKey}.${key}` : key
            appendFormData(formData, value, formKey)
          })
        }
      } else {
        formData.append(parentKey, data)
      }
    }

    // append doctorData to formData
    appendFormData(formData, doctorData)

    // append image file if exists
    if (imageFile) {
      formData.append('file', imageFile)
    }
  }

  return (
    <section className='bg-[#F1F5F9]'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto max-w-7xl  px-4 pb-16 pt-10'
      >
        <header className='rounded-2xl bg-white p-4 shadow-md w-full mb-4'>
          <nav className='flex justify-evenly'>
            {tabs.map(tab => (
              <button
                key={tab.key}
                type='button'
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#07332F]/30 ${
                  activeTab === tab.key
                    ? 'bg-[#07332F] text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className='mb-8 flex items-center justify-end'>
          <button className='rounded-lg bg-[#07332F] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus:outline-none focus:ring-2 focus:ring-[#07332F]/40'>
            Submit
          </button>
        </div>

        <div className='space-y-6'>
          {activeTab === 'profile' ? (
            <ProfileForm
              data={doctorData.profile}
              onFieldChange={handleProfileFieldChange}
              onListItemAdd={handleProfileListAdd}
              onListItemRemove={handleProfileListRemove}
              fileInput={handleFileInput}
            />
          ) : null}

          {activeTab === 'qualification' ? (
            <QualificationForm
              education={doctorData.education}
              experience={doctorData.experience}
              awards={doctorData.awards}
              onEducationChange={(index, field, value) =>
                updateCollectionItem('education', index, field, value)
              }
              onAddEducation={() =>
                addCollectionItem('education', blankEducation)
              }
              onRemoveEducation={index =>
                removeCollectionItem('education', index)
              }
              onExperienceChange={(index, field, value) =>
                updateCollectionItem('experience', index, field, value)
              }
              onAddExperience={() =>
                addCollectionItem('experience', blankExperience)
              }
              onRemoveExperience={index =>
                removeCollectionItem('experience', index)
              }
              onAwardChange={(index, field, value) =>
                updateCollectionItem('awards', index, field, value)
              }
              onAddAward={() => addCollectionItem('awards', blankAward)}
              onRemoveAward={index => removeCollectionItem('awards', index)}
            />
          ) : null}

          {activeTab === 'location' ? (
            <LocationForm
              data={doctorData.address}
              onFieldChange={handleAddressChange}
            />
          ) : null}

          {activeTab === 'business_hour' ? (
            <BusinessHourForm
              hours={doctorData.businessHours}
              onHourChange={handleBusinessHourChange}
              onAddHour={addBusinessHour}
              onRemoveHour={removeBusinessHour}
              onResetHours={resetBusinessHours}
            />
          ) : null}
        </div>
      </form>
    </section>
  )
}

export default AdminAddDoctor
