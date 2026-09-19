import prisma from '@/lib/prisma'
import GalleryClient from './GalleryClient'

export default async function GalleryAdminPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gallery Management</h1>
      </div>

      <GalleryClient initialItems={items} />
    </div>
  )
}

