import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'
import Sidebar from '@/components/sidebar/Sidebar'
import Editor from '@/components/editor/Editor'

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
      <section className="flex h-[85vh] gap-8">
        <Sidebar />
      </section>
    </>
  )
}
