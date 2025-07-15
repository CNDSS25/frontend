import Table from '@/app/ui/properties/table'
import { Metadata } from 'next'
import RentalPaymentsTable from '@/app/ui/properties/rental-payments-table'
import { CreateProperty } from '@/app/ui/properties/buttons'
import Search from '@/app/ui/search'

export const metadata: Metadata = {
  title: 'Properties'
}

export default async function Page() {
  return (
    <div>
      <div>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
          <Search placeholder='Search properties...' />
          <CreateProperty />
        </div>
        <Table />
      </div>
      <div>
        {/*TODO: put it together!*/}
        <div className='mt-5'>
          <h1>Outstanding Rental Payments</h1>
          <RentalPaymentsTable isPaid={false} />
          {/*<RentalPaymentsTable isPaid={null} />*/}
        </div>
        <div className='mt-5'>
          <h1>Received Rental Payments</h1>
          <RentalPaymentsTable isPaid={true} />
        </div>
      </div>
    </div>
  )
}
