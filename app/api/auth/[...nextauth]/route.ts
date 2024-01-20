import { AuthOptions } from 'next-auth'
import { authOptions } from '@/utils/auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
