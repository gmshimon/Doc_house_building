import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { aiSymptomAnalyze, reset } from '../../Redux/Slice/AISlice'
import { getServices } from '../../Redux/Slice/ServiceSlice'
import Loading from '../../Component/Loading/Loading'

const AiSymptomChecker = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
aiSymptomAnalyzeResponse,
    aiSymptomAnalyzeLoading,
    aiSymptomAnalyzeError
  } = useSelector(state => state.AI)
  const { services, getServicesLoading } = useSelector(state => state.services)

  const [formData, setFormData] = useState({
    symptomText: '',
    age: '',
    gender: '',
    duration: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getServices())
    return () => dispatch(reset())
  }, [dispatch])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(aiSymptomAnalyze(formData))
  }

  const handleBookCategory = categoryId => {
    if (!categoryId) return
    navigate(`/appointment?serviceId=${categoryId}`)
  }

  const urgencyTone = {
    emergency: 'bg-red-50 text-red-700 border-red-200',
    urgent: 'bg-amber-50 text-amber-700 border-amber-200',
    routine: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }

  const serviceLookup = useMemo(() => {
    const map = new Map()
    services?.forEach(service => map.set(String(service.id), service))
    return map
  }, [services])

  if (aiSymptomAnalyzeLoading || getServicesLoading) {
    return <Loading />
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pt-32 pb-16 text-[#07332F]'>
      <div className='mx-auto flex max-w-7xl flex-col gap-10 '>
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
                  <span className='mt-0.5 h-2 w-2 rounded-full bg-amber-300' />
                  The more detail you share, the better the note for the clinical team.
                </li>
              </ul>

              <div className='mt-6 rounded-3xl border border-lime-300/30 bg-lime-50 p-4 shadow-inner shadow-lime-200/60'>
                <p className='text-sm font-semibold text-[#07332F]'>Your AI handoff note</p>
                {aiSymptomAnalyzeResponse ? (
                  <div className='mt-3 space-y-4 text-sm text-[#07332F]'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-semibold text-base'>
                        {aiSymptomAnalyzeResponse.summary || 'Symptom summary generated'}
                      </p>
                      {aiSymptomAnalyzeResponse.urgency && (
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            urgencyTone[aiSymptomAnalyzeResponse.urgency] || 'bg-cyan-50 text-cyan-700 border-cyan-200'
                          }`}
                        >
                          {aiSymptomAnalyzeResponse.urgency}
                        </span>
                      )}
                    </div>

                    {Array.isArray(aiSymptomAnalyzeResponse.recommendedCategories) &&
                      aiSymptomAnalyzeResponse.recommendedCategories.length > 0 && (
                        <div className='space-y-3'>
                          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>
                            Suggested care pathways
                          </p>
                          <div className='grid gap-3 md:grid-cols-2'>
                            {aiSymptomAnalyzeResponse.recommendedCategories.map(category => {
                              const service =
                                serviceLookup.get(String(category.id)) || null
                              return (
                                <div
                                  key={category.id || category.name}
                                  className='flex h-full flex-col gap-3 rounded-2xl border border-[#07332F]/10 bg-white px-4 py-4 shadow-md shadow-[#07332F]/10'
                                >
                                  <div className='flex items-start justify-between gap-3'>
                                    <div>
                                      <p className='text-sm font-semibold text-[#07332F]'>
                                        {service?.name || category.name}
                                      </p>
                                      {category.id && (
                                        <p className='text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F7A582]'>
                                          Service ID: {category.id}
                                        </p>
                                      )}
                                    </div>
                                    {service?.fee && (
                                      <span className='rounded-full bg-[#07332F]/10 px-3 py-1 text-xs font-semibold text-[#07332F]'>
                                        ${service.fee}
                                      </span>
                                    )}
                                  </div>
                                  <p className='text-sm text-slate-600'>
                                    {service?.description ||
                                      'We recommend booking this service to address your symptoms.'}
                                  </p>
                                  <div className='flex flex-wrap gap-2 text-xs font-semibold text-[#07332F]'>
                                    {service?.duration && (
                                      <span className='inline-flex items-center gap-2 rounded-full bg-[#F7A582]/15 px-3 py-2 text-[#F7A582]'>
                                        {service.duration} mins
                                      </span>
                                    )}
                                    {service?.doctors && (
                                      <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[#07332F]'>
                                        {service.doctors.length} doctors
                                      </span>
                                    )}
                                  </div>
                                  <div className='mt-auto flex justify-end'>
                                    <button
                                      type='button'
                                      onClick={() => handleBookCategory(category.id)}
                                      className='inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#07332F] to-[#0d4d44] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#07332F]/15 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07332F]'
                                    >
                                      Book this service
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                    {Array.isArray(aiSymptomAnalyzeResponse.redFlags) && aiSymptomAnalyzeResponse.redFlags.length > 0 && (
                      <div className='space-y-2'>
                        <p className='text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>
                          Red flags detected
                        </p>
                        <ul className='space-y-1'>
                          {aiSymptomAnalyzeResponse.redFlags.map((flag, index) => (
                            <li key={index} className='flex gap-2 text-[#07332F]'>
                              <span className='mt-1 h-1.5 w-1.5 rounded-full bg-red-300' />
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiSymptomAnalyzeResponse.emergencyOverrideTriggered && (
                      <div
                        className={`rounded-2xl border px-3 py-2 text-xs font-semibold ${
                          aiSymptomAnalyzeResponse.emergencyOverrideTriggered.matched
                            ? 'border-red-200 bg-red-50 text-red-700'
                            : 'border-emerald-100 bg-white text-emerald-700'
                        }`}
                      >
                        Emergency override{' '}
                        {aiSymptomAnalyzeResponse.emergencyOverrideTriggered.matched ? 'triggered' : 'not triggered'}
                        {aiSymptomAnalyzeResponse.emergencyOverrideTriggered.matchedReasons &&
                          aiSymptomAnalyzeResponse.emergencyOverrideTriggered.matchedReasons.length > 0 && (
                            <ul className='mt-1 list-disc space-y-1 pl-4 text-slate-700'>
                              {aiSymptomAnalyzeResponse.emergencyOverrideTriggered.matchedReasons.map((reason, index) => (
                                <li key={index}>{reason}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                    )}

                    {aiSymptomAnalyzeResponse.disclaimer && (
                      <p className='text-xs text-slate-600'>{aiSymptomAnalyzeResponse.disclaimer}</p>
                    )}
                  </div>
                ) : (
                  <p className='mt-2 text-sm text-slate-700'>
                    Submit the form to instantly draft a note you can reference when booking an appointment.
                  </p>
                )}

                {aiSymptomAnalyzeError && (
                  <div className='mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
                    {aiSymptomAnalyzeError}
                  </div>
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
                disabled={aiSymptomAnalyzeLoading}
                className='inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F7A582] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F7A582]/40 transition hover:bg-[#f7976c] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {aiSymptomAnalyzeLoading ? 'Checking...' : 'Check symptoms'}
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
