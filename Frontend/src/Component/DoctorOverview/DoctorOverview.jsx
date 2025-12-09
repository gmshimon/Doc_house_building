import React, { useMemo } from 'react'

const SectionCard = ({ title, children }) => (
  <div className='rounded-2xl border border-[#07332F]/10 bg-white/90 p-5 shadow-sm shadow-[#07332F]/10 backdrop-blur'>
    <h3 className='text-lg font-semibold text-[#07332F]'>{title}</h3>
    <div className='mt-3 space-y-3 text-sm text-slate-700'>{children}</div>
  </div>
)

const DoctorOverview = ({ doctor }) => {
  const education = useMemo(() => {
    return (
      doctor?.education?.map(item => ({
        school: item.company,
        degree: item.degree,
        years: `${item.startDate?.slice(0, 4)} - ${item.endDate?.slice(0, 4)}`
      })) || []
    )
  }, [doctor])

  const experience = useMemo(() => {
    return (
      doctor?.experience?.map(item => ({
        place: item.company,
        years: `${item.startDate?.slice(0, 4)} - ${item.endDate?.slice(0, 4)}`
      })) || []
    )
  }, [doctor])

  const awards = useMemo(() => {
    return (
      doctor?.award?.map(item => ({
        date: item.year,
        title: item.title,
        desc: item.description
      })) || []
    )
  }, [doctor])

  const services = doctor?.services?.map(s => s.name) || []
  const specializations = doctor?.specialties || []

  return (
    <section className='space-y-5'>
      <SectionCard title='About me'>
        <p className='leading-relaxed'>
          {doctor?.description ||
            'I blend evidence-based care with a calm bedside manner so patients feel supported at every step.'}
        </p>
      </SectionCard>

      <div className='grid gap-5 lg:grid-cols-2'>
        <SectionCard title='Education'>
          {education.length ? (
            education.map((item,index) => (
              <div key={index} className='rounded-xl bg-slate-50 px-3 py-3'>
                <p className='font-semibold text-[#07332F]'>{item.school}</p>
                <p className='text-sm text-slate-600'>{item.degree}</p>
                <p className='text-xs font-semibold text-[#F7A582]'>{item.years}</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-slate-600'>No education details provided.</p>
          )}
        </SectionCard>

        <SectionCard title='Work & experience'>
          {experience.length ? (
            experience.map(item => (
              <div key={`${item.place}-${item.years}`} className='flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3'>
                <div>
                  <p className='font-semibold text-[#07332F]'>{item.place}</p>
                  <p className='text-xs font-semibold text-[#F7A582]'>{item.years}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-sm text-slate-600'>No experience added.</p>
          )}
        </SectionCard>
      </div>

      <div className='grid gap-5 lg:grid-cols-2'>
        <SectionCard title='Services'>
          {services.length ? (
            <div className='flex flex-wrap gap-2'>
              {services.map(item => (
                <span
                  key={item}
                  className='rounded-full border border-[#07332F]/15 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#07332F]'
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className='text-sm text-slate-600'>No services linked.</p>
          )}
        </SectionCard>

        <SectionCard title='Specializations'>
          {specializations.length ? (
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {specializations.map(item => (
                <div key={item} className='rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-[#07332F]'>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-slate-600'>No specializations listed.</p>
          )}
        </SectionCard>
      </div>

      <SectionCard title='Awards'>
        {awards.length ? (
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {awards.map(item => (
              <div key={item.title} className='rounded-xl bg-slate-50 px-3 py-3'>
                <p className='text-xs font-semibold uppercase tracking-[0.1em] text-[#F7A582]'>
                  {item.date}
                </p>
                <p className='mt-1 text-sm font-semibold text-[#07332F]'>{item.title}</p>
                <p className='mt-1 text-sm text-slate-600'>{item.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-slate-600'>No awards listed.</p>
        )}
      </SectionCard>
    </section>
  )
}

export default DoctorOverview
