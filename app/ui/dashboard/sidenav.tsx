'use client'

import Link from 'next/link'
import NavLinks from '@/app/ui/dashboard/nav-links'
import FinSightLogo from '@/app/ui/fin-sight-logo'
import { PowerIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function SideNav() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      //FIXME: Nicht so legga
      window.location.href = '/'
      //router.replace('/')
      //router.refresh()
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <FinSightLogo />
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
        <form>
          <button
            onClick={handleLogout}
            className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <PowerIcon className='w-6' />
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
