import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Home } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Acceso No Autorizado</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">No tienes permisos suficientes para acceder a esta sección.</p>
          <p className="text-muted-foreground text-sm">
            Si crees que deberías tener acceso a esta funcionalidad, por favor contacta con el administrador del
            sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

