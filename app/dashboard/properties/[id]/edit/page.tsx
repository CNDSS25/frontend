import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/properties/breadcrumbs'
// import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Property'
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const test = null
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers()
  // TODO: add fetchPropertyById(id)
  // ])

  if (!test) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Properties', href: '/dashboard/properties' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/properties/${id}/edit`,
            active: true
          }
        ]}
      />
      <p>{id}</p>
      {/*<Form invoice={invoice} customers={customers} />*/}
    </main>
  )
}
