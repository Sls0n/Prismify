import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {
  type NextAuthOptions,
  type DefaultSession,
  getServerSession,
} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import prismadb from '@/libs/prismadb'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      isCreator: boolean
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
    error: '/error',
  },
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          // @ts-expect-error isCreator is there but its not showing
          isCreator: user?.isCreator,
        }
      }

      // fetch new user data from database when session is updated
      if (trigger === 'update' && token.id) {
        const dbUser = await prismadb.user.findUnique({
          where: { id: token.id as string },
          select: {
            name: true,
            email: true,
            image: true,
            isCreator: true,
          },
        })
        
        if (dbUser) {
          return {
            ...token,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            isCreator: dbUser.isCreator,
          }
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string | null,
          email: token.email as string | null,
          image: token.image as string | null,
          isCreator: token.isCreator as boolean,
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

/** Reusable function to eliminate the need of passing authOptions everytime */
export const getCurrentSession = () => getServerSession(authOptions)
