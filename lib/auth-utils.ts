// Definición de roles y permisos del sistema
export type UserRole = "admin" | "technical" | "commercial" | "viewer"

export interface Permission {
  name: string
  description: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  permissions?: string[]
}

// Permisos por módulo del sistema
export const PERMISSIONS = {
  // Clientes
  VIEW_CLIENTS: "view_clients",
  CREATE_CLIENT: "create_client",
  EDIT_CLIENT: "edit_client",
  DELETE_CLIENT: "delete_client",

  // Contactos
  VIEW_CONTACTS: "view_contacts",
  CREATE_CONTACT: "create_contact",
  EDIT_CONTACT: "edit_contact",
  DELETE_CONTACT: "delete_contact",

  // Leads
  VIEW_LEADS: "view_leads",
  CREATE_LEAD: "create_lead",
  EDIT_LEAD: "edit_lead",
  DELETE_LEAD: "delete_lead",

  // Productos y Servicios
  VIEW_PRODUCTS: "view_products",
  CREATE_PRODUCT: "create_product",
  EDIT_PRODUCT: "edit_product",
  DELETE_PRODUCT: "delete_product",

  // Área Técnica
  VIEW_TICKETS: "view_tickets",
  CREATE_TICKET: "create_ticket",
  EDIT_TICKET: "edit_ticket",
  CLOSE_TICKET: "close_ticket",

  VIEW_HOUR_PACKS: "view_hour_packs",
  CREATE_HOUR_PACK: "create_hour_pack",
  EDIT_HOUR_PACK: "edit_hour_pack",

  // Facturación
  VIEW_INVOICES: "view_invoices",
  CREATE_INVOICE: "create_invoice",
  EDIT_INVOICE: "edit_invoice",
  DELETE_INVOICE: "delete_invoice",

  VIEW_COMMISSIONS: "view_commissions",

  // Informes
  VIEW_REPORTS: "view_reports",

  // Business Intelligence
  VIEW_ANALYTICS: "view_analytics",

  // Campañas
  VIEW_CAMPAIGNS: "view_campaigns",
  CREATE_CAMPAIGN: "create_campaign",
  EDIT_CAMPAIGN: "edit_campaign",
  DELETE_CAMPAIGN: "delete_campaign",

  // Configuración
  VIEW_SETTINGS: "view_settings",
  EDIT_SETTINGS: "edit_settings",
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
}

// Configuración de permisos por rol
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: Object.values(PERMISSIONS), // Admin tiene todos los permisos

  technical: [
    // Permisos de visualización general
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.VIEW_CONTACTS,

    // Permisos técnicos completos
    PERMISSIONS.VIEW_TICKETS,
    PERMISSIONS.CREATE_TICKET,
    PERMISSIONS.EDIT_TICKET,
    PERMISSIONS.CLOSE_TICKET,

    PERMISSIONS.VIEW_HOUR_PACKS,
    PERMISSIONS.EDIT_HOUR_PACK,

    // Lectura de productos y servicios
    PERMISSIONS.VIEW_PRODUCTS,

    // Ver informes técnicos
    PERMISSIONS.VIEW_REPORTS,
  ],

  commercial: [
    // Gestión completa de clientes y leads
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.CREATE_CLIENT,
    PERMISSIONS.EDIT_CLIENT,

    PERMISSIONS.VIEW_CONTACTS,
    PERMISSIONS.CREATE_CONTACT,
    PERMISSIONS.EDIT_CONTACT,

    PERMISSIONS.VIEW_LEADS,
    PERMISSIONS.CREATE_LEAD,
    PERMISSIONS.EDIT_LEAD,

    // Visualización de productos para venta
    PERMISSIONS.VIEW_PRODUCTS,

    // Acceso básico a tickets
    PERMISSIONS.VIEW_TICKETS,
    PERMISSIONS.CREATE_TICKET,

    // Visualización de packs de horas
    PERMISSIONS.VIEW_HOUR_PACKS,
    PERMISSIONS.CREATE_HOUR_PACK,

    // Acceso a comisiones
    PERMISSIONS.VIEW_COMMISSIONS,

    // Ver informes comerciales
    PERMISSIONS.VIEW_REPORTS,

    // Campañas comerciales
    PERMISSIONS.VIEW_CAMPAIGNS,
    PERMISSIONS.CREATE_CAMPAIGN,
    PERMISSIONS.EDIT_CAMPAIGN,
  ],

  viewer: [
    // Solo permisos de visualización
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.VIEW_CONTACTS,
    PERMISSIONS.VIEW_LEADS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.VIEW_TICKETS,
    PERMISSIONS.VIEW_HOUR_PACKS,
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.VIEW_REPORTS,
  ],
}

// Mapa de traducciones para los nombres de roles
export const ROLE_NAMES: Record<UserRole, string> = {
  admin: "Administrador",
  technical: "Técnico",
  commercial: "Comercial",
  viewer: "Visualizador",
}

// Función para verificar si un usuario tiene un permiso específico
export function hasPermission(user: User, permission: string): boolean {
  // Si el usuario es admin, siempre tiene todos los permisos
  if (user.role === "admin") return true

  // Si el usuario tiene permisos específicos asignados
  if (user.permissions?.includes(permission)) return true

  // Si no, verificar por los permisos del rol
  return ROLE_PERMISSIONS[user.role]?.includes(permission) || false
}

// Usuarios de prueba para demo
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Juan Díaz",
    email: "juan.diaz@empresa.com",
    role: "admin",
    avatar: "/avatars/juan-diaz.jpg",
    department: "Dirección",
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@empresa.com",
    role: "commercial",
    avatar: "/avatars/maria-lopez.jpg",
    department: "Comercial",
  },
  {
    id: "3",
    name: "Carlos Gómez",
    email: "carlos.gomez@empresa.com",
    role: "commercial",
    avatar: "/avatars/carlos-gomez.jpg",
    department: "Comercial",
  },
  {
    id: "4",
    name: "Alberto Sánchez",
    email: "alberto.sanchez@empresa.com",
    role: "technical",
    avatar: "/avatars/alberto-sanchez.jpg",
    department: "Soporte Técnico",
  },
  {
    id: "5",
    name: "Laura Martín",
    email: "laura.martin@empresa.com",
    role: "technical",
    avatar: "/avatars/laura-martin.jpg",
    department: "Soporte Técnico",
  },
  {
    id: "6",
    name: "Pedro Ruiz",
    email: "pedro.ruiz@empresa.com",
    role: "viewer",
    avatar: "/avatars/pedro-ruiz.jpg",
    department: "Finanzas",
  },
]

