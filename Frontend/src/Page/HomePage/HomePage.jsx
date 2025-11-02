import React, { useEffect } from 'react'
import Banner from '../../Component/Banner/Banner'
import ServiceDetails from '../../Component/ServiceDetails/ServiceDetails'
import ContactBanner from '../../Component/ContactBanner/ContactBanner'
import PatientReview from '../../Component/PatientReview/PatientReview'
import ExpertDoctor from '../../Component/ExpertDoctor/ExpertDoctor'
import Contact from '../../Component/Contact/Contact'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { reset } from '../../Redux/Slice/AuthSlice'

const HomePage = () => {
  const { isLoginSuccess } = useSelector(state => state.authSlice)
const dispatch = useDispatch()
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
  }, [dispatch, isLoginSuccess])
  return (
    <div className='w-full'>
      <ToastContainer />
      <Banner />
      <div className='px-5 md:mx-auto max-w-5xl w-full max-h-full'>
        <ServiceDetails />
        <ContactBanner />
        <PatientReview />
        <ExpertDoctor />
        <Contact />
      </div>
    </div>
  )
}

export default HomePage
