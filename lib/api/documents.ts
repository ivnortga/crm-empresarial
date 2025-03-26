import { supabase } from "@/lib/supabase"
import type { Document } from "@/types"
import { uploadDocument as uploadToStorage } from "@/lib/storage"

export async function getDocuments(relatedId: string, relatedType: string) {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploader:uploaded_by(id, name, email)
    `)
    .eq("related_id", relatedId)
    .eq("related_type", relatedType)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Document[]
}

export async function getDocument(id: string) {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploader:uploaded_by(id, name, email)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Document
}

export async function uploadAndCreateDocument(file: File, relatedId: string, relatedType: string, uploadedBy: string) {
  // Generate a unique file path
  const timestamp = Date.now()
  const fileExt = file.name.split(".").pop()
  const filePath = `${relatedType}/${relatedId}/${timestamp}.${fileExt}`

  // Upload to storage
  await uploadToStorage("documents", filePath, file)

  // Create document record
  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        related_id: relatedId,
        related_type: relatedType,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: uploadedBy,
      },
    ])
    .select()

  if (error) throw error
  return data[0] as Document
}

export async function deleteDocument(id: string) {
  // First get the document to get the file path
  const { data: document, error: getError } = await supabase.from("documents").select("file_path").eq("id", id).single()

  if (getError) throw getError

  // Delete from storage
  if (document) {
    const { error: storageError } = await supabase.storage.from("documents").remove([document.file_path])

    if (storageError) throw storageError
  }

  // Delete record
  const { error } = await supabase.from("documents").delete().eq("id", id)

  if (error) throw error
  return true
}

