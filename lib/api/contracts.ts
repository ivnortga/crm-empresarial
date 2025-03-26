import { supabase } from "@/lib/supabase"
import type { Contract } from "@/types"

export async function getContracts(clientId: string) {
  const { data, error } = await supabase
    .from("contracts")
    .select(`
      *,
      client:client_id(*)
    `)
    .eq("client_id", clientId)
    .order("start_date", { ascending: false })

  if (error) throw error
  return data as Contract[]
}

export async function getContract(id: string) {
  const { data, error } = await supabase
    .from("contracts")
    .select(`
      *,
      client:client_id(*),
      documents:documents(*)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Contract
}

export async function createContract(
  contract: Omit<Contract, "id" | "created_at" | "updated_at" | "client" | "documents">,
) {
  const { data, error } = await supabase.from("contracts").insert([contract]).select()

  if (error) throw error
  return data[0] as Contract
}

export async function updateContract(id: string, contract: Partial<Omit<Contract, "client" | "documents">>) {
  const { data, error } = await supabase.from("contracts").update(contract).eq("id", id).select()

  if (error) throw error
  return data[0] as Contract
}

export async function deleteContract(id: string) {
  const { error } = await supabase.from("contracts").delete().eq("id", id)

  if (error) throw error
  return true
}

