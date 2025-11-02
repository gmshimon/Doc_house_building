import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const CommonBanner = () => {
  const location = useLocation()
  const pathname = location.pathname
  const previousPath = location.state?.from || '/'

  console.log(location.pathname)
  console.log(previousPath)
  return (
    <div className='relative isolate overflow-hidden  bg-[#07332F]  py-28  px-6 text-white  lg:px-8 h-screen md:h-full'>
      {/* Curved stroke in the top-left corner */}
      <div className='absolute left-0 top-0 w-32 h-32'>
        <svg
          width='239'
          height='253'
          viewBox='0 0 239 253'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M-5.10515e-06 136.208C0.688424 167.418 13.5809 197.117 35.9165 218.947C58.2521 240.776 88.255 253 119.5 253C150.745 253 180.748 240.776 203.083 218.947C225.419 197.117 238.312 167.418 239 136.208L239 4.81177e-06L6.97331e-06 1.52588e-05L-5.10515e-06 136.208ZM195.606 136.208C195.611 134.443 196.315 132.753 197.564 131.505C198.812 130.257 200.505 129.554 202.271 129.549C204.025 129.556 205.705 130.251 206.951 131.485C207.576 132.103 208.074 132.838 208.414 133.649C208.755 134.459 208.932 135.329 208.936 136.208C208.915 159.901 199.486 182.617 182.718 199.37C165.95 216.123 143.214 225.544 119.5 225.565C117.734 225.56 116.042 224.856 114.793 223.609C113.544 222.361 112.84 220.67 112.835 218.906C112.84 217.141 113.544 215.45 114.793 214.203C116.042 212.955 117.734 212.252 119.5 212.246C139.671 212.201 159.002 204.175 173.265 189.925C187.528 175.675 195.56 156.361 195.606 136.208Z'
            fill='white'
            fillOpacity='0.05'
          />
        </svg>
      </div>

      {/* Large circle shape with an image */}
      <div className='absolute md:left-1/2 left-2/3 top-20 h-56 w-56 rounded-full overflow-hidden'>
        <svg
          width='150'
          height='150'
          viewBox='0 0 269 269'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M41.6021 143.003C30.7989 154.293 24.8459 169.364 25.018 184.989C25.1902 200.615 31.4738 215.551 42.5232 226.601C53.5726 237.65 68.5092 243.934 84.1345 244.106C99.7597 244.278 114.831 238.325 126.121 227.522L174.332 179.311L89.8129 94.7918L41.6021 143.003ZM110.776 212.176C111.402 211.553 112.249 211.204 113.133 211.204C114.016 211.204 114.863 211.553 115.49 212.176C116.107 212.799 116.455 213.639 116.459 214.516C116.462 214.956 116.377 215.392 116.211 215.8C116.045 216.207 115.799 216.578 115.49 216.89C107.096 225.269 95.7214 229.975 83.8617 229.975C72.0021 229.975 60.6271 225.269 52.2339 216.89C51.6112 216.264 51.2617 215.416 51.2617 214.533C51.2617 213.65 51.6112 212.802 52.2339 212.176C52.8603 211.553 53.7077 211.204 54.5909 211.204C55.4742 211.204 56.3216 211.553 56.948 212.176C64.097 219.293 73.774 223.289 83.8617 223.289C93.9494 223.289 103.626 219.293 110.776 212.176Z'
            fill='white'
            fillOpacity='0.05'
          />
          <path
            d='M142.704 41.9004L94.527 90.0777L179.046 174.597L227.224 126.42C238.027 115.13 243.98 100.058 243.808 84.4328C243.635 68.8075 237.352 53.8709 226.302 42.8215C215.253 31.7721 200.316 25.4885 184.691 25.3164C169.066 25.1442 153.994 31.0972 142.704 41.9004Z'
            fill='white'
            fillOpacity='0.05'
          />
        </svg>
      </div>

      {/* Dotted square (optional) */}
      <div className='absolute left:1/3 md:left-1/2 md:top-96 md:bottom-0 bottom-72 h-12 w-12 '>
        <svg
          width='100'
          height='100'
          viewBox='0 0 152 152'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='2.33848' cy='149.663' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='149.663' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='149.663' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='149.663' r='2.33848' fill='white' />
          <circle cx='67.815' cy='149.663' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='149.663' r='2.33848' fill='white' />
          <circle cx='100.553' cy='149.663' r='2.33848' fill='white' />
          <circle cx='116.924' cy='149.663' r='2.33848' fill='white' />
          <circle cx='133.296' cy='149.663' r='2.33848' fill='white' />
          <circle cx='149.663' cy='149.663' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='133.293' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='133.293' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='133.293' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='133.293' r='2.33848' fill='white' />
          <circle cx='67.815' cy='133.293' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='133.293' r='2.33848' fill='white' />
          <circle cx='100.553' cy='133.293' r='2.33848' fill='white' />
          <circle cx='116.924' cy='133.293' r='2.33848' fill='white' />
          <circle cx='133.296' cy='133.293' r='2.33848' fill='white' />
          <circle cx='149.663' cy='133.293' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='116.924' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='116.924' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='116.924' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='116.924' r='2.33848' fill='white' />
          <circle cx='67.815' cy='116.924' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='116.924' r='2.33848' fill='white' />
          <circle cx='100.553' cy='116.924' r='2.33848' fill='white' />
          <circle cx='116.924' cy='116.924' r='2.33848' fill='white' />
          <circle cx='133.296' cy='116.924' r='2.33848' fill='white' />
          <circle cx='149.663' cy='116.924' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='100.555' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='100.555' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='100.555' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='100.555' r='2.33848' fill='white' />
          <circle cx='67.815' cy='100.555' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='100.555' r='2.33848' fill='white' />
          <circle cx='100.553' cy='100.555' r='2.33848' fill='white' />
          <circle cx='116.924' cy='100.555' r='2.33848' fill='white' />
          <circle cx='133.296' cy='100.555' r='2.33848' fill='white' />
          <circle cx='149.663' cy='100.555' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='67.815' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='100.553' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='116.924' cy='84.1854' r='2.33848' fill='white' />
          <circle cx='133.296' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='149.663' cy='84.1852' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='67.815' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='100.553' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='116.924' cy='67.8158' r='2.33848' fill='white' />
          <circle cx='133.296' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='149.663' cy='67.8159' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='67.815' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='100.553' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='116.924' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='133.296' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='149.663' cy='51.4465' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='67.815' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='100.553' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='116.924' cy='35.0773' r='2.33848' fill='white' />
          <circle cx='133.296' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='149.663' cy='35.0772' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='67.815' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='100.553' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='116.924' cy='18.7077' r='2.33848' fill='white' />
          <circle cx='133.296' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='149.663' cy='18.7078' r='2.33848' fill='white' />
          <circle cx='2.33848' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='18.7096' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='35.0768' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='51.4479' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='67.815' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='84.1861' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='100.553' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='116.924' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='133.296' cy='2.33848' r='2.33848' fill='white' />
          <circle cx='149.663' cy='2.33848' r='2.33848' fill='white' />
        </svg>
      </div>

      {/* Pill shape with an image */}
      <div className='absolute left-1/3 top-1/2 h-26 w-24 rotate-12 rounded-full overflow-hidden'>
        <svg
          width='100'
          height='100'
          viewBox='0 0 67 147'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M67 33.5761C66.8077 24.8523 63.2072 16.5506 56.9695 10.4488C50.7317 4.34704 42.3527 0.930297 33.6269 0.930296C24.901 0.930296 16.522 4.34704 10.2842 10.4488C4.0465 16.5506 0.445968 24.8523 0.253706 33.5761L0.253712 71.6489L67 71.6489L67 33.5761ZM12.3726 33.5761C12.3711 34.0693 12.1745 34.5419 11.8258 34.8906C11.477 35.2394 11.0044 35.436 10.5112 35.4374C10.0214 35.4354 9.55204 35.2411 9.20426 34.8962C9.02952 34.7235 8.89059 34.5179 8.79544 34.2914C8.70029 34.0648 8.6508 33.8218 8.6498 33.5761C8.6555 26.9535 11.2888 20.6038 15.9717 15.9209C20.6546 11.238 27.0043 8.6047 33.6269 8.599C34.1201 8.60046 34.5927 8.79704 34.9414 9.14581C35.2902 9.49457 35.4868 9.96717 35.4883 10.4604C35.4868 10.9536 35.2902 11.4262 34.9414 11.775C34.5927 12.1237 34.1201 12.3203 33.6269 12.3218C27.9938 12.3344 22.595 14.5777 18.6118 18.561C14.6285 22.5442 12.3852 27.9429 12.3726 33.5761Z'
            fill='white'
            fillOpacity='0.05'
          />
          <path
            d='M67 113.418L67 75.3717L0.253708 75.3717L0.253706 113.418C0.445967 122.142 4.04649 130.444 10.2842 136.545C16.522 142.647 24.901 146.064 33.6269 146.064C42.3527 146.064 50.7317 142.647 56.9695 136.545C63.2072 130.444 66.8077 122.142 67 113.418Z'
            fill='white'
            fillOpacity='0.05'
          />
        </svg>
      </div>

      {/* Main banner content */}
      <div className='md:flex md:justify-start md:items-center md:h-[432px]'>
        <div className=' md:mt-0 mt-6 '>
          <ol className='flex items-center whitespace-nowrap'>
            <li className='inline-flex items-center'>
              <Link to={previousPath}>
                <p
                  className='text-lg cursor-pointer flex items-center text-white hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500'
                  href='#'
                >
                  {previousPath === '/' && 'Home'}
                </p>
              </Link>
              <svg
                className='shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  d='M6 13L10 3'
                  stroke='currentColor'
                  strokeLinecap='round'
                ></path>
              </svg>
            </li>
            <li className='inline-flex items-center'>
              <p
                className='text-xl cursor-pointer flex items-center text-white hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500'
                href='#'
              >
                {pathname?.split('/')[1] === 'appointment' && 'Appointment'}
                {pathname?.split('/')[1] === 'doctor-profile' &&
                  'Doctor Profile'}
                <svg
                  className='shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    d='M6 13L10 3'
                    stroke='currentColor'
                    strokeLinecap='round'
                  ></path>
                </svg>
              </p>
            </li>
          </ol>
          <div>
            {pathname?.split('/')[1] === 'appointment' && (
              <p className='text-4xl mt-5'>Appointment</p>
            )}
            {pathname?.split('/')[1] === 'doctor-profile' && (
              <p className='text-4xl mt-5'>Doctor Profile</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonBanner
