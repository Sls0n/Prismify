import Navbar from '@/components/Navbar'
import Sidebar from '@/components/editor/Sidebar'
import Canvas from '@/components/editor/Canvas'
import { getCurrentSession } from '@/utils/authOptions'

export default async function Home() {
  const session = await getCurrentSession()
  const authenticated = !!session?.user

  return (
    <>
      <Navbar
        authenticated={authenticated}
        img={session?.user?.image || '/images/fallback-avatar.png'}
        username={session?.user?.name || 'User'}
        id={session?.user?.id || '0'}
      />

      <main className="flex h-[100vh] w-screen pt-[72px] sm:flex-row">
        <Sidebar />
        <Canvas />
      </main>
    </>
  )
}
