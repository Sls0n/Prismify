'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ProviderProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
