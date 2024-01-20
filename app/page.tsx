import Navbar from '@/components/navbar'
import Sidebar from '@/components/editor/sidebar'
import Canvas from '@/components/editor/canvas-area'
import { getCurrentSession } from '@/utils/auth-options'

export default async function Home() {
  const session = await getCurrentSession()
  const authenticated = !!session?.user

  return (
    <>
      <Navbar
        authenticated={authenticated}
        img={session?.user?.image || '/images/fallback.jpg'}
        username={session?.user?.name || 'User'}
        id={session?.user?.id || '0'}
      />

      <main className="flex h-screen w-screen pt-[72px] sm:flex-row">
        <Sidebar />
        <Canvas />
      </main>
    </>
  )
}
