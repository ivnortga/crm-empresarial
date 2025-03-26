"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Plus, Search } from "lucide-react"
import type { Task } from "@/types"
import { useAuth } from "@/contexts/auth-context"

// Datos de ejemplo para tareas
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    company_id: "1",
    title: "Llamar a cliente Empresa ABC",
    description: "Seguimiento de la propuesta enviada la semana pasada",
    status: "pending",
    priority: "high",
    assigned_to: "1",
    related_id: "1",
    related_type: "client",
    due_date: new Date(Date.now() + 86400000).toISOString(), // Mañana
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    company_id: "1",
    title: "Preparar presupuesto para XYZ Corp",
    description: "Incluir opciones de servicios L1, L2 y L3",
    status: "in_progress",
    priority: "medium",
    assigned_to: "1",
    related_id: "2",
    related_type: "opportunity",
    due_date: new Date(Date.now() + 172800000).toISOString(), // En 2 días
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    company_id: "1",
    title: "Revisar contrato de mantenimiento",
    description: "Verificar cláusulas de SLA y descuentos aplicados",
    status: "pending",
    priority: "low",
    assigned_to: "2",
    related_id: "1",
    related_type: "contract",
    due_date: new Date(Date.now() + 259200000).toISOString(), // En 3 días
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    company_id: "1",
    title: "Actualizar documentación técnica",
    description: "Documentar nuevos procedimientos de soporte L3",
    status: "completed",
    priority: "medium",
    assigned_to: "1",
    completed_at: new Date(Date.now() - 86400000).toISOString(), // Ayer
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    company_id: "1",
    title: "Seguimiento de oportunidad",
    description: "Contactar al cliente para verificar recepción del presupuesto",
    status: "pending",
    priority: "high",
    assigned_to: "3",
    related_id: "3",
    related_type: "opportunity",
    due_date: new Date(Date.now() + 432000000).toISOString(), // En 5 días
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    company_id: "1",
    title: "Preparar informe mensual",
    description: "Recopilar datos de servicios prestados y horas facturadas",
    status: "pending",
    priority: "medium",
    assigned_to: "1",
    due_date: new Date(Date.now() + 518400000).toISOString(), // En 6 días
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function TasksContent() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")

  const filteredTasks = MOCK_TASKS.filter((task) => {
    // Filtro de búsqueda
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    // Filtro de prioridad
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    // Filtro de asignado
    const matchesAssignee =
      assigneeFilter === "all" ||
      (assigneeFilter === "me" && task.assigned_to === user?.id) ||
      (assigneeFilter !== "me" && task.assigned_to === assigneeFilter)

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const completeTask = (id: string) => {
    // En una implementación real, esto actualizaría la tarea en la API
    console.log(`Completar tarea ${id}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Alta
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Media
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Baja
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocida</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Pendiente
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            En Progreso
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completada
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocida</Badge>
    }
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar tareas..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
              <SelectItem value="cancelled">Canceladas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Asignado a" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="me">Mis tareas</SelectItem>
              <SelectItem value="1">Juan Pérez</SelectItem>
              <SelectItem value="2">María López</SelectItem>
              <SelectItem value="3">Carlos Gómez</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Tareas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron tareas con los filtros seleccionados
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-4 border rounded-md">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => completeTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                    {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}
                    <div className="flex flex-wrap items-center mt-3 gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      {task.due_date && (
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Vence: {formatDate(task.due_date)}</span>
                        </div>
                      )}
                      {task.related_type && (
                        <div className="flex items-center">
                          <span>
                            Relacionada con:{" "}
                            {task.related_type === "client"
                              ? "Cliente"
                              : task.related_type === "opportunity"
                                ? "Oportunidad"
                                : task.related_type === "contract"
                                  ? "Contrato"
                                  : ""}
                          </span>
                        </div>
                      )}
                      {task.completed_at && (
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Completada: {formatDate(task.completed_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    {task.status !== "completed" && (
                      <Button variant="default" size="sm" onClick={() => completeTask(task.id)}>
                        Completar
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

