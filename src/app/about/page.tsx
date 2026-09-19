import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'
import { buildModuleMetadata } from '@/lib/cms/seo'

export async function generateMetadata() {
  return buildModuleMetadata('about', {
    title: 'About Us',
    description: 'Learn about our history, mission and engineering experience.'
  })
}

export const dynamic = 'force-dynamic';
export default async function AboutPage() {
  const about = await prisma.aboutContent.findUnique({ where: { id: 'global' } })
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
          About Us
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          {about?.aboutHeading}
        </p>
      </section>

      {/* Main Content */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          <div className="animate-fade-in-up" style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Our History</h2>
            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                {about?.aboutDescription}
              </p>
              <p>
                Operating with over {about?.experienceYears} of experience, we have built a reputation for excellence.
              </p>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-1" style={{ flex: '1 1 400px' }}>
            <img 
              src={about?.companyImage || "/hero.png"} 
              alt="Our Facility" 
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
            />
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          <div className="card animate-fade-in-up" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255, 184, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--color-primary)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {about?.mission}
            </p>
          </div>

          <div className="card animate-fade-in-up animate-delay-1" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255, 184, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--color-primary)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {about?.vision}
            </p>
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
