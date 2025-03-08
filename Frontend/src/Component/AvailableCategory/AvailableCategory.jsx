import React from 'react';
import category_1 from '../../assets/category_1.jpg'

const AvailableCategory = () => {
    return (
        <div className='grid md:grid-cols-3 gap-x-14 gap-y-10'>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Teeth Orthodontics</p>
          </div>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Cosmetic Dentisty</p>
          </div>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Teeth Cleaning</p>
          </div>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Cavity Protection</p>
          </div>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Pediatric Dental</p>
          </div>
          <div className='flex justify-evenly items-center shadow-lg w-[280px] py-8 px-5 rounded-lg'>
            <img
              className='w-[50px] h-[50px] rounded-lg mr-7'
              src={category_1}
              alt=''
            />
            <p className='text-xl font-semibold'>Oral Surgery</p>
          </div>
        </div>
    );
};

export default AvailableCategory;