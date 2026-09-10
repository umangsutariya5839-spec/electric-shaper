import prisma from '@/lib/prisma'
import ClientNav from './ClientNav'

export default async function PublicHeader() {
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: 'global' } })
  const navItems = await prisma.navigationItem.findMany({ orderBy: { order: 'asc' } })

  return (
    <ClientNav 
      websiteName={siteSettings?.websiteName || 'INTEC'} 
      whatsappNumber={contactInfo?.whatsapp || '1234567890'} 
      navItems={navItems}
    />
  )
}
