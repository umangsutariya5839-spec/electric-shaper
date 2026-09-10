import prisma from '@/lib/prisma'
import FAQClientPage from './FAQClientPage'
import PublicHeader from '@/components/layout/PublicHeader'

export default async function FAQPage() {
  const faqs = await prisma.fAQItem.findMany({ orderBy: { createdAt: 'asc' } })
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'global' } })

  return (
    <>
      <PublicHeader />
      <FAQClientPage faqs={faqs} siteSettings={siteSettings} />
    </>
  )
}
