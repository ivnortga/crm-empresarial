"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"

// Datos de ejemplo para oportunidades
const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    name: "Proyecto Cloud Migration",
    client: { id: "1", name: "Empresa ABC" },
    status: "open",
    estimated_value: 45000,
    probability: 70,
    commercial: { id: "1", name: "Juan Pérez" },
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Renovación Licencias Software",
    client: { id: "2", name: "Corporación XYZ" },
    status: "open",
    estimated_value: 12500,
    probability: 90,
    commercial: { id: "2", name: "María López" },
    created_at: "2024-03-10T14:45:00Z",
  },
  {
    id: "3",
    name: "Implementación ERP",
    client: { id: "3", name: "Industrias 123" },
    status: "won",
    estimated_value: 78000,
    probability: 100,
    commercial: { id: "1", name: "Juan Pérez" },
    created_at: "2024-02-28T09:15:00Z",
  },
  {
    id: "4",
    name: "Actualización Infraestructura",
    client: { id: "4", name: "Consultora Innovación" },
    status: "lost",
    estimated_value: 35000,
    probability: 0,
    commercial: { id: "3", name: "Carlos Gómez" },
    created_at: "2024-02-15T11:20:00Z",
  },
  {
    id: "5",
    name: "Servicios Seguridad IT",
    client: { id: "5", name: "Distribuidora Global" },
    status: "open",
    estimated_value: 28500,
    probability: 60,
    commercial: { id: "2", name: "María López" },
    created_at: "2024-03-05T16:30:00Z",
  },
]

export function OpportunitiesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [commercialFilter, setCommercialFilter] = useState("all")

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opportunity) => {
    // Filtro de búsqueda
    const matchesSearch =
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.client.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || opportunity.status === statusFilter

    // Filtro de comercial
    const matchesCommercial = commercialFilter === "all" || opportunity.commercial.id === commercialFilter

    return matchesSearch && matchesStatus && matchesCommercial
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Abierta
          </Badge>
        )
      case "won":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Ganada
          </Badge>
        )
      case "lost":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Perdida
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Oportunidades</h1>
        <Button asChild>
          <Link href="/oportunidades/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Oportunidad
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre o cliente..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="open">Abiertas</SelectItem>
              <SelectItem value="won">Ganadas</SelectItem>
              <SelectItem value="lost">Perdidas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={commercialFilter} onValueChange={setCommercialFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Comercial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">Juan Pérez</SelectItem>
              <SelectItem value="2">María López</SelectItem>
              <SelectItem value="3">Carlos Gómez</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Oportunidades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Valor Estimado</TableHead>
                <TableHead>Probabilidad</TableHead>
                <TableHead>Comercial</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.name}</TableCell>
                  <TableCell>{opportunity.client.name}</TableCell>
                  <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                  <TableCell>{formatCurrency(opportunity.estimated_value)}</TableCell>
                  <TableCell>{opportunity.probability}%</TableCell>
                  <TableCell>{opportunity.commercial.name}</TableCell>
                  <TableCell>{formatDate(opportunity.created_at)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/oportunidades/${opportunity.id}`}>Ver detalles</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOpportunities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    No se encontraron oportunidades con los filtros seleccionados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

