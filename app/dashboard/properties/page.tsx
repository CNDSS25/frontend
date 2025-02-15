import Table from '@/app/ui/properties/table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties'
}

export default async function Page() {
  return (
    <div>
      <h1>Property Listing</h1>
      <Table />
    </div>
  )
}
