'use client'

import { useState, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from './button'
import { Spinner } from '@heroui/spinner'

export default function UserProfile() {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: ''
  })
  const getUserData = async () => {
    fetch('http://localhost:8000/users/me', {
      credentials: 'include',
      cache: 'no-store'
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email
        })
        setEditedUser({
          username: data.username,
          email: data.email
        })
      })
      .catch(error => console.error('Error fetching user:', error))
  }

  // Fetch user data on mount
  useEffect(() => {
    getUserData()
  }, [])

  const handleSave = () => {
    const requestUrl = `http://localhost:8000/users/${user.id}`
    fetch(requestUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedUser)
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email
        })
        setEditedUser({
          username: data.username,
          email: data.email
        })
        setIsEditing(false)
        getUserData()
      })
      .catch(error => console.error('Error saving user:', error))
  }

  if (!user)
    return <p className='text-center text-gray-500'>Loading user data...</p>
  return (
    <div className='mx-auto mt-10 max-w-md rounded-lg border border-gray-200 p-6 shadow-lg'>
      <h3 className='mb-4 text-2xl font-semibold text-gray-800'>
        User Profile
      </h3>
      {/* TODO: style this component*/}
      <div className='mb-4'>
        <label className='mb-1 block text-sm font-medium text-gray-600'>
          Name
        </label>
        {isEditing ? (
          <Input
            value={editedUser.username}
            onChange={e =>
              setEditedUser({ ...editedUser, username: e.target.value })
            }
            fullWidth
            autoFocus
          />
        ) : (
          <p className='text-lg text-gray-800'>{user.username}</p>
        )}
      </div>
      <div className='mb-6'>
        <label className='mb-1 block text-sm font-medium text-gray-600'>
          Email
        </label>
        {isEditing ? (
          <Input
            value={editedUser.email}
            onChange={e =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            fullWidth
          />
        ) : (
          <p className='text-lg text-gray-800'>{user.email}</p>
        )}
      </div>
      <div className='flex justify-end gap-2'>
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  )
}
