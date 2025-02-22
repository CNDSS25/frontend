import {
  CheckIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function PropertyStatus({
  availability_status
}: {
  availability_status: string
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': availability_status === 'pending',
          'bg-amber-400 text-black': availability_status === 'available',
          'bg-green-500 text-white': availability_status === 'rented'
        }
      )}
    >
      {availability_status === 'pending' ? (
        <>
          Pending
          <ClockIcon className='ml-1 w-4 text-gray-500' />
        </>
      ) : null}
      {availability_status === 'rented' ? (
        <>
          Rented
          <ArrowPathIcon className='ml-1 w-4 text-gray-500' />
        </>
      ) : null}
      {availability_status === 'available' ? (
        <>
          Available
          <CheckIcon className='ml-1 w-4 text-white' />
        </>
      ) : null}
    </span>
  )
}
