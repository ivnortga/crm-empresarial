"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { UserNav } from "@/components/user-nav"
import { CompanySelector } from "@/components/company-selector"
import { NotificationCenter } from "@/components/notification-center"

interface AppShellProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function AppShell({ children, requiredPermission }: AppShellProps) {
  const { user, loading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    if (requiredPermission && !loading && user && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
    }
  }, [user, loading, router, requiredPermission, hasPermission])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <CompanySelector />
          <div className="ml-auto flex items-center gap-4">
            <NotificationCenter />
            <UserNav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
