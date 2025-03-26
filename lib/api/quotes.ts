import { supabase } from "@/lib/supabase"
import type { Quote, QuoteLine } from "@/types"

export async function getQuotes(opportunityId: string) {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("opportunity_id", opportunityId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Quote[]
}

export async function getQuote(id: string) {
  const { data, error } = await supabase
    .from("quotes")
    .select(`
      *,
      opportunity:opportunity_id(*),
      lines:quote_lines(*)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Quote
}

export async function createQuote(quote: Omit<Quote, "id" | "created_at" | "updated_at" | "opportunity" | "lines">) {
  const { data, error } = await supabase.from("quotes").insert([quote]).select()

  if (error) throw error
  return data[0] as Quote
}

export async function updateQuote(id: string, quote: Partial<Omit<Quote, "opportunity" | "lines">>) {
  const { data, error } = await supabase.from("quotes").update(quote).eq("id", id).select()

  if (error) throw error
  return data[0] as Quote
}

export async function deleteQuote(id: string) {
  const { error } = await supabase.from("quotes").delete().eq("id", id)

  if (error) throw error
  return true
}

export async function addQuoteLine(line: Omit<QuoteLine, "id" | "created_at" | "total_amount" | "product">) {
  // Calculate total amount
  const totalAmount = line.quantity * line.unit_price * (1 - line.discount_rate / 100)

  const { data, error } = await supabase
    .from("quote_lines")
    .insert([
      {
        ...line,
        total_amount: totalAmount,
      },
    ])
    .select()

  if (error) throw error
  return data[0] as QuoteLine
}

export async function updateQuoteLine(id: string, line: Partial<Omit<QuoteLine, "product">>) {
  const updateData = { ...line }

  // If price-related fields are updated, recalculate total
  if (line.quantity !== undefined || line.unit_price !== undefined || line.discount_rate !== undefined) {
    // First get current line
    const { data: currentLine } = await supabase.from("quote_lines").select("*").eq("id", id).single()

    if (currentLine) {
      const quantity = line.quantity ?? currentLine.quantity
      const unitPrice = line.unit_price ?? currentLine.unit_price
      const discountRate = line.discount_rate ?? currentLine.discount_rate

      const totalAmount = quantity * unitPrice * (1 - discountRate / 100)
      updateData.total_amount = totalAmount
    }
  }

  const { data, error } = await supabase.from("quote_lines").update(updateData).eq("id", id).select()

  if (error) throw error
  return data[0] as QuoteLine
}

export async function deleteQuoteLine(id: string) {
  const { error } = await supabase.from("quote_lines").delete().eq("id", id)

  if (error) throw error
  return true
}

export async function updateQuoteTotals(quoteId: string) {
  // Get all lines for this quote
  const { data: lines, error: linesError } = await supabase.from("quote_lines").select("*").eq("quote_id", quoteId)

  if (linesError) throw linesError

  // Calculate totals
  let totalAmount = 0
  let taxAmount = 0

  lines?.forEach((line) => {
    totalAmount += line.total_amount
    taxAmount += line.total_amount * (line.tax_rate / 100)
  })

  // Update quote
  const { data, error } = await supabase
    .from("quotes")
    .update({
      total_amount: totalAmount,
      tax_amount: taxAmount,
    })
    .eq("id", quoteId)
    .select()

  if (error) throw error
  return data[0] as Quote
}

