import { AppShell } from "@/components/app-shell"
import ClientesContent from "@/components/clientes-content"
import { PERMISSIONS } from "@/lib/auth-utils"

export default function ClientesPage() {
  return (
    <AppShell requiredPermission={PERMISSIONS.VIEW_CLIENTS}>
      <ClientesContent />
    </AppShell>
  )
}

