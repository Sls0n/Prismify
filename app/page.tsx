import Sidebar from '@/components/editor/sidebar'
import Canvas from '@/components/editor/canvas-area'

export default function Home() {
  return (
    <main className="flex h-screen w-screen pt-[72px] sm:flex-row">
      <Sidebar />
      <Canvas />
    </main>
  )
}
