// import { UpdateProperty, DeleteProperty } from '@/app/ui/properties/buttons'
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'
import { fetchRentalIncome } from '@/app/lib/data'
import { cookies } from 'next/headers'

export default async function RentalPaymentsTable({
  isPaid
}: {
  isPaid: boolean
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_id')?.value
  const properties = await fetchRentalIncome(token, isPaid)
  const outstandingPayments = properties.flatMap(prop => {
    if (Array.isArray(prop.rental_income) && prop.rental_income.length > 0) {
      const lastIncome = prop.rental_income[prop.rental_income.length - 1]
      if (lastIncome.status === 'Pending') {
        return [
          {
            propertyTitle: prop.title,
            propertyLocation: prop.location,
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
  const receivedPayments = properties.flatMap(prop => {
    if (Array.isArray(prop.rental_income) && prop.rental_income.length > 0) {
      const lastIncome = prop.rental_income[prop.rental_income.length - 1]
      if (lastIncome.status === 'Paid') {
        return [
          {
            propertyTitle: prop.title,
            propertyLocation: prop.location,
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

  if (!isPaid) {
    return (
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {outstandingPayments?.map(payment => {
                return (
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
                        <p className='text-sm text-gray-500'>
                          {payment.tenant}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      {/*<div className='flex justify-end gap-2'>*/}
                      {/*  <UpdateProperty id={property.id} />*/}
                      {/*  <DeleteProperty id={property.id} />*/}
                      {/*</div>*/}
                    </div>
                  </div>
                )
              })}
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Location
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Date
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Tenant
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Rent
                  </th>
                  {/*<th scope='col' className='relative py-3 pl-6 pr-3'>*/}
                  {/*  <span className='sr-only'>Edit</span>*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody className='bg-white'>
                {outstandingPayments?.map(payment => (
                  <tr
                    key={payment.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <p>{payment.propertyTitle}</p>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {payment.propertyLocation}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(payment.date)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {payment.tenant}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatCurrency(payment.amount)}
                    </td>
                    {/*<td className='whitespace-nowrap py-3 pl-6 pr-3'>*/}
                    {/*  <div className='flex justify-end gap-3'>*/}
                    {/*    <UpdateProperty id={property.id} />*/}
                    {/*    <DeleteProperty id={property.id} />*/}
                    {/*  </div>*/}
                    {/*</td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  if (isPaid) {
    return (
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {receivedPayments?.map(payment => {
                return (
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
                        <p className='text-sm text-gray-500'>
                          {payment.tenant}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      {/*<div className='flex justify-end gap-2'>*/}
                      {/*  <UpdateProperty id={property.id} />*/}
                      {/*  <DeleteProperty id={property.id} />*/}
                      {/*</div>*/}
                    </div>
                  </div>
                )
              })}
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Location
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Date
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Tenant
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Rent
                  </th>
                  {/*<th scope='col' className='relative py-3 pl-6 pr-3'>*/}
                  {/*  <span className='sr-only'>Edit</span>*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody className='bg-white'>
                {receivedPayments?.map(payment => (
                  <tr
                    key={payment.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <p>{payment.propertyTitle}</p>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {payment.propertyLocation}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(payment.date)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {payment.tenant}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatCurrency(payment.amount)}
                    </td>
                    {/*<td className='whitespace-nowrap py-3 pl-6 pr-3'>*/}
                    {/*  <div className='flex justify-end gap-3'>*/}
                    {/*    <UpdateProperty id={property.id} />*/}
                    {/*    <DeleteProperty id={property.id} />*/}
                    {/*  </div>*/}
                    {/*</td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
