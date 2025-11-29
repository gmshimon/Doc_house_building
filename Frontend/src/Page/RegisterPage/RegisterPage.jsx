import React, { useEffect, useState } from 'react'
import login_pic from '../../assets/login_pic.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, reset } from '../../Redux/Slice/AuthSlice'
import { ToastContainer, toast } from 'react-toastify'

const RegisterPage = () => {
  const { isCreateUserLoading, isCreateUserSuccess, isCreateUserError } =
    useSelector(state => state.authSlice)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (isCreateUserSuccess) {
      toast.success('User created successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      dispatch(reset())
    }
    if (isCreateUserError) {
      toast.error('Error creating user', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      dispatch(reset())
    }
  }, [dispatch, isCreateUserError, isCreateUserSuccess])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      createUser({
        name,
        email,
        password
      })
    )
  }

  return (
    <section className='relative h-screen overflow-hidden bg-gradient-to-br from-[#041f1c] via-[#07332F] to-[#0a4d45] text-white'>
      <ToastContainer />

      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#F7A582]/25 blur-3xl' />
        <div className='absolute right-8 top-10 h-44 w-44 rounded-full border border-white/10' />
        <div className='absolute bottom-10 left-1/3 h-52 w-52 -translate-x-1/2 rounded-full bg-white/5 blur-2xl' />
      </div>

      <div className='relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-4 md:grid-cols-[1.05fr_1fr]'>
        <div className='space-y-8'>
          

          <div className='space-y-4'>
            <h1 className='text-4xl font-semibold leading-tight md:text-5xl'>
              Join a care space that puts calm and clarity first.
            </h1>
            <p className='max-w-xl text-white/70'>
              Build your Doc House profile, keep medical records organized, and
              collaborate with clinicians who already know your story.
            </p>
          </div>

          <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur'>
            <div className='absolute -left-6 -top-10 h-24 w-24 rounded-full bg-[#F7A582]/30 blur-2xl' />
            <img
              src={login_pic}
              alt='Patients collaborating'
              className='w-full rounded-2xl border border-white/10 bg-white/60 object-cover'
            />
            <div className='absolute bottom-4 left-4 rounded-2xl border border-white/15 bg-[#07332F]/80 px-4 py-3 text-sm backdrop-blur'>
              <p className='font-semibold text-white'>Grow with confidence</p>
              <p className='text-xs text-white/70'>
                Keep every visit and document in one calm place.
              </p>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#F7A582]/30 blur-3xl' />
          <div className='relative rounded-3xl border border-white/40 bg-white/95 p-8 shadow-2xl backdrop-blur'>
            <div className='mb-8 flex items-center justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[#F7A582]'>
                  Create account
                </p>
                <h2 className='text-2xl font-semibold text-[#07332F]'>
                  Sign up for Doc House
                </h2>
              </div>
              <span className='rounded-full bg-[#F7A582]/15 px-3 py-1 text-xs font-semibold text-[#F7A582]'>
                Free
              </span>
            </div>

            <form className='space-y-5' onSubmit={handleSubmit}>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-[#07332F]'>
                  Full name
                </label>
                <div className='relative'>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text'
                    required
                    autoComplete='name'
                    className='peer w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 shadow-inner outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#F7A582]'
                    placeholder='Jane Doe'
                  />
                  <span className='absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-slate-400 peer-focus:text-[#F7A582]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                      <circle cx='12' cy='7' r='4' />
                    </svg>
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-[#07332F]'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type='email'
                    required
                    autoComplete='email'
                    className='peer w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 shadow-inner outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#F7A582]'
                    placeholder='you@example.com'
                  />
                  <span className='absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-slate-400 peer-focus:text-[#F7A582]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='2' y='4' width='20' height='16' rx='2' ry='2' />
                      <polyline points='22,6 12,13 2,6' />
                    </svg>
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-[#07332F]'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    required
                    autoComplete='new-password'
                    className='peer w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 shadow-inner outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#F7A582]'
                    placeholder='At least 8 characters'
                  />
                  <span className='absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-slate-400 peer-focus:text-[#F7A582]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='11' width='18' height='11' rx='2' />
                      <path d='M7 11V7a5 5 0 0 1 10 0v4' />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type='submit'
                disabled={isCreateUserLoading}
                className='flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F7A582] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f18c61] focus:outline-none focus:ring-4 focus:ring-[#F7A582]/40 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isCreateUserLoading ? (
                  <>
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white' />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </form>

            <p className='mt-6 text-center text-sm text-slate-600'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='font-semibold text-[#07332F] underline decoration-[#F7A582]/70 underline-offset-4 hover:text-[#F7A582]'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
