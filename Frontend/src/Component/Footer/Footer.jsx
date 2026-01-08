import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-auto w-full bg-[#052823] text-white'>
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-lg font-black uppercase text-lime-100 shadow-inner shadow-white/10 ring-1 ring-white/15'>
                D
              </span>
              <div className='leading-tight'>
                <p className='text-sm font-semibold tracking-[0.18em] uppercase'>Doc House</p>
                <p className='text-xs text-white/70'>Care without the wait</p>
              </div>
            </div>
            <p className='text-sm text-white/70'>
              Compassionate care, trusted clinicians, and simple booking to keep your health on
              schedule.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Quick Links</h3>
            <ul className='mt-3 space-y-2 text-sm text-white/70'>
              {/* <li>
                <Link className='transition hover:text-white' to='/about'>
                  About us
                </Link>
              </li> */}
              <li>
                <Link className='transition hover:text-white' to='/services'>
                  Services
                </Link>
              </li>
              <li>
                <Link className='transition hover:text-white' to='/appointment'>
                  Appointment
                </Link>
              </li>
              <li>
                <Link className='transition hover:text-white' to='/contact'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Services</h3>
            <ul className='mt-3 space-y-2 text-sm text-white/70'>
              <li>General consultation</li>
              <li>Dental care</li>
              <li>Cardio consult</li>
              <li>Diagnostics</li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Working Hours</h3>
            <ul className='mt-3 space-y-1 text-sm text-white/70'>
              <li>Mon - Fri: 9:00 AM - 7:00 PM</li>
              <li>Saturday: 10:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center'>
          <p>Copyright © {new Date().getFullYear()} Doc House. All rights reserved.</p>
          <div className='flex gap-4'>
            <a className='transition hover:text-white' href='#'>
              Privacy
            </a>
            <a className='transition hover:text-white' href='#'>
              Terms
            </a>
            <a className='transition hover:text-white' href='#'>
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
