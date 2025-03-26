import { supabase } from "@/lib/supabase"
import type { Client } from "@/types"

export async function getClients(companyId: string) {
  const { data, error } = await supabase
    .from("clients")
    .select(`
      *,
      commercial:commercial_id(id, name, email),
      technical:technical_id(id, name, email)
    `)
    .eq("company_id", companyId)
    .order("name")

  if (error) throw error
  return data as Client[]
}

export async function getClient(id: string) {
  const { data, error } = await supabase
    .from("clients")
    .select(`
      *,
      commercial:commercial_id(id, name, email),
      technical:technical_id(id, name, email)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Client
}

export async function createClient(
  client: Omit<Client, "id" | "created_at" | "updated_at" | "commercial" | "technical">,
) {
  const { data, error } = await supabase.from("clients").insert([client]).select()

  if (error) throw error
  return data[0] as Client
}

export async function updateClient(id: string, client: Partial<Omit<Client, "commercial" | "technical">>) {
  const { data, error } = await supabase.from("clients").update(client).eq("id", id).select()

  if (error) throw error
  return data[0] as Client
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) throw error
  return true
}

