export interface User {
  id: string
  auth_id: string
  email: string
  name: string
  role: "admin" | "commercial" | "technical" | "viewer"
  department?: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  tax_id: string
  address?: string
  city?: string
  postal_code?: string
  country: string
  tax_region: "Peninsula" | "Canarias" | "Internacional"
  created_at: string
  updated_at: string
}

export interface UserCompany {
  id: string
  user_id: string
  company_id: string
  is_primary: boolean
  created_at: string
  company?: Company
}

export interface Client {
  id: string
  company_id: string
  name: string
  tax_id?: string
  address?: string
  city?: string
  postal_code?: string
  country: string
  tax_region: "Peninsula" | "Canarias" | "Internacional"
  external_id?: string
  commercial_id?: string
  technical_id?: string
  created_at: string
  updated_at: string
  commercial?: User
  technical?: User
}

export interface Product {
  id: string
  company_id: string
  name: string
  description?: string
  type: "product" | "service"
  service_level?: "L1" | "L2" | "L3"
  price: number
  tax_rate: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface Contract {
  id: string
  client_id: string
  name: string
  type: "maintenance" | "service" | "other"
  start_date: string
  end_date?: string
  discount_rate: number
  has_maintenance: boolean
  maintenance_discount: number
  status: "active" | "expired" | "cancelled"
  created_at: string
  updated_at: string
  client?: Client
  documents?: Document[]
}

export interface Document {
  id: string
  related_id: string
  related_type: "client" | "contract" | "opportunity" | "quote"
  name: string
  file_path: string
  file_type: string
  file_size: number
  uploaded_by: string
  created_at: string
  uploader?: User
}

export interface Opportunity {
  id: string
  company_id: string
  client_id: string
  name: string
  description?: string
  status: "open" | "won" | "lost" | "cancelled"
  estimated_value: number
  probability: number
  commercial_id: string
  created_at: string
  updated_at: string
  client?: Client
  commercial?: User
  quotes?: Quote[]
}

export interface Quote {
  id: string
  opportunity_id: string
  reference: string
  status: "draft" | "sent" | "accepted" | "rejected"
  total_amount: number
  discount_rate: number
  tax_amount: number
  valid_until?: string
  created_at: string
  updated_at: string
  opportunity?: Opportunity
  lines?: QuoteLine[]
}

export interface QuoteLine {
  id: string
  quote_id: string
  product_id?: string
  description: string
  quantity: number
  unit_price: number
  discount_rate: number
  tax_rate: number
  total_amount: number
  position: number
  created_at: string
  product?: Product
}

export interface Task {
  id: string
  company_id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assigned_to?: string
  related_id?: string
  related_type?: "client" | "opportunity" | "contract"
  due_date?: string
  completed_at?: string
  created_at: string
  updated_at: string
  assignee?: User
}

