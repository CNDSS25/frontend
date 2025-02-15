import Cookies from 'js-cookie'

export async function fetchProperties() {
  try {
    const token = Cookies.get('session_id')
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
    const res = await fetch('http://localhost:8001/properties', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
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
