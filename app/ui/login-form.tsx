'use client'
import { useState } from 'react'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Button } from './button'
import { lusitana } from '@/app/ui/fonts'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ username: email, password }),
        credentials: 'include'
      })

      if (!response.ok) {
        setError('Invalid email or password')
      }
      window.location.href = '/dashboard'
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred')
    }
  }

  return (
    <form className='space-y-3' onSubmit={handleLogin}>
      <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <input
                required
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='email'
                name='email'
                placeholder='Enter your email address'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                required
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='password'
                minLength={6}
                name='password'
                placeholder='Enter password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>
        <Button className='mt-4 w-full' type='submit'>
          Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
        </Button>
        <div className='flex h-8 items-end space-x-1'>
          {error && (
            <div className='text-sm text-red-500'>
              <ExclamationCircleIcon className='mr-1 inline h-5 w-5' />
              {error}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
