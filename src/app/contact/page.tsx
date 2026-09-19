import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { buildModuleMetadata } from '@/lib/cms/seo'

export async function generateMetadata() {
  return buildModuleMetadata('contact', {
    title: 'Contact Us',
    description: 'Get in touch for motor repair and electrical service enquiries.'
  })
}

export default async function ContactPage() {
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: 'global' } })
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
          Contact Us
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
          Get in touch with our engineering team for inquiries, quotes, or emergency service.
        </p>
      </section>

      <section style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="card animate-fade-in-up" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255, 184, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Phone</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{contactInfo?.phone}</p>
            {contactInfo?.whatsapp && <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>WhatsApp: {contactInfo.whatsapp}</p>}
          </div>

          <div className="card animate-fade-in-up animate-delay-1" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255, 184, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Email</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{contactInfo?.email}</p>
          </div>

          <div className="card animate-fade-in-up animate-delay-2" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255, 184, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Address</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{contactInfo?.address}</p>
          </div>

        </div>

        <div style={{ maxWidth: '1200px', margin: '4rem auto 0', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ flex: '1 1 500px' }}>
             <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Business Hours</h3>
             <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>
               {contactInfo?.businessHours}
             </p>
             
             {siteSettings && (
               <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                 {siteSettings.socialFacebook && siteSettings.socialFacebook !== '#' && <a href={siteSettings.socialFacebook} className="btn btn-outline" target="_blank" rel="noreferrer">Facebook</a>}
                 {siteSettings.socialLinkedin && siteSettings.socialLinkedin !== '#' && <a href={siteSettings.socialLinkedin} className="btn btn-outline" target="_blank" rel="noreferrer">LinkedIn</a>}
                 {siteSettings.socialInstagram && siteSettings.socialInstagram !== '#' && <a href={siteSettings.socialInstagram} className="btn btn-outline" target="_blank" rel="noreferrer">Instagram</a>}
               </div>
             )}
          </div>
          <div style={{ flex: '1 1 500px', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {contactInfo?.googleMapLink ? (
               <iframe src={contactInfo.googleMapLink} width="100%" height="100%" style={{ border: 0, borderRadius: '12px' }} allowFullScreen loading="lazy"></iframe>
             ) : (
               <p style={{ color: '#64748b' }}>Interactive Map Coming Soon</p>
             )}
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
