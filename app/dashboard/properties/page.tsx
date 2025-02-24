import Table from '@/app/ui/properties/table'
import { Metadata } from 'next'
import RentalIncomeTable from '@/app/ui/properties/rentalIncome-table'

export const metadata: Metadata = {
  title: 'Properties'
}

export default async function Page() {
  return (
    <div>
      <div>
        <h1>Property Listing</h1>
        <Table />
      </div>
      <div>
        <div className='mt-5'>
          <h1>Outstanding Rental Payments</h1>
          <RentalIncomeTable isPaid={false} />
        </div>
        <div className='mt-5'>
          <h1>Received Rental Payments</h1>
          <RentalIncomeTable isPaid={true} />
        </div>
      </div>
    </div>
  )
}
