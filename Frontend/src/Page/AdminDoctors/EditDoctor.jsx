import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeft,
  BriefcaseMedical,
  MapPin,
  Mail,
  Phone,
  Plus,
  Stethoscope,
  Trash2
} from 'lucide-react'
import Loading from '../../Component/Loading/Loading'
import { getDoctorById } from '../../Redux/Slice/DoctorSlice'
import { getServices } from '../../Redux/Slice/ServiceSlice'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  qualification: '',
  title: '',
  specialtiesText: '',
  description: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: ''
}

const blankEducation = { degree: '', company: '', startDate: '', endDate: '' }
const blankExperience = { title: '', company: '', startDate: '', endDate: '' }
const blankAward = { title: '', description: '', year: '' }
const blankHour = {
  day: '',
  open: '',
  close: '',
  isClose: false,
  consultationDuration: 30,
  special_notes: ''
}

const EditDoctor = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    doctorDetails,
    getDoctorDetailsLoading,
    getDoctorDetailsError
  } = useSelector(state => state.doctors)
  const { services } = useSelector(state => state.services)

  const [form, setForm] = useState(emptyForm)
  const [education, setEducation] = useState([blankEducation])
  const [experience, setExperience] = useState([blankExperience])
  const [awards, setAwards] = useState([blankAward])
  const [businessHours, setBusinessHours] = useState([blankHour])
  const [serviceIds, setServiceIds] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(getDoctorById(id))
    }
    dispatch(getServices())
  }, [dispatch, id])

  useEffect(() => {
    if (doctorDetails) {
      setForm({
        name: doctorDetails.name || '',
        email: doctorDetails.email || '',
        phone: doctorDetails.phone || '',
        qualification: doctorDetails.qualification || '',
        title: doctorDetails.title || '',
        specialtiesText: (doctorDetails.specialties || []).join(', '),
        description: doctorDetails.description || '',
        image: doctorDetails.image || doctorDetails.avatar || '',
        street: doctorDetails.address?.street || '',
        city: doctorDetails.address?.city || '',
        state: doctorDetails.address?.state || '',
        zip: doctorDetails.address?.zip || '',
        country: doctorDetails.address?.country || ''
      })
      setServiceIds(
        doctorDetails.services?.map(service => service.id)?.filter(Boolean) || []
      )
      setEducation(
        doctorDetails.education?.length
          ? doctorDetails.education.map(item => ({
              degree: item.degree || '',
              company: item.company || '',
              startDate: item.startDate || '',
              endDate: item.endDate || ''
            }))
          : [blankEducation]
      )
      setExperience(
        doctorDetails.experience?.length
          ? doctorDetails.experience.map(item => ({
              title: item.title || '',
              company: item.company || '',
              startDate: item.startDate || '',
              endDate: item.endDate || ''
            }))
          : [blankExperience]
      )
      setAwards(
        doctorDetails.award?.length
          ? doctorDetails.award.map(item => ({
              title: item.title || '',
              description: item.description || '',
              year: item.year || ''
            }))
          : [blankAward]
      )
      setBusinessHours(
        doctorDetails.business_hour?.length
          ? doctorDetails.business_hour.map(item => ({
              day: item.day || '',
              open: item.open || '',
              close: item.close || '',
              isClose: Boolean(item.isClose),
              consultationDuration: item.consultationDuration || 30,
              special_notes: item.special_notes || ''
            }))
          : [blankHour]
      )
    }
  }, [doctorDetails])

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const updateCollectionItem = (setter, template, index, field, value) => {
    setter(prev => {
      const copy = prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
      return copy.length ? copy : [{ ...template }]
    })
  }

  const addCollectionItem = (setter, template) => {
    setter(prev => [...prev, { ...template }])
  }

  const removeCollectionItem = (setter, index, template) => {
    setter(prev => {
      const filtered = prev.filter((_, idx) => idx !== index)
      return filtered.length ? filtered : [{ ...template }]
    })
  }

  const handleHourChange = (index, field, value) => {
    setBusinessHours(prev =>
      prev.map((item, idx) => {
        if (idx !== index) return item
        const updated = { ...item, [field]: value }
        if (field === 'isClose') {
          updated.isClose = value
          if (value) {
            updated.open = ''
            updated.close = ''
          }
        }
        return updated
      })
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    const payload = {
      id,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      qualification: form.qualification.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      specialties: form.specialtiesText
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
      serviceIds,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country
      },
      education,
      experience,
      award: awards,
      business_hour: businessHours
    }
    // Hook up to update doctor API when available
    // eslint-disable-next-line no-console
    console.log('Update doctor payload', payload)
  }

  const stats = useMemo(() => {
    if (!doctorDetails) {
      return { services: 0, education: 0, experience: 0, awards: 0 }
    }
    return {
      services: doctorDetails.services?.length || 0,
      education: education.length,
      experience: experience.length,
      awards: awards.length
    }
  }, [doctorDetails, education.length, experience.length, awards.length])

  if (getDoctorDetailsLoading) return <Loading />

  if (getDoctorDetailsError) {
    return (
      <section className='min-h-screen bg-[#F1F5F9] p-4 md:p-8'>
        <p className='text-sm text-red-600'>Failed to load doctor details.</p>
      </section>
    )
  }

  if (!doctorDetails) {
    return null
  }

  return (
    <section className='min-h-screen bg-[#F1F5F9] p-4 md:p-8'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-3'>
          <Link
            to='/dashboard/doctors'
            className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/30'
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[#07332F]'>
              Admin / Doctors
            </p>
            <h1 className='text-3xl font-semibold text-gray-900'>
              Edit {doctorDetails.name || 'Doctor'}
            </h1>
            <p className='text-sm text-gray-500'>
              Update profile, contact, specialties, and address.
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='rounded-full bg-white p-1 shadow-sm ring-1 ring-gray-100'>
            <img
              className='h-12 w-12 rounded-full object-cover'
              src={
                doctorDetails.image ||
                doctorDetails.avatar ||
                'https://i.pravatar.cc/100?img=66'
              }
              alt={doctorDetails.name || 'Doctor avatar'}
            />
          </div>
          <div className='text-right'>
            <p className='text-xs text-gray-500'>Assigned services</p>
            <p className='text-lg font-semibold text-gray-900'>{stats.services}</p>
          </div>
        </div>
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-4'>
        <div className='rounded-2xl border border-white/60 bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Services</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.services}</p>
        </div>
        <div className='rounded-2xl border border-white/60 bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Education</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.education}</p>
        </div>
        <div className='rounded-2xl border border-white/60 bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Experience</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.experience}</p>
        </div>
        <div className='rounded-2xl border border-white/60 bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Awards</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.awards}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-6 space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
      >
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Name</label>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
              required
            />
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Title</label>
            <input
              name='title'
              value={form.title}
              onChange={handleChange}
              placeholder='e.g. Pediatrician'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          <div className='space-y-1'>
            <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
              <Mail size={14} />
              Email
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>
          <div className='space-y-1'>
            <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
              <Phone size={14} />
              Phone
            </label>
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-semibold text-gray-800'>Qualification</label>
            <input
              name='qualification'
              value={form.qualification}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-800'>Specialties</label>
          <textarea
            name='specialtiesText'
            value={form.specialtiesText}
            onChange={handleChange}
            placeholder='Comma separated e.g. Dental, Pediatrics'
            rows={2}
            className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-semibold text-gray-800'>Services</label>
          <select
            multiple
            value={serviceIds}
            onChange={e =>
              setServiceIds(Array.from(e.target.selectedOptions).map(opt => Number(opt.value)))
            }
            className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
          >
            {services.length ? (
              services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.duration} min)
                </option>
              ))
            ) : (
              <option disabled value=''>
                No services available
              </option>
            )}
          </select>
          <p className='text-xs text-gray-500'>
            Hold Ctrl/Cmd to select multiple services.
          </p>
        </div>

        <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-800'>Description</label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            rows={3}
            className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
          />
        </div>

        <div className='space-y-1'>
          <label className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
            <MapPin size={14} />
            Address
          </label>
          <div className='grid gap-3 md:grid-cols-2'>
            <input
              name='street'
              value={form.street}
              onChange={handleChange}
              placeholder='Street'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
            <input
              name='city'
              value={form.city}
              onChange={handleChange}
              placeholder='City'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
            <input
              name='state'
              value={form.state}
              onChange={handleChange}
              placeholder='State'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
            <input
              name='zip'
              value={form.zip}
              onChange={handleChange}
              placeholder='ZIP'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
            <input
              name='country'
              value={form.country}
              onChange={handleChange}
              placeholder='Country'
              className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
            />
          </div>
        </div>

        {/* <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-800'>Profile image URL</label>
          <input
            name='image'
            value={form.image}
            onChange={handleChange}
            placeholder='https://...'
            className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#07332F] focus:outline-none focus:ring-2 focus:ring-[#07332F]/15'
          />
        </div> */}

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>Education</h3>
            <button
              type='button'
              onClick={() => addCollectionItem(setEducation, blankEducation)}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/20'
            >
              <Plus size={14} />
              Add education
            </button>
          </div>
          <div className='space-y-3'>
            {education.map((item, idx) => (
              <div key={idx} className='rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2'>
                <div className='grid gap-2 md:grid-cols-2'>
                  <input
                    value={item.degree}
                    onChange={e =>
                      updateCollectionItem(setEducation, blankEducation, idx, 'degree', e.target.value)
                    }
                    placeholder='Degree'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    value={item.company}
                    onChange={e =>
                      updateCollectionItem(setEducation, blankEducation, idx, 'company', e.target.value)
                    }
                    placeholder='Institution'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='date'
                    value={item.startDate}
                    onChange={e =>
                      updateCollectionItem(setEducation, blankEducation, idx, 'startDate', e.target.value)
                    }
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='date'
                    value={item.endDate}
                    onChange={e =>
                      updateCollectionItem(setEducation, blankEducation, idx, 'endDate', e.target.value)
                    }
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                </div>
                {education.length > 1 ? (
                  <button
                    type='button'
                    onClick={() => removeCollectionItem(setEducation, idx, blankEducation)}
                    className='inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100'
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>Experience</h3>
            <button
              type='button'
              onClick={() => addCollectionItem(setExperience, blankExperience)}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/20'
            >
              <Plus size={14} />
              Add experience
            </button>
          </div>
          <div className='space-y-3'>
            {experience.map((item, idx) => (
              <div key={idx} className='rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2'>
                <div className='grid gap-2 md:grid-cols-2'>
                  <input
                    value={item.title}
                    onChange={e =>
                      updateCollectionItem(setExperience, blankExperience, idx, 'title', e.target.value)
                    }
                    placeholder='Title'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    value={item.company}
                    onChange={e =>
                      updateCollectionItem(setExperience, blankExperience, idx, 'company', e.target.value)
                    }
                    placeholder='Company'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='date'
                    value={item.startDate}
                    onChange={e =>
                      updateCollectionItem(setExperience, blankExperience, idx, 'startDate', e.target.value)
                    }
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='date'
                    value={item.endDate}
                    onChange={e =>
                      updateCollectionItem(setExperience, blankExperience, idx, 'endDate', e.target.value)
                    }
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                </div>
                {experience.length > 1 ? (
                  <button
                    type='button'
                    onClick={() => removeCollectionItem(setExperience, idx, blankExperience)}
                    className='inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100'
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>Awards</h3>
            <button
              type='button'
              onClick={() => addCollectionItem(setAwards, blankAward)}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/20'
            >
              <Plus size={14} />
              Add award
            </button>
          </div>
          <div className='space-y-3'>
            {awards.map((item, idx) => (
              <div key={idx} className='rounded-xl border border-amber-100 bg-amber-50 p-3 space-y-2'>
                <input
                  value={item.title}
                  onChange={e =>
                    updateCollectionItem(setAwards, blankAward, idx, 'title', e.target.value)
                  }
                  placeholder='Title'
                  className='w-full rounded-lg border border-amber-200 px-3 py-2 text-sm'
                />
                <input
                  value={item.description}
                  onChange={e =>
                    updateCollectionItem(setAwards, blankAward, idx, 'description', e.target.value)
                  }
                  placeholder='Description'
                  className='w-full rounded-lg border border-amber-200 px-3 py-2 text-sm'
                />
                <input
                  value={item.year}
                  onChange={e =>
                    updateCollectionItem(setAwards, blankAward, idx, 'year', e.target.value)
                  }
                  placeholder='Year'
                  className='w-full rounded-lg border border-amber-200 px-3 py-2 text-sm'
                />
                {awards.length > 1 ? (
                  <button
                    type='button'
                    onClick={() => removeCollectionItem(setAwards, idx, blankAward)}
                    className='inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100'
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold text-gray-900'>Business Hours</h3>
            <button
              type='button'
              onClick={() => addCollectionItem(setBusinessHours, blankHour)}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/20'
            >
              <Plus size={14} />
              Add slot
            </button>
          </div>
          <div className='space-y-3'>
            {businessHours.map((item, idx) => (
              <div key={idx} className='rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2'>
                <div className='grid gap-2 md:grid-cols-2'>
                  <input
                    value={item.day}
                    onChange={e => handleHourChange(idx, 'day', e.target.value)}
                    placeholder='Day'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <div className='flex items-center gap-3'>
                    <label className='flex items-center gap-2 text-xs font-semibold text-gray-700'>
                      <input
                        type='checkbox'
                        checked={item.isClose}
                        onChange={e => handleHourChange(idx, 'isClose', e.target.checked)}
                        className='rounded border-gray-300 text-[#07332F] focus:ring-[#07332F]'
                      />
                      Closed
                    </label>
                  </div>
                  <input
                    type='time'
                    value={item.open}
                    onChange={e => handleHourChange(idx, 'open', e.target.value)}
                    disabled={item.isClose}
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='time'
                    value={item.close}
                    onChange={e => handleHourChange(idx, 'close', e.target.value)}
                    disabled={item.isClose}
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                  <input
                    type='number'
                    min='5'
                    value={item.consultationDuration}
                    onChange={e => handleHourChange(idx, 'consultationDuration', Number(e.target.value))}
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                    placeholder='Duration (min)'
                  />
                  <input
                    value={item.special_notes}
                    onChange={e => handleHourChange(idx, 'special_notes', e.target.value)}
                    placeholder='Notes'
                    className='rounded-lg border border-gray-200 px-3 py-2 text-sm'
                  />
                </div>
                {businessHours.length > 1 ? (
                  <button
                    type='button'
                    onClick={() => removeCollectionItem(setBusinessHours, idx, blankHour)}
                    className='inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100'
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center justify-end gap-3'>
          <Link
            to='/dashboard/doctors'
            className='rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/15'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='inline-flex items-center gap-2 rounded-xl bg-[#07332F] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#062b29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07332F]/40'
          >
            <Stethoscope size={16} />
            Save doctor
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditDoctor
