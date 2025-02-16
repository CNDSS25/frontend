import UserCard from '@/app/ui/user/usercard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Details'
}

export default function Page() {
  return <UserCard />
}
