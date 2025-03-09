import React from 'react'

const DoctorOverview = () => {
  return (
    <section className='px-5 pb-6'>
      <p className='text-lg font-semibold'>About Me</p>
      <p className='text-justify'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sit
        perspiciatis eum rem vel eveniet mollitia aut laudantium magnam enim
        eaque natus repellendus! Recusandae nihil qui, dolorum quas nostrum
        dolor iste id veniam eum quia animi tempore velit et ipsam dolores quam
        fugit. Accusamus velit placeat delectus quas. Eius, possimus!
      </p>
      <main className='md:flex justify-center w-full mt-4'>
        <div className='md:w-1/2'>
          <div>
            <h1 className='text-lg font-semibold'>Education</h1>
            <ul className='list-disc ml-8 mt-5'>
              <li className='font-semibold'>American Dental Medical University</li>
              <p>BDS</p>
              <p>1998-2003</p>
              <li className='font-semibold'>American Dental Medical University</li>
              <p>BDS</p>
              <p>2003-2005</p>
            </ul>
          </div>
          <div className='mt-4'>
            <h1 className='text-lg font-semibold'>Work & Experience</h1>
            <ul className='list-disc ml-8 mt-5'>
              <li className='font-semibold'>Glowing Smiles Family Dental Clinic</li>
              <p className='ml-3'>2010 - Present (5 years)</p>
              <li className='font-semibold'>Comfort Care Dental Clinic</li>
              <p className='ml-3'>2007 - 2010 (3 years)</p>
              <li className='font-semibold'>Dream Smile Dental Practise</li>
              <p className='ml-3'>2005 - 2007 (2 years)</p>
            </ul>
          </div>
          <div className='mt-4'>
            <h1 className='text-lg font-semibold'>Services</h1>
            <ul className='list-disc ml-8 mt-5'>
              <li>Tooth Cleaning</li>
              <li>Root Canal Therapy</li>
              <li>Implants</li>
              <li>Composite Bonding</li>
              <li>Fissure Sealants</li>
              <li>Surgical Extractions</li>
            </ul>
          </div>
        </div>
        <div className='md:w-1/2'>
          <div className='mt-4 md:mt-0'>
            <h1 className='text-lg font-semibold'>Awards</h1>
            <ul className='list-disc ml-8 mt-5'>
              <p>July 2019</p>
              <li className='text-lg font-semibold'>Humanitarian Award</li>
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                ipsum tellus. Interdum et malesuada fames ac ante ipsum primis
                in faucibus.
              </p>
              <p className='mt-3'>March 2011</p>
              <li className='text-lg font-semibold'>Certificate for International Volunteer Service</li>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                ipsum tellus. Interdum et malesuada fames ac ante ipsum primis
                in faucibus.
              </p>
              <p className='mt-3'>May 2008</p>
              <li className='text-lg font-semibold'>The Dental Professional of The Year Award</li>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
                ipsum tellus. Interdum et malesuada fames ac ante ipsum primis
                in faucibus.
              </p>
            </ul>
          </div>
          <div className='mt-4'>
            <h1 className='text-lg font-semibold'>Specializations</h1>
            <ul className='list-disc ml-8 mt-5'>
              <li>Children Care</li>
              <li>Dental Care</li>
              <li>Oral and Maxillofacial Surgery</li>
              <li>Orthodontist</li>
              <li>Periodontist</li>
              <li>Orthodontics</li>
            </ul>
          </div>
        </div>
      </main>
    </section>
  )
}

export default DoctorOverview
