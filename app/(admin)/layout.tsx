import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout() {
  const session = await getServerSession(authOptions)

  if (!session?.user.isCreator) {
    redirect('/')
  }

  return <div>layout</div>
}
