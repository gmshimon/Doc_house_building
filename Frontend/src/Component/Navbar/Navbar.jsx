import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <section className=''>
      <header className='absolute top-0 left-0 flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-3'>
        <nav className='relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto'>
          <div className='lg:col-span-3 flex items-center'>
            <a
              className='flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80'
              href='../templates/creative-agency/index.html'
              aria-label='Preline'
            >
              <svg
                width='150'
                height='62'
                viewBox='0 0 234 62'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M59.9292 19.1854C58.7225 17.9788 57.0333 17.2146 55.1831 17.2146C52.2872 17.2146 49.6326 16.0481 47.7422 14.1175C45.8518 12.2272 44.6452 9.57258 44.6452 6.67667C44.6452 2.97635 41.6689 0 37.9685 0H23.8912C22.0411 0 20.3518 0.764198 19.1452 1.97083C17.9385 3.17745 17.1743 4.86673 17.1743 6.71689C17.1743 12.5489 12.4685 17.2548 6.63645 17.2548C3.01657 17.2146 0 20.1909 0 23.8912V37.9685C0 41.6689 3.01657 44.6452 6.67667 44.6452C9.57258 44.6452 12.2272 45.8116 14.1175 47.7422C16.0079 49.6326 17.2146 52.2872 17.2146 55.1831C17.2146 58.8834 20.1909 61.8598 23.8912 61.8598H37.9685C39.8187 61.8598 41.508 61.0956 42.7146 59.8889C43.9212 58.6823 44.6854 56.993 44.6854 55.1429C44.6854 52.247 45.8518 49.5924 47.7825 47.702C49.6728 45.8116 52.3274 44.605 55.2233 44.605C58.9236 44.605 61.9 41.5884 61.9 37.9283V23.851C61.9 22.0411 61.1358 20.392 59.9292 19.1854ZM30.9299 46.8172C22.1617 46.8172 15.0828 39.698 15.0828 30.9701C15.0828 22.2019 22.2019 15.1231 30.9299 15.1231C39.6578 15.1231 46.7769 22.2422 46.7769 30.9701C46.8172 39.698 39.698 46.8172 30.9299 46.8172Z'
                  fill='white'
                />
                <path
                  d='M31.0506 44.4836C38.4694 44.4836 44.4836 38.4694 44.4836 31.0506C44.4836 23.6317 38.4694 17.6176 31.0506 17.6176C23.6317 17.6176 17.6176 23.6317 17.6176 31.0506C17.6176 38.4694 23.6317 44.4836 31.0506 44.4836Z'
                  fill='#F7A582'
                />
                <path
                  d='M38.4519 29.4285V32.7129C38.4519 33.508 37.795 34.1649 36.9998 34.1649H34.1649V36.9999C34.1649 37.795 33.508 38.4519 32.7128 38.4519H29.4284C28.6333 38.4519 27.9764 37.795 27.9764 36.9999V34.1649H25.1414C24.3463 34.1649 23.6894 33.508 23.6894 32.7129V29.4285C23.6894 28.6333 24.3463 27.9764 25.1414 27.9764H27.9764V25.1415C27.9764 24.3463 28.6333 23.6895 29.4284 23.6895H32.7128C33.508 23.6895 34.1649 24.3463 34.1649 25.1415V27.9764H36.9998C37.795 27.9764 38.4519 28.6333 38.4519 29.4285Z'
                  fill='white'
                />
                <path
                  d='M74.595 41.9066V19.0866H81.035C83.3684 19.0866 85.3867 19.4832 87.09 20.2766C88.8167 21.0699 90.1467 22.3066 91.08 23.9866C92.0134 25.6432 92.48 27.7782 92.48 30.3916C92.48 33.0049 92.0134 35.1632 91.08 36.8666C90.1467 38.5699 88.84 39.8416 87.16 40.6816C85.5034 41.4982 83.5667 41.9066 81.35 41.9066H74.595ZM79.74 37.7416H80.72C82.0267 37.7416 83.1584 37.5082 84.115 37.0416C85.095 36.5749 85.8534 35.8049 86.39 34.7316C86.9267 33.6582 87.195 32.2116 87.195 30.3916C87.195 28.5716 86.9267 27.1482 86.39 26.1216C85.8534 25.0716 85.095 24.3366 84.115 23.9166C83.1584 23.4732 82.0267 23.2516 80.72 23.2516H79.74V37.7416ZM103.847 42.3266C102.377 42.3266 101 41.9766 99.7168 41.2766C98.4335 40.5532 97.3835 39.5149 96.5668 38.1616C95.7735 36.7849 95.3768 35.1399 95.3768 33.2266C95.3768 31.3132 95.7735 29.6799 96.5668 28.3266C97.3835 26.9499 98.4335 25.9116 99.7168 25.2116C101 24.4882 102.377 24.1266 103.847 24.1266C105.293 24.1266 106.658 24.4882 107.942 25.2116C109.225 25.9116 110.263 26.9499 111.057 28.3266C111.873 29.6799 112.282 31.3132 112.282 33.2266C112.282 35.1399 111.873 36.7849 111.057 38.1616C110.263 39.5149 109.225 40.5532 107.942 41.2766C106.658 41.9766 105.293 42.3266 103.847 42.3266ZM103.847 38.1616C104.547 38.1616 105.13 37.9632 105.597 37.5666C106.087 37.1699 106.448 36.5982 106.682 35.8516C106.915 35.1049 107.032 34.2299 107.032 33.2266C107.032 32.2232 106.915 31.3482 106.682 30.6016C106.448 29.8549 106.087 29.2832 105.597 28.8866C105.13 28.4899 104.547 28.2916 103.847 28.2916C103.123 28.2916 102.528 28.4899 102.062 28.8866C101.595 29.2832 101.245 29.8549 101.012 30.6016C100.778 31.3482 100.662 32.2232 100.662 33.2266C100.662 34.2299 100.778 35.1049 101.012 35.8516C101.245 36.5982 101.595 37.1699 102.062 37.5666C102.528 37.9632 103.123 38.1616 103.847 38.1616ZM123.471 42.3266C121.838 42.3266 120.356 41.9649 119.026 41.2416C117.719 40.5182 116.681 39.4799 115.911 38.1266C115.164 36.7732 114.791 35.1399 114.791 33.2266C114.791 31.3132 115.211 29.6799 116.051 28.3266C116.891 26.9732 117.999 25.9349 119.376 25.2116C120.753 24.4882 122.234 24.1266 123.821 24.1266C124.894 24.1266 125.851 24.3016 126.691 24.6516C127.554 24.9782 128.289 25.4216 128.896 25.9816L126.481 29.1666C126.178 28.9099 125.828 28.6999 125.431 28.5366C125.058 28.3732 124.626 28.2916 124.136 28.2916C123.319 28.2916 122.608 28.4899 122.001 28.8866C121.394 29.2832 120.916 29.8549 120.566 30.6016C120.216 31.3482 120.041 32.2232 120.041 33.2266C120.041 34.2299 120.216 35.1049 120.566 35.8516C120.916 36.5982 121.383 37.1699 121.966 37.5666C122.573 37.9632 123.249 38.1616 123.996 38.1616C124.579 38.1616 125.128 38.0566 125.641 37.8466C126.154 37.6366 126.633 37.3682 127.076 37.0416L129.106 40.1916C128.383 40.8449 127.531 41.3699 126.551 41.7666C125.571 42.1399 124.544 42.3266 123.471 42.3266Z'
                  fill='#F7A582'
                />
                <path
                  d='M139.605 41.9066V19.0866H144.75V27.8716H152.625V19.0866H157.805V41.9066H152.625V32.3866H144.75V41.9066H139.605ZM170.224 42.3266C168.754 42.3266 167.377 41.9766 166.094 41.2766C164.81 40.5532 163.76 39.5149 162.944 38.1616C162.15 36.7849 161.754 35.1399 161.754 33.2266C161.754 31.3132 162.15 29.6799 162.944 28.3266C163.76 26.9499 164.81 25.9116 166.094 25.2116C167.377 24.4882 168.754 24.1266 170.224 24.1266C171.67 24.1266 173.035 24.4882 174.319 25.2116C175.602 25.9116 176.64 26.9499 177.434 28.3266C178.25 29.6799 178.659 31.3132 178.659 33.2266C178.659 35.1399 178.25 36.7849 177.434 38.1616C176.64 39.5149 175.602 40.5532 174.319 41.2766C173.035 41.9766 171.67 42.3266 170.224 42.3266ZM170.224 38.1616C170.924 38.1616 171.507 37.9632 171.974 37.5666C172.464 37.1699 172.825 36.5982 173.059 35.8516C173.292 35.1049 173.409 34.2299 173.409 33.2266C173.409 32.2232 173.292 31.3482 173.059 30.6016C172.825 29.8549 172.464 29.2832 171.974 28.8866C171.507 28.4899 170.924 28.2916 170.224 28.2916C169.5 28.2916 168.905 28.4899 168.439 28.8866C167.972 29.2832 167.622 29.8549 167.389 30.6016C167.155 31.3482 167.039 32.2232 167.039 33.2266C167.039 34.2299 167.155 35.1049 167.389 35.8516C167.622 36.5982 167.972 37.1699 168.439 37.5666C168.905 37.9632 169.5 38.1616 170.224 38.1616ZM187.398 42.3266C185.508 42.3266 184.131 41.7082 183.268 40.4716C182.428 39.2116 182.008 37.4966 182.008 35.3266V24.5466H187.153V34.6616C187.153 35.9216 187.328 36.7849 187.678 37.2516C188.028 37.7182 188.576 37.9516 189.323 37.9516C189.953 37.9516 190.501 37.7999 190.968 37.4966C191.435 37.1932 191.913 36.7032 192.403 36.0266V24.5466H197.548V41.9066H193.348L192.963 39.4916H192.858C192.135 40.3549 191.341 41.0432 190.478 41.5566C189.615 42.0699 188.588 42.3266 187.398 42.3266ZM207.185 42.3266C206.042 42.3266 204.864 42.1049 203.65 41.6616C202.437 41.2182 201.399 40.5766 200.535 39.7366L202.705 36.8316C203.499 37.4616 204.28 37.9049 205.05 38.1616C205.844 38.3949 206.602 38.5116 207.325 38.5116C208.095 38.5116 208.655 38.3832 209.005 38.1266C209.355 37.8466 209.53 37.4849 209.53 37.0416C209.53 36.6449 209.367 36.3182 209.04 36.0616C208.737 35.8049 208.329 35.5832 207.815 35.3966C207.325 35.1866 206.765 34.9649 206.135 34.7316C205.295 34.4282 204.525 34.0432 203.825 33.5766C203.125 33.1099 202.554 32.5499 202.11 31.8966C201.69 31.2432 201.48 30.4616 201.48 29.5516C201.48 27.9182 202.087 26.6116 203.3 25.6316C204.537 24.6282 206.147 24.1266 208.13 24.1266C209.39 24.1266 210.534 24.3366 211.56 24.7566C212.61 25.1532 213.509 25.6782 214.255 26.3316L212.05 29.2016C211.42 28.7582 210.79 28.4432 210.16 28.2566C209.53 28.0466 208.912 27.9416 208.305 27.9416C207.629 27.9416 207.127 28.0699 206.8 28.3266C206.474 28.5832 206.31 28.9099 206.31 29.3066C206.31 29.6332 206.427 29.9132 206.66 30.1466C206.894 30.3799 207.244 30.6016 207.71 30.8116C208.2 30.9982 208.807 31.2082 209.53 31.4416C210.417 31.7449 211.222 32.1299 211.945 32.5966C212.692 33.0399 213.275 33.5999 213.695 34.2766C214.115 34.9532 214.325 35.7699 214.325 36.7266C214.325 37.7766 214.045 38.7216 213.485 39.5616C212.949 40.4016 212.155 41.0782 211.105 41.5916C210.055 42.0816 208.749 42.3266 207.185 42.3266ZM225.363 42.3266C223.706 42.3266 222.213 41.9649 220.883 41.2416C219.553 40.5182 218.503 39.4799 217.733 38.1266C216.963 36.7732 216.578 35.1399 216.578 33.2266C216.578 31.3366 216.963 29.7149 217.733 28.3616C218.526 27.0082 219.553 25.9699 220.813 25.2466C222.073 24.4999 223.391 24.1266 224.768 24.1266C226.425 24.1266 227.801 24.4999 228.898 25.2466C229.995 25.9699 230.811 26.9616 231.348 28.2216C231.885 29.4816 232.153 30.8932 232.153 32.4566C232.153 32.8999 232.13 33.3432 232.083 33.7866C232.036 34.2066 231.99 34.5449 231.943 34.8016H220.568L220.498 31.2316H227.743C227.743 30.3216 227.521 29.5749 227.078 28.9916C226.635 28.3849 225.9 28.0816 224.873 28.0816C224.313 28.0816 223.765 28.2332 223.228 28.5366C222.691 28.8399 222.248 29.3649 221.898 30.1116C221.548 30.8582 221.385 31.8966 221.408 33.2266C221.431 34.5332 221.665 35.5599 222.108 36.3066C222.575 37.0532 223.158 37.5899 223.858 37.9166C224.558 38.2199 225.293 38.3716 226.063 38.3716C226.74 38.3716 227.381 38.2782 227.988 38.0916C228.618 37.8816 229.236 37.6016 229.843 37.2516L231.523 40.4016C230.66 41.0082 229.68 41.4866 228.583 41.8366C227.486 42.1632 226.413 42.3266 225.363 42.3266Z'
                  fill='white'
                />
              </svg>
            </a>
            <div className='ms-1 sm:ms-2'></div>
          </div>
          <div className='flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3'>
           <Link to="/login">
           <button
              type='button'
              className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:focus:text-white'
            >
              Sign in
            </button>
           </Link>

            <div className='lg:hidden ml-1'>
              <button
                type='button'
                className='hs-collapse-toggle size-10 flex justify-center items-center text-lg font-semibold rounded-xl border border-gray-200 text-white hover:bg-gray-800 focus:outline-hidden focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                id='hs-navbar-hcail-collapse'
                aria-expanded='false'
                aria-controls='hs-navbar-hcail'
                aria-label='Toggle navigation'
                data-hs-collapse='#hs-navbar-hcail'
              >
                <svg
                  className='hs-collapse-open:hidden shrink-0 size-4'
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
                  <line x1='3' x2='21' y1='6' y2='6' />
                  <line x1='3' x2='21' y1='12' y2='12' />
                  <line x1='3' x2='21' y1='18' y2='18' />
                </svg>
                <svg
                  className='hs-collapse-open:block hidden shrink-0 size-4'
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
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>
            </div>
          </div>
          <div
            id='hs-navbar-hcail'
            className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full pl-10 bg-white grow md:bg-transparent lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6'
            aria-labelledby='hs-navbar-hcail-collapse'
          >
            <div className='flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0'>
              <div>
                <Link to="/">
                <p
                  className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'
                >
                  Home
                </p>
                </Link>
              </div>
              <div>
                <a
                  className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'
                  href='#'
                >
                  About
                </a>
              </div>
              <div>
                <Link to="/appointment">
                <p
                  className='relative inline-block text-lg pb-1 md:text-white focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 dark:text-white hover:text-gray-400'
                >
                  Appointment
                </p>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </section>
  )
}

export default Navbar
