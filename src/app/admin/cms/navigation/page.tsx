import prisma from '@/lib/prisma'
import NavigationClient from './NavigationClient'

export default async function NavigationAdminPage() {
  const items = await prisma.navigationItem.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Navigation Manager</h1>
      </div>

      <NavigationClient items={items} />
    </div>
  )
}
