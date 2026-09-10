import { prisma } from '@/lib/prisma'
import { SiteSettingsForm, ContactInfoForm } from './SettingsForms'

export const dynamic = 'force-dynamic'

export default async function GlobalSettingsPage() {
  // Fetch settings from Prisma
  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: 'global' }
  })
  
  const contactInfo = await prisma.contactInfo.findUnique({
    where: { id: 'global' }
  })

  // We pass empty object if null since the schemas provide defaults
  // in Prisma but may not have been created yet.
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Global Settings</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        Manage your website's global information, branding, and contact details.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SiteSettingsForm initialData={siteSettings || {}} />
        <ContactInfoForm initialData={contactInfo || {}} />
      </div>
    </div>
  )
}
