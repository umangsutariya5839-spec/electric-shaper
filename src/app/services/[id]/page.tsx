import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const service = await prisma.serviceItem.findUnique({
    where: { id: params.id }
  })
  
  if (!service) {
    notFound()
  }

  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      <PublicHeader />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        padding: '12rem 2rem 6rem',
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        textAlign: 'center',
        backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.9), rgba(10, 25, 47, 0.9)), url(${service.imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <h1 className="animate-fade-in-up" style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem' }}>
          {service.title}
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          {service.shortDescription}
        </p>
      </section>

      {/* Main Content */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/services" style={{ color: 'var(--color-primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', textDecoration: 'none' }}>
            ← Back to Services
          </Link>
          
          <div className="card animate-fade-in-up" style={{ padding: '4rem', backgroundColor: 'var(--color-surface)' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '2rem' }}>
              Service Overview
            </h2>
            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>
              {service.fullDescription || service.shortDescription}
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
                Ready to get started?
              </h3>
              <Link href={`/book?category=${encodeURIComponent(service.title)}`} className="btn btn-primary">
                Book this Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#06101f', color: '#94a3b8', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '-1px', marginBottom: '1rem' }}>
          {siteSettings?.websiteName?.replace('.', '') || 'INTEC'}<span style={{ color: 'var(--color-primary)' }}>.</span>
        </div>
        <p>{siteSettings?.footerContent || `© ${new Date().getFullYear()} Intec Electric & Rewinding Works. All rights reserved.`}</p>
      </footer>
    </div>
  )
}
