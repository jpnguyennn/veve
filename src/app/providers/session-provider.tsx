'use client'

import { SessionProvider } from "next-auth/react"
import { SessionManager } from "./session-manager"

export default function NextAuthProvider({
   children
}: {children: React.ReactNode}) {
   return <SessionProvider refetchInterval={5*60}><SessionManager />{children}</SessionProvider>
}