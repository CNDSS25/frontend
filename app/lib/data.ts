export async function fetchProperties(token: any) {
  try {
    // TODO: use env variables for API_URL
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
    const res = await fetch('http://localhost:8001/properties/', {
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
