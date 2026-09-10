import PublicHeader from '@/components/layout/PublicHeader'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import StickyProductSlider from '@/components/ui/StickyProductSlider'

export default async function LandingPage() {
  const services = await prisma.serviceItem.findMany({
    orderBy: { createdAt: 'asc' },
    take: 3
  })
  
  const homeContent = await prisma.homeContent.findUnique({ where: { id: 'global' } })
  const aboutContent = await prisma.aboutContent.findUnique({ where: { id: 'global' } })
  const galleryItems = await prisma.galleryItem.findMany({ take: 4 })
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      <PublicHeader />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-secondary)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${homeContent?.heroBackgroundImage || '/hero.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(10, 25, 47, 0.9) 0%, rgba(10, 25, 47, 0.4) 100%)',
          zIndex: 2
        }}></div>

        <div style={{ 
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 3rem',
          width: '100%'
        }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="animate-fade-in-up" style={{ 
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(255, 184, 0, 0.15)',
              color: 'var(--color-primary)',
              borderRadius: '24px',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              letterSpacing: '1px',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 184, 0, 0.3)'
            }}>
              {homeContent?.heroBannerText}
            </div>
            
            <h1 className="animate-fade-in-up animate-delay-1" style={{ 
              fontSize: '5rem', 
              fontWeight: '900', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-2px',
              color: 'white'
            }}>
              {homeContent?.heroHeading}
            </h1>
            
            <p className="animate-fade-in-up animate-delay-2" style={{ 
              fontSize: '1.25rem', 
              color: '#cbd5e1',
              marginBottom: '3rem',
              lineHeight: 1.7,
              fontWeight: '400'
            }}>
              {homeContent?.heroDescription}
            </p>
            
            <div className="animate-fade-in-up animate-delay-3" style={{ display: 'flex', gap: '1rem' }}>
              <Link href={homeContent?.heroButtonLink || "/book"} style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                padding: '1.25rem 2.5rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(255, 184, 0, 0.3)'
              }}>
                {homeContent?.heroButtonText}
              </Link>
              <Link href="/services" style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '1.25rem 2.5rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Product Showcase */}
      <StickyProductSlider />

      {/* Services Section */}
      <section id="services" style={{ padding: '8rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="animate-fade-in-up" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--color-secondary)', letterSpacing: '-1px', marginBottom: '1rem' }}>
              Industry Leading Capabilities
            </h2>
            <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We provide comprehensive mechanical and electrical solutions tailored to heavy industry requirements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem' }}>
            
            {services.map((service, index) => (
              <div key={service.id} className={`service-card animate-fade-in-up animate-delay-${(index % 4) + 1}`}>
                <div className="service-img-wrapper">
                  <img src={service.imagePath} alt={service.title} className="service-img" />
                </div>
                <div className="service-content">
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-secondary)' }}>{service.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                No services added yet. Add them in the Admin Dashboard!
              </div>
            )}

          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/services" className="btn btn-outline" style={{ display: 'inline-block' }}>
              View All Services
            </Link>
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{ padding: '8rem 2rem', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="animate-fade-in-up" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--color-secondary)', letterSpacing: '-1px', marginBottom: '1rem' }}>
              Project Gallery
            </h2>
            <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Take a look inside our state-of-the-art facility and see our precision engineering at work.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {galleryItems.map((item, index) => (
              <div key={item.id} className={`animate-fade-in-up animate-delay-${(index % 4) + 1}`} style={{ height: '300px', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
                <img src={item.imagePath} alt={item.title} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                  <h4 style={{ fontWeight: 'bold' }}>{item.title}</h4>
                  {item.category && <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>{item.category}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/gallery" className="btn btn-outline" style={{ display: 'inline-block' }}>
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/About Section */}
      <section id="about" style={{ backgroundColor: 'var(--color-secondary)', color: 'white', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-1px' }}>
              {aboutContent?.aboutHeading}
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
              {aboutContent?.aboutDescription}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--color-primary)', lineHeight: 1 }}>{homeContent?.statsExperience}</div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Years Experience</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--color-primary)', lineHeight: 1 }}>{homeContent?.statsRepaired}</div>
                <div style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Motors Repaired</div>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/about" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', display: 'inline-block' }}>
                Read Our Story
              </Link>
            </div>
          </div>
          <div style={{ flex: '1 1 500px' }}>
             <img src={aboutContent?.companyImage || "/panel.png"} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', objectFit: 'cover', height: '400px' }} alt="Workshop" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#06101f', color: '#94a3b8', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '-1px', marginBottom: '1rem' }}>
          {siteSettings?.websiteName?.replace('.', '') || 'INTEC'}<span style={{ color: 'var(--color-primary)' }}>.</span>
        </div>
        <p>{siteSettings?.footerContent || `© ${new Date().getFullYear()} Intec Electric & Rewinding Works. All rights reserved.`}</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/terms" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Terms & Conditions</Link>
          <Link href="/admin" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Admin Login</Link>
        </div>
      </footer>
    </div>
  )
}
