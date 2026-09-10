import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { getSessionRole } from '@/app/actions/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = await getSessionRole()
  
  if (!role) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        {children}
      </main>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role={role} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: 'var(--spacing-lg)', flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-background)' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
