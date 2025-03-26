"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { supabase } from "@/lib/supabase" // Importación correcta del cliente de Supabase

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo.")
      } else if (data.user) {
        router.push("/")
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tr from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">CRM Empresarial</h1>
          <p className="text-muted-foreground">Sistema de gestión integral de clientes</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@empresa.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm text-muted-foreground">Para demostración, puedes usar:</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs text-muted-foreground">
              <div>
                <div className="font-semibold">Administrador:</div>
                <div>admin@empresa.com</div>
              </div>
              <div>
                <div className="font-semibold">Técnico:</div>
                <div>tecnico@empresa.com</div>
              </div>
              <div>
                <div className="font-semibold">Comercial:</div>
                <div>comercial@empresa.com</div>
              </div>
              <div>
                <div className="font-semibold">Visualizador:</div>
                <div>viewer@empresa.com</div>
              </div>
            </div>
            <div className="mt-2 text-center text-xs text-muted-foreground">
              Contraseña para todos: password123
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
