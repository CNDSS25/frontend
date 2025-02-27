import Table from '@/app/ui/properties/table'
import { Metadata } from 'next'
import RentalPaymentsTable from '@/app/ui/properties/rental-payments-table'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import Search from '@/app/ui/search'

export const metadata: Metadata = {
  title: 'Properties'
}

export default async function Page() {
  return (
    <div>
      <div>
        <h1>Property Listing</h1>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
          <Search placeholder='Search properties...' />
          <CreateInvoice />
        </div>
        <Table />
      </div>
      <div>
        {/*TODO: put it together maybe?*/}
        <div className='mt-5'>
          <h1>Outstanding Rental Payments</h1>
          <RentalPaymentsTable isPaid={false} />
        </div>
        <div className='mt-5'>
          <h1>Received Rental Payments</h1>
          <RentalPaymentsTable isPaid={true} />
        </div>
      </div>
    </div>
  )
}
