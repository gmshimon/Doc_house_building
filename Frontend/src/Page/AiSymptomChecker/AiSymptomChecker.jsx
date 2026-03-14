import React, { useEffect, useState } from 'react'

const AiSymptomChecker = () => {
  const [formData, setFormData] = useState({
    symptomText: '',
    age: '',
    gender: '',
    duration: ''
  })
  const [triageNote, setTriageNote] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setStatus('submitting')

    const { symptomText, age, gender, duration } = formData
    const notes = [
      symptomText && `Key concern: ${symptomText.trim()}.`,
      duration && `It has lasted ${duration.trim()}.`,
      age && `Age noted: ${age} years.`,
      gender && `Gender noted: ${gender}.`
    ].filter(Boolean)

    setTriageNote({
      headline: 'Preliminary intake note',
      bullets:
        notes.length > 0
          ? notes
          : ['Add symptoms to generate a quick handoff note for the care team.']
    })
    setStatus('ready')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pt-32 pb-16 text-[#07332F]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-5'>
        <div className='space-y-3'>
          <span className='inline-flex items-center gap-2 rounded-full border border-[#07332F]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#07332F]'>
            AI Symptom Checker
          </span>
          <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>
            Tell us what you are feeling
          </h1>
          <p className='max-w-3xl text-slate-600'>
            Share your symptoms and basic details. We will draft a concise note so our clinicians can
            triage faster. This is not medical advice—seek emergency care for urgent issues.
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-[1.05fr,0.95fr]'>
          <section className='relative overflow-hidden rounded-3xl border border-[#07332F]/10 bg-white/95 p-6 shadow-xl shadow-[#07332F]/10 backdrop-blur'>
            <div
              className='pointer-events-none absolute -left-24 -top-28 h-60 w-60 rounded-full bg-lime-300/20 blur-3xl'
              aria-hidden='true'
            />
            <div
              className='pointer-events-none absolute -right-14 bottom-0 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl'
              aria-hidden='true'
            />

            <div className='relative space-y-4'>
              <h2 className='text-2xl font-semibold'>What to expect</h2>
              <ul className='space-y-3 text-sm text-slate-700'>
                <li className='flex gap-3 rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3'>
                  <span className='mt-0.5 h-2 w-2 rounded-full bg-lime-300' />
                  Quick intake summary you can share with your provider.
                </li>
                <li className='flex gap-3 rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3'>
                  <span className='mt-0.5 h-2 w-2 rounded-full bg-cyan-300' />
                  We do not give diagnoses—emergencies should go straight to urgent care or 911.
                </li>
                <li className='flex gap-3 rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3'>
                  <span className='mt-0.5 h-2 w-2 rounded-full bg-amber-300' />
                  The more detail you share, the better the note for the clinical team.
                </li>
              </ul>

              <div className='mt-6 rounded-3xl border border-lime-300/30 bg-lime-50 p-4 shadow-inner shadow-lime-200/60'>
                <p className='text-sm font-semibold text-[#07332F]'>Your AI handoff note</p>
                {triageNote ? (
                  <div className='mt-3 space-y-2 text-sm text-[#07332F]'>
                    <p className='font-semibold'>{triageNote.headline}</p>
                    <ul className='space-y-1'>
                      {triageNote.bullets.map((item, index) => (
                        <li key={index} className='flex gap-2'>
                          <span className='mt-1 h-1.5 w-1.5 rounded-full bg-lime-300' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className='mt-2 text-sm text-slate-700'>
                    Submit the form to instantly draft a note you can reference when booking an appointment.
                  </p>
                )}
              </div>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className='rounded-3xl border border-[#07332F]/10 bg-white p-6 shadow-xl shadow-[#07332F]/10 backdrop-blur'
          >
            <div className='space-y-5'>
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-[#07332F]' htmlFor='symptomText'>
                  Describe your symptoms
                </label>
                <textarea
                  id='symptomText'
                  name='symptomText'
                  required
                  rows='4'
                  value={formData.symptomText}
                  onChange={handleChange}
                  placeholder='Example: Persistent headache with light sensitivity and mild nausea.'
                  className='w-full rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3 text-sm text-[#07332F] placeholder-slate-400 transition focus:border-lime-400/70 focus:outline-none focus:ring-2 focus:ring-lime-300/40'
                />
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-[#07332F]' htmlFor='age'>
                    Age
                  </label>
                  <input
                    id='age'
                    name='age'
                    type='number'
                    min='0'
                    required
                    value={formData.age}
                    onChange={handleChange}
                    placeholder='e.g., 34'
                    className='w-full rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3 text-sm text-[#07332F] placeholder-slate-400 transition focus:border-lime-400/70 focus:outline-none focus:ring-2 focus:ring-lime-300/40'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-[#07332F]' htmlFor='gender'>
                    Gender
                  </label>
                  <select
                    id='gender'
                    name='gender'
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className='w-full rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3 text-sm text-[#07332F] transition focus:border-lime-400/70 focus:outline-none focus:ring-2 focus:ring-lime-300/40'
                  >
                    <option value='' disabled className='text-gray-400'>
                      Select an option
                    </option>
                    <option value='Female'>Female</option>
                    <option value='Male'>Male</option>
                    <option value='Non-binary'>Non-binary</option>
                    <option value='Prefer not to say'>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-semibold text-[#07332F]' htmlFor='duration'>
                  How long has this been happening?
                </label>
                <input
                  id='duration'
                  name='duration'
                  type='text'
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder='e.g., 3 days, 2 weeks, since this morning'
                  className='w-full rounded-2xl border border-[#07332F]/10 bg-white px-4 py-3 text-sm text-[#07332F] placeholder-slate-400 transition focus:border-lime-400/70 focus:outline-none focus:ring-2 focus:ring-lime-300/40'
                />
              </div>
            </div>

            <div className='mt-6 flex flex-col gap-3'>
              <button
                type='submit'
                disabled={status === 'submitting'}
                className='inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F7A582] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F7A582]/40 transition hover:bg-[#f7976c] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {status === 'submitting' ? 'Checking...' : 'Check symptoms'}
              </button>
              <p className='text-xs text-slate-600'>
                This tool does not replace a medical professional. Call emergency services if your symptoms feel
                life-threatening.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AiSymptomChecker
