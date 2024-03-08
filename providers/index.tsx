'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-wrap-balancer'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

type ProviderProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
      },
    },
  })

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme='dark'>
        <Provider>{children}</Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
