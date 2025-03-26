import { supabase } from "./supabase"

export async function uploadDocument(bucket: string, filePath: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) throw error
  return data
}

export async function getDocumentUrl(bucket: string, filePath: string) {
  const { data } = await supabase.storage.from(bucket).getPublicUrl(filePath)

  return data.publicUrl
}

export async function deleteDocument(bucket: string, filePath: string) {
  const { error } = await supabase.storage.from(bucket).remove([filePath])

  if (error) throw error
  return true
}

