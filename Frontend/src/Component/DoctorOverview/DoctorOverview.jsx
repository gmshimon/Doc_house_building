import React from 'react'

const education = [
  { school: 'American Dental Medical University', degree: 'BDS', years: '1998 - 2003' },
  { school: 'American Dental Medical University', degree: 'BDS', years: '2003 - 2005' }
]

const experience = [
  { place: 'Glowing Smiles Family Dental Clinic', years: '2010 - Present (5 years)' },
  { place: 'Comfort Care Dental Clinic', years: '2007 - 2010 (3 years)' },
  { place: 'Dream Smile Dental Practise', years: '2005 - 2007 (2 years)' }
]

const services = [
  'Tooth Cleaning',
  'Root Canal Therapy',
  'Implants',
  'Composite Bonding',
  'Fissure Sealants',
  'Surgical Extractions'
]

const awards = [
  {
    date: 'July 2019',
    title: 'Humanitarian Award',
    desc: 'Recognized for community outreach clinics and free care days for underserved families.'
  },
  {
    date: 'March 2011',
    title: 'Certificate for International Volunteer Service',
    desc: 'Led mobile dental missions focused on preventive education and early interventions.'
  },
  {
    date: 'May 2008',
    title: 'The Dental Professional of The Year Award',
    desc: 'Honored for clinical excellence and mentorship of junior practitioners.'
  }
]

const specializations = [
  'Children Care',
  'Dental Care',
  'Oral and Maxillofacial Surgery',
  'Orthodontist',
  'Periodontist',
  'Orthodontics'
]

const SectionCard = ({ title, children }) => (
  <div className='rounded-2xl border border-[#07332F]/10 bg-white/90 p-5 shadow-sm shadow-[#07332F]/10 backdrop-blur'>
    <h3 className='text-lg font-semibold text-[#07332F]'>{title}</h3>
    <div className='mt-3 space-y-3 text-sm text-slate-700'>{children}</div>
  </div>
)

const DoctorOverview = () => {
  return (
    <section className='space-y-5'>
      <SectionCard title='About me'>
        <p className='leading-relaxed'>
          I blend evidence-based care with a calm bedside manner so patients feel supported at
          every step. My focus is preventive dentistry and minimally invasive treatments that keep
          long-term comfort and confidence in mind.
        </p>
      </SectionCard>

      <div className='grid gap-5 lg:grid-cols-2'>
        <SectionCard title='Education'>
          {education.map(item => (
            <div key={item.school} className='rounded-xl bg-slate-50 px-3 py-3'>
              <p className='font-semibold text-[#07332F]'>{item.school}</p>
              <p className='text-sm text-slate-600'>{item.degree}</p>
              <p className='text-xs font-semibold text-[#F7A582]'>{item.years}</p>
            </div>
          ))}
        </SectionCard>

        <SectionCard title='Work & experience'>
          {experience.map(item => (
            <div key={item.place} className='flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3'>
              <div>
                <p className='font-semibold text-[#07332F]'>{item.place}</p>
                <p className='text-xs font-semibold text-[#F7A582]'>{item.years}</p>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>

      <div className='grid gap-5 lg:grid-cols-2'>
        <SectionCard title='Services'>
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
        </SectionCard>

        <SectionCard title='Specializations'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            {specializations.map(item => (
              <div key={item} className='rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-[#07332F]'>
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title='Awards'>
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
      </SectionCard>
    </section>
  )
}

export default DoctorOverview
