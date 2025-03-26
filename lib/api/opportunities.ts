import { supabase } from "@/lib/supabase"
import type { Opportunity } from "@/types"

export async function getOpportunities(companyId: string) {
  const { data, error } = await supabase
    .from("opportunities")
    .select(`
      *,
      client:client_id(*),
      commercial:commercial_id(id, name, email)
    `)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Opportunity[]
}

export async function getOpportunity(id: string) {
  const { data, error } = await supabase
    .from("opportunities")
    .select(`
      *,
      client:client_id(*),
      commercial:commercial_id(id, name, email),
      quotes(*)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Opportunity
}

export async function createOpportunity(
  opportunity: Omit<Opportunity, "id" | "created_at" | "updated_at" | "client" | "commercial" | "quotes">,
) {
  const { data, error } = await supabase.from("opportunities").insert([opportunity]).select()

  if (error) throw error
  return data[0] as Opportunity
}

export async function updateOpportunity(
  id: string,
  opportunity: Partial<Omit<Opportunity, "client" | "commercial" | "quotes">>,
) {
  const { data, error } = await supabase.from("opportunities").update(opportunity).eq("id", id).select()

  if (error) throw error
  return data[0] as Opportunity
}

export async function deleteOpportunity(id: string) {
  const { error } = await supabase.from("opportunities").delete().eq("id", id)

  if (error) throw error
  return true
}

