import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"

export async function getProducts(companyId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("company_id", companyId)
    .eq("active", true)
    .order("name")

  if (error) throw error
  return data as Product[]
}

export async function getProduct(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) throw error
  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("products").insert([product]).select()

  if (error) throw error
  return data[0] as Product
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const { data, error } = await supabase.from("products").update(product).eq("id", id).select()

  if (error) throw error
  return data[0] as Product
}

export async function deleteProduct(id: string) {
  // Soft delete - just mark as inactive
  const { data, error } = await supabase.from("products").update({ active: false }).eq("id", id).select()

  if (error) throw error
  return data[0] as Product
}

