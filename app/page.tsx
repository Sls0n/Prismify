import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'
import Sidebar from '@/components/editor/Sidebar'
import Canvas from '@/components/editor/Canvas'

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

      <main className="flex w-screen h-[calc(100vh)] pt-[72px] sm:flex-row">
        <Sidebar />
        <Canvas />
      </main>
    </>
  )
}
