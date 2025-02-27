'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function deleteInvoice(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_id')?.value
  const apiUrl = process.env.property_service_url
  const res = await fetch(apiUrl + `/properties/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) {
    revalidatePath('/dashboard/invoices')
  }
}
