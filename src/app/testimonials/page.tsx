import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
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
          Client Testimonials
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          Don't just take our word for it. Hear what our industrial partners have to say about our services.
        </p>
      </section>

      <section style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          {testimonials.map((review, index) => (
            <div key={review.id} className="card animate-fade-in-up" style={{ padding: '2.5rem', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
                "{review.review}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {review.customerImage && (
                  <img src={review.customerImage} alt={review.customerName} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-secondary)' }}>{review.customerName.split('-')[0].trim()}</h4>
                  {review.customerName.includes('-') && (
                     <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{review.customerName.split('-')[1].trim()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
               No testimonials have been added yet.
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
