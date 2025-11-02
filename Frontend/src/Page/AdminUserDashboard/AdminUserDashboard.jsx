import React from 'react'

const AdminUserDashboard = () => {
  return (
    <section className='p-10'>
      <h1 className='text-3xl font-semibold'>All Users: 06</h1>
      <div className='flex flex-col bg-white h-96 rounded-lg mt-10'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                <thead className='bg-gray-300 rounded-lg px-5'>
                  <tr>
                    <th></th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-sm font-medium text-black uppercase dark:text-neutral-500'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 text-start text-sm font-medium text-black uppercase dark:text-neutral-500'
                    >
                      Admin
                    </th>
                    <th
                      scope='col'
                      className='pr-10 py-3 text-end text-sm font-medium text-black uppercase dark:text-neutral-500'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      1
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      John Brown
                    </td>

                    <td className='py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>
                      <button
                        type='button'
                        className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Admin
                      </button>
                    </td>
                    <td className=' py-4 whitespace-nowrap text-end text-sm font-medium'>
                    <button
                        type='button'
                        className='py-2 mr-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Remove User
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      2
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      Jim Green
                    </td>

                    <td className='py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>
                    <button
                        type='button'
                        className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Admin
                      </button>
                    </td>
                    <td className=' py-4 whitespace-nowrap text-end text-sm font-medium'>
                    <button
                        type='button'
                        className='py-2 mr-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Remove User
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      3
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      Joe Black
                    </td>

                    <td className='py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'>
                    <button
                        type='button'
                        className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Admin
                      </button>
                    </td>
                    <td className=' py-4 whitespace-nowrap text-end text-sm font-medium'>
                    <button
                        type='button'
                        className='py-2 mr-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#07332F] text-white hover:bg-[#07333F] focus:outline-hidden focus:bg-[#07332F] disabled:opacity-50 disabled:pointer-events-none'
                      >
                        Remove User
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminUserDashboard
