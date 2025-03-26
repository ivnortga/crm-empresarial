"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // No haga nada mientras está cargando
    if (isLoading) return

    // Si no hay usuario, redirigir al login
    if (!user) {
      router.push("/login")
      return
    }

    // Si se requiere un permiso específico y el usuario no lo tiene
    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
    }

    // Comprobar permisos de acceso a rutas específicas
    checkRoutePermissions(pathname, user, hasPermission, router)
  }, [user, isLoading, requiredPermission, hasPermission, router, pathname])

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Cargando...</div>
  }

  if (!user) {
    return null // No renderizar nada mientras redirige
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null // No renderizar nada mientras redirige
  }

  return <>{children}</>
}

// Función para comprobar permisos de acceso a rutas específicas
function checkRoutePermissions(
  pathname: string,
  user: any,
  hasPermission: (permission: string) => boolean,
  router: any,
) {
  // Rutas protegidas y sus permisos requeridos
  const protectedRoutes: Record<string, string> = {
    "/clientes": "view_clients",
    "/contactos": "view_contacts",
    "/leads": "view_leads",
    "/productos": "view_products",
    "/tickets": "view_tickets",
    "/packs-horas": "view_hour_packs",
    "/facturacion": "view_invoices",
    "/comisiones": "view_commissions",
    "/informes": "view_reports",
    "/analisis-predictivo": "view_analytics",
    "/campanas": "view_campaigns",
    "/configuracion": "view_settings",
  }

  // Comprobar si la ruta actual requiere un permiso específico
  for (const [route, permission] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !hasPermission(permission)) {
      router.push("/unauthorized")
      return
    }
  }
}

