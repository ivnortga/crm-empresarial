"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User, Company } from "@/types"
import { signIn as authSignIn, signOut as authSignOut, getCurrentUser } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  companies: Company[]
  currentCompany: Company | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  setCurrentCompany: (company: Company) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  companies: [],
  currentCompany: null,
  login: async () => false,
  logout: async () => {},
  setCurrentCompany: () => {},
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
        const user = await getCurrentUser()
        if (user) {
          setUser(user)

          // Cargar empresas del usuario
          // En una implementación real, esto vendría de la API
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

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      const user = await authSignIn(email, password)
      if (user) {
        setUser(user)

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
      return false
    }
  }

  // Función de logout
  const logout = async () => {
    try {
      await authSignOut()
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

