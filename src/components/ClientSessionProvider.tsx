'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ClientSessionProviderProps {
  children: ReactNode
}

export default function ClientSessionProvider({
  children,
}: ClientSessionProviderProps) {
  const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

  if (!authEnabled) {
    // Тестовый режим: передаём session=null, убираем refetch
    return (
      <SessionProvider
        session={null}
        refetchInterval={0}
        refetchOnWindowFocus={false}
      >
        {children}
      </SessionProvider>
    )
  }

  // Реальный режим: без явного session — будет подтягивать через /api/auth/session
  return <SessionProvider>{children}</SessionProvider>
}
