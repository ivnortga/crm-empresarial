"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { Task } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"

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
    assigned_to: "1",
    due_date: new Date(Date.now() + 259200000).toISOString(), // En 3 días
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    company_id: "1",
    title: "Actualizar documentación técnica",
    description: "Documentar nuevos procedimientos de soporte L3",
    status: "pending",
    priority: "medium",
    assigned_to: "1",
    due_date: new Date(Date.now() + 345600000).toISOString(), // En 4 días
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
    assigned_to: "1",
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

interface TaskListProps {
  limit?: number
}

export function TaskList({ limit }: TaskListProps) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // En una implementación real, obtendríamos las tareas de la API
    // Por ahora, usamos datos de ejemplo
    setTasks(MOCK_TASKS.filter((task) => task.assigned_to === user?.id && task.status !== "completed"))
  }, [user])

  const completeTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "completed" as const } : task)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "low":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const tasksToShow = limit ? tasks.slice(0, limit) : tasks

  return (
    <div className="space-y-3">
      {tasksToShow.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No tienes tareas pendientes</div>
      ) : (
        tasksToShow.map((task) => (
          <div key={task.id} className="flex items-start gap-3 p-3 border rounded-md">
            <Checkbox checked={task.status === "completed"} onCheckedChange={() => completeTask(task.id)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm">{task.title}</h4>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
              )}
              {task.due_date && (
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(task.due_date)}</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {limit && tasks.length > limit && (
        <Button variant="ghost" size="sm" className="w-full mt-2">
          Ver todas las tareas ({tasks.length})
        </Button>
      )}
    </div>
  )
}

