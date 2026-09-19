import PublicHeader from '@/components/layout/PublicHeader'
import prisma from '@/lib/prisma'
import { buildModuleMetadata } from '@/lib/cms/seo'
import LightDecorationPublicView from '@/components/LightDecorationPublicView'

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildModuleMetadata('light-decoration', {
    title: 'Light Decoration Services',
    description: 'Specialized LED, event, festival, wedding, and architectural light decoration services.'
  })
}

export default async function LightDecorationPage() {
  const items = await prisma.lightDecorationItem.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }]
  })

  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: 'global' } })

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text-main)' }}>
      <PublicHeader />

      <LightDecorationPublicView
        items={items}
        whatsappNumber={contactInfo?.whatsapp || '1234567890'}
        phone={contactInfo?.phone}
        websiteName={siteSettings?.websiteName?.replace('.', '') || 'INTEC'}
      />

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
