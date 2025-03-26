"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Home,
  Layers,
  Package,
  Settings,
  ShieldCheck,
  Target,
  Ticket,
  Timer,
  Users,
  Wrench,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { PERMISSIONS } from "@/lib/auth-utils"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, hasPermission } = useAuth()

  // Si no hay usuario autenticado, no mostramos el sidebar
  if (!user) return null

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CRM Pro</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Clientes - visible para roles autorizados */}
        {(hasPermission(PERMISSIONS.VIEW_CLIENTS) ||
          hasPermission(PERMISSIONS.VIEW_CONTACTS) ||
          hasPermission(PERMISSIONS.VIEW_LEADS)) && (
          <SidebarGroup>
            <SidebarGroupLabel>Clientes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {hasPermission(PERMISSIONS.VIEW_CLIENTS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/clientes"}>
                      <Link href="/clientes">
                        <Building2 className="h-5 w-5" />
                        <span>Empresas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_CONTACTS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/contactos"}>
                      <Link href="/contactos">
                        <Users className="h-5 w-5" />
                        <span>Contactos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_LEADS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/leads"}>
                      <Link href="/leads">
                        <Users className="h-5 w-5" />
                        <span>Leads</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Productos y Servicios */}
        {hasPermission(PERMISSIONS.VIEW_PRODUCTS) && (
          <SidebarGroup>
            <SidebarGroupLabel>Productos y Servicios</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/lineas-negocio"}>
                    <Link href="/lineas-negocio">
                      <Layers className="h-5 w-5" />
                      <span>Líneas de Negocio</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/productos"}>
                    <Link href="/productos">
                      <Package className="h-5 w-5" />
                      <span>Productos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/servicios-recurrentes")}>
                    <Link href="/servicios-recurrentes">
                      <Calendar className="h-5 w-5" />
                      <span>Servicios Recurrentes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/portfolio-servicios")}>
                    <Link href="/portfolio-servicios">
                      <Package className="h-5 w-5" />
                      <span>Portfolio Servicios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Área Técnica */}
        {(hasPermission(PERMISSIONS.VIEW_TICKETS) || hasPermission(PERMISSIONS.VIEW_HOUR_PACKS)) && (
          <SidebarGroup>
            <SidebarGroupLabel>Área Técnica</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {user.role === "technical" && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/mantenimientos"}>
                      <Link href="/mantenimientos">
                        <Wrench className="h-5 w-5" />
                        <span>Mantenimientos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {user.role === "technical" && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/calendario-tecnico"}>
                      <Link href="/calendario-tecnico">
                        <Calendar className="h-5 w-5" />
                        <span>Calendario</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_TICKETS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/tickets")}>
                      <Link href="/tickets">
                        <Ticket className="h-5 w-5" />
                        <span>Tickets</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_HOUR_PACKS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/packs-horas")}>
                      <Link href="/packs-horas">
                        <Timer className="h-5 w-5" />
                        <span>Packs de Horas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Facturación */}
        {(hasPermission(PERMISSIONS.VIEW_INVOICES) || hasPermission(PERMISSIONS.VIEW_COMMISSIONS)) && (
          <SidebarGroup>
            <SidebarGroupLabel>Facturación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {hasPermission(PERMISSIONS.VIEW_INVOICES) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/facturacion"}>
                      <Link href="/facturacion">
                        <FileText className="h-5 w-5" />
                        <span>Facturas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_COMMISSIONS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/comisiones")}>
                      <Link href="/comisiones">
                        <CircleDollarSign className="h-5 w-5" />
                        <span>Comisiones</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Informes */}
        {hasPermission(PERMISSIONS.VIEW_REPORTS) && (
          <SidebarGroup>
            <SidebarGroupLabel>Informes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/informes/rendimiento"}>
                    <Link href="/informes/rendimiento">
                      <BarChart3 className="h-5 w-5" />
                      <span>Rendimiento</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/informes/comerciales"}>
                    <Link href="/informes/comerciales">
                      <ClipboardList className="h-5 w-5" />
                      <span>Comerciales</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Inteligencia de Negocio */}
        {(hasPermission(PERMISSIONS.VIEW_ANALYTICS) || hasPermission(PERMISSIONS.VIEW_CAMPAIGNS)) && (
          <SidebarGroup>
            <SidebarGroupLabel>Inteligencia de Negocio</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {hasPermission(PERMISSIONS.VIEW_ANALYTICS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/analisis-predictivo")}>
                      <Link href="/analisis-predictivo">
                        <BarChart3 className="h-5 w-5" />
                        <span>Análisis Predictivo</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {hasPermission(PERMISSIONS.VIEW_CAMPAIGNS) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith("/campanas")}>
                      <Link href="/campanas">
                        <Target className="h-5 w-5" />
                        <span>Campañas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {hasPermission(PERMISSIONS.VIEW_SETTINGS) && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/configuracion"}>
                <Link href="/configuracion">
                  <Settings className="h-5 w-5" />
                  <span>Configuración</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

