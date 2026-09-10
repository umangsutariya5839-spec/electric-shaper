import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'

export default async function GalleryPage() {
  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      <PublicHeader />
      
      <section style={{ 
        position: 'relative',
        padding: '12rem 2rem 6rem',
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 className="animate-fade-in-up" style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem' }}>
          Project Gallery
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          Take a look inside our state-of-the-art facility and see our precision engineering at work.
        </p>
      </section>

      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          {galleryItems.map((item, index) => (
            <div key={item.id} className={`animate-fade-in-up animate-delay-${(index % 4) + 1}`} style={{ height: '300px', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
              <img src={item.imagePath} alt={item.title} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                <h4 style={{ fontWeight: 'bold' }}>{item.title}</h4>
                {item.category && <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>{item.category}</p>}
                {item.description && <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.5rem' }}>{item.description}</p>}
              </div>
            </div>
          ))}

          {galleryItems.length === 0 && (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
               No gallery items uploaded yet.
             </div>
          )}

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
