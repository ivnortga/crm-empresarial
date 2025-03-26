import { supabase } from "@/lib/supabase"
import type { Task } from "@/types"

export async function getTasks(companyId: string, userId?: string) {
  let query = supabase
    .from("tasks")
    .select(`
      *,
      assignee:assigned_to(id, name, email)
    `)
    .eq("company_id", companyId)

  // If userId is provided, filter by assigned user
  if (userId) {
    query = query.eq("assigned_to", userId)
  }

  const { data, error } = await query.order("due_date", { ascending: true })

  if (error) throw error
  return data as Task[]
}

export async function getTask(id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      assignee:assigned_to(id, name, email)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Task
}

export async function createTask(task: Omit<Task, "id" | "created_at" | "updated_at" | "assignee">) {
  const { data, error } = await supabase.from("tasks").insert([task]).select()

  if (error) throw error
  return data[0] as Task
}

export async function updateTask(id: string, task: Partial<Omit<Task, "assignee">>) {
  // If status is being updated to completed, set completed_at
  if (task.status === "completed" && !task.completed_at) {
    task.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase.from("tasks").update(task).eq("id", id).select()

  if (error) throw error
  return data[0] as Task
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) throw error
  return true
}

