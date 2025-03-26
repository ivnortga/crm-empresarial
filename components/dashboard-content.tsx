"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building2, Calendar, CircleDollarSign, Clock, PieChart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { TaskList } from "@/components/task-list"

export function DashboardContent() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Último trimestre: Q1 2024</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€145,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% respecto al trimestre anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <span className="font-medium text-green-500">112</span>
                <span className="ml-1">cartera</span>
              </div>
              <div className="mx-1">|</div>
              <div className="flex items-center">
                <span className="font-medium text-blue-500">15</span>
                <span className="ml-1">oportunidades</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Recurrentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
              <span>Mensual: 45</span>
              <span>Trimestral: 22</span>
              <span>Anual: 22</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Técnicas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320h</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <span className="font-medium text-green-500">85%</span>
                <span className="ml-1">utilizadas</span>
              </div>
              <div className="mx-1">|</div>
              <div className="flex items-center">
                <span className="font-medium text-amber-500">15%</span>
                <span className="ml-1">disponibles</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="rendimiento" className="space-y-4">
            <TabsList>
              <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
              <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
              <TabsTrigger value="tecnicos">Técnicos</TabsTrigger>
            </TabsList>

            <TabsContent value="rendimiento" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por Línea de Negocio</CardTitle>
                  <CardDescription>Distribución del último trimestre</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clientes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Clientes</CardTitle>
                  <CardDescription>Por tipo y antigüedad</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="oportunidades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Oportunidades por Estado</CardTitle>
                  <CardDescription>Último trimestre</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tecnicos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Horas Técnicas</CardTitle>
                  <CardDescription>Distribución por nivel de servicio (L1, L2, L3)</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mis Tareas</CardTitle>
              <CardDescription>Tareas pendientes asignadas a ti</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList limit={5} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Servicios</CardTitle>
              <CardDescription>Programados para los próximos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Empresa ABC</p>
                    <p className="text-sm text-muted-foreground">Revisión Antivirus (L1)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Mañana</p>
                    <p className="text-sm text-muted-foreground">1h</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Corporación XYZ</p>
                    <p className="text-sm text-muted-foreground">Backup Mensual (L2)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">En 2 días</p>
                    <p className="text-sm text-muted-foreground">2h</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Industrias 123</p>
                    <p className="text-sm text-muted-foreground">Mantenimiento Servidores (L3)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">En 5 días</p>
                    <p className="text-sm text-muted-foreground">4h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

