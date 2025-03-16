import React, { useEffect, useState } from 'react'
import login_pic from '../../assets/login_pic.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, reset } from '../../Redux/Slice/AuthSlice'
import { ToastContainer, toast } from 'react-toastify';


const RegisterPage = () => {
  const {isCreateUserLoading,isCreateUserSuccess,isCreateUserError} = useSelector(state=>state.authSlice)
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(()=>{
    if(isCreateUserSuccess){
      toast.success('User created successfully',{
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(reset())
    }
    if(isCreateUserError){
      toast.error('Error creating user',{
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(reset())
    }
  },[dispatch, isCreateUserError, isCreateUserSuccess])

  const handleSubmit = () =>{
    const data = {
      name,
      email,
      password
    }
    dispatch(createUser(data))
    console.log(data)
  }

  return (
    <section className='md:h-screen w-full'>
      <ToastContainer/>
      <div className='md:flex w-full h-full'>
        {/* Left Side */}
        <div className='bg-[#07332F] md:w-1/2 p-10 md:p-0 flex justify-center items-center relative'>
          <div className='absolute top-4 right-4'>
            <svg
              className='md:w-[400px] md:h-[300px] w-[200px]'
              viewBox='0 0 464 322'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_10_2468)'>
                <path
                  d='M230.378 314.193C230.378 318.382 226.942 322 222.552 322C218.162 322 214.727 318.572 214.727 314.193C214.727 310.004 218.162 306.386 222.552 306.386C226.942 306.386 230.378 310.004 230.378 314.193Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M272.178 156.335V168.902V170.045H273.323H285.92V181.089H273.323H272.178V182.232V194.8H261.107V182.232V181.089H259.962H247.365V170.045H259.962H261.107V168.902V156.335H272.178ZM273.323 155.192H259.962V168.902H246.22V182.232H259.962V195.942H273.323V182.232H287.065V168.902H273.323V155.192Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M371.81 61.1248C371.81 63.2194 370.093 64.9332 367.993 64.9332C365.894 64.9332 364.176 63.2194 364.176 61.1248C364.176 59.0302 365.894 57.3164 367.993 57.3164C370.093 57.3164 371.81 59.0302 371.81 61.1248Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M391.852 93.3057V122.821V125.677H394.524H424.109V151.384H394.524H391.852V154.05V183.565H366.085V154.05V151.384H363.413H333.828V125.677H363.413H366.085V123.011V93.3057H391.852ZM394.715 90.6399H363.413V122.821H331.156V154.05H363.413V186.231H394.715V154.05H426.972V122.821H394.715V90.6399Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M2.86302 222.791C4.44422 222.791 5.72604 221.512 5.72604 219.935C5.72604 218.357 4.44422 217.079 2.86302 217.079C1.28182 217.079 0 218.357 0 219.935C0 221.512 1.28182 222.791 2.86302 222.791Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M195.258 113.681H172.735V91.0207H150.976V113.681H128.263V135.389H150.976V157.858H172.735V135.389H195.258V113.681Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M218.162 183.755H201.747V167.379H185.714V183.755H169.3V199.56H185.714V215.936H201.747V199.56H218.162V183.755Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M106.313 125.487V157.287V160.334H109.367H141.242V187.944H109.367H106.313V190.991V222.791H78.6376V190.991V187.944H75.5837H43.8996V160.143H75.7745H78.8284V157.096V125.487H106.313ZM109.367 122.44H75.7745V157.096H40.8457V190.61H75.5837V225.267H109.176V190.61H143.914V157.096H109.367V122.44Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M286.302 4.18924V49.6996V53.8888H290.501H336.119V93.4962H290.501H286.302V97.6854V143.196H246.602V97.6854V93.4962H242.402H196.785V53.8888H242.402H246.602V49.6996V4.18924H286.302ZM290.501 0H242.212V49.6996H192.395V97.8758H242.212V147.575H290.501V97.6854H340.318V49.6996H290.501V0Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M340.127 229.456H319.132V208.319H298.709V229.456H277.522V249.64H298.709V270.777H319.132V249.64H340.127V229.456Z'
                  fill='white'
                  fillOpacity='0.1'
                />
                <path
                  d='M464 199.179H427.544V162.809H392.233V199.179H355.777V234.407H392.233V270.777H427.544V234.407H464V199.179Z'
                  fill='white'
                  fillOpacity='0.1'
                />
              </g>
              <defs>
                <clipPath id='clip0_10_2468'>
                  <rect width='464' height='322' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          <img src={login_pic} alt='Login Visual' />
        </div>

        {/* Right Side */}
        <div className='md:w-1/2 flex justify-center items-center mt-5 pb-5 md:mt-0 md:pb-0 '>
          {/* Absolute Positioned SVG */}

          {/* Form Container */}
          <div className='border-2 flex justify-center py-14 px-10'>
            <div>
              <h1 className='text-center text-2xl font-semibold mb-10'>
                Sign up Doc House
              </h1>
              <div className='md:w-96 mb-8'>
                <label
                  htmlFor='input-label'
                  className='block text-sm font-medium mb-2 dark:text-white'
                >
                  Name
                </label>
                <div className='relative'>
                  <input
                  onChange={e=>setName(e.target.value)}
                    type='email'
                    className='py-2.5 sm:py-3 px-4 pl-11 block w-full border border-black  rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500  disabled:pointer-events-none dark:bg-neutral-700  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                    placeholder='Enter name'
                  />
                  <div className='absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none'>
                    <svg
                      className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                      <circle cx='12' cy='7' r='4'></circle>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='md:w-96 mb-8'>
                <label
                  htmlFor='input-label'
                  className='block text-sm font-medium mb-2 dark:text-white'
                >
                  Email
                </label>
                <div className='relative'>
                  <input
                  onChange={e=>setEmail(e.target.value)}
                    type='email'
                    className='py-2.5 sm:py-3 px-4 pl-11 block w-full border border-black  rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500  disabled:pointer-events-none dark:bg-neutral-700  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                    placeholder='Enter email'
                  />
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none'>
                    <svg
                      className='shrink-0 h-6 w-6 text-gray-500 dark:text-neutral-500'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect
                        x='2'
                        y='4'
                        width='20'
                        height='16'
                        rx='2'
                        ry='2'
                      ></rect>
                      <polyline points='22,6 12,13 2,6'></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='md:w-96 mb-8'>
                <div className='flex flex-wrap justify-between items-center gap-2'>
                  <label
                    htmlFor='with-corner-hint'
                    className='block text-sm font-medium mb-2 dark:text-white'
                  >
                    Password
                  </label>
                  {/* <span className='block mb-2 text-sm text-gray-500 dark:text-neutral-500'>
                    Forgot Password
                  </span> */}
                </div>
                <div className='relative'>
                  <input
                  onChange={e=>setPassword(e.target.value)}
                    type='password'
                    className='py-2.5 sm:py-3 px-4 pl-11 block w-full border border-black  rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500  disabled:pointer-events-none dark:bg-neutral-700  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                    placeholder='Enter password'
                  />
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none'>
                    <svg
                      className='shrink-0 h-6 w-6 text-gray-500 dark:text-neutral-500'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z'></path>
                      <circle cx='16.5' cy='7.5' r='.5'></circle>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <button
                disabled={isCreateUserLoading}
                  onClick={handleSubmit}
                  type='button'
                  className='w-full py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F7A582] text-white hover:bg-[#F7A582] focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none'
                >
                  {isCreateUserLoading?'Loading...':'Register'}
                </button>
                <p className='text-center mt-2'>
                  Please register at first. Go to{' '}
                  <Link to='/login'>
                    <span className='text-[#F7A582] font-semibold cursor-pointer'>
                      {' '}
                      SIGN IN
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
