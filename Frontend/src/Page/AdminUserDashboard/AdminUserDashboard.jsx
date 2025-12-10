import React, { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiUserCheck } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Redux/Slice/AuthSlice'
import Loading from '../../Component/Loading/Loading'

const AdminUserDashboard = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const {
    users = [],
    isGetUsersLoading,
    isGetUsersError
  } = useSelector(state => state.authSlice)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const totals = useMemo(
    () => ({
      users: users.length,
      admins: users.filter(user => (user.role || '').toUpperCase() === 'ADMIN').length
    }),
    [users]
  )

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return users
    return users.filter(
      user =>
        (user.name || '').toLowerCase().includes(term) ||
        (user.email || '').toLowerCase().includes(term)
    )
  }, [search, users])

  if (isGetUsersLoading) {
    return <Loading />
  }

  if (isGetUsersError) {
    return (
      <section className='flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center text-sm text-red-600'>
        Unable to load users. Please try again.
      </section>
    )
  }

  return (
    <section className='min-h-screen bg-gradient-to-br from-white via-[#f7f4f1] to-[#e8f7f4] pb-12 pt-24'>
      <div className='mx-auto max-w-7xl space-y-6 px-4'>
        <header className='flex flex-col gap-4 rounded-3xl border border-[#07332F]/10 bg-white/95 px-5 py-6 shadow-lg shadow-[#07332F]/10 backdrop-blur md:flex-row md:items-center md:justify-between md:px-8'>
          <div className='space-y-1'>
            <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#07332F]'>
              Admin dashboard
            </p>
            <h1 className='text-3xl font-semibold text-[#07332F]'>User management</h1>
            <p className='text-sm text-slate-600'>
              Quickly review who has access and keep your roster tidy.
            </p>
          </div>
          <div className='flex flex-wrap gap-3 text-sm'>
            <div className='rounded-2xl border border-[#07332F]/10 bg-[#07332F]/5 px-4 py-3 shadow-sm'>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#07332F]/80'>
                Total users
              </p>
              <p className='text-2xl font-semibold text-[#07332F]'>{totals.users}</p>
            </div>
            <div className='rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-sm'>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700'>
                Admins
              </p>
              <p className='text-2xl font-semibold text-emerald-700'>{totals.admins}</p>
            </div>
          </div>
        </header>

        <div className='rounded-3xl border border-[#07332F]/10 bg-white/95 p-5 shadow-lg shadow-[#07332F]/10 backdrop-blur md:p-6'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='relative w-full md:w-80'>
              <FiSearch className='pointer-events-none absolute left-3 top-3.5 text-slate-400' />
              <input
                type='text'
                placeholder='Search by name or email'
                value={search}
                onChange={event => setSearch(event.target.value)}
                className='w-full rounded-xl border border-[#07332F]/15 bg-white px-10 py-3 text-sm text-[#07332F] placeholder:text-slate-400 shadow-sm focus:border-[#F7A582] focus:ring-2 focus:ring-[#F7A582]/60 focus:outline-none'
              />
            </div>
            <div className='text-xs text-slate-500'>
              Showing <span className='font-semibold text-[#07332F]'>{filteredUsers.length}</span>{' '}
              of {totals.users}
            </div>
          </div>

          <div className='mt-5 overflow-hidden rounded-2xl border border-[#07332F]/10'>
            <table className='min-w-full text-sm'>
              <thead className='bg-white/80 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
                <tr>
                  <th className='px-4 py-3'>#</th>
                  <th className='px-4 py-3'>Name</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Role</th>
                  <th className='px-4 py-3 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[#07332F]/10 bg-white/90'>
                {filteredUsers.map((user, index) => {
                  const role = (user.role || '').toUpperCase()
                  const isAdmin = role === 'ADMIN'
                  const rowKey = user.id || user._id || user.email || index
                  return (
                    <tr key={rowKey} className='transition hover:bg-[#07332F]/3'>
                      <td className='px-4 py-3 text-slate-500'>{index + 1}</td>
                      <td className='px-4 py-3 font-semibold text-[#07332F]'>{user.name}</td>
                      <td className='px-4 py-3 text-slate-600'>{user.email}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                            isAdmin
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-[#07332F]/15 bg-[#07332F]/5 text-[#07332F]'
                          }`}
                        >
                          <FiUserCheck className='text-[#F7A582]' />
                          {isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-right'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-2 rounded-lg border border-[#07332F]/15 px-3 py-2 text-xs font-semibold text-[#07332F] transition hover:border-[#07332F]/30 hover:bg-[#07332F]/5 focus:outline-none'
                        >
                          <FiUserCheck className='text-[#F7A582]' />
                          {isAdmin ? 'Manage admin' : 'Make admin'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {!filteredUsers.length && (
                  <tr>
                    <td colSpan='5' className='px-4 py-6 text-center text-sm text-slate-500'>
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminUserDashboard
