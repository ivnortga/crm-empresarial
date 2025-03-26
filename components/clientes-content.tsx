"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { Plus, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PERMISSIONS } from "@/lib/auth-utils"

export default function ClientesContent() {
  const { hasPermission } = useAuth()
  const canCreateClient = hasPermission(PERMISSIONS.CREATE_CLIENT)

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
        {canCreateClient && (
          <Button asChild>
            <Link href="/clientes/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Empresa
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, CIF o ID de Sage..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="cartera">Cartera</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Comercial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="juan">Juan Pérez</SelectItem>
              <SelectItem value="maria">María López</SelectItem>
              <SelectItem value="carlos">Carlos Gómez</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>ID Sage</TableHead>
                <TableHead>CIF</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Comercial</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Líneas de Negocio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Empresa ABC</TableCell>
                <TableCell>S-1234</TableCell>
                <TableCell>B12345678</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Cartera
                  </Badge>
                </TableCell>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>Alberto Sánchez</TableCell>
                <TableCell>Software, Hardware</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clientes/1">Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Corporación XYZ</TableCell>
                <TableCell>S-2345</TableCell>
                <TableCell>A87654321</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Cartera
                  </Badge>
                </TableCell>
                <TableCell>María López</TableCell>
                <TableCell>Laura Martín</TableCell>
                <TableCell>Cloud, Seguridad</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clientes/2">Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nuevas Tecnologías SL</TableCell>
                <TableCell>S-3456</TableCell>
                <TableCell>B98765432</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Lead
                  </Badge>
                </TableCell>
                <TableCell>Ana Martínez</TableCell>
                <TableCell>Pedro Ruiz</TableCell>
                <TableCell>Software, Cloud</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clientes/3">Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Industrias 123</TableCell>
                <TableCell>S-4567</TableCell>
                <TableCell>A12345987</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Cartera
                  </Badge>
                </TableCell>
                <TableCell>Carlos Gómez</TableCell>
                <TableCell>Alberto Sánchez</TableCell>
                <TableCell>Hardware, Redes</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clientes/4">Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Consultora Innovación</TableCell>
                <TableCell>S-5678</TableCell>
                <TableCell>B56781234</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Lead
                  </Badge>
                </TableCell>
                <TableCell>Carlos Gómez</TableCell>
                <TableCell>Laura Martín</TableCell>
                <TableCell>Hardware, Seguridad</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clientes/5">Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

