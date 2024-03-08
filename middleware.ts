import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    console.log('Welcome admin')
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.isCreator === true,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
