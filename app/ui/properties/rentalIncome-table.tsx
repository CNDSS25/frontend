// import { UpdateProperty, DeleteProperty } from '@/app/ui/properties/buttons'
import PropertyStatus from '@/app/ui/properties/status'
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'
import { fetchRentalIncome } from '@/app/lib/data'
import { Property } from '@/app/lib/definitions'
import { cookies } from 'next/headers'

export default async function RentalIncomeTable({
  isPaid
}: {
  isPaid: boolean
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_id')?.value
  const properties = await fetchRentalIncome(token, isPaid)
  const outstandingPayments = properties.flatMap(prop =>
    Array.isArray(prop.rental_income)
      ? prop.rental_income
          .filter(income => income.status === 'Pending')
          .map(income => ({
            propertyTitle: prop.title,
            propertyLocation: prop.location,
            date: income.date,
            amount: income.amount,
            tenant: income.tenant
          }))
      : []
  )
  console.log(outstandingPayments)

  if (!isPaid) {
    return (
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {outstandingPayments?.map(payment => {
                return (
                  <div
                    // TODO: add payment.id to Model
                    // key={payment.id}
                    className='mb-2 w-full rounded-md bg-white p-4'
                  >
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <p className='text-lg font-medium'>
                          {payment.propertyTitle}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {payment.propertyLocation}
                        </p>
                        <p className='text-sm text-gray-500'>{payment.date}</p>
                        <p className='text-sm text-gray-500'>
                          {payment.amount}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {payment.tenant}
                        </p>
                      </div>
                      {/*<PropertyStatus*/}
                      {/*  availability_status={property.availability_status}*/}
                      {/*/>*/}
                    </div>
                    <div className='flex w-full items-center justify-between pt-4'>
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
                    Rent
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Tenant
                  </th>
                  {/*<th scope='col' className='relative py-3 pl-6 pr-3'>*/}
                  {/*  <span className='sr-only'>Edit</span>*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody className='bg-white'>
                {outstandingPayments?.map(payment => (
                  <tr
                    // key={payment.id}
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
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {payment.tenant}
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
              {properties?.map((property: Property) => {
                return (
                  <div
                    key={property.id}
                    className='mb-2 w-full rounded-md bg-white p-4'
                  >
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <p className='text-lg font-medium'>{property.title}</p>
                        <p className='text-sm text-gray-500'>
                          {property.location}
                        </p>
                      </div>
                      <PropertyStatus
                        availability_status={property.availability_status}
                      />
                    </div>
                    <div className='flex w-full items-center justify-between pt-4'>
                      <div>
                        <p className='text-xl font-medium'>
                          {formatCurrency(property.price)}
                        </p>
                        <p>
                          {property.size_sqm} m² • {property.bedrooms} Beds •{' '}
                          {property.bathrooms} Baths
                        </p>
                      </div>
                      <div className='flex justify-end gap-2'>
                        {/*<UpdateProperty id={property.id} />*/}
                        {/*<DeleteProperty id={property.id} />*/}
                      </div>
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
                    Price
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Size (m²)
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Bedrooms
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Bathrooms
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Availability
                  </th>
                  <th scope='col' className='relative py-3 pl-6 pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {properties?.map((property: Property) => (
                  <tr
                    key={property.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <p>{property.title}</p>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {property.location}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatCurrency(property.price)}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {property.size_sqm} m²
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {property.bedrooms}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {property.bathrooms}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      <PropertyStatus
                        availability_status={property.availability_status}
                      />
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
}
