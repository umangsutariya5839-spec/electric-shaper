import { updateServiceItem } from '@/app/actions/service'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.serviceItem.findUnique({
    where: { id: params.id }
  })

  if (!service) {
    notFound()
  }

  // We need to wrap the server action to pass the id, or bind it.
  const updateServiceWithId = updateServiceItem.bind(null, params.id)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/services" style={{ color: 'var(--color-text-muted)' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Edit Service</h1>
      </div>

      <div className="card">
        <form action={updateServiceWithId} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Service Title</label>
            <input type="text" name="title" defaultValue={service.title} style={inputStyle} placeholder="e.g. Motor Rewinding" required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Short Description (shown on homepage)</label>
            <textarea name="shortDescription" defaultValue={service.shortDescription} rows={2} style={inputStyle} placeholder="Brief summary of the service..." required></textarea>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Full Description</label>
            <textarea name="fullDescription" defaultValue={service.fullDescription || ''} rows={6} style={inputStyle} placeholder="Detailed description of the service..."></textarea>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Image Path</label>
            <input type="text" name="imagePath" defaultValue={service.imagePath} style={inputStyle} placeholder="e.g. /hero.png or /pump.png" required />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>For now, use /hero.png, /pump.png, or /panel.png.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500' }}>Display Order</label>
            <input type="number" name="order" defaultValue={service.order ?? 0} style={inputStyle} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Lower numbers appear first on the website.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="service-active" name="isActive" defaultChecked={service.isActive} style={{ width: '18px', height: '18px' }} />
            <label htmlFor="service-active" style={{ fontWeight: '500' }}>Active (visible on website)</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="service-featured" name="isFeatured" defaultChecked={service.isFeatured} style={{ width: '18px', height: '18px' }} />
            <label htmlFor="service-featured" style={{ fontWeight: '500' }}>Featured (show in the Home Page services section first)</label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/admin/services" className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '4px',
  border: '1px solid var(--color-border)',
  fontSize: '1rem',
  fontFamily: 'inherit',
  width: '100%'
}

