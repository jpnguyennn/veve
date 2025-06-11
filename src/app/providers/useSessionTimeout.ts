import { useSession, signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'

export function useSessionTimeout(timeoutMinutes: number = 30) {
  const { data: session, status } = useSession()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        signOut({ callbackUrl: '/login' })
      }, timeoutMinutes * 60 * 1000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [session, status, timeoutMinutes])

  // Reset timeout on user activity
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        signOut({ callbackUrl: '/login' })
      }, timeoutMinutes * 60 * 1000)
    }
  }

  return { resetTimeout }
}