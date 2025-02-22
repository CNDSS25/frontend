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
