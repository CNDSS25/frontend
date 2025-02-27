import { Property } from '@/app/lib/definitions'

export async function fetchProperties(token: any) {
  try {
    const apiUrl = process.env.property_service_url
    const res = await fetch(apiUrl + '/ownedProperties/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`)
    }
    const data = await res.json()
    return data.properties
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function fetchRentalIncome(
  token: any,
  isPaid: boolean
): Promise<Property[]> {
  try {
    const apiUrl = process.env.property_service_url
    const res = await fetch(
      apiUrl + `/properties/rental-income-summary/?isPaid=${isPaid}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      }
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`)
    }
    const data = await res.json()
    // TODO: create classes in definition
    const properties: Property[] = data.properties.map((prop: any) => ({
      id: prop.id,
      title: prop.title,
      description: prop.description,
      price: prop.price,
      location: prop.location,
      size_sqm: prop.size_sqm,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      property_type: prop.property_type,
      rental_status: prop.rental_status,
      overdue_days: prop.overdue_days,
      dueDate: prop.next_due_date,
      availability_status: prop.availability_status,
      rental_income: (prop.rental_income ?? []).map((income: any) => ({
        id: income.id,
        date: income.date,
        amount: income.amount,
        tenant: income.tenant,
        payment_method: income.payment_method,
        status: income.status as 'Pending' | 'Paid'
      }))
    }))
    //console.log(data.properties)
    //return data.properties
    return properties
  } catch (error) {
    console.error(error)
    return []
  }
}
