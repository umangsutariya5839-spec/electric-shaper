import prisma from '@/lib/prisma'
import LightDecorationClient from './LightDecorationClient'

export default async function LightDecorationAdminPage() {
  const items = await prisma.lightDecorationItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
  })

  return <LightDecorationClient initialItems={items} />
}
