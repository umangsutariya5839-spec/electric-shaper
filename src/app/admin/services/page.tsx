import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'
import { deleteServiceItem } from '@/app/actions/service'

export default async function ServicesPage() {
  const services = await prisma.serviceItem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Web Services</h1>
        <Link href="/admin/services/new" className="btn btn-primary">
          <Plus size={20} style={{ marginRight: '8px' }} />
          Add Service
        </Link>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '12px' }}>Image</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px' }}>
                  <img src={service.imagePath} alt={service.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{service.title}</td>
                <td style={{ padding: '12px', color: 'var(--color-text-muted)', maxWidth: '400px' }}>
                  {service.shortDescription.substring(0, 80)}...
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <Link href={`/admin/services/${service.id}/edit`} style={{ color: 'var(--color-primary)' }} title="Edit Service">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deleteServiceItem(service.id)
                    }}>
                      <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }} title="Delete Service">
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No services added yet. These will appear on your public landing page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
