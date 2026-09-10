import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function ServicesPage() {
  const services = await prisma.serviceItem.findMany({
    orderBy: { createdAt: 'asc' }
  })
  
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
        textAlign: 'center'
      }}>
        <h1 className="animate-fade-in-up" style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem' }}>
          Our Services
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          Comprehensive mechanical and electrical solutions tailored to heavy industry requirements.
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '8rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem' }}>
            
            {services.map((service, index) => (
              <div key={service.id} className={`service-card animate-fade-in-up animate-delay-${(index % 4) + 1}`}>
                <div className="service-img-wrapper">
                  <img src={service.imagePath} alt={service.title} className="service-img" />
                </div>
                <div className="service-content" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-secondary)' }}>{service.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '2rem', flex: 1 }}>
                    {service.shortDescription}
                  </p>
                  <Link href={`/services/${service.id}`} className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                No services added yet. Add them in the Admin Dashboard!
              </div>
            )}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-primary)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
          Need Immediate Assistance?
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.7)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Our engineering team is ready to deploy for emergency breakdowns 24/7.
        </p>
        <Link href="/book" className="btn btn-secondary" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
          Request Service
        </Link>
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
