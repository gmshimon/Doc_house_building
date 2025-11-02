import React, { useState } from 'react'

const AdminAddDoctor = () => {
    const [activeTab,setActiveTab] = useState('profile') 
  return (
    <section>
      <div className='max-w-7xl mx-auto pt-10'>
        <div className='flex justify-around bg-white py-3 rounded-lg text-lg'>
          <div onClick={()=>setActiveTab("profile")} className={`
                cursor-pointer h-10 w-36 flex justify-center items-center ${activeTab=="profile"?'bg-[#07332F] text-white rounded-md' :''}
            `}>
            <h1>Profile</h1>
          </div>
          <div onClick={()=>setActiveTab("qualification")} className={`
                cursor-pointer h-10 w-36 flex justify-center items-center ${activeTab=="qualification"?'bg-[#07332F] text-white rounded-md' :''}
            `}>
            <h1>Qualification</h1>
          </div>
          <div onClick={()=>setActiveTab("location")} className={`
                cursor-pointer h-10 w-36 flex justify-center items-center ${activeTab=="location"?'bg-[#07332F] text-white rounded-md' :''}
            `}>
            <h1>Locations</h1>
          </div>
          <div onClick={()=>setActiveTab("business_hour")}className={`
                cursor-pointer h-10 w-36 flex justify-center items-center ${activeTab=="business_hour"?'bg-[#07332F] text-white rounded-md' :''}
            `}>
            <h1>Business Hours</h1>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto pt-10'>

      </div>
    </section>
  )
}

export default AdminAddDoctor
