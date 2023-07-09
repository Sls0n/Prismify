import SignUp from '@/components/SignUp'
import CloseModal from '@/components/ui/CloseModal'

export default function page() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 bg-zinc-900/20">
      <div className="container mx-auto flex h-full max-w-2xl items-center">
        <div className="pointer-events-auto relative h-fit w-full rounded-lg bg-white px-2 py-20">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  )
}
