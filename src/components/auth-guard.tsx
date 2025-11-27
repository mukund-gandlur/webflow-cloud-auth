"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getMemberstack } from "@/lib/memberstack"

interface AuthGuardProps {
  children: React.ReactNode
}

// Public routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"]

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout | undefined

    async function checkAuth() {
      try {
        setIsChecking(true)
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error("Auth check timeout")), 5000)
        })

        const authPromise = (async () => {
          const memberstack = await getMemberstack()
          const { data: member } = await memberstack.getCurrentMember()
          return member
        })()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const member = await Promise.race([authPromise, timeoutPromise]) as any
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = undefined
        }

        if (!isMounted) return

        // Recalculate isPublicRoute inside effect to ensure fresh value
        const currentIsPublicRoute = publicRoutes.includes(pathname)

        if (member) {
          setIsAuthenticated(true)
          // If authenticated and on login/signup, redirect to dashboard
          if (currentIsPublicRoute) {
            router.push("/dashboard")
          }
        } else {
          setIsAuthenticated(false)
          // If not authenticated and not on public route, redirect to login
          if (!currentIsPublicRoute) {
            router.push("/login")
          }
        }
      } catch {
        if (!isMounted) return
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = undefined
        }
        
        // If on public route, allow access even if auth check fails
        const currentIsPublicRoute = publicRoutes.includes(pathname)
        setIsAuthenticated(false)
        
        if (!currentIsPublicRoute) {
          router.push("/login")
        }
      } finally {
        if (isMounted) {
          setIsChecking(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [pathname, router])

  // For public routes, show content immediately and check auth in background
  if (isPublicRoute) {
    // Show content immediately, don't block on auth check
    return <>{children}</>
  }

  // For protected routes, wait for auth check
  if (isChecking && isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Render children if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Not authenticated on protected route - redirecting
  // Show loading overlay but don't block (redirect will happen)
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}
