import { UpdateProperty, DeleteProperty } from '@/app/ui/properties/buttons'
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'
import { fetchRentalIncome } from '@/app/lib/data'
import { cookies } from 'next/headers'

interface Payment {
  id: string
  propertyTitle: string
  propertyLocation: string
  date: string
  dueDate: string
  amount: number
  tenant: string
  paymentMethod: string
  status: string
}

interface PaymentsTableProps {
  payments: Payment[]
}

function PaymentsTable({ payments }: PaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <p className='mt-4 text-center text-gray-500'>
        Keine Zahlungen vorhanden.
      </p>
    )
  }

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          {/* Mobile View */}
          <div className='md:hidden'>
            {payments.map(payment => (
              <div
                key={payment.id}
                className='mb-2 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {payment.propertyTitle}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {payment.propertyLocation}
                    </p>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {formatDateToLocal(payment.date)}
                    </p>
                    <p className='text-xl font-medium'>
                      {formatDateToLocal(payment.dueDate)}
                    </p>
                    <p className='text-sm text-gray-500'>{payment.tenant}</p>
                    <p className='text-sm text-gray-500'>
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    {/*<UpdateProperty id={property.id} />*/}
                    {/*<DeleteProperty id={property.id} />*/}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th className='px-4 py-5 font-medium sm:pl-6'>Title</th>
                <th className='px-3 py-5 font-medium'>Location</th>
                {/* TODO: which data is really needed? */}
                <th className='px-3 py-5 font-medium'>Date</th>
                <th className='px-3 py-5 font-medium'>Due Date</th>
                <th className='px-3 py-5 font-medium'>Tenant</th>
                <th className='px-3 py-5 font-medium'>Rent</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {payments.map(payment => (
                <tr
                  key={payment.id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    {payment.propertyTitle}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {payment.propertyLocation}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(payment.date)}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(payment.dueDate)}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {payment.tenant}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      {/*<UpdateProperty id={property.id} />*/}
                      {/*<DeleteProperty id={property.id} />*/}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default async function RentalPaymentsTable({
  isPaid
}: {
  isPaid: boolean | null
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_id')?.value
  const properties = await fetchRentalIncome(token, isPaid)

  const payments = properties.flatMap(prop => {
    if (Array.isArray(prop.rental_income) && prop.rental_income.length > 0) {
      const lastIncome = prop.rental_income[prop.rental_income.length - 1]
      if (lastIncome.status === (isPaid ? 'Paid' : 'Pending')) {
        return [
          {
            propertyTitle: prop.title,
            propertyLocation: prop.location,
            dueDate: prop.dueDate,
            id: lastIncome.id,
            date: lastIncome.date,
            amount: lastIncome.amount,
            tenant: lastIncome.tenant,
            paymentMethod: lastIncome.payment_method,
            status: lastIncome.status
          }
        ]
      }
    }
    return []
  })
  //console.log(payments)
  return <PaymentsTable payments={payments} />
}
