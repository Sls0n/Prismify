import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const authenticated = !!session

  return (
    <>
      <Navbar
        authenticated={authenticated}
        img={session?.user?.image || '/images/fallback-avatar.png'}
        username={session?.user?.name || 'User'}
      />
    </>
  )
}
