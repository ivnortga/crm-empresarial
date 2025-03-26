"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User, Company } from "@/types"
import { supabase } from "@/lib/supabase"
import { hasPermission as checkPermission } from "@/lib/auth-utils"

interface AuthContextType {
  user: User | null
  loading: boolean
  companies: Company[]
  currentCompany: Company | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  setCurrentCompany: (company: Company) => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  companies: [],
  currentCompany: null,
  login: async () => false,
  logout: async () => {},
  setCurrentCompany: () => {},
  hasPermission: () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null)
  const router = useRouter()

  // Cargar usuario al iniciar
  useEffect(() => {
    async function loadUser() {
      try {
        // Verificar si hay una sesión activa
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Obtener datos del usuario desde la tabla users
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("auth_id", session.user.id)
            .single()

          if (userError) throw userError
          
          setUser(userData as User)

          // Cargar empresas del usuario (ejemplo simplificado)
          setCompanies([
            {
              id: "1",
              name: "Mi Empresa SL",
              tax_id: "B12345678",
              country: "España",
              tax_region: "Peninsula",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])

          // Establecer empresa actual
          setCurrentCompany({
            id: "1",
            name: "Mi Empresa SL",
            tax_id: "B12345678",
            country: "España",
            tax_region: "Peninsula",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Función para verificar permisos
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return checkPermission(user, permission)
  }

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Obtener datos adicionales del usuario
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", data.user.id)
          .single()

        if (userError) throw userError
        
        setUser(userData as User)

        // Datos de ejemplo para la demo
        setCompanies([
          {
            id: "1",
            name: "Mi Empresa SL",
            tax_id: "B12345678",
            country: "España",
            tax_region: "Peninsula",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        setCurrentCompany({
          id: "1",
          name: "Mi Empresa SL",
          tax_id: "B12345678",
          country: "España",
          tax_region: "Peninsula",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Función de logout
  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setCompanies([])
      setCurrentCompany(null)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        companies,
        currentCompany,
        login,
        logout,
        setCurrentCompany,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
