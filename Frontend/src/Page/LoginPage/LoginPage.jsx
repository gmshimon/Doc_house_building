import { useEffect, useState } from 'react'
import login_pic from '../../assets/login_pic.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../../Redux/Slice/AuthSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const { isLoginSuccess, isLoginError, isLoginLoading } = useSelector(
    state => state.authSlice
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/')
    }
    if (isLoginError) {
      toast.error('Invalid credentials', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      })
      dispatch(reset())
    }
  }, [dispatch, isLoginError, isLoginSuccess, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      loginUser({
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

      <div className='relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-6 md:grid-cols-[1.05fr_1fr]'>
        <div className='space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl font-semibold leading-tight md:text-5xl'>
              Step back into your care space with calm energy.
            </h1>
            <p className='max-w-xl text-white/70'>
              Manage appointments, share records, and reach your doctor without
              waiting on hold. Your information stays encrypted so you can focus
              on feeling better.
            </p>
          </div>

          <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur'>
            <div className='absolute -left-6 -top-10 h-24 w-24 rounded-full bg-[#F7A582]/30 blur-2xl' />
            <img
              src={login_pic}
              alt='Care team'
              className='w-full rounded-2xl border border-white/10 bg-white/60 object-cover'
            />
            <div className='absolute bottom-4 left-4 rounded-2xl border border-white/15 bg-[#07332F]/80 px-4 py-3 text-sm backdrop-blur'>
              <p className='font-semibold text-white'>Certified care teams</p>
              <p className='text-xs text-white/70'>
                Trusted by thousands of patients every week.
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
                  Welcome back
                </p>
                <h2 className='text-2xl font-semibold text-[#07332F]'>
                  Log in to Doc House
                </h2>
              </div>
            </div>

            <form className='space-y-5' onSubmit={handleSubmit}>
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
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-[#07332F]'>
                    Password
                  </label>
                  <button
                    type='button'
                    className='text-sm font-semibold text-[#F7A582] hover:text-[#f18c61]'
                  >
                    Forgot?
                  </button>
                </div>
                <div className='relative'>
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    required
                    autoComplete='current-password'
                    className='peer w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-12 text-slate-900 shadow-inner outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#F7A582]'
                    placeholder='Enter your password'
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
                disabled={isLoginLoading}
                className='flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F7A582] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f18c61] focus:outline-none focus:ring-4 focus:ring-[#F7A582]/40 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isLoginLoading ? (
                  <>
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white' />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <p className='mt-6 text-center text-sm text-slate-600'>
              New to Doc House?{' '}
              <Link
                to='/register'
                className='font-semibold text-[#07332F] underline decoration-[#F7A582]/70 underline-offset-4 hover:text-[#F7A582]'
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
